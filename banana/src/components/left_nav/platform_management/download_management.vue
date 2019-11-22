<template>
    <div class="download_management">
        <div class="wrapper">
            <div class="filter">
                <label for="type_f">数据类型</label>
                <el-select
                    v-model="type_f"
                    id="type_f"
                    class="s"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <label for="type_d">部门</label>
                <el-select
                    v-model="type_d"
                    id="type_d"
                    class="s"
                >
                    <el-option
                        v-for="item in options_department"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name"
                    ></el-option>
                </el-select>
                <el-button
                    class="v"
                    @click="generate()"
                >生成图表</el-button>
            </div>
            <div class="pic">
                <div class="pic_n">
                    <el-select
                        v-model="data_date"
                        placeholder="数据范围"
                        class="inline_"
                    >
                        <el-option
                            v-for="item in data_dates"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-date-picker
                        v-model="timeInterval"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="center"
                        @change="time_"
                    >
                    </el-date-picker>
                    <div style="float: right; margin-right: 12px;">
                        <el-button
                            :class="{'primary': !showMore}"
                            @click="showMore = false"
                        >柱状图</el-button>
                        <el-button
                            :class="{'primary': showMore}"
                            @click="showMore = true"
                        >趋势图</el-button>
                    </div>
                </div>
                <ve-histogram
                    :data="chartData"
                    :settings="chartSettings"
                    :extend="chartExtend"
                ></ve-histogram>
            </div>
            <div class="bu">
                <el-button
                    class="e"
                    @click="chartButton()"
                >下载报表</el-button>
            </div>
            <div class="tableBox">
                <el-table
                    :data="tableData"
                    v-loading.fullscreen.lock="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    border
                    empty-text="暂无数据"
                    style="width: 100%"
                >
                    <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="60"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="fileName"
                        label="文件名"
                        align="center"
                        show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                        prop="DLName"
                        label="上传人"
                        align="center"
                        width="120"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="Ctime"
                        label="上传时间"
                        align="center"
                        width="200"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="count"
                        label="数据下载量"
                        align="center"
                        width="120"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="happen"
                        label="查看用户下载情况"
                        align="center"
                        width="140"
                    >
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                class="see"
                                icon="el-icon-view"
                                @click="see(scope.row)"
                            ></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page="1"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    class="pa_"
                >
                </el-pagination>

                <el-dialog
                    title=""
                    :visible.sync="dialogFormVisible"
                >
                    <el-table
                        :data="tableData_"
                        border
                        empty-text="暂无数据"
                        style="width: 100%;"
                    >
                        <el-table-column
                            prop="department"
                            label="部门"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="userName"
                            label="下载用户"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="date"
                            label="下载时间"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="log_position"
                            label="角色"
                            align="center"
                        >
                        </el-table-column>
                    </el-table>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import {
    echo_department2,           //获取部门
    downloadChart_A,            //下载管理图表显示
    downloadChart_B,            //下载管理表格显示
    downloadChart_C,            //查看下载情况
    downloadChart_D             //下载报表
} from '@/api/api_base_S'

