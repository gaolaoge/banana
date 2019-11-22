<template>
    <div class="announcement_management">
        <div class="wrapper">
            <div class="filter">
                <label
                    class="textDate"
                    for="inp_"
                >关键字</label>
                <el-input
                    placeholder="请输入公告中关键字搜索"
                    v-model="inputSearch"
                    prefix-icon="el-icon-search"
                    class="search"
                    id="inp_"
                >
                </el-input>
                <label
                    class="textDate"
                    for="tim_"
                >日期</label>
                <el-date-picker
                    v-model="timeInterval"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="center"
                    id="tim_"
                >
                </el-date-picker>
                <div class="btn_case">
                    <el-button
                        type="primary"
                        class="right"
                        @click="releaseButton()"
                    >发布新公告</el-button>
                    <el-button
                        type="success"
                        class="right"
                        @click="search()"
                    >查询</el-button>
                </div>

            </div>
            <div class="content">
                <el-collapse
                    accordion
                    class="box-card"
                    :key="item.affiche.userName"
                    v-for="item in roofPlacementList"
                    @change='collapse(item)'
                >
                    <!-- 发布的公告折叠面板 -->
                    <el-collapse-item>
                        <template slot="title">
                            <div class="header">
                                <el-button
                                    type="warning"
                                    plain
                                    class="headerButton"
                                >置顶</el-button>
                                <span class="hTitle">{{item.affiche.headline}}</span>
                                <span class="Publish">{{item.affiche.userName}} 发表于{{item.affiche.time}}</span>
                                <span
                                    class="read"
                                    @click="readB(item)"
                                >{{item.afficheLookUser.length}}人已读</span>
                            </div>
                        </template>
                        <div>
                            <div class="contentText">
                                <div
                                    class="ql-container ql-snow"
                                    style="border:none;"
                                >
                                    <div class="ql-editor">
                                        <div v-html="item.affiche.body"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="contentfooter">
                                <span
                                    class="edit"
                                    @click="editBotton(item)"
                                >编辑</span>
                                <span
                                    class="delete"
                                    @click="deleteBotton(item)"
                                >删除</span>
                                <span
                                    class="read"
                                    @click="readB(roofPlacementList)"
                                >{{item.afficheLookUser.length}}人已读</span>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
                <el-collapse
                    accordion
                    class="box-card"
                    v-for="item in noticeList"
                    :key="item"
                    @change='collapse(item)'
                >
                    <el-collapse-item>
                        <template slot="title">
                            <div class="header">
                                <span class="listTitle">
                                    {{item.affiche.headline}}
                                </span>
                                <span class="listPublish">
                                    {{item.affiche.userName}}
                                    发表于
                                    {{item.affiche.time}}
                                </span>
                            </div>
                        </template>
                        <div>
                            <div class="contentText">
                                <div
                                    class="ql-container ql-snow"
                                    style="border:none;"
                                >
                                    <div class="ql-editor">
                                        <div v-html="item.affiche.body"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="contentfooter">
                                <span
                                    class="edit"
                                    @click="editBotton(item)"
                                >编辑</span>
                                <span
                                    class="delete"
                                    @click="deleteBotton(item)"
                                >删除</span>
                                <span
                                    class="read"
                                    @click="readB(item)"
                                >{{item.afficheLookUser.length}}人已读</span>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page="page"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    class="pa_"
                >
                </el-pagination>
                <el-dialog
                    title="发布新公告"
                    :visible.sync="newRelease"
                >
                    <!-- 发布新公告内容弹窗 -->
                    <div class="contentBox">
                        <el-input
                            v-model="title"
                            placeholder="标题(必填),4-40字"
                            class="titleInput"
                        ></el-input>
                        <quill-editor
                            v-model="editorContent"
                            ref="myQuillEditor"
                            :options="editorOption"
                            @blur="onEditorBlur($event)"
                            @focus="onEditorFocus($event)"
                            @change="onEditorChange($event)"
                        >
                        </quill-editor>
                    </div>
                    <div
                        slot="footer"
                        class="dialog-footer"
                    >
                        <el-button @click="sure()">取消</el-button>
                        <el-button @click="preview()">预览</el-button>
                        <el-button
                            type="primary"
                            @click="sure()"
                        >发布新发布</el-button>
                    </div>
                </el-dialog>
                <el-dialog
                    title=""
                    :visible.sync="previewText"
                >
                    <!-- 新建公告内容预览弹窗 -->
                    <div class="contentBox">
                        <p class="title">{{title}}</p>
                        <p class="author">{{userName}} 发表于{{time | formatDate}}</p>
                        <div
                            class="ql-container ql-snow"
                            style="border:none;"
                        >
                            <div class="ql-editor">
                                <div v-html="editorContent"></div>
                            </div>
                        </div>
                    </div>
                    <div
                        slot="footer"
                        class="dialog-footer"
                    >
                        <el-button
                            type="primary"
                            @click="sure()"
                        >确定发布</el-button>
                    </div>
                </el-dialog>
                <el-dialog
                    title=""
                    :visible.sync="release"
                    v-for="item in editList"
                    :key="item.userName"
                >
                    <!-- 公告内容编辑弹窗 -->
                    <div class="contentBox">
                        <p class="title">{{item.headline}}</p>
                        <p class="author">{{item.userName}} 发表于{{item.time}}</p>
                        <div
                            class="ql-container ql-snow"
                            style="border:none;"
                        >
                            <div class="ql-editor">
                                <div v-html="item.body"></div>
                            </div>
                        </div>
                    </div>
                    <div
                        slot="footer"
                        class="dialog-footer"
                    >
                        <el-button
                            type="warning"
                            @click="roofPlacement(item)"
                        >置顶</el-button>
                        <el-button
                            type="primary"
                            @click="modify(item)"
                        >修改</el-button>
                    </div>
                </el-dialog>
                <el-dialog
                    title=""
                    :visible.sync="modifyText"
                >
                    <!-- 公告修改弹窗 -->
                    <div class="contentBox">
                        <el-input
                            v-model="modifyTitle"
                            :disabled="true"
                            placeholder="标题(必填),4-40字"
                            class="titleInput"
                        ></el-input>
                        <quill-editor
                            v-model="modifyEditorContent"
                            ref="myQuillEditor"
                            :options="editorOption"
                            @blur="onEditorBlur($event)"
                            @focus="onEditorFocus($event)"
                            @change="onEditorChange($event)"
                        >
                        </quill-editor>
                    </div>
                    <div
                        slot="footer"
                        class="dialog-footer"
                    >
                        <el-button @click="modifyText = false">取消</el-button>
                        <el-button
                            type="primary"
                            @click="modifyYes(editList)"
                        >确定修改</el-button>
                    </div>
                </el-dialog>
                <el-dialog
                    title=""
                    :visible.sync="readShow"
                >
                    <!-- 已读弹窗 -->
                    <div
                        slot="footer"
                        class="dialog-footer"
                    >
                        <div class="contentBox">
                            <div class="contentTop_p">
                                <div
                                    @click="readButton()"
                                    class="topLeft"
                                >已读{{readNum}}人</div>
                                <!-- <div @click="noReadButton()" class="topRight">未读{{noReadNum}}人</div> -->
                                <div
                                    @click="noReadButton()"
                                    class="topRight"
                                >未读0人</div>
                            </div>
                            <div
                                class="contentText_p"
                                v-show="read"
                            >
                                <div
                                    class="readList"
                                    v-for="item in readListData"
                                    :key="item.lookUserHeadPhoto"
                                >
                                    <img
                                        class="readImg"
                                        :src="item.lookUserHeadPhoto"
                                    >
                                    <span class="readText">{{item.lookDepartment}}——{{item.lookUserName}}</span>
                                </div>
                            </div>
                            <div
                                class="contentText_p"
                                v-show="noRead"
                            >
                                <div class="readList">
                                    <span class="readText">暂无</span>
                                </div>
                            </div>
                            <div
                                class="contentText_p"
                                v-show="noData"
                            >
                                <div class="readList">
                                    <span class="readText">暂无数据</span>
                                </div>
                            </div>
                        </div>
                        <el-button
                            type="primary"
                            @click="back()"
                        >返回</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import { affiche_ShowList } from '@/api/api_base_S'//获取列表
