<template>
  <div class="video-wrap" id="video-wrap">
    <div class="video-info" id="video-info">
      <div class="l-con" id="l-con">
        <h1 class="video-title" id="video-title" title="???">
          <span class="tit">这里是视频标题</span>
        </h1>
        <div class="video-data" id="video-data">
          <span title="view" class="video-view">
            这里是视频播放量
          </span>
          <span>
            这里是视频上传时间
          </span>
        </div>
      </div>
      <div class="r-con" id="r-con">
        <div class="up-info" id="up-info">
          <div class="up-avatar">
            <el-avatar src="https://thumbnail1.baidupcs.com/thumbnail/54f1a42eb59f7dd81a6b0a062b13d3a1?fid=2595694748-250528-954926140138011&rt=pr&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-8jgg73csXFKg57VELOOhUxG8p0U%3d&expires=8h&chkbd=0&chkv=0&dp-logid=8842066600362229220&dp-callid=0&time=1652428800&size=c1536_u864&quality=90&vuk=2595694748&ft=image&autopolicy=1"></el-avatar>
          </div>
          <div class="up-info-right">
            <div class="up-info-name">
              这里是UP主的名字
            </div>
            <div class="up-info-desc">
              这里是UP主的简介
            </div>
            <div class="subscribe">
              <el-button size="mini">+ 关注</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="player">
      <ArtPlayer @get-instance="getInstance" :option="option" :style="style" />
      <div class="interact">
        <div class="interact-button">
          <img src="../../assets/icons/like-after.png" class="button-icon" alt="liked" v-if="this.isLiked"
               @click="changeLike">
          <img :src="this.likeImg" class="button-icon" alt="not liked" v-else
               @click="changeLike"
               @mouseenter="onEnterLike"
               @mouseleave="onLeaveLike">
        </div>
        <div class="interact-button">
         <img src="../../assets/icons/favor-after.png" class="button-icon" alt="favored" v-if="this.isFavored" @click="changeFavor">
         <img :src="this.favorImg" width="50px" class="button-icon" alt="not favored" v-else
              @click="changeFavor"
              @mouseenter="onEnterFavor"
              @mouseleave="onLeaveFavor">
        </div>
        <div class="report">
          <el-button type="primary" size="small" @click=" reportVisible=true" >投诉稿件</el-button>
        </div>

        <el-dialog title="稿件投诉" :visible.sync="reportVisible">
          <el-form :model="reportForm" ref="reportForm">
            <el-form-item label="">
              <el-radio-group v-model="reportForm.resource" prop="reportReason">
                <el-radio label="违法违纪" name="type"></el-radio>
                <el-radio label="低俗内容" name="type"></el-radio>
                <el-radio label="暴力血腥" name="type"></el-radio>
                <el-radio label="人身攻击" name="type"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelReport">取 消</el-button>
            <el-button type="primary" @click="reportVisible = false">确 定</el-button>
          </div>
        </el-dialog>


      </div>
    </div>
  </div>
</template>

<script>
import ArtPlayer from "@/components/player/ArtPlayer.vue";
import LikeBefore from "@/assets/icons/like-before.png";
import LikeHover from "@/assets/icons/like-hover.png"
import FavorBefore from "@/assets/icons/favor-before.png";
import FavorHover from "@/assets/icons/favor-hover.png"

export default {
  name: "VideoView",
  data() {
    return {
      isLiked: false,
      isFavored: false,
      likeImg: LikeBefore,
      favorImg: FavorBefore,
      reportVisible: false,
      formLabelWidth: '120px',
      reportForm:{
      name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
    },
      option: {
        url: "https://artplayer.org/assets/sample/video.mp4",
        title: "Your name",
        volume: 0.5,
        autoMini: true,
        fullscreen: true,
        mutex: true,
        fullscreenWeb: true,
        miniProgressBar: true,
        flip: true,
        playbackRate: true,
        aspectRatio: true,
        setting: true,
      },
      style: {
        width: "900px",
        height: "550px",
        margin: "0",
      },
    };
  },
  components: {
    ArtPlayer,
  },
  methods: {
    getInstance(art) {
      console.log(art);
    },
    changeLike() {
      this.isLiked=!this.isLiked;
    },
    changeFavor() {
      this.isFavored=!this.isFavored;
    },
    onEnterLike(){
      console.log("enter")
      this.likeImg=LikeHover
    },
    onLeaveLike(){
      console.log("leave")
      this.likeImg=LikeBefore
    },
    onEnterFavor(){
      console.log("enter")
      this.favorImg=FavorHover
    },
    onLeaveFavor(){
    this.favorImg=FavorBefore
    },
    resetForm(formName) {
      console.log('nani')
      this.$refs[formName].resetFields();
    },
    cancelReport(){
      this.reportVisible=false
      this.resetForm('reportForm')
    }
  },
}
</script>

<style scoped>
.video-wrap .interact{
  position: relative;
  margin-top: 16px;
  line-height: 30px;
  height: 28px;
  font-size: 14px;
  color: #505050;
  border-bottom: 1px solid #e5e9f0;
  padding-bottom: 12px;
}
.interact .interact-button {
  display: inline-block;
  cursor: pointer;
  margin-left: 15px;
  float: left;
}
.interact-button .button-icon{
  width: 30px;
  height: 30px;
}
.report{
  float: right;
  margin-right: 30px;
}
.player {
  display: inline-block;
}
.el-button {
  background: #00A1D6;
  color: white;
}
.el-button:hover {
  background: #66ccff;
  color: white;
}
.video-wrap .up-info {
  display: flex;
  box-sizing: border-box;
  height: 96px;
  padding-top: 15px;
  padding-bottom: 12px;
}
.up-info .up-avatar {
  float: left;
  width: 48px;
  height: 48px;
  position: relative;
}
.up-info .up-info-right{
  float: left;
  margin-left: 15px;
}
.up-info .up-info-desc {
  margin-top: 4px;
  width: 256px;
  font-size: 12px;
  line-height: 16px;
  height: 16px;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.subscribe {
  float: left;
}
.up-info .up-info-name {
  position: relative;
  font-size: 14px;
  color: #212121;
  font-weight: 500;
  display: inline-block;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: top;
}
.video-wrap {
  max-width: 1984px;
  min-width: 988px;
  margin: 0 auto;
  justify-content: center;
  background: #fff;
}
.video-wrap .video-info {
  max-width: 1984px;
  min-width: 988px;
  margin: 0 auto;
  display: flex;
  text-align: left;
  justify-content: center;
  background: #fff;
}
.video-info .video-title {
  font-size: 18px;
  font-weight: 500;
  color: #212121;
  line-height: 26px;
  height: 26px;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.video-info .video-title .tit {
  vertical-align: middle;
}
.video-info .video-data {
  font-size: 12px;
  height: 16px;
  color: #999;
  align-items: center;
  text-overflow: ellipsis;
}
.video-data .video-view{
  margin-right: 20px;
}
.video-info .video-data span {
  display: inline-block;
  height: 16px;
}
.l-con {
  width: 638px;
}
.r-con {
  width: 320px;
  margin-left: 30px;
}
</style>
