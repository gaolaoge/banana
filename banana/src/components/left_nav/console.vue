<template>
    <div class="console">
        <div class="wrapper">
            <div class="card_">
                <div
                    class="card_li"
                    v-for="(item,index) in card_"
                    :key="index"
                >
                    <p class="title">
                        {{item.title_}}
                    </p>
                    <div class="content_">
                        <p class="column_">
                            <span class="num_">
                                {{item.num_}}
                            </span>
                            <span class="unit">
                                {{item.unit_}}
                            </span>
                        </p>
                        <p class="trend_">
                            <i
                                class="el-icon-sort-up"
                                v-if="item.trend == 'up'"
                            ></i>
                            <i
                                class="el-icon-sort-down"
                                v-if="item.trend == 'down'"
                            ></i>
                            <span class="change_num">
                                {{item.trend_num}}
                            </span>
                            <span>
                                {{item.unit_}}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="console_">
                <ul>
                    <li class="window_">
                        <div class="t_">
                            <p>热词统计</p>
                        </div>
                        <router-link
                            class="more_"
                            to="/log_retrieval/popular"
                        >
                            查看更多
                            <i class="layui-icon layui-icon-next"></i>
                        </router-link>
                        <div style="position: relative;left: 200px;top: 34px;">
                            <ul class="tagcloud">
                                <li
                                    v-for="(li_,index) in data_"
                                    :key="index"
                                    class="li_"
                                >
                                    {{ li_.word }}
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="window_">
                        <div class="t_">
                            <p>数据下载统计</p>
                        </div>
                        <ve-histogram
                            :data="chartData"
                            height="310px"
                        ></ve-histogram>
                    </li>
                    <li class="window_">
                        <div class="t_">
                            <p>平台公告</p>
                        </div>
                        <span class="more_">
                            查看更多
                            <i class="layui-icon layui-icon-next"></i>
                        </span>
                        <article class="announcement">
                            <header>
                                <p
                                    class="title"
                                    ref="article_title"
                                ></p>
                            </header>
                            <!-- <div> -->
                            <p
                                class="main_"
                                ref="article_main"
                            ></p>
                            <!-- </div> -->

                        </article>
                    </li>
                    <li class="window_">
                        <div class="t_">
                            <p>数据存储</p>
                        </div>
                        <div class="m_">
                            <el-select
                                v-model="select_"
                                @change="g"
                            >
                                <el-option
                                    v-for="item in sele_"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <ve-ring
                            :data="chartData2"
                            :settings="chartSettings"
                            :extend="chartExtend"
                            height="310px"
                            tooltip-visible="false"
                        ></ve-ring>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

import { tagcloud } from '@/assets/js/tagCloud.js'
import {
    console_base
} from '@/api/api_base'

