<template>
    <div class="shareList">
        <div class="wrapper">
             <div class="title">
                <el-button @click="share()">共享空间</el-button>
                <el-button type="primary" @click="department()">部门空间</el-button>
            </div>
            <div class="iconBox" v-show="departmentShow">
                <div class="fileBox" @click="fixed('设计部')">
                    <div class="bg"></div>
                    <span class="bgTitle">设计部</span>
                </div>
                <div class="fileBox" @click="fixed('研发部')">
                    <div class="bg"></div>
                    <span class="bgTitle">研发部</span>
                </div>
                <div class="fileBox" @click="fixed('事业部')">
                    <div class="bg"></div>
                    <span class="bgTitle">事业部</span>
                </div>
                <div class="fileBox" @click="fixed('企划部')">
                    <div class="bg"></div>
                    <span class="bgTitle">企划部</span>
                </div>
                <div class="fileBox" @click="fixed('人事部')">
                    <div class="bg"></div>
                    <span class="bgTitle">人事部</span>
                </div>
                <div class="fileBox" @click="fixed('商务部')">
                    <div class="bg"></div>
                    <span class="bgTitle">商务部</span>
                </div>
                <div class="fileBox" @click="fixed('销售部')">
                    <div class="bg"></div>
                    <span class="bgTitle">销售部</span>
                </div>
            </div>
            <div class="iconBox" v-show="shareShow">
                <div class="fileBox2" @click="fixed('设计部')">
                    <div class="bg2"></div>
                    <span class="bgTitle">设计部一组</span>
                </div>
                <div class="fileBox2" @click="fixed('设计部')">
                    <div class="bg2"></div>
                    <span class="bgTitle">设计部二组</span>
                </div>
                <div class="fileBox2" @click="fixed('设计部')">
                    <div class="bg2"></div>
                    <span class="bgTitle">设计部三组</span>
                </div>
                <div class="fileBox2" @click="fixed('设计部')">
                    <div class="bg2"></div>
                    <span class="bgTitle">设计部四组</span>
                </div>
            </div>
            <div class="footer">
                <p class="footerTitle">使用说明:</p>
                <p class="footercontent"><span class="red">平台共享文件：</span>对所有用户开放,无限权限制,为用户提供下载、预览、打印的功能。</p>
                <p class="footercontent"><span class="red">部门共享文件：</span>对部门用户开放,有限权限制,仅为部门用户提供下载、预览、打印的功能。</p>
            </div>
        </div>  
    </div>
</template>

<script>
export default {
    name: 'shareList',
    data(){
        return {
            departmentShow:true,    //共享空间开关
            shareShow:false,        //部门空间开关
        }
    },
    methods: {//存放事件函数
        fixed(val){//文件点击事件
            this.$router.push({//跳转页面并传参
                name: 'shareSee',
                params: {
                name:val,
                }
            })
       },
       share(){//共享空间点击事件
            this.departmentShow = false;
            this.shareShow = true;
       },
       department(){//部门空间点击事件
            this.departmentShow = true;
            this.shareShow = false;
       }
    }
}
</script>

<style lang="scss" scoped>
.shareList{
    height: calc(100% - 50px);
    .wrapper {
       margin: 20px auto;
        width: 1300px;
        .title{
            width: 1200px;
            text-align: right;
            margin-top: 30px;
            .totalCapacity{
                font-weight: 600;
                margin-right: 30px;
            }
        }
        .iconBox{
            width: 1000px;
            height: 200px;
            margin: 80px auto;
            background: #f0f8fa;
            .fileBox{
                width: 70px;
                float: left;
                margin: 36px;
                text-align: center;
                .bg{
                    width: 63px;
                    height: 70px;
                    background: url(../../../assets/shareMin.png);
                }
                .bgTitle{
                    font-weight:600; 
                }
            }
            .fileBox2{
                width: 70px;
                float: left;
                margin: 36px 90px;
                text-align: center;
                .bg2{
                    width: 63px;
                    height: 70px;
                    background: url(../../../assets/shareMin.png);
                }
                .bgTitle{
                    font-weight:600; 
                }
            }
        }
        .footer{
            width:850px;
            margin: 0 auto;
            line-height: 40px;
            .footerTitle{
                font-size: 18px;
                color: #4B4B4B;
                font-weight: 600; 
            }
            .footercontent{
                margin-left: 80px;
            }
            .red{
                color: red;
            }
        }
    }
}
</style>
