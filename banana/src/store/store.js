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
        //查看.编辑企业详情
        detail_e: {
            name: '',
            id: '',
            firmKEY: '',
            type: ''
        },
        //企业人员
        users: {            //修改的数据
            '营销部': [
                {
                    userName: '高歌',
                    account: 'gaoge',
                    id: '001',
                    position: '部门负责人'
                },
                {
                    userName: '王强',
                    account: 'wangqiang',
                    id: '002',
                    position: '用户'
                },
                {
                    userName: '张宇',
                    account: 'zhangyu',
                    id: '003',
                    position: '用户'
                },
                {
                    userName: '林梦至',
                    account: 'linmengzhi',
                    id: '004',
                    position: '用户'
                },
                {
                    userName: '贾冰倩',
                    account: 'jiabingqian',
                    id: '005',
                    position: '用户'
                },
                {
                    userName: '贾冰倩2',
                    account: 'jiabingqian2',
                    id: '006',
                    position: '用户'
                },
                {
                    userName: '贾冰倩3',
                    account: 'jiabingqian3',
                    id: '007',
                    position: '用户'
                },
                {
                    userName: '贾冰倩4',
                    account: 'jiabingqian4',
                    id: '008',
                    position: '用户'
                },
                {
                    userName: '贾冰倩5',
                    account: 'jiabingqian5',
                    id: '009',
                    position: '用户'
                },
            ],
            '产品部': [
                {
                    userName: '周杰伦',
                    account: 'zhoujielun',
                    id: '011',
                    position: '部门负责人'
                },
                {
                    userName: '陈奕迅',
                    account: 'chenyixun',
                    id: '012',
                    position: '用户'
                },
                {
                    userName: '王力宏',
                    account: 'wanglihong',
                    id: '013',
                    position: '用户'
                },
                {
                    userName: '林志炫',
                    account: 'linzhixuan',
                    id: '014',
                    position: '用户'
                },
                {
                    userName: '薛之谦',
                    account: 'xuezhixqian',
                    id: '015',
                    position: '用户'
                },
            ],
            '市场部': [
                {
                    userName: '王旭',
                    account: 'wangxu',
                    id: '021',
                    position: '部门负责人'
                },
                {
                    userName: '郑香宜',
                    account: 'zhengxiangyi',
                    id: '022',
                    position: '用户'
                },
                {
                    userName: '解晨',
                    account: 'xiechen',
                    id: '023',
                    position: '用户'
                },
                {
                    userName: '孙伟鹏',
                    account: 'sunweipeng',
                    id: '024',
                    position: '用户'
                },
                {
                    userName: '吴春亮',
                    account: 'wuchunliang',
                    id: '025',
                    position: '用户'
                },
            ],
            '人事部': [
                {
                    userName: '常旭',
                    account: 'cahngxu',
                    id: '031',
                    position: '部门负责人'
                },
                {
                    userName: '何晓言',
                    account: 'hexiaoyan',
                    id: '032',
                    position: '用户'
                },
                {
                    userName: '理想',
                    account: 'lixiang',
                    id: '033',
                    position: '用户'
                },
                {
                    userName: '曾智慧',
                    account: 'zengzhihui',
                    id: '034',
                    position: '用户'
                },
                {
                    userName: '张大光',
                    account: 'zhangdaguang',
                    id: '035',
                    position: '用户'
                },
            ],
            '研发部': [
                {
                    userName: '雷军',
                    account: 'leijun',
                    id: '041',
                    position: '部门负责人'
                },
                {
                    userName: '贾跃亭',
                    account: 'jiayueting',
                    id: '042',
                    position: '用户'
                },
                {
                    userName: '罗永浩',
                    account: 'luoyonghao',
                    id: '043',
                    position: '用户'
                },
                {
                    userName: '任正非',
                    account: 'renzhengfei',
                    id: '044',
                    position: '用户'
                },
                {
                    userName: '乔布斯',
                    account: 'qiaobusi',
                    id: '045',
                    position: '用户'
                },
            ],
            '设计部': [
                {
                    userName: '郭德纲',
                    account: 'guodegang',
                    id: '051',
                    position: '部门负责人'
                },
                {
                    userName: '于谦',
                    account: 'yuqian',
                    id: '052',
                    position: '用户'
                },
                {
                    userName: '岳云鹏',
                    account: 'yueyunpeng',
                    id: '053',
                    position: '用户'
                },
                {
                    userName: '孙越',
                    account: 'sunyue',
                    id: '054',
                    position: '用户'
                },
                {
                    userName: '高峰',
                    account: 'gaofeng',
                    id: '055',
                    position: '用户'
                },
            ],
            '后勤部': [
                {
                    userName: '刘德华',
                    account: 'liudehua',
                    id: '061',
                    position: '部门负责人'
                },
                {
                    userName: '周润发',
                    account: 'zhourunfa',
                    id: '062',
                    position: '用户'
                },
                {
                    userName: '张学友',
                    account: 'zhangxueyou',
                    id: '063',
                    position: '用户'
                },
                {
                    userName: '陈雪凝',
                    account: 'chenxuening',
                    id: '064',
                    position: '用户'
                },
                {
                    userName: '邓紫棋',
                    account: 'dengziqi',
                    id: '065',
                    position: '用户'
                },
            ],
        },
    },
    mutations: {
        //接收验证码
        receive_verifyInput(state, val) {
            state.login_page.verify_input = val
            // console.log(state.login_page.verify_input)
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
        change_baseData(state,i){
            for(var key in state.users){
                delete state.users[key]
            } 
            for(var key_ in i){
                state.users[key_] = i[key_]
            }
        }
    },
    actions: {

    }
})