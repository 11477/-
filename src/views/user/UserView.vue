<template>
  <div class="user">
    <UserBar/>
    <div class="menu-box">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">我的视频</el-menu-item>
        <el-menu-item index="2">收藏</el-menu-item>
        <el-menu-item index="3">关注</el-menu-item>
        <el-menu-item index="4">粉丝</el-menu-item>
        <el-menu-item index="5">通知</el-menu-item>
        <el-menu-item index="6">历史</el-menu-item>
        <el-menu-item index="7">个人信息</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import UserBar from "@/components/User/UserHead";
export default {
  name: "UserView",
  components: {UserBar}
}
</script>

<style>
.menu-box{
  padding: 0 10%;
}
</style>
