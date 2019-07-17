<template>
  <div class="nft-side-menu">
    <div class="desktop-menu">
      <input-search class="input-search-container">
        <slot />
      </input-search>
      <ul>
        <li
          v-for="i in data"
          :key="i.key"
          :class="i.selected == true ? 'selected' : ''"
        >
          {{ i.title }} ({{ i.count }})
        </li>
      </ul>
    </div>
    <div class="mobile-menu">
      <input-search class="input-search-container">
        <slot />
      </input-search>
      <b-dropdown text="Button text via Prop">
        <b-dropdown-item v-for="i in data" :key="i.key" href="#">
          An item
        </b-dropdown-item>
        <b-dropdown-item href="#">Another item</b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import InputSearch from '@/components/Inputs/InputSearch';

export default {
  components: {
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
    return {};
  },

  computed: {},
  watch: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import 'NFTSideMenu.scss';
</style>
<style lang="scss">
@import '~@/scss/GlobalVariables';

.nft-side-menu .mobile-menu {
  .btn-group {
    width: 100%;
  }
  .btn-secondary {
    background-color: white;
    color: $dark-blue-2;
    border: 1px solid $light-grey-7;
    padding: 15px 25px;
    font-size: 18px;
    font-weight: 600;
    text-align: left;
  }
}
</style>
