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
                        @click="inbox_count()"
                    >搜索</el-button>
                    <nav>
                        <el-select
                            v-model="remove_2"
                            placeholder="自定义文件夹"
                            @change="cust_"
                        >
                            <el-option
                                v-for="item in search_.custom_folder2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </nav>
                </div>
                <div class="f">
                    <el-button
                        @click="customize_management"
                        v-show="customize == true"
                        icon="el-icon-setting"
                        class="management_"
                    >管理</el-button>
                    <el-radio-group
                        v-model="search_.radio"
                        @change="d"
                        class="radio_"
                    >
                        <el-radio label="1">全部（默认）</el-radio>
                        <el-radio label="2">已读</el-radio>
                        <el-radio label="3">未读</el-radio>
                    </el-radio-group>
                    <div class="operate_">
                        <el-button @click="readed()">当前页标示已读</el-button>
                        <el-button @click="toggleSelection()">反选</el-button>
                        <el-button @click="move('已删除')">删除</el-button>
                        <el-button @click="detele_true()">彻底删除</el-button>
                    </div>
                    <hr class="pp">
                    <!-- 标记为 -->
                    <el-select
                        v-model="labeled_"
                        placeholder="标记为"
                        @change="sign_i"
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
                        @change="move_custom"
                    >
                        <el-option
                            v-for="item in search_.custom_folder"
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
                    :row-class-name="tableRowClassName"
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
                        :current-page="list_type.page_num"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="list_type.show_num"
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
                <envelope
                    :all_data="table_"
                    :envelope_text="d_"
                    :options_="search_.custom_folder"
                    :filder="active_c"
                    @reset="reset_()"
                    @reset_="inbox_count()"
                    @shutdown="shut_"
                ></envelope>
            </div>
        </el-dialog>
        <!-- {{ multipleSelection }} -->
        <el-dialog
            title="文件夹管理"
            :visible.sync="management_"
        >
            <el-button
                class="management_create"
                @click="create_folder"
                type="primary"
                plain
            >新建文件夹</el-button>
            <el-table
                :data="table_management"
                stripe
                style="width: 100%"
            >
                <el-table-column
                    prop="dirName"
                    label="文件夹"
                >
                </el-table-column>
                <el-table-column
                    prop="examine"
                    label="未读消息"
                    width="180"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="count"
                    label="总消息"
                    width="180"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="220"
                    align="center"
                >
                    <template slot-scope="scope">
                        <el-button
                            @click="input_newName(scope.row,'改名')"
                            type="text"
                            size="small"
                        >改名</el-button>
                        <el-button
                            @click="management_dia(scope.row,'清空')"
                            type="text"
                            size="small"
                        >清空</el-button>
                        <el-button
                            @click="management_dia(scope.row,'删除')"
                            type="text"
                            size="small"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, prev, pager, next, jumper"
                :total="num_"
                class="page_"
            >
            </el-pagination>
        </el-dialog>
    </div>
</template>

<script>

import {
    inbox_count,
    star_,
    delete_and_move,
    delete_t,
    sign_,
    customize_echo,
    create_f,
    customize_m,
    sign_already
} from '@/api/api_base'
import envelope from '@/components/left_nav/email/envelope.vue'

