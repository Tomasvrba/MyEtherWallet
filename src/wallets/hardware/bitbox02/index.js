import { api, getDevicePath, connect } from './bitbox02.js';
// eslint-disable-next-line no-unused-vars
// import { getDevicePath } from './bitbox02.js';

import { BITBOX as bitboxType } from '../../bip44/walletTypes';
import bip44Paths from '../../bip44';
import HDWalletInterface from '@/wallets/HDWalletInterface';
import * as HDKey from 'hdkey';
import { Transaction } from 'ethereumjs-tx';
import {
  getSignTransactionObject,
    getHexTxObject,
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
    this.identifier = bitboxType;
    this.isHardware = true;
    this.needPassword = NEED_PASSWORD;
    this.supportedPaths = bip44Paths[bitboxType];
  }
  async init(basePath) {
    this.basePath = basePath ? basePath : this.supportedPaths[0].path;
    this.bb02firmware = await initConnection();
    const rootPub = await getRootPubKey(this.bb02firmware);
    this.hdKey = HDKey.fromExtendedKey(rootPub)
  }
  getAccount(idx) {
    const derivedKey = this.hdKey.derive('m/' + idx);
    const txSigner = async tx => {
      tx = new Transaction(tx, {
        common: commonGenerator(store.state.network)
      });
      const networkId = tx.getChainId();
      // let path = 
      // console.log("TX-raw: ", tx);
      // console.log("TX-getHexTxObject: ", getHexTxObject(tx));
      // console.log("Path: ", this.basePath + '/' + idx);
      // const result = await bb02Sign(this.bb02firmware, idx, tx, path);
      const toSign = {
        path: [44 + HARDENED, 60 + HARDENED, 0 + HARDENED, 0, idx],
        recipient: tx.to,
        tx: getHexTxObject(tx),
        data: tx.data
      }
      const result = await bb02Sign(this.bb02firmware, toSign);
      // if (!result) throw new Error('no sig');
      // tx.v = result.slice(64);
      // console.log(new Uint8Array([42])) 
      // console.log(result.slice(0 + 32, 0 + 32 + 32));
      // console.log(result.slice(0, 0 + 32)) 
      // console.log(result)
      // tx.v = new Uint8Array([42]);

      // console.log(tx.r)
      let r = result.slice(0, 0 + 32);
      let s = result.slice(0 + 32, 0 + 32 + 32);
      let v = new Buffer(new Uint8Array([37]))
      // console.log(r) 
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
      await displayEthAddress(this.bb02firmware);
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
      [44 + HARDENED, 60 + HARDENED, 0 + HARDENED, 0],
      firmwareAPI.messages.ETHPubRequest_OutputType.XPUB,
      display,
      new Uint8Array()
    );
  const addr = await pub(false);
  alert(addr);
  return addr;
};

const initConnection = async () => {
  let firmware
  try {
    const devicePath = await getDevicePath();
    // eslint-disable-next-line no-unused-vars
    firmware = await connect(
      devicePath,
      pairingCode => {
        console.log('pairing', pairingCode);
      },
      () => {
        return new Promise(resolve => {
          setTimeout(resolve, 10000)});
      },
      attestationResult => {
        alert('Attestation check: ' + attestationResult);
      }
    );
    return firmware
  } catch (err) {
    alert(err);
  }
};

const bb02Sign = async (firmware, toSign) => {
  let nonce;
  if (toSign.tx.nonce) {
    nonce = parseInt(toSign.tx.nonce)
  } else {
    nonce = 0;
  }
  const gasPrice = parseInt(toSign.tx.gasPrice).toString();
  const gasLimit = parseInt(toSign.tx.gasLimit);
  // console.log(toSign)
  let value = '0'
  if (toSign.tx.value) {
    value = parseInt(toSign.tx.value).toString();
  }
  let data = new Buffer(toSign.data)
  // console.log(toSign.path, nonce, gasPrice, gasLimit, toSign.recipient, value, data)
  try {
    const sig = await firmware.js.AsyncETHSign(
      firmwareAPI.messages.ETHCoin.ETH,
      toSign.path,
      nonce,
      gasPrice,
      gasLimit,
      toSign.recipient,
      value,
      data
    );
    return sig;
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


// const bb02Sign = async (firmware, toSign) => {
//   let nonce;
//   if (toSign.tx.nonce) {
//     nonce = parseInt(toSign.tx.nonce)
//   } else {
//     nonce = 0;
//   }
//   const gasPrice = parseInt(toSign.tx.gasPrice).toString();
//   const gasLimit = parseInt(toSign.tx.gasLimit);
//   const value = parseInt(toSign.tx.value).toString();
//   // console.log(nonce, gasPrice, gasLimit, value);
//   try {
//     const sig = await firmware.js.AsyncETHSign(
//       firmwareAPI.messages.ETHCoin.ETH,
//       path,
//       8000,
//       gasPrice,
//       gasLimit,
//       tx.to,
//       value,
//       // tx.data
//       new Uint8Array([])
//     );
//     console.log(sig);
//     return sig;
//   } catch (err) {
//     if (firmwareAPI.IsErrorAbort(err)) {
//       alert('aborted by user');
//     } else {
//       alert(err.Message);
//     }
//   }
// };