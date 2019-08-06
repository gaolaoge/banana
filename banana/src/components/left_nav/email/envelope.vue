<template>
    <div>
        <div class="header">
            <el-button v-on:click="move('已删除')">删除</el-button>
            <el-button @click="detele_true">彻底删除</el-button>
            <el-select
                v-model="value"
                placeholder="请选择"
                @change="sign_i"
            >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
            <el-select
                v-model="value_"
                placeholder="移动至"
                @change="move"
            >
                <el-option
                    v-for="item in options_"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
            <el-button
                type="warning"
                class="b"
                @click="immediate()"
            >立即处理</el-button>
        </div>
        <div class="tit">
            <p>
                <span class="s">发件人</span>
                ：
                <span class="n">{{ envelope_text.addresserId }}</span>
            </p>
            <p>
                <span class="s">时间</span>
                ：
                <span class="n">{{ envelope_text.sendTime }}</span>
            </p>
            <div class="v">
                <!-- <el-tooltip
                    class="item"
                    effect="dark"
                    content="Top Left 提示文字"
                    placement="top-start"
                >
                    <el-button>上左</el-button>
                </el-tooltip> -->
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="添加备注"
                    placement="top-start"
                >
                    <img
                        src="@/assets/beizhu.svg"
                        alt=""
                        class="i"
                        @click="remarks_"
                    >
                </el-tooltip>
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="打印"
                    placement="top-start"
                >
                    <img
                        src="@/assets/dayin.svg"
                        alt=""
                        class="i"
                    >
                </el-tooltip>
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="归档至"
                    placement="top-start"
                >
                    <img
                        src="@/assets/guidang.svg"
                        alt=""
                        class="i"
                    >
                </el-tooltip>
            </div>
        </div>
        <article
            class="a"
            v-bind:class="{h: !quill}"
        >
            <pre
                v-html="envelope_text.emailDetails"
                class="pre_"
            >
                <!-- {{ envelope_text.emailDetails }} -->
                <!-- {{ t }} -->
            </pre>
        </article>
        <div class="in_">
            <el-input
                class="inp_"
                v-model="content_inp"
                v-on:focus="quill = true"
            ></el-input>
            <el-tooltip
                class="item"
                effect="dark"
                content="切换至正常模式"
                placement="top-start"
            >
                <div
                    class="r"
                    v-on:click="quill = true"
                >
                    <i
                        class="el-icon-edit el-input__icon"
                        slot="suffix"
                    >
                    </i>
                </div>
            </el-tooltip>
            <el-button
                class="butto_"
                v-on:click="response_"
            >提交</el-button>
        </div>
        <transition name="el-zoom-in-bottom">
            <div
                class="quill_editor"
                v-show="quill"
                v-bind:class="{'fullSreen': fullSreen}"
            >
                <quill-editor
                    v-model="content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)"
                    class="q"
                >
                </quill-editor>
                <div class="bt_">
                    <!-- <button v-on:click="saveHtml">保存</button> -->
                    <el-button
                        v-on:click="quill = false"
                        class="back_quill"
                    >返回</el-button>
                    <el-button
                        v-on:click="fullSreen = true"
                        v-show="fullSreen != true"
                    >输入框全屏展开</el-button>
                    <el-button
                        v-on:click="fullSreen = false"
                        v-show="fullSreen == true"
                    >收缩输入框</el-button>
                    <el-button v-on:click="response_">提交 </el-button>
                </div>
            </div>
        </transition>
        <!-- {{ envelope_text }} -->
        <div
            class="nav"
            v-bind:class="{nav_: quill}"
        >
            <span>
                上一封
                <span>
                    {{  }}
                </span>
            </span>
            <span>下一封</span>
        </div>
        <!-- 弹窗 -->
        <el-dialog
            title="修改"
            :visible.sync="open_dialog"
            width="30%"
            append-to-body="true"
        >
            <el-form :model="change_limit">
                <el-form-item
                    label="账户："
                    label-width="130px"
                >
                    <el-input
                        v-bind:value="change_limit.account"
                        style="width: 217px;"
                        disabled
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="当前分配额度："
                    label-width="130px"
                >
                    <el-input
                        v-bind:value="change_limit.totalSpace"
                        style="width: 217px;"
                        disabled
                    >
                        <template slot="append">GB</template>
                    </el-input>
                </el-form-item>
                <el-form-item
                    label="添加额度："
                    label-width="130px"
                >
                    <el-input
                        v-model="space"
                        style="width: 117px;"
                        @input="space=space.replace(/[^\d]/g,'')"
                    >
                    </el-input>
                    <el-select
                        v-model="MGT"
                        style="width: 96px;"
                    >
                        <el-option
                            label="MB"
                            value="MB"
                        >
                        </el-option>
                        <el-option
                            label="GB"
                            value="GB"
                        >
                        </el-option>
                        <el-option
                            label="TB"
                            value="TB"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button
                    type="primary"
                    @click="add_more"
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>    

