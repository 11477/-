<template>
  <div id="video-history">
    <div @click="toVideo">
      <img class="cover-in-video-history" src="../../assets/avatar/head.jpeg" alt="banner">
    </div>
    <div class="info-in-user-favor">
      <div class="title-in-video-history" @click="toVideo">{{ videoTitle }}</div>
      <div style="color: grey; margin-bottom: 5px">上传时间: {{ videoDate }}</div>
      <div style="color: #444444">播放数: {{ viewNum }} 点赞数: {{ likeNum }}  收藏数: {{ favorNum }}  评论数: {{ commentNum }}</div>
    </div>
    <div class="favor-in-user-favor" style="margin-top: 40px; margin-left: 10px">
      <template>
        <el-popconfirm
            title="确定删除此视频？"
        >
          <el-button slot="reference">删除</el-button>
        </el-popconfirm>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyVideo",
  data(){
    return{
      visible: false,
      hasFavored: true,
      viewNum: 5674,
      commentNum: 31,
      likeNum: 66,
      favorNum: 77,
      videoTime: "22:21",
      videoTitle: "操作系统k48",
      uploaderName: "不知道捏",
      videoDate: "5-28",
      videoCover: ""
    };
  },
  props:{
    videoID:{
      type: Number,
      default: 0,
    },
  },
  methods:{
    ToVideo(){
      this.$router.push('/video/'+this.videoID);
    },
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