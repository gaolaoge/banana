<template>
    <div class="new_email">
        <div class="wrapper">
            <div class="write">
                <el-form
                    ref="form"
                    :model="form"
                    class="f"
                >
                    <el-form-item label="收件人">
                        <el-input
                            v-model="form.name"
                            placeholder="右侧通讯录内选择"
                            readonly
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="主题">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="正文">

                    </el-form-item>
                    <quill-editor
                        v-model="form.text_"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)"
                        class="q"
                    >
                    </quill-editor>
                    <div class="a">
                        <el-button @click="release">发布</el-button>
                        <el-button @click="release('草稿')">存草稿</el-button>
                    </div>
                </el-form>
            </div>
            <div class="usersList">
                <div class="select_list">
                    <header class="header_">通讯录</header>
                    <ul>
                        <li
                            v-for="li_ in part_list"
                            :key="li_"
                            class="k"
                            @click="drawer_(li_)"
                        >
                            {{ li_ }}
                        </li>
                    </ul>
                </div>
                <div class="select_list sec">
                    <header class="header_">近期联系人</header>
                    <article class="z">
                        <!-- {{ user_default }} -->
                        <el-checkbox-group
                            v-model="user_default"
                            @change="val => handleCheckedCitiesChange(val,'user')"
                        >
                            <el-checkbox
                                class="t"
                                v-for="u in user"
                                :label="u.id"
                                :key="u.id"
                            >
                                {{ u.name }}
                            </el-checkbox>
                        </el-checkbox-group>
                        <!-- <el-checkbox-group
                            v-model="checkedCities"
                            @change="handleCheckedCitiesChange"
                        >
                            <el-checkbox
                                v-for="city in cities"
                                :label="city.id"
                                :key="city.id"
                                class="r"
                            >{{city.name}}</el-checkbox>
                        </el-checkbox-group> -->
                    </article>
                </div>
            </div>
        </div>
        <!-- 抽屉 -->
        <el-dialog
            title="选择收件人"
            :visible.sync="drawer"
            width="20%"
        >
            <!-- <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
            >全选</el-checkbox> -->
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group
                v-model="checkedCities"
                @change="val => handleCheckedCitiesChange(val,'all')"
            >
                <el-checkbox
                    v-for="city in cities"
                    :label="city.id"
                    :key="city.id"
                    class="r"
                >{{city.name}}</el-checkbox>
            </el-checkbox-group>
            <!-- <div class="b">
                <el-button class="n">确定</el-button>
                <el-button class="n">取消</el-button>
            </div> -->
        </el-dialog>
    </div>
</template>

<script>

import {
    send_new_email,
    catch_email,
    draft_email
} from '@/api/api_base'

export default {
    name: 'new_email',
    data() {
        return {
            cities: [],
            checkedCities: [],                      //员工全部选中项
            isIndeterminate: false,
            checkAll: false,
            drawer: false,                          // 抽屉
            part_list: [],                          // 通讯录组
            users: [],                              // 全部人员
            df: '',                                 // 当先选中部门
            editorOption: {},
            form: {
                name: '',
                title: '',
                text_: ''
            },
            user: [],
            user_default: [],                      //最近联系人全部选中项
            default_name_all: '',
            default_name_c: ''
        }
    },
    methods: {
        //发布
        release() {
            let u = {
                'name': [...this.checkedCities, ...this.user_default],
                'tit': this.form.title,
                'text': this.form.text_
            },
                self_ = this
            if (arguments[0] == '草稿') {
                if (u['name'].length || u['tit'] || u['text']) {
                    draft_email({ 'data': u })
                        .then(data => {
                            // if (data.data == '成功') {
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                })
                                setTimeout(function () {
                                    self_.$router.push('/message_center/inbox?state=draft_box')
                                }, 1000)
                            // }
                        })
                } else {
                    this.$message.error('暂无数据可以保存')
                }
                return false
            }
            if (!this.form.name) {
                this.$message.error('收件人未填写')
                return false
            }
            if (!this.form.title) {
                this.$message.error('主题未填写')
                return false
            }
            if (!this.form.text_) {
                this.$message.error('正文未填写')
                return false
            }
            send_new_email({ 'data': u })
                .then(data => {
                    if (data.data == '发送成功') {
                        this.$message({
                            message: '发送成功',
                            type: 'success'
                        })
                        setTimeout(function () {
                            self_.$router.push('/message_center/inbox?state=inbox')
                        }, 1000)
                    }
                })
        },
        // handleCheckAllChange(val) {
        //     this.checkedCities = val ? this.cities : []
        //     this.isIndeterminate = false
        // },
        // h(value) {
        //     this.user_default = value
        // },
        handleCheckedCitiesChange(value, m) {
            // alert(value)
            let self_ = this,
                t = []
            value.forEach(currentVal => {
                let u = self_.users.find(curr_ => {
                    return curr_.id == currentVal
                })
                t.push(u.name)
            })
            // alert(m)
            if (m == 'user') {
                this.default_name_c = t.join(' ')
            } else {
                this.default_name_all = t.join(' ')
            }
            this.form.name = this.default_name_c + ' ' + this.default_name_all

            let checkedCount = value.length
            this.checkAll = checkedCount === this.cities.length
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
        },
        //点击通讯录
        drawer_(l) {
            let self_ = this
            self_.df = l
            self_.cities = []
            JSON.parse(sessionStorage.getItem('employees'))[l].forEach(currentVal => {
                self_.cities.push({
                    'name': currentVal.userName,
                    'id': currentVal.id
                })
            })
            this.drawer = true
        },
        onEditorBlur() {

        },
        onEditorFocus() {

        },
        onEditorChange() {

        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
    },
    created() {
        let self_ = this
        Object.keys(JSON.parse(sessionStorage.getItem('employees'))).forEach(currentVal => {
            self_.part_list.push(currentVal)
            // this.part_list_users[currentVal] = []
            JSON.parse(sessionStorage.getItem('employees'))[currentVal].forEach(c => {
                self_.users.push({
                    'name': c.userName,
                    'id': c.id
                })
            })
        })
        catch_email()
            .then(data => {
                // this.user = data.data
            })
    }
}
</script>

