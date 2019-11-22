<template>
    <div class="file_management">
        <div class="wrapper">
            <h3 class="h2_">文件容量管理</h3>
            <div class="tableBox">
                <el-table
                    :data="tableData"
                    border
                    empty-text="暂无数据"
                    style="width: 100%"
                >
                    <!-- :header-cell-style="tableHeaderColor" -->
                    <!-- :cell-style="tableRowClassName" -->
                    <el-table-column
                        prop="fileName"
                        label="文件夹名称"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="文件夹容量分配"
                        align="center"
                        width="180"
                    >
                        <template slot-scope="scope">
                            <span class="right">{{ scope.row.name }}</span><!-- 自动绑定失效需手动重新绑定 -->
                            <!-- <el-button
                        size="mini"
                        type="text"
                        @click="volume = true">更改</el-button> -->
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="fileDate"
                        label="创建时间"
                        align="center"
                        width="180"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="happen"
                        label="操作"
                        align="center"
                        width="200"
                    >
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="text"
                                @click="see(scope.$index, scope.row)"
                            >查看</el-button>
                            <el-button
                                size="mini"
                                type="text"
                                @click="empty()"
                            >清空</el-button>
                            <el-button
                                size="mini"
                                type="text"
                                @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog
                    title="请选择容量大小"
                    :visible.sync="volume"
                >
                    <el-slider
                        v-model="sliderValue"
                        class="sliderBox"
                    ></el-slider>
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
export default {
    name: '',
    data() {
        return {
            tableData: [{                   //表格数据
                fileName: '自定义文件夹',
                name: '100GB',
                fileDate: '2019/1/1  14:53',
            }, {
                fileName: '固定存储',
                name: '100GB',
                fileDate: '2019/1/1  14:53',
            }, {
                fileName: '临时存放',
                name: '100GB',
                fileDate: '2019/1/1  14:53',
            },],
            volume: false,
            sliderValue: 1,
        }
    },
    methods: {//存放事件函数
        //查看
        see(v) {
            switch (v) {
                case 1:
                    this.$router.push('/resources_management/storage_base?data=fixed_storage')
                    break
                case 2:
                    this.$router.push('/resources_management/storage_base?data=temporary_storage')
                    break
                case 0:
                    this.$router.push('/resources_management/customize')
                    break
            }
        },
        handleDelete() {//删除按钮事件
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        tableRowClassName({ row, rowIndex }) {//改变表格样式事件
            if (rowIndex % 2 == 1) {
                return 'background: #fafafa;';
            } else {
                return 'background: #cfe8f7;';
            }
        },
        tableHeaderColor({ row, column, rowIndex, columnIndex }) {//改变表格头部样式事件
            return 'background-color: #2d5c8d;color: #fff;font-weight:600;font-size:16px;text-align:center'
        },
        empty() {//清空按钮事件
            this.$confirm('确定清空文件夹吗？清空后将无法恢复', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '清空成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消清空'
                });
            });
        },
        close() {//取消事件
            this.volume = false
            this.$message({
                type: 'info',
                message: '已取消更改'
            });
        },
        sure() {//确定事件
            this.volume = false
            console.log(this.sliderValue);//滑块获取到的值
        }
    }
}
</script>

<style lang="scss" scoped>
.file_management {
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
        .right {
            margin-right: 10px;
        }
        .sliderBox {
            width: 60%;
            margin: 0 auto;
        }
        .tableBox {
            margin: 30px auto;
        }
    }
}
@media screen and (max-width: 1400px){
    .file_management {
        .wrapper {
            width: 99%;
        }
    }
}
</style>
