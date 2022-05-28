<template>
  <div class="home">
    <div class="img-box">
      <img src="../../assets/icons/home-wel.png">
    </div>
    <div class="channel-video">
      <div class="video-channel">
        <a class="channel-link">知识</a>
        <a class="channel-link">科技</a>
        <a class="channel-link">资讯</a>
        <a class="channel-link">生活</a>
        <a class="channel-link">公益</a>
        <a class="channel-link">音乐</a>
        <a class="channel-link">舞蹈</a>
        <a class="channel-link">美食</a>
        <a class="channel-link">运动</a>
        <a class="channel-link">影视</a>
        <a class="channel-link">历史</a>
        <a class="channel-link">娱乐</a>
      </div>
      <div class="video-box">
        <div class="line-1">
          <VideoCover class="video-cover"></VideoCover>
          <VideoCover class="video-cover"></VideoCover>
          <VideoCover class="video-cover"></VideoCover>
        </div>
        <div class="line-1">
          <VideoCover class="video-cover"></VideoCover>
          <VideoCover class="video-cover"></VideoCover>
          <VideoCover class="video-cover"></VideoCover>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import VideoCover from "@/components/videopage/videopage";
export default {
  name: 'HomeView',
  components: {VideoCover},
}
</script>
<style>

.home{
  background-image: url("../../assets/images/home-background.jpg");
  width: 100%;
  height: 800px;
  overflow-x:hidden;
  text-align: center;
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
  margin-top:50px;
  margin-left: 80px;
}

.line-1{
  flex: 1;
  display: flex;
}


.channel-video{
  flex: 1;
  display: flex;
}

.video-channel{
  display:flex;
  position: relative;
  text-align:center;
  top:100px;
  left: 50px;
  width: 80px;
  height: 450px;
  margin-right: 30px;
  flex-flow: column;
  background-color: rgba(255,255,255,0.5);
  border-radius: 6px;
}

.channel-link{
  display: inline-block;
  box-sizing: content-box;
  margin-top: 10px;
  margin-left: 9px;
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
