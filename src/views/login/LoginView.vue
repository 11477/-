<template>
  <div id="login" class="login">
    <div class="title">短视频分享网站</div>
    <div class="login-word">
      <span class="word" style="font-size: 38px;">登录</span>
    </div>
    <div class="login-box">
      <div class="login-left">

      </div>
      <div class="line"></div>
      <div class="login-right">

      </div>
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
    }
  },
  data() {
    return {
      input: ''
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
#login .title{
  background: rgba(255,255,255,0.8);
  position: relative;
  top: 20px;
  font-size: 50px;
  font-weight: 100;
  line-height: 80px;
  width: 30%;
  height: 80px;
  border-radius: 25px;
  display: inline-block;
}

.login-word{
  width: 1500px;
  height: 28px;
  margin: 0 auto;
  border-bottom: 1px solid #ddd;
  margin-top: 30px;
  margin-bottom: 28px;
  text-align: center;
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

.login-box{
  position: relative;
  width: 980px;
  margin: 0 auto;
  display: flex;
  flex-wrap: nowrap;
}

.login-box .line{
  border-right: 1px solid #ddd;
  height: 300px;
  margin-top: 28px;
}
</style>
