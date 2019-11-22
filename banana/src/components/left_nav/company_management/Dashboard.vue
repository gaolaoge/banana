<template>
    <div class="company_management">
        <div class="wrapper">
            <div class="f">
                <div class="r">
                    <p>用户</p>
                    <p>{{ base.userTotal }}人</p>
                </div>
                <div class="r">
                    <p>部门</p>
                    <p>{{ base.departmentTotal }}个</p>
                </div>
                <div class="r">
                    <p>总容量</p>
                    <p>{{ base.firmTotaiSpace }}TB</p>
                </div>
            </div>
            <!-- {{ base }} -->
            <div>
                <ve-gauge
                    :data="chartData"
                    :settings="chartSettings"
                    class="ve-gauge"
                ></ve-gauge>
            </div>
            <p class="p_">剩余{{ base.unUsedSpace }}TB</p>
            <el-button
                v-on:click="$router.push('/company_management/data_analysis')"
                class="btn_"
            >数据分析</el-button>
        </div>

    </div>
</template>

<script>

import { Dashboard } from '@/api/api_base'

export default {
    name: 'company_management',
    data() {
        this.chartSettings = {
            labelMap: {
                'speed': '已使用'
            },
            dataName: {
                'speed': '容器仪表盘'
            },
            seriesMap: {
                'speed': {
                    detail: {
                        show: false
                    },
                    radius: '100%'
                }
            },

        }
        return {
            chartData: {
                columns: ['type', 'value'],
                rows: [
                    { type: 'speed', value: 60 }
                ]
            },
            base: {
                departmentTotal: '',
                firmTotaiSpace: '',
                unUsedSpace: '',
                userTotal: '',
            }
        }
    },
    created() {
        Dashboard()
            .then(data => {
                this.base = data.data
                this.chartData.rows[0].value = data.data.percentage
            })
            .catch(err => {

            })
    }
}
</script>

<style scoped lang="scss">
.company_management {
    display: flex;
    justify-content: center;
    .wrapper {
        width: 1300px;
        height: 100%;
        // display: flex;
        // justify-content: center;
        // flex-wrap: wrap;
        .f {
            margin-left: 50%;
            transform: translateX(-50%);
            width: 90%;
            display: flex;
            justify-content: space-around;
            padding: 60px 0px;
            .r {
                width: 200px;
                height: 80px;
                border-radius: 8px;
                text-align: center;
                padding: 12px 0px;
                box-sizing: border-box;
                color: #fff;
                p:nth-of-type(1) {
                    font-size: 19px;
                    font-weight: 600;
                }
                p:nth-of-type(2) {
                    line-height: 2.2em;
                }
            }
            .r:nth-of-type(1) {
                background-color: #91c7ae;
            }
            .r:nth-of-type(2) {
                background-color: #63869e;
            }
            .r:nth-of-type(3) {
                background-color: #990000;
            }
        }
        .p_ {
            text-align: center;
            margin-top: -164px;
            font-weight: 600;
        }
        .btn_ {
            float: right;
            margin-top: 150px;
            margin-right: 220px;
        }
    }
}
@media screen and (max-width: 1300px) {
    .company_management {
        .wrapper {
            width: 99%;
        }
    }
}
</style>