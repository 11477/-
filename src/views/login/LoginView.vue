<template>
  <div id="login" class="login">
    <div class="title">短视频分享网站</div>
    <div class="login_word">登录</div>
    <div v-if="$store.state.islogin"><el-button type="info" v-on:click="logout()">退出登录</el-button></div>
    <div v-else><el-button type="primary" v-on:click="login()">登录</el-button></div>
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
  }
}

</script>

<style scoped>
#login .title{
  font-size: 100px;
  margin-top: -50px;
  margin-right: 500px;
}

#login .login_word{
  font-size: 50px;
  margin-right: 1100px;
  margin-top: 20px;
}
</style>
