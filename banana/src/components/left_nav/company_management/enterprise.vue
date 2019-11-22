<template>
    <div class="enterprise">
        <div class="wrapper">
            <div class="filter">
                <el-input
                    v-model="fileName"
                    placeholder="文件名称"
                    class="search_"
                >
                </el-input>
                <el-button
                    type="primary"
                    v-on:click="cr_"
                >搜索</el-button>
                <label
                    for="type_"
                    class="type_"
                >数据类型</label>
                <el-select
                    id="type_"
                    v-model="fileDataType"
                    @change="cr_"
                >
                    <el-option
                        v-for="item in type_all"
                        :key="item.val"
                        :label="item.label"
                        :value="item.val"
                    >
                    </el-option>
                </el-select>
                <p class="pp"></p>
                <label
                    for="date_"
                    class="type_ t"
                >上传日期</label>
                <el-radio-group
                    v-model="date_"
                    id="date_"
                    @change="cr_"
                >
                    <el-radio label="thisWeek">本周</el-radio>
                    <el-radio label="thisMonth">本月</el-radio>
                    <el-radio label="">全部</el-radio>
                </el-radio-group>
                <el-date-picker
                    v-model="timeInterval"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    class="date_interval"
                    align="right"
                    @change="time_"
                >
                </el-date-picker>
            </div>
            <div class="tab_">
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    v-loading.fullscreen.lock="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                >
                    <el-table-column
                        fixed="left"
                        prop="fileName"
                        label="文件名称"
                        show-overflow-tooltip
                    >
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
                        width="120"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="fileTime"
                        label="上传时间"
                        align="center"
                        width="220"
                    >
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="240"
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
                            >分享</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    class="page_"
                >
                </el-pagination>
            </div>
        </div>
        <!-- 预览弹出框 -->
        <el-dialog
            title="文件预览"
            :visible.sync="dialogVisible"
            width="90%"
            top="3%"
            @closed="pdf_src = null"
        >
            <iframe
                :src='pdf_src'
                width='100%'
                height='600'
                frameborder='1'
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
    data_enterprise,
    file_pre,
    enterprise_download,
    share_file
} from '@/api/api_base'
import { mapState } from 'vuex'

export default {
    name: 'enterprise',
    data() {
        return {
            depart_: '',
            user_: '',
            de_: [],
            options_: [],
            dialogShare: false,
            loading: false,
            pdf_src: '',
            // pdf_srcO: '/static/pdf/web/viewer.html? ',
            dialogVisible: false,
            total: 10,
            limit: 10,
            page: 1,
            fileName: '',
            fileDataType: '',
            date_: '',
            timeInterval: '',
            tableData: [],
            dia_type: null,
            dia: {
                _img: '',
                _mp4: '',
            },
            shareData: {
                fileName: '',
                filePath: '',
                userName: ''
            }
        }
    },
    computed: {
        ...mapState(['type_all'])
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
    methods: {
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
            this.dialogShare = false
        },
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
        //预览
        preview() {
            let p = arguments[0],
                type_ = p.fileType,       //文件类型
                name_ = p.fileName,       //文件名
                path_ = p.filePath,       //文件地址
                self_ = this
            file_pre({ 'name': name_, 'path': path_ })
                .then(data => {
                    self_.dialogVisible = true
                    self_.pdf_src = data.data
                    console.log(self_)

                })
                .catch(err => {

                })
        },
        //当页显示几条数据
        handleSizeChange(n) {
            this.limit = n
            this.cr_()
        },
        handleCurrentChange(n) {
            this.page = n
            this.cr_()
        },
        time_() {
            let t = this.timeInterval[0] + ',' + this.timeInterval[1]
            this.timeInterval = t
            this.cr_()
        },
        cr_() {
            let t = {
                'total': this.total,
                'limit': this.limit,
                'page': this.page,
                'fileName': this.fileName,
                'fileDataType': this.fileDataType == 'all' ? '' : this.fileDataType,
                'thisDate': this.date_,
                'timeInterval': this.timeInterval
            }
            data_enterprise({ 'data': t })
                .then(data => {
                    this.total = data.data.total
                    this.tableData = data.data.fileobject
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
        this.cr_()
    }
}
</script>

<style lang="scss" scoped>
.enterprise {
    height: calc(100% - 52px);
    .wrapper {
        margin: 0px auto;
        width: 1300px;
        min-height: 100%;
        // border: 1px solid tomato;
        .filter {
            margin: 12px 0px;
            .search_ {
                width: 220px;
            }
            .type_ {
                margin: 0px 10px 0px 20px;
            }
        }
        .tab_ {
            .page_ {
                text-align: center;
                padding: 20px 0px;
            }
        }
    }
    .alert_c {
        max-width: 100%;
        max-height: 600px;
        margin: 0px auto;
        display: block;
    }
    .pp {
        display: none;
    }
}
body {
    margin: 0;
}
@media screen and (max-width: 1400px) {
    .enterprise {
        .wrapper {
            width: 99%;
        }
        .pp {
            display: block;
            height: 12px;
        }
        .t {
            margin: 0px !important;
        }
    }
}
</style>
