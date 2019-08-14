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
                            @click="r"
                        >
                        </i>
                    </el-input>
                </div>
                <div class="search_default">
                    <div class="operate_default">
                        <el-select
                            v-model="time_screen"
                            placeholder="请选择数据显示区间"
                            @change="r"
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
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="cd"
                        >
                        </el-date-picker>
                        <!-- <div class="btn_interval">
                            <el-switch
                                v-model="picker_"
                                active-color="#ff4949"
                                inactive-color="#13ce66"
                                active-text="倒序"
                                inactive-text="正序"
                            >
                            </el-switch>
                        </div> -->
                    </div>
                    <div class="l">
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
                                    <span
                                        :class="{tit: activity.tit,artical: !activity.tit}"
                                        @click="p(activity.path,activity.keyWord,activity.state)"
                                    >
                                        {{activity.keyWord}}
                                        <i
                                            class="el-icon-document-delete i"
                                            v-if="activity.state == 'Y'"
                                        ></i>
                                    </span>
                                </el-timeline-item>
                            </el-timeline>
                        </div>
                        <!-- {{ activities }} -->
                        <div
                            class="add_more"
                            v-if="!lock_"
                        >
                            <el-button @click="g">加载更多</el-button>
                        </div>
                        <div v-if="lock_">
                            <el-divider content-position="center">
                                <span style="color: #aaa">已加载全部数据</span>
                            </el-divider>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <el-dialog
            title="预览"
            :visible.sync="dialogVisible"
            width="38%"
            top="3%"
            class="dialog_"
        >
            <img
                :src="file_url"
                alt=""
                v-if="preview_ == 'img'"
                class="img_"
            >
            <video
                :src="file_url"
                alt=""
                v-if="preview_ == 'mp4'"
                class="img_"
                controls
            ></video>
        </el-dialog>
    </div>
</template>

<script>

import {
    record_data,
    preview_data
} from '@/api/api_base'

export default {
    name: 'record',
    data() {
        return {
            lock_: false,
            current_page: '1',
            file_url: '',
            preview_: '',                    //预览类型
            dialogVisible: false,
            show_moudle: 'login_page',
            main: true,
            search_input: '',                //搜索框
            time_screen: 'month',            //下拉框
            date_interval: '',               //时间段 
            date_interval_: '',
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
            ]
        }
    },
    methods: {
        //预览
        p(t, k, state) {
            if (state == 'Y') {
                this.$message.error('文件已删除')
                return false
            }
            let self_ = this
            preview_data({ 'path': t, 'name': k })
                .then(data => {
                    let arr = k.split('.')
                    self_.preview_ = arr[arr.length - 1]
                    switch (self_.preview_) {
                        case 'jpg':
                            self_.preview_ = 'img'
                            break
                        case 'mp4':
                            self_.preview_ = 'mp4'
                            break
                    }
                    self_.dialogVisible = true
                    self_.file_url = data.data
                })

        },
        //加载更多
        g() {
            this.current_page = String(++this.current_page)
            this.retrieve_data()
        },
        //关键字搜索
        r() {
            this.current_page = '1'
            this.retrieve_data()
        },
        //时间片段
        cd(c) {
            this.current_page = '1'
            this.time_screen = ''
            this.date_interval_ = `${this.date_interval[0]},${this.date_interval[1]}`
            this.retrieve_data()

        },
        //下拉框
        r() {
            this.current_page = '1'
            this.date_interval = ''
            this.retrieve_data()
        },
        //获取数据
        retrieve_data() {
            let s = {
                'page_num': this.current_page,
                'search_input': this.search_input,
                'time_screen': this.time_screen,
                'date_interval': this.date_interval_
            },
                self_ = this
            record_data({ 'data': s })
                .then(data => {
                    if (self_.current_page == '1') {
                        self_.activities = []
                    }
                    if (data.data[1] == '无事退朝') {
                        self_.lock_ = true
                    }
                    self_.date_interval_ = ''
                    let u = Object.keys(data.data[2]).reverse()
                    u.forEach(currentVal => {
                        self_.activities.push({
                            keyWord: currentVal,
                            size: 'large',
                            type: 'primary',
                            icon: 'el-icon-stopwatch',
                            tit: true
                        })
                        data.data[2][currentVal].forEach(current_ => {
                            self_.activities.push({
                                keyWord: current_.keyWord,
                                time: current_.time,
                                id: current_.id,
                                path: current_.path,
                                state: current_.isDelect
                            })
                        })
                    })

                })
                .catch(err => {

                })
        }
    },
    created() {
        this.retrieve_data()
    }
}
</script>

<style lang="scss" scoped>
.record {
    height: calc(100% - 40px);
    overflow: hidden;
    .wrapper {
        position: relative;
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
            }
            .l {
                overflow: hidden;
                overflow-y: scroll;
                height: calc(100% - 70px);
            }
            .default_tree {
                padding: 8px;

                .tit {
                    color: #409eff;
                    font-weight: 600;
                }
                .artical {
                    cursor: pointer;
                    font-weight: 600;
                    color: #888;
                }
            }
            .l::-webkit-scrollbar {
                /*滚动条整体样式*/
                width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
                height: 8px;
            }
            .l::-webkit-scrollbar-thumb {
                /*滚动条里面小方块*/
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 5px rgba(102, 89, 89, 0.2);
                background: #9e9797;
            }
            .l::-webkit-scrollbar-track {
                /*滚动条里面轨道*/
                -webkit-box-shadow: inset 0 0 5px rgba(138, 129, 129, 0.2);
                border-radius: 10px;
                background: rgb(226, 221, 221);
            }
        }
    }
}
.img_ {
    width: 100%;
}
.i {
    // color: #fff;
    color: #f56c6c;
    border-radius: 2px;
    // line-height: 1.0em
    // padding: 1px;
    font-size: 16px;
    font-weight: 600;
    // margin-left: 12px;
}
.add_more {
    // position: absolute;
    width: 100%;
    // bottom: 50px;
    text-align: center;
}
</style>
