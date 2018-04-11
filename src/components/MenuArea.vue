<template>
  <div class="nav-collapse">
    <div v-for="item in menus">
      <div v-if="!item.children">
        <li v-on:click="link(item.path)">
          <i class="fa fa-sm" v-bind:class="item.icon"></i> {{ item.name }}
        </li>
      </div>
      <div v-else>
        <li v-on:click="toggle(item.name)">
          <i class="fa fa-sm" v-bind:class="item.icon"></i> {{ item.name }}
          <span class="arrow"></span>
        </li>
        <div v-show="item.toggle">
          <li v-for="i in item.children" v-on:click="link(i.path)">{{ i.name }}</li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'Welcome!',
        brand: '',
        menus: [
          { name: 'Dashboard', icon: 'fa-dashboard', path: '/' },
          {
            name: 'Management',
            icon: 'fa-id-card',
            path: '#',
            children: [
              { name: 'Users', path: '/users' },
              { name: 'Roles', path: '/roles' },
              { name: 'Employees', path: '/employees' },
              { name: 'Cards', path: '/cards' }
            ],
            toggle: false
          },
          { name: 'Reports', icon: 'fa-area-chart', path: '/report' }
        ],
        navbar: [
          {
            icon: '<i class="fa fa-user-circle fa-2x white"></i>',
            items: [
              { name: 'Setting' },
              { name: 'Logout' }
            ]
          }
        ]
      }
    },
    mounted() {
      // console.log(this.$router.options.routes);
      // this.$router.options.routes.filter(route => route.name && route.path != '/login').forEach(route => {
      //   this.menus.push({
      //     name: route.name,
      //     path: route.path
      //   })
      // });
      // console.log(this.menus);
    },
    methods: {
      link: function (target) {
        if (target !== '#') {
          this.$router.push(target);
        }
      },
      toggle: function (target) {
        this.menus.forEach(menu => {
          if (menu.name == target) {
            menu.toggle = !menu.toggle;
          }
        });
      }
    }
  };
</script>