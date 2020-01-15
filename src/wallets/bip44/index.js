import {
  LEDGER,
  TREZOR,
  BITBOX,
  BITBOX02,
  SECALOT,
  KEEPKEY,
  MNEMONIC
} from './walletTypes';
import ledgerPaths from './ledgerPaths';
import trezorPaths from './trezorPaths';
import bitboxPaths from './bitboxPaths';
import secalotPaths from './secalotPaths';
import keepkeyPaths from './keepkeyPaths';
import mnemonicPaths from './mnemonicPaths';

export default {
  [LEDGER]: ledgerPaths,
  [TREZOR]: trezorPaths,
  [BITBOX]: bitboxPaths,
  [BITBOX02]: bitboxPaths,
  [SECALOT]: secalotPaths,
  [KEEPKEY]: keepkeyPaths,
  [MNEMONIC]: mnemonicPaths
};
