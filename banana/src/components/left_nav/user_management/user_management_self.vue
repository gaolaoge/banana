<template>
    <div class="user_management_self">
        <div class="container">

            <div class="main_form">
                <el-form
                    ref="form"
                    :model="form"
                    label-width="80px"
                >
                    <div class="info_of_form">
                        <div
                            class="fir"
                            v-show="this.show_step == 'fir'"
                        >
                            <el-form-item label="账户：">
                                <el-input
                                    v-model="form.account"
                                    readonly=true
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="姓名：">
                                <el-input v-model="form.adminName"></el-input>
                            </el-form-item>
                            <el-form-item label="电话：">
                                <el-input v-model="form.adminPhone"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱：">
                                <el-input v-model="form.adminEmail"></el-input>
                            </el-form-item>
                            <el-form-item label="部门：">
                                <el-select
                                    v-model="form.adminDepartment"
                                    placeholder="请选择活动区域"
                                >
                                    <el-option
                                        v-for="li_ in options"
                                        :key="li_.label"
                                        :label="li_.label"
                                        :value="li_.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button
                                    type="primary"
                                    @click="send"
                                >下一步</el-button>
                            </el-form-item>
                            <!-- 图片上传 -->
                            <section class="p-user-data">
                                <img
                                    :src="login_head.imgSrc"
                                    @click="changeShowState"
                                >
                            </section>
                        </div>
                        <div
                            class="sec"
                            v-show="this.show_step == 'sec'"
                        >
                            <el-form-item
                                label="请输入原密码："
                                label-width="184px"
                            >
                                <el-input
                                    v-model="form2.old_password"
                                    type="password"
                                    style="width: 300px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="请输入新密码："
                                label-width="184px"
                            >
                                <el-input
                                    v-model="form2.new_password"
                                    type="password"
                                    style="width: 300px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="再次输入新密码："
                                label-width="184px"
                            >
                                <el-input
                                    v-model="form2.again_password"
                                    type="password"
                                    style="width: 300px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button
                                    type="primary"
                                    @click="send_again"
                                    style="margin-left: 105px;"
                                >下一步</el-button>
                            </el-form-item>
                        </div>
                        <div
                            class="thi"
                            v-show="this.show_step == 'thi'"
                        >
                            <el-form-item
                                label="请输入二级管理密码："
                                label-width="184px"
                            >
                                <el-input
                                    v-model="form3.old_password"
                                    type="password"
                                    style="width: 300px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="请再次输入新密码："
                                label-width="184px"
                            >
                                <el-input
                                    v-model="form3.new_password"
                                    type="password"
                                    style="width: 300px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="请再次输入新密码："
                                label-width="184px"
                            >
                                <el-input
                                    v-model="form3.new_password_again"
                                    type="password"
                                    style="width: 300px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button
                                    type="primary"
                                    @click="send_more"
                                    style="margin-left: 105px;"
                                >完成</el-button>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
            </div>
            <div class="hint">
                <el-steps
                    :active="this.hint.state"
                    finish-status="success"
                    v-bind:direction="direction"
                >
                    <el-step
                        title="步骤1"
                        description="修改账户信息"
                        icon="el-icon-picture"
                    ></el-step>
                    <el-step
                        title="步骤2"
                        description="修改密码"
                        icon="el-icon-edit"
                    ></el-step>
                    <el-step
                        title="步骤3"
                        description="修改2级密码"
                        icon="el-icon-menu"
                    ></el-step>
                </el-steps>
            </div>
            <div class="caution">
                <p v-show="this.show_step == 'fir'">
                    <span class="t">
                        *电话：
                    </span>
                    <span class="c">
                        填写真实有效（可拨通）电话号码，此号码将作为找回密码的重要凭证
                    </span>
                </p>
                <p v-show="this.show_step == 'fir'">
                    <span class="t">
                        *邮箱：
                    </span>
                    <span class="c">
                        填写真实有效（可接收邮件）邮箱，此地址将作为找回密码的重要凭证
                    </span>
                </p>
                <p v-show="this.show_step == 'sec'">
                    <span class="t">
                        *初始密码：
                    </span>
                    <span class="c">
                        初始密码为000000请修改密码，并记住所修改密码，如若忘记密码请联系超级管理员
                    </span>
                </p>
                <p v-show="this.show_step == 'thi'">
                    <span class="t">
                        *二级管理密码：
                    </span>
                    <span class="c">
                        用于管理员删除,修改等操作使用,初始密码8888,若无需更改可直接选择完成
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>

import AvatarCutter from '@/components/avatar-cutter'
import { mapState, mapMutations } from 'vuex'
import {
    personal_message_center,
    personal_message_send,
    personal_password_send
} from '@/api/api_base'

