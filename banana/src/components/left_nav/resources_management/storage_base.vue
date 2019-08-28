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
                <div class="line_ f">
                    <el-button
                        @click="x"
                        v-if="move_btn"
                    >移动</el-button>
                    <el-button @click="toggleSelection">反选</el-button>
                    <el-button>删除</el-button>
                </div>
                <div class="line_">
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

                <!-- <div class="line_">
                    
                </div> -->
                <!-- {{ check_val }} -->
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
                        label="数据大小"
                        align="center"
                        width="140"
                        sortable
                    >
                    </el-table-column>
                    <el-table-column
                        prop="fileDate"
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
            <el-button style="margin-left: 40px;" @click="move_folder">确认移动</el-button>
        </el-dialog>
    </div>
</template>

<script>

import {
    storage_base,
    move_data
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
        }
    },
    methods: {
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
        move_folder(){
            if(this.move_to == ''){
                this.$message.error('未选中文件夹')
                return false
            }
            let t = {
                'TL': '',
                'filePath': [],
                'customFolder': ''
            }
            if(this.move_to == 'temporary_storage'){
                t.TL = 'temp'
            }else if(this.move_to == 'fixed_storage'){
                t.TL = 'fix'
            }else{
                t.TL = 'custom',
                t.customFolder = this.move_to
            }
            this.check_val.forEach(current_ => {
                t.filePath.push(current_.filePath)
            })
            move_data({'data': t})
                .then(data => {
                    if(data.data == 1){
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
        $route: {
            handler: function () {
                let u = window.location.search
                switch (u) {
                    case '?data=fixed_storage':
                        this.move_btn = true
                        this.folder_class[0].options = [{
                            value: 'temporary_storage',
                            label: '临时存储'
                        }]
                        this.TL = 'fix'
                        break
                    case '?data=temporary_storage':
                        this.move_btn = true
                        this.folder_class[0].options = [{
                            value: 'fixed_storage',
                            label: '固定存储'
                        }]
                        this.TL = 'temp'
                        break
                    case '?data=shared_documents':
                        this.move_btn = false
                        this.TL = 'public'
                }
                this.get_data()
            },
            deep: true
        }
    },
    created() {
        switch (window.location.search) {
            case '?data=fixed_storage':
                this.move_btn = true
                this.folder_class[0].options = [{
                    value: 'temporary_storage',
                    label: '临时存储'
                }]
                this.TL = 'fix'
                break
            case '?data=temporary_storage':
                this.move_btn = true
                this.folder_class[0].options = [{
                    value: 'fixed_storage',
                    label: '固定存储'
                }]
                this.TL = 'temp'
                break
            case '?data=shared_documents':
                this.move_btn = false
                this.TL = 'public'
        }
        this.get_data()
    }
}
</script>

<style lang="scss" scoped>
.storage_base {
    .wrapper {
        width: 1300px;
        margin: 0px auto;
        .search_ {
            margin-top: 22px;
            .line_ {
                padding: 8px 0px;
                .input_ {
                    width: 300px;
                }
                .s {
                    // display: inline-block;
                    margin-right: 22px;
                }
            }
            .f {
                float: right;
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
</style>
