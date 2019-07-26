<template>
    <div class="statistics">
        <div class="wrapper">
            <!-- <div class="sear_">
                <el-input
                    v-model="input_"
                    placeholder="输入部门名称"
                    class="input_"
                ></el-input>
                <el-button v-on:click="search_">搜索</el-button>
            </div> -->
            <div class="c_">
                <el-button
                    class="create_"
                    v-on:click="dialog = true"
                >
                    新建部门
                </el-button>
            </div>
            <div class="echarts_">
                <ul>
                    <li
                        v-for="(item, in_) in chartData"
                        v-bind:key="in_"
                    >
                        <ve-ring
                            :data="item.data"
                            :settings="chartSettings"
                            width="280px"
                            height="320px"
                            :legend-visible="false"
                        ></ve-ring>
                        <h3 class="department_n">
                            {{ item.info.department_name }}
                        </h3>
                        <div class="inf_">
                            <span>总容量{{ item.info.total }}TB</span>
                            <span>剩余{{ item.info.surplus }}TB</span>
                            <span>组员{{ item.info.people_num }}人</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <el-dialog
            title="新建部门"
            :visible.sync="dialog"
        >
            <el-form :model="form">
                <el-form-item
                    label="部门名称"
                    label-width="120px"
                >
                    <el-input
                        v-model="form.department_name"
                        autocomplete="off"
                        class="inp_"
                    ></el-input>
                </el-form-item>
                <div class="d">
                    <el-button
                        class="b_"
                        v-on:click="form.total=10"
                    >10TB</el-button>
                    <el-button
                        class="b_"
                        v-on:click="form.total=20"
                    >20TB</el-button>
                    <el-button
                        class="b_"
                        v-on:click="form.total=30"
                    >30TB</el-button>
                </div>
                <el-form-item
                    label="开通容量大小"
                    label-width="120px"
                >
                    <div class="block">
                        <el-slider
                            v-model="form.total"
                            :step="1"
                            show-input
                            :marks="marks"
                            :max=1562
                        >
                        </el-slider>
                    </div>
                </el-form-item>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="dialog = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="p()"
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import {    department_info,
    post_depart} from '@/api/api_base'

export default {
    name: 'statistics',
    data() {
        this.chartSettings = {
            labelLine: {
                show: false,
            },
            label: {
                show: false,
            },
            itemStyle: {
                // color: 'tomato'
            }
        }
        return {
            dialog: false,
            input_: '',
            chartData: [],
            form: {
                department_name: '',
                total: 1
            },
            marks: {
                // 0: '0T',
                // 8: '8T',
                // 37: '37T',
                // 50: {
                //     style: {
                //         color: '#1989FA'
                //     },
                //     label: this.$createElement('strong', '50%')
                // },
                100: '100TB',
                // 300: '300TB',
                500: {
                    style: {
                        color: '#1989FA'
                    },
                    label: this.$createElement('strong', '500TB')
                },
            }
        }
    },
    methods: {
        // search_() {

        // },
        p() {
            post_depart({ 'deparmentSpace': this.form.total, 'department': this.form.department_name })
                .then(data => {
                    if (data.data == 0) {
                        this.$message.error('部门名称重复')
                        return false
                    }
                    this.$message({
                        message: '添加成功',
                        type: 'success',
                        center: true
                    })
                    this.dialog = false
                    this.c()
                })
        },
        c() {
            department_info({ 'data': 'data' })
                .then(data => {
                    console.log(data)
                    this.chartData.length = 0
                    data.data.forEach(currentVal => {
                        let s = {
                            data: {
                                columns: ['类别', '数据'],
                                rows: [
                                    {
                                        '类别': '剩余',
                                        '数据': currentVal.unUsedSpace
                                    },
                                    {
                                        '类别': '已用',
                                        '数据': currentVal.sedSpace
                                    }
                                ]
                            },
                            info: {
                                department_name: currentVal.department,
                                total: currentVal.totalSpace,
                                surplus: currentVal.unUsedSpace,
                                people_num: currentVal.personSum
                            }
                        }
                        this.chartData.push(s)
                    })
                })
                .catch(err => {

                })
        }
    },
    created() {
        this.c()
    }
}
</script>

<style scoped lang="scss">
.statistics {
    .wrapper {
        width: 1300px;
        margin: 0px auto;
        .sear_ {
            text-align: center;
            margin-top: 40px;
            .input_ {
                width: 330px;
            }
        }
        .c_ {
            margin: 10px auto;
            height: 50px;
            width: 800px;
            .create_ {
                float: right;
            }
        }
        .echarts_ {
            ul {
                display: flex;
                flex-wrap: wrap;
                // justify-content: space-around;
                li {
                    position: relative;
                    list-style: none;
                    height: 350px;
                    width: 280px;
                    overflow: hidden;
                    .department_n {
                        text-align: center;
                    }
                    .inf_ {
                        position: absolute;
                        top: 180px;
                        left: 104px;
                        span {
                            display: block;
                            font-size: 14px;
                            color: #555;
                        }
                    }
                }
            }
        }
    }
}
.inp_ {
    width: 220px;
}
.block {
    width: 600px;
    // margin-top: 50px;
    margin-left: 10px;
}
.d {
    // display: flex;
    // justify-content: space-around;
    // text-align: center;
    padding-left: 120px;
    margin: 32px 0px;
    .b_ {
        width: 120px;
        height: 50px;
    }
}
</style>