export default {
    name: 'inbox',
    data() {
        return {
            n: null,
            active_c: '收件箱',
            num_: 0,
            table_management: [],                //自定义文件夹管理弹窗回显数据
            gaoge: '',
            management_: false,                  //自定义文件夹管理弹窗
            customize: false,                    //自定义文件夹
            d_: '',
            search_: {

                input: '',
                radio: '1',
                oo: [
                    {
                        value: '已读',
                        label: '已读'
                    },
                    {
                        value: '未读',
                        label: '未读'
                    },
                    {
                        value: '标星',
                        label: '标星'
                    },
                ],
                custom_folder: [],
                custom_folder2: [
                    {
                        value: '全部',
                        label: '全部'
                    }
                ],
            },
            table_: [
                {
                    addresserId: '后勤部-李月英',
                    emailMotif: '申请容量',
                    sendTime: '2018-11-21 13：50',
                    star: 0,
                    // count: false,
                    Examine: 'Y',                           //已读或未读
                    id: null,
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
            remove_2: '',
            multipleSelection: [],                          //多选已选中项
            lock: true,
            text_: false,                                   //弹出层
        }
    },
    methods: {
        // 关闭窗口
        shut_(){
            this.text_ = false
            this.inbox_count(this.n)
        },
        tableRowClassName({ row, rowIndex }) {
            row.index = rowIndex
        },
        //子集删除消息
        reset_() {
            this.text_ = false
            this.inbox_count()
        },
        //移动至自定义文件夹
        move_custom() {
            this.move(this.remove_)
        },
        //标记为
        sign_i(v) {
            let t = [],
                self_ = this
            this.multipleSelection.forEach(currentVal => {
                t.push(currentVal.id)
            })
            // console.log({ 'data': t, 'action': v })
            sign_already({ 'data': t, 'action': v })
                .then(data => {
                    if (data.data == 1) {
                        self_.$message({
                            message: '标记成功',
                            type: 'success'
                        })
                        self_.inbox_count()
                        self_.labeled_ = ''
                    }
                })
                .catch(err => {

                })
        },
        //当前页标记为已读
        readed() {
            let t = [],
                self_ = this
            this.table_.forEach(currentVal => {
                t.push(currentVal.id)
            })
            sign_already({ 'data': t, 'action': '已读' })
                .then(data => {
                    if (data.data == 1) {
                        self_.$message({
                            message: '标记成功',
                            type: 'success'
                        })
                        self_.inbox_count()
                    }
                })
                .catch(err => {

                })
        },
        //改名
        input_newName(in_, an_) {
            let self_ = this
            this.$prompt('命名为新名称', '修改', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            })
                .then(val => {
                    self_.management_dia(in_, an_, val)
                })
                .catch(() => {
                    self_.$message({
                        type: 'info',
                        message: '取消修改'
                    })
                })
        },
        //新建文件夹
        create_folder() {
            let self_ = this
            this.$prompt('新建文件夹', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            })
                .then(({ value }) => {
                    create_f({ 'data': value })
                        .then(data => {
                            self_.$message({
                                type: 'success',
                                message: '创建成功'
                            });
                            self_.customize_management()
                        })
                        .catch(err => {

                        })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消创建'
                    });
                });
        },
        management_dia(in_, an_, v) {
            let n = {
                'name': in_.dirName,
                'action': an_
            }
            if (v) {
                n.new_name = v
            }
            customize_m({ 'data': n })
                .then(data => {
                    this.customize_management()
                    // alert(an_)
                    if (v) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        })
                    } else if (an_ == '删除') {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                    } else {
                        this.$message({
                            message: '清空成功',
                            type: 'success'
                        })
                    }
                })
        },
        //自定义文件夹管理
        customize_management() {
            customize_echo()
                .then(data => {
                    // console.log(data)/
                    this.table_management = data.data[0]
                    this.num_ = Number(data.data[1])
                })
                .catch(err => {

                })
            this.management_ = true
        },
        //自定义 
        cust_() {
            this.inbox_count('自定义', this.callback)
            this.customize = true

        },
        //自定义筛选
        callback() {
            if (this.remove_2 != '全部') {
                let y = this.remove_2,
                    c = this.table_.filter((currentVal) => {
                        if (currentVal.dirName == y) {
                            return currentVal
                        }
                    })
                this.table_ = c
                console.log(this.table_)
            }
        },
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
            let self_ = this
            if (this.multipleSelection.length == 0) {
                return false
            }
            delete_and_move({ 'data': this.multipleSelection, 'destination': destination })
                .then(data => {
                    if (data.data == 1) {
                        self_.$message({
                            message: '移动成功',
                            type: 'success'
                        })
                        self_.inbox_count()
                        self_.remove_ = ''
                    }
                })
                .catch(err => {

                })
        },
        //多选
        handleSelectionChange(v) {
            this.multipleSelection = v
            this.remove_ = ''
        },
        //反选
        toggleSelection() {
            var self_ = this
            this.table_.forEach(row => {
                self_.$refs.multipleTable.toggleRowSelection(row);
            });
        },
        //样式
        style() {
            return 'cursor: pointer'
        },
        //标星
        star_sign(z) {
            let self_ = this
            this.lock = false
            z.count = !z.count
            if (z.count == false) {
                z.star = 0
            } else {
                z.star = 1
            }
            star_({ 'data': z })
                .then(data => {
                    self_.inbox_count(self_.n)
                })
                .catch(err => {

                })
            return false
        },
        //当前页展示信息数量
        handleSizeChange(z) {
            this.list_type.show_num = z
            this.inbox_count()
        },
        //跳转到目表页
        handleCurrentChange(z) {
            this.list_type.page_num = z
            this.inbox_count()
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
        inbox_count(z, callbackFun) {
            this.customize = false
            if (z) {
                this.list_type.folder = z
                this.active_c = z
            }
            let s = `name=${this.search_.input}&page_num=${this.list_type.page_num}&show_num=${this.list_type.show_num}&data=${this.list_type.folder}&examine=${this.list_type.examine}`,
                self_ = this
            inbox_count(s)
                .then(data => {
                    switch (z) {
                        case '收件箱':
                        case '标星箱':
                        case '草稿箱':
                        case '已发送':
                        case '已删除':
                            this.remove_2 = ''
                    }
                    this.table_ = data.data[0].map((currentVal) => {
                        currentVal.count = false
                        currentVal.star = Number(currentVal.star)
                        return currentVal
                    })
                    this.list_type.all_ = data.data[1]
                    this.search_.custom_folder2 = [{
                        'value': '全部',
                        'label': '全部'
                    }]
                    this.search_.custom_folder = data.data[2].map(currentVal => {
                        self_.search_.custom_folder2.push({
                            'value': currentVal.customDirname,
                            'label': currentVal.customDirname
                        })
                        return {
                            'value': currentVal.customDirname,
                            'label': currentVal.customDirname
                        }
                    })
                    if (callbackFun) {
                        callbackFun()
                    }
                })
                .catch(err => {

                })
        },
        //监听url
        m() {
            let t = this.$route.query.state,
                self_ = this
            switch (t) {
                case ('inbox'):
                    self_.n = '收件箱'
                    self_.active_c = '收件箱'
                    break;
                case ('star_box'):
                    self_.n = '标星箱'
                    self_.active_c = '标星箱'
                    break;
                case ('draft_box'):
                    self_.n = '草稿箱'
                    self_.active_c = '草稿箱'
                    break;
                case ('send_box'):
                    self_.n = '已发送'
                    self_.active_c = '已发送'
                    break;
                case ('delete_box'):
                    self_.n = '已删除'
                    self_.active_c = '已删除'
                    break;
            }
            this.inbox_count(this.n)
        }
    },
    watch: {
        "$route": {
            handler: function (val, oldVal) {
                this.m()
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        this.m()
        this.inbox_count(this.n)
    },
    components: {
        envelope,
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
        .pp {
            display: none;
        }
        .i_ {
            width: 220px;
            margin-right: 6px;
            margin-bottom: 26px;
        }
        nav {
            float: left;
            margin-right: 12px;
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
.management_ {
    margin-right: 22px;
}
.page_ {
    text-align: center;
    padding: 22px 0px;
}
.management_create {
    float: right;
}
@media screen and (min-width: 400px) {
    .inbox {
        .wrapper {
            width: 99%;
            .pp {
                display: block;
                opacity: 0;
            }
        }
    }
}
</style>
