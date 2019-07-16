<template>
  <div class="nft-side-menu">
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
