<template>
    <div class="module_left">
        <div
            class="nav_link"
            v-bind:class="[{show_me: show_me}]"
        >
            <el-row class="tac">
                <el-col :span="24">
                    <!-- background-color="#393D49" -->
                    <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#2d5988"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        unique-opened
                    >
                        <el-menu-item
                            index="0"
                            @click="skip('console')"
                            v-show="permission == 'S' || permission == 'A' || permission == 'B' || permission == 'C'"
                        >
                            <i class="el-icon-data-line"></i>
                            <span slot="title">总控</span>
                        </el-menu-item>
                        <el-submenu
                            index="1"
                            v-if="permission == 'A'"
                        >
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>平台管理</span>
                            </template>
                            <el-menu-item
                                index="1-1"
                                @click="skip('storage_management')"
                                v-show="show_me"
                            >{{ storage_management }}</el-menu-item>
                            <el-menu-item
                                index="1-2"
                                @click="skip('download_management')"
                                v-show="show_me"
                            >{{ download_management }}</el-menu-item>
                            <el-menu-item
                                index="1-3"
                                @click="skip('announcement_management')"
                                v-show="show_me"
                            >{{ announcement_management }}</el-menu-item>
                        </el-submenu>

                        <el-submenu
                            index="2"
                            v-show="permission == 'A' || permission == 'B' || permission == 'C'"
                        >
                            <template slot="title">
                                <i class="el-icon-s-cooperation"></i>
                                <span>企业管理</span>
                            </template>
                            <el-menu-item
                                index="2-1"
                                @click="skip('Dashboard')"
                                v-show="show_me"
                                v-if="permission == 'A'"
                            >{{ Dashboard }}</el-menu-item>
                            <el-menu-item
                                index="2-2"
                                @click="skip('address_book')"
                                v-show="show_me"
                            >{{ address_book }}</el-menu-item>
                            <el-menu-item
                                index="2-3"
                                @click="skip('data_analysis')"
                                v-show="show_me"
                                v-if="permission == 'A'"
                            >{{ data_analysis }}</el-menu-item>
                            <el-menu-item
                                index="2-4"
                                @click="skip('statistics')"
                                v-show="show_me"
                                v-if="permission == 'A'"
                            >{{ statistics }}</el-menu-item>
                            <el-menu-item
                                index="2-5"
                                @click="skip('enterprise')"
                                v-show="show_me"
                                v-if="permission == 'A'"
                            >{{ enterprise }}</el-menu-item>
                        </el-submenu>

                        <el-submenu
                            index="3"
                            v-if="permission == 'S' || permission == 'A' || permission == 'B' || permission == 'C'"
                        >
                            <template slot="title">
                                <i class="el-icon-s-check"></i>
                                <span>用户管理</span>
                            </template>
                            <el-menu-item
                                index="3-1"
                                @click="skip('user_management_info')"
                                v-show="show_me"
                                v-if="permission == 'A'"
                            >{{ user_management_info }}</el-menu-item>
                            <el-menu-item
                                index="3-2"
                                @click="skip('user_management_self')"
                                v-show="show_me"
                            >{{ user_management_self }}</el-menu-item>
                            <el-menu-item
                                index="3-3"
                                @click="skip('batch_operation')"
                                v-show="show_me"
                                v-if="permission == 'A'"
                            >{{ batch_operation }}</el-menu-item>
                            <el-menu-item
                                index="3-4"
                                @click="skip('memory_management')"
                                v-show="show_me"
                                v-if="permission == 'B' || permission == 'C'"
                            >{{ memory_management }}</el-menu-item>
                        </el-submenu>

                        <el-submenu
                            index="4"
                            v-if="permission == 'S'"
                        >
                            <template slot="title">
                                <i class="el-icon-document"></i>
                                <span>超级管理</span>
                            </template>
                            <el-menu-item
                                index="4-1"
                                @click="skip('company_list')"
                                v-show="show_me"
                            >{{ company_list }}</el-menu-item>
                            <el-menu-item
                                index="4-2"
                                @click="skip('company_add')"
                                v-show="show_me"
                            >{{ company_add }}</el-menu-item>
                        </el-submenu>

                        <el-submenu
                            index="5"
                            v-if="permission == 'A' || permission == 'B' || permission == 'C'"
                        >
                            <template slot="title">
                                <i class="el-icon-message"></i>
                                <span>消息中心</span>
                            </template>
                            <el-menu-item
                                index="5-1"
                                @click="skip('inbox')"
                                v-show="show_me"
                            >{{ inbox }}</el-menu-item>
                            <el-menu-item
                                index="5-2"
                                @click="skip('star_box')"
                                v-show="show_me"
                            >{{ star_box }}</el-menu-item>
                            <el-menu-item
                                index="5-3"
                                @click="skip('draft_box')"
                                v-show="show_me"
                            >{{ draft_box }}</el-menu-item>
                            <el-menu-item
                                index="5-4"
                                @click="skip('send_box')"
                                v-show="show_me"
                            >{{ send_box }}</el-menu-item>
                            <el-menu-item
                                index="5-5"
                                @click="skip('delete_box')"
                                v-show="show_me"
                            >{{ delete_box }}</el-menu-item>
                            <el-menu-item
                                index="5-6"
                                @click="skip('new_email')"
                                v-show="show_me"
                            >{{ new_email }}</el-menu-item>
                        </el-submenu>
                        <el-submenu
                            index="6"
                            v-if="permission == 'A' || permission == 'B' || permission == 'C'"
                        >
                            <template slot="title">
                                <i class="el-icon-takeaway-box"></i>
                                <span>资源管理</span>
                            </template>
                            <el-menu-item
                                index="6-1"
                                @click="skip('fixed_storage')"
                                v-show="show_me"
                                v-if="permission == 'B' || permission == 'C'"
                            >{{ fixed_storage }}</el-menu-item>
                            <el-menu-item
                                index="6-2"
                                @click="skip('temporary_storage')"
                                v-show="show_me"
                                v-if="permission == 'B' || permission == 'C'"
                            >{{ temporary_storage }}</el-menu-item>
                            <el-menu-item
                                index="6-3"
                                @click="skip('customize')"
                                v-show="show_me"
                                v-if="permission == 'B' || permission == 'C'"
                            >{{ customize }}</el-menu-item>
                            <el-menu-item
                                index="6-4"
                                @click="skip('shared_documents')"
                                v-show="show_me"
                                v-if="permission == 'B' || permission == 'C'"
                            >{{ shared_documents }}</el-menu-item>
                            <el-menu-item
                                index="6-5"
                                @click="skip('document_retrieval')"
                                v-show="show_me"
                                v-if="permission == 'B' || permission == 'C'"
                            >{{ document_retrieval }}</el-menu-item>
                            <el-menu-item
                                index="6-6"
                                @click="skip('visual_analysis')"
                                v-show="show_me"
                                v-if="permission == 'A'"
                            >{{ visual_analysis }}</el-menu-item>
                        </el-submenu>

                        <el-submenu
                            index="7"
                            v-if="permission == 'A' || permission == 'B' || permission == 'C'"
                        >
                            <template slot="title">
                                <i class="el-icon-search"></i>
                                <span>搜索日志</span>
                            </template>
                            <el-menu-item
                                index="7-1"
                                @click="skip('record')"
                                v-show="show_me"
                            >{{ record }}</el-menu-item>
                            <el-menu-item
                                index="7-2"
                                @click="skip('popular')"
                                v-show="show_me"
                            >{{ popular }}</el-menu-item>
                        </el-submenu>

                        <el-submenu
                            index="8"
                            v-if="permission == 'A'"
                        >
                            <template slot="title">
                                <i class="el-icon-monitor"></i>
                                <span>系统管理</span>
                            </template>
                            <el-menu-item
                                index="8-1"
                                @click="skip('date_management')"
                                v-show="show_me"
                            >{{ date_management }}</el-menu-item>
                            <!-- <el-menu-item
                                index="8-2"
                                @click="skip('file_management')"
                                v-show="show_me"
                            >{{ file_management }}</el-menu-item> -->
                            <el-menu-item
                                index="8-2"
                                @click="skip('message_management')"
                                v-show="show_me"
                            >{{ message_management }}</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-col>
            </el-row>
        </div>
        <div
            class="nav_content"
            v-bind:class="[{extend: extend}]"
        >
            <div class="navigation">
                {{ this.nav_.current_position }}
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
    name: 'module_left',
    data() {
        return {
            visual_analysis: '可视化分析',
            document_retrieval: '文件检索',
            internal_interwork: '内部互通',
            shared_documents: '共享文件',
            customize: '自定义',
            temporary_storage: '临时存储',
            fixed_storage: '固定存储',
            new_email: '新邮件',
            enterprise: '企业文件',
            statistics: '部门统计',
            resources_management: '资源管理',
            log_retrieval: '搜索日志',
            record: '搜索记录',
            popular: '热门搜索',
            system: '系统管理',
            // file_management: '文件容量管理',
            message_management: '消息清理管理',
            date_management: '文件储存管理',
            announcement_management: '公告管理',
            download_management: '数据下载管理',
            data_analysis: '数据分析',
            address_book: '企业通讯录',
            Dashboard: '企业仪表盘',
            platform_management: '平台管理',
            storage_management: '数据存储管理',
            company_management: '企业管理',
            user_management_info: '用户信息管理',
            user_management_self: '个人中心',
            batch_operation: '批量操作',
            user_management: '用户中心',
            personal_center: '修改个人信息',
            super_admin: '超级管理',
            memory_management: '内存管理',
            company_list: '企业列表',
            company_add: '添加新企业',
            detail_: '企业详情',
            message_center: '消息中心',
            inbox: '收件箱',
            star_box: '标星箱',
            draft_box: '草稿箱 ',
            send_box: '已发送',
            delete_box: '已删除',
            show_me: true,                          //主菜单隐藏时隐藏导航
            extend: false,
            console: '控制台',
            fixedSee: '共享文件',
            404: '未知路径'

        }
    },
    methods: {
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        },
        // 跳转
        skip(z) {
            let this_ = this;
            switch (z) {
                case 'enterprise':
                    this_.$router.push('/company_management/enterprise');
                    break;
                case 'statistics':
                    this_.$router.push('/company_management/statistics');
                    break;
                case 'record':
                    this_.$router.push('/log_retrieval/record');
                    break;
                case 'popular':
                    this_.$router.push('/log_retrieval/popular');
                    break;
                case 'storage_management':
                    this_.$router.push('/platform_management/storage_management');
                    break;
                case 'download_management':
                    this_.$router.push('/platform_management/download_management');
                    break;
                case 'announcement_management':
                    this_.$router.push('/platform_management/announcement_management');
                    break;
                case 'Dashboard':
                    this_.$router.push('/company_management/Dashboard');
                    break;
                case 'address_book':
                    this_.$router.push('/company_management/address_book');
                    break;
                case 'data_analysis':
                    this_.$router.push('/company_management/data_analysis');
                    break;
                case 'user_management_info':
                    this.$router.push('/user_management/user_management_info');
                    break;
                case 'user_management_self':
                    this.$router.push('/user_management/user_management_self');
                    break;
                case 'batch_operation':
                    this.$router.push('/user_management/batch_operation');
                    break;
                case 'memory_management':
                    this.$router.push('/user_management/memory_management');
                    break;
                case 'company_list':
                    this.$router.push('/super_admin/company_list');
                    break;
                case 'company_add':
                    this.$router.push('/super_admin/company_add');
                    break;

                case 'inbox':
                    this.$router.push({
                        name: 'inbox',
                        query: {
                            state: 'inbox'
                        }
                    });
                    break;
                case 'star_box':
                    this.$router.push({
                        name: 'inbox',
                        query: {
                            state: 'star_box'
                        }
                    });
                    break;
                case 'draft_box':
                    this.$router.push({
                        name: 'inbox',
                        query: {
                            state: 'draft_box'
                        }
                    });
                    break;
                case 'send_box':
                    this.$router.push({
                        name: 'inbox',
                        query: {
                            state: 'send_box'
                        }
                    });
                    break;
                case 'delete_box':
                    this.$router.push({
                        name: 'inbox',
                        query: {
                            state: 'delete_box'
                        }
                    });
                    break;
                case 'new_email':
                    this.$router.push('/message_center/new_email');
                    break;

                case 'date_management':
                    this.$router.push('/system/date_management');
                    break;
                case 'message_management':
                    this.$router.push('/system/message_management');
                    break;
                // case 'file_management':
                //     this.$router.push('/system/file_management');
                //     break;
                case 'fixed_storage':
                    this.$router.push({
                        path: '/resources_management/storage_base',
                        query: {
                            data: 'fixed_storage'
                        }
                    });
                    break;
                case 'temporary_storage':
                    this.$router.push({
                        path: '/resources_management/storage_base',
                        query: {
                            data: 'temporary_storage'
                        }
                    });
                    break;
                case 'shared_documents':
                    this.$router.push({
                        path: '/resources_management/storage_base',
                        query: {
                            data: 'shared_documents'
                        }
                    });
                    break;
                case 'customize':
                    this.$router.push('/resources_management/customize');
                    break;

                case 'internal_interwork':
                    this.$router.push('/resources_management/internal_interwork');
                    break;
                case 'document_retrieval':
                    this.$router.push('/resources_management/document_retrieval');
                    break;
                case 'visual_analysis':
                    this.$router.push('/resources_management/visual_analysis');
                    break;
                case 'console':
                    this.$router.push('/console')
                    break
            }
        },
        //导航标签
        nav() {
            let u = window.location.href.split('/#/')[1].split('?')[0],
                info_ = Object.values(this.$route.query)[0],
                ua = u.trim().split('/'),
                s = '',
                _this = this
            ua.forEach(function (currentVal, index, arr) {
                s = s + _this[currentVal] + ' / '

            })
            if (info_) {
                switch (info_) {
                    case 'fixed_storage':
                        s = s.replace(/undefined/, '固定存储')
                        break
                    case 'temporary_storage':
                        s = s.replace(/undefined/, '临时存储')
                        break
                    case 'shared_documents':
                        s = s.replace(/undefined/, '共享文件')
                        break
                    case 'star_box':
                        s = s.replace('收件箱', '标星箱')
                        break
                    case 'draft_box':
                        s = s.replace('收件箱', '草稿箱')
                        break
                    case 'send_box':
                        s = s.replace('收件箱', '已发送')
                        break
                    case 'delete_box':
                        s = s.replace('收件箱', '已删除')
                        break
                }

            }
            this.$store.commit('change_current', s)
        }
    },
    computed: {
        ...mapState(['nav_']),
        left_nav_show() {
            return this.nav_.left_nav_show
        },
        permission() {
            return sessionStorage.getItem('class')
        }

    },
    watch: {
        left_nav_show: function (new_val, old_val) {
            if (new_val === false) {
                this.show_me = false
                this.extend = true
                document.querySelectorAll('.el-submenu__icon-arrow').forEach(function (currentVal, index, arr) {
                    currentVal.style.display = 'none'
                })
            } else {
                this.show_me = true
                this.extend = false
                document.querySelectorAll('.el-submenu__icon-arrow').forEach(function (currentVal, index, arr) {
                    currentVal.style.display = 'inline-block'
                })
            }
        },
        $route: function () {
            this.nav()
        }
    },
    created() {
        this.nav()
    },
}
</script>

