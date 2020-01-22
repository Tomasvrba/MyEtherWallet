import { api, getDevicePath, connect } from './bitbox02.js';

import { BITBOX02 as bitbox02Type } from '../../bip44/walletTypes';
import bip44Paths from '../../bip44';
import HDWalletInterface from '@/wallets/HDWalletInterface';
import * as HDKey from 'hdkey';
import { Transaction } from 'ethereumjs-tx';
import {
  getSignTransactionObject,
  //   getHexTxObject,
  getBufferFromHex,
  calculateChainIdFromV
} from '../../utils';
// import { Misc } from '@/helpers';
import errorHandler from './errorHandler';
import store from '@/store';
import commonGenerator from '@/helpers/commonGenerator';

const firmwareAPI = api.firmware;
const HARDENED = 0x80000000;
const NEED_PASSWORD = false;

class BitBox02Wallet {
  constructor() {
    this.identifier = bitbox02Type;
    this.isHardware = true;
    this.needPassword = NEED_PASSWORD;
    this.supportedPaths = bip44Paths[bitbox02Type];
  }
  async init(basePath) {
    this.basePath = basePath ? basePath : this.supportedPaths[0].path;
    const bb02firmware = initConnection();
    if (!bb02firmware) {
      console.log('no firmware');
      return;
    }
    const rootPub = await getRootPubKey(this.basePath);
    this.hdKey = new HDKey();
    this.hdKey.publicKey = Buffer.from(rootPub.publicKey, 'hex');
    // this.hdKey.chainCode = Buffer.from(rootPub.chainCode, 'hex');
  }
  getAccount(idx) {
    const derivedKey = this.hdKey.derive('m/' + idx);
    const txSigner = async tx => {
      tx = new Transaction(tx, {
        common: commonGenerator(store.state.network)
      });
      const networkId = tx.getChainId();
      //   const options = {
      //     path: this.basePath + '/' + idx,
      //     transaction: getHexTxObject(tx)
      //   };
      const result = await bb02Sign();
      if (!result.success) throw new Error(result.payload.error);
      tx.v = getBufferFromHex(result.payload.v);
      tx.r = getBufferFromHex(result.payload.r);
      tx.s = getBufferFromHex(result.payload.s);
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
      console.log('cannot sign messages', msg);
    };
    const displayAddress = async () => {
      await displayEthAddress();
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

const getRootPubKey = async firmware => {
  const pub = display =>
    firmware.js.AsyncETHPub(
      firmwareAPI.messages.ETHCoin.ETH,
      [44 + HARDENED, 60 + HARDENED, 0 + HARDENED, 0, 0],
      firmwareAPI.messages.ETHPubRequest_OutputType.XPUB,
      display,
      new Uint8Array()
    );
  const addr = await pub(false);
  alert(addr);
  return addr;
};

const initConnection = async () => {
  try {
    const devicePath = await getDevicePath();
    // eslint-disable-next-line no-unused-vars
    let firmware;
    return (firmware = await connect(
      devicePath,
      pairingCode => {
        console.log('In da pairing', pairingCode);
      },
      () => {
        return new Promise(resolve => {
          resolve;
        });
      },
      attestationResult => {
        alert('Attestation check: ' + attestationResult);
      }
    ));
  } catch (err) {
    alert(err);
  }
};

const bb02Sign = async firmware => {
  try {
    const sig = await firmware.js.AsyncETHSign(
      firmwareAPI.messages.ETHCoin.ETH,
      [44 + HARDENED, 60 + HARDENED, 0 + HARDENED, 0, 0],
      8156,
      '6000000000',
      21000,
      new Uint8Array([
        4,
        242,
        100,
        207,
        52,
        68,
        3,
        19,
        180,
        160,
        25,
        42,
        53,
        40,
        20,
        251,
        233,
        39,
        184,
        133
      ]),
      '530564000000000000',
      new Uint8Array([])
    );
    console.log(sig);
  } catch (err) {
    if (firmwareAPI.IsErrorAbort(err)) {
      alert('aborted by user');
    } else {
      alert(err.Message);
    }
  }
};

const displayEthAddress = async firmware => {
  const pub = display =>
    firmware.js.AsyncETHPub(
      firmwareAPI.messages.ETHCoin.ETH,
      [44 + HARDENED, 60 + HARDENED, 0 + HARDENED, 0, 0],
      firmwareAPI.messages.ETHPubRequest_OutputType.ADDRESS,
      display,
      new Uint8Array()
    );
  const addr = await pub(false);
  pub(true);
  alert(addr);
};

export default createWallet;
