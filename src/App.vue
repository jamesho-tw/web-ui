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

  .main #toolbar {
    padding-bottom: 1em;
  }

  .main #context .editor {
    padding: 4px 2px;
    width: 50px;
  }

  .main #modal .field .input label {
    padding: 0 1em;
    text-align: right;
    line-height: 36px;
    width: 160px;
  }

  .main #modal .field .input input[type="text"],
  .main #modal .field .input input[type="password"] {
    width: 240px;
    height: 2.5em;
  }

  .main #modal .field input[type="checkbox"] {
    width: 1.5em;
    height: 2em;
  }

  .main #modal .field textarea {
    width: 240px;
  }

  .main #modal .field .clear {
    clear: both;
  }

  .main #modal .field .checkbox {
    float: left;
  }

  .main #modal .field .message {
    padding: 0.3em 2em;
  }

  .main #modal .field .title {
    font-weight: bold;
  }

  .main #modal .field .description {
    color: #888;
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