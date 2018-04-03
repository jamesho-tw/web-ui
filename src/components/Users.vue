<template>
  <div class="wrapper">
    <HeaderArea></HeaderArea>
    <MenuArea></MenuArea>
    <div class="main">
      <b-card>
        <sui-button basic size="mini" v-b-modal="'create.open'">Create</sui-button>
        <sui-button basic size="mini" v-on:click="getUsers()">Edit</sui-button>
        <sui-button basic size="mini">Delete</sui-button>
        <sui-message v-show="getStatus()">
          <sui-message-header class="red">{{ error.message }}</sui-message-header>
        </sui-message>
        <div v-show="status" style="padding:1em 0;">
          <sui-table single-line>
            <sui-table-header>
              <sui-table-row>
                <sui-table-header-cell>
                  <sui-checkbox /></sui-table-header-cell>
                <sui-table-header-cell>ID</sui-table-header-cell>
                <sui-table-header-cell>Username</sui-table-header-cell>
                <sui-table-header-cell>Description</sui-table-header-cell>
                <sui-table-header-cell>Creation Date</sui-table-header-cell>
                <sui-table-header-cell>Status</sui-table-header-cell>
              </sui-table-row>
            </sui-table-header>
            <sui-table-body>
              <sui-table-row v-for="item in items" :key="item.id">
                <sui-table-cell>
                  <sui-checkbox /></sui-table-cell>
                <sui-table-cell>{{ item.id}}</sui-table-cell>
                <sui-table-cell>{{ item.username }}</sui-table-cell>
                <sui-table-cell></sui-table-cell>
                <sui-table-cell></sui-table-cell>
                <sui-table-cell>{{ item.enabled }}</sui-table-cell>
              </sui-table-row>
            </sui-table-body>
            <sui-table-footer>
              <sui-table-row>
                <sui-table-header-cell colspan="6">
                  <sui-menu v-sui-floated:right pagination>
                    <!-- <a is="sui-menu-item" icon>
                          <sui-icon name="left chevron" />
                        </a> -->
                    <a is="sui-menu-item">1</a>
                    <a is="sui-menu-item">2</a>
                    <a is="sui-menu-item">3</a>
                    <a is="sui-menu-item">4</a>
                    <!-- <a is="sui-menu-item" icon>
                          <sui-icon name="right chevron" />
                        </a> -->
                  </sui-menu>
                </sui-table-header-cell>
              </sui-table-row>
            </sui-table-footer>
          </sui-table>
        </div>
      </b-card>

      <b-modal ref="model" id="create.open" centered size="lg">
        <div class="field">
          <div class="ui left input">
            <label>Username:</label>
            <input type="text" v-model="create.username.value" autocomplete="off" />
          </div>

        </div>
        <div class="field">
          <div class="ui left input">
            <label>Password:</label>
            <input type="password" v-bind:type="create.password.type" v-on:dblclick="togglePassword()" v-model="create.password.value"
              autocomplete="off" />
            <button class="ui left button" v-on:click="randomPassword()">Generate Random Password</button>
          </div>
        </div>
        <div class="field">
          <div class="ui left input">
            <label>Confirm Password:</label>
            <input type="password" v-bind:type="create.password.type" v-on:dblclick="togglePassword()" v-model="create.password.confirm"
              autocomplete="off" />
          </div>
        </div>
        <div class="field">
          <div class="ui left input">
            <label>Roles:</label>
            <sui-dropdown fluid multiple selection />
          </div>
        </div>
        <div class="field">
          <div class="clear">
            <div class="checkbox">
              <input type="checkbox" v-model="create.password.force" />
            </div>
            <div class="message">Force users to change password after the administrator resets the password</div>
          </div>
        </div>
        <div class="field">
          <div class="clear">
            <div class="checkbox">
              <input type="checkbox" v-model="create.enabled" />
            </div>
            <div class="message">Enabled</div>
          </div>
        </div>
        <div class="field" slot="modal-footer">
          <button class="ui button primary" v-on:click="handleSubmit()">Create</button>
          <button class="ui button secondary" v-on:click="handleCancel()">Cancel</button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
  import HeaderArea from '@/components/HeaderArea'
  import MenuArea from '@/components/MenuArea'
  export default {
    name: "Users",
    components: {
      HeaderArea,
      MenuArea
    },
    data() {
      return {
        msg: "Users",
        create: {
          username: {
            value: '',
            type: 'text'
          },
          password: {
            value: '',
            confirm: '',
            force: false,
            type: 'password'
          },
          enabled: true,
          open: false
        },
        status: true,
        error: {
          message: ''
        },
        fields: [
          { key: 'id', label: 'Index', sortable: true },
          { key: 'username', label: 'Username', sortable: true },
          { key: 'description', label: 'Description', sortable: false },
          { key: 'enabled', label: 'Status', sortable: true },
        ],
        items: []
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init: function () {
        this.getUsers();
      },
      getStatus: function () {
        return !this.status;
      },
      randomPassword: function () {
        this.create.password.type = 'text';
        this.create.password.value = Math.random().toString(34).slice(-8);
        this.create.password.confirm = this.create.password.value;
      },
      togglePassword: function () {
        if (this.create.password.type == 'text') {
          this.create.password.type = 'password';
        } else {
          this.create.password.type = 'text';
        }
      },
      createUser: function () {
        this.create.open = true;
      },
      handleCancel: function () {
        this.create.username.value = '';
        this.create.password.value = '';
        this.create.password.type = 'password';
        this.create.password.confirm = '';
        this.create.password.force = false;
        this.create.enabled = true;
        this.$refs.model.hide();
      },
      handleSubmit: function () {
        // if (!checkUsername(this.create.username.value)) {
        //   return false;
        // }
        // if (!checkPassword(8, this.create.password.value, this.create.password.confirm)) {
        //   return false;
        // }
        var user = {
          username: this.create.username.value,
          password: this.create.password.value,
          force: this.create.password.force,
          enabled: this.create.enabled,
        };
        doCreate(user);
        this.handleCancel();
      },
      getUsers: function () {
        axios({
          method: 'get',
          url: 'http://localhost:3000/users',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          this.status = true;
          this.items = response.data;
        }).catch(error => {
          this.status = false;
          this.error.message = 'Connection refuse!';
          console.log(error);
        });
      }
    }
  };
  function checkUsername(username) {
    if (username.length < 1) {
      return false;
    }
    return true;
  }
  function checkPassword(size, password1, password2) {
    if (password1.length < size) {
      return false;
    }
    if (password1 != password2) {
      return false;
    }
    return true;
  }
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
  function doCreate(user) {
    var userinfo = getUserinfo(localStorage['USERINFO']);
    var tokenType = (userinfo.token.token_type) ? userinfo.token.token_type : 'Bearer';
    var accessToken = (userinfo.token.access_token) ? userinfo.token.access_token : '';
    axios({
      method: 'post',
      url: 'http://localhost:3000/users',
      data: user,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenType.concat(' ').concat(accessToken)
      }
    }).then(response => {
      console.log(response.data);
      this.$router.push('/users');
    }).catch(error => {
      this.status = false;
      this.error.message = 'Connection refuse!';
      console.log(error);
    });
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ui.basic.button:hover {
    /* background-color:#f2f8fe !important; */
    background-color: #eee !important;
    font-weight: bold;
  }

  .field .input label {
    padding: 0 1em;
    text-align: right;
    line-height: 36px;
    width: 160px;
  }

  .input input[type="text"],
  .input input[type="password"] {
    width: 240px;
    height: 2.5em;
  }

  .field .selection {
    width: 240px;
    height: 2em;
  }

  .field input[type="checkbox"] {
    width: 1.5em;
    height: 2em;
  }

  .field .input button {
    margin-left: 1em;
    height: 2.5em;
  }

  .field .checkbox {
    float: left;
  }

  .field .message {
    padding: 0.3em 2em;
  }

  .field .clear {
    clear: both;
  }
</style>