<template>
    <div class="w">
        <div class="wrapper">
            <!-- <div class="search_box">
                <div class="select">
                    <el-form
                        ref="form"
                        :model="search"
                        label-width="80px"
                    >
                        <el-form-item
                            label="活动区域："
                            label-width="100px"
                            class="item_select"
                        >
                            <el-select
                                v-model="search.data_type"
                                placeholder="请选择活动区域"
                            >
                                <el-option
                                    v-for="item in type_all"
                                    v-bind:key="item.val"
                                    v-bind:label="item.label"
                                    v-bind:value="item.val"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="活动时间："
                            label-width="100px"
                            class="item_date"
                        >
                            <el-col :span="4">
                                <el-date-picker
                                    type="date"
                                    placeholder="选择日期"
                                    v-model="search.date_up"
                                    style="width: 100%;"
                                ></el-date-picker>
                            </el-col>
                            <el-col
                                class="line"
                                :span="1"
                                style="text-align: center"
                            >-</el-col>
                            <el-col :span="4">
                                <el-date-picker
                                    type="date"
                                    placeholder="选择时间"
                                    v-model="search.date_down"
                                    style="width: 100%;"
                                ></el-date-picker>
                            </el-col>
                            <el-button
                                :span="4"
                                type="primary"
                                plain
                                class="item_btn"
                            >主要按钮</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div> -->
            <div class="show_capacity">
                <div class="blue_border">
                    <div class="gray_border">
                        <!-- 拟物容量展示 -->
                        <div class="svg">
                            <article class="htmleaf-container">
                                <svg
                                    x="0px"
                                    y="0px"
                                    width="209.6px"
                                    height="209.6px"
                                    xml:space="preserve"
                                >
                                    <defs>
                                        <pattern
                                            id="water"
                                            width=".25"
                                            height="1.1"
                                            patternContentUnits="objectBoundingBox"
                                        >
                                            <path
                                                fill="#a55d4c"
                                                d="M0.25,1H0c0,0,0-0.659,0-0.916c0.083-0.303,0.158,0.334,0.25,0C0.25,0.327,0.25,1,0.25,1z"
                                            />
                                        </pattern>
                                        <circle
                                            id="text"
                                            cx="50%"
                                            cy="50%"
                                            r="50%"
                                        />
                                        <mask id="text-mask">
                                            <use
                                                x="0"
                                                y="0"
                                                xlink:href="#text"
                                                opacity="1"
                                                fill="#ffffff"
                                            />
                                        </mask>
                                        <g id="eff">
                                            <use
                                                x="0"
                                                y="0"
                                                xlink:href="#text"
                                                fill="#2bd1fc"
                                            /> <!-- 背景 -->
                                            <!-- 底色 -->
                                            <rect
                                                class="water-fill"
                                                mask="url(#text-mask)"
                                                fill="#a55d4c"
                                                x="0"
                                                y="105"
                                                width="209.59"
                                                height="209.59"
                                                opacity="1"
                                            >
                                            </rect>

                                            <rect
                                                class="water-fill"
                                                mask="url(#text-mask)"
                                                fill="url(#water)"
                                                x="-300"
                                                y="90"
                                                width="1200"
                                                height="100"
                                                opacity="0.3"
                                            >
                                                <animate
                                                    attributeType="xml"
                                                    attributeName="x"
                                                    from="-300"
                                                    to="0"
                                                    repeatCount="indefinite"
                                                    dur="2s"
                                                />
                                            </rect>
                                            <rect
                                                class="water-fill"
                                                mask="url(#text-mask)"
                                                fill="url(#water)"
                                                y="100"
                                                width="1600"
                                                height="100"
                                                opacity="0.3"
                                            >
                                                <animate
                                                    attributeType="xml"
                                                    attributeName="x"
                                                    from="-400"
                                                    to="0"
                                                    repeatCount="indefinite"
                                                    dur="3s"
                                                />
                                            </rect>

                                            <rect
                                                class="water-fill"
                                                mask="url(#text-mask)"
                                                fill="url(#water)"
                                                y="80"
                                                width="800"
                                                height="100"
                                                opacity="0.3"
                                            >
                                                <animate
                                                    attributeType="xml"
                                                    attributeName="x"
                                                    from="-200"
                                                    to="0"
                                                    repeatCount="indefinite"
                                                    dur="1.4s"
                                                />
                                            </rect>
                                            <!-- 第一层 -->
                                            <rect
                                                class="water-fill"
                                                mask="url(#text-mask)"
                                                fill="url(#water)"
                                                y="94"
                                                width="2000"
                                                height="100"
                                                opacity="0.9"
                                            >
                                                <animate
                                                    attributeType="xml"
                                                    attributeName="x"
                                                    from="-500"
                                                    to="0"
                                                    repeatCount="indefinite"
                                                    dur="2.8s"
                                                />
                                            </rect>
                                        </g>
                                    </defs>
                                    <use
                                        xlink:href="#eff"
                                        opacity="0.9"
                                    />
                                </svg>
                            </article>
                            <p class="h">
                                {{ svg_.totalSpace }}GB
                            </p>
                            <p class="h l">
                                {{ svg_.usedSpace }}GB
                            </p>
                        </div>
                    </div>
                </div>
                <p class="z">剩余内存</p>
            </div>
            <div class="form_">
                <el-form
                    ref="form"
                    :model="form_"
                    label-width="80px"
                >
                    <el-form-item
                        label="申请开通容量："
                        label-width="110px"
                    >
                        <el-input v-model="form_.totalSpace"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="单位："
                        label-width="110px"
                    >
                        <el-radio-group v-model="form_.byteUnits">
                            <el-radio label="MB"></el-radio>
                            <el-radio label="GB"></el-radio>
                            <el-radio label="TB"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item
                        label="理由："
                        label-width="110px"
                    >
                        <el-input
                            type="textarea"
                            v-model="form_.reason"
                            :rows="7"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="onSubmit"
                            style="margin-left: 30px"
                        >提交</el-button>
                    </el-form-item>
                </el-form>
                <p class="s">*达到容量提醒范围，如需申请请及时填写申请表</p>
            </div>
        </div>

    </div>
