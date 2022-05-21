<template>
  <div class="user">
    <UserBar/>
    <div class="menu-box">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" @click="toHome">我的视频</el-menu-item>
        <el-menu-item index="2" @click="toFavor">收藏</el-menu-item>
        <el-menu-item index="3" @click="toFollow">关注</el-menu-item>
        <el-menu-item index="4" @click="toFans">粉丝</el-menu-item>
        <el-menu-item index="5" @click="toNotice">通知</el-menu-item>
        <el-menu-item index="6" @click="toHistory">历史</el-menu-item>
        <el-menu-item index="7" >个人信息</el-menu-item>
        <div class="user-statistic-box">
          <div class="user-statistic info1 clickable">
            <div class="statistic-char">关注数</div>
            <div>66</div>
          </div>
          <div class="user-statistic info234 clickable">
            <div class="statistic-char">粉丝数</div>
            <div>66</div>
          </div>
          <div class="user-statistic info234">
            <div class="statistic-char">点赞数</div>
            <div>66</div>
          </div>
          <div class="user-statistic info234">
            <div class="statistic-char">播放数</div>
            <div>66</div>
          </div>
        </div>
      </el-menu>
    </div>
  </div>
</template>

<script>
import UserBar from "@/components/User/UserHead";
export default {
  name: "UserView",
  components: {UserBar},
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods:{
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toHome() {
      window.location.href = '/user';
    },
    toFans(){
      window.location.href = '/user/fans';
    },
    toFavor(){
      window.location.href = '/user/favor';
    },
    toFollow(){
      window.location.href = '/user/follow';
    },
    toHistory(){
      window.location.href = '/user/history';
    },
    toNotice(){
      window.location.href = '/user/notice';
    },
  }
}
</script>

<style>
.menu-box{
  padding: 0 10%;
}
.user-statistic-box{
  width: 600px;
  font-size: 13px;
  color: grey;
  display: flex;
  margin-top: 15px;
}
.user-statistic{
  display: flex;
  flex-direction: column;
}
.clickable:hover{
  color: #66ccff ;
}
.info1{
  margin-left: 300px;
}
.info234{
  margin-left: 15px;
}
</style>
