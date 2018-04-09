<template>
  <div class="wrapper">
    <HeaderArea></HeaderArea>
    <MenuArea></MenuArea>
    <Error v-show="error.open" :message="error.message"></Error>
    <div class="main">
      <b-card>
        <div id="toolbar">
          <sui-button basic size="mini" v-b-modal="'addnew.open'">Create</sui-button>
        </div>
        <div id="context">
          <sui-table single-line>
            <sui-table-header>
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
                <sui-table-header-cell>{{ item.id }}</sui-table-header-cell>
                <sui-table-header-cell>{{ item.name }}</sui-table-header-cell>
                <sui-table-header-cell>{{ item.description }}</sui-table-header-cell>
                <sui-table-header-cell>{{ item.created }}</sui-table-header-cell>
                <sui-table-header-cell>{{ item.enabled }}</sui-table-header-cell>
                <sui-table-header-cell>
                  <button class="ui mini editor button" v-on:click="editRole(item.id)">Edit</button>
                </sui-table-header-cell>
              </sui-table-row>
            </sui-table-body>
          </sui-table>
        </div>
        <b-modal ref="addnew" id="addnew.open" :title="addnew.title" centered size="lg">
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
            <button class="ui button primary" v-on:click="handleSubmit()">Create</button>
            <button class="ui button secondary" v-on:click="handleCancel()">Cancel</button>
          </div>
        </b-modal>
        <b-modal ref="edit" id="edit.open" :title="edit.title" centered size="lg">
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
                  <button class="ui negative button">Delete</button>
                </div>
              </div>
            </div>
          </div>
          <div class="field" slot="modal-footer">
            <button class="ui primary button">Save</button>
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
        msg: 'Roles',
        addnew: {
          open: false,
          title: 'Create New Role',
          data: {
            name: '',
            description: '',
            enabled: true
          }
        },
        edit: {
          open: false,
          title: 'Edit Role',
          data: {
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
      handleSubmit: function () {
        // TODO: validation

        var role = {
          name: this.addnew.data.name,
          description: this.addnew.data.description,
          enabled: this.addnew.data.enabled
        };
        this.doCreate(role);
      },
      handleCancel: function () {
        this.addnew.data.name = '';
        this.addnew.data.description = '';
        this.addnew.data.enabled = true;
        this.$refs.addnew.hide();
      },
      doCreate: function (role) {
        axios({
          method: 'post',
          url: utils.getRestUrl('/roles'),
          data: role,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': utils.getAuthorization()
          }
        }).then(response => {
          console.log(response.data);
          this.handleCancel();
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
          this.retrieve.items = response.data;
          console.log(response.data);
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
      editRole: function (id) {
        var g = this;
        g.retrieve.items.forEach(function (item) {
          if (item.id == id) {
            g.edit.data.name = item.name;
            g.edit.data.description = item.description;
            g.edit.data.enabled = item.enabled;
          }
        });
        g.$refs.edit.show();
      },
      deleteRole: function () {
        this.edit.delete.open = !this.edit.delete.open;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main #toolbar,
  .main #toolbar {
    padding-bottom: 1em;
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

  .field input[type="checkbox"] {
    width: 1.5em;
    height: 2em;
  }

  .field textarea {
    width: 240px;
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

  .title {
    font-weight: bold;
  }

  .description {
    color: #888;
  }

  .editor {
    padding: 4px 2px;
    width: 50px;
  }
</style>