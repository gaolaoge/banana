<template>
    <div class="user_management_info">
        <div class="wrapper">
            <!-- 表单 -->
            <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
            >
                <el-form-item>
                    <el-input
                        v-model="formInline.user"
                        placeholder="输入用户姓名"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        v-on:click="search_user"
                    >搜索</el-button>
                </el-form-item>
                <el-form-item label="部门名称">
                    <el-select
                        v-model="formInline.branch"
                        placeholder="全部"
                        v-on:change="branch_change"
                    >
                        <el-option
                            style="color: #ccc;
                               font-weight: 500"
                            label="全部"
                            value="all"
                        ></el-option>
                        <el-option
                            v-for="item in options"
                            v-bind:key="item.value"
                            v-bind:label="item.label"
                            v-bind:value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select
                        v-model="formInline.part"
                        placeholder="全部"
                        v-on:change="part_change"
                    >
                        <el-option
                            style="color: #ccc;
                               font-weight: 500"
                            label="全部"
                            value="all"
                        ></el-option>
                        <el-option
                            label="部门负责人"
                            value="部门负责人"
                        ></el-option>
                        <el-option
                            label="用户"
                            value="用户"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="额度分配">
                    <el-select
                        v-model="formInline.limit"
                        placeholder="全部"
                        v-on:change="limit_change"
                    >
                        <el-option
                            style="color: #ccc;
                               font-weight: 500"
                            label="全部"
                            value="all"
                        ></el-option>
                        <el-option
                            label="500G以下"
                            value="0G - 500G"
                        ></el-option>
                        <el-option
                            label="500G - 1T"
                            value="500G - 1T"
                        ></el-option>
                        <el-option
                            label="1T - 2T"
                            value="1T - 2T"
                        ></el-option>
                        <el-option
                            label="2T以上"
                            value="2T - 0T"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <!-- 回退按钮 -->
            <div class="back">
                <el-button
                    type="primary"
                    icon="el-icon-d-arrow-left"
                    size="small"
                    v-on:click="load_again"
                    class="call_back"
                    v-show="call_back"
                >回退</el-button>
            </div>
            <!-- 操作按钮 -->
            <div class="btn_box">
                <el-button
                    type="warning"
                    icon="el-icon-user-solid"
                    size="small"
                    v-on:click="dialog_one = true"
                >添加新用户</el-button>
                <el-button
                    type="danger"
                    icon="el-icon-delete-solid"
                    size="small"
                    v-on:click="delect_select"
                >批量删除</el-button>
            </div>
            <!-- 表格 -->
            <el-table
                v-bind:data="tableData"
                border
                style="width: 100%"
                v-on:selection-change="( selection ) => this.tab_selection = selection"
            >
                <el-table-column
                    fixed="left"
                    type="selection"
                    width="57"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="account"
                    label="账户"
                    width="150"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="userName"
                    label="用户名"
                    width="82"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="department"
                    label="部门"
                    width="84"
                    sortable="true"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="position"
                    label="角色"
                    width="110"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="userPhone"
                    label="电话"
                    width="150"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="userEmail"
                    label="邮箱"
                    width="190"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="totalSpace"
                    label="分配额度"
                    width="100"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    label="剩余内存"
                    align="center"
                >
                    <template slot-scope="scope">
                        <el-progress
                            v-bind:percentage="Number(scope.row.unusedSpace)"
                            v-bind:show-text="false"
                        ></el-progress>
                    </template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="修改"
                    align="center"
                    width="80"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            size="small"
                            v-on:click="operate(scope.row)"
                        >修改</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="table_info.data_all"
            >
            </el-pagination>

            <!-- 添加新用户弹窗 -->
            <el-dialog
                title="添加新用户"
                :visible.sync="dialog_one"
                v-bind:append-to-body="true"
                width="700px"
            >
                <el-tabs
                    v-model="alert_show"
                    v-on:tab-click="alert_cut"
                >
                    <el-tab-pane
                        label="单独添加"
                        name="alone"
                    ></el-tab-pane>
                    <el-tab-pane
                        label="批量添加"
                        name="batch"
                    ></el-tab-pane>
                </el-tabs>
                <!-- 单独添加新用户 -->
                <el-form
                    :model="add_user_alert"
                    class="alert_add"
                    v-show="alone"
                >
                    <el-form-item label="推荐开通容量大小">
                        <el-button
                            type="warning"
                            plain
                            v-on:click="add_user_alert.value = 300"
                        >300GB</el-button>
                        <el-button
                            type="warning"
                            plain
                            v-on:click="add_user_alert.value = 500"
                        >500GB</el-button>
                        <el-button
                            type="warning"
                            plain
                            v-on:click="add_user_alert.value = 1000"
                        >1TB</el-button>
                    </el-form-item>
                    <el-form-item label="所属部门">
                        <el-select
                            v-model="add_user_alert.section"
                            placeholder="请选择需要添加的部门"
                        >
                            <el-option
                                v-for="item in options"
                                v-bind:key="item.value"
                                v-bind:label="item.label"
                                v-bind:value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="录入姓名">
                        <el-input
                            v-model="add_user_alert.name"
                            autocomplete="off"
                            name="add_name"
                        ></el-input>
                        <el-button v-on:click="convert_pinyin('alone')">生成拼音</el-button>
                    </el-form-item>
                    <el-form-item label="创建帐号">
                        <el-input v-model="add_user_alert.account"></el-input>
                    </el-form-item>
                    <el-form-item label="所属角色">
                        <el-radio-group v-model="add_user_alert.role">
                            <el-radio label="部门负责人"></el-radio>
                            <el-radio label="用户"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="开通容量大小">
                        <div style="width: 440px;margin-left: 106px;">
                            <div class="block">
                                <el-slider
                                    v-model="add_user_alert.value"
                                    :marks="add_user_alert.marks"
                                    v-bind:max="2048"
                                    show-input
                                >
                                </el-slider>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item style="margin-top: 40px">
                        <el-button
                            type="primary"
                            @click="add_only"
                        >立即创建</el-button>
                        <el-button v-on:click="dialog_one = false">取消</el-button>
                    </el-form-item>
                </el-form>
                <!-- 批量添加新用户 -->
                <el-form
                    :model="add_users_alert"
                    class="alert_add"
                    v-show="batch"
                >
                    <el-form-item label="推荐开通容量大小">
                        <el-button
                            type="warning"
                            plain
                            v-on:click="add_users_alert.value = 300"
                        >300GB</el-button>
                        <el-button
                            type="warning"
                            plain
                            v-on:click="add_users_alert.value = 500"
                        >500GB</el-button>
                        <el-button
                            type="warning"
                            plain
                            v-on:click="add_users_alert.value = 1000"
                        >1TB</el-button>
                    </el-form-item>
                    <el-form-item label="所属部门">
                        <el-select
                            v-model="add_users_alert.section"
                            placeholder="请选择需要添加的部门"
                        >
                            <el-option
                                v-for="item in options"
                                v-bind:key="item.value"
                                v-bind:label="item.label"
                                v-bind:value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="所属角色">
                        <el-radio-group v-model="add_users_alert.role">
                            <el-radio
                                label="部门负责人"
                                disabled
                            ></el-radio>
                            <el-radio label="用户"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item
                        label="开通容量大小"
                        style="margin-bottom: 34px"
                    >
                        <div style="width: 440px;margin-left: 106px;">
                            <div class="block">
                                <el-slider
                                    v-model="add_users_alert.value"
                                    :marks="add_users_alert.marks"
                                    v-bind:max="2000"
                                    show-input
                                >
                                </el-slider>
                            </div>
                        </div>
                    </el-form-item>

                    <div class="zx">
                        <template v-for="li in add_users_alert.add_list">
                            <div v-bind:key="li.list_index">
                                <el-form-item label="录入姓名">
                                    <el-input
                                        v-model="li.name"
                                        autocomplete="off"
                                        name="add_name"
                                    ></el-input>
                                    <el-button v-on:click="convert_pinyin('batch',true,li.list_index)">生成拼音</el-button>
                                </el-form-item>
                                <el-form-item label="创建帐号">
                                    <el-input v-model="li.account"></el-input>
                                    <el-button
                                        type="primary"
                                        icon="el-icon-user"
                                        circle
                                        v-on:click="alert_users_add_more()"
                                        style="float: right;margin-right: 20px"
                                        size='mini'
                                        v-show="add_uesrs_icon(add_users_alert.add_list,li)"
                                    ></el-button>
                                    <el-button
                                        type="danger"
                                        icon="el-icon-delete"
                                        circle
                                        size='mini'
                                        v-on:click="alert_users_dele_more(li.list_index)"
                                        style="float: right;margin-right: 20px"
                                    ></el-button>
                                </el-form-item>
                            </div>
                        </template>
                    </div>

                    <el-form-item style="margin-top: 40px">
                        <el-button
                            type="primary"
                            @click="add_more"
                        >立即创建</el-button>
                        <el-button v-on:click="dialog_one = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <!-- 操作 -->
            <el-dialog
                title="信息修改"
                :visible.sync="dialog_two"
                v-bind:append-to-body="true"
                width="600px"
            >
                <el-form :model="change_limit">
                    <el-form-item
                        label="账户："
                        label-width="130px"
                    >
                        <el-input
                            v-bind:value="change_limit.account"
                            style="width: 217px;"
                            disabled
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="当前分配额度："
                        label-width="130px"
                    >
                        <el-input
                            v-bind:value="change_limit.value"
                            style="width: 217px;"
                            disabled
                        >
                            <template slot="append">GB</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item
                        label="所属部门："
                        label-width="130px"
                    >
                        <el-select
                            v-model="change_limit.section"
                            placeholder="请选择需要添加的部门"
                        >
                            <el-option
                                v-for="item in options"
                                v-bind:key="item.value"
                                v-bind:label="item.label"
                                v-bind:value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="所属角色："
                        label-width="130px"
                    >
                        <el-radio-group v-model="change_limit.role">
                            <el-radio label="部门负责人"></el-radio>
                            <el-radio label="用户"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item
                        label="修改容量大小："
                        label-width="130px"
                    >
                    </el-form-item>
                    <el-form-item label="">
                        <div style="margin: 0px 46px 0px;">
                            <div class="block">
                                <el-slider
                                    v-model="change_limit.value"
                                    :marks="change_limit.marks"
                                    v-bind:max="2048"
                                    show-input
                                >
                                </el-slider>
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
                <div
                    slot="footer"
                    class="dialog-footer"
                >
                    <el-button
                        type="primary"
                        @click="edit_user"
                    >确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>

