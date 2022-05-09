<template>
  <div id="nav-bar">
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1" @click="toHome">
      <img src="../../assets/SBlogo.png" alt="banner">
      首页
    </el-menu-item>
    <div class="searchInput">
      <el-input
          placeholder="请输入搜索内容"
          v-model="input">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
      <el-menu-item index="2" @click="toMessage">通知</el-menu-item>
      <el-menu-item index="3" @click="toStore">收藏</el-menu-item>
      <el-menu-item index="4" @click="toHistory">历史</el-menu-item>
      <el-menu-item index="5" @click="toFollow">关注</el-menu-item>
      <el-menu-item index="6" @click="upLoad">投稿</el-menu-item>
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
    }
  }
}
</script>

<style>
#nav-bar {
  padding: 0 10% 0 10%;
  height: 61px;
}
#nav-bar img {
  width: 30px;
}
.searchInput {
  display: inline-block;
  width: 40%;
  margin-top: 10px;
}
el-menu-item {
  font-size: 20px;
}
</style>

