<template>
    <div class="login">
        <!-- 背景图片 -->
        <div class="bg"></div>
        <!-- 展示区域 -->
        <div class="login_base">
            <img
                src="@/assets/bg_build.png"
                class="bg_build"
                alt=""
                v-show="login_page"
            >
            <!-- 登录页 -->
            <div
                class="login_box"
                v-show="login_page"
            >
                <div class="login_box_bg"></div>
                <div class="login_box_form">
                    <el-form>
                        <div class="tit">
                            <p>文件系统管理分析系统</p>
                        </div>
                        <el-form-item>
                            <el-input
                                v-model="account"
                                placeholder="输入账号"
                                type="text"
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input
                                v-model="password"
                                type="password"
                                placeholder="输入密码"
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input
                                v-model="verify_input"
                                type="text"
                                placeholder="输入验证码"
                                class="verify_input"
                            ></el-input>
                            <div class="verify_mode">
                                <verify />
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                class="btn_primary"
                                v-on:click="login()"
                            >登录</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox v-model="remember_account"><span class="login_state">记住登录状态</span></el-checkbox>
                            <span
                                class="forget_password"
                                v-on:click="forget_password"
                            >忘记密码</span>
                        </el-form-item>
                        <router-link
                            to=""
                            tag="span"
                            class="rules"
                        >注意事项</router-link>
                    </el-form>
                </div>
            </div>
            <!-- 找回密码 -->
            <div
                class="login_box_get_password"
                v-bind:class="self_height"
                v-show="get_page"
            >
                <div class="login_box_bg"></div>
                <div
                    class="login_box_form import_account"
                    v-show="fir_show"
                >
                    <!-- 账号验证页 -->
                    <el-form>
                        <div class="tit_get_password">
                            <p>输入邮箱或手机号获取验证码</p>
                        </div>
                        <el-form-item>
                            <el-input
                                v-model="account_num"
                                placeholder="输入邮箱号/手机号"
                                type="text"
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                class="btn_primary_get_password"
                                v-on:click="move_back('account')"
                            >返回</el-button>
                            <el-button
                                type="primary"
                                class="btn_primary_get_password btn_password_send"
                                v-on:click="send()"
                            >发送</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div
                    class="login_box_form reset_password"
                    v-show="sec_show"
                >
                    <!-- 密码重置页 -->
                    <el-form>
                        <div class="tit_get_password">
                            <p>输入验证码及设置新密码</p>
                        </div>
                        <el-form-item>
                            <el-input
                                v-model="verify_num"
                                placeholder="输入验证码"
                                type="text"
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input
                                v-model="set_newPassWord"
                                placeholder="设置新密码"
                                type="text"
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input
                                v-model="again_nrePassWord"
                                placeholder="输入刚刚设置的新密码"
                                type="text"
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                class="btn_primary_get_password"
                                v-on:click="move_back('password')"
                            >返回</el-button>
                            <el-button
                                type="primary"
                                class="btn_primary_get_password btn_password_send"
                                v-on:click="send_set()"
                            >发送</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import verify from '@/components/verify_input'
import { mapState } from 'vuex'
import axios from 'axios'
import {
    send_account,
    send_password
} from '@/api/api_base'

