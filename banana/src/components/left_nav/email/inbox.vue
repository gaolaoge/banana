<template>
    <div class="inbox">
        <div class="wrapper">
            <section>
                <div class="s">
                    <el-input
                        v-model="search_.input"
                        placeholder="请输入主题"
                        class="i_"
                    ></el-input>
                    <el-button
                        type="primary"
                        v-on:click="inbox_count()"
                    >搜索</el-button>
                    <nav>
                        <el-button v-on:click="inbox_count('收件箱')">收件箱</el-button>
                        <el-button
                            icon="el-icon-star-on"
                            v-on:click="inbox_count('标星箱')"
                        >标星箱</el-button>
                        <el-button v-on:click="inbox_count('自定义')">自定义</el-button>
                        <el-button v-on:click="inbox_count('草稿箱')">草稿箱</el-button>
                        <el-button v-on:click="inbox_count('已发送')">已发送</el-button>
                        <el-button v-on:click="inbox_count('已删除')">已删除</el-button>
                    </nav>
                </div>
                <div class="f">
                    <el-radio-group
                        v-model="search_.radio"
                        v-on:change="d"
                        class="radio_"
                    >
                        <el-radio label="1">全部（默认）</el-radio>
                        <el-radio label="2">已读</el-radio>
                        <el-radio label="3">未读</el-radio>
                    </el-radio-group>
                    <div class="operate_">
                        <el-button v-on:click="search_s()">当前页标示已读</el-button>
                        <!-- <el-button v-on:click="search_s()">全选</el-button> -->
                        <el-button v-on:click="toggleSelection()">反选</el-button>
                        <el-button v-on:click="move('已删除')">删除</el-button>
                        <el-button v-on:click="detele_true()">彻底删除</el-button>
                    </div>
                    <!-- 标记为 -->
                    <el-select
                        v-model="labeled_"
                        placeholder="标记为"
                        @change="s"
                    >
                        <el-option
                            v-for="item in search_.oo"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                    <!-- 移动至 -->
                    <el-select
                        v-model="remove_"
                        placeholder="移动至"
                    >
                        <el-option
                            v-for="item in search_.ot"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </div>
            </section>
            <!-- 表格 -->
            <section>
                <el-table
                    :data="table_"
                    style="width: 100%"
                    class="table_"
                    @selection-change="handleSelectionChange"
                    @row-click="check_mail"
                    ref="multipleTable"
                >
                    <el-table-column
                        type="selection"
                        width="55"
                    >
                    </el-table-column>
                    <el-table-column
                        width="40"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <img
                                src="@/assets/message_open.svg"
                                alt=""
                                class="img_"
                                v-if="scope.row.examine == 'Y'"
                            >
                            <img
                                src="@/assets/message_unopen.svg"
                                alt=""
                                class="img_"
                                v-if="scope.row.examine == 'N'"
                            >
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="addresserId"
                        label="发件人"
                        width="190"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="emailMotif"
                        label="主题"
                        row-style="style"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="sendTime"
                        label="时间"
                        align="center"
                        fixed="right"
                        width="220"
                    >
                    </el-table-column>
                    <el-table-column
                        width="50"
                        fixed="right"
                    >
                        <template slot-scope="scope">
                            <el-rate
                                @change="star_sign(scope.row)"
                                :max=1
                                v-model="scope.row.star"
                            ></el-rate>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page_">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="2"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="1"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="list_type.all_"
                    >
                    </el-pagination>
                </div>
            </section>
        </div>
        <el-dialog
            title="正文"
            :visible.sync="text_"
            top="30px"
            width="1300px"
        >
            <div class="k">
                <envelope v-bind:envelope_text="d_"></envelope>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import {    
    inbox_count,
    star_,
    delete_and_move,
    delete_t,
    sign_
} from '@/api/api_base'
import envelope from '@/components/left_nav/email/envelope.vue'

