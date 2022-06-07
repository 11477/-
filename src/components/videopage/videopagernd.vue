<template>
  <div id="VideoCover">
    <div class="video-card">
        <div class="video-cover">
          <div class="video-cover-img" @click="ToVideo">
            <img :src=coverUrl alt="视频封面"/>
          </div>
          <div class="bottom-line">
            <div class="bottom-line-left">
              <div class="title-name">
                <span @click="ToVideo">{{videoTitle}}</span>
              </div>
            </div>
          </div>
          <div class="title-inf">
            <div class="video-title">
              <span @click="ToVideo"
              style="display: block;
                width: 530px;
                height: 105px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                text-align: left;
                font-size: 45px;
                font-weight: 1000;
                margin-top: 15px;
                color: rgb(244,96,108);
                cursor: pointer;
              ">{{videoDesc}}</span>
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
  name: 'VideoCoverRnd',
  data(){
    return {
      viewNum: 22,
      commentNum: 11,
      videoTime: "05:31",
      videoTitle: "no title",
      uploaderName: "syk",
      videoDate: "2004-07-22",
      coverUrl: "https://nohesitate-1312201606.cos.ap-beijing.myqcloud.com/VideoCover/default-cover.png",
      uploadID:0,
      videoDesc:"Welcome To ShareVideo",
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
    let uid;
    const userInfo = user.getters.getUser(user.state())
    if(userInfo){
      uid=userInfo.user.userID
    }else {
      uid=0}
    //console.log("wtf",this.videoID)
    const vid = this.videoID
    const dataForm = new FormData()
    dataForm.append("videoID",vid)
    dataForm.append("userID",uid)
    //console.log('vid',dataForm.get("videoID"))
    this.$axios({
      method: 'post',
      url: '/VideoManager/getVideoByID/',
      data: dataForm,
    })
        .then(
            res=>{
              if(res.data.error===0){
                this.viewNum=res.data.videoPlayNum
                this.videoTitle=res.data.videoTitle
                this.commentNum=res.data.videoCommentNum
                this.videoDate=res.data.uploadDate
                this.uploaderName=res.data.upName
                this.coverUrl=res.data.VideoCover
                this.getVideoDuration(res.data.videoSrc)
                this.uploadID=res.data.upID
                this.videoDesc=res.data.videoDesc
                }
              else {
                console.log(res.data.msg)
              }
            }
        )
  },
  methods:{
    getVideoDuration(url){
      const audioElement = new Audio(url);
      let result;
      const self = this;
      let tmp;
      audioElement.addEventListener("loadedmetadata",function (){
        result=audioElement.duration;
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
      })
    },
    ToVideo(){
      let path = this.$router.resolve('/video/'+this.videoID);
      window.open(path.href)
    },
    ToUser(){
      this.$router.push('/user/'+this.uploadID);
    }
  }
}
</script>

<style scoped>
.video-card {
  width: 100%;
  height: 100%;
  text-align: center;
  margin-bottom: 50px;
}

.video-cover{
  position: relative;
  z-index: 1;
  border-radius: 6px;
  margin: 0 auto;
  //border: solid 1px black;
  width: 530px;
  height: 300px;
}

.video-cover-img img{
  width: 100%;
  height: 300px;
  //border-radius: 6px;
  z-index: 1;
  cursor: pointer;
}

.bottom-line{
  position: absolute;
  top:181px;
  z-index: 2;
  width: 100%;
  align-items: center;
}

.bottom-line-left{
  min-width: 0;
  margin: auto 0;
  align-items: center;
}

.bottom-line-left span{
  font-size: 10px;
  margin: auto 0;
}

.title-name{
  height: 38px;
  transition: background-color .3s,color .3s;
}

.title-name:hover{
  background-color: rgba(211,211,211,0.5);
}

.title-name span{
  font-weight: 1000;
  font-size: 25px;
  cursor: pointer;
  transition: background-color .3s,color .3s;
  color: rgba(0,0,0,0);
  display: block;
  width: 530px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.title-name span:hover{
  color: black;
}

.title-inf{
  /*background-color: lightskyblue;*/
  flex-flow: column;
  display: flex;
  position: absolute;
}

.title-inf-left span{
  font-size: 10px;
  width: 25px;
  color:gray;
  text-align: left;
  float: left;
//border: solid 1px lightgray;
  transition: background-color .3s,color .3s;
}


.title-inf-right span{
  font-size: 10px;
  color:gray;
  position: absolute;
  left: 170px;
  margin-top: 3px;
  float: left;
  width: 100px;
  transition: background-color .3s,color .3s;
}

.title-inf-right span:hover{
  color: #00A1D6;
}

.video-title{
  font-family: "user-name-black", serif;
}
</style>
