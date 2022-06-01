<template>
  <div id="video-history">
    <img class="cover-in-video-history" :src=videoCover alt="视频封面" @click="ToVideo">
    <div class="info-in-video-history">
      <div class="title-in-video-history" @click="ToVideo">{{ videoTitle }}</div>
      <div @click="ToUser" class="upload-name">{{ uploaderName }}</div>
      <div style="color: grey; margin-top: 10px">{{ viewTime }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoHistory",
  data(){
    return{
      uploadID:0,
    }
  },
  props:{
    viewTime:{default: "浏览时间"},
    videoTitle:{default: "视频标题"},
    uploaderName:{default: "up用户名"},
    videoID:{default:0},
    videoCover:{},
  },
  mounted() {
    //console.log("wtf",this.videoID)
    const vid = this.videoID
    const dataForm = new FormData()
    dataForm.append("videoID", vid.toString())
    this.$axios({
      method: 'post',
      url: '/VideoManager/getVideoByID/',
      data: dataForm,
    })
        .then(
            res => {
              if (res.data.error === 0) {
                this.uploadID=res.data.upID
              } else {
                this.$message(res.data.msg)
              }
            }
        )
  },
  methods:{
    ToVideo(){
      let path = this.$router.resolve('/video/'+this.videoID);
      window.open(path.href)
    },
    ToUser(){
      this.$router.push('/user/'+this.uploadID);
      location.reload();
    }
  },

}
</script>

<style>
#video-history{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 20px;
  width: 800px;
  display: flex;
  flex-direction: row;
  text-align: left;
}
.cover-in-video-history{
  width: 150px;
  height: 100px;
  margin: 10px;
  border-radius: 5px;
}
.cover-in-video-history:hover{
  cursor: pointer;
}
.info-in-video-history{
  display: flex;
  flex-direction: column;
  width: 620px;
}
.title-in-video-history{
  margin-top: 15px;
  margin-bottom: 5px;
  font-size: 25px;
  font-family: "video-title-black",serif;
}
.title-in-video-history:hover{
  cursor: pointer;
}
.upload-name{
  cursor: pointer;
}
</style>
