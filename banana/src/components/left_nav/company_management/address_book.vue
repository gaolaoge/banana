<template>
    <div class="address_book">
        <div class="wrapper">
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <section class="address_">
                            <header>
                                <h3 class="h3_">
                                    企业通讯录
                                </h3>
                            </header>
                            <article>
                                <el-button
                                    type="warning"
                                    class="button_"
                                >
                                    查看用户信息
                                </el-button>
                                <ul>
                                    <li
                                        v-for="(item_, na_) in users"
                                        v-bind:key="item_.department"
                                        class="li_"
                                    >
                                        {{na_}}
                                        <div class="part_">
                                            <ul>
                                                <li class="part_li">
                                                    部门领导
                                                    <div class="manager_">
                                                        <ul>
                                                            <li
                                                                v-for="it_ in item_"
                                                                v-bind:key="it_.id"
                                                                v-show="it_.position == '部门负责人'"
                                                                class="lli_"
                                                                v-on:click="show_card(it_.id)"
                                                            >
                                                                {{ it_.userName }}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <li class="part_li">
                                                    用户
                                                    <div class="users_">
                                                        <ul>
                                                            <li
                                                                v-for="it_ in item_"
                                                                v-bind:key="it_.id"
                                                                v-show="it_.position == '用户'"
                                                                class="lli_"
                                                                v-on:click="show_card(it_.id)"
                                                            >
                                                                {{ it_.userName }}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </article>
                        </section>
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="grid-content bg-purple">
                        <section class="info_">
                            <header>
                                <h3 class="h3_">
                                    用户信息
                                </h3>
                            </header>
                            <article>
                                <div class="div_">
                                    <el-input
                                        class="input_"
                                        v-model="input"
                                        placeholder="请输入内容"
                                    ></el-input>
                                    <el-button type="warning">
                                        重置
                                    </el-button>
                                </div>
                                <div class="card_">
                                    <div class="head_portrait">
                                        <img
                                            v-bind:src="card_.headPortrait"
                                            alt=""
                                            class="img_"
                                        >
                                    </div>
                                    <div class="tex_">
                                        <ul>
                                            <li>
                                                <span class="tit_">姓名</span>
                                                <span>： {{ card_.userName }}</span>
                                            </li>
                                            <li>
                                                <span class="tit_">部门</span>
                                                <span>： {{ card_.department }}</span>
                                            </li>
                                            <li>
                                                <span class="tit_">角色</span>
                                                <span>： {{ card_.position }}</span>
                                            </li>
                                            <li>
                                                <span class="tit_">内存大小</span>
                                                <span>： {{ card_.totalSpace }}GB</span>
                                            </li>
                                            <li>
                                                <span class="tit_">内存剩余</span>
                                                <span>： {{ card_.unusedSpace }}GB</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </article>
                        </section>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import { card_ } from '@/api/api_base'

export default {
    name: '',
    data() {
        return {
            input: '',
            card_: {
                userName: '',
                department: '',
                position: '',
                totalSpace: 0,
                unusedSpace: 0,
                headPortrait: ''
            }
        }
    },
    computed: {
        ...mapState(['users'])
    },
    methods: {
        show_card(i){
            card_({'id': i})
                .then(data => {
                    console.log(data)
                    Object.assign(this.card_,data.data)
                })
                .catch(err => {

                })
        }
    }
}
</script>

<style lang="scss" scoped>
.address_book {
    .wrapper {
        // border: 1px solid tomato;
        width: 1300px;
        margin: 40px auto;
        .info_,
        .address_ {
            text-align: center;
            .h3_ {
                line-height: 2.2em;
            }
            .button_ {
                margin: 12px 0px 14px 96px;
            }
            .li_ {
                position: relative;
                margin: 0px auto;
                list-style: none;
                background-color: #2d8dc9;
                line-height: 48px;
                width: 220px;
                color: #fff;
                border: 1px solid #fff;
                border-radius: 3px;
                cursor: pointer;
                font-size: 14px;
                .part_ {
                    display: none;
                    position: absolute;
                    left: 220px;
                    top: 0px;
                    .part_li {
                        position: relative;
                        list-style: none;
                        color: #039;
                        background: #afdef3;
                        width: 180px;
                        margin-bottom: 1px;
                        font-weight: 600;
                        .users_,
                        .manager_ {
                            position: absolute;
                            left: 180px;
                            top: 0px;
                            .lli_ {
                                display: none;
                                list-style: none;
                                background-color: #ffeda4;
                                color: #039;
                                width: 180px;
                                height: 48px;
                                margin-bottom: 1px;
                            }
                        }
                    }
                    .part_li:hover .lli_ {
                        display: block;
                    }
                    .part_li:hover {
                        color: rgb(200, 166, 26);
                    }
                }
            }
            .li_:hover .part_ {
                display: block;
            }
            .div_ {
                margin: 12px 0px 14px 0px;
                .input_ {
                    width: 300px;
                }
            }
            .card_ {
                width: 662px;
                height: 285px;
                background: #f2f2f2;
                margin: 56px auto;
                box-shadow: 6px 6px 4px 1px #ccc;
                .head_portrait {
                    float: left;
                    margin: 66px 66px 66px 66px;
                    width: 150px;
                    height: 150px;
                    border: 1px solid #000;
                    border-radius: 50%;
                    overflow: hidden;
                    .img_ {
                        width: 152px;
                    }
                }
                .tex_ {
                    ul {
                        padding-top: 44px;
                        li {
                            list-style: none;
                            text-align: left;
                            line-height: 2.4em;
                            .tit_ {
                                display: inline-block;
                                width: 78px;
                                // text-align: justify;
                                text-align-last: justify;
                            }
                        }
                    }
                }
            }
        }
        .info_ {
            border-left : 1px solid #aaa;
            height: 600px;
        }
    }
}
</style>
