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
          <el-button @click="hasFavored=false; visible=false">取消收藏</el-button>
        </div>
        <el-button style="background: #00aeec; color: white" slot="reference">已收藏</el-button>
      </el-popover>
      <el-button @click="changeFavor" v-else> + 收藏</el-button>
    </div>
  </div>
</template>

<script>
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
        this.hasFavored = true;
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