import pinyin from 'Pinyin'
import {
    table_initial,
    table_handle,
    batch_delect,
    add_user,
    add_users,
    edit_user
} from '@/api/api_base'

export default {
    name: 'user_management_info',
    data() {
        return {
            options: [],            //部门
            change_limit: {
                account: '',
                value: 0,
                role: '',
                section: '',
                marks: {
                    0: '0GB',
                    500: '0.5T',
                    1000: '1T',
                    1500: '1.5TB'
                }
            },
            call_back: false,       //回退键显示
            tab_selection: [],      //table选中项
            formInline: {
                user: '',           //用户名
                part: '',           //角色
                branch: '',         //部门
                limit: '',          //额度
            },
            tableData: [],          //当页数据
            table_info: {
                page_num: 10,       //当页n条数据
                data: 1,            //第n页
                data_all: 0,
            },
            add_user_alert: {
                type: '',
                section: '',
                name: '',
                account: '',
                role: '',
                value: 1,
                section: '',
                marks: {
                    0: '0GB',
                    500: '0.5T',
                    1000: '1T',
                    1500: '1.5TB'
                }
            },
            add_users_alert: {
                type: '',
                section: '',
                role: '用户',
                value: 1,
                section: '',
                marks: {
                    0: '0GB',
                    500: '0.5T',
                    1000: '1T',
                    1500: '1.5TB'
                },
                add_more_index: 0,                                          //批量添加的用户索引
                add_list: [{ list_index: 0, name: '', account: '' }],           //批量添加账户
            },
            dialog_one: false,
            dialog_two: false,
            alone: true,
            batch: false,
            alert_show: 'alone',
        }
    },
    methods: {
        //编辑用户
        edit_user() {
            edit_user({ 'data': this.change_limit })
                .then(data => {
                    this.$message({
                        message: '修改成功',
                        type: 'success',
                        center: true
                    })
                    this.dialog_two = false
                    this.load_again();
                })
                .catch(err => {
                    this.$message.error('修改失败')
                })
        },
        //操作按钮
        operate(r) {
            this.change_limit.account = r.account
            this.change_limit.role = r.position
            this.change_limit.section = r.department
            this.change_limit.value = parseInt(r.totalSpace)
            this.dialog_two = true
        },
        //单独添加新用户
        add_only() {
            let v = {
                account: this.add_user_alert.account,
                userName: this.add_user_alert.name,
                department: this.add_user_alert.section,
                position: this.add_user_alert.role,
                limitSpace: this.add_user_alert.value
            }
            add_user({ 'data': v })
                .then(data => {
                    if (data.data == 1) {
                        this.$message({
                            message: '添加成功',
                            type: 'success',
                            center: true
                        })
                        this.dialog_one = false
                        this.load_again();
                    } else if (data.data == 0) {
                        this.$message.error('该账号已存在,无法重复添加')
                    }
                })
                .catch(err => {

                })
        },
        //批量添加新用户
        add_more() {
            let v = {
                userlist: this.add_users_alert.add_list,
                department: this.add_users_alert.section,
                position: this.add_users_alert.role,
                limitSpace: this.add_users_alert.value
            }
            add_users({ 'data': v })
                .then(data => {
                    if (data.data == 1) {
                        this.$message({
                            message: '添加成功',
                            type: 'success',
                            center: true
                        })
                        this.dialog_one = false
                        this.load_again();
                    } else {
                        this.$alert(data.data.join(' , '), '重复账号', {
                            confirmButtonText: '确定',
                        });
                        this.$message.error('部分新建账号账号已存在,无法重复添加')
                        this.dialog_one = false
                    }
                })
                .catch(err => {

                })
        },
        //删除所选项
        delect_select() {
            if (this.tab_selection.length === 0) {
                this.$message({
                    type: 'warning',
                    message: '未选中数据',
                    center: true
                })
                return false
            }
            this.$confirm('此操作将永久删除所选数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let s = []
                this.tab_selection.forEach((currentVal) => {
                    s.push(currentVal.id)
                })
                batch_delect({ 'data': JSON.stringify(s) })
                    .then(data => {
                        this.$message({
                            message: '删除成功',
                            type: 'success',
                            center: true
                        })
                        if (this.call_back == true) {
                            let val_sea = `data=${this.table_info.data}&page_num=${this.table_info.page_num}&branch=${this.formInline.branch}&user_name=${this.formInline.user}&part=${this.formInline.part}&limit=${this.formInline.limit}`
                            table_handle(val_sea)
                                .then(data => {
                                    this.tableData = data.data[0]
                                    this.table_info.data_all = data.data[1]
                                    this.call_back = true
                                    this.load_again();
                                })
                        } else {
                            let val_sea = `data=1&page_num=${this.table_info.page_num}&branch=''&user_name=''&part=''&limit=''`
                            table_initial(val_sea)
                                .then(data => {
                                    this.tableData = data.data[0]
                                    this.table_info.data_all = data.data[1]
                                })
                        }
                    })
                    .catch(err => {
                    })
            })
        },
        //示例
        con() {
            console.log('suc')
        },
        //按照部门筛选表格
        branch_change() {
            if (this.formInline.branch == 'all') this.formInline.branch = ''
            let val_sea = `data=${this.table_info.data}&page_num=${this.table_info.page_num}&branch=${this.formInline.branch}&user_name=${this.formInline.user}&part=${this.formInline.part}&limit=${this.formInline.limit}`
            table_handle(val_sea)
                .then(data => {
                    this.tableData = data.data[0]
                    this.table_info.data_all = data.data[1]
                    if (this.formInline.branch != '') this.call_back = true

                })
        },
        //按照角色筛选表格
        part_change() {
            if (this.formInline.part == 'all') this.formInline.part = ''
            let val_sea = `data=${this.table_info.data}&page_num=${this.table_info.page_num}&branch=${this.formInline.branch}&user_name=${this.formInline.user}&part=${this.formInline.part}&limit=${this.formInline.limit}`
            table_handle(val_sea)
                .then(data => {
                    this.tableData = data.data[0]
                    this.table_info.data_all = data.data[1]
                    if (this.formInline.part != '') this.call_back = true
                })
        },
        //按照额度筛选表格
        limit_change() {
            if (this.formInline.limit == 'all') this.formInline.limit = ''
            let val_sea = `data=${this.table_info.data}&page_num=${this.table_info.page_num}&branch=${this.formInline.branch}&user_name=${this.formInline.user}&part=${this.formInline.part}&limit=${this.formInline.limit}`
            table_handle(val_sea)
                .then(data => {
                    this.tableData = data.data[0]
                    this.table_info.data_all = data.data[1]
                    if (this.formInline.limit != '') this.call_back = true
                })
        },
        //添加新用户 =》 批量添加 =》 添加新用户
        alert_users_add_more() {
            this.add_users_alert.add_more_index++
            this.add_users_alert.add_list.push({ list_index: this.add_users_alert.add_more_index, name: '', account: '' })
        },
        //添加新用户 =》 批量添加 =》 删除新用户
        alert_users_dele_more(c) {
            if (this.add_users_alert.add_list.length === 1) {
                this.$message({
                    type: 'error',
                    message: '仅存数据项不可删除',
                    center: true
                })
                return false
            }
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let k = this.add_users_alert.add_list.findIndex((currentVal, index, arr) => {
                    return c == currentVal.list_index
                })
                this.add_users_alert.add_list.splice(k, 1)
                this.$message({
                    type: 'success',
                    message: '删除成功!',
                    center: true
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                    center: true
                })
            })
        },
        //添加新用户 =》添加类型切换
        alert_cut(tab, event) {
            if (this[event.target.id.split('-')[1]] === false) {
                this.alone = !this.alone
                this.batch = !this.batch
            }
        },
        //转拼音
        convert_pinyin(z, h, g) {
            switch (z) {
                case 'alone':
                    this.add_user_alert.account = pinyin.getFullChars(this.add_user_alert.name)
                    break
            }
            if (h) {
                this.add_users_alert.add_list[g].account = pinyin.getFullChars(this.add_users_alert.add_list[g].name)
            }
        },
        //每页多少条数据
        handleSizeChange(val) {
            this.table_info.data = 1
            this.table_info.page_num = val
            let val_sea = `data=${this.table_info.data}&page_num=${this.table_info.page_num}&branch=${this.formInline.branch}&user_name=${this.formInline.user}&part=${this.formInline.part}&limit=${this.formInline.limit}`
            table_initial(val_sea)
                .then(data => {
                    this.tableData = data.data[0]
                    this.table_info.data_all = data.data[1]
                })
        },
        //翻到第几页
        handleCurrentChange(val) {
            this.table_info.data = val
            let val_sea = `data=${this.table_info.data}&page_num=${this.table_info.page_num}&branch=${this.formInline.branch}&user_name=${this.formInline.user}&part=${this.formInline.part}&limit=${this.formInline.limit}`
            table_initial(val_sea)
                .then(data => {
                    this.tableData = data.data[0]
                    this.table_info.data_all = data.data[1]
                })
        },
        //添加新用户 =》 批量添加 =》 添加按钮显示
        add_uesrs_icon(count, index) {
            if (count.length - 1 === [].indexOf.call(count, index)) {
                return true
            } else {
                return false
            }
        },
        //按名字搜索
        search_user() {
            let val_sea = `data=${this.table_info.data}&page_num=${this.table_info.page_num}&branch=${this.formInline.branch}&user_name=${this.formInline.user}&part=${this.formInline.part}&limit=${this.formInline.limit}`
            table_handle(val_sea)
                .then(data => {
                    this.tableData = data.data[0]
                    this.table_info.data_all = data.data[1]
                    this.call_back = true
                })
                .catch(err => {
                    console.log(`报错！！ ${err}`)
                })
        },
        //无附加条件渲染table
        load_again() {
            this.table_info.data = 1
            this.table_info.page_num = 10
            this.formInline.branch = ''
            this.formInline.user = ''
            this.formInline.part = ''
            this.formInline.limit = ''
            let val_sea = `data=1&page_num=10&branch=&user_name=&part=&limit=`
            table_initial(val_sea)
                .then(data => {
                    this.tableData = data.data[0]
                    this.table_info.data_all = data.data[1]
                    this.call_back = false
                })
        }
    },
    computed: {

    },
    watch: {
        formInline: {
            handler: function (val) {
                if (val.branch == '' && val.part == '') {
                    this.call_back = false
                }
            },
            deep: true
        }
    },
    created() {
        //无附加条件渲染table
        this.load_again()

        //获取部门
        const self_ = this
        Object.keys(JSON.parse(sessionStorage.getItem('employees'))).forEach(currentVal => {
            self_.options.push({
                'value': currentVal,
                'label': currentVal
            })
        })
    }
}
</script>

