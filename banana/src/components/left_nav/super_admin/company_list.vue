<template>
    <div class="z">
        <div class="wrapper">
            <!-- 检索 -->
            <div class="u">
                <el-button
                    type="primary"
                    v-on:click="back_"
                    icon="el-icon-arrow-left"
                    v-show="fh"
                >返回</el-button>
                <div class="v">
                    <el-input
                        class="search_input"
                        v-model="search_input"
                        placeholder="请输入企业名称"
                        clearable
                    ></el-input>
                    <el-button
                        type="primary"
                        v-on:click="search_"
                    >搜索</el-button>
                </div>

            </div>
            <!-- 表格 -->
            <el-table
                v-bind:data="tableData"
                border
                style="width: 100%"
                v-on:selection-change="( selection ) => this.tab_selection = selection"
            >
                <!-- <el-table-column
                    fixed="left"
                    type="selection"
                    width="57"
                    align="center"
                >
                </el-table-column> -->
                <el-table-column
                    prop="enterpriseName"
                    label="名称"
                    width="160"
                    align="center"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="firmAddress"
                    label="地址"
                    width="260"
                    align="center"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="registeredFund"
                    label="注册资金"
                    width="120"
                    align="center"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="firmRegion"
                    label="所属城市"
                    width="110"
                    align="center"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="legalName"
                    label="法人代表"
                    width="110"
                    align="center"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="adminName"
                    label="企业管理员"
                    width="120"
                    align="center"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="firmPhone"
                    label="联系方式"
                    width="160"
                    align="center"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    align="center"
                    width="220"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="success"
                            size="small"
                            v-on:click="check(scope.row)"
                        >查看</el-button>
                        <el-button
                            type="primary"
                            size="small"
                            v-on:click="edit_(scope.row)"
                        >修改</el-button>
                        <el-button
                            type="danger"
                            size="small"
                            v-on:click="delete_(scope.$index,scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="length_"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>

import {
    search_,
    de_
} from '@/api/api_base'

export default {
    name: 'company_list',
    data() {
        return {
            search_input: '',
            tableData: [],
            list_type: {
                page_num: 1,
                show_num: 10
            },
            length_: 0,
            fh: false,
        }
    },
    methods: {
        //每页显示多少条数据
        handleSizeChange(val, t_) {
            if (t_ == null) {
                t_ = this
            }
            search_(`name=${t_.search_input}&page_num=${t_.list_type.page_num}&show_num=${val}`)
                .then(data => {
                    t_.tableData = data.data[0]
                    t_.length_ = data.data[1]
                })
        },
        //翻页
        handleCurrentChange(val) {
            search_(`name=${this.search_input}&page_num=${val}&show_num=${this.list_type.show_num}`)
                .then(data => {
                    this.tableData = data.data[0]
                    this.length_ = data.data[1]
                })
        },
        //查看
        check(z) {
            this.$router.push({
                path: '/super_admin/detail_',
                query: {
                    name: z.enterpriseName,
                    id: z.id,
                    firmKEY: z.firmKEY,
                    type: 'check'
                }
            })
        },
        //编辑
        edit_(z) {
            this.$router.push({
                path: '/super_admin/detail_',
                query: {
                    name: z.enterpriseName,
                    id: z.id,
                    firmKEY: z.firmKEY,
                    type: 'edit'
                }
            })
        },
        //删除
        delete_(i, z) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    de_({ 'data': z.firmKEY })
                        .then(data => {
                            if (data.data == 1) {
                                this.$message({
                                    message: '删除成功',
                                    type: 'success',
                                    center: true
                                })
                                let self_ = this
                                this.$options.methods.handleSizeChange(self_.list_type.show_num, self_)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

        },
        //检索
        search_() {
            search_(`name=${this.search_input}&page_num=1&show_num=${this.list_type.show_num}`)
                .then(data => {
                    if (data.data[1] === 0) {
                        this.$message({
                            message: '未检索到符合要求数据',
                            type: 'warning',
                            center: true
                        })
                    } else {
                        if (this.search_input) {
                            this.fh = true
                        } else {
                            this.fh = false
                        }
                        this.tableData = data.data[0]
                        this.length_ = data.data[1]
                    }
                })
                .catch(err => {

                })
        },
        //返回
        back_() {
            search_(`name=&page_num=1&show_num=${this.list_type.show_num}`)
                .then(data => {
                    this.fh = false
                    this.tableData = data.data[0]
                    this.length_ = data.data[1]
                })
        }

    },
    created() {
        let s = `name=&page_num=${this.list_type.page_num}&show_num=${this.list_type.show_num}`
        search_(s)
            .then(data => {
                this.tableData = data.data[0]
                this.length_ = data.data[1]
            })
            .catch(err => {

            })
    }

}
</script>

<style lang="scss" scoped>
.z {
    .wrapper {
        width: 1300px;
        margin: 0px auto;
        padding: 40px 0px;
        .u {
            padding: 10px 0px;
            height: 40px;
            .v {
                float: right;
                .search_input {
                    width: 220px;
                }
            }
        }
        .el-pagination {
            padding: 22px 0px;
            text-align: center;
        }
    }
}
@media screen and (max-width: 1400px) {
    .z {
        .wrapper {
            width: 99%;
        }
    }
}
</style>
