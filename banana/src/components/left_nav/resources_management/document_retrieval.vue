<template>
    <div class="document_retrieval">
        <div class="wrapper">
            <div class="nav">
                <div class="line_">
                    <el-input
                        v-model="input_"
                        placeholder="文件名称检索"
                        class="input_"
                    ></el-input>
                    <el-button
                        @click="catch_data()"
                        type="primary"
                    >搜索 </el-button>
                </div>
                <div class="check_">
                    <el-checkbox
                        :indeterminate="isIndeterminate"
                        v-model="checkAll"
                        @change="handleCheckAllChange"
                        class="checkb_"
                    >全选</el-checkbox>
                    <el-checkbox-group
                        v-model="checkedCities"
                        @change="handleCheckedCitiesChange"
                        class="checkb_"
                    >
                        <el-checkbox
                            v-for="li_ in cities"
                            :label="li_"
                            :key="li_"
                        >{{ li_ }}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class="tab">
                    <el-table
                        :data="tableData"
                        v-loading.fullscreen.lock="loading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        stripe
                        style="width: 100%"
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
                            show-overflow-tooltip
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
                            :current-page="page_"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="num_"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="len_"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
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
    retrieval_obtain,
    share_file,
    file_pre,
    enterprise_download
} from '@/api/api_base'

export default {
    name: 'document_retrieval',
    data() {
        return {
            input_: "",                          //文件名称检索
            checkAll: false,
            checkedCities: [],                   //文件类别
            isIndeterminate: true,
            cities: [
                'WORD',
                'EXCEL',
                'PPT',
                'PNG',
                'JPG',
                'PSD',
                'PDF',
                'TXT',
                'MP4',
                'HTML',
                'EXE',
                '其它',

            ],
            tableData: [],
            len_: 0,                             //数据总数
            page_: 1,                              //当前第几页
            num_: 10,                              //当前页多少条数据  
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
            this.dialogShare = false
            this.user_ = ''
            this.depart_ = ''
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
        handleSizeChange(val) {
            this.num_ = val
            this.catch_data()
        },
        handleCurrentChange(val) {
            this.page_ = val
            this.catch_data()
        },
        handleCheckAllChange(val) {
            this.checkedCities = val ? this.cities : [];
            this.isIndeterminate = false;
            this.catch_data()
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            this.catch_data()
        },
        catch_data() {
            let t = {
                keyWord: this.input_,
                fileType: this.checkedCities,
                page: this.page_,
                num: this.num_
            }
            retrieval_obtain({ 'data': t })
                .then(data => {
                    this.tableData = data.data[0]
                    this.len_ = data.data[1]
                })
        }
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
        this.catch_data()
    }
}
</script>

<style lang="scss" scoped>
.document_retrieval {
    .wrapper {
        width: 1300px;
        margin: 0px auto;
        .nav {
            .line_ {
                margin: 12px 0px;
                .input_ {
                    width: 320px;
                }
            }
            .check_ {
                margin: 24px 0px;
            }
        }
        .tab {
            margin-top: 22px;
            .o {
                text-align: center;
                margin: 20px;
            }
        }
    }
}
.checkb_ {
    display: inline-block;
}
@media screen and (max-width: 1400px) {
    .document_retrieval {
        .wrapper {
            width: 99%;
        }
        .checkb_ {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            /deep/.el-checkbox {
                margin: 15px;
            }
            /deep/.el-checkbox-group {
                /deep/.el-checkbox {
                    margin: 15px;
                }
            }
        }
    }
}
</style>
