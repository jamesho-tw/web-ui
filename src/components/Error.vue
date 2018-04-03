<template>
  <div class="main">
    <b-modal ref="error" centered size="lg" :hide-header-close="true" :no-close-on-esc="true" :no-close-on-backdrop="true" :title="title">
      <sui-message-header class="red">{{ message }}</sui-message-header>
      <div class="field" slot="modal-footer">
        <sui-button v-on:click="reload()">{{ buttons.reload }}</sui-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
  export default {
    props: ['message'],
    data() {
      return {
        title: "Error",
        buttons: {
          reload: 'Reload'
        }
      }
    },
    mounted() {
      this.$refs.error.show();
    },
    methods: {
      reload: function () {
        location.reload();
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>