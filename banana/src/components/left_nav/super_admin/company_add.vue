<template>
    <div class="company_add">
        <div class="wrapper">
            <div class="b_">
                <el-form
                    ref="form"
                    :model="form"
                    label-width="80px"
                    v-show="f"
                >
                    <el-form-item
                        label="公司名称"
                        label-width="120px"
                    >
                        <el-input
                            v-model="form.firmName"
                            placeholder="必填项"
                            class="s_"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="法人单位性质"
                        label-width="120px"
                    >
                        <el-input
                            v-model="form.firmNature"
                            class="s_"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="法人代表"
                        label-width="120px"
                    >
                        <el-input
                            v-model="form.legalName"
                            class="s_"
                            placeholder="必填项"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="联系电话"
                        label-width="120px"
                    >
                        <el-input
                            v-model="form.firmPhone"
                            class="s_"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="所属城市"
                        label-width="120px"
                    >
                        <el-input
                            v-model="form.firmRegion"
                            class="s_"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="企业地址"
                        label-width="120px"
                    >
                        <el-input
                            v-model="form.firmAddress"
                            class="s_"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="注册资金"
                        label-width="120px"
                    >
                        <el-input
                            v-model="form.registeredFund"
                            class="e_"
                        ></el-input>
                        <span class="c_">
                            万元
                        </span>
                    </el-form-item>
                    <el-form-item
                        label="注册号"
                        label-width="120px"
                    >
                        <el-input
                            v-model="form.firmNumber"
                            class="s_"
                            placeholder="必填项"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            class="n_"
                            type="primary"
                            @click="onSubmit"
                        >下一步</el-button>
                    </el-form-item>
                </el-form>
                <el-form
                    ref="form"
                    :model="form_user"
                    label-width="80px"
                    v-show="!f"
                >
                    <el-form-item
                        label="账户信息"
                        label-width="120px"
                    >
                        <el-input
                            v-model="form_user.account"
                            class="s_"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="账户密码"
                        label-width="120px"
                    >
                        <el-input
                            v-model="form_user.password"
                            type="password"
                            class="s_"
                        ></el-input>
                        <div class="m">
                            <span>
                                <i class="el-icon-warning-outline"></i>
                                密码默认为 0000
                            </span>
                        </div>
                    </el-form-item>
                    <el-form-item
                        label="确认密码"
                        label-width="120px"
                    >
                        <el-input
                            v-model="form_user.password_"
                            type="password"
                            class="s_"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="权限设置"
                        label-width="120px"
                    >
                        <el-checkbox-group
                            v-model="form_user.nul"
                            v-bind:min="1"
                        >
                            <el-checkbox
                                v-for="item_ in type_"
                                v-bind:key="item_.key"
                                v-bind:label="item_.label"
                                v-bind:name="item_.name"
                            >{{ item_.v }}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item
                        label="开通容量大小"
                        label-width="120px"
                        class="t_"
                    >
                        <div style="width: 480px;">
                            <div class="block">
                                <el-slider
                                    v-model="form_user.totalSpace"
                                    :marks="form_user.marks"
                                    v-bind:max="200"
                                    show-input
                                >
                                </el-slider>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <div class="z_">
                            <el-button
                                type="primary"
                                @click="f = !f"
                            >上一步</el-button>
                            <el-button
                                type="primary"
                                @click="Submit_again"
                            >提交</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>

import {
    comp_,
    admin_
} from '@/api/api_base'

export default {
    name: 'company_add',
    data() {
        return {
            type_: [
                {
                    key: '001',
                    v: '增、删、改、查用户信息（默认）',
                    label: 'edit_info',
                    name: 'power'
                },
                {
                    key: '002',
                    v: '开通、修改用户内存（默认）',
                    label: 'edit_memory',
                    name: 'power'
                },
                {
                    key: '003',
                    v: '访问用户文件夹',
                    label: 'overlook',
                    name: 'power'
                },
            ],
            form: {
                firmName: '',
                firmNature: '',
                legalName: '',
                firmAddress: '',
                firmPhone: '',
                firmRegion: '',
                registeredFund: '',
                firmNumber: '',
                firmKEY: 'firmKEY'
            },
            f: true,    //翻页
            form_user: {
                account: '',
                password: '0000',
                password_: '0000',
                nul: ['edit_info', 'edit_memory'],
                totalSpace: [],
                // memory: [],
                marks: {
                    0: '0GB',
                    50: '50T',
                    100: '100T',
                    150: '150T',
                    200: '200TB'
                },
                firmKEY: 'firmKEY'
            },
            firmKEY: '',
        }
    },
    methods: {
        onSubmit() {
            if (!this.form.firmName || !this.form.legalName || !this.form.firmNumber) {
                this.$message.error('必填项不可为空')
                return false
            }
            comp_({ 'data': this.form })
                .then(data => {
                    this.form.firmKEY = data.data
                    this.form_user.firmKEY = data.data
                    this.f = false
                })
        },
        Submit_again() {
            if (!this.form_user.account || !this.form_user.password || !this.form_user.password_) {
                this.$message.error('表单需填写完整')
                return false
            }
            if (this.form_user.password != this.form_user.password_) {
                this.$message.error('两次密码输入不统一')
                return false
            }
            admin_({ 'data': this.form_user })
                .then(data => {
                    if (data.data == 0) {
                        this.$message.error('添加帐号已存在，提交失败')
                    } else {
                        this.$message({
                            message: '添加成功',
                            type: 'success',
                            center: true
                        })
                        setTimeout(() => {
                            this.$router.push('/super_admin/company_list')
                        }, 1000)
                    }
                })
                .catch(err => {

                })
        }
    }
}
</script>

<style lang="scss" scoped>
.company_add {
    display: flex;
    justify-content: center;
    .wrapper {
        width: 1300px;
        padding: 20px;
        .b_ {
            padding: 40px;
            background: #eee;
            border-radius: 2px;
            .s_ {
                width: 320px;
            }
            .e_ {
                width: 250px;
            }
            .c_ {
                padding-left: 12px;
            }
            .n_ {
                //第一页【按钮位置】
                margin-left: 274px;
            }
            .z_ {
                //第二页【按钮位置】
                margin-left: 176px;
            }
            .el-checkbox {
                display: block;
            }
            .t_ {
                //开通容量item
                margin-bottom: 54px;
            }
            .m {
                position: absolute;
                left: 340px;
                top: 0px;
                color: #f40;
            }
        }
    }
}
</style>
