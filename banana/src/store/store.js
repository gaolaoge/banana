import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    //公共数据池
    state: {
        //登录页信息
        login_page: {
            verify_input: '',                   //验证码
        },
        //控制台导航信息
        nav_: {
            left_nav_show: true,                //左侧导航隐藏或显示
            current_position: '平台管理 /',
        },
        //个人中心 头像上传模块
        login_head: {
            showBox: false,                               //模块展示
            imgSrc: 'http://www.gaolaogui.top/i/i.png',   //头像url
        },
        // 数据类型
        type_all: [
            {
                val: 'all',
                label: '全部'
            },
            {
                val: 'ppt',
                label: 'PPT'
            },
            {
                val: 'pdf',
                label: 'PDF'
            },
            {
                val: 'word',
                label: 'WORD'
            },
            {
                val: 'excel',
                label: 'EXCEL'
            },
            {
                val: 'HTML',
                label: 'HTML'
            },
            {
                val: 'exe',
                label: 'EXE'
            },
            {
                val: 'jpg',
                label: 'JPG'
            },
            {
                val: 'png',
                label: 'PNG'
            },
            {
                val: 'psd',
                label: 'PSD'
            },
            {
                val: 'other',
                label: '其他'
            },
        ],
    },
    mutations: {
        //接收验证码
        receive_verifyInput(state, val) {
            state.login_page.verify_input = val
        },
        //个人中心 切换上传头像窗口
        changeShowState(state) {
            state.login_head.showBox = !state.login_head.showBox
        },
        //个人中心 保存url
        changeImgUrl(state, url) {
            state.login_head.imgSrc = url
        },
        //导航
        change_current(state, val) {
            state.nav_.current_position = val
        },
        //修改头像
        change_head(state, url) {
            state.login_head.imgSrc = url
        },
        //修改detail_e
        detail_e(state, e) {
            state.detail_e.name = e[0]
            state.detail_e.id = e[1]
            state.detail_e.firmKEY = e[2]
            state.detail_e.type = e[3]
        },

    },
    actions: {

    }
})