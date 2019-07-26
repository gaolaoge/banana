<template>
    <div>
        <div class="header">
            <el-button>返回</el-button>
            <el-button>回复</el-button>
            <el-button>删除</el-button>
            <el-button>彻底删除</el-button>
            <el-select
                v-model="value"
                placeholder="请选择"
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
            <pre>{{ envelope_text.emailDetails }}{{ t }}</pre>
        </article>
        <div class="in_">
            <el-input
                class="inp_"
                v-model="content"
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
            <el-button class="butto_">提交</el-button>
        </div>
        <transition name="el-zoom-in-bottom">
            <div
                class="quill_editor"
                v-show="quill"
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
                    <el-button v-on:click="quill = false">切换回快捷模式</el-button>
                    <el-button>提交 </el-button>
                </div>
            </div>
        </transition>
        <!-- {{ envelope_text }} -->
        <div
            
            class="nav"
            v-bind:class="{nav_: quill}"
        >
            <span>上一封</span>
            <span>下一封</span>
        </div>
    </div>
</template>

<script>    
export default {
    name: '',
    data() {
        return {
            quill: false,
            content: `<p>hello world</p>`,
            editorOption: {},
            value: '',
            value_: '',
            options: [{
                value: 'Y',
                label: '已读'
            }, {
                value: 'N',
                label: '未读'
            }, {
                value: 'star',
                label: '标星'
            }],
            options_: [{
                value: '自定义箱1',
                label: '自定义箱'
            }, {
                value: '自定义箱2',
                label: '自定义箱'
            }, {
                value: '自定义箱3',
                label: '自定义箱'
            }],
            t:
                `7月19日，国家邮政局官方网站对外发布《智能快件箱寄递服务管理办法》。

封面新闻记者注意到，根据该管理办法，智能快件箱使用企业使用智能快件箱投递快件，应当征得收件人同意；
收件人不同意使用智能快件箱投递快件的，智能快件箱使用企业应当按照快递服务合同约定的名址提供投递服务。

据了解，该办法将自2019年10月1日起施行国家邮政局有关负责人介绍，
实践中，智能快件箱以其时间配置灵活、时效性高、私密性强等特点，逐步发展成为我国城市快递末端服务的重要组成部分。

与此同时，智能快件箱寄递服务也存在着一些亟需解决的问题，
如涉及的寄递流程较为复杂、操作环节较多、相关企业责任划分不清晰、收投服务不规范、用户权益难以得到充分保障、存在一定的安全隐患等。

在此情况下，原有制度安排已不能满足智能快件箱寄递服务发展需求，有必要制定部门规章，理顺法律关系，
明确服务规则、把好安全底线，促进快递末端服务持续健康发展，不断满足人民群众对智能快件箱寄递服务的新期待。

为此，国家邮政局于2017年5月启动《智能快件箱寄递服务管理办法》制定工作，先后多次组织企业座谈、实地调研、专家研讨，并在起草过程中充分征求了相关企业、协会的意见建议。
2018年1月，《智能快件箱寄递服务管理办法（征求意见稿）》通过中国政府法制信息网、交通运输部网站、国家邮政局网站公开征求意见。
在此基础上，国家邮政局局长办公会议于2019年3月19日决定将《智能快件箱寄递服务管理办法（送审稿）》提请交通运输部审议。
6月12日，交通运输部部务会议审议通过。

据了解，《办法》根据企业从事的服务环节，将提供智能快件箱寄递服务的企业细化为智能快件箱运营企业、智能快件箱使用企业，
要求运营企业和使用企业具备与快件收寄、投递业务相适应的服务能力。规定运营企业、使用企业符合快递业务经营许可条件的，按照有关规定申请快递业务经营许可。

《办法》规定了收件人的相关权利，以及智能快件箱运营企业、使用企业的相关义务。
要求企业使用智能快件箱投递快件应征得收件人同意，投递快件后应及时通知收件人。

此外，《办法》紧密衔接收寄验视、实名收寄、过机安检三项制度。
明确了企业在监控设备安装、寄件人身份查验、物品信息登记等方面的主体责任。
细化了邮政管理部门的监督管理职责，并对企业违反相关规定的行为设置了相应法律责任。`
        }
    },
    props: {
        envelope_text: {
            type: Object,
            required: true
        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
    },
    methods: {
        onEditorReady(editor) { // 准备编辑器
        },
        onEditorBlur() { }, // 失去焦点事件
        onEditorFocus() { }, // 获得焦点事件
        onEditorChange() { }, // 内容改变事件
        saveHtml: function (event) {
            alert(this.content);
        }
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
    .q {
        height: 100px;
        // overflow-y: auto;
        resize: none;
    }
    .bt_ {
        text-align: right;
        margin-top: 52px;
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
</style>