import { afficheUser } from '@/api/api_base_S'//点击列表查看时触发（用于后台统计数据）
import { issueAffiche } from '@/api/api_base_S'//发布新公告
import { changeAffiche } from '@/api/api_base_S'//修改公告
import { stickAffiche } from '@/api/api_base_S'//置顶公告
import { deleteAffiche } from '@/api/api_base_S'//删除公告

export default {
    name: '',
    inject: ['reload'],
    data() {
        return {
            roofPlacementList: [],      //置顶文件
            noticeList: [],             //文件列表
            userName: '',               //当前登录人
            readListData: [],           //已读列表数据
            readNum: '',                 //已读人数
            noReadNum: '',               //未读人数
            noData: false,              //判断已读弹窗是否有数据
            currentPage: 1,              //声明分页，并默认为第一页
            total: 0,                   //默认数据总数	
            pagesize: 10,                //每页的数据
            page: 1,
            editorContent: '',           //富文本编辑器内容
            editorOption: {},
            editList: [],                //公告编辑内容
            modifyText: false,           //公告修改弹窗
            modifyTitle: '',             //修改标题
            modifyEditorContent: '',     //修改正文

            inputSearch: '',           //声明搜索框
            timeInterval: '',          //声明时间选择器
            release: false,            //发布弹窗开关
            newRelease: false,         //新公告开关
            readShow: false,           //已读弹窗开关
            read: true,                //已读列表
            noRead: false,             //未读列表
            title: '',                 //公告标题
            text: '',                  //公告内容
            previewText: false,           //公告预览内容开关
            time: Date.parse(new Date()),//声明当前系统时间
        }
    },
    filters: {                         //格式化系统当前时间
        formatDate: function (value) {
            let date = new Date(value);
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m;
        }
    },
    mounted() {
        this.createded()
    },
    methods: {
        // 初始获值
        createded() {
            let data = {
                'headlineName': '',
                'timeInterval': '',
                'page': this.page,
                'limit': this.pagesize,
            }
            this.getaffiche_ShowList(data);
        },
        //获取页面列表
        getaffiche_ShowList(data) {
            this.roofPlacementList = [];
            this.noticeList = [];
            affiche_ShowList({ 'data': data })
                .then(data => {
                    this.total = data.data.total;
                    this.userName = data.data.afficheUser;//获取带当前登陆人
                    for (var i = 0; i < data.data.afficheObject.length; i++) {
                        var element = data.data.afficheObject[i];
                        if (element.affiche.stick == 'T') {
                            this.roofPlacementList.push(element);
                        } else {
                            this.noticeList.push(element);
                        }
                    }
                })
                .catch(err => {
                    this.$message({
                        type: 'info',
                        message: '服务端异常，请稍后再试!'
                    });
                })
        },
        search() {//查询
            var time = '';
            if (!this.timeInterval || this.timeInterval == null) {
                time = ''
            } else {
                time = this.timeInterval[0] + ',' + this.timeInterval[1]
            }
            var data = {
                'headlineName': this.inputSearch,
                'timeInterval': time,
                'page': this.page,
                'limit': this.pagesize,
            }
            this.getaffiche_ShowList(data);
        },
        releaseButton() {//发布新公告
            this.newRelease = true;
        },
        sure() {//确认发布
            if (this.title.length == 0) {
                this.$message({
                    type: 'info',
                    message: '标题不能为空!'
                });
                return
            }
            if (this.editorContent == 0) {
                this.$message({
                    type: 'info',
                    message: '正文不能为空!'
                });
                return
            }
            issueAffiche(
                {
                    'data': {
                        'headline': this.title,
                        'body': this.editorContent,
                        'accessory': '',
                    }
                }
            )
                .then(data => {
                    this.previewText = false;
                    this.newRelease = false;
                    this.editorContent = ''
                    this.title = ''
                    this.createded()
                })
                .catch(err => {
                    this.$message({
                        type: 'info',
                        message: '服务端异常，请稍后再试!'
                    });
                })
        },
        readB(val) {  //已读弹窗打开按钮
            this.readListData = val.afficheLookUser;
            this.readNum = val.afficheLookUser.length;
            // this.noReadNum = val.afficheLookUser;
            if (val.afficheLookUser.length == 0) {
                this.read = false;
                this.noRead = false;
                this.noData = true;
            } else {
                this.read = true;
                this.noRead = false;
                this.noData = false;
            }
            this.readShow = true;
        },
        back() {//已读返回事件
            this.readShow = false;
        },
        handleSizeChange(size) {//pageSize 改变时会触发
            this.pagesize = size;
        },
        handleCurrentChange(currentPage) {//currentPage 改变时会触发
            this.currentPage = currentPage;
            var data = {
                'headlineName': '',
                'timeInterval': '',
                'page': currentPage,
                'limit': this.pagesize,
            }
            this.getaffiche_ShowList(data);
        },
        readButton() {//已读按钮
            if (this.readNum > 0) {
                this.read = true;
                this.noRead = false;
                this.noData = false;
            } else {
                this.read = false;
                this.noRead = false;
                this.noData = true;
            }
        },
        noReadButton() {//未读按钮
            this.read = false;
            this.noRead = true;
            this.noData = false;
        },
        editBotton(val) {//内容编辑
            this.release = true;
            this.editList = [];
            this.editList.push(val.affiche);
        },
        preview() {//预览
            this.previewText = true;
        },
        roofPlacement(val) {//置顶
            stickAffiche({                'data': {
                    'headline': val.headline,
                    'id': val.id,
                }            })
                .then(data => {
                    this.modifyText = false;
                    this.createded();
                })
                .catch(err => {
                    this.$message({
                        type: 'info',
                        message: '服务端异常，请稍后再试!'
                    });
                })
            this.release = false;
        },
        modify(val) {//修改
            this.release = false;
            this.modifyText = true;
            this.modifyTitle = val.headline;
            this.modifyEditorContent = val.body;
        },
        modifyYes(val) {//确定修改
            // if(this.modifyTitle.length == 0){
            //     this.$message({
            //         type: 'info',
            //         message: '标题不能为空!'
            //     });
            //     return 
            // }
            if (this.modifyEditorContent == 0) {
                this.$message({
                    type: 'info',
                    message: '正文不能为空!'
                });
                return
            }
            changeAffiche({                'data': {
                    'headline': this.modifyTitle,
                    'body': this.modifyEditorContent,
                    'accessory': '',
                    'id': val[0].id,
                }            })
                .then(data => {
                    this.modifyText = false;
                    this.reload();
                })
                .catch(err => {
                    this.$message({
                        type: 'info',
                        message: '服务端异常，请稍后再试!'
                    });
                })
        },
        deleteBotton(val) {//删除内容
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    deleteAffiche(
                        {
                            'data': {
                                'id': val.affiche.id,
                            }
                        }
                    )
                        .then(data => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            this.createded()
                        })
                        .catch(err => {
                            this.$message({
                                type: 'info',
                                message: '服务端异常，请稍后再试!'
                            });
                        })

                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        },
        collapse(val) {//点击内容时触发
            afficheUser({
                'data': {
                    'id': val.affiche.id
                }
            })
                .then(data => {

                })
                .catch(err => {
                    this.$message({
                        type: 'info',
                        message: '服务端异常，请稍后再试!'
                    });
                })
        },
        onEditorReady(editor) { // 准备编辑器

        },
        onEditorBlur() { }, // 失去焦点事件
        onEditorFocus() { }, // 获得焦点事件
        onEditorChange() { }, // 内容改变事件
    }
}
</script>

