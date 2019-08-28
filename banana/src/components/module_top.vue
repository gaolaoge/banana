<template>
    <div class="module_top">
        <div class="left">
            <p class="tit">
                <i
                    class="el-icon-s-grid"
                    v-on:click="left_nav_show()"
                ></i>
                <span>文件系统管理分析平台</span>
            </p>
        </div>
        <div class="right">
            <div
                class="member"
                v-on:click="show_list()"
            >
                <div class="btn_news">
                    <p class="tit">
                        <i class="el-icon-user"></i>
                        <span>用户</span>
                    </p>
                </div>
                <div
                    class="nav_list"
                    v-show="nav_list"
                >
                    <ul>
                        <router-link
                            tag="li"
                            to="/personal_center"
                        >修改个人信息</router-link>
                        <router-link
                            tag="li"
                            to=""
                        >修改密码</router-link>
                        <li @click="drop_out">退出登录</li>
                    </ul>
                </div>
            </div>
            <!-- <div class="message">
                <div class="btn_news">
                    <p class="tit">
                        <i class="el-icon-message"></i>
                        <span>消息</span>
                    </p>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'module_top',
    data() {
        return {
            nav_list: false,
        }
    },
    methods: {
        show_list() {
            this.nav_list = !this.nav_list;
        },
        left_nav_show() {
            this.$store.state.nav_.left_nav_show = !this.$store.state.nav_.left_nav_show;
        },
        drop_out() {
            this.$confirm('确认退出登录?', '登录提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                sessionStorage.clear()
                this.$router.push('/')
                this.$message({
                    type: 'success',
                    message: '已退出登录!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消退出登录'
                });
            });
        }
    }
}
</script>


<style scoped>
.module_top {
    position: relative;
    height: 60px;
    box-shadow: 0px 1px 1px 1px rgba(240, 240, 240, 0.5);
    /* background-image: linear-gradient(to right,#2d416b,#2d9ddd); */
    background: #23262e;
    padding: 0px 20px;
}
.module_top .left,
.module_top .right,
.module_top .right .member,
.module_top .right .message {
    display: inline-block;
    height: 100%;
    cursor: pointer;
}
.module_top .right .member,
.module_top .right .message {
    width: 80px;
    vertical-align: top;
    text-align: center;
}
.module_top .right .member {
    width: 120px;
}
.module_top .right {
    float: right;
}
.tit {
    line-height: 60px;
    font-size: 15px;
    color: #fff;
    transition: all 0.2s;
    user-select: none;
}
.tit:hover {
    color: #ccc;
}
.left .tit {
    font-size: 22px;
}
.nav_list {
    box-shadow: 0px 0px 4px 0px #ccc;
}
.nav_list li {
    list-style: none;
    font-size: 14px;
    line-height: 2.2em;
    background-color: #fff;
    /* border: 1px solid #bbb; */
    /* box-shadow: 0px 0px 4px 1px #ccc; */
}
</style>
