<template>
  <div style="position: absolute;margin-top: 60px">
    <div v-if="showVideo" class="video-wrap" id="video-wrap">
      <div class="video-info" id="video-info">
        <div class="l-con" id="l-con">
          <h1 class="video-title" id="video-title" title="???">
            <span class="tit">{{ videoTitle }}</span>
          </h1>
          <div class="video-data" id="video-data">
          <span title="view" class="video-view">
            {{ videoView }}
          </span>
            <span>
            {{ uploadDate }}
          </span>
          </div>
        </div>
        <div class="r-con" id="r-con">
          <div class="up-info" id="up-info">
            <div class="up-avatar" @click="toUpSpace">
              <el-avatar :src=upAvatar></el-avatar>
            </div>
            <div class="up-info-right">
              <div class="up-info-name" @click="toUpSpace">
                {{ upName }}
              </div>
              <div class="up-info-desc">
                {{ upDesc }}
              </div>
              <div class="subscribe">
                <el-button size="mini" style="width: 200px" type="info" v-if="isFollow" @click="cancelFollowUp"> 已关注
                  {{ upFans }}
                </el-button>
                <el-button size="mini" style="width: 200px" type="primary" @click="followUp" v-else> + 关注 {{ upFans }}
                </el-button>
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
                 @click="cancelLike">
            <img :src="this.likeImg" class="button-icon" alt="not liked" v-else
                 @click="like"
                 @mouseenter="onEnterLike"
                 @mouseleave="onLeaveLike">
            {{ likeNum }}
          </div>
          <div class="interact-button">
            <img src="../../assets/icons/favor-after.png" class="button-icon" alt="favored" v-if="this.isFavored"
                 @click="cancelFavor">
            <img :src="this.favorImg" width="50px" class="button-icon" alt="not favored" v-else
                 @click="favor"
                 @mouseenter="onEnterFavor"
                 @mouseleave="onLeaveFavor">
            {{ favorNum }}
          </div>
          <div class="report">
            <el-button type="primary" size="small" @click="reportVisible=true">投诉稿件</el-button>
          </div>
          <el-dialog title="稿件投诉" :visible.sync="reportVisible">
            <el-form :model="reportForm" ref="reportForm" :rules="rules">
              <el-form-item label="" prop="reportReason">
                <el-radio-group v-model="reportForm.reportReason">
                  <el-radio label="违法违纪"></el-radio>
                  <el-radio label="低俗内容"></el-radio>
                  <el-radio label="暴力血腥"></el-radio>
                  <el-radio label="人身攻击"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelReportForm">取 消</el-button>
              <el-button type="primary" @click="submitReportForm">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <div class="video-desc" ref="videoDesc">
          <div :class="descClass">
            {{ videoDesc }}
          </div>
        </div>
        <div v-if="descMayOverflow">
          <el-button size="mini" type="text" class="desc-shrink-button" @click="this.shrinkDesc"
                     style="background-color: white;color: #505050" v-if="descSpread">
            收起
          </el-button>
          <el-button size="mini" type="text" class="desc-spread-button" @click="this.spreadDesc"
                     style="background-color: white;color: #505050" v-else>
            展开
          </el-button>
        </div>
      </div>
      <BrightComment class="video-comment"
                     key="commentKey"
                     :label="this.userLabel"
                     :avatar="this.avatar"
                     :commentList="this.commentList"
                     :placeholder="this.commentPlaceholder"
                     :authorID="this.loginUserID"
                     :videoID="this.$route.params.VideoID"
                     @doSend="sendComment"
                     :commentNum="this.commentNum"></BrightComment>
    </div>
    <div v-else style="text-align: center;margin-left: 300px">
      <img src="https://nohesitate-1312201606.cos.ap-beijing.myqcloud.com/src/404.png" height="600px" width="800px">
    </div>
  </div>
</template>

<script>
import ArtPlayer from "@/components/player/ArtPlayer.vue";
import BrightComment from "@/components/comment/CommentComponent"
import LikeBefore from "@/assets/icons/like-before.png";
import LikeHover from "@/assets/icons/like-hover.png"
import FavorBefore from "@/assets/icons/favor-before.png";
import FavorHover from "@/assets/icons/favor-hover.png"
import user from "@/store/user";

