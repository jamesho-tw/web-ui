<template>
  <div class="wrapper">
    <div class="ui form login">
      <h2>{{ title }}</h2>
      <div class="field">
        <div class="ui left icon input">
          <input type="text" v-focus ref="username" v-bind:placeholder="inputs[0].name" v-model="username" @keyup.esc="clear('username')"
            @keyup.enter="checkUsername()" />
          <i class="user icon"></i>
        </div>
      </div>
      <div class="field">
        <div class="ui left icon input">
          <input type="password" ref="password" v-bind:placeholder="inputs[1].name" v-model="password" @keyup.esc="clear('password')"
            @keyup.enter="checkPassword()" autocomplete="off" />
          <i class="lock icon"></i>
        </div>
      </div>
      <div class="field">
        <sui-checkbox label="Remember me" />
      </div>
      <div class="field">
        <sui-button basic style="width:100%;" v-on:click="login()">{{ buttons[0].name }}</sui-button>
      </div>
    </div>
    <div class="footer">
      <hr />
      <div class="center">{{ copyright }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },
    data() {
      return {
        title: 'Login',
        inputs: [
          { name: 'Username' },
          { name: 'Password' }
        ],
        buttons: [
          { name: 'Login' }
        ],
        copyright: 'Copyright © 2018 OpenTNA, All rights reserved.',
        username: '',
        password: ''
      }
    },
    methods: {
      clear(target) {
        this[target] = '';
      },
      checkUsername() {
        if (this.username.length > 0) {
          if (this.password.length == 0) {
            this.$refs.password.focus();
          } else {
            this.login();
          }
        }
      },
      checkPassword() {
        if (this.password.length > 0) {
          if (this.username.length == 0) {
            this.$refs.username.focus();
          } else {
            this.login();
          }
        }
      },
      login() {
        var tokenType = 'Basic';
        var username = (this.username) ? this.username : '';
        var password = (this.password) ? this.password : '';
        var credentials = btoa(username.concat(':').concat(password))
        axios({
          method: 'get',
          url: 'http://localhost:3000/auth/token',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': tokenType.concat(' ').concat(credentials)
          }
        }).then(response => {
          this.getUserinfo(response.data);
        }).catch(error => {
          console.log(error);
        });
      },
      getUserinfo(token) {
        var tokenType = (token.token_type) ? token.token_type : 'Bearer';
        var accessToken = (token.access_token) ? token.access_token : '';
        axios({
          method: 'get',
          url: 'http://localhost:3000/profile',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': tokenType.concat(' ').concat(accessToken)
          }
        }).then(response => {
          var userinfo = response.data;
          userinfo['token'] = token;
          if (token && userinfo) {
            localStorage['USERINFO'] = btoa(JSON.stringify(userinfo));
            this.$router.push('/');
          }
        }).catch(error => {
          console.log(error);
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrapper {
    font-family: Verdana, Tahoma;
    padding: 10em 0;
  }

  .login {
    width: 400px;
    margin: auto;
    padding: 1em;
    overflow: hidden;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
    box-shadow: 0px 4px 16px -4px #070707;
    -webkit-box-shadow: 0px 4px 16px -4px #070707;
  }

  .footer {
    padding: 10em 1em;
  }

  .footer .center {
    color: #888;
    text-align: center;
  }
</style>