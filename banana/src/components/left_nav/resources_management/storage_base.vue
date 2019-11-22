<template>
    <div class="storage_base">
        <div class="wrapper">
            <div class="search_">
                <div class="line_">
                    <el-input
                        class="input_"
                        v-model="input_"
                        placeholder="文件名称检索"
                    ></el-input>
                    <el-button
                        class="s"
                        type="primary"
                        @click="filter_"
                    >搜索</el-button>
                    <span>数据类型：</span>
                    <el-select
                        v-model="file_type"
                        placeholder="请选择"
                        class="s"
                        @change="filter_"
                    >
                        <el-option
                            v-for="item in type_select"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                    <hr class="pp">
                    <span>文件大小：</span>
                    <el-select
                        v-model="file_volumn"
                        placeholder="请选择"
                        class="s"
                        @change="filter_"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="liner_">
                    <span>上传日期：</span>
                    <el-radio-group
                        v-model="radio"
                        @change="raido_change"
                        class="radio_class"
                    >
                        <el-radio label="thisWeek">本周</el-radio>
                        <el-radio label="thisMonth">本月</el-radio>
                        <el-radio label="">全部</el-radio>
                    </el-radio-group>
                    <el-date-picker
                        v-model="date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="daterange_change"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                </div>
                <div class="line_ f">
                    <el-button
                        @click="x"
                        v-if="move_btn"
                    >移动</el-button>
                    <el-button @click="toggleSelection">反选</el-button>
                    <el-button>删除</el-button>
                </div>
            </div>
            <div class="tab">
                <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    ref="multipleTable"
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
                        prop="fileColumn"
                        label="数据大小(MB)"
                        align="center"
                        width="140"
                        sortable
                    >
                    </el-table-column>
                    <el-table-column
                        prop="fileDate"
                        label="上传时间"
                        align="center"
                        width="160"
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
                        @current-change="get_data"
                        :current-page="page_"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="page_num"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total_data"
                    >
                    </el-pagination>
                </div>
            </div>
        </div>
        <!-- {{move_to}} -->
        <!-- 移动弹窗 -->
        <el-dialog
            title="移动至"
            :visible.sync="move_"
            width="420px"
        >
            <el-select
                v-model="move_to"
                placeholder="请选择"
            >
                <el-option-group
                    v-for="group in folder_class"
                    :key="group.label"
                    :label="group.label"
                >
                    <el-option
                        v-for="item in group.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-option-group>
            </el-select>
            <el-button
                style="margin-left: 40px;"
                @click="move_folder"
            >确认移动</el-button>
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
</template>

<script>

import {
    storage_base,
    move_data,
    share_file,
    file_pre,
    enterprise_download
} from '@/api/api_base'

