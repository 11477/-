<template>
  <div id="login" class="login">
    <div class="title">ShareVideo</div>
    <div class="login-word">
      <span class="word" style="font-size: 38px;">登录</span>
    </div>
    <div class="login-box-out">
      <div class="login-box">
        <div class="email">
          <el-input v-model="input1" placeholder="你的邮箱" clearable></el-input>
        </div>
        <div class="password">
          <el-input placeholder="密码" v-model="input2" show-password></el-input>
        </div>
        <div class="register-text">
          <p @click="handleCommand">没有账号？现在注册</p>
        </div>
      </div >
      <el-button type="primary" @click="login" class="login-btn" round size="medium">登 录</el-button>
      </div>
  </div>
</template>

<script>
export default {
  name: "LoginView.vue",
  methods:{
    login(){
      this.$store.commit("login");
    },
    logout(){
      this.$store.commit("logout");
    },
    handleCommand(){
      this.$router.push("/register");
    }
  },
  data() {
    return {
      input1: '',
      input2: ''
    }
  }
}

</script>

<style scoped>
.login{
  background: url("../../assets/login_background.jpg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
  text-align: center;
}

.login-box-out{
  display: inline-block;
  margin-top: 50px;
}

.login-box{
  width: 550px;
  background: rgba(255,255,255,0.6);
  margin-top: 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
}

#login .title{
  background: rgba(255,255,255,0.8);
  position: relative;
  top: 20px;
  font-size: 50px;
  font-weight: 2500;
  line-height: 80px;
  width: 30%;
  height: 80px;
  border-radius: 25px;
  display: inline-block;
}

.login-box .email{
  width: 500px;
  height: 80px;
  margin-top: 40px;
  margin-bottom: -20px;
}

.login-word{
  width: 1000px;
  height: 28px;
  margin: 0 auto;
  border-bottom: 1px solid #ddd;
  margin-top: 50px;
  margin-bottom: 28px;
  text-align: center;
}

.password{
  width: 500px;
  height: 80px;
  /*display: inline-block;*/
  margin-top:20px;

}

.login-word .word{
  height: 56px;
  line-height: 56px;
  margin: 0 auto;
  padding: 0 20px;
  font-size: 40px;
  background: rgba(255,255,255,0.9);
  border-radius: 10px;
  text-align: center;
}

.register-text {
  font-size:14px;
  line-height:10px;
  color:#000;
  text-align: right;
  margin-bottom: 10px;
  margin-left: 370px;
  cursor : pointer;
}

.login-btn{
  margin-top: 50px;
  width: 110px;
  height: 50px;
}

</style>
