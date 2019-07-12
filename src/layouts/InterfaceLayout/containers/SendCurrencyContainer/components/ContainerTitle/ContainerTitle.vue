<template>
  <ul class="container-title"></ul>
</template>

<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
    titleInfo: {
      type: String,
      default: ''
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
@import 'ContainerTitle.scss';
</style>