export default {
    name: 'console',
    data() {
        this.chartSettings = {
            roseType: 'radius',
            radius: [10, 100],
            offsetY: 120,
        }
        this.chartExtend = {
            legend: {
                orient: 'vertical',
                x: 'left',
                top: 40,
                left: 10
            },
        }
        return {
            select_: '固定存储',
            sele_: [
                {
                    label: '固定存储',
                    value: '固定存储'
                },
                {
                    label: '临时存储',
                    value: '临时存储'
                },
                {
                    label: '自定义',
                    value: '自定义'
                },
            ],
            data_: [],
            card_: [
                {
                    title_: '内存容量',
                    num_: 0,
                    unit_: 'TB',
                    trend: 'up',
                    trend_num: 0
                },
                {
                    title_: '数据数量',
                    num_: 350,
                    unit_: '条',
                    trend: 'up',
                    trend_num: 150
                },
                {
                    title_: '用户数量',
                    num_: 350,
                    unit_: '人',
                    trend: 'up',
                    trend_num: 150
                },
                {
                    title_: '部门数量',
                    num_: 350,
                    unit_: '个',
                    trend: 'up',
                    trend_num: 150
                },
            ],
            chartData2: {
                columns: ['数据类型', '数量'],
                rows: []
            },
            chartData: {
                columns: ['日期', '下载量'],
                rows: []
            }
        }
    },
    methods: {
        g() {
            if(this.select_ == '固定存储'){
                this.getData('fix')
            }else if(this.select_ == '临时存储'){
                this.getData('temp')
            }else {
                this.getData('custom')
            }

        },
        getData(t) {
            let self_ = this
            console_base({ 'data': { 'TL': t } })
                .then(data => {
                    self_.$refs.article_title.innerText = data.data.stickAffiche.headline
                    self_.$refs.article_main.innerText = data.data.stickAffiche.body
                    self_.data_ = data.data.HotWord
                    self_.chartData.rows = []
                    data.data.thisMapSettle.forEach(current_ => {
                        self_.chartData.rows.push({
                            '日期': current_.date.split('-')[1] + '/' + current_.date.split('-')[2],
                            '下载量': current_.count
                        })
                    })
                    self_.chartData2.rows = []
                    data.data.StoreData.forEach(current_ => {
                        self_.chartData2.rows.push({
                            '数据类型': current_.file_type,
                            '数量': current_.fileSizeSum
                        })
                    })
                    self_.card_[0].num_ = data.data.AllSpace
                    self_.card_[0].trend_num = data.data.ResidueSpace
                    self_.card_[1].num_ = data.data.AllData
                    self_.card_[1].trend_num = data.data.newData
                    self_.card_[2].num_ = data.data.AllPeople
                    self_.card_[2].trend_num = data.data.newPeople
                    self_.card_[3].num_ = data.data.AllDepartment
                    self_.card_[3].trend_num = data.data.newDepartment
                    setTimeout(() => {
                        tagcloud({
                            selector: '.tagcloud',  //元素选择器
                            fontsize: 20,       //基本字体大小, 单位px
                            radius: 80,         //滚动半径, 单位px
                            mspeed: "normal",   //滚动最大速度, 取值: slow, normal(默认), fast
                            ispeed: "normal",   //滚动初速度, 取值: slow, normal(默认), fast
                            direction: 135,     //初始滚动方向, 取值角度(顺时针360): 0对应top, 90对应left, 135对应right-bottom(默认)...
                            keep: false          //鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
                        });
                    }, 100)
                })
        }
    },
    created() {
        this.getData('fix')

    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    width: 1300px;
    margin: 0px auto;
    .card_ {
        display: flex;
        justify-content: space-around;
        margin: 12px auto;
        .card_li {
            width: 280px;
            height: 126px;
            border-radius: 3px;
            .title {
                color: #fff;
                line-height: 2.4em;
                font-size: 14px;
                text-indent: 1em;
                margin: 0px 10px;
                border-bottom: 1px solid #fff;
            }
            .content_ {
                .column_ {
                    line-height: 78px;
                    color: #fff;
                    font-size: 38px;
                    text-align: center;
                    .unit {
                        font-size: 15px;
                        font-weight: 600;
                    }
                }
                .trend_ {
                    margin-top: -20px;
                    margin-right: 12px;
                    float: right;
                    color: #fff;
                    i {
                        font-weight: 700;
                    }
                }
            }
        }
        .card_li:nth-of-type(1) {
            background: linear-gradient(to right, #ffc23d, #ffe078);
        }
        .card_li:nth-of-type(2) {
            background: linear-gradient(to right, #11aff9, #76d6fb);
        }
        .card_li:nth-of-type(3) {
            background: linear-gradient(to right, #27d6a0, #78f0d5);
        }
        .card_li:nth-of-type(4) {
            background: linear-gradient(to right, #fb5554, #ff886a);
        }
    }
    .console_ {
        overflow: hidden;
        .window_ {
            position: relative;
            vertical-align: top;
            display: inline-block;
            width: 48%;
            height: 310px;
            margin: 0.8%;
            border: 1px solid #eee;
            box-shadow: 8px 8px 8px 0px #ccc;
            border-radius: 3px;
            .t_ {
                user-select: none;
                cursor: pointer;
                margin: 8px 16px;
                line-height: 1.6em;
                display: inline-block;
                text-indent: 0.8em;
                color: #424242;
                font-size: 15px;
                border-left: 4px solid tomato;
                font-weight: 600;
            }
            .announcement {
                padding: 18px;
                .title {
                    line-height: 2.2em;
                    font-weight: 600;
                    color: #424242;
                    text-indent: 2em;
                }
                .main_ {
                    // height: 196px;
                    font-size: 14px;
                    color: #424242;
                    line-height: 2em;
                    padding-top: 12px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 7;
                    overflow: hidden;
                }
            }
            .li_:nth-of-type(1) {
                font-weight: 600;
                font-size: 26px !important;
                color: #3b4371;
            }
            .li_:nth-of-type(2) {
                font-weight: 600;
                color: #1a2a6c;
            }
            .li_:nth-of-type(3) {
                font-weight: 600;
                color: #19547b;
            }
            .li_:nth-of-type(4) {
                color: #19547b;
            }
            .li_:nth-of-type(5) {
                color: #4ca1af;
            }
            .li_:nth-of-type(6) {
                color: #22c1c3;
            }
            .li_:nth-of-type(7) {
                color: #22c1c3;
            }
            .li_:nth-of-type(8) {
                color: #c0392b;
            }
            .li_:nth-of-type(9) {
                font-weight: 600;
                color: #c0392b;
            }
            .li_:nth-of-type(10) {
                font-weight: 600;
                color: #c0392b;
            }
        }
    }
    .more_ {
        float: right;
        line-height: 2.2em;
        font-size: 14px;
        color: #409eff;
        cursor: pointer;
        margin-top: 32px;
        margin-right: 1em;
    }
    .m_ {
        position: absolute;
        width: 120px;
        top: 32px;
        right: 12px;
        z-index: 2;
    }
}
</style>