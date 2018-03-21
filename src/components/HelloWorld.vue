<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button class="ui button">Follow</button>
    </div>
</template>

<script>
const moment = require('moment');
import 'semantic-ui-css/semantic.min.css';

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
console.log(moment());
//console.log($('div.hello').html());

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
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
