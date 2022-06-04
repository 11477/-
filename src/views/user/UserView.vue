<template>
  <div class="userview">
  <div v-if="isMine">
    <UserBar :username=username
             :userPortrait=userPortrait
             :userIntro=userIntroDisplay
             :userBirthday=userBirthday
             :userSex=userSex
             :pageUserID=pageUserID
             :isMine="true"></UserBar>
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
            <div>{{ followNum }}</div>
          </div>
          <div class="user-statistic info234">
            <div class="statistic-char">粉丝数</div>
            <div>{{ fansNum }}</div>
          </div>
          <div class="user-statistic info234">
            <div class="statistic-char">点赞数</div>
            <div>{{ likeNum }}</div>
          </div>
          <div class="user-statistic info234">
            <div class="statistic-char">播放数</div>
            <div>{{ playNum }}</div>
          </div>
        </div>
      </el-menu>
    </div>
    <div class="content-area">
      <div class="video" v-if="this.activeIndex==='1'">
        <div class="sub-title">我的视频</div>
        <MyVideo :isMine="true"
                 :videoID="video.videoID"
                 v-for="video in this.videoList" v-bind:key="video.videoID"></MyVideo>
      </div>
      <div class="favor" v-else-if="this.activeIndex==='2'">
        <div class="sub-title">我的收藏</div>
        <UserFavor :videoID=video.videoID
                   v-for="video in this.favorList" v-bind:key="video.videoID"></UserFavor>
      </div>
      <div class="follow" v-else-if="this.activeIndex==='3'">
        <div class="sub-title">全部关注</div>
        <UserDisplay :userID="user.userID"
                     :username="user.username"
                     :userPortrait="user.userPortrait"
                     :userInfo="user.userInformation"
                     v-for="user in this.followList" v-bind:key="user.userID"></UserDisplay>
      </div>
      <div class="fans" v-else-if="this.activeIndex==='4'">
        <div class="sub-title">我的粉丝</div>
        <UserDisplay :userID="user.userID"
                     :username="user.username"
                     :userPortrait="user.userPortrait"
                     :userInfo="user.userInformation"
                     v-for="user in this.fansList" v-bind:key="user.userID"></UserDisplay>
      </div>
      <div class="notice" v-else-if="this.activeIndex==='5'">
        <div class="sub-title">我的通知</div>
        <UserNotice :letterTime="letter.letterTime"
                     :letterText="letter.letterText"
                     :letterUser="letter.letterUser"
                     v-for="letter in this.noticeList" v-bind:key="letter.letterTime"></UserNotice>
      </div>
      <div class="history" v-else-if="this.activeIndex==='6'">
        <div class="sub-title">历史记录</div>
        <VideoHistory :videoID="video.browseVideoID"
                      :uploader-name="video.browseVideoUser"
                      :video-cover="video.browseVideoCover"
                      :view-time="video.browseTime"
                      :video-title="video.browseVideoTitle"
                      v-for="video in this.historyList" v-bind:key="video.browseTime"></VideoHistory>
      </div>
      <div class="information" v-else-if="this.activeIndex==='7'">
        <SetInfo :prev-sex="userSex"
                 :prev-user-intro="userIntro"
                 :prev-username="username"
                 :prev-birthday="userBirthday"></SetInfo>
      </div>
    </div>
  </div>

  <div v-else>
    <UserBar :username=username
             :userPortrait=userPortrait
             :userIntro=userIntro
             :userBirthday=userBirthday
             :userSex=userSex
             :isMine="false"
             :pageUserID=pageUserID
             :hasLogin=hasLogin></UserBar>
    <div class="menu-box">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" @click="toVideo">TA的视频</el-menu-item>
        <el-menu-item index="2" @click="toFavor">收藏</el-menu-item>
        <el-menu-item index="3" @click="toFollow">关注</el-menu-item>
        <el-menu-item index="4" @click="toFans">粉丝</el-menu-item>
        <div class="user-statistic-box">
          <div class="user-statistic info1">
            <div class="statistic-char">关注数</div>
            <div>{{ followNum }}</div>
          </div>
          <div class="user-statistic info234">
            <div class="statistic-char">粉丝数</div>
            <div>{{ fansNum }}</div>
          </div>
          <div class="user-statistic info234">
            <div class="statistic-char">点赞数</div>
            <div>{{ likeNum }}</div>
          </div>
          <div class="user-statistic info234">
            <div class="statistic-char">播放数</div>
            <div>{{ playNum }}</div>
          </div>
        </div>
      </el-menu>
    </div>
    <div class="content-area">
      <div class="video" v-if="this.activeIndex==='1'">
        <div class="sub-title">TA的视频</div>
        <MyVideo :isMine="false"
                 :hasLogin=hasLogin
                 :videoID="video.videoID"
                 v-for="video in this.videoList" v-bind:key="video.videoID"></MyVideo>
      </div>
      <div class="favor" v-else-if="this.activeIndex==='2'">
        <div class="sub-title">TA的收藏</div>
        <UserFavor :videoID=video.videoID
                   :hasLogin=hasLogin
                   v-for="video in this.favorList" v-bind:key="video.videoID"></UserFavor>
      </div>
      <div class="follow" v-else-if="this.activeIndex==='3'">
        <div class="sub-title">TA的关注</div>
        <UserDisplay :userID="user.userID"
                     :username="user.username"
                     :userPortrait="user.userPortrait"
                     :userInfo="user.userInformation"
                     :hasLogin=hasLogin
                     v-for="user in this.followList" v-bind:key="user.userID"></UserDisplay>
      </div>
      <div class="fans" v-else-if="this.activeIndex==='4'">
        <div class="sub-title">TA的粉丝</div>
        <UserDisplay :userID="user.userID"
                     :username="user.username"
                     :userPortrait="user.userPortrait"
                     :userInfo="user.userInformation"
                     :hasLogin=hasLogin
                     v-for="user in this.fansList" v-bind:key="user.userID"></UserDisplay>
      </div>
    </div>
  </div>
    <div class="pic-right" style="margin-top: 80px;overflow: hidden">
      <el-image style="width: 200px; height: 200px; margin-left: 50px; margin-top: 0"
                v-for="url in urls" :key="url" :src="url" lazy></el-image>
    </div>
  </div>
