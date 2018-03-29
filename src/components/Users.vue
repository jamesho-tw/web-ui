<template>
  <div class="wrapper">
    <HeaderArea></HeaderArea>
    <MenuArea></MenuArea>
    <div class="main">
      <b-card>
        <sui-button basic size="mini" class="w80">Create</sui-button>
        <sui-button basic size="mini" class="w80" v-on:click="getUsers()">Edit</sui-button>
        <sui-button basic size="mini" class="w80">Delete</sui-button>
        <div style="padding:1em 0;">
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
        status: true,
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
      this.getUsers();
    },
    methods: {
      getUsers: function () {
        axios({
          method: 'get',
          url: 'http://localhost:3000/users',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          this.items = response.data;
        }).catch(error => {
          console.log(error);
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ui.basic.button:hover {
    /* background-color:#f2f8fe !important; */
    background-color: #eee !important;
    font-weight: bold;
  }
</style>