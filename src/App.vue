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
        brand: ''
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

  .main .table .editor {
    padding: 4px 2px;
    width: 50px;
  }

  .main .modal .field {
    padding: 0.25em 0;
  }

  .main .modal .field label {
    padding: 0 1em;
    text-align: right;
    line-height: 36px;
    width: 160px;
  }

  .main .modal .field input[type="text"],
  .main .modal .field input[type="password"],
  .main .modal .field input[type="date"],
  .main .modal .field textarea,
  .main .modal .field .selection {
    width: 240px;
  }

  .main .modal .field .datepicker {
    padding: .725em 1em;
    border: 1px solid rgba(34, 36, 38, .15);
    border-radius: 4px;
    height: 3em;
  }

  .main .modal .field .calendar {
    border-radius: 4px;
    width: 240px;
  }

  .main .modal .field .calendar .cell {
    height: 24px;
    line-height: 24px;
  }

  .main .modal .field input[type="checkbox"] {
    width: 1.5em;
    height: 2em;
  }

  .main .modal .field button.function {
    margin-left: 1em;
  }

  .main .modal .field .clear {
    clear: both;
  }

  .main .modal .field .checkbox {
    float: left;
  }

  .main .modal .field .message {
    padding: 0.3em 2em;
  }

  .main .modal .field .title {
    font-weight: bold;
  }

  .main .modal .field .description {
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