<style scoped>
/* element样式修改 */
.el-submenu .el-menu-item {
    min-width: 0px;
}
.el-submenu [class^="el-icon-"],
.el-menu-item [class^="el-icon-"] {
    margin-right: 16px;
}
.el-menu-item {
    font-size: 14px;
}
.el-menu--inline > .el-menu-item {
    font-size: 10px;
    /* margin-right: 56px; */
    /* padding-left: 56px!important; */
}

/* 自设置 */
.module_left {
    height: calc(100vh - 60px);
    font-size: 0px;
    vertical-align: top;
}
.nav_link {
    width: 64px;
    height: 100%;
    background-color: #2d5988;
    /* background: #393d49; */
    transition: width 0.4s;
}
.nav_link.show_me {
    width: 170px;
}

.nav_link,
.nav_content {
    display: inline-block;
    font-size: 16px;
    vertical-align: top;
    overflow: hidden;
}
.nav_content {
    width: calc(100% - 170px);
    height: 100%;
    transition: width 0.4s;
    overflow-y: auto;
}
.nav_content.extend {
    width: calc(100% - 64px);
}
.navigation {
    width: calc(100% - 40px);
    height: 40px;
    background-color: #f2f2f2;
    line-height: 40px;
    font-size: 14px;
    color: #424242;
    padding: 0px 20px;
}
</style>