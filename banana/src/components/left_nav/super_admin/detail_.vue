<template>
    <div class="detail_">
        <div class="wrapper">
            <article class="f">
                <header>
                    <h5 class="title">
                        公司基本信息:
                    </h5>
                </header>
                <el-form
                    ref="form"
                    :model="form"
                    label-width="100px"
                >
                    <el-form-item label="公司名称">
                        <el-input
                            v-model="form.enterpriseName"
                            :readonly="detail_e.type == 'check'"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="所属地区">
                        <el-input
                            v-model="form.firmRegion"
                            :readonly="detail_e.type == 'check'"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="法人单位性质">
                        <el-input
                            v-model="form.firmNature"
                            :readonly="detail_e.type == 'check'"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="注册资金">
                        <el-input
                            v-model="form.registeredFund"
                            :readonly="detail_e.type == 'check'"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="法人代表">
                        <el-input
                            v-model="form.legalName"
                            :readonly="detail_e.type == 'check'"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="注册号">
                        <el-input
                            v-model="form.firmNumber"
                            :readonly="detail_e.type == 'check'"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input
                            v-model="form.firmPhone"
                            :readonly="detail_e.type == 'check'"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input
                            v-model="form.firmAddress"
                            :readonly="detail_e.type == 'check'"
                        >
                        </el-input>
                    </el-form-item>
                </el-form>
            </article>
            <article class="f">
                <header>
                    <h5 class="title">
                        企业管理员信息:
                    </h5>
                </header>
                <el-form
                    ref="form"
                    :model="form2"
                    label-width="146px"
                >
                    <el-form-item label="部门">
                        <el-select
                            v-model="form2.adminDepartment"
                            disabled
                        >
                            <el-option
                                v-for="item in part"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="账户密码">
                        <el-input
                            v-model="form2.password"
                            type="password"
                            show-password
                            readonly
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input
                            v-model="form2.adminName"
                            readonly
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="账户信息">
                        <el-input
                            v-model="form2.account"
                            readonly
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="权限设置">
                        <el-checkbox-group
                            v-model="form2.nul"
                            :min="1"
                        >
                            <el-checkbox
                                v-for="item_ in type_"
                                :key="item_.key"
                                :label="item_.label"
                                :name="item_.name"
                            >{{ item_.v }}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="开通容量大小（TB）">
                        <div style="width: 480px;
                                    padding-left: 10px;">
                            <div class="block">
                                <el-slider
                                    v-model="form2.totalSpace"
                                    :marks="form2.marks"
                                    :max="200"
                                    :min="form2.usedSpace"
                                    show-input
                                    :disabled="detail_e.type == 'check'"
                                >
                                </el-slider>
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
            </article>
            <el-button
                class="c"
                type="primary"
                v-on:click="p"
            >完成</el-button>
        </div>

    </div>
</template>

<script>

import {
    detail_G,
    detail_P
} from '@/api/api_base'
import { mapState } from 'vuex'

export default {
    name: 'detail_',
    data() {
        return {
            form: {
                enterpriseName: '',
                firmRegion: '',
                firmNature: '',
                registeredFund: '',
                legalName: '',
                firmNumber: '',
                firmPhone: ''
            },
            form2: {
                adminDepartment: '',
                password: '',
                adminName: '',
                nul: [],
                ed: 0,
                account: '',
                totalSpace: 0,
                // memory: 1,
                marks: {
                    0: '0GB',
                    50: '50T',
                    100: '100T',
                    150: '150T',
                    200: '200TB'
                }
            },
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
            part: [],
            detail_e: {}
        }
    },
    methods: {
        //提交
        p(){
            let t = {}
            Object.assign(t,this.form,this.form2)
            detail_P({'data': t})
                .then(data => {
                    this.$router.back(-1)
                    this.$message({
                        message: '修改成功',
                        type: 'success',
                        center: true
                    })
                })
                .catch(err => {
                })
        },
    },
    created() {
        Object.keys(JSON.parse(sessionStorage.employees)).forEach(curr_ => {
            this.part.push({
                value: curr_,
                label: curr_
            })
        })
        this.detail_e = this.$route.query
        let s = `name=${this.detail_e.name}&id=${this.detail_e.id}&firmKEY=${this.detail_e.firmKEY}`
        detail_G(s)
            .then(data => {
                this.form = data.data[0]
                this.form2 = data.data[1]
                this.form2.totalSpace = Number(this.form2.totalSpace)
                this.form2.usedSpace = Number(this.form2.usedSpace)
            })
    }
}
</script>

<style lang="scss" scoped>
.detail_ {
    display: flex;
    justify-content: center;
    .wrapper {
        width: 1300px;
        .f {
            padding: 20px 0px;
            .title {
                font-size: 22px;
                line-height: 3.8em;
            }
            .el-form-item {
                box-sizing: border-box;
                width: 48%;
                display: inline-block;
                padding: 0px 60px 0px 44px;
                vertical-align: top;
            }
            .el-checkbox {
                display: block;
            }
        }
        .c {
            float: right;
            margin-right: 42px;
        }
    }
}
</style>
