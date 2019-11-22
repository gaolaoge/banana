<template>
    <div class="fixedList">
        <div class="wrapper">
            <div class="searchBox">
                 <el-input placeholder="请输入关键字,例如:女" v-model="searchInput" class="input-with-select">
                    <el-button slot="append" @click="search()">搜索</el-button>
                </el-input>
            </div>
            <div class="operationBox">
                <label for="type_d">部门</label>
                <el-select
                    v-model="type_d"
                    id="type_d"
                    class="s"
                >
                    <el-option
                        v-for="item in options_"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <label for="type_f" class="labelText">数据类型</label>
                <el-select
                    v-model="type_f"
                    id="type_f"
                    class="s"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <label for="type_f" class="labelText">存储日期</label>
                <el-radio v-model="radio" label="1" id="radio">本周</el-radio>
                <el-radio v-model="radio" label="2" id="radio">本月</el-radio>
                <el-date-picker
                    v-model="time"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期" class="DateTimePicker">
                </el-date-picker>
                <el-button type="primary" @click="lookAll()" class="right">查看全部</el-button>
            </div>
            <div class="tableBox">
                 <el-table
                    :data="tableData"
                    stripe
                    border
                    empty-text="暂无数据"
                    style="width: 100%"
                    :header-cell-style="tableHeaderColor"
                    :cell-style="tableRowClassName"
                >
                    <el-table-column
                        prop="type"
                        label="数据类型"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="数量"
                        align="center"
                        sortable
                    >
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
                        label="时间"
                        align="center"
                        sortable
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
                        @click="open(scope.row)">查看</el-button>
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
            </div>
        </div>  
    </div>
</template>

<script>
export default {
    name: 'fixedList',
    data(){
        return {
            searchInput:'',          //声明搜索框
            type_f: "all",           //声明选中数据类型，并默认为全部
            type_d: "all",           //声明选中部门，并默认为全部
            radio:'1',               //声明单选
            time:'',                //声明选择时间
            currentPage:0,          //声明分页，并默认为第一页
            options: [              //数据类型
                {
                    value: 'all',
                    label: '全部'
                },
                {
                    value: 'ppt',
                    label: 'ppt'
                },
                {
                    value: 'pdf',
                    label: 'pdf'
                },
                {
                    value: 'word',
                    label: 'word'
                },
                {
                    value: 'excel',
                    label: 'excel'
                },
                {
                    value: 'HTML',
                    label: 'HTML'
                },
                {
                    value: 'exe',
                    label: 'exe'
                },
                {
                    value: 'jpg',
                    label: 'jpg'
                },
                {
                    value: 'png',
                    label: 'png'
                },
                {
                    value: 'psd',
                    label: 'psd'
                },
                {
                    value: '其他',
                    label: '其他'
                },
            ],                      
            options_: [                   //部门
                {
                    value: 'all',
                    label: '全部'
                },
                {
                    value: '产品部',
                    label: '产品部'
                },
                {
                    value: '人事部',
                    label: '人事部'
                },
                {
                    value: '后勤部',
                    label: '后勤部'
                },
                {
                    value: '市场部',
                    label: '市场部'
                },
                {
                    value: '研发部',
                    label: '研发部'
                },
                {
                    value: '营销部',
                    label: '营销部'
                },
                {
                    value: '设计部',
                    label: '设计部'
                },
            ],
            tableData: [{         //表格数据
                type: 'Word',
                num: 25134,
                size: '100GB',
                date: '2019/1/11——2019/2/11'
            },{
                type: 'Excel',
                num: 3000,
                size: '100GB',
                date: '2019/1/10——2019/2/10'
            },{
                type: 'PPT',
                num: 354,
                size: '90GB',
                date: '2019/1/12——2019/2/12'
            },{
                type: 'PDF',
                num: 25133,
                size: '99GB',
                date: '2019/1/04——2019/2/04'
            },{
                type: 'JPG',
                num: 3001,
                size: '100GB',
                date: '2019/1/11——2019/2/11'
            },{
                type: 'PNG',
                num: 254,
                size: '105GB',
                date: '2019/1/11——2019/2/11'
            },{
                type: 'PSD',
                num: 25134,
                size: '100GB',
                date: '2019/1/11——2019/2/11'
            },{
                type: 'HTML',
                num: 25134,
                size: '100GB',
                date: '2019/1/11——2019/2/11'
            },{
                type: '其他',
                num: 3214,
                size: '100GB',
                date: '2019/1/11——2019/2/11'
            }],                  
        }
    },
    methods: {//存放事件函数
        search(){//搜索事件
            console.log(this.searchInput);
        },
        lookAll(){//查看全部

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
        open(data){//跳转至查看页面
            this.$router.push({//跳转页面并传参
                name: 'fixedSee',
                params: {
                    date: data.date,
                    num: data.num,
                    size: data.size,
                    type: data.type,
                }
            })
        },
        handleSizeChange(){//pageSize 改变时会触发

        },
        handleCurrentChange(){//currentPage 改变时会触发

        },
    }
}
</script>

<style lang="scss" scoped>
.fixedList{
    height: calc(100% - 50px);
    .wrapper {
      .searchBox{
          width: 400px;
          margin: 20px auto;
      }
      .operationBox{
          width: 1200px;
          margin: 0 auto;
          #radio{
              margin-right: 10px; 
          }
          .DateTimePicker{
              width: 230px;
          }
          .right{
              float: right; 
          }
      }
      .tableBox{
          width: 1200px;
          margin: 30px auto;
      }
      .labelText{
          margin:0px 10px 0px 20px;
      }
      .pa_ {
            text-align: center;
            padding: 10px;
        }
    }
}
</style>
