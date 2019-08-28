<template>
    <div class="document_retrieval">
        <div class="wrapper">
            <div class="nav">
                <div class="line_">
                    <el-input
                        v-model="input_"
                        placeholder="文件名称检索"
                        class="input_"
                    ></el-input>
                    <el-button
                        @click="catch_data()"
                        type="primary"
                    >搜索 </el-button>
                </div>
                <div class="check_">
                    <el-checkbox
                        :indeterminate="isIndeterminate"
                        v-model="checkAll"
                        @change="handleCheckAllChange"
                        class="checkb_"
                    >全选</el-checkbox>
                    <el-checkbox-group
                        v-model="checkedCities"
                        @change="handleCheckedCitiesChange"
                        class="checkb_"
                    >
                        <el-checkbox
                            v-for="li_ in cities"
                            :label="li_"
                            :key="li_"
                        >{{ li_ }}</el-checkbox>
                    </el-checkbox-group>
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
                            prop="fileName"
                            label="文件名称"
                            width="300"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="fileType"
                            label="数据类型"
                            align="center"
                            width="140"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="fileSize"
                            label="数据大小"
                            align="center"
                            width="140"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="fileTime"
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
                            :current-page="page_"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="num_"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="len_"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {
    retrieval_obtain
} from '@/api/api_base'

export default {
    name: 'document_retrieval',
    data() {
        return {
            input_: "",                          //文件名称检索
            checkAll: false,
            checkedCities: [],                   //文件类别
            // cities: cityOptions,
            isIndeterminate: true,
            cities: [
                'WORD',
                'EXCEL',
                'PPT',
                'PNG',
                'JPG',
                'PSD',
                'PDF',
                'TXT',
                'MP4',
                'HTML',
                'EXE',
                '其它',

            ],
            tableData: [],
            len_: 0,                             //数据总数
            page_: 1,                              //当前第几页
            num_: 10,                              //当前页多少条数据  
        }
    },
    methods: {
        handleSizeChange(val) {
            this.num_ = val
            this.catch_data()
        },
        handleCurrentChange(val) {
            this.page_ = val
            this.catch_data()
        },
        handleCheckAllChange(val) {
            this.checkedCities = val ? this.cities : [];
            this.isIndeterminate = false;
            this.catch_data()
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            this.catch_data()
        },
        catch_data() {
            let t = {
                keyWord: this.input_,
                fileType: this.checkedCities,
                page: this.page_,
                num: this.num_
            }
            retrieval_obtain({ 'data': t })
                .then(data => {
                    this.tableData = data.data[0]
                    this.len_ = data.data[1]
                })
        }
    },
    created() {
        this.catch_data()
    }
}
</script>

<style lang="scss" scoped>
.document_retrieval {
    .wrapper {
        width: 1300px;
        margin: 0px auto;
        .nav {
            .line_ {
                margin: 12px 0px;
                .input_ {
                    width: 320px;
                }
            }
            .check_ {
                margin: 24px 0px;
            }
        }
        .tab {
            margin-top: 22px;
            .o {
                text-align: center;
                margin: 20px;
            }
        }
    }
}
.checkb_ {
    display: inline-block;
}
</style>
