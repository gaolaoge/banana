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
                            {{ part }}

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
                        <ul
                            v-for="i in item"
                            v-bind:key="i.key"
                        >
                            <li>
                                {{ i.department }}
                                -
                                {{ i.userName }}
                                <i
                                    class="el-icon-remove-outline"
                                    style="background-color: #F56C6C;color: #fff;border-radius: 50%"
                                    v-if="i.reason == 'done'"
                                ></i>
                                <i
                                    class="el-icon-circle-plus-outline"
                                    style="background-color: #67C23A;color: #fff;border-radius: 50%"
                                    v-if="i.reason == 'begin'"
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
            data: '',
            users: {
                //营销部
                '营销部': [
                    {
                        userName: '高歌',
                        account: 'gaoge',
                        id: '001',
                        department: '营销部'
                    },
                    {
                        userName: '王强',
                        account: 'wangqiang',
                        id: '002',
                        department: '营销部'
                    },
                    {
                        userName: '张宇',
                        account: 'zhangyu',
                        id: '003',
                        department: '营销部'
                    },
                    {
                        userName: '林梦至',
                        account: 'linmengzhi',
                        id: '004',
                        department: '营销部'
                    },
                    {
                        userName: '贾冰倩',
                        account: 'jiabingqian',
                        id: '005',
                        department: '营销部'
                    },
                    {
                        userName: '贾冰倩2',
                        account: 'jiabingqian2',
                        id: '006',
                        department: '营销部'
                    },
                    {
                        userName: '贾冰倩3',
                        account: 'jiabingqian3',
                        id: '007',
                        department: '营销部'
                    },
                    {
                        userName: '贾冰倩4',
                        account: 'jiabingqian4',
                        id: '008',
                        department: '营销部'
                    },
                    {
                        userName: '贾冰倩5',
                        account: 'jiabingqian5',
                        id: '009',
                        department: '营销部'
                    },
                ],
                //产品部
                '产品部': [
                    {
                        userName: '周杰伦',
                        account: 'zhoujielun',
                        id: '011',
                        department: '产品部'
                    },
                    {
                        userName: '陈奕迅',
                        account: 'chenyixun',
                        id: '012',
                        department: '产品部'
                    },
                    {
                        userName: '王力宏',
                        account: 'wanglihong',
                        id: '013',
                        department: '产品部'
                    },
                    {
                        userName: '林志炫',
                        account: 'linzhixuan',
                        id: '014',
                        department: '产品部'
                    },
                    {
                        userName: '薛之谦',
                        account: 'xuezhixqian',
                        id: '015',
                        department: '产品部'
                    },
                ],
                //市场部
                '市场部': [
                    {
                        userName: '王旭',
                        account: 'wangxu',
                        id: '021',
                        department: '市场部'
                    },
                    {
                        userName: '郑香宜',
                        account: 'zhengxiangyi',
                        id: '022',
                        department: '市场部'
                    },
                    {
                        userName: '解晨',
                        account: 'xiechen',
                        id: '023',
                        department: '市场部'
                    },
                    {
                        userName: '孙伟鹏',
                        account: 'sunweipeng',
                        id: '024',
                        department: '市场部'
                    },
                    {
                        userName: '吴春亮',
                        account: 'wuchunliang',
                        id: '025',
                        department: '市场部'
                    },
                ],
                //人事部
                '人事部': [
                    {
                        userName: '常旭',
                        account: 'cahngxu',
                        id: '031',
                        department: '人事部'
                    },
                    {
                        userName: '何晓言',
                        account: 'hexiaoyan',
                        id: '032',
                        department: '人事部'
                    },
                    {
                        userName: '理想',
                        account: 'lixiang',
                        id: '033',
                        department: '人事部'
                    },
                    {
                        userName: '曾智慧',
                        account: 'zengzhihui',
                        id: '034',
                        department: '人事部'
                    },
                    {
                        userName: '张大光',
                        account: 'zhangdaguang',
                        id: '035',
                        department: '人事部'
                    },
                ],
                //研发部
                '研发部': [
                    {
                        userName: '雷军',
                        account: 'leijun',
                        id: '041',
                        department: '研发部'
                    },
                    {
                        userName: '贾跃亭',
                        account: 'jiayueting',
                        id: '042',
                        department: '研发部'
                    },
                    {
                        userName: '罗永浩',
                        account: 'luoyonghao',
                        id: '043',
                        department: '研发部'
                    },
                    {
                        userName: '任正非',
                        account: 'renzhengfei',
                        id: '044',
                        department: '研发部'
                    },
                    {
                        userName: '乔布斯',
                        account: 'qiaobusi',
                        id: '045',
                        department: '研发部'
                    },
                ],
                //设计部
                '设计部': [
                    {
                        userName: '郭德纲',
                        account: 'guodegang',
                        id: '051',
                        department: '设计部'
                    },
                    {
                        userName: '于谦',
                        account: 'yuqian',
                        id: '052',
                        department: '设计部'
                    },
                    {
                        userName: '岳云鹏',
                        account: 'yueyunpeng',
                        id: '053',
                        department: '设计部'
                    },
                    {
                        userName: '孙越',
                        account: 'sunyue',
                        id: '054',
                        department: '设计部'
                    },
                    {
                        userName: '高峰',
                        account: 'gaofeng',
                        id: '055',
                        department: '设计部'
                    },
                ],
                //后勤部
                '后勤部': [
                    {
                        userName: '刘德华',
                        account: 'liudehua',
                        id: '061',
                        department: '后勤部'
                    },
                    {
                        userName: '周润发',
                        account: 'zhourunfa',
                        id: '062',
                        department: '后勤部'
                    },
                    {
                        userName: '张学友',
                        account: 'zhangxueyou',
                        id: '063',
                        department: '后勤部'
                    },
                    {
                        userName: '陈雪凝',
                        account: 'chenxuening',
                        id: '064',
                        department: '后勤部'
                    },
                    {
                        userName: '邓紫棋',
                        account: 'dengziqi',
                        id: '065',
                        department: '后勤部'
                    },
                ],
            },
            t: {},
            dialogVisible: false
        }
    },
    methods: {
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
            let data = ev.dataTransfer.getData("Text").split(' - '),
                old_part = data[0],
                name = data[1],
                new_part = ev.target.innerText,
                s = this.users[old_part].findIndex((currentVal, index, arr) => {
                    return currentVal.userName == name
                }),
                user_info = this.users[old_part][s]
            user_info.department = new_part
            user_info.revise = true
            this.users[old_part].splice(s, 1)
            this.users[new_part].push(user_info)
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
                        console.log('gaoge' + currentVal_.department)
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
            }else{
                this.dialogVisible = true
            }
        },
        //取消
        cancel(){
            this.dialogVisible = false
            this.t = {}
        },
        //确认
        affirm(){
            console.log(this.t)
            let j = []
            Object.keys(this.t).forEach(i => {
                this.t[i].forEach(ii => {
                    delete ii.reason
                    delete ii.revise
                    j.push(ii)
                })
            })
            post_data({'data': j})
                .then(data => {
                    this.$message({
                        message: '保存成功',
                        type: 'success',
                        center: true
                    })
                    this.dialogVisible = false
                    this.t = {}
                })
                .catch(err => {
                    this.$message.error('保存失败')
                    console.log('保存失败' + err)
                })
        }
    },
    created() {
        get_data()
            .then(data => {
                // console.log()
                // this.users = data.data
                this.data = JSON.parse(JSON.stringify(data.data))
                this.users = JSON.parse(JSON.stringify(data.data))
                Object.keys(this.users).forEach(c => {
                    // console.log(data.data[c])
                    this.users[c].forEach((currentval_, index_, arr_) => {
                        currentval_.revise = false
                    })
                })
                // console.log(this.users)
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
.wrapper {
    position: relative;
    top: 60px;
    width: 1200px;
    background: rgb(250, 250, 250);
    border-radius: 6px;
    /* height: 100px; */
    margin-left: 50%;
    transform: translateX(-50%);
    font-size: 0px;
    .left_,
    .right_ {
        vertical-align: top;
        display: inline-block;
        width: 46%;
        height: 600px;
        padding: 20px;
        font-size: 12px;
        .confirm {
            float: right;
        }
    }
    .wrapper_list {
        padding: 12px 32px;
        li {
            list-style: none;
            .item {
                font-size: 16px;
                width: 280px;
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
    }
    .department_ {
        padding: 20px;
        li {
            width: 300px;
            height: 48px;
            margin-bottom: 20px;
            margin-left: 90px;
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
        bottom: 20px;
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
        // border: 1px solid #eee;
        li {
            list-style: none;
            line-height: 2.4em;
        }
        .tit{
            font-weight: 600;

        }
    }
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
    // -webkit-box-shadow: inset 0 0 5px rgba(102, 89, 89, 0);
    // background: #fafafa;
}
.d::-webkit-scrollbar-track,
/deep/ .el-tabs__content::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(138, 129, 129, 0.2);
    border-radius: 10px;
    background: rgb(226, 221, 221);
    // -webkit-box-shadow: inset 0 0 5px rgba(138, 129, 129, 0);
    // border-radius: 10px;
    // background: #fafafa;
}
</style>
