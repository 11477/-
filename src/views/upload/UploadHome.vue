<template>
  <div v-title :data-title=this.title style="position: absolute;" class="uploadHome">
    <UploadHead style="width: 100%"></UploadHead>
    <div class="welcome">
      <div>
        <el-container>
          <el-main>
            <div class="msg-box">
              <el-col class="msg">
                <el-row class="title">
                  <h1>短视频分享平台</h1>
                </el-row>
                <el-row class="msg-row">
            <span style="margin: auto 0">
              方便同学们更好地学习交流，分享自己的生活状态，提供便捷方便的视频平台。
            </span>
                </el-row>
                <el-row class="button-row">
                  <el-button type="primary" @click="handleUp">我要投稿</el-button>
                </el-row>
                <el-row class="data-row">
                  <el-col>
                    <el-row>
                      用户
                    </el-row>
                    <el-row>
                      <span style="font-weight: bold;font-size: 30px">{{ users }}</span>+
                    </el-row>
                  </el-col>
                  <el-col>
                    <el-row>
                      up主
                    </el-row>
                    <el-row>
                      <span style="font-weight: bold;font-size: 30px">{{ uploaders }}</span>+
                    </el-row>
                  </el-col>
                  <el-col>
                    <el-row>
                      审核
                    </el-row>
                    <el-row>
                      <span style="font-weight: bold;font-size: 30px">{{ reviews }}</span>+
                    </el-row>
                  </el-col>
                  <el-col>
                    <el-row>
                      视频
                    </el-row>
                    <el-row>
                      <span style="font-weight: bold;font-size: 30px">{{ videos }}</span>+
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
            </div>
          </el-main>
        </el-container>
      </div>
      <div>
        <el-container v-if="isLogin">
          <el-main>
            <div class="msg-box-info">
              <el-col class="msg-info">
                <el-row class="title">
                  <h1>我的数据</h1>
                </el-row>
                <el-row class="msg-row-info">
                  我投稿了<span style="color: red">{{myVideoNum}}</span>个视频
                </el-row>
                <el-row class="msg-row-info">
                  它们一共有<span style="color: red">{{myVideoView}}</span>次播放
                </el-row>
                <el-row class="msg-row-info">
                  它们带给了我<span style="color: red">{{myFansNum}}</span>个粉丝
                </el-row>
              </el-col>
            </div>
          </el-main>
        </el-container>
        <el-container v-else>
          <el-main>
            <div class="msg-box-info">
              <el-col class="msg-info">
                <el-row class="title-not-login">
                  <h1>前面的区域，登陆后再来探索吧~</h1>
                </el-row>
              </el-col>
            </div>
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
import UploadHead from "@/components/upload/UploadHead";
import user from "@/store/user";

export default {
  name: "UploadView",
  components: {UploadHead},
  data() {
    return {
      isLogin: false,
      title: "创作中心",
      users: 0,
      uploaders: 0,
      reviews: 0,
      videos: 0,
      myVideoNum: 0,
      myVideoView: 0,
      myFansNum: 0,
    };
  },
  created() {
    const userInfo = user.getters.getUser(user.state())
    if (userInfo)
      this.isLogin = true
    this.$axios({
      method: 'get',
      url: '/Websurf/getWebInfo/'
    }).then(res => {
      this.users = res.data.userNum
      this.uploaders = res.data.uploaderNum
      this.reviews = res.data.admNum
      this.videos = res.data.videoNum
    })
    if(this.isLogin){
    const formData = new FormData();
    formData.append("enteredUserID", user.getters.getUser(user.state()).user.userID);
    this.$axios({
      method: 'post',
      url: 'UserCommunication/enterhomepage/',
      data: formData,
    })
    .then(res=>{
      const userMsg = JSON.parse(res.data.msg_list)[0];
      const videoMsg = JSON.parse(res.data.video_list);
      this.myVideoView=userMsg.playNum;
      this.myFansNum=userMsg.fansNum;
      this.myVideoNum=videoMsg.length
    })}
  },
  methods: {
    handleUp() {
      if (this.isLogin) {
        this.$router.push('/upload/frame')
      } else
        this.$router.push('/register')
    },
    toHome() {
      this.$router.push('/home')
    },
  }
}

</script>

<style scoped>
.uploadHome{
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url("../../assets/images/background4.png") no-repeat;
  background-size: cover;
}

.data-row {
  display: flex;
}

.welcome {
  height: 100%;

  display: flex;
}

.welcome .msg-box {
  text-align: center;
  margin-top: 100px;
  margin-left: 120px;
  height: 400px;
}

.welcome .msg-box-info {
  text-align: center;
  margin-top: 100px;
  margin-left: 60px;
  height: 400px;
}

.welcome .msg {
  background-color: rgba(255, 255, 255, 0.88);
  width: 600px;
  height: 100%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, .12), 0 5px 10px rgba(0, 0, 0, .04);
  border-radius: 100px;
}

.welcome .msg-info {
  background-color: rgba(255, 255, 255, 0.88);
  width: 400px;
  height: 100%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, .12), 0 5px 10px rgba(0, 0, 0, .04);
  border-radius: 100px;
}

.welcome .msg-row {
  margin-left: 100px;
  margin-right: 100px;
  text-align: left;
}

.welcome .msg-row-info {
  margin: 50px 100px;
  text-align: center;
  font-size: 20px;
}

.welcome .title {
  font-size: xx-large;
  margin-top: 30px;
}

.welcome .title-not-login {
  font-size: xx-large;
  margin-top: 130px;
}

.welcome .button-row {
  margin-top: 40px;
  margin-bottom: 20px;
}

.welcome .button-row button {
  width: 200px;
  height: 50px;
  margin: 10px 20px;
}

</style>
