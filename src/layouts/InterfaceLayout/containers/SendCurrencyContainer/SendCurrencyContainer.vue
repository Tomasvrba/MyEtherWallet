<template>
  <div class="nft-manager">
    <interface-container-title title="NFT Manager" />
    <div class="mft-manager-content-container">
      <div class="side-menu">
        <input-search class="input-search-container">
          <input type="text" placeholder="Search the number" />
        </input-search>
        <nft-side-menu :data="sideMenuData" />
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import InterfaceContainerTitle from '../../components/InterfaceContainerTitle';
import NftSideMenu from './components/NftSideMenu';
import InputSearch from '@/components/Inputs/InputSearch';

export default {
  components: {
    'interface-container-title': InterfaceContainerTitle,
    'nft-side-menu': NftSideMenu,
    'input-search': InputSearch
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
      sideMenuData: [
        {
          title: 'CryptoKitties',
          count: 5,
          selected: true
        },
        {
          title: 'Gods Unchained',
          count: 2,
          selected: false
        },
        {
          title: 'CryptoFlowers',
          count: 0,
          selected: false
        },
        {
          title: 'MyCryptoHeros',
          count: 7,
          selected: false
        }
      ]
    };
  },

  computed: {},
  watch: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import 'SendCurrencyContainer.scss';
</style>
