import Vue from 'vue'
import Router from 'vue-router'
import login_page from '@/components/login_page'
// import forget_password from '@/components/forget_password'
import main_module from '@/components/main_module'
import storage_management from '@/components/left_nav/platform_management/storage_management'                   //数据存储管理
import download_management from '@/components/left_nav/platform_management/download_management'                 //数据下载管理
import announcement_management from '@/components/left_nav/platform_management/announcement_management'         //公告管理
import Dashboard from '@/components/left_nav/company_management/Dashboard'                                      //企业仪表盘
import address_book from '@/components/left_nav/company_management/address_book'                                //企业通讯录
import data_analysis from '@/components/left_nav/company_management/data_analysis'                              //数据分析
import enterprise from '@/components/left_nav/company_management/enterprise'
import statistics from '@/components/left_nav/company_management/statistics'
import personal_center from '@/components/top_nav/personal_center'
import user_management_info from '@/components/left_nav/user_management/user_management_info'
import user_management_self from '@/components/left_nav/user_management/user_management_self'
import batch_operation from '@/components/left_nav/user_management/batch_operation'
import memory_management from '@/components/left_nav/user_management/memory_management'
import company_list from '@/components/left_nav/super_admin/company_list'
import company_add from '@/components/left_nav/super_admin/company_add'
import detail from '@/components/left_nav/super_admin/detail_'
import inbox from '@/components/left_nav/email/inbox'
import date_management from '@/components/left_nav/system/date_management'
import file_management from '@/components/left_nav/system/file_management'
import message_management from '@/components/left_nav/system/message_management'
import popular from '@/components/left_nav/log_retrieval/popular'
import record from '@/components/left_nav/log_retrieval/record'
import resources_management from '@/components/left_nav/resources_management/resources_management'

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
      redirect: '/platform_management/storage_management',
      children: [
        {
          path: '/resources_management/resources_management',                       //资源管理
          component: resources_management
        },
        {
          path: '/log_retrieval/popular',                       //数据存储管理
          component: popular
        },
        {
          path: '/log_retrieval/record',                        //数据存储管理
          component: record
        },
        {
          path: '/platform_management/storage_management',      //数据存储管理
          component: storage_management
        },
        {
          path: '/platform_management/download_management',     //下载管理
          component: download_management
        },
        {
          path: '/platform_management/announcement_management',      //公告管理
          component: announcement_management
        },
        {
          path: '/company_management/Dashboard',                //企业管理
          component: Dashboard
        },
        {
          path: '/company_management/address_book',             //通讯录
          component: address_book
        },
        {
          path: '/company_management/data_analysis',            //数据分析
          component: data_analysis
        },
        {
          path: '/company_management/enterprise',               //数据分析
          component: enterprise
        },
        {
          path: '/company_management/statistics',              //数据分析
          component: statistics
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
        {
          path: '/message_center/inbox',                       //收件箱
          component: inbox
        },
        {
          path: '/system/date_management',                       //存储时间管理
          component: date_management
        },
        {
          path: '/system/file_management',                       //文件容量管理
          component: file_management
        },
        {
          path: '/system/message_management',                    //消息清理管理
          component: message_management
        },
      ]
    },
    // {
    //   path: '/main_module',
    //   name: 'main_module',
    //   component: main_module
    // },
    { path: '*', redirect: '/main_module'}
  ],
  mode: 'history'
})
