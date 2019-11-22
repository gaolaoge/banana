<template>
    <div class="batch_operation">
        <div class="wrapper">
            <div class="left_">
                <el-tabs
                    tab-position="left"
                    style="height: 100%;"
                >
                    <el-tab-pane
                        v-bind:label="k"
                        v-for="(v, k) in users"
                        v-bind:key="k"
                    >
                        <div class="wrapper_list">
                            <ul>
                                <li
                                    v-for="user in v"
                                    v-bind:key="user.id"
                                    draggable="true"
                                    v-on:dragstart="dragstart_"
                                    v-on:click="s($event)"
                                >
                                    <div class="item">
                                        <span class="span">{{ user.department }}</span>
                                        -
                                        <el-badge
                                            v-bind:is-dot="user.revise"
                                            class="badge_"
                                        >
                                            <span class="span">{{ user.userName }}</span>
                                        </el-badge>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="right_">
                <div class="department_">
                    <ul>
                        <li
                            v-for="part in Object.keys(users)"
                            v-bind:key="part"
                            v-on:dragover="dragover_"
                            v-on:drop="drop_"
                        >
                            <el-badge
                                :value="num[part]"
                                class="item"
                                v-bind:hidden="num[part] == 0"
                            >
                                <!-- <el-button size="small">评论</el-button> -->
                                <p style="width: 70px;">{{ part }}</p>
                            </el-badge>

                        </li>
                    </ul>
                </div>
            </div>
            <el-button
                type="primary"
                plain
                class="confirm"
                v-on:click="confirm"
            >确认修改</el-button>
        </div>
        <!-- 弹出框 -->
        <el-dialog
            title="修改项"
            :visible.sync="dialogVisible"
            width="60%"
            :before-close="cancel"
        >
            <div class="d">
                <ul
                    v-for="item in t"
                    v-bind:key="item.key"
                    class="item_"
                >
                    <li>
                        <span class="tit">{{ item[0].department }}</span>
                        <ul>
                            <li
                                v-for="i in item"
                                v-bind:key="i.key"
                            >
                                {{ i.department }}
                                -
                                {{ i.userName }}
                                <i
                                    class="el-icon-delete-solid"
                                    style="color: #F56C6C;"
                                    v-if="i.reason == 'begin'"
                                    v-on:click="back_(i)"
                                ></i>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="cancel">取 消</el-button>
                <el-button
                    type="primary"
                    @click="affirm"
                >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

import {
    get_data,
    post_data
} from '@/api/api_base'

