<template>
    <div class="customize">
        <div class="wrapper">
            <div v-show="main">
                <div class="fl">
                    <!-- <el-select
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
                    </el-select> -->
                    <el-button @click="dialog = true">
                        管理
                    </el-button>
                    <el-button @click="toggleSelection">
                        反选
                    </el-button>
                    <el-button>
                        删除
                    </el-button>
                    <el-button @click="move_">
                        移动至固定存放
                    </el-button>
                    <el-button @click="main=false">
                        回退
                    </el-button>
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
                            label="数据大小(MB)"
                            align="center"
                            width="140"
                            sortable
                        >
                        </el-table-column>
                        <el-table-column
                            prop="fileTime"
                            label="上传时间"
                            align="center"
                            width="200"
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
                                    @click="preview(scope.row)"
                                    type="text"
                                    size="small"
                                >预览</el-button>
                                <el-button
                                    @click="download_(scope.row)"
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
                                    @click="shareFn(scope.row)"
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
                <el-button
                    @click="dialog = true"
                    class="u"
                >管理</el-button>
                <el-table
                    :data="folder_data"
                    border
                    style="width: 100%"
                >
                    <el-table-column
                        prop="customFolder"
                        label="文件夹名称"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="folderSize"
                        label="数据大小(MB)"
                        width="170"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="创建时间"
                        width="200"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="200"
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
                            @click="enter_(scope.row.userName,scope.row.customFolder)"
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
        <!-- 预览弹出框 -->
        <el-dialog
            title="文件预览"
            :visible.sync="dialogVisible"
            width="90%"
            :before-close="pdf_src = null"
        >
            <iframe
                :src='pdf_src'
                width='100%'
                height='400'
                frameborder='1'
                v-if="pdf"
            >
            </iframe>
        </el-dialog>
        <el-dialog
            title="文件分享"
            :visible.sync="dialogShare"
            width="700px"
            :before-close="shareClose"
        >
            <span>
                部门：
            </span>
            <el-select
                v-model="depart_"
                placeholder="请选择部门"
                class="p"
            >
                <el-option
                    v-for="item in de_"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
            <span>
                用户：
            </span>
            <el-select
                v-model="user_"
                placeholder="请选择"
            >
                <el-option
                    v-for="item in options_"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
            <el-button
                type="primary"
                @click="selectUser"
            >确定</el-button>
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
    move_data,
    share_file,
    file_pre,
    enterprise_download
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
            multipleSelection: [],
            shareData: {
                fileName: '',
                filePath: '',
                userName: ''
            },
            dialogShare: false,
            depart_: '',
            options_: [],
            de_: [],
            user_: '',
            pdf: false,
            pdf_src: '',
            pdf_srcO: '/static/pdf/web/viewer.html?file=',
            pdf_srcT: '',
            dialogVisible: false,
            dia_type: null,
            dia: {
                _img: '',
                _mp4: '',
            },
        }
    },
    methods: {
        //下载
        download_() {
            this.loading = true
            let p = arguments[0],
                name_ = p.fileName,
                path_ = p.filePath,
                self_ = this,
                http_ = null
            if (window.XMLHttpRequest) {
                http_ = new XMLHttpRequest()
            } else {
                http_ = new ActiveXObject('Microsoft.XMLHttp')
            }
            switch (name_.split('.')[1]) {
                case 'jpg':
                case 'png':
                case 'gif':
                case 'xlsx':
                case 'docx':
                case 'ppt':
                case 'pdf':
                case 'mp3':
                case 'mp4':
                    http_.open('GET', `/company/enterpriseFile_download_address.do?name=${name_}&path=${path_}`)
                    break
                case 'txt':
                case 'xml':
                case 'json':
                case 'java':
                    http_.open('GET', `/company/enterpriseFile_download_IO.do?name=${name_}&path=${path_}`)
                    break
            }
            http_.setRequestHeader('token', sessionStorage.getItem('logIn'))
            http_.send()
            http_.onreadystatechange = function () {
                if (http_.readyState == 4) {
                    if (http_.status == 200) {
                        switch (name_.split('.')[1]) {
                            case 'jpg':
                            case 'png':
                            case 'gif':
                            case 'xlsx':
                            case 'docx':
                            case 'ppt':
                            case 'pdf':
                            case 'mp3':
                            case 'mp4':
                                const a = document.createElement('a')
                                a.style.display = 'none'
                                a.download = name_
                                a.href = JSON.parse(http_.responseText)
                                a.target = '_blank'
                                a.rel = 'noopener noreferrer'
                                document.getElementsByClassName('wrapper')[0].append(a)
                                a.click()
                                self_.loading = false
                                break
                            case 'txt':
                            case 'xml':
                            case 'json':
                            case 'java':
                                var blob = new Blob([http_.responseText], { 'type': 'application/octet-stream;charset=UTF-8' }),
                                    fileName = p.fileName
                                downFile(blob, fileName)
                                break
                        }
                    }
                }
            }
            function downFile(blob, fileName) {
                if (window.navigator.msSaveOrOpenBlob) {
                    navigator.msSaveBlob(blob, fileName);
                } else {
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = fileName;
                    link.click();
                    window.URL.revokeObjectURL(link.href);
                }
                self_.loading = false
            }

        },
        // 文件分享
        selectUser() {
            this.shareData.userName = this.user_
            share_file({ 'data': this.shareData })
                .then(data => {
                    this.$message({
                        message: '分享成功',
                        type: 'success'
                    })
                    this.shareClose()
                })
        },
        // 文件分享按钮点击
        shareFn(r) {
            this.shareData.fileName = r.fileName
            this.shareData.filePath = r.filePath
            this.dialogShare = true
        },
        // 关闭分享窗口
        shareClose() {
            this.shareData.fileName = ''
            this.shareData.filePath = ''
            this.shareData.userName = ''
            this.user_ = ''
            this.depart_ = ''
            this.dialogShare = false
        },
        //预览
        preview() {
            let p = arguments[0],
                type_ = p.fileType,       //文件类型
                name_ = p.fileName,       //文件名
                path_ = p.filePath,       //文件地址
                self_ = this
            file_pre({ 'name': name_, 'path': path_ })
                .then(data => {
                    self_.pdf_src = data.data
                    self_.dialogVisible = true
                    self_.pdf = true
                })
                .catch(err => {
                })
        },
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
                            this.initial()
                        }
                    })
            } else {
                this.$message.error('文件夹新名称未填写')
            }

        },
        // 初始
        initial() {
            customize_get({ 'data': 'data' })
                .then(data => {
                    this.folder_data = data.data
                })
        },
        rename(val) {
            this.rename_ = true
            this.r = val
        },
        //清空
        empty(val) {
            customize_empty({ 'folderName': val.customFolder })
                .then(data => {
                    if (data.data == 1) {
                        this.$message({
                            message: '清空成功',
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
                        this.initial()
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
                    this.dialog = false
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
                        this.initial()

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
    watch: {
        depart_(newVal, oldVal) {
            this.user_ = ''
            this.options_ = []
            let self_ = this
            self_.all_[newVal].forEach(currentVal_ => {
                self_.options_.push({
                    label: currentVal_.userName,
                    value: currentVal_.account,
                })
            })
        },
    },
    created() {
        this.all_ = JSON.parse(sessionStorage.getItem('employees'))
        let t = JSON.parse(sessionStorage.getItem('employees')),
            self_ = this
        Object.keys(t).forEach(current_ => {
            self_.de_.push({
                value: current_,
                label: current_
            })
        })
        this.initial()
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    width: 1300px;
    margin: 0px auto;
    .line_ {
        float: left;
        margin: 12px;
        .input_ {
            width: 400px;
        }
    }
    .fl {
        float: right;
        margin: 12px;
    }
    .o {
        text-align: center;
        margin: 32px;
    }
    .entrance {
        margin: 100px auto;
    }
    .u {
        margin: 8px 0px;
    }
}
@media screen and (max-width: 1470px) {
    .customize {
        .wrapper {
            width: 99%;
        }
    }
}
@media screen and (max-width: 1180px) {
    .customize {
        .wrapper {
            .fl {
                float: left;
            }
            .line_ {
                margin-top: 0px;
            }
        }
    }
}
</style>