export default {
    name: '',
    data() {
        this.chartSettings = {
            showLine: ['下载趋势']
        },
            this.chartExtend = {
                legend: {
                    top: 20,
                },
            }
        return {
            loading: false,
            showMore: false,            //柱状图和趋势图的切换
            type_f: '全部',             //选中数据类型
            type_d: '全部',             //选中部门
            options_department: [],     //部门数据
            tableData_: [],
            dialogFormVisible: false,
            options: [
                {
                    value: '',
                    label: '全部'
                },
                {
                    value: 'PPT',
                    label: 'PPT'
                },
                {
                    value: 'PDF',
                    label: 'PDF'
                },
                {
                    value: 'Word',
                    label: 'Word'
                },
                {
                    value: 'Excel',
                    label: 'Excel'
                },
                {
                    value: 'HTML',
                    label: 'HTML'
                },
                {
                    value: 'EXE',
                    label: 'EXE'
                },
                {
                    value: 'JPG',
                    label: 'JPG'
                },
                {
                    value: 'PNG',
                    label: 'PNG'
                },
                {
                    value: 'PSD',
                    label: 'PSD'
                },
                {
                    value: '其他',
                    label: '其他'
                },
            ],                         //数据类型
            chartData: {},
            currentPage: 1,              //声明分页，并默认为第一页
            total: 0,                   //默认数据总数	
            pagesize: 10,                //每页的数据
            data_dates: [
                {
                    value: 'thisMonth',
                    label: '最近一个月'
                },
                {
                    value: 'thisWeek',
                    label: '最近一周'
                },
                {
                    value: 'thisDay',
                    label: '最近三天'
                },
            ],
            data_date: 'thisMonth',
            timeInterval: null,
            tableData: [],
        }
    },
    watch: {
        showMore(v) {
            if (v) {
                if (this.chartData.columns.length == 2) {
                    this.chartData.columns.push('下载趋势')
                }
                this.chartData.columns[2] = '下载趋势'
            } else {
                this.chartData.columns.splice(2, 1)
            }
        }
    },
    mounted() {
        //获取部门
        echo_department2({ 'data': 'data' })
            .then(data => {
                this.options_department = data.data;
            })
            .catch(err => {
                this.$message({
                    type: 'info',
                    message: '服务端异常，请稍后再试!'
                });
            })
        //获得图表
        downloadChart_A(
            {
                'data': {
                    'time': '',
                    'department': '',
                    'fileType': '',
                }
            }
        )
            .then(data => {
                var newData = [];
                for (let i = 0; i < data.data.length; i++) {
                    let t = data.data[i].date.split('-')
                    newData.push({
                        '日期': t[1] + '-' + t[2],
                        '下载数': data.data[i].count,
                        '下载趋势': data.data[i].count
                    })
                }
                this.chartData = {
                    columns: ['日期', '下载数'],
                    rows: newData
                }
            })
            .catch(err => {
                this.$message({
                    type: 'info',
                    message: '服务端异常，请稍后再试!'
                });
            })
        this.getTable()
    },
    methods: {//存放事件函数
        // 翻页
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            this.getTable()
        },
        // 获取表格值
        getTable() {
            downloadChart_B(
                {
                    'data': {
                        'page': this.currentPage,
                        'limit': this.pagesize,
                    }
                }
            )
                .then(data => {
                    this.tableData = data.data.resultData
                    this.total = data.data.sum
                })
                .catch(err => {
                    this.$message({
                        type: 'info',
                        message: '服务端异常，请稍后再试!'
                    });
                })
        },
        generate() {//生成图表
            this.showMore = false
            var time = ''
            if (this.data_date == 'thisWeek' || this.data_date == 'thisMonth' || this.data_date == 'thisDay') {//根据需求对是否选择本周或者本月或者近三天进行判断从而决定是否传入时间段值
                time = this.data_date;
            } else {
                if (this.timeInterval == null) {//对是否选择了时间段进行判断
                    time = '';
                } else {
                    time = this.timeInterval[0] + "," + this.timeInterval[1]//转化时间字段数据格式
                }
            }
            downloadChart_A({                'data': {//获得图表
                    'time': time,
                    'department': this.type_d,
                    'fileType': this.type_f,
                }            })
                .then(data => {
                    var newData = [];
                    for (let i = 0; i < data.data.length; i++) {
                        let t = data.data[i].date.split('-')
                        newData.push({
                            '日期': t[1] + '-' + t[2],
                            '下载数': data.data[i].count,
                            '下载趋势': data.data[i].count
                        })
                    }
                    this.chartData = {
                        columns: ['日期', '下载数'],
                        rows: newData
                    }
                })
                .catch(err => {
                    this.$message({
                        type: 'info',
                        message: '服务端异常，请稍后再试!'
                    });
                })
        },
        time_() {//获取日期选择器选择的时间
            this.data_date = ''
        },
        chartButton() {//下载报表
            this.loading = true
            downloadChart_D({ 'data': 'data' })//下载报表
                .then(data => {
                    const a = document.createElement('a')
                    a.style.display = 'none'
                    a.href = data.data
                    a.target = '_blank'
                    a.rel = 'noopener noreferrer'
                    document.getElementsByClassName('wrapper')[0].append(a)
                    a.click()
                    this.loading = false
                })
                .catch(err => {
                    this.$message({
                        type: 'info',
                        message: '服务端异常，请稍后再试!'
                    });
                })
        },
        handleSizeChange() {//pageSize 改变时会触发
            this.pagesize = size;
        },

        see(data) {//查看用户下载事件
            this.dialogFormVisible = true;
            downloadChart_C({                'data': {//查看下载
                    'filePath': data.filePath,
                }            })
                .then(data => {
                    this.tableData_ = data.data;
                })
                .catch(err => {
                    this.$message({
                        type: 'info',
                        message: '服务端异常，请稍后再试!'
                    });
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.download_management {
    height: calc(100% - 50px);
    .wrapper {
        width: 1300px;
        margin: 30px auto;
        min-height: 100%;
        .filter {
            margin: 30px auto;
            .s {
                margin: 0px 30px 0px 10px;
            }
            .v {
                float: right;
            }
        }
        .pic {
            margin: 30px auto;
            overflow: hidden;
            box-shadow: 1px 1px 4px 2px #eee;
            .pic_n {
                margin: 10px 10px 0px 10px;
                .inline_ {
                    display: inline-block;
                }
            }
        }
        .bu {
            margin: 30px auto;
            height: 40px;
            .e {
                float: right;
            }
        }
        .tableBox {
            margin: 30px auto;
        }
        .pa_ {
            text-align: center;
            padding: 10px;
        }
        .see {
            font-size: 18px;
            padding: 0px;
        }
        .primary {
            background: #409eff;
            color: #fff;
        }
    }
}
@media screen and (max-width: 1460px) {
    .download_management {
        .wrapper {
            width: 99%;
        }
    }
}
</style>
