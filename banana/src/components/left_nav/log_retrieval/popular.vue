<template>
    <div class="popular">
        <div class="wrapper">
            <div style="position: absolute;right: 100px;">
                <ul class="tagcloud">
                    <li
                        v-for="(li_,index) in data_"
                        :key="index"
                        @click="ahow_c(li_.key_word,li_.word)"
                        class="li_"
                    >
                        {{ li_.word }}
                    </li>
                </ul>
            </div>
            <div class="ul_">
                <ul>
                    <li
                        v-for="(li_,index) in data_"
                        :key="index"
                        @click="ahow_c(li_.key_word,li_.word)"
                        class="li_"
                    >
                        {{ li_.word }}
                    </li>
                </ul>
            </div>
        </div>
        <el-dialog
            title="数据详情"
            :visible.sync="dialog"
        >
            <detailsModule
                v-if="dialog"
                :selected_data="u"
            />
        </el-dialog>
    </div>
</template>

<script>

import detailsModule from '@/components/left_nav/log_retrieval/details.vue'
import { tagcloud } from '@/assets/js/tagCloud.js'
import {
    popular_searches
} from '@/api/api_base'

export default {
    name: 'popular',
    data() {
        return {
            dialog: false,
            data_: [
                {
                    word: '卡思特公司简介',
                    keyWord: '/dsd'
                }
            ],
            u: {},
        }
    },
    methods: {
        dynamic() {

        },
        ahow_c(v,tit) {
            this.u = {
                'path': v,
                'titl': tit
            }
            this.dialog = true
            // console.log(v)
        }
    },
    created() {
        setTimeout(() => {
            tagcloud({
                selector: '.tagcloud',  //元素选择器
                fontsize: 20,       //基本字体大小, 单位px
                radius: 100,         //滚动半径, 单位px
                mspeed: "normal",   //滚动最大速度, 取值: slow, normal(默认), fast
                ispeed: "normal",   //滚动初速度, 取值: slow, normal(默认), fast
                direction: 135,     //初始滚动方向, 取值角度(顺时针360): 0对应top, 90对应left, 135对应right-bottom(默认)...
                keep: false          //鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
            });
        }, 100)
        popular_searches()
            .then(data => {
                this.data_ = data.data
            })
    },
    components: {
        detailsModule
    }
}
</script>

<style lang="scss" scoped>
.popular {
    .wrapper {
        position: relative;
        width: 1300px;
        margin: 0px auto;
        .ul_ {
            margin-top: 100px;
            .li_ {
                list-style: none;
                font-weight: 600;
                color: #666;
                cursor: pointer;
                line-height: 42px;
                width: 340px;
                white-space: npwrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .li_::before {
                border-radius: 4px;
                font-size: 13px;
                line-height: 22px;
                width: 22px;
                height: 22px;
                display: inline-block;
                text-indent: 3px;
                // vertical-align: middle;
                margin-right: 3px;
            }
            .li_:nth-of-type(1)::before {
                content: "01";
                background: #ed741c;
                color: #fff;
            }
            .li_:nth-of-type(2)::before {
                content: "02";
                background: #f3ac27;
                color: #fff;
            }
            .li_:nth-of-type(3)::before {
                content: "03";
                background: #f8cb5e;
                color: #fff;
            }
            .li_:nth-of-type(4)::before {
                content: "04";
                color: #ed741c;
                background: rgb(245, 245, 245);
            }
            .li_:nth-of-type(5)::before {
                content: "05";
                color: #ed741c;
                background: rgb(245, 245, 245);
            }
            .li_:nth-of-type(6)::before {
                content: "06";
                color: #ed741c;
                background: rgb(245, 245, 245);
            }
            .li_:nth-of-type(7)::before {
                content: "07";
                color: #ed741c;
            }
            .li_:nth-of-type(8)::before {
                content: "08";
                color: #ed741c;
            }
            .li_:nth-of-type(9)::before {
                content: "09";
                color: #ed741c;
            }
            .li_:nth-of-type(10)::before {
                content: "10";
                color: #ed741c;
            }
        }
    }
}
.tagcloud {
    position: absolute;
    // right: 100px;
    // margin-top: -200px;
    width: 500px;
    height: 350px;
}
.tagcloud li {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    padding: 11px 30px;
    color: #333;
    font-size: 16px;
    border: 1px solid #e6e7e8;
    border-radius: 18px;
    background-color: #f2f4f8;
    text-decoration: none;
    white-space: nowrap;
    -o-box-shadow: 6px 4px 8px 0 rgba(151, 142, 136, 0.34);
    -ms-box-shadow: 6px 4px 8px 0 rgba(151, 142, 136, 0.34);
    -moz-box-shadow: 6px 4px 8px 0 rgba(151, 142, 136, 0.34);
    -webkit-box-shadow: 6px 4px 8px 0 rgba(151, 142, 136, 0.34);
    box-shadow: 6px 4px 8px 0 rgba(151, 142, 136, 0.34);
    -ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=4,Direction=135, Color='#000000')"; /*兼容ie7/8*/
    filter: progid:DXImageTransform.Microsoft.Shadow(color='#969696', Direction=125, Strength=9);
    /*strength是阴影大小，direction是阴影方位，单位为度，可以为负数，color是阴影颜色 （尽量使用数字）使用IE滤镜实现盒子阴影的盒子必须是行元素或以行元素显示（block或inline-block;）*/
}
</style>
