import * as BitBox02API from '../../../../node_modules/aaa-bb02/bitbox02.js';

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

const HARDENED = 0x80000000;
const NEED_PASSWORD = false;

class BitBox02Wallet {
  constructor() {
    this.identifier = bitboxType;
    this.isHardware = true;
    this.needPassword = NEED_PASSWORD;
    this.supportedPaths = bip44Paths[bitboxType];
  }
  async init(basePath) {
    this.basePath = basePath ? basePath : this.supportedPaths[0].path;
    const rootPub = await BitBox02API.getRootPubKey();
    this.hdKey = HDKey.fromExtendedKey(rootPub)
  }
  getAccount(idx) {
    const derivedKey = this.hdKey.derive('m/' + idx);
    const txSigner = async tx => {
      tx = new Transaction(tx, {
        common: commonGenerator(store.state.network)
      });
      const networkId = tx.getChainId();
      const signatureData = {
        path: [44 + HARDENED, 60 + HARDENED, 0 + HARDENED, 0, idx],
        recipient: tx.to,
        tx: getHexTxObject(tx),
        data: tx.data
      }
      const result = await BitBox02API.signTransaction(signatureData);
      let r = result.slice(0, 0 + 32);
      let s = result.slice(0 + 32, 0 + 32 + 32);
      let v = new Buffer(new Uint8Array([37]))
      try {
        r = new Buffer(r)
        s = new Buffer(s)
        tx.r = r
        tx.s = s
        tx.v = v
      } catch (err) {
        console.log('err: ', err);
      }
      
      // tx.s = result.slice(0 + 32, 0 + 32 + 32);
      // console.log(tx)
      // const signedChainId = calculateChainIdFromV(tx.v);
      // if (signedChainId !== networkId)
      //   throw new Error(
      //     'Invalid networkId signature returned. Expected: ' +
      //       networkId +
      //       ', Got: ' +
      //       signedChainId,
      //     'InvalidNetworkId'
      //   );
      // console.log(tx)
      return getSignTransactionObject(tx);
    };
    const msgSigner = async msg => {
      console.log('cannot sign messages', msg);
    };
    const displayAddress = async () => {
      console.log(this.basePath + '/' + idx); 
      await BitBox02API.displayEthAddress(idx);
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
const createWallet = async basePath => {
  const _bb02Wallet = new BitBox02Wallet();
  await _bb02Wallet.init(basePath);
  return _bb02Wallet;
};
createWallet.errorHandler = errorHandler;

export default createWallet;
