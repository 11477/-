<template>
  <div class="user">
    <UserBar/>
    <div class="menu-box">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" @click="toVideo">我的视频</el-menu-item>
        <el-menu-item index="2" @click="toFavor">收藏</el-menu-item>
        <el-menu-item index="3" @click="toFollow">关注</el-menu-item>
        <el-menu-item index="4" @click="toFans">粉丝</el-menu-item>
        <el-menu-item index="5" @click="toNotice">通知</el-menu-item>
        <el-menu-item index="6" @click="toHistory">历史</el-menu-item>
        <el-menu-item index="7" @click="toInformation">个人信息</el-menu-item>
        <div class="user-statistic-box">
          <div class="user-statistic info1">
            <div class="statistic-char">关注数</div>
            <div>66</div>
          </div>
          <div class="user-statistic info234">
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
    <div class="content-area">
      <div class="video" v-if="this.activeIndex==='1'">
        <div class="sub-title">我的视频</div>
        <MyVideo/>
        <MyVideo/>
      </div>
      <div class="favor" v-else-if="this.activeIndex==='2'">
        <div class="sub-title">我的收藏</div>
        <UserFavor/>
        <UserFavor/>
      </div>
      <div class="follow" v-else-if="this.activeIndex==='3'">
        <div class="sub-title">全部关注</div>
        <UserDisplay/>
        <UserDisplay/>
        <UserDisplay/>
      </div>
      <div class="fans" v-else-if="this.activeIndex==='4'">
        <div class="sub-title">我的粉丝</div>
        <UserDisplay/>
        <UserDisplay/>
      </div>
      <div class="notice" v-else-if="this.activeIndex==='5'">
        notice
      </div>
      <div class="history" v-else-if="this.activeIndex==='6'">
        <div class="sub-title">历史记录</div>
        <VideoHistory/>
        <VideoHistory/>
      </div>
      <div class="information" v-else-if="this.activeIndex==='7'">
        info
      </div>
    </div>
  </div>
</template>

<script>
import UserBar from "@/components/User/UserHead";
import UserDisplay from "@/components/User/UserDisplay";
import VideoHistory from "@/components/User/VideoHistory";
import UserFavor from "@/components/User/UserFavor";
import MyVideo from "@/components/User/MyVideo";
export default {
  name: "UserView",
  components: {MyVideo, UserFavor, UserDisplay, UserBar, VideoHistory},
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods:{
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toVideo() {
      this.activeIndex = '1';
    },
    toFans(){
      this.activeIndex = '4';
    },
    toFavor(){
      this.activeIndex = '2';
    },
    toFollow(){
      this.activeIndex = '3';
    },
    toHistory(){
      this.activeIndex = '6';
    },
    toNotice(){
      this.activeIndex = '5';
    },
    toInformation(){
      this.activeIndex = '7';
    }
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
.info1{
  margin-left: 300px;
}
.info234{
  margin-left: 15px;
}
.content-area{
  padding: 0 10%;
  display: flex;
  flex-direction: column;
}
.sub-title{
  font-size: 20px;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 10px;
}
</style>