import {
    message_response,
    delete_and_move,
    delete_t,
    sign_already,
    immediate_treatment,
    pu
} from '@/api/api_base'

export default {
    name: '',
    data() {
        return {
            space: 0,
            MGT: 'MB',
            change_limit: {},                  //弹窗回显
            open_dialog: false,                  //弹窗显示
            fullSreen: false,
            quill: false,
            content: ``,
            content_inp: ``,
            editorOption: {},
            value: '',
            value_: '',
            options: [{
                value: '已读',
                label: '已读'
            }, {
                value: '未读',
                label: '未读'
            }, {
                value: '标星',
                label: '标星'
            }],
            // options_: [],
            show_index: null,             //显示数据是第几位
            // data_list: null               //数据数组长度
            // previous_: {},                 //上一组数据
            // next_: null                    //下一组数据
        }
    },
    props: {
        envelope_text: {                  //选中数据
            type: Object,
            required: true
        },
        options_: {                       //自定义文件夹
            type: Array,
            required: true
        },
        all_data: {                       //全部数据
            type: Array,
            required: true
        }
    },
    watch: {
        content: function (n) {
            this.content_inp = n.replace(/<\/?\w\W*>/g, '')
        },
        envelope_text: function(n){
            this.show_index = n.index
        },
        // all_data: {
        //     immediate: true,
        //     handler: n => {
        //         this.previous_ = n
        //     }
        // }
        
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
        previous_() {
            // let f = this.show_index - 1
            // return this.all_data[this.show_index - 1]
            // return this.all_data[f]
            // return this.all_data[0]
        }
    },
    methods: {
        //添加备注
        remarks_(){
            // console.log(this.show_index - 1)
            // console.log(this.previous_)
            // console.log(this.next_)
            // console.log(this.previous_)
        },
        //添加额度
        add_more(){
            let self_ = this
            pu({'account': this.change_limit.account,'oldValue':this.change_limit.KBTotal,'value': this.space,'unit': this.MGT})
                .then(data => {
                    if(data.data == 1){
                        self_.$message({
                            message: '操作成功',
                            type: 'success'
                        })
                        self_.open_dialog = false
                    }
                })
        },
        //立即处理
        immediate() {
            let self_ = this
            self_.open_dialog = true
            immediate_treatment({ 'data': self_.envelope_text.id })
                .then(data => {
                    // console.log(data)
                    self_.change_limit = data.data
                    // self_.change_limit.KBTotal = 'oldValue'
                    console.log(self_.change_limit)
                })
                .catch(err => {

                })
        },
        //标记为
        sign_i(v) {
            let t = [],
                self_ = this
            t.push(self_.envelope_text.id)
            console.log({ 'data': t, 'action': v })
            sign_already({ 'data': t, 'action': v })
                .then(data => {
                    if (data.data == 1) {
                        self_.$message({
                            message: '标记成功',
                            type: 'success'
                        })
                        // self_.inbox_count()
                        // self_.labeled_ = ''
                        self_.$emit('reset_')
                    }
                })
                .catch(err => {

                })
        },
        //彻底删除
        detele_true() {
            let self_ = this,
                arr = []
            this.$confirm('此操作不可回退, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    arr.push(self_.envelope_text)
                    delete_t({ 'data': arr })
                        .then(data => {
                            if (data.data == 1) {
                                self_.$message({
                                    message: '删除成功',
                                    type: 'success',
                                    center: true
                                })
                                self_.$emit('reset')
                            }
                        })
                        .catch(err => {

                        })
                })
                .catch(err => {
                    alert(err)
                    self_.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

        },
        onEditorReady(editor) { // 准备编辑器
        },
        onEditorBlur() { }, // 失去焦点事件
        onEditorFocus() { }, // 获得焦点事件
        onEditorChange() { }, // 内容改变事件
        saveHtml: function (event) {
            alert(this.content);
        },
        // 消息回复
        response_() {
            if (!this.content_inp) {
                this.$message.error('没有回复内容')
                return false
            }
            let self_ = this
            message_response({ 'data': this.content, 'id': this.envelope_text.id })
                .then(data => {
                    if (data.data == 1) {
                        self_.fullSreen = false
                        self_.content = ''
                        self_.content_inp = ''
                        self_.$message({
                            message: '回复成功',
                            type: 'success'
                        })
                    }
                })
                .catch(err => {

                })
        },
        //移动至
        move(destination) {
            let self_ = this,
                arr = [],
                destination_ = destination || null
            arr.push(self_.envelope_text)
            if (destination == '已删除') {
                this.$confirm('确认删除此条消息??', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(data => {
                        g()
                    })
            } else {
                destination_ = self_.value_
                g()
            }
            function g() {
                delete_and_move({ 'data': arr, 'destination': destination_ })
                    .then(data => {
                        // console.log(data)
                        self_.$message({
                            message: '操作成功',
                            type: 'success'
                        })
                        if (destination == '已删除') {
                            self_.$emit('reset')
                        }
                    })
            }
        },
    }
}
</script>

<style scoped lang="scss">
.header {
    background-color: #2d5c8d;
    padding: 10px;
    .b {
        float: right;
    }
}
.tit {
    background-color: #92cbed;
    padding: 20px;
    p {
        color: #fff;
        font-size: 17px;
        line-height: 2em;
        font-weight: 600;
        .s {
            display: inline-block;
            width: 70px;
            text-align-last: justify;
        }
        .n {
            padding-left: 10px;
        }
    }
    .v {
        float: right;
        margin-top: -18px;
        .i {
            width: 26px;
            cursor: pointer;
            margin-left: 6px;
        }
    }
}
.a {
    line-height: 2.2em;
    text-indent: 0em;
    padding: 10px;
    margin-top: 10px;
    // border: 1px solid #000;
    overflow-y: scroll;
    height: 360px;
    // height: 504px;
    transition: height 0.2s;
    user-select: none;
}
.a.h {
    height: 504px;
}
.a::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}
.a::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(102, 89, 89, 0.2);
    background: #9e9797;
}
.a::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(138, 129, 129, 0.2);
    border-radius: 10px;
    background: rgb(226, 221, 221);
}
.in_,
.quill_editor {
    position: absolute;
    width: 97%;
    bottom: 62px;
    .inp_ {
        width: 90%;
    }
    .butto_ {
        float: right;
        width: 120px;
    }
    .r {
        position: absolute;
        right: 11%;
        bottom: 0px;
        cursor: pointer;
    }
}
.quill_editor {
    background: #fff;
    height: 190px;
    transition: height 0.2s;
    .q {
        height: 100px;
        transition: height 0.2s;
        // overflow-y: auto;
        resize: none;
    }
    .bt_ {
        text-align: right;
        margin-top: 52px;
    }
}
.fullSreen.quill_editor {
    height: 760px;
    .q {
        height: 670px;
    }
}
.nav {
    border-top: 1px solid #ddd;
    margin-top: 68px;
    span {
        font-size: 16px;
        line-height: 2.6em;
        cursor: pointer;
    }
    span:hover {
        color: #92cbed;
    }
    span:nth-of-type(2) {
        float: right;
    }
}
.nav.nav_ {
    margin-top: 212px;
}
.back_quill {
    float: left;
}
.pre_ {
    white-space: pre-line;
}
</style>
