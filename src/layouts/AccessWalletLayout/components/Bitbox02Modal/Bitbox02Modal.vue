<template>
  <div
    :class="showModal ? '' : 'hidden'">
    <b-modal
      ref="bitbox02"
      :title="$t('accessWallet.bitbox.bitbox02')"
      hide-footer
      class="bootstrap-modal"
      centered
      static
      lazy
      @hidden="reset"
    >
      <div class="bitbox-container">
        <div v-if="device.status === 'connected'">
          <h4>{{ $t('accessWallet.bitbox.unlock') }}</h4>
          <div class="password-gestures-gif-wrapper">
            <img class="password-gestures-gif" :src="imgPath" alt="Password entry GIF">
          </div>
        </div>

        <div v-if="device.status === 'unpaired'">
          <h4>{{ $t('accessWallet.bitbox.pairing') }}</h4>
          <pre>{{device.pairingCode}}</pre>
          <div class="button-container">
            <div
              :class="[
                device.pairingConfirmed ? '' : 'disabled',
                'submit-button large-round-button-green-filled'
              ]"
              @click="device.pairingConfirmationResolve()"
            >
              {{ $t('accessWallet.hardware.modal.button-choose') }}
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { Toast } from '@/helpers';
import bb02PwEntry from '@/assets/images/modal/bitbox02/bb02PwEntry.gif';
export default {
  props: {
    device: {
      type: Object,
      default: function() {return {}}
    },
  },
  data() {
    return {
      imgPath: bb02PwEntry
    };
  },
  computed: {
    showModal() {
      return this.device.status === 'connected' || this.device.status === 'unpaired'
    },
  },
  // watch: {
  //   device: function(newVal, oldVal) { // watch it
  //     console.log('Prop changed: ', newVal, ' | was: ', oldVal)
  //   }
    // status: function(newVal, oldVal) { // watch it
    //   console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    // }
  // },
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
