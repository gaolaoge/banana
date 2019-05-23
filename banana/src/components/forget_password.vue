<template>
    <div class="forget_password">
        <div class="bg"></div>
        <div class="login_box">
            <div class="login_box_bg"></div>
            <div class="login_box_form" v-show="fir_show">
                <el-form>
                <div class="tit">
                    <p>输入邮箱或手机号获取验证码</p>
                </div>
                <el-form-item>
                    <el-input v-model="account_num" placeholder="输入邮箱号/手机号" type="text"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" 
                            class="btn_primary"
                            v-on:click="send()">发送</el-button>
                </el-form-item>
                </el-form>  
            </div>
            <div class="login_box_form" v-show="sec_show">
                <el-form>
                <div class="tit">
                    <p>输入验证码及设置新密码</p>
                </div>
                <el-form-item>
                    <el-input v-model="verify_num" placeholder="输入验证码" type="text"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="set_newPassWord" placeholder="设置新密码" type="text"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="again_nrePassWord" placeholder="输入刚刚设置的新密码" type="text"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" 
                            class="btn_primary"
                            v-on:click="send_set()">发送</el-button>
                </el-form-item>
                </el-form>  
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'forget_password',
    data(){
        return {
            account_num: '',
            fir_show: true,
            sec_show: false,
            verify_num: '',             //填写的验证码
            return_verify_num: '',      //真正的验证码
            set_newPassWord: '',
            again_nrePassWord: ''
        }
    },
    methods: {
        //填写账号
        send(){
            if( !this.account_num ){
              this.$message.error('需找回的账号未输入');
              return false;
            }
            // this.$axios.get( this.jiabingqian + '/login/verify.do?' + this.account_num)
            // .then(function(data){

              this.fir_show = false;
              this.sec_show = true;
              document.querySelector('.login_box').style.height = '344px';
            // })
            // .catch(function(){
            //   this.$message.error('账号输入有误');
            //   return false;
            // })
        },
        //设置新密码
        send_set(){
          if( !this.verify_num || !this.set_newPassWord || !this.again_nrePassWord ){
            this.$message.error('信息填写不完整');
            return false;
          }
          // if( this.verify_num !== this.return_verify_num ){
          //   this.$message.error('验证码错误');
          //   return false;
          // }
          if( this.set_newPassWord !== this.again_nrePassWord ){
            this.$message.error('两次密码输入不同');
            return false;
          }
          this.$axios.post( this.jiabingqian + '/login/verify.do',{
            newPassWord: this.set_newPassWord
          })
          .then(function(data){
            if(data){
              this.$message({
                message: '恭喜你，修改成功',
                type: 'success'
              });
              setTimeout(function(){
                this.$router.replace('/');    
              },2000)
            }else{
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
    }
}
</script>

<style scoped>
  .forget_password,
  .bg{
    width: 100%;
    height: 100%;
  }
  .bg{
    background-image: url('../assets/bg.jpg');
    background-size: cover;
  }
  .login_box{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 400px;
    height: 280px;
    border-radius: 6px;
    overflow: hidden;
    text-align: center;
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
  .tit p{
    position: relative;
    color: #fff;
    font-size: 20px;
    line-height: 4em;
    font-weight: 700;
  }
  .btn_primary{
      width: 100px;
  }
</style>
