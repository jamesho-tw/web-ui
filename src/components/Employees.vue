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
                <sui-button basic size="mini" v-on:click="openAddnewEmployee()">Create</sui-button>
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
                <sui-button size="mini" class="editor" v-on:click="openEditEmployee(item.id)">Edit</sui-button>
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
              <div class="title" v-on:click="deleteEmployee()">Delete this employee</div>
              <div class="description" v-show="edit.delete.open">Once you delete this employee, there is no going back.</div>
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
    name: "Cards",
    components: {
      HeaderArea,
      MenuArea,
      Error
    },
    data() {
      return {
        addnew: {
          title: 'Create New Employee',
          data: initialAddnew()
        },
        edit: {
          title: 'Edit Employee',
          data: {},
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
      this.getEmployees();
    },
    methods: {
      handleAddnewCancel: function () {
        this.addnew.data = initialAddnew();
        this.$refs.addnew.hide();
      },
      handleAddnewCreate: function () {
        // TODO: validation
        axios({
          method: 'post',
          url: utils.getRestUrl('/employees'),
          data: JSON.stringify(this.addnew.data),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': utils.getAuthorization()
          }
        }).then(response => {
          // console.log(response.data);
          this.getEmployees();
          this.handleAddnewCancel();
        }).catch(error => {
          console.log(error);
        });
      },
      handleEditSave: function (id) {
        // TODO: validation
        axios({
          method: 'patch',
          url: utils.getRestUrl('/employees/'.concat(this.edit.data.id)),
          data: JSON.stringify(this.edit.data),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': utils.getAuthorization()
          }
        }).then(response => {
          // console.log(response.data);
          this.getEmployees();
          this.$refs.edit.hide();
        }).catch(error => {
          console.log(error);
        });
      },
      handleEditDelete: function () {
        axios({
          method: 'delete',
          url: utils.getRestUrl('/employees/'.concat(this.edit.data.id)),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': utils.getAuthorization()
          }
        }).then(response => {
          // console.log(response.data);
          this.getEmployees();
          this.$refs.edit.hide();
        }).catch(error => {
          console.log(error);
        });
      },
      getEmployees: function () {
        axios({
          method: 'get',
          url: utils.getRestUrl('/employees'),
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
      openAddnewEmployee: function () {
        this.$refs.addnew.show();
      },
      openEditEmployee: function (id) {
        var employee = {};
        this.retrieve.items.forEach(function (item) {
          if (item.id == id) {
            employee = item;
          }
        });
        this.edit.data = {
          id: employee.id,
          name: employee.name,
          description: employee.description,
          enabled: employee.enabled
        };
        this.$refs.edit.show();
      },
      deleteEmployee: function () {
        this.edit.delete.open = !this.edit.delete.open;
      }
    }
  }
  function initialAddnew() {
    return {
      name: [],
      description: '',
      enabled: true
    };
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>