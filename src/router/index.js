import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Users from '@/components/Users'
import Roles from '@/components/Roles'
import Employees from '@/components/Employees'
import Cards from '@/components/Cards'
import Login from '@/components/Login'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/roles',
      name: 'Roles',
      component: Roles
    },
    {
      path: '/employees',
      name: 'Employees',
      component: Employees
    },
    {
      path: '/cards',
      name: 'Cards',
      component: Cards
    }
  ],
  redirect: {
    '*': '/'
  }
})