export default {
    name: 'user_management_self',
    data() {
        return {
            form: {
                account: '',
                adminName: '',
                adminPhone: '',
                adminEmail: '',
                adminDepartment: '',
            },
            form2: {
                old_password: '',
                new_password: '',
                again_password: ''
            },
            form3: {
                old_password: '',
                new_password: '',
                new_password_again: ''
            },
            direction: 'horizontal',
            hint: {
                state: 0
            },
            show_step: 'fir',
            options: [],            //部门
        }
    },
    components: {
        "avatar-cutter": AvatarCutter,
    },
    computed: {
        ...mapState(['login_head'])
    },
    mounted() {
        this.window_size()
        window.onresize = () => {
            this.window_size()
        }
    },
    watch: {

    },
    methods: {
        ...mapMutations(['changeShowState']),
        //第三步
        send_more() {
            if (!this.form3.new_password && !this.form3.new_password_again && !this.form3.old_password) {
                this.$message({
                    message: '即将跳转',
                    type: 'success',
                    center: true
                })
                setTimeout(() => {
                    this.$router.push('/platform_management')
                }, 2000)
                return false
            }
            if (!this.form3.new_password || !this.form3.new_password_again || !this.form3.old_password) {
                this.$message({
                    message: '需要完整填写内容',
                    type: 'warning',
                    center: true
                })
                return false
            }
            if (this.form3.new_password !== this.form3.new_password_again) {
                this.$message({
                    message: '两次新密码输入不唯一',
                    type: 'warning',
                    center: true
                })
                return false
            }
            let s = {
                'old_password': this.form3.old_password,
                'new_password': this.form3.new_password,
                'password_type': 'secondary_password'
            }
            personal_password_send(s)
                .then(data => {

                    if (data.data === 0) {
                        this.$message({
                            message: '原始密码填写错误',
                            type: 'error',
                            center: true

                        })
                        return false
                    }
                    this.$message({
                        message: '修改成功',
                        type: 'success',
                        center: true

                    })
                    this.$router.push('/platform_management')
                })
        },
        //第二步
        send_again() {
            if (!this.form2.new_password || !this.form2.new_password || !this.form2.again_password) {
                this.$message({
                    message: '需要完整填写内容',
                    type: 'warning',
                    center: true
                })
                return false
            }
            if (this.form2.new_password !== this.form2.again_password) {
                this.$message({
                    message: '两次新密码输入不唯一',
                    type: 'warning',
                    center: true
                })
                return false
            }
            let s = {
                'old_password': this.form2.old_password,
                'new_password': this.form2.new_password,
                'password_type': 'primary_password'
            }
            personal_password_send(s)
                .then(data => {
                    if (data.data == 0) {
                        this.$message({
                            message: '密码错误',
                            type: 'error',
                            center: true

                        })
                        return false
                    }
                    this.$message({
                        message: '修改成功',
                        type: 'success',
                        center: true

                    })
                    this.hint.state = 2
                    this.show_step = 'thi'
                })
                .catch(err => {
                    this.$message.error('提交失败')
                    this.hint.state = 1
                    this.show_step = 'sec'
                })
        },
        //下一步
        send() {
            let s = {
                'name': this.form.adminName,
                'phone': this.form.adminPhone,
                'email': this.form.adminEmail,
                'department': this.form.adminDepartment,
                'headPortrait': this.login_head.imgSrc
            }
            personal_message_send(s)
                .then(data => {
                    this.$message({
                        message: '提交成功',
                        type: 'success',
                        center: true
                    })
                    this.hint.state = 1
                    this.show_step = 'sec'
                })
                .catch(err => {
                    this.$message.error('提交失败')
                })
        },
        //步骤条布局
        window_size() {
            if (document.documentElement.clientWidth < 1300) {
                this.direction = "vertical"
            } else {
                this.direction = "horizontal"
            }
        }
    },
    created() {
        //获取已存信息
        personal_message_center()
            .then(data => {
                this.form = data.data[0]
                if (data.data[0].headPortrait !== '') {
                    this.$store.commit('change_head', data.data[0].headPortrait)
                }
            })

        //获取部门
        const self_ = this
        Object.keys(JSON.parse(sessionStorage.getItem('employees'))).forEach(currentVal => {
            self_.options.push({
                'value': currentVal,
                'label': currentVal
            })
        })
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding-top: 60px;
    width: 1200px;
    height: calc(100vh - 160px);
    margin-left: 50%;
    transform: translateX(-50%);

    .main_form {
        position: relative;
        padding-top: 40px;
        top: 6vh;
        background-color: #f2f2f2;
        display: inline-block;
        width: 54%;
        box-shadow: 7px 7px 4px 0px #bbb;
        vertical-align: top;

        .info_of_form {
            width: 54%;
        }
    }

    .hint {
        display: inline-block;
        width: 45%;
        margin-top: 250px;

        .el-steps {
            margin-left: 60px;
        }
    }

    .caution {
        margin-top: 220px;
        font-size: 12px;
        padding-left: 60px;

        .t {
            color: #f40;
            padding-right: 10px;
            line-height: 2.4em;
        }
    }
    @media screen and (max-width: 1300px) {
        width: 90%;
        font-size: 0px;

        .main_form {
            width: 80%;
        }
        .hint {
            width: 20%;
            height: 472px;
            margin-top: 4vh;
        }
        .caution {
            margin-top: 10px;
        }
    }
}

// 头像上传
.p-user-data {
    position: absolute;
    top: 40px;
    right: 20px;
    // margin: 50px;
    padding: 20px;
    text-align: center;
    background-color: #ddd;
    img {
        display: block;
        width: 200px;
        height: 200px;
        cursor: pointer;
    }
}
</style>
