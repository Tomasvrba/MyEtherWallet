<template>
  <div>
    <b-modal
      ref="bitbox02"
      :title="$t('accessWallet.ledger.modal.title')"
      hide-footer
      class="bootstrap-modal"
      centered
      static
      lazy
      @hidden="reset"
    >
      <div class="ledger-app-selection-container">
        <!-- <h4>{{ $t('accessWallet.ledger.modal.text') }}</h4> -->
        <span> {{ device.status === 'connected' ? 'Unlock your BitBox02' : device.pairingCode }} </span>
        <div class="buttons-container">
          <div
            :class="[
              device.pairingConfirmed ? '' : 'disabled',
              'submit-button large-round-button-green-filled'
            ]"
            @click="device.pairingConfirmationResolve()"
          >
            Continue
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import apps from '@/wallets/hardware/ledger/appPaths.js';
import cust from '@/assets/images/icons/network.svg';
// import {
//   BitBox02Wallet,
// } from '@/wallets';
import { Toast, pathHelpers } from '@/helpers';
import { LedgerWallet } from '@/wallets';
import { mapState } from 'vuex';
import { ethereum } from '@/wallets/bip44/paths';
export default {
  props: {
    device: {
      // type: String,
      // default: 'BAR'
    },
    // status: {
    //   type: String,
    //   default: undefined
    // }
  },
  data() {
    return {
      apps: apps,
      selectedApp: {
        network: {
          name_long: apps[0].network.name_long,
          icon: apps[0].network.icon
        },
        paths: apps[0].paths
      },
      toggled: false,
      selectedPath: apps[0].paths[0],
      flipButton: false,
      customLabel: '',
      customPath: ''
    };
  },
  computed: {
    fieldsFilled() {
      const emptyApp = Object.keys(this.selectedApp).length;
      return (
        this.selected === '' &&
        emptyApp === 0 &&
        this.selectedPathText === 'Select Path' &&
        this.selectedPath === ''
      );
    },
    dropDownDefaultText() {
      return `${this.selectedPath.label} - ${this.selectedPath.path}`;
    },
    ...mapState(['customPaths'])
  },
  watch: {
    device: function(newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    }
    // status: function(newVal, oldVal) { // watch it
    //   console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    // }
  },
  // mounted() {
  //   console.log('mounted')
  //   // console.log(device)
  //   console.log(this.device)
  // },
  // updated() {
  //   console.log('updated')
  //   console.log(device)
  //   console.log(this.device)
  // },
  methods: {
    remove(path, idx) {
      const mappedPaths = this.selectedApp.paths.filter((item, itemIdx) => {
        if (itemIdx !== idx) return item;
      });
      this.$store.dispatch('removeCustomPath', path);
      this.setupCustomPaths();
      this.selectedApp.paths = mappedPaths;
      this.selectedPath =
        this.selectedApp.paths.length > 1
          ? this.selectedApp.paths[0]
          : apps[0].paths[0];
      this.$refs.pathDropdown[0].closeDropdown();
    },
    setupCustomPaths() {
      const loc = apps.map(item => {
        return item;
      });
      const customPathArr = Object.keys(this.customPaths);
      const customApp = {
        paths: [
          {
            label: 'Ethereum (Trezor)',
            path: ethereum.path,
            default: true
          },
          {
            label: 'Add Custom Paths',
            path: 'custom',
            default: true
          }
        ],
        network: {
          icon: cust,
          name_long: 'Custom Paths',
          name: 'Custom'
        }
      };

      customPathArr.forEach(item => {
        customApp.paths.unshift(this.customPaths[item]);
      });

      loc.push(customApp);

      this.apps = loc;
    },
    addCustomPath() {
      const customPath = pathHelpers.checkCustomPath(this.customPath);
      if (customPath) {
        this.selectedPath = {
          path: customPath,
          label: this.customLabel
        };
        this.$store
          .dispatch('addCustomPath', {
            label: this.customLabel,
            path: customPath
          })
          .then(() => {
            this.setupCustomPaths();
            this.selectedApp.paths.unshift(this.selectedPath);
          });
      } else {
        Toast.responseHandler(
          this.$t('access-wallet.path.ivalid-custom'),
          Toast.ERROR
        );
      }
    },
    cancel() {
      this.customLabel = '';
      this.customPath = '';
      this.selectedPath =
        this.selectedApp.paths.length > 1
          ? this.selectedApp.paths[0]
          : apps[0].paths[0];
    },
    selectDapp(app) {
      this.selectedApp = app;
    },
    setPath(path) {
      this.selectedPath = path;
    },
    // next() {
    //   this.$refs.ledgerApp.hide();
    //   LedgerWallet(this.selectedPath.path)
    //     .then(_newWallet => {
    //       this.$emit('hardwareWalletOpen', _newWallet);
    //     })
    //     .catch(e => {
    //       LedgerWallet.errorHandler(e);
    //     });
    // },
    reset() {
      this.selectedApp = this.apps[0];
      this.selectedPath = this.apps[0].paths[0];
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'Bitbox02Modal.scss';
</style>
