<template>
  <div id="video-history">
    <img class="cover-in-video-history" src="../../assets/avatar/head.jpeg" alt="banner" style="cursor: pointer">
    <div class="info-in-user-favor">
      <div class="title-in-video-history" style="cursor: pointer">{{videoTitle}}</div>
      <div style="cursor: pointer">{{uploaderName}}</div>
    </div>
    <div class="favor-in-user-favor" style="margin-top: 38px">
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
  name: "UserFavor",
  data(){
    return{
      visible: false,
      hasFavored: true,
      videoTitle: "视频标题",
      uploaderName: "up名",
      videoCover: ""
    };
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