<style lang="scss" scoped>
.new_email {
    height: calc(100% - 80px);
    .wrapper {
        margin: 0px auto;
        width: 1300px;
        display: flex;
        height: 100%;
        min-height: 340px;
        .write {
            flex-grow: 1;
            box-shadow: 1px 1px 4px 1px #eee;
        }
        .usersList {
            display: flex;
            flex-flow: column;
            width: 320px;
            background: rgb(245, 245, 245);
            box-shadow: 3px 3px 4px 1px #eee;
            align-content: flex-start;
            .select_list {
                flex-grow: 0;
                text-align: center;
                padding: 0px 8px;
                .header_ {
                    line-height: 3.2em;
                    font-weight: 600;
                }
                .k {
                    list-style: none;
                    background: #bbb;
                    color: #fff;
                    line-height: 2.6em;
                    font-size: 13px;
                    margin-bottom: 2px;
                    cursor: pointer;
                    transition: all 0.1s;
                }
                .k:hover {
                    background: #ccc;
                }
            }
            .select_list.sec {
                flex-grow: 1;
                overflow: hidden;
                .z {
                    background: #fff;
                    border: 1px solid #666;
                    height: calc(100% - 60px);
                    overflow-y: scroll;
                    .t {
                        list-style: none;
                        line-height: 2.2em;
                        text-align: left;
                        padding: 0px 18px;
                        font-size: 15 px;
                        display: block;
                    }
                }
                .z::-webkit-scrollbar {
                    /*滚动条整体样式*/
                    width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
                    height: 8px;
                }
                .z::-webkit-scrollbar-thumb {
                    /*滚动条里面小方块*/
                    border-radius: 10px;
                    -webkit-box-shadow: inset 0 0 5px rgba(102, 89, 89, 0.2);
                    background: #9e9797;
                }
                .z::-webkit-scrollbar-track {
                    /*滚动条里面轨道*/
                    -webkit-box-shadow: inset 0 0 5px rgba(138, 129, 129, 0.2);
                    border-radius: 10px;
                    background: rgb(226, 221, 221);
                }
            }
        }
        .usersList,
        .write {
            margin: 10px;
            height: 100%;
            border: 1px solid #eee;
        }
    }
}
/deep/ .el-form-item__label {
    width: 80px;
}
.el-input {
    width: 90%;
}
.quill-editor {
    width: 90%;
    margin-left: 80px;
    border-radius: 2px;
    overflow: hidden;
    margin-top: -60px;
}
/deep/ .ql-toolbar.ql-snow + .ql-container.ql-snow {
    height: calc(100vh - 440px);
    min-height: 40px;
    // height: 100%;
}
.f {
    padding: 28px 0px;
}
.a {
    float: right;
    margin: 20px;
}
.r {
    line-height: 2em;
}
.b {
    margin-top: 20px;
    height: 20px;
    .n {
        float: right;
        margin: 0px 8px;
    }
}
@media screen and (max-width: 1400px) {
    .new_email {
        .wrapper {
            width: 99%;
            .el-input,
            .quill-editor {
                width: calc(100% - 100px);
            }
        }
    }
}
</style>
