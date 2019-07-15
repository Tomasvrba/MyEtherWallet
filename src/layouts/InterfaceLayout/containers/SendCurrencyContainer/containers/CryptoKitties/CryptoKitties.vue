<template>
  <div class="crypto-kitties">
    <content-block-title
      title="CryptoKittes"
      button-text="You own 5 CryptoKitties"
    />
    <div class="grid-container">
      <div v-for="kitty in kitties" :key="kitty.key" class="kitty">
        <div class="kitty-img"><img :src="kitty.img" /></div>
        <p>#{{ kitty.number }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ContentBlockTitle from '../../../../components/ContentBlockTitle';

// Please remove these images after "NFT Manager" development is done!
import kitty1 from '@/assets/images/temp/kitty1.svg';
import kitty2 from '@/assets/images/temp/kitty2.svg';
import kitty3 from '@/assets/images/temp/kitty3.svg';
import kitty4 from '@/assets/images/temp/kitty4.svg';
import kitty5 from '@/assets/images/temp/kitty5.svg';
import kitty6 from '@/assets/images/temp/kitty6.svg';

export default {
  components: {
    'content-block-title': ContentBlockTitle
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
      kitties: [
        { number: 3362, img: kitty1 },
        { number: 3632, img: kitty2 },
        { number: 8362, img: kitty3 },
        { number: 1362, img: kitty4 },
        { number: 8362, img: kitty5 },
        { number: 6362, img: kitty6 }
      ]
    };
  },

  computed: {},
  watch: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import 'CryptoKitties.scss';
</style>
