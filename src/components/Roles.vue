<template>
  <div class="wrapper">
    <HeaderArea></HeaderArea>
    <MenuArea></MenuArea>
    <Error v-show="error.open" :message="error.message"></Error>
    <div class="main">
      <b-card>
        <sui-table celled striped>
          <sui-table-header>
            <sui-table-row>
              <sui-table-cell colspan="6">
                <sui-button basic size="mini" v-on:click="openAddnewRole()">Create</sui-button>
              </sui-table-cell>
            </sui-table-row>
            <sui-table-row>
              <sui-table-header-cell>ID</sui-table-header-cell>
              <sui-table-header-cell>Name</sui-table-header-cell>
              <sui-table-header-cell>Description</sui-table-header-cell>
              <sui-table-header-cell>Creation Date</sui-table-header-cell>
              <sui-table-header-cell>Status</sui-table-header-cell>
              <sui-table-header-cell></sui-table-header-cell>
            </sui-table-row>
          </sui-table-header>
          <sui-table-body>
            <sui-table-row v-for="item in retrieve.items" :key="item.id">
              <sui-table-cell>{{ item.id }}</sui-table-cell>
              <sui-table-cell>{{ item.name }}</sui-table-cell>
              <sui-table-cell>{{ item.description }}</sui-table-cell>
              <sui-table-cell>{{ item.created }}</sui-table-cell>
              <sui-table-cell>{{ item.enabled }}</sui-table-cell>
              <sui-table-cell>
                <sui-button size="mini" class="editor" v-on:click="openEditRole(item.id)">Edit</sui-button>
              </sui-table-cell>
            </sui-table-row>
          </sui-table-body>
        </sui-table>
        <!-- Addnew -->
        <b-modal ref="addnew" :title="addnew.title" centered size="lg">
          <div class="field">
            <div class="ui left input">
              <label>Name:</label>
              <input type="text" v-model="addnew.data.name" autocomplete="off" />
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

        <!-- Edit -->
        <b-modal ref="edit" :title="edit.title" centered size="lg">
          <div class="field">
            <div class="ui left input">
              <label>Name:</label>
              <input type="text" v-model="edit.data.name" autocomplete="off" />
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
                <input type="checkbox" v-model="edit.data.enabled" />
              </div>
              <div class="message">Enabled</div>
            </div>
          </div>
          <hr />
          <div class="field">
            <div class="clear">
              <div class="title" v-on:click="deleteRole()">Delete this role</div>
              <div class="description" v-show="edit.delete.open">Once you delete this role, there is no going back.</div>
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
    name: "Roles",
    components: {
      HeaderArea,
      MenuArea,
      Error
    },
    data() {
      return {
        addnew: {
          title: 'Create New Role',
          data: {
            name: '',
            description: '',
            enabled: true
          }
        },
        edit: {
          title: 'Edit Role',
          data: {
            id: null,
            name: '',
            description: '',
            enabled: true
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
        }
      }
    },
    mounted() {
      this.getRoles();
    },
    methods: {
      handleAddnewCancel: function () {
        this.addnew.data.name = '';
        this.addnew.data.description = '';
        this.addnew.data.enabled = true;
        this.$refs.addnew.hide();
      },
      handleAddnewCreate: function () {
        // TODO: validation
        var role = {
          name: this.addnew.data.name,
          description: this.addnew.data.description,
          enabled: this.addnew.data.enabled
        };
        axios({
          method: 'post',
          url: utils.getRestUrl('/roles'),
          data: role,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': utils.getAuthorization()
          }
        }).then(response => {
          // console.log(response.data);
          this.getRoles();
          this.handleAddnewCancel();
        }).catch(error => {
          console.log(error);
        });
      },
      handleEditSave: function (id) {
        var role = {
          id: this.edit.data.id,
          name: this.edit.data.name,
          description: this.edit.data.description,
          enabled: this.edit.data.enabled
        };
        axios({
          method: 'patch',
          url: utils.getRestUrl('/roles/'.concat(role.id)),
          data: role,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': utils.getAuthorization()
          }
        }).then(response => {
          // console.log(response.data);
          this.getRoles();
          this.$refs.edit.hide();
        }).catch(error => {
          console.log(error);
        });
      },
      handleEditDelete: function () {
        axios({
          method: 'delete',
          url: utils.getRestUrl('/roles/'.concat(this.edit.data.id)),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': utils.getAuthorization()
          }
        }).then(response => {
          // console.log(response.data);
          this.getRoles();
          this.$refs.edit.hide();
        }).catch(error => {
          console.log(error);
        });
      },
      getRoles: function () {
        axios({
          method: 'get',
          url: utils.getRestUrl('/roles'),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': utils.getAuthorization()
          }
        }).then(response => {
          // console.log(response.data);
          this.retrieve.items = response.data;
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
      openAddnewRole: function () {
        this.$refs.addnew.show();
      },
      openEditRole: function (id) {
        var role = {};
        this.retrieve.items.forEach(function (item) {
          if (item.id == id) {
            role['id'] = item.id;
            role['name'] = item.name;
            role['description'] = item.description;
            role['enabled'] = item.enabled;
          }
        });
        this.edit.data.id = role.id;
        this.edit.data.name = role.name;
        this.edit.data.description = role.description;
        this.edit.data.enabled = role.enabled;
        this.$refs.edit.show();
      },
      deleteRole: function () {
        this.edit.delete.open = !this.edit.delete.open;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>