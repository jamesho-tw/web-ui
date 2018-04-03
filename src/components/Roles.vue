<template>
  <div class="wrapper">
    <HeaderArea></HeaderArea>
    <MenuArea></MenuArea>
    <Error v-show="error.open" :message="error.message"></Error>
    <div class="main">
      <b-card>
        <div id="toolbar">
          <sui-button basic size="mini" v-b-modal="'create.open'">Create</sui-button>
          <sui-button basic size="mini">Edit</sui-button>
          <sui-button basic size="mini">Delete</sui-button>
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
              </sui-table-row>
            </sui-table-header>
            <sui-table-body>
              <sui-table-row v-for="item in retrieve.items" :key="item.id">
                <sui-table-header-cell>{{ item.id }}</sui-table-header-cell>
                <sui-table-header-cell>{{ item.name }}</sui-table-header-cell>
                <sui-table-header-cell>{{ item.description }}</sui-table-header-cell>
                <sui-table-header-cell>{{ item.created }}</sui-table-header-cell>
                <sui-table-header-cell>{{ item.enabled }}</sui-table-header-cell>
              </sui-table-row>
            </sui-table-body>
          </sui-table>
        </div>
        <b-modal ref="model" id="create.open" :title="create.title" centered size="lg">
          <div class="field">
            <div class="ui left input">
              <label>Name:</label>
              <input type="text" v-model="create.form.name" autocomplete="off" />
            </div>
          </div>
          <div class="field">
            <div class="ui left input">
              <label>Description:</label>
              <div class="ui reply form">
                <textarea v-model="create.form.description"></textarea>
              </div>
            </div>
          </div>
          <hr />
          <div class="field">
            <div class="clear">
              <div class="checkbox">
                <input type="checkbox" v-model="create.form.enabled" />
              </div>
              <div class="message">Enabled</div>
            </div>
          </div>
          <div class="field" slot="modal-footer">
            <button class="ui button primary" v-on:click="handleSubmit()">Create</button>
            <button class="ui button secondary" v-on:click="handleCancel()">Cancel</button>
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
        create: {
          open: false,
          title: 'Create New Role',
          form: {
            name: '',
            description: '',
            enabled: true
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
          name: this.create.form.name,
          description: this.create.form.description,
          enabled: this.create.form.enabled
        };
        this.doCreate(role);
      },
      handleCancel: function () {
        this.create.form.name = '';
        this.create.form.description = '';
        this.create.form.enabled = true;
        this.$refs.model.hide();
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
          url: utils.getRestUrl('/rolesxx'),
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
</style>