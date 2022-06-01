<template>
  <div id="video-history">
    <div @click="toVideo">
      <img class="cover-in-video-history" :src=videoCover alt="视频封面" style="cursor: pointer">
    </div>
    <div class="info-in-user-favor">
      <div class="title-in-video-history" @click="toVideo" style="cursor: pointer">{{videoTitle}}</div>
      <div style="cursor: pointer" @click="ToUser">{{uploaderName}}</div>
    </div>
    <div class="favor-in-user-favor" style="margin-top: 38px">
      <el-popover placement="bottom" v-model="visible" trigger="hover" v-if="hasFavored">
        <div style="text-align: center">
          <el-button @click="cancelFavor">取消收藏</el-button>
        </div>
        <el-button style="background: #00aeec; color: white" slot="reference">已收藏</el-button>
      </el-popover>
      <el-button @click="changeFavor" v-else> + 收藏</el-button>
    </div>
  </div>
</template>

<script>
import user from "@/store/user";

export default {
  name: "UserFavor",
  data(){
    return{
      visible: false,
      hasFavored: true,
      videoTitle: "视频标题",
      uploaderName: "up名",
      videoCover: "",
      uploadID:0,
    };
  },
  props:{
    hasLogin:{
      default: true
    },
    videoID:{
      default: 0
    },
  },
  created() {
    if (!this.hasLogin) {
      this.hasFavored = false
    } else {
      const userInfo = user.getters.getUser(user.state());
      const loginUserID = userInfo.user.userID;
      const dataForm = new FormData()
      dataForm.append("videoID", this.videoID)
      dataForm.append("userID", loginUserID)
      // console.log('?',dataForm.get("videoID"))
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoByID/',
        data: dataForm
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                this.hasFavored = res.data.isFavored
                break;
              case 4001:
                this.$message.warning('视频不存在！');
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    }
  },
  mounted() {
    //console.log("wtf",this.videoID)
    const vid = this.videoID
    const dataForm = new FormData()
    dataForm.append("videoID", vid.toString())
    //console.log('?',dataForm.get("videoID"))
    this.$axios({
      method: 'post',
      url: '/VideoManager/getVideoByID/',
      data: dataForm,
    })
        .then(
            res => {
              //console.log(res.data)
              if (res.data.error === 0) {
                this.videoTitle = res.data.videoTitle
                this.uploaderName = res.data.upName
                this.videoCover = res.data.VideoCover
                this.uploadID=res.data.upID
              } else {
                this.$message(res.data.msg)
              }
            }
        )
  },
  methods:{
    changeFavor() {
      if(this.hasLogin){
        const userInfo = user.getters.getUser(user.state());
        const loginUserID = userInfo.user.userID;
        const favorForm = new FormData()
        favorForm.append("userID",loginUserID)
        favorForm.append("videoID",this.videoID)
        // console.log('?',dataForm.get("videoID"))
        this.$axios({
          method: 'post',
          url: '/VideoInteraction/favourites/',
          data: favorForm
        })
            .then(res =>{
              switch (res.data.error) {
                case 0:
                  this.hasFavored = true;
                  break;
              }
            })
            .catch(err => {
              console.log(err);
            })
      }else {
        this.$router.push({path: '/login'});
      }
    },
    cancelFavor() {
      this.visible=false
      if(this.hasLogin){
        const userInfo = user.getters.getUser(user.state());
        const loginUserID = userInfo.user.userID;
        const favorForm = new FormData()
        favorForm.append("userID",loginUserID)
        favorForm.append("videoID",this.videoID)
        // console.log('?',dataForm.get("videoID"))
        this.$axios({
          method: 'post',
          url: '/VideoInteraction/cancelfavourites/',
          data: favorForm
        })
            .then(res =>{
              switch (res.data.error) {
                case 0:
                  this.hasFavored = false;
                  break;
              }
            })
            .catch(err => {
              console.log(err);
            })
      }else {
        this.$router.push({path: '/login'});
      }
    },
    toVideo(){
      let path = this.$router.resolve('/video/'+this.videoID);
      window.open(path.href)
    },
    ToUser(){
      this.$router.push('/user/'+this.uploadID);
      location.reload();
    }
  }
}
</script>

<style>
  .info-in-user-favor{
    display: flex;
    flex-direction: column;
    width: 520px;
  }
</style>
