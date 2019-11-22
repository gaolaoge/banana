<template>
    <div class="data_analysis">
        <div class="wrapper">
            <div class="filter">
                <span style="vertical-align: top">昨日关键指标统计</span>
                <div style="position: relative;height: 220px;width: 220px;display: inline-block">
                    <ve-pie
                        :data="chartData_o"
                        :settings="chartSettings_"
                        width="240px"
                        height="200px"
                        :legend-visible="false"
                    ></ve-pie>
                </div>
                <div style="position: relative;height: 220px;width: 220px;display: inline-block">
                    <ve-pie
                        :data="chartData_t"
                        :settings="chartSettings_"
                        width="240px"
                        height="200px"
                        :legend-visible="false"
                    ></ve-pie>
                </div>
                <div style="position: relative;height: 220px;width: 220px;display: inline-block">
                    <ve-pie
                        :data="chartData_th"
                        :settings="chartSettings_"
                        width="240px"
                        height="200px"
                        :legend-visible="false"
                    ></ve-pie>
                </div>

                <!-- <el-button class="v">生成图表</el-button> -->
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
                <!-- {{ chartData }} -->
            </div>
            <div class="bu">
                <el-button
                    class="e"
                    @click="download_"
                >下载报表</el-button>
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
                            <p
                                v-for="i_ in scope.row.items"
                                :key="i_.part"
                                style="line-height: 3.8em"
                            >
                                <img
                                    :src=i_.url
                                    alt=""
                                    style="width: 40px;height: 40px;border-radius: 50%"
                                >
                                <span style="vertical-align: top;display: inline-block;width: 120px;">{{ i_.part }}</span>
                            </p>
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
        }
        this.chartSettings_ = {
            roseType: 'radius',
            radius: 40,
            offsetY: 100,
        }
        this.chartExtend = {
            legend: {
                top: 20,
            },
        }
        return {
            showMore: false,            //柱状图和趋势图的切换
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
            chartData: {
                columns: ['日期', '本月数据'],
                rows: [
                    // { '日期': '1/1', '访问用户': 1393 },
                ]
            },
            data_date: 'thisMonth',         //下拉框
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
    watch: {
        showMore(v) {
            if (v) {
                if (this.chartData.columns.length == 2) {
                    this.chartData.columns.push('上月对应数据')
                }
                this.chartData.columns[2] = '上月对应数据'
            } else {
                this.chartData.columns.splice(2, 1)
            }
        }
    },
    methods: {
        download_() {
            DataAnalyzeC({ 'data': 'data' })
                .then(data => {
                    const a = document.createElement('a')
                    a.style.display = 'none'
                    a.download = '报表'
                    a.href = data.data
                    a.target = '_blank'
                    document.getElementsByClassName('wrapper')[0].append(a)
                    a.click()
                })
        },
        time_() {
            this.data_date = ''
            let t = `${this.timeInterval[0]},${this.timeInterval[1]}`
            this.change_date(t)
        },
        change_date(f) {
            const self_ = this
            if (self_.data_date) {
                self_.timeInterval = null
            }
            DataAnalyzeB({ 'time': f })
                .then(data => {
                    self_.chartData.rows = []
                    let len = Object.keys(data.data[0]).length
                    Object.keys(data.data[0]).forEach(currentVal => {
                        let s = currentVal.split('-'),
                            key = s[1] + '/' + s[2],
                            val = data.data[0][currentVal].length
                        self_.chartData.rows.push({ '日期': key, '本月数据': val })
                        if (val) {
                            self_.tableData = []
                            var cap = 0,
                                it_ = []
                            for (var i = 0; i < val; i++) {
                                cap += Number(data.data[0][currentVal][i].totalSpace)
                                it_.push({
                                    part: data.data[0][currentVal][i].department + ' - ' + data.data[0][currentVal][i].userName,
                                    url: data.data[0][currentVal][i].headPortrait,
                                })
                            }
                            self_.tableData.push({
                                time: currentVal,
                                newNum: val,
                                capacity: cap + 'GB',
                                items: it_,
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
        self_.change_date('thisMonth')
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
        .primary {
            background: #409eff;
            color: #fff;
        }
    }
}
.tab_ {
    margin-bottom: 40px;
}
@media screen and (max-width: 1400px) {
    .data_analysis {
        .wrapper {
            width: 99%;
        }
    }
}
</style>
