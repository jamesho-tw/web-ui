<template>
  <div class="wrapper">
    <HeaderArea></HeaderArea>
    <MenuArea></MenuArea>
    <Error v-show="error.open" :message="error.message"></Error>
    <div class="main">
      <b-card>
        <div id="toolbar">
          <sui-button basic size="mini" v-on:click="openAddnewCard()">Create</sui-button>
        </div>
        <div id="context">
          <sui-table single-line>
            <sui-table-header>
              <sui-table-row>
                <sui-table-header-cell>ID</sui-table-header-cell>
                <sui-table-header-cell>Serial No</sui-table-header-cell>
                <sui-table-header-cell>Description</sui-table-header-cell>
                <sui-table-header-cell>Creation Date</sui-table-header-cell>
                <sui-table-header-cell>Status</sui-table-header-cell>
                <sui-table-header-cell></sui-table-header-cell>
              </sui-table-row>
            </sui-table-header>
            <sui-table-body>
              <sui-table-row v-for="item in retrieve.items" :key="item.id">
                <sui-table-cell>{{ item.id }}</sui-table-cell>
                <sui-table-cell>{{ item.serial_no }}</sui-table-cell>
                <sui-table-cell>{{ item.description }}</sui-table-cell>
                <sui-table-cell>{{ item.created }}</sui-table-cell>
                <sui-table-cell>{{ item.enabled }}</sui-table-cell>
                <sui-table-cell>
                  <button class="ui mini editor button" v-on:click="openEditCard(item.id)">Edit</button>
                </sui-table-cell>
              </sui-table-row>
            </sui-table-body>
          </sui-table>
        </div>
        <div id="modal">
          <b-modal ref="addnew" :title="addnew.title" centered size="lg">
            <div class="field">
              <div class="ui left input">
                <label>Serial No:</label>
                <input type="text" v-model="addnew.data.serial_no" autocomplete="off" />
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
          <b-modal ref="edit" :title="edit.title" centered size="lg">
            <div class="field">
              <div class="ui left input">
                <label>Serial No:</label>
                <input type="text" v-model="edit.data.serial_no" autocomplete="off" />
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
                <div class="title" v-on:click="deleteCard()">Delete this card</div>
                <div class="description" v-show="edit.delete.open">Once you delete this card, there is no going back.</div>
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
    name: "Cards",
    components: {
      HeaderArea,
      MenuArea,
      Error
    },
    data() {
      return {
        addnew: {
          title: 'Create New Card',
          data: {
            serial_no: '',
            description: '',
            enabled: true
          }
        },
        edit: {
          title: 'Edit Card',
          data: {
            id: null,
            serial_no: '',
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
      this.getCards();
    },
    methods: {
      handleAddnewCancel: function () {
        this.addnew.data.serial_no = '';
        this.addnew.data.description = '';
        this.addnew.data.enabled = true;
        this.$refs.addnew.hide();
      },
      handleAddnewCreate: function () {
        // TODO: validation
        var card = {
          serial_no: this.addnew.data.serial_no,
          description: this.addnew.data.description,
          enabled: this.addnew.data.enabled
        };
        axios({
          method: 'post',
          url: utils.getRestUrl('/cards'),
          data: card,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': utils.getAuthorization()
          }
        }).then(response => {
          // console.log(response.data);
          this.getCards();
          this.handleAddnewCancel();
        }).catch(error => {
          console.log(error);
        });
      },
      handleEditSave: function (id) {
        var card = {
          id: this.edit.data.id,
          serial_no: this.edit.data.serial_no,
          description: this.edit.data.description,
          enabled: this.edit.data.enabled
        };
        axios({
          method: 'patch',
          url: utils.getRestUrl('/cards/'.concat(card.id)),
          data: card,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': utils.getAuthorization()
          }
        }).then(response => {
          // console.log(response.data);
          this.getCards();
          this.$refs.edit.hide();
        }).catch(error => {
          console.log(error);
        });
      },
      handleEditDelete: function () {
        axios({
          method: 'delete',
          url: utils.getRestUrl('/cards/'.concat(this.edit.data.id)),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': utils.getAuthorization()
          }
        }).then(response => {
          // console.log(response.data);
          this.getCards();
          this.$refs.edit.hide();
        }).catch(error => {
          console.log(error);
        });
      },
      getCards: function () {
        axios({
          method: 'get',
          url: utils.getRestUrl('/cards'),
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
      openAddnewCard: function () {
        this.$refs.addnew.show();
      },
      openEditCard: function (id) {
        var card = {};
        this.retrieve.items.forEach(function (item) {
          if (item.id == id) {
            card['id'] = item.id;
            card['serial_no'] = item.serial_no;
            card['description'] = item.description;
            card['enabled'] = item.enabled;
          }
        });
        this.edit.data.id = card.id;
        this.edit.data.serial_no = card.serial_no;
        this.edit.data.description = card.description;
        this.edit.data.enabled = card.enabled;
        this.$refs.edit.show();
      },
      deleteCard: function () {
        this.edit.delete.open = !this.edit.delete.open;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>