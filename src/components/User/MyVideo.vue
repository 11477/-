<template>
  <div id="video-history">
    <div @click="toVideo">
      <img class="cover-in-video-history" :src=videoCover alt="视频封面" style="cursor: pointer">
    </div>
    <div class="info-in-user-favor">
      <div class="title-in-video-history" @click="toVideo" style="cursor: pointer">{{ videoTitle }}</div>
      <div style="color: grey; margin-bottom: 5px">上传时间: {{ videoDate }}</div>
      <div style="color: #444444">播放数: {{ viewNum }} 点赞数: {{ likeNum }}  收藏数: {{ favorNum }}  评论数: {{ commentNum }}</div>
    </div>
    <div class="favor-in-user-favor" style="margin-top: 40px; margin-left: 10px" v-if="isMine">
      <template>
        <el-popover
            placement="bottom"
            width="80"
            v-model="deleteVisible">
          <p style="text-align: center">确认删除视频？</p>
          <div style="text-align: center; margin-top: 10px">
            <el-button size="mini" type="text" @click="deleteVisible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="deleteVideo">确定</el-button>
          </div>
          <el-button slot="reference">删除</el-button>
        </el-popover>
      </template>
    </div>
    <div class="favor-in-user-favor" style="margin-top: 38px" v-else>
      <el-popover placement="bottom" v-model="visible" trigger="hover" v-if="hasFavored">
        <div style="text-align: center">
          <el-button @click="hasFavored=false; visible=false">取消收藏</el-button>
        </div>
        <el-button style="background: #00aeec; color: white" slot="reference">已收藏</el-button>
      </el-popover>
      <el-button @click="changeFavor" v-else> + 收藏</el-button>
    </div>
  </div>
</template>

<script>
import user from "@/store/user";

export default {
  name: "MyVideo",
  data(){
    return{
      visible: false,
      deleteVisible: false,
      hasFavored: true,
      loginUserID: 0,
      videoCover: '',
      videoTitle: 'title',
      videoDate: '日期',
      viewNum: 0,
      likeNum: 0,
      favorNum: 0,
      commentNum: 0
    };
  },
  props:{
    videoID:{
      default: 0
    },
    isMine:{
      default: false
    },
    hasLogin:{
      default: true
    },

  },
  mounted() {
    //console.log("wtf",this.videoID)
    const vid = this.videoID
    const dataForm = new FormData()
    dataForm.append("videoID", vid.toString())
    //console.log('?',dataForm.get("videoID"))
    this.$axios({
      method: 'post',
      url: '/VideoManager/getVideoByID/',
      data: dataForm,
    })
        .then(
            res => {
              //console.log(res.data)
              if (res.data.error === 0) {
                this.viewNum = res.data.videoPlayNum
                this.likeNum = res.data.videoLikeNum
                this.favorNum = res.data.videoFavorNum
                this.videoTitle = res.data.videoTitle
                this.commentNum = res.data.videoCommentNum
                this.videoDate = res.data.uploadDate
                this.videoCover = res.data.VideoCover
              } else {
                this.$message(res.data.msg)
              }
            }
        )
  },
  created() {
    const userInfo = user.getters.getUser(user.state());
    if(userInfo){
      this.loginUserID = userInfo.user.userID;
    }
  },
  methods:{
    toVideo(){
      this.$router.push('/video/'+this.videoID);
    },
    changeFavor() {
      if(this.hasLogin){
        this.hasFavored = true;
      }else {
        this.$router.push({path: '/login'});
      }
    },
    deleteVideo(){
      this.deleteVisible = false;
      const formData = new FormData();
      formData.append("videoID", this.videoID);
      formData.append("userID", this.loginUserID);
      this.$axios({
        method: 'post',
        url: 'VideoManager/deletevideo/',
        data: formData,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                this.$message.success("删除成功");
                location.reload();
                break;
              case 4001:
                this.$message.warning('用户不存在！');
                break;
              case 4002:
                this.$message.error('未登录！');
                break;
              case 4003:
                this.$message.error('没有删除权限！');
                break;
              case 3001:
                this.$message.error('表单信息有有误！');
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    }
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
