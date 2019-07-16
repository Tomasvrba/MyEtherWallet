<template>
  <div class="nft-manager">
    <interface-container-title title="NFT Manager" />
    <div class="flex--row--align-start mft-manager-content-container">
      <div class="content-block flex--grow-1">
        <crypto-kitties />
      </div>
    </div>
  </div>
</template>

<script>
import InterfaceContainerTitle from '@/layouts/InterfaceLayout/components/InterfaceContainerTitle';
import CryptoKittiesManager from './containers/CryptoKitties/CryptoKittiesManager';

export default {
  components: {
    'interface-container-title': InterfaceContainerTitle,
    'crypto-kitties': CryptoKittiesManager
  },
  props: {
    data: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {};
  },

  computed: {},
  watch: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import 'NFTManager.scss';
</style>
