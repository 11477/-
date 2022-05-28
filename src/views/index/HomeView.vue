<template>
  <div class="home">
    <div class="img-box">
<!--      <img src="">-->
    </div>
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
      <VideoCover class="video-cover">
      </VideoCover>
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
}

.home img{
  vertical-align: middle;
}

.video-cover{
  left: 20px;
  top:40px;
}

.video-channel{
  display:flex;
  position: relative;
  text-align:center;
  margin:0 auto;
  width: 80px;
  height: 75px;
  flex-flow: column;
  top:15px;
  background-color: rgba(255,255,255,0.5);
  border-radius: 6px;
}

.channel-link{
  display: inline-block;
  box-sizing: content-box;
  margin-top: 10px;
  margin-left: 5px;
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
