<template>
  <div id="VideoCover">
    <div class="video-card">
        <div class="video-cover">
          <div class="video-cover-img" @click="ToVideo">
            <img :src=coverUrl alt="视频封面"/>
          </div>
          <div class="bottom-line">
            <div class="bottom-line-left">
              <div class="view-line">
                <span>播放：</span>
                <span>{{viewNum}}</span>
              </div>
              <div class="comment-line">
                <span>评论：</span>
                <span>{{commentNum}}</span>
              </div>
            </div>
            <div class="bottom-line-right">
              <span>{{videoTime}}</span>
            </div>
          </div>
          <div class="title-inf">
            <div class="video-title">
              <span @click="ToVideo">{{videoTitle}}</span>
            </div>
            <div class="upload-inf">
              <div class="title-inf-left">
                <span>P友</span>
                <span @click="ToUser">{{uploaderName}}</span>
              </div>
              <div class="title-inf-right">
                <span>{{videoDate}}</span>
              </div>
            </div>
          </div>
        </div>

    </div>
  </div>
</template>

<script>

import user from "@/store/user";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'VideoCover',
  data(){
    return {
      viewNum: 5674,
      commentNum: 31,
      videoTime: "22:21",
      videoTitle: "操作系统k48",
      uploaderName: "不知道捏",
      videoDate: "5-28",
      coverUrl: "https://nohesitate-1312201606.cos.ap-beijing.myqcloud.com/VideoCover/1653828877544"
    }
  },
  props:{
    videoID:{
      type: Number,
      default: 11,
    },
  },
  created() {
  },
  mounted() {
    const uid = user.getters.getUser(user.state()).user.userID
    console.log("uid=",uid)
    //console.log("wtf",this.videoID)
    const vid = this.videoID
    const dataForm = new FormData()
    dataForm.append("videoID",vid.toString())
    dataForm.append("userID",uid)
    //console.log('?',dataForm.get("videoID"))
    this.$axios({
      method: 'post',
      url: '/VideoManager/getVideoByID/',
      data: dataForm,
    })
        .then(
            res=>{
                 //console.log(res.data)
              if(res.data.error===0){
                this.viewNum=res.data.videoPlayNum
                this.videoTitle=res.data.videoTitle
                this.commentNum=res.data.videoCommentNum
                this.videoDate=res.data.uploadDate
                this.uploaderName=res.data.upName
                this.coverUrl=res.data.VideoCover
                this.getVideoDuration(res.data.videoSrc)
                }
              else {
                this.$message(res.data.msg)
              }
            }
        )
  },
  methods:{
    getVideoDuration(url){
      const audioElement = new Audio(url);
      console.log("auditelement",audioElement)
      let result;
      const self = this;
      let tmp;
      audioElement.addEventListener("loadedmetadata",function (){
        result=audioElement.duration;
        console.log("place1",result);
        tmp=parseInt(result);
        const h=Math.floor(tmp/(60*60));
        const m=Math.floor((tmp%(60*60))/60);
        const s=Math.floor(tmp%60);
        if(h>0){
          self.videoTime=h;
          self.videoTime+=":";
          self.videoTime+=m<10?'0'+m:m;
          self.videoTime+=":";
          self.videoTime+=s<10?'0+s':s;
        }
        else {
          self.videoTime=m<10?'0'+m:m;
          self.videoTime+=":";
          self.videoTime+=s<10?'0'+s:s;
        }
        console.log(self.videoTime);
      })
    },
    ToVideo(){
      this.$router.push('/video/'+this.videoID);
    },
    ToUser(){
      this.$router.push('/user/1');
    }
  }
}
</script>

<style scoped>

.video-card {
  width: 400px;
  height: 250px;
  text-align: center;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.video-cover{
  position: relative;
  z-index: 1;
  border-radius: 6px;
  margin: 0 auto;
}

.video-cover-img img{
  width: 100%;
  height: 100%;
  border-radius: 6px;
  z-index: 1;
  cursor: pointer;
}

.bottom-line{
  position: absolute;
  bottom: 45px;
  left: 5px;
  z-index: 2;
  width: 100%;
  display: flex;
  align-items: center;
}

.bottom-line-left{
  min-width: 0;
  flex: 1;
  display: -webkit-flex;
  display: flex;
  align-items: center;
}

.bottom-line-left span{
  font-size: 10px;
  color: white;
}

.bottom-line-right{
  min-width: 0;
  display: -webkit-flex;
  align-items: center;
}

.bottom-line-right span{
  font-size: 10px;
  color: white;
  float: right;
  margin-right: 15px;
}

.view-line{
  margin-right: 20px;
}

.upload-inf{
  flex: 1;
  display: flex;
}

.video-title{
  float: left;
}

.video-title span{
  font-weight: 1000;
  cursor: pointer;
  transition: background-color .3s,color .3s;
  float: left;
}

.video-title span:hover{
  font-weight: 1000;
  cursor: pointer;
  color: #00A1D6;
}

.title-inf{
  background-color: rgba(255,255,255,0.7);
  flex-flow: column;
  display: flex;
  border-radius: 6px;
}

.title-inf-left{
  flex: 1;
  display: flex;
  float: left;
}

.title-inf-left{
  float: left;
}

.title-inf-left span{
  font-size: 15px;
  color:gray;
  margin-left: 5px;
  float: left;
  transition: background-color .3s,color .3s;
}

.title-inf-left span:hover{
  cursor: pointer;
  color: #00A1D6;
}

.title-inf-right span{
  font-size: 15px;
  color:gray;
  margin-left: 5px;
  float: left;
  transition: background-color .3s,color .3s;
}

.title-inf-right span:hover{
  color: #00A1D6;
}


</style>
