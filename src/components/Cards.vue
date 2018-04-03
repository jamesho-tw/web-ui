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
  import HeaderArea from '@/components/HeaderArea'
  import MenuArea from '@/components/MenuArea'
  export default {
    name: "Cards",
    components: {
      HeaderArea,
      MenuArea
    },
    data() {
      return {
        msg: 'Cards'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>