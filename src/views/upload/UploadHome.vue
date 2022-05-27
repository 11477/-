<template>
  <div v-title :data-title=this.title>
    <UploadHead></UploadHead>
    <div class="welcome" >
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
                <el-button type="primary" @click="toRegister">我要投稿</el-button>
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
  </div>
</template>

<script>
import UploadHead from "@/components/upload/UploadHead";
export default {
  name: "UploadView",
  components: {UploadHead},
  data() {
    return {
      title: "创作中心",
      users: 0,
      uploaders: 0,
      reviews: 0,
      videos: 0,
    };
  },
  methods: {
    toRegister() {
      this.$router.push('/register')
    },
    toHome() {
      this.$router.push('/home')
    },
  }
}

</script>

<style scoped>
.data-row {
  display: flex;
}
.welcome{
  height: 100%;
  width: 100%;
  background-size: cover;
  position: absolute;
}
.welcome .msg-box{
  text-align: center;
  margin-top: 100px;
  margin-left: 120px;
  height: 400px;
  width: 40%;
}
.welcome .msg{
  background-color: rgba(255, 255, 255, 0.88);
  width: 600px;
  height: 100%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, .12), 0 5px 10px rgba(0, 0, 0, .04);
  border-radius: 100px;
}

.welcome .msg-row{
  margin-left: 100px;
  margin-right: 100px;
  text-align: left;
}

.welcome .title{
  font-size: xx-large;
}

.welcome .button-row{
  margin-top: 40px;
  margin-bottom: 20px;
}

.welcome .button-row button{
  width: 200px;
  height: 50px;
  margin: 10px 20px;
}

</style>
