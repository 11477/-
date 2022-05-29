<template>
  <div id="video-history">
    <div @click="toVideo">
      <img class="cover-in-video-history" src="../../assets/avatar/head.jpeg" alt="banner" style="cursor: pointer">
    </div>
    <div class="info-in-user-favor">
      <div class="title-in-video-history" @click="toVideo" style="cursor: pointer">{{ videoTitle }}</div>
      <div style="color: grey; margin-bottom: 5px">上传时间: {{ videoDate }}</div>
      <div style="color: #444444">播放数: {{ viewNum }} 点赞数: {{ likeNum }}  收藏数: {{ favorNum }}  评论数: {{ commentNum }}</div>
    </div>
    <div class="favor-in-user-favor" style="margin-top: 40px; margin-left: 10px" v-if="isMine">
      <template>
        <el-popconfirm
            title="确定删除此视频？"
        >
          <el-button slot="reference">删除</el-button>
        </el-popconfirm>
      </template>
    </div>
    <div class="favor-in-user-favor" style="margin-top: 38px" v-else>
      <el-popover placement="bottom" v-model="visible" trigger="hover" v-if="hasFavored">
        <div style="text-align: center">
          <el-button @click="hasFavored=false; visible=false">取消收藏</el-button>
        </div>
        <el-button style="background: #00aeec; color: white" slot="reference">已收藏</el-button>
      </el-popover>
      <el-button @click="hasFavored=true" v-else> + 收藏</el-button>
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
    isMine:{
      default: false
    },
    hasLogin:{
      default: true
    }
  },
  methods:{
    toVideo(){
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
