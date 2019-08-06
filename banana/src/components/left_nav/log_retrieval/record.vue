<template>
    <div class="record">
        <div class="wrapper">
            <template v-if="!main">
                <div
                    class="login_account"
                    v-show="show_moudle == 'login_page'"
                >
                    <p class="tit_">为了保护您的隐私安全，请输入二级密码</p>
                    <el-input
                        placeholder="请输入二级密码"
                        class="inp_"
                    ></el-input>
                    <div class="d">
                        <el-checkbox class="check_">下次自动登录</el-checkbox>
                        <span
                            class="forget_pass"
                            @click="show_moudle = 'retrieve_pass'"
                        >忘记密码</span>
                    </div>
                    <el-button class="k">登录</el-button>
                </div>
                <div
                    class="retrieve_pass"
                    v-show="show_moudle == 'retrieve_pass'"
                >
                    <p class="tit_">请输入邮箱号码或手机号码获取验证码</p>
                    <el-input
                        placeholder="请输入邮箱号码/手机号"
                        class="inp_"
                    ></el-input>
                    <div class="k">
                        <el-button @click="show_moudle = 'login_page'">取消</el-button>
                        <el-button>发送</el-button>
                    </div>
                </div>
            </template>
            <template v-if="main">
                <div class="search_condition">
                    <el-input
                        v-model="search_input"
                        class="search_inp"
                        placeholder="查找您的搜索历史"
                    >
                        <i
                            class="el-icon-search el-input__icon"
                            slot="suffix"
                            style="cursor: pointer"
                        >
                        </i>
                    </el-input>
                </div>
                <div class="search_default">
                    <div class="operate_default">
                        <el-select
                            v-model="time_screen"
                            placeholder="请选择数据显示区间"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                        <el-date-picker
                            v-model="date_interval"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                        >
                        </el-date-picker>
                        <div class="btn_interval">
                            <el-switch
                                v-model="picker_"
                                active-color="#ff4949"
                                inactive-color="#13ce66"
                                active-text="倒序"
                                inactive-text="正序"
                            >
                            </el-switch>
                        </div>
                    </div>
                    <div class="default_tree">
                        <el-timeline :reverse="picker_">
                            <el-timeline-item
                                v-for="(activity, index) in activities"
                                :key="index"
                                :timestamp="activity.time"
                                :type="activity.type"
                                :color="activity.color"
                                :size="activity.size"
                                :icon="activity.icon"
                            >
                                <div :class="{tit: activity.tit,artical: !activity.tit}">
                                    {{activity.keyWord}}
                                </div>
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>

import {
    record_data
} from '@/api/api_base'

export default {
    name: 'record',
    data() {
        return {
            show_moudle: 'login_page',
            main: true,
            search_input: '',                //搜索框
            time_screen: 'month',            //下拉框
            date_interval: '',               //时间段 
            picker_: false,                  //时间轴排序方式
            activities: [],                  //数据
            options: [
                {
                    value: '',
                    label: '-'
                },
                {
                    value: 'today',
                    label: '今日'
                },
                {
                    value: 'week',
                    label: '本周'
                },
                {
                    value: 'month',
                    label: '本月'
                }
            ],
            demo: {
                '2019.09.12': [
                    {
                        keyWord: '林梦销售报告',
                        time: '09:16',
                        id: 13
                    },
                    {
                        keyWord: '设计部PPT',
                        time: '11:16',
                        id: 13
                    },
                    {
                        keyWord: '非本人认为儿童',
                        time: '17:16',
                        id: 13
                    },
                ],
                '2019-09-11': [
                    {
                        keyWord: '让他荷塘月色果然是他',
                        time: '09:16',
                        id: 13
                    },
                    {
                        keyWord: '个人个人用户',
                        time: '11:16',
                        id: 13
                    },
                    {
                        keyWord: '大富翁搞个6猧',
                        time: '17:16',
                        id: 13
                    },
                    {
                        keyWord: '狐天狐地十分广泛',
                        time: '17:16',
                        id: 13
                    },
                ],
                '2019.09.10': [
                    {
                        keyWord: '林梦销售报告',
                        time: '09:16',
                        id: 13
                    },
                    {
                        keyWord: '设计部PPT',
                        time: '11:16',
                        id: 13
                    },
                    {
                        keyWord: '非本人认为儿童',
                        time: '17:16',
                        id: 13
                    },
                ]
            }
        }
    },
    methods: {
        //获取数据
        retrieve_data() {
            let s = {
                'search_input': this.search_input,
                'time_screen': this.time_screen,
                'date_interval': this.date_interval
            }
            record_data({ 'data': s })
                .then(data => {

                })
                .catch(err => {

                })
        }
    },
    created() {
        this.retrieve_data()

        let self_ = this,
            li_ = null
        Object.keys(self_.demo).forEach(currentVal => {
            self_.activities.push({
                keyWord: currentVal,
                // timeGenerated: currentVal,
                size: 'large',
                type: 'primary',
                icon: 'el-icon-stopwatch',
                tit: true
            })
            self_.demo[currentVal].forEach(current_ => {
                self_.activities.push({
                    keyWord: current_.keyWord,
                    time: current_.time,
                    id: current_.id
                })
            })
        })
    }
}
</script>

<style lang="scss" scoped>
.record {
    height: calc(100% - 40px);
    overflow: hidden;
    .wrapper {
        margin: 0px auto;
        width: 1300px;
        height: 100%;
        .login_account,
        .retrieve_pass {
            border: 1px solid #888;
            margin: 80px auto;
            width: 820px;
            padding: 80px;
            box-sizing: border-box;
            .tit_ {
                line-height: 3.6em;
                text-align: center;
                font-size: 24px;
            }
            .inp_ {
                width: 80%;
                display: block;
                margin: 10px auto;
            }
            .d {
                margin-bottom: 30px;
                .check_ {
                    margin-left: 80px;
                }
                .forget_pass {
                    float: right;
                    font-size: 14px;
                    color: #409eff;
                    margin-right: 80px;
                    cursor: pointer;
                }
            }
            .k {
                display: block;
                width: 220px;
                margin: 0px auto;
                text-align: center;
            }
        }
        .search_condition {
            padding: 10px 0px;
            .search_inp {
                width: 420px;
            }
        }
        .search_default {
            height: 724px;
            box-shadow: 1px 1px 4px 2px #eee;
            border-radius: 2px;
            padding: 8px 16px;
            .operate_default {
                padding-bottom: 12px;
                .btn_interval {
                    float: right;
                }
            }
            .default_tree {
                padding: 8px;
                height: 650px;
                overflow: hidden;
                overflow-y: scroll;
                .tit {
                    color: #409eff;
                    font-weight: 600;
                }
                .artical {
                    cursor: pointer;
                    font-weight: 600;
                    color: #888
                }
            }
            .default_tree::-webkit-scrollbar {
                /*滚动条整体样式*/
                width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
                height: 8px;
            }
            .default_tree::-webkit-scrollbar-thumb {
                /*滚动条里面小方块*/
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 5px rgba(102, 89, 89, 0.2);
                background: #9e9797;
            }
            .default_tree::-webkit-scrollbar-track {
                /*滚动条里面轨道*/
                -webkit-box-shadow: inset 0 0 5px rgba(138, 129, 129, 0.2);
                border-radius: 10px;
                background: rgb(226, 221, 221);
            }
        }
    }
}
</style>
