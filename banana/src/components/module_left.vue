<template>
    <div class="module_left">
        <div
            class="nav_link"
            v-bind:class="[{show_me: show_me}]"
        >
            <el-row class="tac">
                <el-col :span="24">
                    <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#2d5988"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                    >
                        <el-menu-item
                            index="1"
                            v-on:click="skip('platform_management')"
                        >
                            <i class="el-icon-menu"></i>
                            <span slot="title">{{ platform_management }}</span>
                        </el-menu-item>

                        <el-menu-item
                            index="2"
                            v-on:click="skip('company_management')"
                        >
                            <i class="el-icon-s-cooperation"></i>
                            <span slot="title">{{ company_management }}</span>
                        </el-menu-item>

                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-s-check"></i>
                                <span>用户管理</span>
                            </template>
                            <el-menu-item
                                index="3-1"
                                v-on:click="skip('user_management_info')"
                                v-show="show_me"
                            >{{ user_management_info }}</el-menu-item>
                            <el-menu-item
                                index="3-2"
                                v-on:click="skip('user_management_self')"
                                v-show="show_me"
                            >{{ user_management_self }}</el-menu-item>
                            <el-menu-item
                                index="3-3"
                                v-on:click="skip('batch_operation')"
                                v-show="show_me"
                            >{{ batch_operation }}</el-menu-item>
                            <el-menu-item
                                index="3-4"
                                v-on:click="skip('memory_management')"
                                v-show="show_me"
                            >{{ memory_management }}</el-menu-item>
                        </el-submenu>

                        <el-submenu index="4">
                            <template slot="title">
                                <i class="el-icon-document"></i>
                                <span>超级管理</span>
                            </template>
                            <el-menu-item
                                index="4-1"
                                v-on:click="skip('company_list')"
                                v-show="show_me"
                            >{{ company_list }}</el-menu-item>
                            <el-menu-item
                                index="4-2"
                                v-on:click="skip('company_add')"
                                v-show="show_me"
                            >{{ company_add }}</el-menu-item>
                        </el-submenu>

                        <el-submenu index="5">
                            <template slot="title">
                                <i class="el-icon-message"></i>
                                <span>消息中心</span>
                            </template>
                            <el-menu-item
                                index="5-1"
                                v-on:click="skip('inbox')"
                                v-show="show_me"
                            >{{ inbox }}</el-menu-item>
                            <el-menu-item
                                index="5-2"
                                v-on:click="skip('star_box')"
                                v-show="show_me"
                            >{{ star_box }}</el-menu-item>
                            <el-menu-item
                                index="5-3"
                                v-on:click="skip('draft_box')"
                                v-show="show_me"
                            >{{ draft_box }}</el-menu-item>
                            <el-menu-item
                                index="5-4"
                                v-on:click="skip('send_box')"
                                v-show="show_me"
                            >{{ send_box }}</el-menu-item>
                            <el-menu-item
                                index="5-2"
                                v-on:click="skip('delete_box')"
                                v-show="show_me"
                            >{{ delete_box }}</el-menu-item>
                        </el-submenu>

                        <el-menu-item
                            index="6"
                            disabled
                        >
                            <i class="el-icon-document"></i>
                            <span slot="title">{{ platform_management }}</span>
                        </el-menu-item>

                        <el-menu-item
                            index="7"
                            disabled
                        >
                            <i class="el-icon-document"></i>
                            <span slot="title">{{ platform_management }}</span>
                        </el-menu-item>

                        <el-menu-item
                            index="8"
                            disabled
                        >
                            <i class="el-icon-document"></i>
                            <span slot="title">{{ platform_management }}</span>
                        </el-menu-item>

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
            platform_management: '平台管理',
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
            inbox: '收件箱',
            star_box: '标星箱',
            draft_box: '草稿箱 ',
            send_box: '已发送',
            delete_box: '已删除',
            show_me: true,                          //主菜单隐藏时隐藏导航
            extend: false,
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
                case 'platform_management':
                    this_.$router.replace('/platform_management');
                    break;
                case 'company_management':
                    this_.$router.replace('/company_management');
                    break;
                case 'user_management_info':
                    this.$router.replace('/user_management/user_management_info');
                    break;
                case 'user_management_self':
                    this.$router.replace('/user_management/user_management_self');
                    break;
                case 'batch_operation':
                    this.$router.replace('/user_management/batch_operation');
                    break;
                case 'memory_management':
                    this.$router.replace('/user_management/memory_management');
                    break;
                case 'company_list':
                    this.$router.replace('/super_admin/company_list');
                    break;
                case 'company_add':
                    this.$router.replace('/super_admin/company_add');
                    break;
            }
        },
        //导航标签
        nav() {
            let u = window.location.pathname,
                ua = u.trim().split('/'),
                s = '',
                _this = this
            ua.shift()
            ua.forEach(function (currentVal, index, arr) {
                s = s + _this[currentVal] + ' / '
            })
            this.$store.commit('change_current', s)
        }
    },
    computed: {
        ...mapState(['nav_']),
        left_nav_show() {
            return this.nav_.left_nav_show
        },

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