export default {
    name: 'batch_operation',
    data() {
        return {
            data: '',           //留作对比的数据
            users: {},            //修改的数据
            t: {},
            dialogVisible: false,
            num: {
                '营销部': 0,
                '市场部': 0,
                '产品部': 0,
                '人事部': 0,
                '研发部': 0,
                '设计部': 0,
                '后勤部': 0,
            },
            pitch_on: {}        //批量移动
        }
    },
    methods: {
        //多选
        s(e) {
            let part_ = e.currentTarget.innerText.split(' - ')[0],
                name_ = e.currentTarget.innerText.split(' - ')[1]
            if (e.currentTarget.classList.length == 0) {            //放入拖动队列
                e.currentTarget.classList.add('pitch_on')
                if (this.pitch_on[part_]) {
                    this.pitch_on[part_].push(name_)
                } else {
                    this.pitch_on[part_] = [name_]
                }
            } else {                                                //移出
                e.currentTarget.classList.remove('pitch_on')
                let i = this.pitch_on[part_].indexOf(name_)
                this.pitch_on[part_].splice(i, 1)
            }
        },
        dragover_(ev) {
            ev.preventDefault();
        },
        //发送数据
        dragstart_(ev) {
            ev.dataTransfer.setData("Text", ev.path[0].innerText);
        },
        //接收数据
        drop_(ev) {
            ev.preventDefault();
            let data = '',                                          //要移动的值 
                old_part = '',                                      //单独移动原部门
                name = '',                                          //单独移动职员
                new_part = ev.target.innerText.split(/\n/)[0],      //要移动到的部门
                self_ = this
            if (Object.keys(this.pitch_on).length == 0) {              //单独移动
                data = ev.dataTransfer.getData("Text").split(' - ')
                old_part = data[0]
                name = data[1]
                move_(old_part, name)
            } else {                                                   //批量移动
                Object.keys(this.pitch_on).forEach((currentVal) => {
                    old_part = currentVal
                    this.pitch_on[currentVal].forEach((currentval_) => {
                        name = currentval_
                        move_(old_part, name)
                    })
                })
            }
            function move_(o_, n_) {
                let s = self_.users[o_].findIndex((currentVal, index, arr) => {
                    return currentVal.userName == n_
                }),
                    user_info = self_.users[o_][s]                       //获取要移动员工的全部信息
                if (new_part == o_) {                                    //无视本部门移动
                    return false
                }
                user_info.department = new_part
                user_info.revise = true
                user_info.root = o_
                self_.users[o_].splice(s, 1)
                self_.users[new_part].push(user_info)
                self_.num[new_part]++
                for (var i in self_.pitch_on) {
                    delete self_.pitch_on[i]
                }
            }
        },
        //确认修改
        confirm() {
            Object.keys(this.users).forEach((currentVal, index, arr) => {
                //被移出
                // this.data[currentVal].forEach((currentVal_, index_, arr_) => {
                //     let s = this.users[currentVal].find((currentVal_i, index_i, arr_i) => {
                //         return currentVal_i.account == currentVal_.account
                //     })
                //     if (!s) {
                //         currentVal_.reason = 'done'
                //         if (this.t[currentVal_.department]) {
                //             this.t[currentVal_.department].push(currentVal_)
                //         } else {
                //             this.t[currentVal_.department] = [currentVal_]
                //         }
                //     }
                // })
                //新加入
                this.users[currentVal].forEach((currentVal_, index_, arr_) => {
                    let s = this.data[currentVal].find((currentVal_i, index_i, arr_i) => {
                        return currentVal_i.account == currentVal_.account
                    })
                    if (!s) {
                        currentVal_.reason = 'begin'
                        if (this.t[currentVal_.department]) {
                            this.t[currentVal_.department].push(currentVal_)
                        } else {
                            this.t[currentVal_.department] = [currentVal_]
                        }
                    }
                })
            })

            if (!Object.keys(this.t).length) {
                this.$message.error('并无修改')
            } else {
                this.dialogVisible = true
            }
        },
        //取消
        cancel() {
            this.dialogVisible = false
            this.t = {}
        },
        //确认
        affirm() {
            if (Object.keys(this.t).length == 0) {
                this.dialogVisible = false
                this.t = {}
                return false
            }
            let j = []
            Object.keys(this.t).forEach(i => {
                this.t[i].forEach(ii => {
                    delete ii.reason
                    delete ii.revise
                    j.push(ii)
                })
            })
            post_data({ 'data': j })
                .then(data => {
                    this.$message({
                        message: '保存成功',
                        type: 'success',
                        center: true
                    })
                    this.dialogVisible = false
                    this.t = {}
                    this.num['营销部'] = 0
                    this.num['市场部'] = 0
                    this.num['产品部'] = 0
                    this.num['人事部'] = 0
                    this.num['研发部'] = 0
                    this.num['设计部'] = 0
                    this.num['后勤部'] = 0
                })
                .catch(err => {
                    this.$message.error('保存失败')
                    console.log('保存失败' + err)
                })
        },
        back_(ii) {
            // let u = this.t[ii.department].findIndex((currentVal) => {
            //     return currentVal.id == ii.id
            // })
            let back_ = ii.root,                        //退回到的位置
                to_ = ii.department,                    //现位置
                acc_ = ii.account,                      //帐号
                i_ = JSON.parse(JSON.stringify(ii)),    //需要移动的数据组
                index_to = this.users[to_].findIndex((currentVal) => {
                    return currentVal.account == acc_
                })
            i_.department = back_
            delete i_.revise
            this.users[to_].splice(index_to, 1)
            this.users[back_].push(i_)
            this.t = {}
            this.num[to_]--
            Object.keys(this.users).forEach((currentVal, index, arr) => {
                this.users[currentVal].forEach((currentVal_, index_, arr_) => {
                    let s = this.data[currentVal].find((currentVal_i, index_i, arr_i) => {
                        return currentVal_i.account == currentVal_.account
                    })
                    if (!s) {
                        currentVal_.reason = 'begin'
                        if (this.t[currentVal_.department]) {
                            this.t[currentVal_.department].push(currentVal_)
                        } else {
                            this.t[currentVal_.department] = [currentVal_]
                        }
                    }
                })
            })
        }
    },
    created() {
        get_data()
            .then(data => {
                // this.users = data.data
                this.data = JSON.parse(JSON.stringify(data.data))
                this.users = JSON.parse(JSON.stringify(data.data))
                Object.keys(this.users).forEach(c => {
                    // console.log(data.data[c])
                    this.users[c].forEach((currentval_, index_, arr_) => {
                        currentval_.revise = false
                    })
                })
                // this.users = data.data.map((currentVal, index, arr) => {
                //     currentVal.forEach((currentval_, index_, arr_) => {
                //         currentval_.revise = false
                //     })
                // })

            })
            .catch(err => {
                this.data = JSON.parse(JSON.stringify(this.users))
                console.log(err)
            })
    }
}
</script>

