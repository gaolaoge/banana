<template>
    <!-- 这也不是我写的 -->
    <div class="fixedList">
        <div class="wrapper">
            <el-tabs
                v-model="activeName"
                @tab-click="handleClick"
                class="tabsBox"
            >
                <el-tab-pane
                    label="固定存储"
                    name="fix"
                >
                    <div class="operationBox">
                        <label for="type_d_f">部门</label>
                        <el-select
                            v-model="type_d_f"
                            id="type_d_f"
                            class="s"
                        >
                            <el-option
                                v-for="item in options_department"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name"
                            ></el-option>
                        </el-select>
                        <label
                            for="type_f_f"
                            class="labelText"
                        >数据类型</label>
                        <el-select
                            v-model="type_f_f"
                            id="type_f_f"
                            class="s"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                        <p class="p"></p>
                        <label
                            for="type_f_f"
                            class="labelText t"
                        >存储日期</label>
                        <el-radio
                            v-model="radio_f"
                            label="thisWeek"
                            id="radio"
                        >本周</el-radio>
                        <el-radio
                            v-model="radio_f"
                            label="thisMonth"
                            id="radio"
                        >本月</el-radio>
                        <el-date-picker
                            v-model="time_f"
                            type="datetimerange"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            class="DateTimePicker"
                        >
                        </el-date-picker>
                        <el-button
                            type="primary"
                            @click="lookAll_f()"
                            class="right"
                        >查看全部</el-button>
                    </div>
                    <div class="tableBox">
                        <el-table
                            :data="tableData"
                            border
                            empty-text="暂无数据"
                            style="width: 100%"
                        >
                            <el-table-column
                                prop="file_type"
                                label="数据类型"
                                align="center"
                                width="120"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="typeCount"
                                label="数量"
                                align="center"
                                sortable
                                width="84"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="fileSizeSum"
                                label="数据大小(MB)"
                                align="center"
                                sortable
                                width="150"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="time"
                                label="时间"
                                align="center"
                                sortable
                                show-overflow-tooltip
                            >
                            </el-table-column>
                            <el-table-column
                                prop="happen"
                                label="操作"
                                align="center"
                                width="140"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        type="text"
                                        @click="open_f(scope.row)"
                                    >查看</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane
                    label="临时存放"
                    name="temp"
                >
                    <div class="operationBox">
                        <label for="type_d_t">部门</label>
                        <el-select
                            v-model="type_d_t"
                            id="type_d_t"
                            class="s"
                        >
                            <el-option
                                v-for="item in options_department"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name"
                            ></el-option>
                        </el-select>
                        <label
                            for="type_f_t"
                            class="labelText"
                        >数据类型</label>
                        <el-select
                            v-model="type_f_t"
                            id="type_f_t"
                            class="s"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                        <p class="p"></p>
                        <label
                            for="type_f_t"
                            class="labelText t"
                        >存储日期</label>
                        <el-radio
                            v-model="radio_t"
                            label="thisWeek"
                            id="radio"
                        >本周</el-radio>
                        <el-radio
                            v-model="radio_t"
                            label="thisMonth"
                            id="radio"
                        >本月</el-radio>
                        <el-date-picker
                            v-model="time_t"
                            type="datetimerange"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            class="DateTimePicker"
                        >
                        </el-date-picker>
                        <el-button
                            type="primary"
                            @click="lookAll_t()"
                            class="right"
                        >查看全部</el-button>
                    </div>
                    <div class="tableBox">
                        <el-table
                            :data="tableData_t"
                            border
                            empty-text="暂无数据"
                            style="width: 100%"
                        >
                            <el-table-column
                                prop="file_type"
                                label="数据类型"
                                align="center"
                                width="120"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="typeCount"
                                label="数量"
                                align="center"
                                width="84"
                                sortable
                            >
                            </el-table-column>
                            <el-table-column
                                prop="fileSizeSum"
                                label="数据大小(MB)"
                                align="center"
                                sortable
                                width="150"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="time"
                                label="时间"
                                align="center"
                                sortable
                                show-overflow-tooltip
                            >
                            </el-table-column>
                            <el-table-column
                                prop="happen"
                                label="操作"
                                align="center"
                                width="140"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        type="text"
                                        @click="open_t(scope.row)"
                                    >查看</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane
                    label="自定义文件"
                    name="custom"
                >
                    <el-tabs
                        v-model="activeName_d"
                        @tab-click="handleClick_d"
                    >
                        <el-tab-pane
                            v-for="item in array_d"
                            :key="item.name"
                            :label="item.name"
                            :name="item.name"
                        >
                            <div>
                                <label>部门人员</label>
                                <el-select
                                    v-model="personnel_d"
                                    id="personnel_d"
                                    class="s"
                                    @change='changePersonnel()'
                                >
                                    <el-option
                                        v-for="item in options_department_p"
                                        :key="item.name"
                                        :label="item.name"
                                        :value="item.account"
                                    ></el-option>
                                </el-select>
                            </div>
                            <div class="tableBox">
                                <el-table
                                    border
                                    empty-text="暂无数据"
                                    :data="tableData_d"
                                    style="width: 100%"
                                >
                                    <el-table-column
                                        prop="customFolder"
                                        label="文件夹名称"
                                        align="center"
                                        width="120"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        prop="folderSize"
                                        label="数据大小(MB)"
                                        align="center"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        prop="createTime"
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
                                                @click="see(scope.row)"
                                            >查看</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </el-tab-pane>
                <el-tab-pane
                    label="共享文件"
                    name="public"
                >
                    <div class="title">
                        <el-button @click="share()">共享空间</el-button>
                        <el-button
                            type="primary"
                            @click="department()"
                        >部门空间</el-button>
                    </div>
                    <div
                        class="iconBox"
                        v-show="departmentShow"
                    >
                        <div
                            class="fileBox"
                            v-for="item in array_d"
                            :key="item.name"
                            @click="fixed(item.name)"
                        >
                            <!-- <div class="bg"></div> -->
                            <div>
                                <!-- <i class="el-icon-folder-opened icon_size"></i> -->
                                <img
                                    src="@/assets/file_.svg"
                                    alt=""
                                >
                            </div>

                            <span class="bgTitle">{{item.name}}</span>
                        </div>
                    </div>
                    <div class="footer">
                        <p class="footerTitle">使用说明:</p>
                        <p class="footercontent">
                            <span class="red">
                                平台共享文件：
                            </span>
                            对所有用户开放,无限权限制,为用户提供下载、预览、打印的功能。
                        </p>
                        <p class="footercontent">
                            <span class="red">
                                部门共享文件：
                            </span>
                            对部门用户开放,有限权限制,仅为部门用户提供下载、预览、打印的功能。
                        </p>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import {
    storageM_showFATList,       //获取列表
    echo_department2,           //获取部门
    storageM_showCustomLsit     //获取自定义部门下文件夹列表
} from '@/api/api_base_S'

