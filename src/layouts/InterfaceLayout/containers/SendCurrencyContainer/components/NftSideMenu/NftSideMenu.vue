<template>
  <ul class="nft-side-menu">
    <li
      v-for="i in data"
      :key="i.key"
      :class="i.selected == true ? 'selected' : ''"
    >
      {{ i.title }} ({{ i.count }})
    </li>
  </ul>
</template>

<script>
export default {
  components: {},
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
@import 'NftSideMenu.scss';
</style>
