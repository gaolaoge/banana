<template>
    <div class="message_management">
        <div class="wrapper">
            <h3 class="h2_">消息清理管理</h3>
            <div class="tableBox">
                <el-table
                    :data="tableData"
                    border
                    empty-text="暂无数据"
                    :header-cell-style="tableHeaderColor"
                    :cell-style="tableRowClassName"
                    style="width: 100%"
                >
                    <el-table-column
                        prop="dirName"
                        label="文件夹"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="unread"
                        label="未读消息"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="count"
                        label="总消息"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="cleanTime"
                        label="自动清理时间"
                        align="center"
                        width="400"
                    >
                        <template slot-scope="scope">
                            <span class="tableSpan">{{ scope.row.cleanTime }}</span><!-- 自动绑定失效需手动重新绑定 -->
                            <el-button
                                size="mini"
                                type="text"
                                @click="change(scope.$index, scope.row)"
                                class="left"
                            >更改</el-button>
                        </template>
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
                                @click="deleteSure(scope.$index, scope.row)"
                            >清空</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog
                    title="请选择系统自动清理时间"
                    :visible.sync="dialogFormVisible"
                >
                    <el-radio
                        v-model="radio"
                        label="无"
                        class="radio"
                    >无</el-radio>
                    <el-radio
                        v-model="radio"
                        label="30"
                        class="radio"
                    >30天(默认)</el-radio>
                    <el-radio
                        v-model="radio"
                        label="15"
                        class="radio"
                    >15天</el-radio>
                    <el-radio
                        v-model="radio"
                        label="7"
                        class="radio"
                    >7天</el-radio>
                    <el-radio
                        v-model="radio"
                        label="每次退出自动清空"
                        class="radio"
                    >每次退出自动清空</el-radio>
                    <div
                        slot="footer"
                        class="dialog-footer"
                    >
                        <el-button @click="close()">取 消</el-button>
                        <el-button
                            type="primary"
                            @click="sure()"
                        >确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import { 
    emailClean,
    delteInfo,
    delteEmail
     } from '@/api/api_base_S'

export default {
    inject: ['reload'],//注入reload方法
    name: '',
    data() {
        return {
            tableData: [],
            dialogFormVisible: false,
            radio: '1'
        }
    },
    mounted() {
        this.reload()
    },
    methods: {
        reload() {
            //获取页面列表
            emailClean({ 'data': 'data' })
                .then(data => {
                    this.tableData = data.data;
                })
                .catch(err => {
                    this.$message({
                        type: 'info',
                        message: '获取数据失败！'
                    });
                })
        },
        deleteClose() {//清空取消
            this.handled = false;
            this.$message({
                type: 'info',
                message: '已取消清空'
            });
        },
        deleteSure(row, rowIndex) {//清空确定
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delteEmail({
                    'dirName': rowIndex.dirName
                })
                    .then(data => {
                        this.reload();
                        this.$message({
                            type: 'success',
                            message: '清空成功!'
                        });
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
            
        },
        change(row, rowIndex) {//自动清理时间更改
            this.dialogFormVisible = true;
            this.rowData = rowIndex;
        },
        close() {//更改取消事件
            this.dialogFormVisible = false
            this.$message({
                type: 'info',
                message: '已取消更改'
            });
        },
        sure() {//更改确定事件
            delteInfo({
                'dirName': this.rowData.dirName,
                'cleanTime': this.radio
            })
                .then(data => {
                    this.$message({
                        type: 'success',
                        message: '更改成功!'
                    });
                    this.dialogFormVisible = false
                    this.reload()
                })
                .catch(err => {
                    this.$message({
                        type: 'info',
                        message: '更改失败!'
                    });
                })
            this.reload();
            this.dialogFormVisible = false;
        },
    }
}
</script>

<style lang="scss" scoped>
.message_management {
    height: calc(100% - 50px);
    .wrapper {
        margin: 0px auto;
        width: 1300px;
        min-height: 100%;
        text-align: center;
        .h2_ {
            line-height: 2.2em;
            color: #006699;
            margin: 30px 0;
        }
        .radio {
            display: block;
            width: 200px;
            margin: 20px 50px;
            text-align: left;
            font-size: 16px;
        }
        .tableSpan {
            display: inline-block;
            // width:250px;
        }
        .left {
            margin-left: 10px;
        }
        .tableBox {
            margin: 30px auto;
        }
    }
}
@media screen and (max-width: 1400px) {
    .message_management {
        .wrapper {
            width: 99%;
        }
    }
}
</style>