<style lang="scss" scoped>
.announcement_management {
    height: calc(100% - 50px);
    .wrapper {
        margin: 20px auto;
        width: 1300px;
        min-height: 100%;
        .search {
            width: 260px;
        }
        .box-card {
            margin: 10px 0px;
        }
        .textDate {
            margin: 0px 10px;
        }
        .btn_case {
            float: right;
            // margin-left: 20px;
        }
        .content {
            margin-top: 50px;
        }
        .header {
            width: 1200px;
            height: 80px;
            line-height: 70px;
        }
        .contentText {
            width: 1200px;
            height: 200px;
            overflow: auto;
            border-top: 1px solid #dddddd;
        }
        .contentText_p {
            width: 600px;
            overflow: auto;
            border-top: 1px solid #dddddd;
        }
        .contentfooter {
            width: 1100px;
            height: 30px;
            margin: 0px 50px;
            line-height: 30px;
        }
        .edit {
            font-size: 12px;
            color: #409eff;
            float: left;
        }
        .delete {
            font-size: 12px;
            color: red;
            margin: 0px 20px;
        }
        .headerButton {
        }
        .hTitle {
            font-size: 25px;
            font-weight: 600;
            margin: 10px 50px;
        }
        .listTitle {
            font-size: 18px;
            float: left;
            margin-top: 6px;
        }
        .listPublish {
            font-size: 16px;
            float: right;
            margin-top: 6px;
        }
        .open {
            float: right;
            padding: 4px 10px;
        }
        .read {
            font-size: 12px;
            color: #409eff;
            float: right;
            margin: 4px 50px;
        }
        .contentRight {
            float: right;
        }
        .contentList {
            margin: 10px 0px;
        }
        .pa_ {
            text-align: center;
            padding: 20px;
        }
        .contentBox {
            height: 50vh;
            margin: 0px auto 20px auto;
            border: 1px solid #808080;
            overflow: auto;
            .contentTop_p,
            .newContentTop {
                width: 600px;
                height: 50px;
                line-height: 50px;
                .topLeft,
                .topRight {
                    float: left;
                    color: #969696;
                }
                .topLeft {
                    width: 300px;
                    height: 50px;
                    border-right: 2px solid #808080;
                }
                .topRight {
                    width: 290px;
                    height: 50px;
                }
                .inputLeft {
                    float: left;
                    width: 300px;
                    height: 50px;
                    line-height: 50px;
                    background: url(../../../assets/img.png) no-repeat;
                    background-position: 95px 12px;
                }
                .inputRight {
                    float: left;
                    width: 290px;
                    height: 50px;
                    line-height: 50px;
                    background: url(../../../assets/video.png) no-repeat;
                    background-position: 95px 12px;
                }
            }
            .newContentTop {
                height: 157px;
                margin: 10px;
                text-align: left;
            }
            .title {
                font-size: 20px;
                font-weight: 600;
                margin-top: 20px;
            }
            .author {
                font-size: 16px;
                margin-top: 20px;
            }
            .img {
                display: block;
                width: 500px;
                height: 180px;
                margin: 20px auto;
            }
            .tontent {
                width: 550px;
                margin: 0 auto;
                font-size: 14px;
                text-align: left;
                word-wrap: break-word;
                word-break: break-all;
                overflow: hidden;
            }
            .readList {
                width: 300px;
                height: 45px;
                margin: 20px 20px;
                .readImg {
                    float: left;
                    width: 40px;
                    height: 40px;
                }
                .readText {
                    float: left;
                    width: 170px;
                    height: 40px;
                    line-height: 40px;
                    font-size: 18px;
                    color: #646464;
                    margin-left: 10px;
                    text-align: left;
                }
            }
        }
    }
}
@media screen and (max-width: 1400px) {
    .announcement_management {
        .wrapper {
            width: 99%;
        }
    }
}
@media screen and (max-width: 1160px) {
    .announcement_management {
        .wrapper {
            .btn_case {
                float: none;
                margin: 12px 0px;
            }
            .content {
                margin-top: 20px; 
            }
        }
    }
}
</style>
