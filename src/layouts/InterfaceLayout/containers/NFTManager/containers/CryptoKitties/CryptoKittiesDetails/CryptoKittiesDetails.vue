<template>
  <div class="crypto-kitties-details">
    <interface-container-title title="NFT Manager" />
    <div class="crypto-kitties-details-content-container">
      <back-button />
    </div>
  </div>
</template>

<script>
import InterfaceContainerTitle from '@/layouts/InterfaceLayout/components/InterfaceContainerTitle';
import SmallBackButton from '@/layouts/InterfaceLayout/components/SmallBackButton';

// Please remove these images after "NFT Manager" development is done. (@/assets/images/temp)
import kitty1 from '@/assets/images/temp/kitty1.svg';

export default {
  components: {
    'interface-container-title': InterfaceContainerTitle,
    'back-button': SmallBackButton
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
    return {
      kitty: { number: 3362, img: kitty1 }
    };
  },

  computed: {},
  watch: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import 'CryptoKittiesDetails.scss';
</style>