export default {
  name: "VideoView",
  data() {
    return {
      commentKey: 0,
      descClass: "desc-info",
      descMayOverflow: false,
      showVideo: true,
      loginUserID: 0,
      loginUserAvatar: '',
      curVideoID: 0,
      videoKey: 0,
      videoTitle: "你的名字",
      videoView: 114514,
      upID: 0,
      upFans: 0,
      upName: "nohesitate",
      upDesc: "这个人的简介什么都没有写哦~",
      uploadDate: "",
      upAvatar: "https://nohesitate-1312201606.cos.ap-beijing.myqcloud.com/UserAvatar/mkm1.png",
      videoDesc: "",
      isLiked: false,
      isFavored: false,
      isFollow: true,
      descSpread: false,
      likeNum: 0,
      likeImg: LikeBefore,
      favorNum: 0,
      favorImg: FavorBefore,
      reportVisible: false,
      formLabelWidth: '120px',
      reportForm: {
        reportReason: '',
      },
      rules: {
        reportReason: [
          {required: true, message: '请选择投诉理由', trigger: 'blur'}]
      },
      option: {
        url: "",
        title: "Your name",
        volume: 0.5,
        muted: false,
        autoplay: false,
        pip: true,
        setting: true,
        settings: [
          {
            html: '循环播放',
            tooltip: '关闭',
            selector: [
              {
                default: true,
                html: '关闭',
              },
              {
                html: '开启',
              }
            ],
            onSelect: function (item) {
              const self = this
              self.option.loop = item.html !== '关闭';
              return item.html
            }
          }
        ],
        loop: false,
        flip: true,
        playbackRate: true,
        aspectRatio: true,
        fullscreen: true,
        fullscreenWeb: true,
        mutex: true,
        backdrop: true,
        playsInline: true,
        autoPlayback: true,
        hotkey: true
      },
      style: {
        width: "900px",
        height: "550px",
        margin: "0",
      },
      userLabel: '',
      commentPlaceholder: '发送友好的评论吧~',
      commentNum: 1,
      avatar: require('../../assets/logos/init-logo.png'),
      commentList: []
    };
  },
  components: {
    ArtPlayer,
    BrightComment,
  },
  created() {
    // console.log(this.$route.params.VideoID)
    const vid = this.$route.params.VideoID
    this.curVideoID=vid
    console.log('curVID:',this.curVideoID)
    let uid;
    const userInfo = user.getters.getUser(user.state())
    if (userInfo) {
      uid = userInfo.user.userID
    } else {
      uid = 0
    }
    this.loginUserID = uid
    const dataForm = new FormData()
    dataForm.append("videoID", vid)
    dataForm.append("userID", uid)
    // console.log('?',dataForm.get("videoID"))
    if (this.loginUserID != 0) {
      this.$axios({
        method: 'post',
        url: '/VideoManager/browseVideo/',
        data: dataForm
      }).then(res => {
        console.log("browse success")
        if (res.data.error != 0) {
          this.$message.error(res.data.msg)
              console.log("browse success?")
        }
      })
    }
    this.$axios({
      method: 'post',
      url: '/VideoManager/getVideoByID/',
      data: dataForm,
    })
        .then(
            res => {
              //console.log(res.data)
              if (res.data.error === 0) {
                this.videoTitle = res.data.videoTitle
                this.option.url = res.data.videoSrc
                this.uploadDate = res.data.uploadDate
                //this.commentList=res.data.videoComment
                this.videoKey = 1
                this.videoDesc = res.data.videoDesc
                this.upName = res.data.upName
                if (res.data.upDesc)
                  this.upDesc = res.data.upDesc
                this.videoView = res.data.videoPlayNum
                this.commentList = eval(res.data.videoComment)
                this.commentNum = res.data.videoCommentNum
                this.upAvatar = res.data.upAvatar
                this.likeNum = res.data.videoLikeNum
                this.favorNum = res.data.videoFavorNum
                this.isLiked = res.data.isLiked
                this.isFavored = res.data.isFavored
                this.isFollow = res.data.isFollowed
                this.upID = res.data.upID
                this.upFans = res.data.upUserFansNum
                console.log('upAvatar:',res.data.upAvatar)
              } else {
                this.showVideo = false
              }
            }
        )
        .finally(() => {
          if(this.showVideo){
              const height = this.$refs.videoDesc.offsetHeight
              // console.log(height)
              if (height === 63) {
                this.descMayOverflow = true
              }}
            }
        )
    if (this.loginUserID != 0) {
      const fdata = new FormData
      fdata.append('userID', this.loginUserID)
      this.$axios({
        method: 'post',
        url: '/Websurf/getUserInfoByID/',
        data: fdata
      })
          .then(res => {
            if (res.data.error === 0) {
              const resdata = JSON.parse(res.data.user_info)
              this.avatar = resdata.userAvatar
              // console.log(this.avatar)
            } else {
              this.$message.error(res.data.msg)
            }
          })
    }
    else {
      this.avatar='https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  methods: {
    toLogin() {
      this.$router.push({path: '/login'})
    },
    sendComment(comment) {
      let commentForm = new FormData();
      const vid = this.$route.params.VideoID
      let uid;
      const userInfo = user.getters.getUser(user.state())
      if (userInfo) {
        uid = userInfo.user.userID
      } else {
        uid = 0
      }
      if (uid === 0) {
        this.toLogin()
      } else {
        commentForm.append("videoID", vid)
        commentForm.append("userID", uid)
        commentForm.append("comment", comment)
        this.$axios({
          method: 'post',
          url: '/VideoInteraction/comment/',
          data: commentForm,
        })
            .then(res => {
              if (res.data.error === 0) {
                this.$message.success(res.data.msg)
              } else {
                this.$message.error(res.data.msg)
              }
              location.reload()
            })
      }
      // console.log(comment)
    },
    getInstance(art) {
      // console.log(art)
    },
    like() {
      const likeForm = new FormData
      const vid = this.$route.params.VideoID
      let uid;
      const userInfo = user.getters.getUser(user.state())
      if (userInfo) {
        uid = userInfo.user.userID
      } else {
        uid = 0
      }
      likeForm.append("videoID", vid)
      likeForm.append("userID", uid)
      if (uid !== 0) {
        this.$axios({
          method: 'post',
          url: '/VideoInteraction/like/',
          data: likeForm
        })
            .then(res => {
              if (res.data.error === 0) {
                this.isLiked = true
                this.likeNum++
              } else {
                this.$message.error("点赞失败")
              }
            })
      } else {
        this.toLogin()
      }
    },
    cancelLike() {
      const likeForm = new FormData
      const vid = this.$route.params.VideoID
      let uid;
      const userInfo = user.getters.getUser(user.state())
      if (userInfo) {
        uid = userInfo.user.userID
      } else {
        uid = 0
      }
      if (uid === 0) {
        this.toLogin()
      } else {
        likeForm.append("videoID", vid)
        likeForm.append("userID", uid)
        this.$axios({
          method: 'post',
          url: '/VideoInteraction/cancellike/',
          data: likeForm
        })
            .then(res => {
              if (res.data.error === 0) {
                this.isLiked = false
                this.likeNum--
              } else {
                this.$message.error("取消点赞失败")
              }
            })
      }
    },
    favor() {
      const favorForm = new FormData
      const vid = this.$route.params.VideoID
      let uid;
      const userInfo = user.getters.getUser(user.state())
      if (userInfo) {
        uid = userInfo.user.userID
      } else {
        uid = 0
      }
      if (uid === 0) {
        this.toLogin()
      } else {
        favorForm.append("videoID", vid)
        favorForm.append("userID", uid)
        this.$axios({
          method: 'post',
          url: '/VideoInteraction/favourites/',
          data: favorForm
        })
            .then(res => {
              if (res.data.error === 0) {
                this.isFavored = true
                this.favorNum++
              } else {
                this.$message.error("收藏失败")
              }
            })
      }
    },
    cancelFavor() {
      const favorForm = new FormData
      const vid = this.$route.params.VideoID
      let uid;
      const userInfo = user.getters.getUser(user.state())
      if (userInfo) {
        uid = userInfo.user.userID
      } else {
        uid = 0
      }
      if (uid === 0) {
        this.toLogin()
      } else {
        favorForm.append("videoID", vid)
        favorForm.append("userID", uid)
        this.$axios({
          method: 'post',
          url: '/VideoInteraction/cancelfavourites/',
          data: favorForm
        })
            .then(res => {
              if (res.data.error === 0) {
                this.isFavored = false
                this.favorNum--
              } else {
                this.$message.error("取消收藏失败")
              }
            })
      }
    },
    spreadDesc() {
      this.descSpread = true
      this.descClass = "desc-info-open"
    },
    shrinkDesc() {
      this.descSpread = false
      this.descClass = "desc-info"
    },
    onEnterLike() {
      //console.log("enter")
      //console.log(this.$route.params)
      this.likeImg = LikeHover
    },
    onLeaveLike() {
      //console.log("leave")
      this.likeImg = LikeBefore
    },
    onEnterFavor() {
      //console.log("enter")
      this.favorImg = FavorHover
    },
    onLeaveFavor() {
      this.favorImg = FavorBefore
    },
    resetForm(formName) {
      // console.log('nani')
      // console.log(formName)
      this.$refs[formName].resetFields()
    },
    cancelReportForm() {
      this.reportVisible = false
      this.$refs.reportForm.resetFields()
    },
    submitReportForm() {
      let uid;
      const userInfo = user.getters.getUser(user.state())
      if (userInfo) {
        uid = userInfo.user.userID
      } else {
        uid = 0
      }
      if (uid === 0) {
        this.toLogin()
      } else {
        this.$refs.reportForm.validate((valid) => {
          if (valid) {
            const complaintForm = new FormData
            complaintForm.append('complaintUserID',uid)
            console.log('1',uid)
            complaintForm.append('complaintReason',this.reportForm.reportReason)
            console.log('2',this.reportForm.reportReason)
            complaintForm.append('videoID',parseInt(this.curVideoID))
            console.log('3',parseInt(this.curVideoID))
            this.$axios({
              method: 'post',
              url: '/VideoInteraction/complaintvideo/',
              data: complaintForm
            }).then(res=>{
              if(res.data.error===0){
                this.$message.info("已收到投诉")
                this.reportVisible = false
                this.$refs.reportForm.resetFields()
              }
              else {
                console.log(res.data)
                this.$message.error('投诉失败')
              }
            })
          } else {
            console.log('error submit!!');
          }
        });
      }
    },
    followUp() {
      if (this.loginUserID === 0) {
        this.toLogin()
      } else {
        if (this.loginUserID != this.upID) {
          const uid = this.loginUserID
          const upid = this.upID
          const fdata = new FormData
          fdata.append("userID", uid)
          fdata.append("followedUserID", upid)
          this.$axios({
            method: 'post',
            url: '/UserCommunication/followuser/',
            data: fdata
          })
              .then(res => {
                if (res.data.error === 0) {
                  this.isFollow = true
                  this.upFans++
                } else {
                  this.$message.error(this.res.msg)
                }
              })
        } else {
          this.$message.warning("你时刻在关注你自己")
        }
      }
    },
    toUpSpace() {
      let path = this.$router.resolve({path: '/user/' + this.upID})
      window.open(path.href)
    },
    cancelFollowUp() {
      if (this.loginUserID === 0) {
        this.toLogin()
      } else {
        const uid = this.loginUserID
        const upid = this.upID
        const fdata = new FormData
        fdata.append("userID", uid)
        fdata.append("followedUserID", upid)
        this.$axios({
          method: 'post',
          url: '/UserCommunication/cancelfollow/',
          data: fdata
        })
            .then(res => {
              if (res.data.error === 0) {
                this.isFollow = false
                this.upFans--
              } else {
                this.$message.error(this.res.msg)
              }
            })
      }
    }
  },
}
</script>

<style scoped>
.video-wrap .video-desc {
  margin-top: 16px;
}

.video-comment {
  position: absolute;
  width: 1000px;
  margin: auto 0;
}

.video-desc {
  position: relative;
  align-content: center;
}

.desc-shrink-button {
  float: left;
  cursor: pointer;
  font-size: 14px;
  color: #505050;
}

.desc-spread-button {
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
  height: auto;
  max-height: 63px;
  width: 900px;
  text-align: left;
  overflow: hidden;
}

.desc-info-open {
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

.video-wrap .interact {
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

.interact-button .button-icon {
  width: 30px;
  height: 30px;
}

.report {
  float: right;
  margin-right: 20px;
}

.player {
  display: inline-block;
  margin-right: 100px;
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
  cursor: pointer;
}

.up-info .up-info-right {
  float: left;
  margin-left: 5px;
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
  cursor: pointer;
}

.up-info .up-info-name:hover {
  color: #00aeec;
}

.video-wrap {
  max-width: 1984px;
  min-width: 988px;
  margin-left: 250px;
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

.video-data .video-view {
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
