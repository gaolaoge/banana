<template>
    <div class="visual_analysis">
        <div class="wrapper">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="changeSelectItem"
            >
                <el-menu-item index="1">用户分析</el-menu-item>
                <el-menu-item index="2">部门分析</el-menu-item>

            </el-menu>
            <div
                class="user"
                v-show="selectedItem == 'fir'"
            >
                <div class="sea_">
                    <div class="l">
                        <span>
                            部门：
                        </span>
                        <el-select
                            v-model="depart_"
                            placeholder="请选择部门"
                            @change="k"
                            class="p"
                            multiple
                            collapse-tags
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
                            multiple
                            collapse-tags
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                        <el-button
                            type="primary"
                            @click="next_step"
                        >确定</el-button>
                    </div>
                    <div class="l">
                        <span>
                            时间：
                        </span>
                        <el-radio-group
                            v-model="radio"
                            @change="date_radio_change"
                        >
                            <el-radio label="thisWeek">本周</el-radio>
                            <el-radio label="thisMonth">本月</el-radio>
                        </el-radio-group>
                        <el-date-picker
                            v-model="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            class="p"
                            @change="daterange"
                        >
                        </el-date-picker>
                    </div>
                </div>
                <div class="content">
                    <div class="option">
                        <div class="header_">
                            <header>
                                分析数据列表
                            </header>
                        </div>
                        <div class="element_">

                            <el-checkbox-group v-model="default_">
                                <el-checkbox
                                    v-for="item in t"
                                    :key="item.value"
                                    :label="item.value + '-' + item.label"
                                    class="ff"
                                >{{item.label}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div class="options">
                            <p>
                                选择数据统计类型：
                            </p>
                            <ul>
                                <el-radio-group v-model="dataStatisticType">
                                    <el-radio
                                        label="download"
                                        class="li_"
                                    >下载量</el-radio>
                                    <el-radio
                                        label="upload"
                                        class="li_"
                                    >上传量</el-radio>
                                    <el-radio
                                        label="share"
                                        class="li_"
                                    >分享量</el-radio>
                                    <el-radio
                                        label="browse"
                                        class="li_"
                                    >浏览量</el-radio>
                                </el-radio-group>
                            </ul>
                        </div>
                        <div class="options">
                            <p>
                                选择分析种类：
                            </p>
                            <ul>
                                <el-radio-group v-model="kind">
                                    <el-radio
                                        label="N"
                                        class="li_"
                                    >占比</el-radio>
                                    <el-radio
                                        label="D"
                                        class="li_"
                                        :disabled="difference"
                                    >差值</el-radio>
                                    <el-radio
                                        label="S"
                                        class="li_"
                                        :disabled="summation"
                                    >求和</el-radio>
                                    <el-radio
                                        label="O"
                                        class="li_"
                                    >同比</el-radio>
                                    <el-radio
                                        label="L"
                                        class="li_"
                                    >环比</el-radio>
                                </el-radio-group>
                            </ul>
                        </div>
                        <el-button
                            class="create_chart"
                            type="primary"
                            @click="create_pic"
                        >生成图表</el-button>
                    </div>
                    <div class="pic">
                        <div class="pic_ul">
                            <ul>
                                <li
                                    class="lii_"
                                    v-for="(li_,index_) in users_ul"
                                    :key="index_"
                                >
                                    <i
                                        @click="window_close(li_[2])"
                                        class="el-icon-close close_"
                                    ></i>
                                    <lineChart v-bind:data_="li_"></lineChart>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="parts"
                v-show="selectedItem == 'sec'"
            >
                <div class="sea_">
                    <div class="l">
                        <span>
                            部门：
                        </span>
                        <el-select
                            v-model="depart_parts"
                            placeholder="请选择部门"
                            class="p"
                            multiple
                            collapse-tags
                        >
                            <el-option
                                v-for="item in de_"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                        <el-button
                            type="primary"
                            @click="next_step_parts"
                        >确定</el-button>
                    </div>
                    <div class="l">
                        <span>
                            时间：
                        </span>
                        <el-radio-group
                            v-model="radio_parts"
                            @change="date_radio_change_parts"
                        >
                            <el-radio label="thisWeek">本周</el-radio>
                            <el-radio label="thisMonth">本月</el-radio>
                        </el-radio-group>
                        <el-date-picker
                            v-model="date_parts "
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            class="p"
                            @change="daterange_parts"
                        >
                        </el-date-picker>
                    </div>
                </div>
                <div class="content">
                    <div class="option">
                        <div class="header_">
                            <header>
                                分析数据列表
                            </header>
                        </div>
                        <div class="element_">
                            <el-checkbox-group v-model="default_parts">
                                <el-checkbox
                                    v-for="item in dxx"
                                    :key="item"
                                    :label="item"
                                    class="ff"
                                >{{item}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div class="options">
                            <p>
                                选择数据统计类型：
                            </p>
                            <ul>
                                <el-radio-group v-model="dataStatisticType_parts">
                                    <el-radio
                                        label="download"
                                        class="li_"
                                    >下载量</el-radio>
                                    <el-radio
                                        label="upload"
                                        class="li_"
                                    >上传量</el-radio>
                                    <el-radio
                                        label="share"
                                        class="li_"
                                    >分享量</el-radio>
                                    <el-radio
                                        label="browse"
                                        class="li_"
                                    >浏览量</el-radio>
                                </el-radio-group>
                            </ul>
                        </div>
                        <div class="options">
                            <p>
                                选择分析种类：
                            </p>
                            <ul>
                                <el-radio-group v-model="kind_parts">
                                    <el-radio
                                        label="N"
                                        class="li_"
                                    >占比</el-radio>
                                    <el-radio
                                        label="D"
                                        class="li_"
                                        :disabled="difference_parts"
                                    >差值</el-radio>
                                    <el-radio
                                        label="S"
                                        class="li_"
                                        :disabled="summation_parts"
                                    >求和</el-radio>
                                    <el-radio
                                        label="O"
                                        class="li_"
                                    >同比</el-radio>
                                    <el-radio
                                        label="L"
                                        class="li_"
                                    >环比</el-radio>
                                </el-radio-group>
                            </ul>
                        </div>
                        <el-button
                            class="create_chart"
                            type="primary"
                            @click="create_pic_parts"
                        >生成图表</el-button>
                    </div>
                    <div class="pic">
                        <div class="pic_ul">
                            <ul>
                                <li
                                    class="lii_"
                                    v-for="(li_,index) in parts_ul"
                                    :key="index"
                                >
                                    <i
                                        @click="window_close(li_[2])"
                                        class="el-icon-close close_"
                                    ></i>
                                    <lineChart :data_="li_"></lineChart>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    visual_analysis_parts_push,
    visual_analysis_users_push,
    visual_analysis_callback,
    visual_analysis_delete
} from '@/api/api_base'
import lineChart from './echarts_moudle/line_'

export default {
    name: 'visual_analysis',
    data() {
        return {
            all_: {},                   //全部人员
            radio: 'thisWeek',
            radio_parts: 'thisWeek',
            date: '',
            date_parts: '',
            de_: [],                    //部门
            options: [],                //组员
            depart_: [],
            depart_parts: [],
            dxx: [],                   //部门分析部门选项值
            user_: [],
            dataStatisticType: '',
            kind: '',
            dataStatisticType_parts: '',
            kind_parts: '',
            default_: [],
            default_parts: [],          //部门分析分析数据列表结果
            t: [],                      //element_选中用户
            summation: true,
            difference: true,
            summation_parts: true,
            difference_parts: true,
            activeIndex: '1',
            selectedItem: 'fir',
            time_result: 'thisWeek',
            time_parts_result: 'thisWeek',
            users_ul: [],
            parts_ul: []
        };
    },
    components: {
        lineChart
    },
    watch: {
        default_(newVal) {
            if (newVal.length == 2) {
                this.difference = false
            } else {
                this.difference = true
            }
            if (newVal.length >= 2) {
                this.summation = false
            } else {
                this.summation = true
            }
        },
        default_parts(newVal) {
            if (newVal.length == 2) {
                this.difference_parts = false
            } else {
                this.difference_parts = true
            }
            if (newVal.length >= 2) {
                this.summation_parts = false
            } else {
                this.summation_parts = true
            }
        },
        depart_(newVal, oldVal) {
            this.user_ = []
            this.options = []
            let self_ = this
            newVal.forEach(curr_ => {
                this.all_[curr_].forEach(currentVal_ => {
                    self_.options.push({
                        label: currentVal_.userName,
                        value: currentVal_.account,
                    })
                })
            })
        }
    },
    methods: {
        changeSelectItem(key, keyPath) {
            this.selectedItem = this.selectedItem == 'fir' ? 'sec' : 'fir'
        },
        k() {
            this.t = []
        },
        // 删除图表
        window_close(p) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    visual_analysis_delete({ 'charId': p })
                        .then(data => {
                            this.callback()
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

        },
        date_radio_change() {
            this.date = ''
            this.time_result = this.radio
        },
        date_radio_change_parts() {
            this.date_parts = ''
            this.time_parts_result = this.radio_parts
        },
        daterange() {
            this.time_result = this.date[0] + ',' + this.date[1]
            this.radio = ''
        },
        daterange_parts() {
            this.time_parts_result = this.date_parts[0] + ',' + this.date_parts[1]
            this.radio_parts = ''
        },
        //部门分析-确定
        next_step_parts() {
            this.dxx = this.depart_parts
        },
        //用户分析-确定
        next_step() {
            this.t = []
            this.user_.forEach(current_ => {
                let r = this.options.find(curr_ => {
                    return curr_.value == current_
                })
                this.t.push(r)
            })
        },
        //生成图表
        create_pic() {
            if (this.default_.length == 0) {
                this.$message.error('数据源未选择')
                return false
            }
            if (this.dataStatisticType == '' || this.kind == '') {
                this.$message.error('数据分析条件尚不完整')
                return false
            }
            let name_ = this.default_.map(curr_ => {
                return curr_.split('-')[1]
            }),
                account_ = this.default_.map(curr_ => {
                    return curr_.split('-')[0]
                }),
                t = {
                    'paramListName': name_,
                    'paramListAccount': account_,
                    'time': this.time_result,
                    'staType': this.dataStatisticType,
                    'anaType': this.kind
                }
            visual_analysis_users_push({ 'data': t })
                .then(data => {
                    this.users_down(data)
                })
        },
        // 用户数据生成图表
        users_down(data) {
            let t = [
                ['日期'],
                []
            ],
                data_ = data.data,
                user_lens = data_['result'].length,
                date_lens = data_['result'][0]['ListData'].length
            data_.result.forEach(curr_ => {
                t[0].push(curr_['owner'])
            })
            for (let i = 0; i < date_lens; i++) {
                for (let ii = 0; ii < user_lens; ii++) {
                    if (!t[1][i]) {
                        t[1][i] = {}
                        let date_ = data_['result'][ii]['ListData'][i]['date'].split('-')
                        t[1][i]['日期'] = date_[1] + '-' + date_[2]
                    }
                    t[1][i][t[0][ii + 1]] = data_['result'][ii]['ListData'][i]['count']
                }
            }
            t[2] = data_.charId
            this.users_ul.push(t)
        },
        //部门 - 生成图表
        create_pic_parts() {
            if (this.default_parts.length == 0) {
                this.$message.error('数据分析列表没有选中值')
                return false
            }
            if (this.dataStatisticType_parts == '' || this.kind_parts == '') {
                this.$message.error('数据分析条件尚不完整')
                return false
            }
            let t = {
                'paramListName': this.default_parts,
                'time': this.time_parts_result,
                'staType': this.dataStatisticType_parts,
                'anaType': this.kind_parts
            }
            visual_analysis_parts_push({ 'data': t })
                .then(data => {
                    this.parts_down(data)
                })
        },
        // 部门数据生成图表
        parts_down(data) {
            let data_ = data.data,
                ul_ = [],
                li_lens = data_['result'][0]['ListData'].length,
                t = [
                    ['日期'],
                    []
                ]
            data_.result.forEach(curr_ => {
                t[0].push(curr_['owner'])
                ul_.push(curr_['owner'])
            })
            ul_.forEach((li_, index_) => {
                for (let i = 0; i < li_lens; i++) {
                    if (!t[1][i]) {
                        t[1][i] = {}
                        let date_ = data_['result'][index_]['ListData'][i]['date'].split('-')
                        t[1][i]['日期'] = date_[1] + '-' + date_[2]
                    }
                    t[1][i][li_] = data_['result'][index_]['ListData'][i]['count']

                }
            })
            t[2] = data_.charId
            this.parts_ul.push(t)
        },
        // 回显
        callback() {
            visual_analysis_callback({ 'data': 'data' })
                .then(data => {
                    this.users_ul = []
                    this.parts_ul = []
                    data.data[0]['charData'].forEach(curr_ => {
                        this.parts_down({ 'data': curr_ })
                    })
                    data.data[1]['charData'].forEach(curr_ => {
                        this.users_down({ 'data': curr_ })
                    })
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
        this.callback()
    }
}
</script>

<style lang="scss" scoped>
.visual_analysis {
    .wrapper {
        width: 1300px;
        margin: 0px auto;
        .sea_ {
            .l {
                margin: 12px 0px;
                .p {
                    margin-left: 12px;
                    margin-right: 2px;
                }
            }
            .inp_ {
                width: 320px;
            }
        }
        .content {
            display: flex;
            height: calc(100vh - 296px);
            .option {
                width: 220px;
                flex-grow: 0;
                background: rgba(245, 245, 245, 1);
                border: 1px solid #ddd;
                height: 100%;
                .header_ {
                    text-align: center;
                    header {
                        line-height: 2.2em;
                        color: #424242;
                    }
                }
                .options {
                    margin-top: 12px;
                    p {
                        text-align: center;
                        line-height: 2.2em;
                        color: #424242;
                        font-size: 13px;
                    }
                    ul {
                        // text-align: center;
                        margin: 0px 22px;
                        .li_ {
                            list-style: none;
                            display: inline-block;
                            color: #409eff;
                            font-size: 13px;
                            margin: 0px 8px;
                            line-height: 2.2em;
                            cursor: pointer;
                            font-weight: 600;
                            width: 66px;
                            float: left;
                        }
                    }
                    .in_ {
                        width: 130px;
                    }
                    .d {
                        margin: 8px 0px;
                        .span_ {
                            display: inline-block;
                            width: 50px;
                            text-align: right;
                            font-size: 13px;
                        }
                    }
                }
                .element_ {
                    height: calc(100vh - 634px);
                    min-height: 180px;
                    border: 1px solid #ccc;
                    background: #fff;
                    margin: 10px;
                    border-radius: 2px;
                    padding: 8px;
                    overflow: hidden;
                    overflow-y: scroll;
                    .ff {
                        display: block;
                        line-height: 1.8em;
                    }
                }
                .element_::-webkit-scrollbar {
                    /*滚动条整体样式*/
                    width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
                    height: 8px;
                }
                .element_::-webkit-scrollbar-thumb {
                    /*滚动条里面小方块*/
                    border-radius: 10px;
                    -webkit-box-shadow: inset 0 0 5px rgba(102, 89, 89, 0.2);
                    background: #9e9797;
                }
                .uelement_l_::-webkit-scrollbar-track {
                    /*滚动条里面轨道*/
                    -webkit-box-shadow: inset 0 0 5px rgba(138, 129, 129, 0.2);
                    border-radius: 10px;
                    background: rgb(226, 221, 221);
                }
                .create_chart {
                    margin-top: 6px;
                    margin-left: 114px;
                }
            }
            .pic {
                flex-grow: 1;
                padding: 8px;
                .pic_ul {
                    ul {
                        display: flex;
                        justify-content: flex-start;
                        flex-wrap: wrap;
                        .lii_ {
                            position: relative;
                            list-style: none;
                            flex-grow: 0;
                            flex-basis: 46%;
                            height: 320px;
                            border-radius: 2px;
                            box-shadow: 2px 2px 6px 1px #ddd;
                            transition: all 0.2s;
                            margin: 0px 1% 44px 1%;
                        }
                        .lii_:hover {
                            box-shadow: 1px 1px 10px 1px #ccc;
                        }
                        .close_ {
                            position: absolute;
                            border: 2px solid #666;
                            background: #fff;
                            color: #666;
                            border-radius: 50%;
                            padding: 0px 5px;
                            line-height: 25px;
                            display: inline-block;
                            top: -14px;
                            right: -14px;
                            cursor: pointer;
                            font-weight: 600;
                        }
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 1400px) {
    .visual_analysis {
        .wrapper {
            width: 99%;
        }
    }
}
</style>
