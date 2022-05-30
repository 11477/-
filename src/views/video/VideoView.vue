<template>
  <div class="video-wrap" id="video-wrap">
    <div class="video-info" id="video-info">
      <div class="l-con" id="l-con">
        <h1 class="video-title" id="video-title" title="???">
          <span class="tit">{{videoTitle}}</span>
        </h1>
        <div class="video-data" id="video-data">
          <span title="view" class="video-view">
            {{videoView}}
          </span>
          <span>
            {{uploadDate}}
          </span>
        </div>
      </div>
      <div class="r-con" id="r-con">
        <div class="up-info" id="up-info">
          <div class="up-avatar">
            <el-avatar :src=upAvatar></el-avatar>
          </div>
          <div class="up-info-right">
            <div class="up-info-name">
              {{upName}}
            </div>
            <div class="up-info-desc">
              {{upDesc}}
            </div>
            <div class="subscribe">
              <el-button size="mini">+ 关注</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="player">
      <ArtPlayer @get-instance="getInstance" :option="option" :style="style" :key="videoKey"/>
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
        {{videoDesc}}
        </div>
        <div class="desc-info" v-else>
        {{videoDesc}}
        </div>
      </div>
      <el-button size="mini" type="text" class="desc-shrink-button" @click="this.shrinkDesc" style="background-color: white;color: #505050" v-if="descSpread">
        收起
      </el-button>
      <el-button size="mini" type="text" class="desc-spread-button" @click="this.spreadDesc" style="background-color: white;color: #505050" v-else>
        展开
      </el-button>
    </div>
    <comment class="video-comment"
             :label="this.userLabel"
             :avatar="this.avatar"
             :commentList="this.commentList"
              :placeholder="this.commentPlaceholder"
             :authorID="9"
             @doSend="sendComment"
              :commentNum="this.commentNum"></comment>
  </div>
</template>

<script>
import ArtPlayer from "@/components/player/ArtPlayer.vue";
import comment from 'bright-comment'
import LikeBefore from "@/assets/icons/like-before.png";
import LikeHover from "@/assets/icons/like-hover.png"
import FavorBefore from "@/assets/icons/favor-before.png";
import FavorHover from "@/assets/icons/favor-hover.png"
import user from "@/store/user";

export default {
  name: "VideoView",
  data() {
    return {
      videoKey: 0,
      videoTitle: "你的名字",
      videoView: 114514,
      upName: "nohesitate",
      upDesc: "不为所动，做最好的自己",
      uploadDate: "2022年5月28日",
      upAvatar: "https://nohesitate-1312201606.cos.ap-beijing.myqcloud.com/UserAvatar/mkm1.png",
      videoDesc:"https://github.com/Jiangli531/Video-Share-Django",
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
        url: "https://nohesitate-1312201606.cos.ap-beijing.myqcloud.com/Video/1605246838000",
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
      userLabel: '',
      commentPlaceholder: 'say something',
      commentNum:1,
      avatar:require('../../assets/logos/init-logo.png'),
      commentList:[

      ]
    };
  },
  components: {
    ArtPlayer,
    comment,
  },
  created() {
   // console.log(this.$route.params.VideoID)
    const vid = this.$route.params.VideoID
    const dataForm = new FormData()
    dataForm.append("videoID",vid)
    //console.log('?',dataForm.get("videoID"))
    this.$axios({
      method: 'post',
      url: '/VideoManager/getVideoByID/',
      data: dataForm,
    })
    .then(
        res=>{
          console.log(res)
          this.videoTitle=res.data.videoTitle
          this.option.url=res.data.videoSrc
          //this.commentList=res.data.videoComment
          this.videoKey=1
          this.videoDesc=res.data.videoDesc
          this.upName=res.data.upName
          this.upDesc=res.data.upDesc

        }
    )
  },
  methods: {
    sendComment(comment){
      var commentForm = new FormData()
      const vid = this.$route.params.VideoID
      const uid = user.getters.getUser(user.state()).user.userID
      commentForm.append("videoid",vid)
      commentForm.append("userid",uid)
      commentForm.append("comment",comment)
      //console.log(commentForm.get("comment"))
      this.$axios({
        method: 'post',
        url: '/VideoInteraction/comment/',
        data: commentForm,
      })
      .then(res=>{
        if(res.data.error===0){
          this.$message.success(res.data.msg)
        }else {
          this.$message.error(res.data.msg)
        }
        location.reload()
      })
     // console.log(comment)
    },
    getInstance(art) {
     // console.log(art)
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
      //console.log("enter")
      //console.log(this.$route.params)
      this.likeImg=LikeHover
    },
    onLeaveLike(){
      //console.log("leave")
      this.likeImg=LikeBefore
    },
    onEnterFavor(){
      //console.log("enter")
      this.favorImg=FavorHover
    },
    onLeaveFavor(){
    this.favorImg=FavorBefore
    },
    resetForm(formName) {
      //console.log('nani')
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
.video-comment {
  width: 900px;
  margin: 0 auto;
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
