<template>
  <div id="nav-bar" v-show="!($route.path==='/administrator')">
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <div class="left-entry">
      <el-menu-item index="1" @click="toHome">
        <img class="logo-pic" src="../../assets/SBlogo.png" alt="banner">
        首页
      </el-menu-item>
    </div>
    <div class="searchInput">
      <el-input
          placeholder="请输入搜索内容"
          v-model="input">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <div class="right-entry">
      <img class="head-pic" src="../../assets/head.jpeg" alt="banner">
      <div class="right-button" @click="toMessage">
        <i class="el-icon-message"></i>
        通知
      </div>
      <div class="right-button" @click="toStore">
        <i class="el-icon-view"></i>
        收藏
      </div>
      <div class="right-button" @click="toHistory">
        <i class="el-icon-pie-chart"></i>
        历史
      </div>
      <div class="right-button" @click="toFollow">
        <i class="el-icon-star-off"></i>
        关注
      </div>
      <div class="right-button" @click="upLoad">
        <i class="el-icon-upload2"></i>
        投稿
      </div>
    </div>
  </el-menu>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      input: ''
    }
  },
  methods:{
    toHome() {
      window.location.href = '/';
    },
  },
}
</script>

<style>
#nav-bar {
  padding: 0 10% 0 10%;
  height: 61px;
}
.logo-pic {
  width: 30px;
}
.head-pic {
  width: 50px;
  margin-top: -5px;
  margin-right: 20px;
}
.searchInput {
  display: inline-block;
  width: 40%;
  margin-top: 10px;
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

