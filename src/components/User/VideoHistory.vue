<template>
  <div id="video-history">
    <img class="cover-in-video-history" :src=videoCover alt="视频封面">
    <div class="info-in-video-history">
      <div class="title-in-video-history">{{ videoTitle }}</div>
      <div>{{ uploaderName }}</div>
      <div style="color: grey; margin-top: 10px">{{ viewTime }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoHistory",
  data(){
    return{

    }
  },
  props:{
    viewTime:{default: "浏览时间"},
    videoTitle:{default: "视频标题"},
    uploaderName:{default: "up用户名"},
    videoID:{required:true},
    videoCover:{}
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
</style>