export default {
    name: 'storage_base',
    data() {
        return {
            page_: 1,                                   //当前第几页
            page_num: 10,                               //当前每页显示多少
            total_data: 0,                            //数据总量
            move_btn: true,                             //展示移动按钮
            check_val: [],                              //多选 选中项
            date_: '',                                  //最终选中时间
            folder_class: [
                {
                    label: '默认文件夹',
                    options: []
                },
                {
                    label: '自定义文件夹',
                    options: [
                        {
                            value: 'example',
                            label: '示例'
                        }
                    ]
                }
            ],
            move_to: '',
            move_: false,
            date: '',
            radio: '',
            input_: '',
            file_type: '',
            file_volumn: 'unlimited',
            type_select: [
                {
                    value: '',
                    label: '全部'
                },
                {
                    value: 'ppt',
                    label: 'ppt'
                },
                {
                    value: 'pdf',
                    label: 'pdf'
                },
                {
                    value: 'word',
                    label: 'word'
                },
                {
                    value: 'excel',
                    label: 'excel'
                },
                {
                    value: 'HTML',
                    label: 'HTML'
                },
                {
                    value: 'exe',
                    label: 'exe'
                },
                {
                    value: 'jpg',
                    label: 'jpg'
                },
                {
                    value: 'png',
                    label: 'png'
                },
                {
                    value: 'psd',
                    label: 'psd'
                },
                {
                    value: '其他',
                    label: '其他'
                },
            ],
            options: [
                {
                    value: 'unlimited',
                    label: '不限'
                },
                {
                    value: '1Munder',
                    label: '1MB以下'
                },
                {
                    value: '150M',
                    label: '1MB - 50MB'
                },
                {
                    value: '50100M',
                    label: '50MB - 100MB'
                },
                {
                    value: '100500M',
                    label: '100MB - 500MB'
                },
                {
                    value: '5001G',
                    label: '500MB - 1GB'
                },
                {
                    value: '1Gabove',
                    label: '1GB以上'
                }
            ],
            tableData: [],
            TL: '',
            timeInterval: '',
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
            pdf_src: '',
            pdf_srcT: '',
            dialogVisible: false,
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
        //反选
        toggleSelection() {
            var self_ = this
            this.tableData.forEach(row => {
                self_.$refs.multipleTable.toggleRowSelection(row);
            });
        },
        //单选 关键字 筛选
        filter_() {
            this.page_ = 1
            this.get_data()
        },
        //当页显示多少数据
        handleSizeChange(val) {
            this.page_ = 1
            this.get_data()
        },
        //时间单选
        raido_change() {
            this.date_ = this.radio
            this.date = ''
            this.timeInterval = ''
            this.get_data()
        },
        //时间段选择
        daterange_change() {
            this.date_ = this.date[0] + ',' + this.date[1]
            this.timeInterval = this.date_
            this.radio = ''
            this.get_data()
        },
        //移动
        x() {
            if (this.check_val.length > 0) {
                this.move_ = true
            } else {
                this.$message.error('未选中文件')
            }

        },
        //多选 
        handleSelectionChange(val) {
            this.check_val = val
        },
        //获取数据
        get_data() {
            let t = {
                'fileName': this.input_,
                'dataType': this.file_type,
                'fileSize': this.file_volumn,
                // 'date': this.date_,
                'thisDate': this.radio,
                'timeInterval': this.timeInterval,
                'page': this.page_,
                'limit': this.page_num,
                'TL': this.TL

            }
            storage_base({ 'data': t })
                .then(data => {
                    this.total_data = data.data.total
                    this.tableData = []
                    data.data.fileobject.forEach(current_ => {
                        this.tableData.push({
                            fileName: current_.fileName,
                            fileType: current_.fileType,
                            fileColumn: current_.fileSize,
                            fileDate: current_.fileTime,
                            filePath: current_.filePath
                        })
                    })
                    this.folder_class[1].options = []
                    data.data.userCFolder.forEach(current_ => {
                        this.folder_class[1].options.push({
                            'value': current_.customFolder,
                            'label': current_.customFolder
                        })
                    })
                })
        },
        //移动至其它文件夹
        move_folder() {
            if (this.move_to == '') {
                this.$message.error('未选中文件夹')
                return false
            }
            let t = {
                'TL': '',
                'filePath': [],
                'customFolder': ''
            }
            if (this.move_to == 'temporary_storage') {
                t.TL = 'temp'
            } else if (this.move_to == 'fixed_storage') {
                t.TL = 'fix'
            } else {
                t.TL = 'custom',
                    t.customFolder = this.move_to
            }
            this.check_val.forEach(current_ => {
                t.filePath.push(current_.filePath)
            })
            move_data({ 'data': t })
                .then(data => {
                    if (data.data == 1) {
                        this.$message({
                            message: '移动成功',
                            type: 'success'
                        })
                        this.move_ = false
                        this.get_data()
                    }
                })
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
        $route: {
            handler: function () {
                let u = this.$route.query.data
                switch (u) {
                    case 'fixed_storage':
                        this.move_btn = true
                        this.folder_class[0].options = [{
                            value: 'temporary_storage',
                            label: '临时存储'
                        }]
                        this.TL = 'fix'
                        break
                    case 'temporary_storage':
                        this.move_btn = true
                        this.folder_class[0].options = [{
                            value: 'fixed_storage',
                            label: '固定存储'
                        }]
                        this.TL = 'temp'
                        break
                    case 'shared_documents':
                        this.move_btn = false
                        this.TL = 'public'
                }
                this.get_data()
            },
            deep: true,
            immediate: true
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
        this.get_data()
    }
}
</script>

<style lang="scss" scoped>
.storage_base {
    .wrapper {
        width: 1300px;
        margin: 0px auto;
        .pp {
            display: none;
        }
        .search_ {
            margin-top: 22px;
            .line_ {
                padding: 8px 0px;
                .input_ {
                    width: 300px;
                }
                .s {
                    margin-right: 22px;
                }
            }
            .liner_ {
                padding: 8px 0px;
            }
            .f {
                float: right;
                margin-top: -56px;
            }
        }
        .tab {
            margin-top: 22px;
            .o {
                text-align: center;
                margin: 32px;
            }
        }
        .radio_class {
            margin-right: 22px;
        }
    }
}
@media screen and (max-width: 1400px) {
    .storage_base {
        .wrapper {
            width: 99%;
            .pp {
                display: block;
                opacity: 0;
            }
            .liner_ {
                display: inline-block;
            }
            .f {
                float: none !important;
                margin-top: 0px !important;
            }
        }
    }
}
</style>
