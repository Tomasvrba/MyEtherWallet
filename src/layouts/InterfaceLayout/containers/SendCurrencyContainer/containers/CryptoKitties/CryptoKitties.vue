<template>
  <div class="crypto-kitties"></div>
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
@import 'CryptoKitties.scss';
</style>
