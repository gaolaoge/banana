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
                <!-- <a :href="xx">wenjian</a> -->
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
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
                <label
                    for="date_"
                    class="type_"
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
                >
                    <el-table-column
                        fixed="left"
                        prop="fileName"
                        label="文件名称"
                        width="300"
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
                        label="数据大小"
                        width="120"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="fileTime"
                        label="上传时间"
                        align="center"
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
            width="30%"
            :before-close="path_t = null"
        >
            <img
                :src="dia._img"
                alt=""
                v-if="dia_type == 'img'"
                class="alert_c"
            >
            <video
                :src="dia._mp4"
                controls="controls"
                v-if="dia_type == 'mp4'"
                class="alert_c"
            >
                您的浏览器不支持 video 标签。
            </video>
        </el-dialog>
    </div>
</template>

<script>

import {
    data_enterprise,
    file_pre,
    e_file_download} from '@/api/api_base'

export default {
    name: 'enterprise',
    data() {
        return {
            // xx: '',
            dialogVisible: false,
            total: 10,
            limit: 10,
            page: 1,
            fileName: '',
            fileDataType: '',
            date_: '',
            options: [
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
            timeInterval: '',
            tableData: [],
            dia_type: null,
            dia: {
                _img: '',
                _mp4: '',
            },
            path_t: null,
        }
    },
    methods: {
        //下载
        download_() {
            let p = arguments[0],
                name_ = p.fileName,
                path_ = p.filePath,
                self_ = this
            // e_file_download({'name': name_,'path': path_})
            //     .then(data => {
            //         var binaryData = [],
            //             t;
            //         binaryData.push(data.data);
            //         t = window.URL.createObjectURL(new Blob(binaryData, { type: "application/zip" }));

            //         const a = document.createElement('a')
            //         a.style.display = 'none'
            //         a.download = '<文件名>'
            //         a.href = t
            //         a.click()
            //         document.body.removeChild(a)
            //     })
            this.$axios.get(`${this.wangqiang}/company/enterpriseFile_download.do`,{
                params: {
                    'name': name_,
                    'path': path_
                }
            })
                .then(data => {
                    // console.log(data)
                    var binaryData = [],
                        t;
                    binaryData.push(data.data);
                    t = window.URL.createObjectURL(new Blob(binaryData, { type: "application/zip" }));

                    const a = document.createElement('a')
                    a.style.display = 'none'
                    a.download = '<文件名>'
                    a.href = t
                    a.click()
                    document.body.removeChild(a)
                })
        },
        //预览
        preview() {
            let p = arguments[0],
                type_ = p.fileType,       //文件类型
                name_ = p.fileName,       //文件名
                path_ = p.filePath,       //文件地址
                self_ = this
            this.path_t = null            //文件预览地址
            // console.log({'name': name_,'path': path_})
            file_pre({ 'name': name_, 'path': path_ })
                .then(data => {
                    console.log(data)
                    self_.path_t = data.data
                    f()
                })
                .catch(err => {

                })
            function f() {
                switch (type_) {
                    case 'jpg':
                    case 'png':
                        self_.dia_type = 'img'
                        self_.dia._img = self_.path_t
                        break
                    case 'mp4':
                        self_.dia_type = 'mp4'
                        self_.dia._mp4 = self_.path_t
                        break
                }
            }
            this.dialogVisible = true

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
                'fileDataType': this.fileDataType,
                'thisDate': this.date_,
                'timeInterval': this.timeInterval
            }
            data_enterprise({ 'data': t })
                .then(data => {
                    // console.log(data.data.fileobject)
                    // console.log(JSON.parse(data.data))
                    this.total = data.data.total
                    this.tableData = data.data.fileobject
                })
        }
    },
    created() {
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
            .date_interval {
                float: right;
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
}
</style>
