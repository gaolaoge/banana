<template>
    <div class="data_analysis">
        <div class="wrapper">
            <div class="filter">
                <span style="vertical-align: top">昨日关键指标统计</span>
                <div style="position: relative;height: 220px;width: 220px;display: inline-block">
                    <ve-pie
                        :data="chartData_o"
                        :settings="chartSettings_"
                        width="200px"
                        height="200px"
                        :legend-visible="false"
                    ></ve-pie>
                </div>
                <div style="position: relative;height: 220px;width: 220px;display: inline-block">
                    <ve-pie
                        :data="chartData_t"
                        :settings="chartSettings_"
                        width="200px"
                        height="200px"
                        :legend-visible="false"
                    ></ve-pie>
                </div>
                <div style="position: relative;height: 220px;width: 220px;display: inline-block">
                    <ve-pie
                        :data="chartData_th"
                        :settings="chartSettings_"
                        width="200px"
                        height="200px"
                        :legend-visible="false"
                    ></ve-pie>
                </div>

                <el-button class="v">生成图表</el-button>
            </div>
            <div class="pic">
                <div class="pic_n">
                    <el-select
                        v-model="data_date"
                        placeholder="数据范围"
                        class="inline_"
                        @change="change_date"
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
                class="tab_"
            >
                <el-table-column
                    prop="time"
                    label="时间"
                    width="220"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    label="新增人数"
                    align="center"
                    width="100"
                >
                    <template slot-scope="scope">
                        <el-popover
                            trigger="hover"
                            placement="top"
                        >
                            <p v-for="i_ in scope.row.items" :key="i_.part">
                                <img
                                    src="@/assets/logo.png"
                                    alt=""
                                    style="width: 40px;height: 40px;border-radius: 50%"
                                >
                                <span style="line-height: 40px;vertical-align: top;display: inline-block;width: 120px;">{{ i_.part }}</span>
                            </p>
                            <!-- <p>
                                李明博 - 设计部
                            </p> -->
                            <div
                                slot="reference"
                                class="name-wrapper"
                            >
                                <el-tag size="medium">{{ scope.row.newNum }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="capacity"
                    label="容量使用情况"
                    align="center"
                >
                </el-table-column>
            </el-table>
            <!-- <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="1"
                layout="total, sizes, prev, pager, next, jumper"
                :total="100"
                class="pa_"
            >
            </el-pagination> -->
        </div>
    </div>
</template>

<script>

import {
    DataAnalyzeA,
    DataAnalyzeB,
    DataAnalyzeC
} from '@/api/api_base'

export default {
    name: '',
    data() {
        this.chartSettings = {
            showLine: ['上月对应数据']
        },
            this.chartSettings_ = {
                roseType: 'radius',
                radius: 40,
                offsetY: 100,
            }
        return {
            chartData_o: {
                columns: ['日期', '数量'],
                rows: [
                    { '日期': '昨日增加人数', '数量': 0 },
                    { '日期': '其它', '数量': 0 },
                ]
            },
            chartData_t: {
                columns: ['日期', '数量'],
                rows: [
                    { '日期': '上周增加人数', '数量': 0 },
                    { '日期': '其它', '数量': 0 }
                ]
            },
            chartData_th: {
                columns: ['日期', '数量'],
                rows: [
                    { '日期': '上个月增加人数', '数量': 0 },
                    { '日期': '其它', '数量': 0 }
                ]
            },
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
                columns: ['日期', '本月数据', '上月对应数据'],
                rows: [
                    // { '日期': '1/1', '访问用户': 1393 },
                ]
            },
            data_date: '',         //下拉框
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
            timeInterval: null,
            tableData: []
        }
    },
    methods: {
        time_() {
            // console.log(this.timeInterval)
            this.data_date = ''
            let t = `${this.timeInterval[0]},${this.timeInterval[1]}`
            this.change_date(t)
            // this.timeInterval = null
            // console.log(t)
        },
        change_date(f) {
            const self_ = this
            if (self_.data_date) {
                self_.timeInterval = null
            }
            DataAnalyzeB({ 'time': f })
                .then(data => {
                    // console.log(data)
                    self_.chartData.rows = []
                    let len = Object.keys(data.data[0]).length
                    Object.keys(data.data[0]).forEach(currentVal => {
                        let s = currentVal.split('-'),
                            key = s[1] + '/' + s[2],
                            val = data.data[0][currentVal].length
                        self_.chartData.rows.push({ '日期': key, '本月数据': val })
                        if (val) {
                            var cap = 0,
                                it_ = []
                            for (var i = 0; i < val; i++) {
                                cap += Number(data.data[0][currentVal][i].totalSpace)
                                it_.push({
                                    part: data.data[0][currentVal][i].department + ' - ' + data.data[0][currentVal][i].userName,
                                    url: '../assets/logo.png'
                                })
                            }
                            self_.tableData.push({
                                time: currentVal,
                                newNum: val,
                                capacity: cap + 'GB',
                                items: it_
                            })
                        }
                    })
                    for (var i = 0; i < len; i++) {
                        self_.chartData.rows[i]['上月对应数据'] = data.data[1][Object.keys(data.data[1])[i]].length
                    }
                })
                .catch(err => {

                })
        }
    },
    created() {
        const self_ = this
        DataAnalyzeA({ data: 'data' })
            .then(data => {
                self_.chartData_o.rows[0]['数量'] = data.data.beforeDate
                self_.chartData_o.rows[1]['数量'] = data.data.beforeDateSum
                self_.chartData_t.rows[0]['数量'] = data.data.beforeWeek
                self_.chartData_t.rows[1]['数量'] = data.data.beforeWeekSum
                self_.chartData_th.rows[0]['数量'] = data.data.beforeMonths
                self_.chartData_th.rows[1]['数量'] = data.data.beforeMonthsSum
            })
        self_.change_date('')
    }
}
</script>

<style lang="scss" scoped>
.data_analysis {
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
.tab_ {
    margin-bottom: 40px;
}
</style>
