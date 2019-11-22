<template>
    <div class="fixedSee">
        <div class="wrapper">
            <div class="searchBox">
                <el-input
                    placeholder="请输入关键字,例如:女"
                    v-model="searchInput"
                    class="input-with-select"
                >
                    <el-button
                        slot="append"
                        @click="search()"
                    >搜索</el-button>
                </el-input>
            </div>
            <div class="buttonBox">
                <el-button @click="move()">返回</el-button>
                <el-button @click="allElection(tableData)">全选</el-button>
                <el-button @click="reverseElection(tableData)">反选</el-button>
                <el-button @click="deleteElection(tableChecked)">删除</el-button>
            </div>
            <div class="tableBox">
                <el-table
                    ref="multipleTable"
                    border
                    empty-text="暂无数据"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    v-loading.fullscreen.lock="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                >
                    <el-table-column
                        type="selection"
                        width="55"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="文件名称"
                        align="center"
                        show-overflow-tooltip
                    >
                        <template slot-scope="scope">
                            {{ scope.row.fileName }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="fileType"
                        label="数据类型"
                        width="120"
                        align="center"
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
                        sortable
                        width="190"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="happen"
                        label="操作"
                        align="center"
                        width="250"
                    >
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="text"
                                @click="preview(scope.row)"
                            >预览</el-button>
                            <el-button
                                size="mini"
                                type="text"
                                @click="download_(scope.row)"
                            >下载</el-button>
                            <el-button
                                size="mini"
                                type="text"
                                @click="printing(scope.row)"
                            >打印</el-button>
                            <el-button
                                size="mini"
                                type="text"
                                @click="share(scope.row)"
                            >分享至</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page="page"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    class="pa_"
                >
                </el-pagination>
                <el-dialog
                    title=""
                    :visible.sync="dialogFormVisible"
                    @closed="pdf_src = null"
                >
                    <iframe
                        :src='pdf_src'
                        width='100%'
                        height='600'
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
        </div>
    </div>
</template>

<script>
import {
    enterpriseFile_preview,             //预览
    enterpriseFile_download,            //下载
    storageM_showPublicDetials,         //获取共享文件查看页面列表
    storageM_showCustomDetials,         //获取自定义文件查看页面列表
    storageM_showFileDetials            //获取固定存储、临时存放文件查看页面列表
} from '@/api/api_base_S'
import {
    share_file
} from '@/api/api_base'

export default {
    name: 'fixedSee',
    data() {
        return {
            folder_class: [{
                label: '默认文件夹',
                options: [
                    {
                        value: 'fixed_storage',
                        label: '固定存储'
                    }
                ]
            }, {
                label: '自定义文件夹',
                options: [
                    {
                        value: 'example',
                        label: '示例'
                    }
                ]
            }],
            move_: false,
            move_to: '',
            searchInput: '',             //声明搜索框
            currentPage: 1,              //声明分页，并默认为第一页
            total: 0,                   //默认数据总数	
            pagesize: 10,                //每页的数据
            page: 1,
            allSelect: false,            //全选
            tableChecked: [],            //表格中被选中删除的数据组
            dialogFormVisible: false,   //弹窗开关
            dialogShare: false,         //分享弹窗
            tableData: [],
            dataBox: '',                 //预览时选中行数据  
            de_: [],
            path_t: null,
            pdf_src: '',
            pdf: false,
            loading: false,
            shareData: {
                fileName: '',
                filePath: '',
                userName: ''
            },
            depart_: '',
            user_: '',
            options_: [],
        }
    },
    mounted() {
        if (this.$route.params.TL == 'fix' || this.$route.params.TL == 'temp') {//判断存放方式调取不同接口
            storageM_showFileDetials({
                'data': { //获取固定存储查看全部列表
                    'TL': this.$route.params.TL,
                    'fileName': this.$route.params.fileName,
                    'department': this.$route.params.department,
                    'fileDataType': this.$route.params.fileDataType,
                    'thisDate': this.$route.params.thisDate,
                    'timeInterval': this.$route.params.timeInterval,
                    'page': this.page,
                    'limit': this.pagesize,
                }
            })
                .then(data => {
                    this.total = data.data.fileobject.length;
                    this.tableData = data.data.fileobject;
                })

        } else if (this.$route.params.TL == 'custom') {
            storageM_showCustomDetials({
                'data': { //获取自定义文件查看全部列表
                    'folderName': this.$route.params.folderName,
                    'department': this.$route.params.department,
                    'fileName': '',
                    'user': this.$route.params.user,
                    'page': this.page,
                    'limit': this.pagesize,
                }
            })
                .then(data => {
                    this.total = data.data.fileobject.length;
                    this.tableData = data.data.fileobject;
                })

        } else {
            storageM_showPublicDetials({
                'data': { //获取自定义文件查看全部列表
                    'department': this.$route.params.department || sessionStorage.getItem('department_name'),
                    'fileName': '',
                    'page': this.page,
                    'limit': this.pagesize,
                }
            })
                .then(data => {
                    console.log(data)
                    this.total = data.data.fileobject.length;
                    this.tableData = data.data.fileobject;
                })
        }
    },
    methods: {//存放事件函数
        search() {//搜索事件
            if (this.$route.params.TL == 'fix' || this.$route.params.TL == 'temp') {
                storageM_showFileDetials({
                    'data': { //获取固定存储查看全部列表
                        'TL': this.$route.params.TL,
                        'fileName': this.searchInput,
                        'department': this.$route.params.department,
                        'fileDataType': this.$route.params.fileDataType,
                        'thisDate': this.$route.params.thisDate,
                        'timeInterval': this.$route.params.timeInterval,
                        'page': this.page,
                        'limit': this.pagesize,
                    }
                })
                    .then(data => {
                        this.total = data.data.fileobject.length;
                        this.tableData = data.data.fileobject;
                    })
            } else if (this.$route.params.TL == 'custom') {
                storageM_showCustomDetials({
                    'data': { //获取自定义文件搜索列表
                        'folderName': this.$route.params.folderName,
                        'department': this.$route.params.department,
                        'fileName': this.searchInput,
                        'user': this.$route.params.user,
                        'page': this.page,
                        'limit': this.pagesize,
                    }
                })
                    .then(data => {
                        this.total = data.data.fileobject.length;
                        this.tableData = data.data.fileobject;
                    })
            } else {
                storageM_showPublicDetials({
                    'data': { //获取自定义文件搜索列表
                        'department': this.$route.params.department,
                        'fileName': this.searchInput,
                        'page': this.page,
                        'limit': this.pagesize,
                    }
                })
                    .then(data => {
                        this.total = data.data.fileobject.length;
                        this.tableData = data.data.fileobject;
                    })
            }
        },
        move() {//移动
            this.$router.go(-1);
        },
        allElection(rows) {//全选事件
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row, !this.allSelect)
                })
                this.allSelect = !this.allSelect
            }
        },
        reverseElection(rows) {//反选事件
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row, !this.allSelect)
                })
                this.allSelect = !this.allSelect
            }
        },
        deleteElection(val) {//删除事件
            console.log(val);
        },
        handleSelectionChange(val) {//表格选中状态改变事件
            this.tableChecked = val
        },
        handleSizeChange() {//pageSize 改变时会触发
            this.pagesize = size;
        },
        handleCurrentChange() {//currentPage 改变时会触发
            this.currentPage = currentPage;
        },
        preview(data) {//预览
            this.dataBox = data;
            let self_ = this
            enterpriseFile_preview({ 'name': data.fileName, 'path': data.filePath })
                .then(data => {
                    self_.pdf_src = data.data
                    this.dialogFormVisible = true;
                    self_.pdf = true
                })
                .catch(err => {
                    this.$message({
                        type: 'info',
                        message: '服务端异常，请稍后再试!'
                    });
                })
        },
        download_(r) {
            this.loading = true
            let p = arguments[0],
                name_ = p.fileName,
                path_ = p.filePath,
                self_ = this,
                http_ = null
            console.log(p)
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
                    http_.open('GET', `/company/enterpriseFile_download_address.do?name=${name_}&path=${path_}&id=${new Date().getTime()}`)
                    break
                case 'txt':
                case 'xml':
                case 'json':
                case 'java':
                    http_.open('GET', `/company/enterpriseFile_download_IO.do?name=${name_}&path=${path_}&id=${new Date().getTime()}`)
                    break
            }
            http_.setRequestHeader('token', sessionStorage.getItem('logIn'))
            http_.send()
            http_.onreadystatechange = function () {
                if (http_.readyState == 4) {
                    if (http_.status == 200 || http_.status == 304) {
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
        printing() {//打印
            this.dialogFormVisible = false;//关闭预览
        },
        share(r) {//分享
            this.shareData.fileName = r.fileName
            this.shareData.filePath = r.filePath
            this.dialogShare = true
        },
        // 文件分享
        selectUser() {
            this.shareData.userName = this.user_
            share_file({ 'data': this.shareData })
                .then(data => {
                    this.shareClose()
                    this.$message({
                        message: '分享成功',
                        type: 'success'
                    })
                })
        },
        // 关闭分享窗口
        shareClose() {
            this.shareData.fileName = ''
            this.shareData.filePath = ''
            this.shareData.userName = ''
            this.dialogShare = false
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
        }
    },
}
</script>

<style lang="scss" scoped>
.fixedSee {
    height: calc(100% - 50px);
    .wrapper {
        width: 1300px;
        margin: 0px auto;
        .searchBox {
            width: 400px;
            margin: 20px auto;
        }
        .buttonBox {
            margin: 0 auto;
            text-align: right;
            .el-button:nth-of-type(1) {
                float: left;
            }
        }
        .tableBox {
            margin: 20px auto;
        }
        .pa_ {
            text-align: center;
            padding: 10px;
        }
        .dialogContent {
            width: 600px;
            height: 300px;
            margin: 0 auto;
            border: 1px solid #c0c0c0;
            overflow: auto;
            .aaa {
                width: 800px;
                height: 400px;
            }
        }
    }
}
@media screen and (max-width: 1490px) {
    .fixedSee {
        .wrapper {
            width: 99%;
        }
    }
}
</style>
