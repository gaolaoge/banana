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
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <el-button class="v">生成图表</el-button>
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
                        <el-button>柱状图</el-button>
                        <el-button>趋势图</el-button>
                    </div>
                </div>
                <ve-histogram
                    :data="chartData"
                    :settings="chartSettings"
                ></ve-histogram>
            </div>
            <div class="bu">
                <el-button class="e">下载报表</el-button>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    prop="fileName"
                    label="文件名"
                >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="上传人"
                    width="180"
                >
                </el-table-column>
                <el-table-column
                    prop="fileDate"
                    label="上传时间"
                >
                </el-table-column>
                <el-table-column
                    prop="num"
                    label="数据下载量"
                >
                </el-table-column>
                <el-table-column
                    prop="happen"
                    label="查看用户下载情况"
                >
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="1"
                layout="total, sizes, prev, pager, next, jumper"
                :total="100"
                class="pa_"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        this.chartSettings = {
            showLine: ['下单用户']
        }
        return {
            type_f: null,           //选中数据类型
            type_d: null,           //选中部门
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
            ],                      //数据类型
            options_: [
                {
                    value: '',
                    label: '全部'
                },
                {
                    value: '产品部',
                    label: '产品部'
                },
                {
                    value: '人事部',
                    label: '人事部'
                },
                {
                    value: '后勤部',
                    label: '后勤部'
                },
                {
                    value: '市场部',
                    label: '市场部'
                },
                {
                    value: '研发部',
                    label: '研发部'
                },
                {
                    value: '营销部',
                    label: '营销部'
                },
                {
                    value: '设计部',
                    label: '设计部'
                },
            ],                      //部门
            chartData: {
                columns: ['日期', '访问用户'],
                rows: [
                    { '日期': '1/1', '访问用户': 1393 },
                    { '日期': '1/2', '访问用户': 3530 },
                    { '日期': '1/3', '访问用户': 2923 },
                    { '日期': '1/4', '访问用户': 1723 },
                    { '日期': '1/5', '访问用户': 3723 },
                    { '日期': '1/6', '访问用户': 4593 },
                    { '日期': '1/7', '访问用户': 3723 },
                    { '日期': '1/8', '访问用户': 3723 },
                    { '日期': '1/9', '访问用户': 3723 },
                    { '日期': '1/10', '访问用户': 3723 },
                    { '日期': '1/11', '访问用户': 3723 },
                    { '日期': '1/12', '访问用户': 3723 },
                    { '日期': '1/13', '访问用户': 3723 },
                    { '日期': '1/14', '访问用户': 3723 },
                    { '日期': '1/15', '访问用户': 3723 },
                    { '日期': '1/16', '访问用户': 3723 },
                    { '日期': '1/17', '访问用户': 3723 },
                    { '日期': '1/18', '访问用户': 3723 },
                    { '日期': '1/19', '访问用户': 3723 },
                    { '日期': '1/20', '访问用户': 3723 },
                    { '日期': '1/21', '访问用户': 6533 },
                    { '日期': '1/22', '访问用户': 3723 },
                    { '日期': '1/23', '访问用户': 3345 },
                    { '日期': '1/24', '访问用户': 3723 },
                    { '日期': '1/25', '访问用户': 7845 },
                    { '日期': '1/26', '访问用户': 3345 },
                    { '日期': '1/27', '访问用户': 3723 },
                    { '日期': '1/28', '访问用户': 6523 },
                    { '日期': '1/29', '访问用户': 3063 },
                    { '日期': '1/30', '访问用户': 3823 },
                    { '日期': '1/31', '访问用户': 3623 },
                ]
            },
            data_dates: [
                {
                    value: 'month',
                    label: '最近一个月'
                },
                {
                    value: 'week',
                    label: '最近一周'
                },
                {
                    value: 'three',
                    label: '最近三天'
                },
            ],
            timeInterval: null,
            tableData: []
        }
    }
}
</script>

<style lang="scss" scoped>
.download_management {
    height: calc(100% - 50px);
    .wrapper {
        margin: 0px auto;
        width: 1300px;
        min-height: 100%;
        .filter {
            margin: 10px 0px;
            .s {
                margin: 0px 30px 0px 10px;
            }
            .v {
                float: right;
            }
        }
        .pic {
            overflow: hidden;
            margin-top: 20px;
            box-shadow: 1px 1px 4px 2px #eee;
            .pic_n {
                margin: 10px 10px 0px 10px;
                .inline_ {
                    display: inline-block;
                }
            }
        }
        .bu {
            margin: 12px 0px;
            height: 40px;
            .e {
                float: right;
            }
        }
        .pa_ {
            text-align: center;
            padding: 10px;
        }
    }
}
</style>
