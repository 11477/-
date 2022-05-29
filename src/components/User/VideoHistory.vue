<template>
  <div id="video-history">
    <img class="cover-in-video-history" src="../../assets/avatar/head.jpeg" alt="banner">
    <div class="info-in-video-history">
      <div class="title-in-video-history">视频标题</div>
      <div>up猪名字</div>
      <div style="color: grey; margin-top: 10px">2020-02-13 12:05</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoHistory"
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
</style>