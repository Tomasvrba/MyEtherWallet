import { BitBox02API, getDevicePath, api } from '../../../../node_modules/aaa-bb02/bitbox02.js';

import { BITBOX as bitboxType } from '../../bip44/walletTypes';
import bip44Paths from '../../bip44';
import HDWalletInterface from '@/wallets/HDWalletInterface';
import * as HDKey from 'hdkey';
import { Transaction } from 'ethereumjs-tx';
import {
  getSignTransactionObject,
    getHexTxObject,
    calculateChainIdFromV
} from '../../utils';
import errorHandler from './errorHandler';
import store from '@/store';
import commonGenerator from '@/helpers/commonGenerator';
import { Misc } from '@/helpers';

const NEED_PASSWORD = false;

class BitBox02Wallet {
  constructor(logout) {
    this.identifier = bitboxType;
    this.isHardware = true;
    this.needPassword = NEED_PASSWORD;
    this.supportedPaths = bip44Paths[bitboxType];
    this.logout = logout;
  }
  async init(basePath) {
    this.basePath = basePath ? basePath : this.supportedPaths[0].path;
    const devicePath = await getDevicePath();
    this.BitBox02 = new BitBox02API(devicePath);

    await this.BitBox02.connect(
      pairingCode => {
        console.log('pairing', pairingCode);
      },
      () => {
        return new Promise(resolve => {
          setTimeout(resolve, 10000)});
      },
      attestationResult => {
        this.attestation = attestationResult;
      },
      () => {
        this.logout('clearWallet');
      }
    )

    if (this.BitBox02.fw.Product() !== api.common.Product.BitBox02Multi) {
      throw new Error('Unsupported device');
    }

    const rootPub = await this.BitBox02.getRootPubKey();
    this.hdKey = HDKey.fromExtendedKey(rootPub);

    if (!this.attestation) {
      errorHandler('Attestation failed');
    }
  }

  getAccount(idx) {
    const derivedKey = this.hdKey.derive('m/' + idx);
    const txSigner = async tx => {
      tx = new Transaction(tx, {
        common: commonGenerator(store.state.network)
      });
      const networkId = tx.getChainId();
      const signatureData = {
        account: idx,
        recipient: tx.to,
        tx: getHexTxObject(tx),
        data: tx.data
      }
      const result = await this.BitBox02.signTransaction(signatureData);
      tx.r = result.r
      tx.s = result.s
      tx.v = result.v
      
      const signedChainId = calculateChainIdFromV(tx.v);
      if (signedChainId !== networkId)
        throw new Error(
          'Invalid networkId signature returned. Expected: ' +
            networkId +
            ', Got: ' +
            signedChainId,
          'InvalidNetworkId'
        );
      return getSignTransactionObject(tx);
    };

    const msgSigner = async msg => {
      const result = await this.BitBox02.signMessage({
        account: idx,
        message: Misc.toBuffer(msg)
      });
      return Buffer.concat([
        result.r,
        result.s,
        result.v
      ]);
    };

    const displayAddress = async () => {
      await this.BitBox02.displayEthAddress(idx);
    };

    return new HDWalletInterface(
      this.basePath + '/' + idx,
      derivedKey.publicKey,
      this.isHardware,
      this.identifier,
      errorHandler,
      txSigner,
      msgSigner,
      displayAddress
    );
  }

  getCurrentPath() {
    return this.basePath;
  }

  getSupportedPaths() {
    return this.supportedPaths;
  }
}

const createWallet = async (basePath, logout) => {
  const _bb02Wallet = new BitBox02Wallet(logout);
  await _bb02Wallet.init(basePath);
  return _bb02Wallet;
};
createWallet.errorHandler = errorHandler;

export default createWallet;
