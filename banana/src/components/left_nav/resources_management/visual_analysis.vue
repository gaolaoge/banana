<template>
    <div class="visual_analysis">
        <div class="wrapper">
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
                    <!-- <el-select
                        v-model="user_"
                        placeholder="请选择用户"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select> -->
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
                    <!-- <div class="block"> -->
                    <!-- <el-cascader
                        :options="options_"
                        :props="props_"
                        collapse-tags
                        clearable
                        value-key="t_id"
                    ></el-cascader> -->
                    <!-- </div> -->

                </div>
                <div class="l">
                    <span>
                        时间：
                    </span>
                    <el-radio-group
                        v-model="radio"
                        @change="date_radio_change"
                    >
                        <el-radio label="本周">本周</el-radio>
                        <el-radio label="本月">本月</el-radio>
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
                    
                    <!-- <el-button>重置</el-button> -->
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

                        <el-checkbox-group
                            v-model="default_"
                        >
                            <el-checkbox
                                v-for="item in t"
                                :key="item.value"
                                :label="item.value"
                                class="ff"
                            >{{item.label}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div class="options">
                        <p>
                            选择数据统计类型：
                        </p>
                        <!-- <ul>
                            <li class="li_">
                                下载量
                            </li>
                            <li class="li_">
                                上传量
                            </li>
                            <li class="li_">
                                分享量
                            </li>
                            <li class="li_">
                                浏览量
                            </li>
                        </ul> -->
                        <ul>
                            <el-radio-group v-model="dataStatisticType">
                                <el-radio
                                    label="下载量"
                                    class="li_"
                                >下载量</el-radio>
                                <el-radio
                                    label="上传量"
                                    class="li_"
                                >上传量</el-radio>
                                <el-radio
                                    label="分享量"
                                    class="li_"
                                >分享量</el-radio>
                                <el-radio
                                    label="浏览量"
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
                                    label="占比"
                                    class="li_"
                                >占比</el-radio>
                                <el-radio
                                    label="差值"
                                    class="li_"
                                    :disabled="difference"
                                >差值</el-radio>
                                <el-radio
                                    label="求和"
                                    class="li_"
                                    :disabled="summation"
                                >求和</el-radio>
                                <el-radio
                                    label="同比"
                                    class="li_"
                                >同比</el-radio>
                                <el-radio
                                    label="环比"
                                    class="li_"
                                >环比</el-radio>
                            </el-radio-group>
                        </ul>
                    </div>

                    <!-- <div class="options">
                        <p>
                            在以下区域拖动字段：
                        </p>
                        <div class="d">
                            <span class="span_">
                                行：
                            </span>
                            <el-input class="in_"></el-input>
                        </div>
                        <div class="d">
                            <span class="span_">
                                列：
                            </span>
                            <el-input class="in_"></el-input>
                        </div>
                    </div> -->
                    <el-button
                        class="create_chart"
                        type="primary"
                        @click="create_pic"
                    >生成图表</el-button>
                </div>
                <div class="pic">
                    <div class="pic_ul">
                        <ul>
                            <li class="lii_">
                                <i
                                    @click="window_close"
                                    class="el-icon-close close_"
                                ></i>
                                <div class="new_addition">
                                    <i class="el-icon-plus"></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'visual_analysis',
    data() {
        return {
            all_: {},                   //全部人员
            radio: '本周',
            date: '',
            de_: [],                    //部门
            options: [],                //组员
            depart_: [],
            user_: [],
            dataStatisticType: '',
            kind: '',
            default_: [],
            t: [],                      //element_选中用户
            summation: true,
            difference: true,
        };
    },
    watch: {
        default_(newVal) {
            if(newVal.length == 2){
                this.difference = false
            }else{
                this.difference = true
            }
            if(newVal.length >= 2){
                this.summation = false
            }else{
                this.summation = true
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
                        value: currentVal_.id,
                    })
                })
            })

        }
    },
    methods: {
        k(){
            this.t = []
        },
        window_close() {
            console.log()
        },
        date_radio_change() {
            this.date = ''
        },
        daterange() {
            this.radio = ''
        },
        next_step() {
            // { { options } }
            // console.log(this.options)
            // { { user_ } }     最终选中id
            this.t = []
            this.user_.forEach(current_ => {
                let r = this.options.find(curr_ => {
                    return curr_.value == current_
                })
                // console.log(r)
                this.t.push(r)
            })
        },
        //生成图表
        create_pic(){
            if(this.radio == '' && this.date == ''){
                this.$message.error('数据未选择')
                return false
            }
            if(this.default_.length == 0){
                this.$message.error('数据源未选择')
                return false
            }
            if(this.dataStatisticType == '' || this.kind == ''){
                this.$message.error('数据分析条件尚不完整')
                return false
            }
            let t = {
                'users': this.default_,
                'date': this.radio,
                'time': this.date,
                'dataStatisticType': this.dataStatisticType,
                'kind': this.kind
            }
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
            height: calc(100vh - 246px);
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
                    height: calc(100vh - 584px);
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
                            .new_addition {
                                position: absolute;
                                width: 100%;
                                height: 100%;
                                text-align: center;
                                .el-icon-plus {
                                    display: inline-block;
                                    line-height: 320px;
                                    font-size: 40px;
                                    color: #aaa;
                                }
                            }
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
</style>
