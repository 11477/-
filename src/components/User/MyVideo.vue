<template>
  <div id="video-history">
    <img class="cover-in-video-history" src="../../assets/avatar/head.jpeg" alt="banner">
    <div class="info-in-user-favor">
      <div class="title-in-video-history">视频标题</div>
      <div style="color: grey; margin-bottom: 5px">上传时间: 2020-02-13 12:05</div>
      <div style="color: #444444">播放数: 66 点赞数: 66  收藏数: 66  评论数: 66</div>
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
      hasFavored: true
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