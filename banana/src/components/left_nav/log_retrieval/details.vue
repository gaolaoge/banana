<template>
    <div class="details">
        <div class="fir">
            <span class="tf">
                <span>热词：</span>
                <span>{{ selected_data.titl }}</span>
            </span>
            <span class="tt">
                <span>搜索次数：</span>
                <span>{{ num }}</span>
            </span>
            <el-button @click="cutover">{{ btn_text }}</el-button>
        </div>
        <div class="f">
            <div
                class="tree"
                :class="{'active': !switch_}"
            >
                <el-timeline>
                    <el-timeline-item
                        v-for="(activity, index) in data_"
                        :key="index"
                        :timestamp="activity.time"
                    >
                        <span class="list_name">
                            {{activity.name}}
                        </span>
                        <span class="list_person">
                            - {{activity.userName}}
                        </span>
                    </el-timeline-item>
                </el-timeline>
                <div class="a">
                    <el-button
                        @click="add_more"
                        v-show="add_"
                    >加载更多</el-button>
                    <div v-show="!add_">
                        <el-divider content-position="center">
                            <span style="color: #aaa">已加载全部数据</span>
                        </el-divider>
                    </div>
                </div>
            </div>
            <div
                class="pic"
                :class="{'active': switch_}"
            >
                <ve-line
                    :data="chartData"
                    :extend="extend"
                    v-if="ec"
                ></ve-line>
            </div>
        </div>
    </div>
</template>

<script>

import {
    details_record
} from '@/api/api_base'

export default {
    name: 'detailsModule',
    data() {
        this.extend = {
            'xAxis.0.axisLabel.rotate': 45
        }
        return {
            ec: false,
            add_: true,
            data_: [],
            switch_: false,
            btn_text: '转到趋势图',
            num: 0,
            len: 1,
            chartData: {
                columns: ['日期', '访问用户'],
                rows: []
            }
        }
    },
    props: {
        selected_data: {
            type: Object,
            required: true
        },
    },
    methods: {
        cutover() {
            let self_ = this
            this.switch_ = !this.switch_
            switch (self_.btn_text) {
                case '转到趋势图':
                    self_.btn_text = '转到时间线'
                    break
                case '转到时间线':
                    self_.btn_text = '转到趋势图'
                    break
            }
        },
        add_more() {
            this.len++
            this.create()
        },
        create() {
            let self_ = this,
                d = new Date(),
                year_ = d.getFullYear(),
                month_ = d.getMonth() + 1,
                month_o = d.getMonth() - 2,
                day_ = d.getDate(),
                start = month_ - 3 > 0 ? year_ + '-' + month_o + '-' + day_ : (year_ - 1) + '-' + (month_o + 12) + '-' + day_,
                end = year_ + '-' + month_ + '-' + day_,
                startTime = gDate(start),
                endTime = gDate(end)


            function gDate(datestr) {
                let temp = datestr.split("-"),
                    date = new Date(temp[0], temp[1], temp[2])
                return date
            }
            if (self_.len == 1) {
                while ((endTime.getTime() - startTime.getTime()) >= 0) {
                    let year = startTime.getFullYear(),
                        month = startTime.getMonth().toString().length == 1 ? "0" + startTime.getMonth().toString() : startTime.getMonth(),
                        day = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate()
                    self_.chartData.rows.push({ '日期': month + "/" + day, '访问用户': 0 })
                    startTime.setDate(startTime.getDate() + 1)
                }
            }

            details_record({ 'path': self_.selected_data.path, 'num': self_.len })
                .then(data => {
                    self_.data_ = self_.data_.concat(data.data[0])
                    self_.num = data.data[1]
                    if (data.data[3] == '无事退朝') {
                        self_.add_ = false
                    }
                    if (self_.len == 1) {
                        data.data[2].forEach(currentVal => {
                            let t = currentVal.time_generated,
                                date = t.split('-')[1] + '/' + t.split('-')[2]
                            self_.chartData.rows.forEach(curr_ => {
                                if (curr_['日期'] == date) {
                                    curr_['访问用户'] = currentVal.num
                                }
                            })
                        })
                        self_.ec = true
                    }

                })
        }
    },
    created() {
        this.create()
    }
}
</script>

<style scoped lang="scss">
.fir {
    display: flex;
    justify-content: space-around;
    .tf {
        display: inline-block;
        line-height: 40px;
        width: 240px;
    }
    .tt {
        display: inline-block;
        line-height: 40px;
        width: 120px;
    }
}
.f {
    position: relative;
    height: 520px;
    overflow: hidden;
    .pic,
    .tree {
        position: absolute;
        padding: 12px;
        margin-top: 12px;
        height: 482px;
        width: calc(100% - 24px);
        overflow: hidden;
        transition: all 0.2s;
    }
    .tree {
        overflow-y: scroll;
        left: 110%;
    }
    .pic {
        left: -110%;
    }
    .pic.active {
        left: 0px;
    }
    .tree.active {
        left: 0%;
    }
    .tree::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 8px;
    }
    .tree::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(102, 89, 89, 0.2);
        background: #9e9797;
    }
    .tree::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(138, 129, 129, 0.2);
        border-radius: 10px;
        background: rgb(226, 221, 221);
    }
}
.list_name {
    display: inline-block;
    font-weight: 600;
    padding-right: 10px;
}
.list_person {
    display: inline-block;
    font-weight: 600;
    color: #888;
}
.a {
    text-align: center;
}
</style>