export default {
    name: 'fixedList',
    data() {
        return {
            searchInput: '',             //声明搜索框
            type_f_f: "全部",           //声明固定存储选中数据类型，并默认为全部
            type_f_t: "全部",           //声明临时存储选中数据类型，并默认为全部
            type_d_f: "全部",           //声明固定存储选中部门，并默认为全部
            type_d_t: "全部",           //声明临时存储选中部门，并默认为全部
            personnel_d: '全部',         //声明自定义文件选中部门人员，并默认为全部
            radio_f: '',                 //声明固定存储时间单选
            radio_t: '',                 //声明临时存储时间单选
            time_f: '',                  //声明固定存储选择时间段
            time_t: '',                  //声明临时存储选择时间段
            date_f: '',                  //声明固定存储选择时间段(处理之后)
            date_t: '',                  //声明临时存储选择时间段(处理之后)
            activeName: 'fix',          //声明文件储存方式选项卡并默认选择固定文件
            activeName_d: '研发部',           //声明部门选项卡
            departmentShow: true,        //共享空间开关
            shareShow: false,            //部门空间开关
            array_d: [],                 //部门选项卡
            options_department: [],     //部门数据
            options_department_p: [],   //部门人员数据
            tableData: [],              //固定存储表格数据 
            tableData_t: [],            //临时存放表格数据 
            tableData_d: [],             //部门表格数据   
            options: [                  //数据类型
                {
                    value: '',
                    label: '全部'
                },
                {
                    value: 'PPT',
                    label: 'PPT'
                },
                {
                    value: 'PDF',
                    label: 'PDF'
                },
                {
                    value: 'Word',
                    label: 'Word'
                },
                {
                    value: 'Excel',
                    label: 'Excel'
                },
                {
                    value: 'HTML',
                    label: 'HTML'
                },
                {
                    value: 'EXE',
                    label: 'EXE'
                },
                {
                    value: 'JPG',
                    label: 'JPG'
                },
                {
                    value: 'PNG',
                    label: 'PNG'
                },
                {
                    value: 'PSD',
                    label: 'PSD'
                },
                {
                    value: '其他',
                    label: '其他'
                },
            ],
        }
    },
    mounted() {
        storageM_showFATList({            'data': { //获取固定存储页面列表
                'TL': 'fix',
                'department': '',
                'fileDataType': '',
                'thisDate': '',
                'timeInterval': '',
            }        })
            .then(data => {
                for (let i = 0; i < data.data.length; i++) {//根据需求处理时间数据,方便展示
                    const element = data.data[i];
                    element.time = element.smallTime + "——" + element.bigTime;
                };
                this.tableData = data.data
            })
            .catch(err => {
                this.$message({
                    type: 'info',
                    message: '服务端异常，请稍后再试!'
                });
            })

        echo_department2({ 'data': 'data' })//获取部门
            .then(data => {
                this.array_d = data.data;
                // var all = {'name':'全部'};
                // data.data.unshift(all);
                this.options_department = data.data;
            })
            .catch(err => {
                this.$message({
                    type: 'info',
                    message: '服务端异常，请稍后再试!'
                });
            })
        storageM_showCustomLsit({
            'data': { //获取自定义部门下文件夹列表
                'TL': 'custom',
                'department': this.activeName_d,
                'userName': '',
            }
        })
            .then(data => {
                this.tableData_d = data.data;
            })
    },
    methods: {//存放事件函数
        handleClick(tab, event) {   //存放方式选项卡点击事件
            if (this.activeName == 'temp') {
                storageM_showFATList({                    'data': { //获取临时存放页面列表
                        'TL': 'temp',
                        'department': '',
                        'fileDataType': '',
                        'thisDate': '',
                        'timeInterval': '',
                    }                })
                    .then(data => {
                        for (let i = 0; i < data.data.length; i++) {//根据需求处理时间数据,方便展示
                            const element = data.data[i];
                            element.time = element.smallTime + "——" + element.bigTime;
                        };
                        this.tableData_t = data.data
                    })
                    .catch(err => {
                        this.$message({
                            type: 'info',
                            message: '服务端异常，请稍后再试!'
                        });
                    })
            }
        },
        handleClick_d(tab, event) {   //部门选项卡点击事件
            this.personnel_d = ''//清空选择
            this.tableData_d = []//清空列表
            for (let i = 0; i < this.options_department.length; i++) {
                const element = this.options_department[i];
                if (element.name == this.activeName_d) {
                    this.options_department_p = element.presion;
                    storageM_showCustomLsit({
                        'data': { //获取自定义部门下文件夹列表
                            'TL': 'custom',
                            'department': this.activeName_d,
                            'userName': '',
                        }
                    })
                        .then(data => {
                            this.tableData_d = data.data;
                        })
                        .catch(err => {
                            this.$message({
                                type: 'info',
                                message: '服务端异常，请稍后再试!'
                            });
                        })
                }
            }
        },
        changePersonnel() {//部门人员改变
            storageM_showCustomLsit({                'data': { //获取自定义部门下文件夹列表
                    'TL': 'custom',
                    'department': this.activeName_d,
                    'userName': this.personnel_d,
                }            })
                .then(data => {
                    this.tableData_d = data.data;
                })
                .catch(err => {
                    this.$message({
                        type: 'info',
                        message: '服务端异常，请稍后再试!'
                    });
                })
        },
        share() {//共享空间点击事件
            // this.departmentShow = false;
            // this.shareShow = true;
            this.$router.push({//跳转页面并传参
                name: 'fixedSee',
                params: {
                    'department': 'FirmSharedDirectory',
                    'fileName': '',
                }
            })
        },
        department() {//部门空间点击事件
            // this.departmentShow = true;
            // this.shareShow = false;
        },
        lookAll_f() {//固定存储查看全部
            var time = ''
            if (this.radio_f == 'thisWeek' || this.radio_f == 'thisMonth') {//根据需求对是否选择本周或者本月进行判断从而决定是否传入时间段值
                time = '';
            } else {
                if (!this.time_f[0]) {//对是否选择了时间段进行判断
                    time = '';
                } else {
                    time = this.time_f[0] + "," + this.time_f[1]//转化时间字段数据格式
                }
            }
            this.time_f = time;
            if (this.type_d_f == '全部') {
                this.type_d_f = '';
            }
            storageM_showFATList({                'data': { //获取固定存储查看全部列表
                    'TL': 'fix',
                    'department': this.type_d_f,
                    'fileDataType': this.type_f_f,
                    'thisDate': this.radio_f,
                    'timeInterval': time,
                }            })
                .then(data => {
                    for (let i = 0; i < data.data.length; i++) {//根据需求处理时间数据,方便展示
                        const element = data.data[i];
                        element.time = element.smallTime + "——" + element.bigTime;
                    };
                    this.tableData = data.data
                })
        },
        lookAll_t() {//临时存放查看全部
            if (this.radio_t == 'thisWeek' || this.radio_t == 'thisMonth') {//根据需求对是否选择本周或者本月进行判断从而决定是否传入时间段值
                var time = '';
            } else {
                if (!this.time_t[0]) {//对是否选择了时间段进行判断
                    time = '';
                } else {
                    time = this.time_t[0] + "," + this.time_t[1]//转化时间字段数据格式
                }
            }
            this.time_t = time;
            if (this.type_d_t == '全部') {
                this.type_d_t = '';
            }
            storageM_showFATList({                'data': { //获取临时存放查看全部列表
                    'TL': 'temp',
                    'department': this.type_d_t,
                    'fileDataType': this.type_f_t,
                    'thisDate': this.radio_t,
                    'timeInterval': time,
                }            })
                .then(data => {
                    console.log(data.data);
                    for (let i = 0; i < data.data.length; i++) {//根据需求处理时间数据,方便展示
                        const element = data.data[i];
                        element.time = element.smallTime + "——" + element.bigTime;
                    };
                    this.tableData_t = data.data
                })
        },
        open_f(data) {//固定文件跳转至查看页面
            if (this.type_d_f == '全部') {
                this.type_d_f = '';
            }
            if (this.type_f_f == '全部') {
                this.type_f_f = '';
            }
            this.$router.push({//跳转页面并传参
                name: 'fixedSee',
                params: {
                    'TL': 'fix',
                    'department': this.type_d_f,
                    'fileDataType': data.file_type,
                    'fileName': '',
                    'thisDate': this.radio_f,
                    'timeInterval': this.time_f,
                }
            })
        },
        open_t(data) {//临时存放跳转至查看页面
            if (this.type_d_t == '全部') {
                this.type_d_t = '';
            }
            if (this.type_f_t == '全部') {
                this.type_f_t = '';
            }
            this.$router.push({//跳转页面并传参
                name: 'fixedSee',
                params: {
                    'TL': 'temp',
                    'department': this.type_d_t,
                    'fileName': '',
                    'fileDataType': data.file_type,
                    'thisDate': this.radio_t,
                    'timeInterval': this.time_t,
                }
            })
        },
        see(data) {
            if (this.type_d_t == '全部') {
                this.type_d_t = '';
            }
            if (this.type_f_t == '全部') {
                this.type_f_t = '';
            }
            this.$router.push({//跳转页面并传参
                name: 'fixedSee',
                params: {
                    'TL': 'custom',
                    'folderName': data.customFolder,
                    'department': this.activeName_d,
                    'user': data.userName,
                }
            })
        },
        fixed(val) {//文件点击事件
            if (this.type_d_t == '全部') {
                this.type_d_t = '';
            }
            if (this.type_f_t == '全部') {
                this.type_f_t = '';
            }
            sessionStorage.setItem('department_name', val)
            this.$router.push({//跳转页面并传参
                name: 'fixedSee',
                params: {
                    'fileName': '',
                    'department': val,
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.fixedList {
    height: calc(100% - 50px);
    .wrapper {
        width: 1300px;
        margin: 0px auto;
        .operationBox {
            margin: 0 auto;
            #radio {
                margin-right: 10px;
            }
            .DateTimePicker {
                width: 230px;
            }
            .right {
                float: right;
            }
        }
        .tableBox {
            margin: 30px auto;
        }
        .labelText {
            margin: 0px 10px 0px 20px;
        }
        .pa_ {
            text-align: center;
            padding: 10px;
        }
        .title {
            text-align: right;
            margin-top: 30px;
            .totalCapacity {
                font-weight: 600;
                margin-right: 30px;
            }
        }
        .iconBox {
            display: flex;
            justify-content: space-around;
            height: 200px;
            margin: 80px auto;
            .fileBox {
                width: 70px;
                float: left;
                margin: 36px;
                text-align: center;
                cursor: pointer;
                .bgTitle {
                    line-height: 2.2em;
                    font-weight: 600;
                    color: #424242;
                }
            }
        }
        .footer {
            width: 850px;
            margin: 0 auto;
            font-size: 14px;
            line-height: 40px;
            color: #4b4b4b;
            .footerTitle {
                font-weight: 600;
            }
            .footercontent {
                margin-left: 80px;
            }
            .red {
                color: red;
            }
        }
    }
    .p {
        display: none;
    }
    .icon_size {
        font-size: 30px;
    }
}
@media screen and (max-width: 1460px) {
    .fixedList {
        .wrapper {
            width: 99%;
            .p {
                display: block;
                height: 12px;
            }
            .t {
                margin: 0px;
            }
        }
    }
}
</style>