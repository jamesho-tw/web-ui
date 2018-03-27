<template>
  <div id="app">
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand href="#">{{ brand }}</b-navbar-brand>
      <b-navbar-nav>
        <b-dropdown variant="link" size="sm" right no-caret>
          <template slot="button-content">
            <i class="fa fa-user-circle fa-2x white"></i>
          </template>
          <b-dropdown-item href="#">Settings</b-dropdown-item>
          <b-dropdown-item href="#">Logout</b-dropdown-item>
        </b-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <div class="nav-collapse">
      <li><a href="#"><i class="fa fa-dashboard fa-sm"></i>Dashboard</a></li>
      <li v-b-toggle.users>
        <a href="#"><i class="fa fa-id-card fa-sm"></i>User Managment<span class="arrow"></span></a>
      </li>
      <b-collapse id="users">
        <li><a href="#">Users</a></li>
        <li><a href="#">Roles</a></li>
      </b-collapse>
      <li><a href="#"><i class="fa fa-area-chart fa-sm"></i>Reports</a></li>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data () {
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

.nav-collapse li :not(collapsed) .arrow:before {
  font-family: FontAwesome;
  content: "\f078";
  display: block;
  padding-left: 1em;
  padding-right: 1em;
  float: right;
}

.nav-collapse li a {
  color: #777;
  text-decoration: none;
}

.nav-collapse li a i {
  padding-right: 1em;
}

.main {
  width: 85%;
  height: 100%;
  padding: 1em;
  display: block;
  float: right;
}
</style>
