<template>
  <div class="login">
    <div class="bg">
    </div>
    <div class="login_box">
      <div class="login_box_bg"></div>
      <div class="login_box_form">
        <el-form>
          <div class="tit">
            <p>文件系统管理分析系统</p>
          </div>
          <el-form-item>
            <el-input v-model="account" placeholder="输入账号" type="text"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="password" type="password" placeholder="输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="verify_input" 
                      type="text" 
                      placeholder="输入验证码" 
                      class="verify_input"></el-input>
            <div class="verify_mode">
              <verify/>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" 
                       class="btn_primary"
                       v-on:click="login()">登录</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="remember_account"><span class="login_state">记住登录状态</span></el-checkbox>
            <router-link to="/forget_password" tag="span" class="forget_password">忘记密码</router-link>
          </el-form-item>
          <router-link to="" tag="span" class="rules">注意事项</router-link>
        </el-form>  
      </div>
    </div>
  </div>
</template>

<script>

import verify from '@/components/verify_input'

export default {
  name: 'login_page',
  data () {
    return {
      account: '',
      password: '',
      verify_input: '',
      remember_account: true,
    }
  },
  methods: {
    //登录事件
    login() {
      //表格未填写完整
      if(!this.account || !this.password || !this.verify_input){      
        if(!this.account || !this.password){
          this.$message.error('登录信息未填写完整');
          return false;
        }else{
          this.$message.error('验证码未填写');
          return false;
        }
      }
      //验证码错误
      if(this.verify_input !== this.$store.state.login_page.verify_input){
        this.$message.error('验证码有误,需要重新填写');
        document.querySelector('.verify').click();
        return false;
      }
      //发送AJAX  
      this.$axios.post( this.jiabingqian + '/login/verify.do', {
        username: this.account,
        password: this.password
      })
      .then(data => {
        console.log(data)
      }).catch( e => {
        console.log(e)
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
  .bg{
    width: 100%;
    height: 100%;
  }
  .bg{
    background-image: url('../assets/login_bg.jpg');
    background-size: cover;
  }
  .login_box{
    position: absolute;
    top: 50%;
    right: 10vw;
    transform: translateY(-50%);
    width: 400px;
    height: 440px;
    border-radius: 6px;
    overflow: hidden;
  }
  .login_box_bg{
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(#013B6E,#26A6C7); 
    opacity: 0.8;
  }
  .login_box_form{
    padding: 10px 44px;
  }
  .verify_input,
  .verify_mode{
    display: inline-block;
    width: 48%;
    height: 40px;
  }
  .verify_mode{
    float: right;
  }
  .btn_primary{
    width: 100%;
  }
  .tit{
    text-align: center;
  }
  .tit p{
    position: relative;
    color: #fff;
    font-size: 23px;
    line-height: 4em;
    font-weight: 700;
  }
  .forget_password{
    color: #fff;
    float: right;
    cursor: pointer;
  }
  .rules{
    position: absolute;
    right: 44px;
    bottom: 20px;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
  }
  .login_state{
    color: #fff;
  }
  @media screen and (max-width: 482px){
    .login_box{
      right: 50%;
      transform: translate(50%,-50%)
    }
  };
</style>
