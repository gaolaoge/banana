<template>
    <div class="date_management">
        <div class="wrapper">
            <h3 class="h2_">文件存储管理</h3>
            <div class="tableBox">
                <el-table
                    :data="tableData"
                    border
                    empty-text="暂无数据"
                    style="width: 100%"
                >
                    <el-table-column
                        prop="name"
                        label="文件类型"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="fileSizeSum"
                        label="已使用(MB)"
                        align="center"
                        width="180"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="fileCount"
                        label="文件个数"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="timebar"
                        label="存储时间"
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
                                :disabled="scope.row.TL == 'fix' || scope.row.TL == 'public' || scope.row.TL == 'private'"
                                @click="change(scope.$index, scope.row)"
                            >更改</el-button>
                            <el-button
                                size="mini"
                                type="text"
                                :disabled="scope.row.TL == 'private'"
                                @click="handleDelete(scope.$index, scope.row)"
                            >清空</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog
                    title="请选择储存时间"
                    :visible.sync="dialogFormVisible"
                >
                    <el-radio
                        v-model="radio"
                        label="1"
                        class="radio"
                    >一年</el-radio>
                    <el-radio
                        v-model="radio"
                        label="3"
                        class="radio"
                    >三年</el-radio>
                    <el-radio
                        v-model="radio"
                        label="5"
                        class="radio"
                    >五年</el-radio>
                    <el-radio
                        v-model="radio"
                        label="longtime"
                        class="radio"
                    >长期</el-radio>
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
                <el-dialog
                    title=""
                    :visible.sync="handled"
                >
                    <div>
                        确定清空文件夹吗？清空后将无法恢复
                    </div>
                    <div
                        slot="footer"
                        class="dialog-footer"
                    >
                        <el-button @click="deleteClose()">取 消</el-button>
                        <el-button
                            type="primary"
                            @click="deleteSure()"
                        >确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import { systemM_fileListShow } from '@/api/api_base_S'//获取列表
import { systemM_changeTLDate } from '@/api/api_base_S'//更改清理时间
import { systemM_fileEmpty } from '@/api/api_base_S'//清空

export default {
    inject: ['reload'],//注入reload方法
    name: '',
    data() {
        return {
            tableData: [],
            rowData: {}, //挂点：接载当前选中行数据
            dialogFormVisible: false,
            handled: false,//清空开关
            value: '',
            radio: '1'
        }
    },
    mounted() {
        this.reload()
    },
    methods: {
        reload() {
            systemM_fileListShow({ 'data': 'data' })//获取页面列表
                .then(data => {
                    for (let i = 0; i < data.data.length; i++) {//根据后台文件类型转化为汉语表头
                        const element = data.data[i];
                        if (element.TL == 'fix') {
                            element.name = '固定存储'
                        };
                        if (element.TL == 'temp') {
                            element.name = '临时存放'
                        };
                        if (element.TL == 'custom') {
                            element.name = '自定义文件'
                        };
                        if (element.TL == 'public') {
                            element.name = '共享文件'
                        };
                        if (element.TL == 'private') {
                            element.name = '个人文件'
                        };
                        if (element.timebar == 'longtime') {
                            element.timebar = '长期'
                        };
                    }
                    this.tableData = data.data;
                })
                .catch(err => {
                    this.$message({
                        type: 'info',
                        message: '获取数据失败!'
                    });
                })
        },
        handleDelete(row, rowIndex) {//清空按钮事件
            this.rowData = rowIndex;
            this.handled = true;
        },
        deleteClose() {//清空取消
            this.handled = false;
            this.$message({
                type: 'info',
                message: '已取消清空'
            });
        },
        deleteSure() {//清空确定
            systemM_fileEmpty(
                {
                    'data': {
                        'TL': this.rowData.TL
                    }
                }
            )
                .then(data => {
                    this.$message({
                        type: 'success',
                        message: '清空成功！'
                    });
                    this.reload()
                    this.handled = false;
                })
                .catch(err => {
                    this.$message({
                        type: 'info',
                        message: '删除失败！'
                    });
                })
            this.handled = false;
            this.reload();
        },
        change(row, rowIndex) {//自动清理时间更改
            this.rowData = rowIndex;
            this.dialogFormVisible = true;
        },
        close() {//更改取消事件
            this.dialogFormVisible = false
            this.$message({
                type: 'info',
                message: '已取消更改'
            });
        },
        sure() {//更改确定事件
            systemM_changeTLDate({
                'data': {
                    'TL': this.rowData.TL,
                    'timebar': this.radio
                }
            })
                .then(data => {
                    this.$message({
                        type: 'success',
                        message: '更改成功!'
                    });
                    this.reload();
                    this.dialogFormVisible = false;
                })
                .catch(err => {
                    this.$message({
                        type: 'info',
                        message: '更改失败!'
                    });
                })

        },
    }
}
</script>

<style lang="scss" scoped>
.date_management {
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
        .tableBox {
            margin: 30px auto;
        }
    }
}
@media screen and (max-width: 1400px) {
    .date_management {
        .wrapper {
            width: 99%;
        }
    }
}
</style>
