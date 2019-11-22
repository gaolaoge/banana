<template>
    <div class="customSee">
        <div class="wrapper">
           <div class="searchBox">
                 <el-input placeholder="请输入关键字,例如:女" v-model="searchInput" class="input-with-select">
                    <el-button slot="append" @click="search()">搜索</el-button>
                </el-input>
            </div>
            <div class="buttonBox">
                <el-button @click="allElection(tableData)">全选</el-button>
                <el-button @click="reverseElection(tableData)">反选</el-button>
                <el-button type='text' @click="deleteElection(tableChecked)">删除</el-button>
                <el-button type='text' @click="move(tableChecked)">移动至固定存放</el-button>
            </div>  
            <div class="tableBox">
                <el-table
                    ref="multipleTable"
                    border
                    empty-text="暂无数据"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    :header-cell-style="tableHeaderColor"
                    :cell-style="tableRowClassName"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    width="55"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    label="名称"
                    width="220"
                    align="center">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="size"
                        label="数据大小"
                        align="center"
                        sortable
                    >
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="存储时间"
                        align="center"
                        sortable
                    >
                    </el-table-column>
                    <el-table-column
                        prop="surplus"
                        label="存储剩余时间"
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
                        @click="preview(scope.row)">预览</el-button>
                        <el-button
                        size="mini"
                        type="text"
                        @click="download(scope.row)">下载</el-button>
                        <el-button
                        size="mini"
                        type="text"
                        @click="printing(scope.row)">打印</el-button>
                        <el-button
                        size="mini"
                        type="text"
                        @click="share(scope.row)">分享至</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="1"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="100"
                    class="pa_"
                >
                </el-pagination>
                <el-dialog title="" :visible.sync="dialogFormVisible">
                    <div class="dialogContent">
                        <div class="aaa"></div>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="download(scope.row)">下载</el-button>
                        <el-button @click="printing(scope.row)">打印</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>  
    </div>
</template>

<script>
export default {
    name: 'customSee',
    data(){
        return {
            searchInput:'',          //声明搜索框
            currentPage:0,          //声明分页，并默认为第一页
            allSelect:false,        //全选
            tableChecked:[],        //表格中被选中删除的数据组
            dialogFormVisible: false,
            tableData: [{
                name: "公司第三季度汇报",
                size: '20KB',
                date: '2019/6/1 10：34',
                surplus:'5天',
            },{
                name: "公司第三季度汇报",
                size: '20KB',
                date: '2019/6/1 10：34',
                surplus:'15天',
            },{
                name: "公司第三季度汇报",
                size: '20KB',
                date: '2019/6/1 10：34',
                surplus:'8天',
            },{
                name: "公司第三季度汇报",
                size: '20KB',
                date: '2019/6/1 10：34',
                surplus:'6天',
            },{
                name: "公司第三季度汇报",
                size: '20KB',
                date: '2019/6/1 10：34',
                surplus:'23天',
            },{
                name: "公司第三季度汇报",
                size: '20KB',
                date: '2019/6/1 10：34',
                surplus:'24天',
            },{
                name: "公司第三季度汇报",
                size: '20KB',
                date: '2019/6/1 10：34',
                surplus:'5天',
            },{
                name: "公司第三季度汇报",
                size: '20KB',
                date: '2019/6/1 10：34',
                surplus:'5天',
            },],           
        }
    },
    methods: {//存放事件函数
        search(){//搜索事件
            console.log(this.searchInput)
        },
        allElection(rows){//全选事件
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row, !this.allSelect)
                })
                this.allSelect = !this.allSelect
            }
        },
        reverseElection(rows){//反选事件
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row, !this.allSelect)
                })
                this.allSelect = !this.allSelect
            }
        },
        deleteElection(val){//删除事件
            
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
        handleSelectionChange(val){//表格选中状态改变事件
            this.tableChecked = val
        },
        handleSizeChange(){//pageSize 改变时会触发

        },
        handleCurrentChange(){//currentPage 改变时会触发

        },
        move(val){//移动至固定存放
            this.tableChecked = val
        },
        preview(){//预览
            this.dialogFormVisible = true;
        },
        download(){//下载

        },
        printing(){//打印

        },
        share(){//分享

        },
    }
}
</script>

<style lang="scss" scoped>
.customSee{
    height: calc(100% - 50px);
    .wrapper {
        .searchBox{
            width: 400px;
            margin: 20px auto;
        }
        .buttonBox{
            width: 1200px;
            margin: 0 auto;
            text-align: right;
        }
        .tableBox{
            width: 1200px;
            margin: 20px auto;
        }
        .pa_ {
                text-align: center;
                padding: 10px;
            }
        .dialogContent{
            width: 600px;
            height: 300px;
            margin: 0 auto;
            border: 1px solid #C0C0C0;
            overflow: auto;
            .aaa{
              width: 800px;
            height: 400px; 
            }
        }
    }
}
</style>
