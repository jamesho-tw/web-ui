// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import SuiVue from 'semantic-ui-vue';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'semantic-ui-css/semantic.min.css';
import 'font-awesome/css/font-awesome.min.css'
import router from './router'

Vue.config.productionTip = false
Vue.use(SuiVue);
Vue.use(BootstrapVue);

router.beforeEach((to, from, next) => {
  let userinfo = localStorage['USERINFO'];
  if (userinfo == null && to.path != '/login') {
    next({
      path: '/login'
    })
  } else {
    next()
  }
  if (userinfo && to.path == '/login') {
    next({
      path: '/'
    })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