export default {
    name: 'login_page',
    data() {
        return {
            account: 'cust_test',
            password: '0000',
            verify_input: '',
            remember_account: true,
            login_page: true,
            get_page: false,
            account_num: '',
            fir_show: true,
            sec_show: false,
            verify_num: '',             //修改密码填写的验证码
            return_verify_num: '',      //修改密码真正的验证码
            set_newPassWord: '',
            again_nrePassWord: '',
            self_height: 'login_account_height',
        }
    },
    computed: {
        ...mapState({
            login_: state => state.login_page
        }),
    },
    mounted() {
        this.verify_input = this.login_.verify_input
    },
    methods: {
        //登录事件
        login() {
            //表格未填写完整
            if (!this.account || !this.password || !this.verify_input) {
                if (!this.account || !this.password) {
                    this.$message.error('登录信息未填写完整')
                    return false
                } else {
                    this.$message.error('验证码未填写')
                    return false
                }
            }
            //验证码错误
            if (this.verify_input.toLowerCase() !== this.login_.verify_input) {
                this.$message.error('验证码有误,需要重新填写')
                document.querySelector('.verify').click()
                return false;
            }
            //发送AJAX  
            send_password({
                username: this.account,
                password: this.password
            })
                .then(data => {
                    if (data.data === 0) {
                        this.$message.error('账号或密码填写错误')
                        return false
                    }
                    sessionStorage.setItem('class',data.data.type)
                    sessionStorage.setItem('logIn',data.data.userId)
                    axios.defaults.headers.common['token'] = data.data.userId
                    sessionStorage.setItem('im',JSON.stringify(data.data.IM))
                    sessionStorage.setItem('offlineMessage',JSON.stringify(data.data.other))
                    this.$router.push({path:'/main_module'})
                }).catch(e => {
                    console.log('登录错误：' + e)
                })
        },
        //进入忘记密码
        forget_password() {
            this.login_page = false
            this.get_page = true
        },
        //填写账号
        send() {
            if (!this.account_num) {
                this.$message.error('需找回的账号未输入')
                return false
            }
            send_account(`data=${this.account_num}`)
                .then(data => {

                    this.fir_show = false
                    this.sec_show = true
                    this.self_height = 'verify_account_height'
                })
                .catch(err => {
                    this.$message.error('账号输入有误')
                    return false
                })
        },
        //返回到登录页
        move_back(z) {
            switch (z) {
                case 'password':
                    this.verify_num = ''
                    this.set_newPassWord = ''
                    this.again_nrePassWord = ''
                case 'account':
                    this.account_num = ''
                    break
            }
            this.login_page = true
            this.get_page = false
            this.fir_show = true
            this.sec_show = false
        },
        //设置新密码
        send_set() {
            if (!this.verify_num || !this.set_newPassWord || !this.again_nrePassWord) {
                this.$message.error('信息填写不完整')
                return false
            }
            if (this.set_newPassWord !== this.again_nrePassWord) {
                this.$message.error('两次密码输入不同')
                return false
            }
            send_password({
                newPassWord: this.set_newPassWord
            })
                .then(function (data) {
                    if (data) {
                        this.$message({
                            message: '恭喜你，修改成功',
                            type: 'success'
                        });
                        setTimeout(function () {
                            this.$router.replace('/')
                        }, 2000)
                    } else {
                        this.$message({
                            message: '修改失败,请重试',
                            type: 'warning'
                        });
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    components: {
        'verify': verify
    }
}
</script>

<style scoped>
.login,
.bg {
    width: 100%;
    height: 100%;
}
.bg {
    background-image: url("../assets/bg.jpg");
    background-size: cover;
}
.bg_build {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 560px;
    /* left: 12%; */
    /* z-index: 0; */
}
.login_box {
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translateY(-50%);
    width: 400px;
    height: 440px;
    border-radius: 6px;
    overflow: hidden;
}
.login_box_bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(#013b6e, #26a6c7);
    opacity: 0.8;
}
.verify_input,
.verify_mode {
    display: inline-block;
    width: 48%;
    height: 40px;
}
.verify_mode {
    float: right;
}
.btn_primary {
    width: 100%;
}
.tit {
    text-align: center;
}
.tit p {
    position: relative;
    color: #fff;
    font-size: 23px;
    line-height: 4em;
    font-weight: 700;
}
.forget_password {
    color: #fff;
    float: right;
    cursor: pointer;
}
.rules {
    position: absolute;
    right: 44px;
    bottom: 20px;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
}
.login_state {
    color: #fff;
}

.login_account_height {
    height: 280px;
}
.verify_account_height {
    height: 344px;
}
.login_box_get_password {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    border-radius: 6px;
    overflow: hidden;
}
.tit_get_password {
    text-align: center;
}
.login_box_bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(#013b6e, #26a6c7);
    opacity: 0.8;
}
.login_box_form {
    padding: 10px 44px;
}
.tit_get_password p {
    position: relative;
    color: #fff;
    font-size: 20px;
    line-height: 4em;
    font-weight: 700;
}
.btn_primary_get_password {
    width: 100px;
}
.btn_password_send {
    float: right;
}
.reset_password .el-form-item:nth-of-type(5),
.import_account .el-form-item:nth-of-type(3) {
    padding: 0px 34px;
}
.login_base {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1400px;
    height: 600px;
    transform: translate(-50%, -50%);
    /* background: tomato; */
}
@media screen and (max-width: 1400px) {
    .login_base {
        width: 80%;
    }
    .bg_build {
        width: 70%;
    }
}
@media screen and (max-width: 482px) {
    .login_box {
        right: 50%;
        transform: translate(50%, -50%);
    }
}
</style>