<style lang="scss" scoped>
.batch_operation {
    .wrapper {
        margin: 0px auto;
        position: relative;
        top: 60px;
        width: 1100px;
        background: rgb(250, 250, 250);
        border-radius: 6px;
        padding: 20px 20px 120px 20px;
        font-size: 0px;
        box-sizing: border-box;
        .left_,
        .right_ {
            vertical-align: top;
            display: inline-block;
            // width: 46%;
            height: 600px;
            // padding: 20px;
            font-size: 12px;
            .confirm {
                float: right;
                margin-top: -60px;
            }
        }
        .right_ {
            float: right;
        }
        .wrapper_list {
            padding: 12px 32px;
            li {
                list-style: none;
                .item {
                    font-size: 16px;
                    width: 240px;
                    height: 48px;
                    background: #a3b7e3;
                    line-height: 48px;
                    text-align: left;
                    margin: 6px;
                    padding-left: 40px;
                    cursor: pointer;
                    color: #fff;
                    box-shadow: 5px 5px 5px 0px #ccc;
                    border-radius: 2px;
                    transition: all 0.2s;
                    &:hover {
                        background: #becef1;
                    }
                    .badge_ {
                        display: inline;
                    }
                    .span {
                        padding: 0px 10px;
                    }
                }
            }
            .pitch_on .item {
                background-color: #89a;
            }
        }
        .department_ {
            padding: 20px;
            li {
                width: 240px;
                height: 48px;
                margin-bottom: 20px;
                list-style: none;
                line-height: 48px;
                text-align: center;
                color: #fff;
                font-size: 16px;
                font-weight: 700;
                box-shadow: 5px 5px 5px 0px #ccc;
                &:nth-of-type(1) {
                    background: #af85d9;
                }
                &:nth-of-type(2) {
                    background: #a78df2;
                }
                &:nth-of-type(3) {
                    background: #9f9ffb;
                }
                &:nth-of-type(4) {
                    background: #9fbdfb;
                }
                &:nth-of-type(5) {
                    background: #9fdbfb;
                }
                &:nth-of-type(6) {
                    background: #a3d9d9;
                }
                &:nth-of-type(7) {
                    background: #95e4aa;
                }
            }
        }
        .confirm {
            position: absolute;
            bottom: 120px;
            right: 20px;
        }
    }
    .d {
        display: flex;
        overflow-y: auto;
        overflow-x: auto;
        height: 400px;
        .item_ {
            flex-shrink: 0;
            width: 170px;
            list-style: none;
            vertical-align: top;
            padding-left: 40px;
            li {
                list-style: none;
                line-height: 2.4em;
            }
            .tit {
                font-weight: 600;
            }
        }
    }

    /deep/ .el-icon-delete-solid {
        cursor: pointer;
    }
    /deep/ .el-tabs__content {
        height: 100%;
        overflow-y: auto;
    }
    .d::-webkit-scrollbar,
    /deep/ .el-tabs__content::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 8px;
    }
    .d::-webkit-scrollbar-thumb,
    /deep/ .el-tabs__content::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(102, 89, 89, 0.2);
        background: #9e9797;
    }
    .d::-webkit-scrollbar-track,
    /deep/ .el-tabs__content::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(138, 129, 129, 0.2);
        border-radius: 10px;
        background: rgb(226, 221, 221);
    }
}

@media screen and (max-width: 1200px) {
    .batch_operation {
        .wrapper {
            width: 99%;
            top: 6px;
        }
    }
}
</style>
