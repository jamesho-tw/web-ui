<template>
  <div class="wrapper">
    <HeaderArea></HeaderArea>
    <MenuArea></MenuArea>
    <Error v-show="error.open" :message="error.message"></Error>
    <div class="main">
      <b-card>
        <div id="toolbar">
          <sui-button basic size="mini">Create</sui-button>
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
              <sui-table-row>
                <sui-table-header-cell>1</sui-table-header-cell>
                <sui-table-header-cell>ROLE_ADMIN</sui-table-header-cell>
                <sui-table-header-cell></sui-table-header-cell>
                <sui-table-header-cell></sui-table-header-cell>
                <sui-table-header-cell></sui-table-header-cell>
              </sui-table-row>
              <sui-table-row>
                <sui-table-header-cell>2</sui-table-header-cell>
                <sui-table-header-cell>ROLE_USER</sui-table-header-cell>
                <sui-table-header-cell></sui-table-header-cell>
                <sui-table-header-cell></sui-table-header-cell>
                <sui-table-header-cell></sui-table-header-cell>
              </sui-table-row>
            </sui-table-body>
          </sui-table>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
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
        error: {
          open: false,
          message: ''
        }
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
</style>