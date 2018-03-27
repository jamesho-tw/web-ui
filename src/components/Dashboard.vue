<template>
  <div class="main">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
/*
axios({
  method: 'get',
  url: 'http://localhost:3000/users/1',
  headers: {
    'Content-Type': 'application/json'
  }
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.log(error);
});
*/
const moment = require('moment');
console.log(moment());

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
