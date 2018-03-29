<template>
  <div class="wrapper">
    <HeaderArea></HeaderArea>
    <MenuArea></MenuArea>
    <div class="main">
      <h1>{{ msg }}</h1>
    </div>
  </div>
</template>

<script>
  // const moment = require('moment');
  // console.log(moment());
  import HeaderArea from '@/components/HeaderArea'
  import MenuArea from '@/components/MenuArea'
  export default {
    name: 'Dashboard',
    components: {
      HeaderArea,
      MenuArea
    },
    data() {
      return {
        msg: 'Welcome!'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>