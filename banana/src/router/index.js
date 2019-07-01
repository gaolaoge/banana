import Vue from 'vue'
import Router from 'vue-router'
import login_page from '@/components/login_page'
// import forget_password from '@/components/forget_password'
import main_module from '@/components/main_module'
import platform_management from '@/components/left_nav/platform_management/platform_management'
import company_management from '@/components/left_nav/company_management/company_management'
import personal_center from '@/components/top_nav/personal_center'
import user_management_info from '@/components/left_nav/user_management/user_management_info'
import user_management_self from '@/components/left_nav/user_management/user_management_self'
import batch_operation from '@/components/left_nav/user_management/batch_operation'
import memory_management from '@/components/left_nav/user_management/memory_management'
import company_list from '@/components/left_nav/super_admin/company_list'
import company_add from '@/components/left_nav/super_admin/company_add'
import detail from '@/components/left_nav/super_admin/detail_'

Vue.use(Router)

export default new Router({
  routes: [
    {                                       //登录页
      path: '/',
      name: 'login_page',
      component: login_page
    },
    // {
    //   path: '/login_',
    //   name: 'login_page2',
    //   component: login_page2
    // },
    // {
    //   path: '/forget_password',
    //   name: 'forget_password',
    //   component: forget_password
    // },
    {
      path: '/main_module',                 //控制台
      name: 'main_module',
      component: main_module,
      redirect: 'platform_management',
      children: [
        {
          path: '/platform_management',      //平台管理
          component: platform_management
        },
        {
          path: '/company_management',       //企业管理
          component: company_management
        },
        {
          path: '/personal_center',           //修改个人信息
          component: personal_center
        },
        {
          path: '/user_management/user_management_info',       //用户信息管理
          component: user_management_info
        },
        {
          path: '/user_management/user_management_self',       //个人中心
          component: user_management_self
        },
        {
          path: '/user_management/batch_operation',            //批量操作
          component: batch_operation
        },
        {
          path: '/user_management/memory_management',          //内存管理
          component: memory_management
        },
        {
          path: '/super_admin/company_list',                   //企业列表
          component: company_list
        },
        {
          path: '/super_admin/company_add',                    //企业新企业
          component: company_add
        },
        {
          path: '/super_admin/detail_',                        //查看或编辑
          component: detail
        },
      ]
    },
    // {
    //   path: '/main_module',
    //   name: 'main_module',
    //   component: main_module
    // },
    { path: '*', redirect: '/'}
  ],
  mode: 'history'
})
