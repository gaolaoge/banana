<template>
    <div class="storage_base">
        <div class="wrapper">
            <div class="search_">
                <div class="line_">
                    <el-input
                        class="input_"
                        v-model="input_"
                        placeholder="文件名称检索"
                    ></el-input>
                    <el-button class="s">搜索</el-button>
                    <span>数据类型：</span>
                    <el-select
                        v-model="file_type"
                        placeholder="请选择"
                        class="s"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                    <span>文件大小：</span>
                    <el-select
                        v-model="file_volumn"
                        placeholder="请选择"
                        class="s"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="line_ f">
                    <el-button>全选</el-button>
                    <el-button>反选</el-button>
                    <el-button>删除</el-button>
                </div>
                <div class="line_">
                    <span>上传日期：</span>
                    <el-radio
                        v-model="radio"
                        label="1"
                    >本周</el-radio>
                    <el-radio
                        v-model="radio"
                        label="2"
                    >本月</el-radio>
                    <el-date-picker
                        v-model="date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    >
                    </el-date-picker>
                </div>
                
                <!-- <div class="line_">
                    
                </div> -->
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
    name: 'storage_base',
    data() {
        return {
            date: '',
            radio: '1',
            input_: '',
            file_type: '',
            file_volumn: '',
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
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
.storage_base {
    .wrapper {
        width: 1300px;
        margin: 0px auto;
        .search_ {
            margin-top: 22px;
            .line_ {
                padding: 8px 0px;
                .input_ {
                    width: 300px;
                }
                .s {
                    // display: inline-block;
                    margin-right: 22px;
                }
            }
            .f {
                float: right;
            }
        }
        .tab {
            margin-top: 22px;
            .o {
                text-align: center;
                margin: 32px;
            }
        }
    }
}
</style>