</template>

<script>

import {
    post_memory,
    eochSpace
} from '@/api/api_base'
import { mapState } from 'vuex'

export default {
    name: 'memory_management',
    data() {
        return {
            form_: {
                totalSpace: '',
                byteUnits: 'MB',
                reason: ''
            },
            svg_: {
                totalSpace: 0,
                usedSpace: 0,
                percentage: 0
            }
        }
    },
    computed: {
        ...mapState(['type_all'])
    },
    methods: {
        //发送数据
        onSubmit() {
            let j = this.form_
            post_memory({ 'data': j })
                .then(data => {
                    this.$message({
                        message: '提交成功！',
                        type: 'success'
                    })
                    this.form_ = {
                        totalSpace: '',
                        byteUnits: 'MB',
                        reason: ''
                    }
                })
                .catch(err => {

                })
        },
    },
    created() {
        eochSpace({ 'data': 'data' })
            .then(data => {
                this.svg_ = data.data
            })
    }
}
</script>

<style scoped lang="scss">
.w {
    .wrapper {
        width: 1300px;
        position: relative;
        // height: 500px;
        margin: 0px auto;
        .search_box {
            padding-top: 20px;
            .item_select {
                display: inline-block;
                float: left;
                margin-right: 100px;
            }
            .item_date {
                width: 1300px;
            }
            .item_btn {
                display: inline-block;
                margin-left: 40px;
            }
        }
        .show_capacity {
            display: inline-block;
            margin: 120px 220px 0px 40px;
            width: 260px;
            height: 260px;
            .blue_border {
                position: relative;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: linear-gradient(#34658d, #5ee6fd);
                border: 1px solid #999;
                box-shadow: 3px 3px 8px 4px #aaa;
                .gray_border {
                    // position: relative;
                    width: 89%;
                    height: 89%;
                    background: #d6e6f2;
                    border-radius: 50%;
                    margin: 5% 0px 0px 5%;
                    box-shadow: inset 2px 2px 5px 1px #999,
                        2px 2px 10px 1px #888;
                    border: 1px solid #999;
                    .svg {
                        z-index: 999;
                        margin: 10px 0px 0px 10px;
                    }
                    .h {
                        position: absolute;
                        left: 72px;
                        color: #fff;
                        font-weight: 800;
                        z-index: 999;
                        font-size: 22px;
                        line-height: 100px;
                        width: 120px;
                        text-align: center;
                    }
                    .l {
                        top: 126px;
                    }
                }
            }
            .z {
                font-weight: 900;
                text-align: center;
                margin-top: 30px;
                font-size: 18px;
            }
        }
        .form_ {
            background: #eee;
            vertical-align: top;
            margin-top: 60px;
            display: inline-block;
            width: 540px;
            border-radius: 12px;
            padding: 40px;
            .s {
                text-align: center;
                color: #f40;
            }
        }
    }
}
svg {
    position: absolute;
}
@media screen and (max-width: 1400px) {
    .w {
        .wrapper {
            width: 99%;
            .form_ {
                display: block;
                margin: 80px auto;
            }
            .show_capacity {
                display: block;
                margin: 40px auto;
            }
        }
    }
}
</style>
