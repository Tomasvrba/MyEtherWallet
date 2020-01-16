<template>
  <b-modal
    ref="bitboxModal"
    title="BitBox02"
    hide-footer
    class="bootstrap-modal nopadding modal-mew-connect"
    centered
  >
    <div class="modal-container">
      <p>BitBox02</p>
      <iframe id="bbFrame" :src="doc" style="display:block;"></iframe>
    </div>
    <!-- .modal-container -->
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      doc: ''
    };
  },
  mounted() {
    const parser = new DOMParser();
    this.doc = parser.parseFromString('<p>Its a mee iframio</p>', 'text/html');
    console.log(this.doc);
  }
};
</script>

<style lang="scss" scoped>
@import 'XwalletModal-desktop.scss';
@import 'XwalletModal-tablet.scss';
@import 'XwalletModal-mobile.scss';
</style>
