import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
import axios from 'axios'

import login_page from '@/components/login_page'
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
// import file_management from '@/components/left_nav/system/file_management'
import message_management from '@/components/left_nav/system/message_management'
import popular from '@/components/left_nav/log_retrieval/popular'
import record from '@/components/left_nav/log_retrieval/record'
import storage_base from '@/components/left_nav/resources_management/storage_base'
import customize from '@/components/left_nav/resources_management/customize'
import internal_interwork from '@/components/left_nav/resources_management/internal_interwork'
import document_retrieval from '@/components/left_nav/resources_management/document_retrieval'
import visual_analysis from '@/components/left_nav/resources_management/visual_analysis'
import new_email from '@/components/left_nav/email/new_email'
import console from '@/components/left_nav/console'
import find_layim from '@/assets/find'
import fixedList from '@/components/left_nav/platform_management/fixedList'
import fixedSee from '@/components/left_nav/platform_management/fixedSee'

Vue.use(Router)

let router_ = new Router({
  routes: [
    {                                       //登录页
      path: '/',
      name: 'login_page',
      component: login_page
    },
    {
      path: '/main_module',                 
      name: 'main_module',
      component: main_module,
      redirect: '/console',
      children: [
        {
          path: '/console',                                      //控制台
          component: console,
          name: 'console',
          meta: {
            permission: ['S','A','B','C']
          }
        },
        {
          path: '/resources_management/storage_base',           //资源管理 - 固定存储/临时存储/共享文件
          component: storage_base,
          meta: {
            permission: ['B','C']
          }
        },
        {
          path: '/resources_management/customize',             //资源管理 - 自定义
          component: customize,
          meta: {
            permission: ['B','C']
          }
        },
        {
          path: '/resources_management/internal_interwork',    //资源管理 - 内部互通
          component: internal_interwork,
          meta: {
            permission: ['B','C']
          }
        },
        {
          path: '/resources_management/document_retrieval',    //资源管理 - 文件检索
          component: document_retrieval,
          meta: {
            permission: ['B','C']
          }
        },
        {
          path: '/resources_management/visual_analysis',       //资源管理 - 可视化分析
          component: visual_analysis,
          meta: {
            permission: ['A']
          }
        },
        {
          path: '/log_retrieval/popular',                            //搜索日志 - 热门搜索
          component: popular,
          meta: {
            permission: ['A','B','C']
          }
        },
        {
          path: '/log_retrieval/record',                             //搜索日志 - 搜索记录
          component: record,
          meta: {
            permission: ['A','B','C']
          }
        },
        {
          path: '/platform_management/storage_management',           //平台管理 - 数据存储管理
          component: storage_management,
          meta: {
            permission: ['A']
          }
        },
        {
          path: '/platform_management/fixedList',                    //平台管理 - 文件列表
          component: fixedList,
          meta: {
            permission: ['A']
          }
        },
        {
          path: '/platform_management/fixedSee',                     //平台管理 - 文件查看
          name: 'fixedSee',
          component: fixedSee,
          meta: {
            permission: ['A']
          }
        },
        {
          path: '/platform_management/download_management',          //平台管理 - 数据下载管理
          component: download_management,
          meta: {
            permission: ['A']
          }
        },
        {
          path: '/platform_management/announcement_management',      //平台管理 - 公告管理
          component: announcement_management,
          meta: {
            permission: ['A']
          }
        },
        {
          path: '/company_management/Dashboard',                    //企业管理 - 企业仪表盘
          component: Dashboard,
          meta: {
            permission: ['A']
          }
        },
        {
          path: '/company_management/address_book',                //企业管理 - 企业通讯录
          component: address_book,
          meta: {
            permission: ['A','B','C']
          }
        },
        {
          path: '/company_management/data_analysis',               //企业管理 - 数据分析
          component: data_analysis,
          meta: {
            permission: ['A']
          }
        },
        {
          path: '/company_management/enterprise',                 //企业管理 - 企业文件
          component: enterprise,
          meta: {
            permission: ['A']
          }
        },
        {
          path: '/company_management/statistics',                 //企业管理 - 部门统计
          component: statistics,
          meta: {
            permission: ['A']
          }
        },
        {
          path: '/personal_center',                               //用户 - 修改个人信息
          component: personal_center,
          meta: {
            permission: ['S','A','B','C']
          }
        },
        {
          path: '/user_management/user_management_info',          //用户管理 - 用户信息管理
          component: user_management_info,
          meta: {
            permission: ['A']
          }
        },
        {
          path: '/user_management/user_management_self',          //用户管理 - 个人中心
          component: user_management_self,
          meta: {
            permission: ['S','A','B','C']
          }
        },
        {
          path: '/user_management/batch_operation',               //用户管理 - 批量操作
          component: batch_operation,
          meta: {
            permission: ['A']
          }
        },
        {
          path: '/user_management/memory_management',             //用户管理 - 内存管理
          component: memory_management,
          meta: {
            permission: ['B','C']
          }
        },
        {
          path: '/super_admin/company_list',                      //超级管理 - 企业列表
          component: company_list,
          meta: {
            permission: ['S']
          }
        },
        {
          path: '/super_admin/company_add',                       //超级管理 - 企业新企业
          component: company_add,
          meta: {
            permission: ['S']
          }
        },
        {
          path: '/super_admin/detail_',                           //超级管理 - 查看或编辑
          component: detail,
          meta: {
            permission: ['S']
          }
        },
        {
          path: '/message_center/inbox',                          //消息中心 - 收件箱
          name: 'inbox',
          component: inbox,
          meta: {
            permission: ['A','B','C']
          }
        },
        {
          path: '/message_center/new_email',                      //消息中心 - 写邮件
          component: new_email,
          meta: {
            permission: ['A','B','C']
          }
        },
        {
          path: '/system/date_management',                       //系统管理 - 文件管理
          component: date_management,
          meta: {
            permission: ['A']
          }
        },
        // {
        //   path: '/system/file_management',                       //系统管理 - 文件容量管理
        //   component: file_management,
        //   meta: {
        //     permission: ['A']
        //   }
        // },
        {
          path: '/system/message_management',                    //系统管理 - 消息清理管理
          component: message_management,
          meta: {
            permission: ['A']
          }
        },
        {
          path: '/404',
          component: () => import('@/404'),
          meta: {
            permission: ['S','A','B','C']
          }
        },
      ]
    },
    {
      path: '/find',
      name: 'find_layim',
      component: find_layim,
      meta: {
        permission: ['S','A','B','C']
      }
    },
    { path: '*', redirect: '/main_module' }
  ],
  // mode: 'history'
})
router_.beforeEach((to, from, next) => {
  if (to.path == '/') {
    next()
  } else {
    // 验证登录
    if (!sessionStorage.getItem('logIn')) {
      Message.error('尚未登录')
      next({ path: '/' })
    } else {
      // 验证权限
      let t = [ ...to.meta.permission].indexOf(sessionStorage.getItem('class'))
      // let t = 0
      if (t != -1) {
        axios.defaults.headers.common['token'] = sessionStorage.getItem('logIn')
        next()
      }else{
        next({path: '/404'})
      }

    }
  }
})

export default router_