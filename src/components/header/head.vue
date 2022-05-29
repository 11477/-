<template>
  <div id="nav-bar">
    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" style="display: flex">
      <div class="left-entry">
        <el-menu-item index="1" @click="toHome">
          <img class="logo-pic" src="../../assets/logos/logo-long.png" alt="banner">
          <span class="home-char">首页</span>
        </el-menu-item>
      </div>
      <div class="searchBar" v-show="!($route.path==='/search')">
        <form id="nav-searchForm" class style="border-radius: 8px">
          <div class="nav-search-content">
            <input class="nav-search-input" type="text" placeholder="请输入关键词搜索" v-model="input" @keyup.enter="searchContent">
          </div>
          <div class="nav-search-button" @click="searchContent">
            <i class="el-icon-search"></i>
          </div>
        </form>
      </div>
      <div class="right-entry">
        <div class="right-button">
          <img class="head-pic" v-if="this.is_login" src="../../assets/avatar/head.jpeg" alt="banner">
          <div class="login-button" v-else @click="toLogin">登录</div>
        </div>
        <div class="right-button" @click="toMessage">
          <i class="el-icon-message"></i>
          <div>通知</div>
        </div>
        <div class="right-button" @click="toStore">
          <i class="el-icon-view"></i>
          <div>收藏</div>
        </div>
        <div class="right-button" @click="toHistory">
          <i class="el-icon-pie-chart"></i>
          <div>历史</div>
        </div>
        <div class="right-button" @click="toFollow">
          <i class="el-icon-star-off"></i>
          <div>关注</div>
        </div>
        <div class="right-button" @click="upLoad">
          <i class="el-icon-upload2"></i>
          <div>投稿</div>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
import user from "@/store/user";
export default {
  name: 'NavBar',
  data() {
    return {
      input: '',
      is_login: false,
    }
  },
  created() {
    var userInfo = user.getters.getUser(user.state())
    if (userInfo) {
      this.is_login = true
    }
  },
  methods:{
    toHome() {
      window.location.href = '/';
    },
    handleSelect() {
      console.log("select")
    },
    searchContent() {
      console.log("search")
    },
    toMessage() {
      console.log("message")
    },
    toStore() {
      console.log("store")
    },
    toHistory() {
      console.log("history")
    },
    toFollow() {
      console.log("follow")
    },
    toLogin() {
      this.$router.push({path: '/login'})
    },
    upLoad() {
      this.$router.push({path: '/upload/frame'})
    }
  },
}
</script>

<style>
#nav-bar {
  padding: 0 10% 0 10%;
  height: 61px;
}
.logo-pic {
  width: 150px;
}
.home-char{
  margin-left: 10px;
  font-size: 17px;
}
.head-pic {
  width: 45px;
  margin-top: -5px;
  margin-right: 20px;
}
.login-button{
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #00aeec;
  background: #f6f6f6;
  text-align: center;
  letter-spacing: 0;
  font-size: 14px;
  line-height: 36px;
}
.searchBar {
  display: inline-block;
  width: 40%;
  margin-top: 7px;
}
#nav-searchForm{
  display: flex;
  align-items: center;
  padding: 0 48px 0 4px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  line-height: 38px;
  border: 1px solid #E3E5E7;
  height: 40px;
  background-color: #F1F2F3;
  opacity: .9;
  transition: background-color .3s;
}
.nav-search-content{
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0 8px;
  width: 100%;
  height: 32px;
  border: 2px solid transparent;
  border-radius: 6px;
}
.nav-search-button{
  position: absolute;
  top: 5px;
  right: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  color: #00aeec;
  line-height: 32px;
  cursor: pointer;
  transition: background-color .3s;
}
.nav-search-input{
  flex: 1;
  overflow: hidden;
  padding-right: 8px;
  border: none;
  background-color: transparent;
  box-shadow: none;
  color: #61666D;
  font-size: 14px;
  line-height: 20px;
}
input:focus{
  outline: none;
}
el-menu-item {
  font-size: 20px;
  display: flex;
  flex-direction: column;
}
.right-button{
  display: flex;
  flex-direction: column;
  margin: 10px 20px;
  width: max-content;
}
.right-button :hover{
  cursor: pointer;
}
.left-entry {
  float: left;
  display: flex;
  flex-shrink: 0;
}
.right-entry {
  display: flex;
  float: right;
  align-items: center;
  text-align: center;
}
</style>
