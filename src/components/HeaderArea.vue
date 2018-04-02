<template>
  <b-navbar type="dark" variant="dark">
    <b-navbar-brand href="#">{{ brand }}</b-navbar-brand>
    <b-navbar-nav>
      <b-dropdown variant="link" size="sm" right no-caret>
        <template slot="button-content">
          <span v-html="navbar[0].icon" />
        </template>
        <b-dropdown-item v-for="item in navbar[0].items" :key="item.name" v-on:click="logout()">{{ item.name }}</b-dropdown-item>
      </b-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'Welcome!',
        brand: '',
        navbar: [
          {
            icon: '<i class="fa fa-user-circle fa-2x white"></i>',
            items: [
              { name: 'Setting' },
              { name: 'Logout' }
            ]
          }
        ]
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init: function () {
        var userinfo = getUserinfo(localStorage['USERINFO']);
        this.brand = userinfo.username;
      },
      logout: function () {
        // TODO: call logout process
        localStorage.removeItem('USERINFO');
        this.$router.push('/login');
      }
    }
  };
  function getUserinfo(o) {
    var result = {};
    try {
      result = JSON.parse(atob(o));
    } catch (error) {
      console.log(error);
      result = {};
    }
    finally {
      return result;
    }
  }
</script>