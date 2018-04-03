<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  console.log(process.env.NODE_ENV);
  export default {
    name: "App",
    data() {
      return {
        brand: 'EG084'
      }
    }
  };
</script>

<style>
  .white {
    color: #fff;
  }

  .red {
    color: red;
  }

  .nav-collapse {
    width: 15%;
    height: 100%;
    position: fixed;
    overflow: auto;
    background-color: #eee;
  }

  .nav-collapse li {
    list-style: none;
    line-height: 3em;
    padding: 0em 1em;
    color: #777;
    cursor: pointer;
  }

  .nav-collapse li.active {
    background-color: #ddd;
  }

  .nav-collapse li:hover {
    font-weight: bold;
    background-color: #ddd;
  }

  .nav-collapse div :not(collapsed) .arrow:before {
    font-family: FontAwesome;
    content: "\f078";
    display: block;
    padding-left: 1em;
    padding-right: 1em;
    float: right;
  }

  .nav-collapse a {
    color: #777;
    text-decoration: none;
  }

  .nav-collapse li i {
    padding-right: 1em;
  }

  .main {
    width: 85%;
    height: 100%;
    padding: 1em;
    display: block;
    float: right;
  }

  @media screen and (max-height: 1080px) {
    .ui.basic.button:hover {
      background-color: #f2f8fe !important;
      font-weight: bold;
    }
    .card {
      height: 870px;
    }
  }
</style>