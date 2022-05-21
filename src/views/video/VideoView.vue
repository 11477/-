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
      <div class="video-desc">
        <div class="desc-info-open" v-if="this.descSpread">
          这里是一段简介然后呢咱们就是说因为简介的内容需要比较长所以我需要在这里水一点东西就像这样在去年进行的东京奥运会男子4×100米决赛中，由苏炳添、谢震业、吴智强和汤星强组成的中国队跑出37秒79的成绩，位居第四，意大利队、英国队和加拿大队分获前三名。国际体育仲裁法庭（CAS）今年2月18日发布公告，认定英国短跑运动员奇金杜·乌贾在东京奥运会期间违反了反兴奋剂条例，乌贾在东京奥运会男子4×100米接力决赛和男子100米比赛中取得的成绩都被取消，英国队在东京奥运会男子4×100米接力决赛中获得的银牌也被剥夺。加拿大队递补获得银牌，中国队递补获得铜牌。这也是中国男子4×100米接力队在奥运会上获得的首枚奖牌。今年3月，世界田联官网更新了包括苏炳添在内的中国男子4×100米接力队成员资料介绍，在荣誉一栏中，均添加了“奥运会铜牌得主”。

          递补获得奖牌，中国田径运动员们在过去几届奥运会中有过不少这样的经历，2008年北京奥运会，年仅19岁的巩立姣以19米20的成绩排名女子铅球第五。不过此后，亚军和季军米赫涅维奇、奥斯塔普丘克都未能通过药检，巩立姣因此递补获得了铜牌。2012年伦敦奥运会，铅球银牌得主俄罗斯人克洛德科在新一轮重检后，又被查出服用禁药。巩立姣又在没有站上领奖台的情况下，成为了奥运银牌得主。
        </div>
        <div class="desc-info" v-else>
          这里是一段简介然后呢咱们就是说因为简介的内容需要比较长所以我需要在这里水一点东西就像这样在去年进行的东京奥运会男子4×100米决赛中，由苏炳添、谢震业、吴智强和汤星强组成的中国队跑出37秒79的成绩，位居第四，意大利队、英国队和加拿大队分获前三名。国际体育仲裁法庭（CAS）今年2月18日发布公告，认定英国短跑运动员奇金杜·乌贾在东京奥运会期间违反了反兴奋剂条例，乌贾在东京奥运会男子4×100米接力决赛和男子100米比赛中取得的成绩都被取消，英国队在东京奥运会男子4×100米接力决赛中获得的银牌也被剥夺。加拿大队递补获得银牌，中国队递补获得铜牌。这也是中国男子4×100米接力队在奥运会上获得的首枚奖牌。今年3月，世界田联官网更新了包括苏炳添在内的中国男子4×100米接力队成员资料介绍，在荣誉一栏中，均添加了“奥运会铜牌得主”。

          递补获得奖牌，中国田径运动员们在过去几届奥运会中有过不少这样的经历，2008年北京奥运会，年仅19岁的巩立姣以19米20的成绩排名女子铅球第五。不过此后，亚军和季军米赫涅维奇、奥斯塔普丘克都未能通过药检，巩立姣因此递补获得了铜牌。2012年伦敦奥运会，铅球银牌得主俄罗斯人克洛德科在新一轮重检后，又被查出服用禁药。巩立姣又在没有站上领奖台的情况下，成为了奥运银牌得主。
        </div>
      </div>
      <el-button size="mini" type="text" class="desc-shrink-button" @click="this.shrinkDesc" style="background-color: white;color: #505050" v-if="descSpread">
        收起
      </el-button>
      <el-button size="mini" type="text" class="desc-spread-button" @click="this.spreadDesc" style="background-color: white;color: #505050" v-else>
        展开
      </el-button>
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
      descSpread: false,
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
      console.log(art)
    },
    changeLike() {
      this.isLiked=!this.isLiked
    },
    changeFavor() {
      this.isFavored=!this.isFavored
    },
    spreadDesc() {
      this.descSpread=true
    },
    shrinkDesc(){
      this.descSpread=false
    },
    onEnterLike(){
      console.log("enter")
      console.log(this.$route.params)
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
      this.$refs[formName].resetFields()
    },
    cancelReport(){
      this.reportVisible=false
      this.resetForm('reportForm')
    }
  },
}
</script>

<style scoped>
.video-wrap .video-desc{
  margin-top: 16px;
}
.video-desc {
  position: relative;
  align-content: center;
}

.desc-shrink-button{
  float: left;
  cursor: pointer;
  font-size: 14px;
  color: #505050;
}
.desc-spread-button{
  float: left;
  cursor: pointer;
  font-size: 14px;
  color: #505050;
}
.desc-info {
  white-space: pre-line;
  transition: height 0.3s;
  font-size: 12px;
  color: #212121;
  letter-spacing: 0;
  line-height: 18px;
  height: 63px;
  width: 900px;
  text-align: left;
  overflow: hidden;
}
.desc-info-open{
  white-space: pre-line;
  transition: height 0.3s;
  font-size: 12px;
  color: #212121;
  letter-spacing: 0;
  line-height: 18px;
  width: 900px;
  text-align: left;
  overflow: hidden;
  height: auto;
}
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
  margin-right: 20px;
}
.player {
  display: inline-block;
  margin-right: 100px;
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
  margin-top: 20px;
  width: 638px;
}
.r-con {
  width: 320px;
  margin-left: 30px;
}
</style>
