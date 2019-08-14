<template>
    <div class="customize">
        <div class="wrapper">
            <div class="line_ fl">
                <el-button>全选</el-button>
                <el-button>反选</el-button>
                <el-button>删除</el-button>
                <el-button>移动至固定存放</el-button>
            </div>
            <div class="line_">
                <el-input
                    class="input_"
                    v-model="input_"
                    placeholder="文件名称检索"
                ></el-input>
                <el-button class="s">搜索</el-button>
            </div>
            <div class="tab">
                <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%"
                >
                    <el-table-column
                        type="selection"
                        width="55"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="文件名称"
                        width="300"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="数据类型"
                        align="center"
                        width="140"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="s"
                        label="数据大小"
                        align="center"
                        width="140"
                        sortable
                    >
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="上传时间"
                        align="center"
                        sortable
                    >
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="280"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-button
                                @click="handleClick(scope.row)"
                                type="text"
                                size="small"
                            >预览</el-button>
                            <el-button
                                type="text"
                                size="small"
                            >下载</el-button>
                            <el-button
                                type="text"
                                size="small"
                            >打印</el-button>
                            <el-button
                                type="text"
                                size="small"
                            >分享至</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="o">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="1"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400"
                    >
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'customize',
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                s: 'text'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄',
                s: 'text'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                s: 'text'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
                s: 'text'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                s: 'text'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄',
                s: 'text'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                s: 'text'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
                s: 'text'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                s: 'text'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄',
                s: 'text'
            }]
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    width: 1300px;
    margin: 0px auto;
    .line_ {
        margin: 12px 0px;
        .input_ {
            width: 400px;
        }
    }
    .fl {
        float: right;
    }
    .o {
        text-align: center;
        margin: 32px;
    }
}
</style>
