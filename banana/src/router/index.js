import Vue from 'vue'
import Router from 'vue-router'
import login_page from '@/components/login_page'
import forget_password from '@/components/forget_password'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login_page',
      component: login_page
    },
    {
      path: '/forget_password',
      name: 'forget_password',
      component: forget_password
    },
    { path: '*', redirect: '/'}
  ]
})
