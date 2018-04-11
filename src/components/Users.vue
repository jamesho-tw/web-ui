<template>
  <div class="wrapper">
    <HeaderArea></HeaderArea>
    <MenuArea></MenuArea>
    <Error v-show="error.open" :message="error.message"></Error>
    <div class="main">
      <b-card>
        <div id="toolbar">
          <sui-button basic size="mini" v-on:click="openAddnewUser()">Create</sui-button>
        </div>
        <div id="context">
          <sui-table single-line>
            <sui-table-header>
              <sui-table-row>
                <sui-table-header-cell>ID</sui-table-header-cell>
                <sui-table-header-cell>Username</sui-table-header-cell>
                <sui-table-header-cell>Description</sui-table-header-cell>
                <sui-table-header-cell>Creation Date</sui-table-header-cell>
                <sui-table-header-cell>Status</sui-table-header-cell>
                <sui-table-header-cell></sui-table-header-cell>
              </sui-table-row>
            </sui-table-header>
            <sui-table-body>
              <sui-table-row v-for="item in retrieve.items" :key="item.id">
                <sui-table-cell>{{ item.id }}</sui-table-cell>
                <sui-table-cell>{{ item.username }}</sui-table-cell>
                <sui-table-cell>{{ item.description }}</sui-table-cell>
                <sui-table-cell>{{ item.created }}</sui-table-cell>
                <sui-table-cell>{{ item.enabled }}</sui-table-cell>
                <sui-table-cell>
                  <button class="ui mini editor button" v-on:click="openEditUser(item.id)">Edit</button>
                </sui-table-cell>
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
        <div id="modal">
          <b-modal ref="addnew" :title="addnew.title" centered size="lg">
            <div class="field">
              <div class="ui left input">
                <label>Username:</label>
                <input type="text" v-model="addnew.data.username" autocomplete="off" />
              </div>
            </div>
            <div class="field">
              <div class="ui left input">
                <label>Password:</label>
                <input type="password" v-bind:type="addnew.password.type" v-on:dblclick="handleDisplayPasswordAddnew()" v-model="addnew.data.password"
                  autocomplete="off" />
                <button class="ui left function button" v-on:click="handleRandomPasswordAddnew()">Generate Random Password</button>
              </div>
            </div>
            <div class="field">
              <div class="ui left input">
                <label>Confirm Password:</label>
                <input type="password" v-bind:type="addnew.password.type" v-on:dblclick="handleDisplayPasswordAddnew()" v-model="addnew.password.confirm"
                  autocomplete="off" />
              </div>
            </div>
            <div class="field">
              <div class="ui left input">
                <label>Roles:</label>
                <sui-dropdown class="ui tiny" fluid multiple selection :options="roles.options" v-model="addnew.data.roles" />
              </div>
            </div>
            <div class="field">
              <div class="ui left input">
                <label>Description:</label>
                <div class="ui reply form">
                  <textarea v-model="addnew.data.description"></textarea>
                </div>
              </div>
            </div>
            <hr />
            <div class="field">
              <div class="clear">
                <div class="checkbox">
                  <input type="checkbox" v-model="addnew.data.force" />
                </div>
                <div class="message">Force users to change password after the administrator resets the password</div>
              </div>
            </div>
            <div class="field">
              <div class="clear">
                <div class="checkbox">
                  <input type="checkbox" v-model="addnew.data.enabled" />
                </div>
                <div class="message">Enabled</div>
              </div>
            </div>
            <div class="field" slot="modal-footer">
              <button class="ui button primary" v-on:click="handleAddnewCreate()">Create</button>
              <button class="ui button secondary" v-on:click="handleAddnewCancel()">Cancel</button>
            </div>
          </b-modal>
          <b-modal ref="edit" :title="edit.title" centered size="lg">
            <div class="field">
              <div class="ui left input">
                <label>Username:</label>
                <input type="text" v-model="edit.data.username" autocomplete="off" />
              </div>
            </div>
            <div class="field">
              <div class="ui left input">
                <label>Password:</label>
                <input type="password" v-bind:type="edit.password.type" v-on:dblclick="handleDisplayPasswordEdit()" v-model="edit.data.password"
                  autocomplete="off" />
                <button class="ui left function button" v-on:click="handleRandomPasswordEdit()">Generate Random Password</button>
              </div>
            </div>
            <div class="field">
              <div class="ui left input">
                <label>Confirm Password:</label>
                <input type="password" v-bind:type="edit.password.type" v-on:dblclick="handleDisplayPasswordEdit()" v-model="edit.password.confirm"
                  autocomplete="off" />
              </div>
            </div>
            <div class="field">
              <div class="ui left input">
                <label>Roles:</label>
                <sui-dropdown fluid multiple selection :options="roles.options" v-model="edit.data.roles" />
              </div>
            </div>
            <div class="field">
              <div class="ui left input">
                <label>Description:</label>
                <div class="ui reply form">
                  <textarea v-model="edit.data.description"></textarea>
                </div>
              </div>
            </div>
            <hr />
            <div class="field">
              <div class="clear">
                <div class="checkbox">
                  <input type="checkbox" v-model="edit.data.force" />
                </div>
                <div class="message">Force users to change password after the administrator resets the password</div>
              </div>
            </div>
            <div class="field">
              <div class="clear">
                <div class="checkbox">
                  <input type="checkbox" v-model="edit.data.enabled" />
                </div>
                <div class="message">Enabled</div>
              </div>
            </div>
            <hr />
            <div class="field">
              <div class="clear">
                <div class="title" v-on:click="deleteUser()">Delete this user</div>
                <div class="description" v-show="edit.delete.open">Once you delete this user, there is no going back.</div>
                <div class="ui divided items" v-show="edit.delete.open">
                  <div class="item">
                    <button class="ui negative button" v-on:click="handleEditDelete()">Delete</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="field" slot="modal-footer">
              <button class="ui primary button" v-on:click="handleEditSave()">Save</button>
            </div>
          </b-modal>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
  import utils from '../scripts/utils.js'
  import HeaderArea from '@/components/HeaderArea'
  import MenuArea from '@/components/MenuArea'
  import Error from '@/components/Error'
  export default {
    name: "Users",
    components: {
      HeaderArea,
      MenuArea,
      Error
    },
    data() {
      return {
        addnew: {
          title: 'Create New User',
          data: {
            username: '',
            password: '',
            description: '',
            force: false,
            enabled: true,
            roles: []
          },
          password: {
            confirm: '',
            type: 'password'
          }
        },
        edit: {
          title: 'Edit User',
          data: {
            id: null,
            username: '',
            password: '',
            description: '',
            force: false,
            enabled: true,
            roles: []
          },
          password: {
            confirm: '',
            type: 'password'
          },
          delete: {
            open: false
          }
        },
        retrieve: {
          items: []
        },
        error: {
          open: false,
          message: ''
        },
        roles: {
          options: []
        }
      };
    },
    mounted() {
      this.getUsers();
    },
    methods: {
      handleDisplayPasswordAddnew: function () {
        if (this.addnew.password.type == 'text') {
          this.addnew.password.type = 'password';
        } else {
          this.addnew.password.type = 'text';
        }
      },
      handleDisplayPasswordEdit: function () {
        if (this.edit.password.type == 'text') {
          this.edit.password.type = 'password';
        } else {
          this.edit.password.type = 'text';
        }
      },
      handleRandomPasswordAddnew: function () {
        this.addnew.password.type = 'text';
        var r = Math.random().toString(34).slice(-8);
        this.addnew.data.password = r;
        this.addnew.password.confirm = r;
      },
      handleRandomPasswordEdit: function () {
        this.edit.password.type = 'text';
        var r = Math.random().toString(34).slice(-8);
        this.edit.data.password = r;
        this.edit.password.confirm = r;
      },
      handleAddnewCancel: function () {
        this.addnew.data.username = '';
        this.addnew.data.password = '';
        this.addnew.data.description = '';
        this.addnew.data.force = false;
        this.addnew.data.enabled = true;
        this.addnew.password.confirm = '';
        this.$refs.addnew.hide();
      },
      handleAddnewCreate: function () {
        // if (!checkUsername(this.addnew.data.username)) {
        //   return false;
        // }
        // if (!checkPassword(8, this.addnew.data.password, this.addnew.password.confirm)) {
        //   return false;
        // }
        axios({
          method: 'post',
          url: utils.getRestUrl('/users'),
          data: JSON.stringify(this.addnew.data),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': utils.getAuthorization()
          }
        }).then(response => {
          // console.log(response.data);
          this.getUsers();
          this.handleAddnewCancel();
        }).catch(error => {
          console.log(error);
        });
        this.handleAddnewCancel();
      },
      handleEditSave: function () {
        var user = {
          id: this.edit.data.id,
          username: this.edit.data.name,
          password: this.edit.data.password,
          description: this.edit.data.description,
          force: this.edit.data.force,
          enabled: this.edit.data.enabled
        };
        axios({
          method: 'patch',
          url: utils.getRestUrl('/users/'.concat(user.id)),
          data: user,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': utils.getAuthorization()
          }
        }).then(response => {
          // console.log(response.data);
          this.getUsers();
          this.$refs.edit.hide();
        }).catch(error => {
          console.log(error);
        });
      },
      handleEditDelete: function () {
        axios({
          method: 'delete',
          url: utils.getRestUrl('/users/'.concat(this.edit.data.id)),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': utils.getAuthorization()
          }
        }).then(response => {
          // console.log(response.data);
          this.getUsers();
          this.$refs.edit.hide();
        }).catch(error => {
          console.log(error);
        });
      },
      getUsers: function () {
        axios({
          method: 'get',
          url: utils.getRestUrl('/users'),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          // console.log(response.data);
          this.retrieve.items = response.data;
        }).catch(error => {
          this.error.open = true;
          this.error.message = 'Connection refuse!';
          console.log(error);
        });
      },
      getRoleOptions: function () {
        axios({
          method: 'get',
          url: utils.getRestUrl('/roles'),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': utils.getAuthorization()
          }
        }).then(response => {
          // console.log(response.data);

          // reset
          this.roles.options = [];

          var options = [];
          response.data.forEach(function (item) {
            if (item.enabled) {
              options.push({
                key: item.id,
                value: item.id,
                text: item.name,
              });
            }
          });
          this.roles.options = options;
        }).catch(error => {
          this.error.open = true;
          if (!error.response) {
            this.error.message = 'Connection refuse!';
          } else {
            this.error.message = error.response.data;
            switch (error.response.status) {
              case 404:
                console.log('404 not found');
                break;
            }
            console.log(error.response.data);
            console.log(error.response.status);
          }
        });
      },
      openAddnewUser: function () {
        this.getRoleOptions();
        this.$refs.addnew.show();
      },
      openEditUser: function (id) {
        var user = {};
        this.retrieve.items.forEach(function (item) {
          if (item.id == id) {
            user = item;
          }
        });
        this.edit.data['id'] = user.id;
        this.edit.data['username'] = user.username;
        this.edit.data['password'] = user.password;
        this.edit.data['description'] = user.description;
        this.edit.data['force'] = user.force;
        this.edit.data['enabled'] = user.enabled;
        this.edit.data['roles'] = user.roles;
        this.edit.password['confirm'] = user.password;
        this.edit.password['type'] = 'password';
        this.getRoleOptions();
        this.$refs.edit.show();
      },
      deleteUser: function () {
        this.edit.delete.open = !this.edit.delete.open;
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>