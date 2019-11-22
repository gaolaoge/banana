<template>
    <div class="customList">
        <div class="wrapper">
            <!-- <el-dialog title="更改文件名称" :visible.sync="renameShow">
                <div slot="footer" class="dialog-footer">
                    <el-button @click="renamesure()">确定</el-button>
                    <el-button @click="renamecancel()">取消</el-button>
                </div>
            </el-dialog>
            <el-dialog title="提示" :visible.sync="emptyShow">
                <p>确定清空文件夹吗？清空后将无法恢复</p>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="emptysure()">确定</el-button>
                    <el-button @click="emptycancel()">取消</el-button>
                </div>
            </el-dialog>
            <el-dialog title="提示" :visible.sync="deleteShow">
                <p>确定删除文件夹吗？删除后将无法恢复</p>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="deletesure()">确定</el-button>
                    <el-button @click="deletecancel()">取消</el-button>
                </div>
            </el-dialog> -->

            <el-tabs v-model="activeName" @tab-click="handleClick" class="tabsBox">
                <el-tab-pane label="企划部" name="企划部">
                    <div class="tableBox">
                        <el-table
                            border
                            empty-text="暂无数据"
                            :data="tableData"
                            :header-cell-style="tableHeaderColor"
                            :cell-style="tableRowClassName"
                            style="width: 100%">
                            <el-table-column
                            prop="name"
                            label="文件夹名称"
                            align="center"
                            width="120">
                            </el-table-column>
                            <el-table-column
                                prop="size"
                                label="数据大小"
                                align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="date"
                                label="创建时间"
                                align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="happen"
                                label="操作"
                                align="center"
                            >
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="text"
                                @click="see(scope.row)">查看</el-button>
                            </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="事业部" name="事业部">事业部</el-tab-pane>
                <el-tab-pane label="人事部" name="人事部">人事部</el-tab-pane>
                <el-tab-pane label="设计部" name="设计部">设计部</el-tab-pane>
                <el-tab-pane label="研发部" name="研发部">研发部</el-tab-pane>
                <el-tab-pane label="后勤部" name="后勤部">后勤部</el-tab-pane>
                <el-tab-pane label="商务部" name="商务部">商务部</el-tab-pane>
            </el-tabs>
        </div>  
    </div>
</template>

<script>
export default {
    name: 'customList',
    data(){
        return {
            // renameShow:false,       //更改文件名称开关
            // emptyShow:false,        //清空开关
            // deleteShow:false,       //删除开关
            // addShow:false,          //新建开关
            // sliderValue:0,          //声明容量滑块,并默认值为0
            // input:'',               //声明文件夹输入框
            activeName: '企划部',
            tableData: [{               //表格数据
                name: "企业融资",
                size: '125GB',
                date: '2019/1/1 10：34'
            },{
                name: "项目计划书",
                size: '123.45GB',
                date: '2019/6/1 10：31'
            },{
                name: "人员档案",
                size: '152.5GB',
                date: '2019/6/1 12：34'
            }],           
        }
    },
    methods: {//存放事件函数
        // rename(){//改名
        //     this.renameShow = true;
        // },
        see(data){//查看
            this.$router.push({      //跳转页面并传参
                name: 'customSee',
                params: {
                    date: data.date,
                    name: data.name,
                    size: data.size,
                }
            })
        },
        handleClick(tab, event) {   //选项卡点击事件
            // console.log(tab, event);
        },
        tableRowClassName({row, rowIndex}) {//改变表格样式事件
          if(rowIndex%2==1){
            return 'background: #fafafa;';
          }else{
            return 'background: #cfe8f7;';
          }
        },
        tableHeaderColor({ row, column, rowIndex, columnIndex }) {//改变表格头部样式事件
            return 'background-color: #2d5c8d;color: #fff;font-weight:600;font-size:16px;text-align:center'
        },
        // renamesure(){//更名确定
        //     this.renameShow = false;
        // },
        // renamecancel(){//更名取消
        //     this.renameShow = false;
        // },
        // emptysure(){//清空确定
        //     this.emptyShow = false;
        // },
        // emptycancel(){//清空取消
        //     this.emptyShow = false;
        // },
        // deletesure(){//删除确定
        //     this.deleteShow = false;
        // },
        // deletecancel(){//删除取消
        //     this.deleteShow = false;
        // },
        // addsure(){//新建确定
        //     console.log(this.input,this.sliderValue);
        //     this.addShow = false;
        // },
        // addcancel(){//新建取消
        //     this.addShow = false;
        // }
    },
}
</script>

<style lang="scss" scoped>
.customList{
    height: calc(100% - 50px);
    .wrapper {
        .tabsBox{
            width: 1200px;
            margin: 50px auto;
        }
       .tableBox{
            width: 1200px;
            margin: 50px auto;
        }
        .buttonBox{
            width: 1200px;
            margin: 0px auto;
            .sliderBox{
                width: 300px;
                margin: 0 auto;
            }
        }
    }
}
</style>
