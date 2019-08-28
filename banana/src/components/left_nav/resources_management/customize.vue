<template>
    <div class="customize">
        <div class="wrapper">
            <div v-show="main">
                <div class="fl">
                    <el-select
                        v-model="folder_"
                        placeholder="选择文件夹"
                    >
                        <el-option
                            v-for="item in folder_group"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                    <el-button @click="dialog = true">管理</el-button>
                    <el-button @click="toggleSelection">反选</el-button>
                    <el-button>删除</el-button>
                    <el-button @click="move_">移动至固定存放</el-button>
                    <el-button @click="main=false">回退</el-button>
                </div>
                <div class="line_">
                    <el-input
                        class="input_"
                        v-model="input_"
                        placeholder="文件名称检索"
                    ></el-input>
                    <el-button
                        class="s"
                        type="primary"
                        @click="enter()"
                    >搜索</el-button>
                </div>
                <div class="tab">
                    <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%"
                        ref="multipleTable"
                        @selection-change="handleSelectionChange"
                    >
                        <el-table-column
                            type="selection"
                            width="55"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="fileName"
                            label="文件名称"
                            width="300"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="fileType"
                            label="数据类型"
                            align="center"
                            width="140"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="fileSize"
                            label="数据大小"
                            align="center"
                            width="140"
                            sortable
                        >
                        </el-table-column>
                        <el-table-column
                            prop="fileTime"
                            label="上传时间"
                            align="center"
                            sortable
                        >
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="280"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <el-button
                                    @click="handleClick(scope.row)"
                                    type="text"
                                    size="small"
                                >预览</el-button>
                                <el-button
                                    type="text"
                                    size="small"
                                >下载</el-button>
                                <el-button
                                    type="text"
                                    size="small"
                                >打印</el-button>
                                <el-button
                                    type="text"
                                    size="small"
                                >分享至</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="o">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="current_page"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="page_size"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div
                v-show="!main"
                class="entrance"
            >
                <el-table
                    :data="folder_data"
                    border
                    style="width: 100%"
                >
                    <el-table-column
                        prop="customFolder"
                        label="文件夹名称"
                        width="180"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="folderSize"
                        label="数据大小"
                        width="170"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="创建时间"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="160"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-button
                                @click="enter_(scope.row.userName,scope.row.customFolder)"
                                type="text"
                                size="small"
                            >查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 弹窗 -->
        <el-dialog
            title="自定义文件夹管理"
            :visible.sync="dialog"
            width="800px"
        >
            <el-button @click="innersible = true">新建文件夹</el-button>
            <el-table
                :data="folder_data"
                stripe
                style="width: 100%"
            >
                <el-table-column
                    prop="customFolder"
                    label="文件夹名称"
                    width="220"
                >
                </el-table-column>
                <el-table-column
                    prop="folderSize"
                    label="数据大小"
                    width="120"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
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
                            @click="rename(scope.row)"
                            type="text"
                            size="small"
                        >改名</el-button>
                        <el-button
                            @click="view(scope.row)"
                            type="text"
                            size="small"
                        >查看</el-button>
                        <el-button
                            @click="empty(scope.row)"
                            type="text"
                            size="small"
                        >清空</el-button>
                        <el-button
                            @click="delete_(scope.row)"
                            type="text"
                            size="small"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 新建文件夹 -->
            <el-dialog
                width="440px"
                title="新建文件夹"
                :visible.sync="innersible"
                append-to-body
            >
                <el-input
                    placeholder="新文件夹名称"
                    style="width: 300px"
                    v-model="create_f"
                ></el-input>
                <el-button @click="create_fold">确认</el-button>
            </el-dialog>
            <!-- 改名 -->
            <el-dialog
                width="440px"
                title="改名"
                :visible.sync="rename_"
                append-to-body
            >
                <el-input
                    placeholder="新文件夹名称"
                    style="width: 300px"
                    v-model="rename_v"
                ></el-input>
                <el-button @click="remove_cc">确认</el-button>
            </el-dialog>
        </el-dialog>
    </div>
</template>

<script>

import {
    create_folder,
    customize_get,
    customize_tab,
    customize_rename,
    customize_view,
    customize_empty,
    customize_delete,
    move_data
} from '@/api/api_base'