<style scoped lang="scss">
/* element样式修改 */
.el-form-item {
    margin-bottom: 8px;
}
.demo-form-inline {
    padding: 12px;
}
.el-pagination {
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 20px;
}

/* 自设置 */
.user_management_info {
    .wrapper {
        width: 1300px;
        margin: 0px auto;
        margin-bottom: 20px;
    }
}
.btn_box {
    display: inline-block;
    float: right;
    padding: 0px 10px 10px 10px;
}
.alert_add {
    padding: 0px 30px;
}
.alert_add .el-input {
    width: 218px;
}
.back {
    position: absolute;
    padding-left: 10px;
}
.zx {
    height: 231px;
    overflow-y: scroll;
}
.zx::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}
.zx::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(102, 89, 89, 0.2);
    background: #9e9797;
}
.zx::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(138, 129, 129, 0.2);
    border-radius: 10px;
    background: rgb(226, 221, 221);
}
@media screen and (max-width: 1400px) {
    .user_management_info {
        .wrapper {
            width: 99%;
        }
    }
}
// @media screen and (max-width: 1400px) {
//     .user_management_info {
//         // width: 99%;
//         .p {
//             display: block;
//             height: 12px;
//         }
//         .t {
//             margin: 0px !important;
//         }
//     }
// }
</style>


