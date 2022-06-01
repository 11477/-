<template>
  <div class="home">
    <div class="img-box">
      <img src="../../assets/icons/home-wel.png">
    </div>
    <div class="channel-video">
      <div class="video-box" >
        <VideoCover :videoID=colum v-for="colum in auditVideoList" v-bind:key="colum"></VideoCover>
      </div>
      <div class="video-channel">
        <a class="channel-link" @click="getNewVideo('knowledge')">知识</a>
        <a class="channel-link" @click="getNewVideo('science')">科技</a>
        <a class="channel-link" @click="getNewVideo('info')">资讯</a>
        <a class="channel-link" @click="getNewVideo('life')">生活</a>
        <a class="channel-link" @click="getNewVideo('charity')">公益</a>
        <a class="channel-link" @click="getNewVideo('music')">音乐</a>
        <a class="channel-link" @click="getNewVideo('dance')">舞蹈</a>
        <a class="channel-link" @click="getNewVideo('food')">美食</a>
        <a class="channel-link" @click="getNewVideo('sport')">运动</a>
        <a class="channel-link" @click="getNewVideo('movie')">影视</a>
        <a class="channel-link" @click="getNewVideo('history')">历史</a>
        <a class="channel-link" @click="getNewVideo('entertainment')">娱乐</a>
      </div>
    </div>

  </div>
</template>

<script>
import VideoCover from "@/components/videopage/videopage";
export default {
  name: 'HomeView',
  components: {VideoCover},
  data(){
    return{
      auditVideoList:[
      ],
    }
  },
  created() {
    const requestForm = new FormData()
    requestForm.append('Type','Any')
    this.$axios({
      method: 'post',
      url: '/VideoManager/getVideoIDByCondition/',
      data: requestForm
    })
        .then(res=>{
          console.log(res)
          this.auditVideoList=res.data.videoID_list
        })
  },
  methods:{
    getNewVideo(param){
      console.log(param)
      const requestForm = new FormData()
      requestForm.append('Type',param)
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
            console.log(res)
            this.auditVideoList=res.data.videoID_list
          })
    },
  }
}
</script>
<style>

.home{
  position: absolute;
  background: url("../../assets/images/home-background.jpg") no-repeat;
  width: 100%;
  height: 800px;
  overflow-x:hidden;
  text-align: center;
  background-size: cover;
  background-color: #464646;
  background-attachment: fixed;
  background-position: center center;
}

.img-box{
  width: 80%;
  margin-left: 150px;
  margin-top: 40px;
  text-align: center;
}

.img-box img{
  width: 100%;
  height: 100%;
}

.home img{
  vertical-align: middle;
}

.video-cover{
  margin-left: 10px;
  margin-right: 10px;
}

.video-box{
  display: flex;
  flex-wrap: wrap;
  margin-left: 100px;
}

.line-1{
  flex: 1;
  display: flex;
}


.channel-video{
  width: 1450px;
  flex: 1;
  display: flex;
}

.video-channel{
  position: absolute;
  text-align:center;
  top:130px;
  width: 80px;
  height: 455px;
  margin-left: 1400px;
  margin-top: 50px;
  flex-flow: column;
  background-color: rgba(255,255,255,0.5);
  border-radius: 6px;
}

.channel-link{
  display: inline-block;
  box-sizing: content-box;
  margin-top: 10px;
  width: 60px;
  height: 25px;
  border: 1px solid rgb(241,242,243);
  border-radius: 6px;
  background-color: rgba(246,247,248,0.7);
  color: rgb(97,102,109);
  text-align: center;
  font-weight: 400;
  transition: background-color .3s,color .3s;
  cursor: pointer;
}

.channel-link:hover{
  background-color: rgba(128,128,128,0.7);
}

</style>