</template>

<script>
import UserBar from "@/components/User/UserHead";
import UserDisplay from "@/components/User/UserDisplay";
import VideoHistory from "@/components/User/VideoHistory";
import UserFavor from "@/components/User/UserFavor";
import MyVideo from "@/components/User/MyVideo";
import user from "@/store/user";
import SetInfo from "@/components/User/SetInfo";
import UserNotice from "@/components/User/UserNotice";
export default {
  name: "UserView",
  components: {UserNotice, SetInfo, MyVideo, UserFavor, UserDisplay, UserBar, VideoHistory},
  created() {
    const userInfo = user.getters.getUser(user.state());
    this.pageUserID = eval(this.$route.params.UserID);
    if(userInfo){
      this.loginUserID = userInfo.user.userID;
      if(this.loginUserID===this.pageUserID){
        this.isMine = true;
      }
    } else{
      this.hasLogin = false;
    }
    /*
    console.log('loginID:')
    console.log(this.loginUserID)
    console.log('pageID')
    console.log(this.pageUserID)
    console.log(this.isMine)
    */
    const formData = new FormData();
    formData.append("enteredUserID", this.pageUserID);
    this.$axios({
      method: 'post',
      url: 'UserCommunication/enterhomepage/',
      data: formData,
    })
        .then(res => {
          switch (res.data.error) {
            case 0:
              console.log('用户主页请求成功');
              // eslint-disable-next-line no-case-declarations
              const userMsg = JSON.parse(res.data.msg_list)[0];
              //console.log(userMsg);
              this.username = userMsg.username;
              this.userSex = userMsg.userSex;
              this.userPortrait = userMsg.userPortrait;
              this.userIntro = userMsg.userInformation;
              if(this.userIntro===""){
                this.userIntroDisplay = "这个人很懒，什么也没有写~"
              } else{
                this.userIntroDisplay = this.userIntro
              }
              if(userMsg.userBirthday==="None"){
                this.userBirthday = "未知"
              } else{
                this.userBirthday = userMsg.userBirthday
              }
              this.fansNum = userMsg.fansNum;
              this.playNum = userMsg.playNum;
              this.followNum = userMsg.concernsNum;
              this.likeNum = userMsg.likeNum;

              // eslint-disable-next-line no-case-declarations
              this.videoList = JSON.parse(res.data.video_list);
              this.favorList = JSON.parse(res.data.favour_list);
              console.log('收藏列表')
              console.log(this.favorList);
              this.fansList = JSON.parse(res.data.fans_list);
              console.log('粉丝列表');
              console.log(this.fansList);
              this.historyList = JSON.parse(res.data.browse_list);
              console.log('浏览列表');
              console.log(this.historyList);
              this.noticeList = JSON.parse(res.data.letter_list);
              console.log('通知列表');
              console.log(this.noticeList);
              this.followList = JSON.parse(res.data.concerns_list);
              console.log('关注列表');
              console.log(this.followList);
              break;
            case 2001:
              this.$message.warning('用户信息加载失败！');
              console.log('请求方式错误')
              break;
            case 4001:
              this.$message.warning('用户不存在！');
              console.log('用户不存在')
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })
  },
  data() {
    return {
      urls: [
        'https://iconfont.alicdn.com/t/baf841bb-c1ec-47f8-b192-ac8e5dc8eb32.png@500h_500w.png',
        'https://iconfont.alicdn.com/t/befc4847-fa04-4dda-b7f4-1181861d56fd.png@500h_500w.png',
        'https://iconfont.alicdn.com/t/4622ab5b-cb6c-41df-a25d-1ecaf0751de5.png@500h_500w.png',
        'https://iconfont.alicdn.com/t/d640f597-1555-4e6f-a464-f2bd041a7e3a.png@500h_500w.png',
        'https://iconfont.alicdn.com/t/d1089c34-3986-4992-9c6a-f550822dcc11.png@500h_500w.png',
        'https://iconfont.alicdn.com/t/64995fce-0fd2-4bbf-8fcb-a1fd2ce98274.png@500h_500w.png',
        'https://iconfont.alicdn.com/t/e28d62b4-171d-4ba2-82bc-c6cf2fe96e96.png@500h_500w.png',
        'https://iconfont.alicdn.com/t/4f4d7075-f50d-4a03-ae92-baec66f9d964.png@500h_500w.png',
        'https://iconfont.alicdn.com/t/dcb8d2bc-b721-46b0-9979-f017a64ed769.png@500h_500w.png',
        'https://iconfont.alicdn.com/t/1192c5bf-17b0-4c19-a0cb-eed122049893.png@500h_500w.png',
        'https://iconfont.alicdn.com/t/1192c5bf-17b0-4c19-a0cb-eed122049893.png@500h_500w.png',
        'https://iconfont.alicdn.com/t/aa0b17d0-f447-45f8-8a64-2b6a357a38ca.png@500h_500w.png',
      ],
      activeIndex: '1',
      loginUserID: 0,
      pageUserID: 0,
      hasLogin: true,
      isMine: false,
      username: "",
      userPortrait: "../../assets/avatar/head.jpeg",
      userIntroDisplay: "",
      userIntro: "",
      userBirthday: "",
      fansNum: 66,
      playNum: 78,
      followNum: 56,
      likeNum: 75,
      userSex: "",
      avatarSrc:'',
      videoList: [],
      favorList: [],
      fansList: [],
      followList: [],
      historyList: [],
      noticeList: [],
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
    },
  }
}
</script>

<style>
.userview{
  position: absolute;
  margin-top: 60px;
  margin-left: 100px;
  display: flex;
  flex-direction: row;
}
.pic-right{
  display: flex;
  flex-direction: column;
}
.menu-box{
  padding: 0 10%;
  width: 850px;
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
  margin-left: 50px;
  width: 50px;
}
.info234{
  margin-left: 15px;
  width: 50px;
}
.content-area{
  padding: 0 10%;
  display: flex;
  flex-direction: column;
}
.sub-title{
  color: #409EFF;
  font-size: 20px;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 10px;
}
.el-menu-demo {
  display: flex;
}
</style>