export default {
    name: 'inbox',
    data() {
        return {
            d_: '',
            search_: {
                input: '',
                radio: '1',
                oo: [
                    {
                        value: 'readed',
                        label: '已读'
                    },
                    {
                        value: 'unread',
                        label: '未读'
                    },
                    {
                        value: 'icon_',
                        label: '标星'
                    },
                ],
                ot: [
                    {
                        value: 'readed',
                        label: '屈臣氏'
                    },
                    {
                        value: 'unread',
                        label: '信用卡'
                    },
                    {
                        value: 'icon_',
                        label: '沃尔玛'
                    },
                ],
            },
            table_: [
                {
                    addresserId: '后勤部-李月英',
                    emailMotif: '申请容量',
                    sendTime: '2018-11-21 13：50',
                    star: 0,
                    count: false,
                    Examine: 'Y'                            //已读或未读
                },
            ],
            list_type: {
                page_num: 1,
                show_num: 10,
                all_: 1,
                folder: '收件箱',
                examine: 'all',                             //单选           
            },
            labeled_: '',
            remove_: '',
            multipleSelection: [],                          //多选已选中项
            lock: true,
            text_: false,                                   //弹出层
        }

    },
    methods: {
        //标记为
        s(y) {
            if (this.multipleSelection.length == 0) {
                return false
            }
            sign_({ 'data': this.multipleSelection, 'type': y })
                .then(data => {
                    if (data.data == 1) {
                        this.inbox_count()
                    }
                })
                .catch(err => {

                })
            // console.log(y)
        },
        //彻底删除
        detele_true() {
            if (this.multipleSelection.length == 0) {
                return false
            }
            let self_ = this
            this.$confirm('此操作不可回退, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delete_t({ 'data': self_.multipleSelection })
                    .then(data => {
                        if (data.data == 1) {
                            self_.$message({
                                message: '删除成功',
                                type: 'success',
                                center: true
                            })
                            self_.inbox_count()
                        }
                    })
                    .catch(err => {

                    })
            }).catch(() => {
                self_.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        //查看邮件
        check_mail(x) {
            if (this.lock) {
                this.d_ = x
                this.text_ = true
            } else {
                this.lock = true
            }
        },
        //删除加移动至文件夹
        move(destination) {
            if (this.multipleSelection.length == 0) {
                return false
            }
            delete_and_move({ 'data': this.multipleSelection, 'destination': destination })
                .then(data => {
                    console.log(data)
                    // this.inbox_count()
                })
                .catch(err => {

                })
        },
        //多选
        handleSelectionChange(v) {
            this.multipleSelection = v
        },
        //反选
        toggleSelection() {
            // if (rows) {
            var self_ = this
            this.table_.forEach(row => {
                self_.$refs.multipleTable.toggleRowSelection(row);
            });
            // } else {
            //     this.$refs.multipleTable.clearSelection();
            // }
        },
        //样式
        style() {
            return 'cursor: pointer'
        },
        //标星
        star_sign(z) {
            this.lock = false
            z.count = !z.count
            if (z.count == false) {
                z.star = 0
            }
            star_({ 'data': z })
                .then(data => {

                })
                .catch(err => {

                })
            return false
        },
        search_s() {
            console.log()
        },
        handleSizeChange() {
            console.log()
        },
        handleCurrentChange() {
            console.log()
        },
        //单选
        d(z) {
            switch (z) {
                case '1':
                    this.list_type.examine = 'all'
                    break
                case '2':
                    this.list_type.examine = 'Y'
                    break
                case '3':
                    this.list_type.examine = 'N'
                    break
            }
            this.inbox_count()
        },
        //回显数据 + 关键字查询
        inbox_count(z) {
            if (z) {
                this.list_type.folder = z
            }
            let s = `name=${this.search_.input}&page_num=${this.list_type.page_num}&show_num=${this.list_type.show_num}&data=${this.list_type.folder}&examine=${this.list_type.examine}`
            inbox_count(s)
                .then(data => {
                    console.log(data)
                    this.table_ = data.data[0].map((currentVal) => {
                        currentVal.star = 0
                        currentVal.count = false
                        return currentVal
                    })
                    this.list_type.all_ = data.data[1]
                })
                .catch(err => {

                })
        }
    },
    created() {
        this.inbox_count()
    },
    components: {
        envelope
    },
}
</script>

<style lang="scss" scoped>
.inbox {
    display: flex;
    justify-content: center;
    .wrapper {
        width: 1300px;
        padding: 20px 0px;
        .i_ {
            width: 220px;
            margin-right: 6px;
            margin-bottom: 26px;
        }
        nav {
            float: right;
        }
        .f,
        .operate_ {
            display: inline-block;
        }
        .radio_ {
            margin-right: 40px;
        }
        .table_ {
            margin-top: 40px;
        }
        .page_ {
            text-align: center;
            margin: 20px 0px;
        }
        .img_ {
            width: 14px;
            vertical-align: middle;
            color: #ccc;
        }
        .title_ {
            cursor: pointer;
        }
    }
    .k {
        height: 820px;
    }
}
/deep/ .el-dialog__body {
    padding: 0px 20px;
}
</style>