export default {
    name: 'customize',
    data() {
        return {
            rename_v: '',
            rename_: false,
            input_: '',
            current_page: 1,
            page_size: 10,
            total: '',
            folder_data: [],
            main: false,
            create_f: '',
            innersible: false,
            // tableData_dialog: [{
            //     date: '2016-05-02',
            //     name: '王小虎',
            //     address: ''
            // }],
            dialog: false,
            folder_group: [
                {
                    value: '高歌',
                    label: '高歌'
                }
            ],
            folder_: '',
            tableData: [],
            user: '',
            name: '',
            r: '',
            multipleSelection: []
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //移动至固定存储
        move_() {
            if (this.multipleSelection.length == 0) {
                this.$message.error('未选中文件')
            } else {
                let t = {
                    'TL': 'fix',
                    'filePath': [],
                    'customFolder': ''
                }
                this.multipleSelection.forEach(current_ => {
                    t.filePath.push(current_.filePath)
                })
                move_data({ 'data': t })
                    .then(data => {
                        if (data.data == 1) {
                            this.$message({
                                message: '移动成功',
                                type: 'success'
                            })
                            this.enter()
                        }
                    })
            }
        },
        //改名
        remove_cc() {
            if (this.rename_v) {
                customize_rename({ 'OldfolderName': this.r.customFolder, 'NewfolderName': this.rename_v })
                    .then(data => {
                        if (data.data == 0) {
                            this.$message.error('修改失败')
                        } else if (data.data == 1) {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            })
                            this.rename_ = false
                            customize_get({ 'data': 'data' })
                                .then(data => {
                                    this.folder_data = data.data
                                })
                        }
                    })
            } else {
                this.$message.error('文件夹新名称未填写')
            }

        },
        rename(val) {
            this.rename_ = true
            this.r = val
        },
        //查看
        view() {

        },
        //清空
        empty(val) {
            customize_empty({ 'folderName': val.customFolder })
                .then(data => {
                    if (data.data == 1) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                    } else if (data.data == 0) {
                        this.$message.error('非空文件夹，无法删除')
                    }
                })
        },
        //删除
        delete_(val) {
            customize_delete({ 'folderName': val.customFolder })
                .then(data => {
                    if (data.data == 1) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                    } else if (data.data == 0) {
                        this.$message.error('非空文件夹，无法删除')
                    }
                })
        },
        handleSizeChange(v) {
            this.page_size = v
            this.enter()
        },
        handleCurrentChange(v) {
            this.current_page = v
            this.enter()
        },
        enter_(u, n) {
            this.user = u
            this.name = n
            this.enter()
        },
        //进入表格
        enter() {
            customize_tab({ 'data': { 'folderName': this.name, 'user': this.user, 'fileName': this.input_, 'page': this.current_page, 'limit': this.page_size } })
                .then(data => {
                    this.main = true
                    this.tableData = data.data.fileobject
                    this.total = data.data.total
                })
        },
        //新建文件夹
        create_fold() {
            if (!this.create_f) {
                this.$message.error('未输入文件夹名称')
                return false
            }
            create_folder({ 'data': this.create_f })
                .then(data => {
                    if (data.data == 1) {
                        this.$message({
                            message: '创建成功',
                            type: 'success'
                        })
                        this.innersible = false
                    } else if (data.data == 0) {
                        this.$message.error('文件夹名称重复，创建失败')
                    }
                    this.create_f = ''
                })
        },
        //反选
        toggleSelection() {
            var self_ = this
            this.tableData.forEach(row => {
                self_.$refs.multipleTable.toggleRowSelection(row);
            });
        },
    },
    created() {
        customize_get({ 'data': 'data' })
            .then(data => {
                this.folder_data = data.data
            })
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    width: 1300px;
    margin: 0px auto;
    .line_ {
        margin: 12px 0px;
        .input_ {
            width: 400px;
        }
    }
    .fl {
        float: right;
    }
    .o {
        text-align: center;
        margin: 32px;
    }
    .entrance {
        width: 940px;
        margin: 100px auto;
    }
}
</style>
