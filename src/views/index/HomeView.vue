<template>
  <div class="home">
    <div class="img-box">
<!--      <img src="">-->
    </div>
    <div class="video-channel">
        <a class="channel-link">分区1</a>
        <a class="channel-link">分区2</a>
        <a class="channel-link">分区3</a>
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

.video-cover{
  margin-top: 40px;
  margin-left: 50px;
}

.video-channel{
  display: flex;
  align-items: center;
  background: white;
  width: 800px;
  height:20px;
}

.channel-link{
  display: inline-block;
  box-sizing: content-box;
  width: 100%;
  height: 100%;
  border: 1px solid white;
  border-radius: 6px;
  background-color: gray;
  color: black;
  text-align: center;
  font-weight: 400;
  transition: background-color .3s,color .3s;
}

</style>
