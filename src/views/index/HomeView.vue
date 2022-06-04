<template>
  <div class="home">
    <div class="img-box">
      <img src="../../assets/images/home-long-back.png" alt="pic">
    </div>
    <div class="channel-video">
      <div class="channel-func">
        <div class="video-channel">
          <div class="channel-line-1">
            <a class="channel-link" id="channel-1" @click="C2K">知识</a>
            <a class="channel-link" id="channel-2" @click="C2SC">科技</a>
            <a class="channel-link" id="channel-3" @click="C2I">资讯</a>
            <a class="channel-link" id="channel-4" @click="C2L">生活</a>
            <a class="channel-link" id="channel-5" @click="C2C">公益</a>
            <a class="channel-link" id="channel-6" @click="C2MC">音乐</a>
          </div>
          <div class="channel-line-2">
            <a class="channel-link" id="channel-7" @click="C2D">舞蹈</a>
            <a class="channel-link" id="channel-8" @click="C2F">美食</a>
            <a class="channel-link" id="channel-9" @click="C2SP">运动</a>
            <a class="channel-link" id="channel-10" @click="C2MV">影视</a>
            <a class="channel-link" id="channel-11" @click="C2H">历史</a>
            <a class="channel-link" id="channel-12" @click="C2E">娱乐</a>
          </div>
        </div>
        <div class="func-btn">
          <div class="space-btn" @click="toSpace">
            <i class="el-icon-user-solid" style="font-size: 60px;margin-top: 5px" ></i>
            <span>个人中心</span>
          </div>
          <div class="manage-btn" @click="toManager">
            <i class="el-icon-s-platform" style="font-size: 60px;margin-top: 5px"></i>
            <span>管理网站</span>
          </div>
          <div class="time-inf">
            <i class="el-icon-time" style="font-size: 55px;margin-top: 5px"></i>
            <span>{{currentTime}}</span>
          </div>
          <img src="../../assets/logos/default-cover.png">
        </div>
      </div>
      <div class="switch-six">
        <div class="switch-video-box">
          <el-carousel :interval="5000" height="400px" style="border-radius: 10px">
            <el-carousel-item v-for="item in rndVideoList" :key="item">
              <VideoCoverRnd :videoID="item"></VideoCoverRnd>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="video-part">
          <div class="video-box" v-if="this.type==='Any'" :key="reloadKey">
            <VideoCover class="home-video-cover" :videoID=column v-for="(column,index) in auditVideoList" v-bind:key="index"></VideoCover>
          </div>
          <div class="video-box" v-else-if="this.type==='knowledge'" :key="reloadKey">
            <VideoCover class="home-video-cover" :videoID=column v-for="(column,index) in klgVideoList" v-bind:key="index"></VideoCover>
          </div>
          <div class="video-box" v-else-if="this.type==='science'" :key="reloadKey">
            <VideoCover class="home-video-cover" :videoID=column v-for="(column,index) in sciVideoList" v-bind:key="index"></VideoCover>
          </div>
          <div class="video-box" v-else-if="this.type==='info'" :key="reloadKey">
            <VideoCover class="home-video-cover" :videoID=column v-for="(column,index) in infVideoList" v-bind:key="index"></VideoCover>
          </div>
          <div class="video-box" v-else-if="this.type==='life'" :key="reloadKey">
            <VideoCover class="home-video-cover" :videoID=column v-for="(column,index) in lifVideoList" v-bind:key="index"></VideoCover>
          </div>
          <div class="video-box" v-else-if="this.type==='charity'" :key="reloadKey">
            <VideoCover class="home-video-cover" :videoID=column v-for="(column,index) in crtVideoList" v-bind:key="index"></VideoCover>
          </div>
          <div class="video-box" v-else-if="this.type==='music'" :key="reloadKey">
            <VideoCover class="home-video-cover" :videoID=column v-for="(column,index) in mscVideoList" v-bind:key="index"></VideoCover>
          </div>
          <div class="video-box" v-else-if="this.type==='dance'" :key="reloadKey">
            <VideoCover class="home-video-cover" :videoID=column v-for="(column,index) in dncVideoList" v-bind:key="index"></VideoCover>
          </div>
          <div class="video-box" v-else-if="this.type==='food'" :key="reloadKey">
            <VideoCover class="home-video-cover" :videoID=column v-for="(column,index) in fodVideoList" v-bind:key="index"></VideoCover>
          </div>
          <div class="video-box" v-else-if="this.type==='sport'" :key="reloadKey">
            <VideoCover class="home-video-cover" :videoID=column v-for="(column,index) in sptVideoList" v-bind:key="index"></VideoCover>
          </div>
          <div class="video-box" v-else-if="this.type==='movie'" :key="reloadKey">
            <VideoCover class="home-video-cover" :videoID=column v-for="(column,index) in movVideoList" v-bind:key="index"></VideoCover>
          </div>
          <div class="video-box" v-else-if="this.type==='history'" :key="reloadKey">
            <VideoCover class="home-video-cover" :videoID=column v-for="(column,index) in hisVideoList" v-bind:key="index"></VideoCover>
          </div>
          <div class="video-box" v-else-if="this.type==='entertainment'" :key="reloadKey">
            <VideoCover class="home-video-cover" :videoID=column v-for="(column,index) in entVideoList" v-bind:key="index"></VideoCover>
          </div>
        </div>
      </div>
      <div class="switch-box">
        <div class="home-btn" @click="toHome">
          <i class="el-icon-s-home"></i>
          <span>回到首页</span>
        </div>
        <div class="back-top" @click="ToTop">
          <i class="el-icon-upload2"></i>
          <span>回到顶部</span>
        </div>
        <div class="switch-btn" @click="flash">
          <i class="el-icon-refresh"></i>
          <span>换换</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import VideoCover from "@/components/videopage/videopage";
import VideoCoverRow from "@/components/videopage/videopagerow";
import user from "@/store/user";
import VideoCoverRnd from "@/components/videopage/videopagernd";
export default {
  name: 'HomeView',
  components: {VideoCoverRnd, VideoCoverRow, VideoCover},
  data(){
    return{
      is_Manager:false,
      rndVideoList:[],
      auditVideoList:[
      ],
      klgVideoList:[],
      sciVideoList:[],
      infVideoList:[],
      lifVideoList:[],
      crtVideoList:[],
      mscVideoList:[],
      dncVideoList:[],
      fodVideoList:[],
      sptVideoList:[],
      movVideoList:[],
      hisVideoList:[],
      entVideoList:[],
      type:'Any',
      offset:0,
      reloadKey:0,
      is_login:false,
      loginUserID:0,
      timer: "", //定义一个定时器的变量
      currentTime:
          new Date().getFullYear() +
          "-" +
          new Date().getMonth() +
          1 +
          "-" +
          new Date().getDate() +
          " " +
          new Date().getHours() +
          ":" +
          new Date().getMinutes() +
          ":" +
          new Date().getSeconds(), // 获取当前时间
    }
  },
  mounted() {
    window.onscroll=this.pageScroll;
  },
  created() {
    var vm = this
    vm.timer = setInterval(() => {
      var y = new Date().getFullYear()
      var m = vm.appendZero(new Date().getMonth() + 1)
      var d = vm.appendZero(new Date().getDate())
      var ho = vm.appendZero(new Date().getHours())
      var mi = vm.appendZero(new Date().getMinutes())
      var se = vm.appendZero(new Date().getSeconds())
      //修改数据date
      vm.currentTime = y + "-" + m + "-" + d + " " + ho + ":" + mi + ":" + se
    }, 1000)
    const requestForm13 = new FormData()
    requestForm13.append('Type','Any')
    this.$axios({
      method: 'post',
      url: '/VideoManager/getVideoIDByCondition/',
      data: requestForm13
    })
        .then(res=>{
          this.rndVideoList=res.data.videoID_list
        })
    let uid;
    const userInfo = user.getters.getUser(user.state())
    if(userInfo){
      uid=userInfo.user.userID
      this.is_login=true
      this.loginUserID=userInfo.user.userID
      this.is_Manager=userInfo.user.isAudit
    }else {
      uid=0}
    const requestForm = new FormData()
    requestForm.append('Type','Any')
    this.$axios({
      method: 'post',
      url: '/VideoManager/getVideoIDByCondition/',
      data: requestForm
    })
        .then(res=>{
          this.auditVideoList=res.data.videoID_list
        })
    const requestForm1 = new FormData()
    requestForm1.append('Type','knowledge')
    this.$axios({
      method: 'post',
      url: '/VideoManager/getVideoIDByCondition/',
      data: requestForm1
    })
        .then(res=>{
          this.klgVideoList=res.data.videoID_list
        })
    const requestForm2 = new FormData()
    requestForm2.append('Type','science')
    this.$axios({
      method: 'post',
      url: '/VideoManager/getVideoIDByCondition/',
      data: requestForm2
    })
        .then(res=>{
          this.sciVideoList=res.data.videoID_list
        })
    const requestForm3 = new FormData()
    requestForm3.append('Type','info')
    this.$axios({
      method: 'post',
      url: '/VideoManager/getVideoIDByCondition/',
      data: requestForm3
    })
        .then(res=>{
          this.infVideoList=res.data.videoID_list
        })
    const requestForm4 = new FormData()
    requestForm4.append('Type','life')
    this.$axios({
      method: 'post',
      url: '/VideoManager/getVideoIDByCondition/',
      data: requestForm4
    })
        .then(res=>{
          this.lifVideoList=res.data.videoID_list
        })
    const requestForm5 = new FormData()
    requestForm5.append('Type','charity')
    this.$axios({
      method: 'post',
      url: '/VideoManager/getVideoIDByCondition/',
      data: requestForm5
    })
        .then(res=>{
          this.crtVideoList=res.data.videoID_list
        })
    const requestForm6 = new FormData()
    requestForm6.append('Type','music')
    this.$axios({
      method: 'post',
      url: '/VideoManager/getVideoIDByCondition/',
      data: requestForm6
    })
        .then(res=>{
          this.mscVideoList=res.data.videoID_list
        })
    const requestForm7 = new FormData()
    requestForm7.append('Type','dance')
    this.$axios({
      method: 'post',
      url: '/VideoManager/getVideoIDByCondition/',
      data: requestForm7
    })
        .then(res=>{
          this.dncVideoList=res.data.videoID_list
        })
    const requestForm8 = new FormData()
    requestForm8.append('Type','food')
    this.$axios({
      method: 'post',
      url: '/VideoManager/getVideoIDByCondition/',
      data: requestForm8
    })
        .then(res=>{
          this.fodVideoList=res.data.videoID_list
        })
    const requestForm9 = new FormData()
    requestForm9.append('Type','sport')
    this.$axios({
      method: 'post',
      url: '/VideoManager/getVideoIDByCondition/',
      data: requestForm9
    })
        .then(res=>{
          this.sptVideoList=res.data.videoID_list
        })
    const requestForm10 = new FormData()
    requestForm10.append('Type','movie')
    this.$axios({
      method: 'post',
      url: '/VideoManager/getVideoIDByCondition/',
      data: requestForm10
    })
        .then(res=>{
          this.movVideoList=res.data.videoID_list
        })
    const requestForm11 = new FormData()
    requestForm11.append('Type','history')
    this.$axios({
      method: 'post',
      url: '/VideoManager/getVideoIDByCondition/',
      data: requestForm11
    })
        .then(res=>{
          this.hisVideoList=res.data.videoID_list
        })
    const requestForm12 = new FormData()
    requestForm12.append('Type','entertainment')
    this.$axios({
      method: 'post',
      url: '/VideoManager/getVideoIDByCondition/',
      data: requestForm12
    })
        .then(res=>{
          this.entVideoList=res.data.videoID_list
        })
  },
  methods:{
    toSpace() {
      if(!this.is_login)
        this.$router.push({
          path: '/login',
          params:{
            active:'3',
          }
        })
      else
        this.$router.push({path: '/user/' + this.loginUserID})
    },
    getVideoCover(param,index){
      let uid;
      const userInfo = user.getters.getUser(user.state())
      if(userInfo){
        uid=userInfo.user.userID
      }else {
        uid=0}
      //console.log("wtf",this.videoID)
      const vid = param
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
                //console.log(res.data)
                if(res.data.error===0){
                  this.videoCoverList[index]=res.data.VideoCover
                }
                else {
                  console.log(res.data.msg)
                }
              }
          )
    },
    C2K(){
      this.reloadKey=!this.reloadKey;
      this.type='knowledge'
      for(let i=1; i<=12;i++){
      let div1 = document.getElementById('channel-' + i.toString())
      div1.style.backgroundColor="rgba(246,247,248,0.7)"
      }
      let div1 = document.getElementById('channel-1')
      div1.style.backgroundColor="rgba(128,128,128,0.7)"
    },
    C2SC(){
      this.reloadKey=!this.reloadKey;
      this.type='science'
      for(let i=1; i<=12;i++){
        let div1 = document.getElementById('channel-' + i.toString())
        div1.style.backgroundColor="rgba(246,247,248,0.7)"
      }
      let div1 = document.getElementById('channel-2')
      div1.style.backgroundColor="rgba(128,128,128,0.7)"
    },
    C2I(){
      this.reloadKey=!this.reloadKey;
      this.type='info'
      for(let i=1; i<=12;i++){
        let div1 = document.getElementById('channel-' + i.toString())
        div1.style.backgroundColor="rgba(246,247,248,0.7)"
      }
      let div1 = document.getElementById('channel-3')
      div1.style.backgroundColor="rgba(128,128,128,0.7)"
    },
    C2L(){
      this.reloadKey=!this.reloadKey;
      this.type='life'
      for(let i=1; i<=12;i++){
        let div1 = document.getElementById('channel-' + i.toString())
        div1.style.backgroundColor="rgba(246,247,248,0.7)"
      }
      let div1 = document.getElementById('channel-4')
      div1.style.backgroundColor="rgba(128,128,128,0.7)"
    },
    C2C(){
      this.reloadKey=!this.reloadKey;
      this.type='charity'
      for(let i=1; i<=12;i++){
        let div1 = document.getElementById('channel-' + i.toString())
        div1.style.backgroundColor="rgba(246,247,248,0.7)"
      }
      let div1 = document.getElementById('channel-5')
      div1.style.backgroundColor="rgba(128,128,128,0.7)"
    },
    C2MC(){
      this.reloadKey=!this.reloadKey;
      this.type='music'
      for(let i=1; i<=12;i++){
        let div1 = document.getElementById('channel-' + i.toString())
        div1.style.backgroundColor="rgba(246,247,248,0.7)"
      }
      let div1 = document.getElementById('channel-6')
      div1.style.backgroundColor="rgba(128,128,128,0.7)"
    },
    C2D(){
      this.reloadKey=!this.reloadKey;
      this.type='dance'
      for(let i=1; i<=12;i++){
        let div1 = document.getElementById('channel-' + i.toString())
        div1.style.backgroundColor="rgba(246,247,248,0.7)"
      }
      let div1 = document.getElementById('channel-7')
      div1.style.backgroundColor="rgba(128,128,128,0.7)"
    },
    C2F(){
      this.reloadKey=!this.reloadKey;
      this.type='food'
      for(let i=1; i<=12;i++){
        let div1 = document.getElementById('channel-' + i.toString())
        div1.style.backgroundColor="rgba(246,247,248,0.7)"
      }
      let div1 = document.getElementById('channel-8')
      div1.style.backgroundColor="rgba(128,128,128,0.7)"
    },
    C2SP(){
      this.reloadKey=!this.reloadKey;
      this.type='sport'
      for(let i=1; i<=12;i++){
        let div1 = document.getElementById('channel-' + i.toString())
        div1.style.backgroundColor="rgba(246,247,248,0.7)"
      }
      let div1 = document.getElementById('channel-9')
      div1.style.backgroundColor="rgba(128,128,128,0.7)"
    },
    C2MV(){
      this.reloadKey=!this.reloadKey;
      this.type='movie'
      for(let i=1; i<=12;i++){
        let div1 = document.getElementById('channel-' + i.toString())
        div1.style.backgroundColor="rgba(246,247,248,0.7)"
      }
      let div1 = document.getElementById('channel-10')
      div1.style.backgroundColor="rgba(128,128,128,0.7)"
    },
    C2H(){
      this.reloadKey=!this.reloadKey;
      this.type='history'
      for(let i=1; i<=12;i++){
        let div1 = document.getElementById('channel-' + i.toString())
        div1.style.backgroundColor="rgba(246,247,248,0.7)"
      }
      let div1 = document.getElementById('channel-11')
      div1.style.backgroundColor="rgba(128,128,128,0.7)"
    },
    C2E(){
      this.reloadKey=!this.reloadKey;
      this.type='entertainment'
      for(let i=1; i<=12;i++){
        let div1 = document.getElementById('channel-' + i.toString())
        div1.style.backgroundColor="rgba(246,247,248,0.7)"
      }
      let div1 = document.getElementById('channel-12')
      div1.style.backgroundColor="rgba(128,128,128,0.7)"
    },
    getNewVideo(){
      const requestForm = new FormData()
      requestForm.append('Type','Any')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
            this.auditVideoList=res.data.videoID_list;
          })

      //console.log(this.type);
    },
    getNewVideo1(){
      const requestForm = new FormData()
      requestForm.append('Type','knowledge')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
            this.klgVideoList=res.data.videoID_list;
          })

    },
    getNewVideo2(){
      const requestForm = new FormData()
      requestForm.append('Type','science')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
            this.sciVideoList=res.data.videoID_list;
          })
    },
    getNewVideo3(){
      const requestForm = new FormData()
      requestForm.append('Type','info')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
            this.infVideoList=res.data.videoID_list;
          })
    },
    getNewVideo4(){
      const requestForm = new FormData()
      requestForm.append('Type','life')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
            this.lifVideoList=res.data.videoID_list;
          })
    },
    getNewVideo5(){
      const requestForm = new FormData()
      requestForm.append('Type','charity')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
            this.crtVideoList=res.data.videoID_list;
          })
    },
    getNewVideo6(){
      const requestForm = new FormData()
      requestForm.append('Type','music')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
            this.mscVideoList=res.data.videoID_list;
          })
    },
    getNewVideo7(){
      const requestForm = new FormData()
      requestForm.append('Type','dance')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
            this.dncVideoList=res.data.videoID_list;
          })
    },
    getNewVideo8(){
      const requestForm = new FormData()
      requestForm.append('Type','food')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
            this.fodVideoList=res.data.videoID_list;
          })
    },
    getNewVideo9(){
      const requestForm = new FormData()
      requestForm.append('Type','sport')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
            this.sptVideoList=res.data.videoID_list;
          })
    },
    getNewVideo10(){
      const requestForm = new FormData()
      requestForm.append('Type','movie')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
            this.movVideoList=res.data.videoID_list;
          })
    },
    getNewVideo11(){
      const requestForm = new FormData()
      requestForm.append('Type','history')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
            this.hisVideoList=res.data.videoID_list;
          })
    },
    getNewVideo12(){
      const requestForm = new FormData()
      requestForm.append('Type','entertainment')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
            this.entVideoList=res.data.videoID_list;
          })
    },
    flash(){
      this.reloadKey=!this.reloadKey;
      if(this.type==='Any')
        this.getNewVideo();
      else if(this.type==='knowledge')
        this.getNewVideo1();
      else if(this.type==='science')
        this.getNewVideo2();
      else if(this.type==='info')
        this.getNewVideo3();
      else if(this.type==='life')
        this.getNewVideo4();
      else if(this.type==='charity')
        this.getNewVideo5();
      else if(this.type==='music')
        this.getNewVideo6();
      else if(this.type==='dance')
        this.getNewVideo7();
      else if(this.type==='food')
        this.getNewVideo8();
      else if(this.type==='sport')
        this.getNewVideo9();
      else if(this.type==='movie')
        this.getNewVideo10();
      else if(this.type==='history')
        this.getNewVideo11();
      else
        this.getNewVideo12();
    },
    ToTop(){
      var timer = setInterval(function () {
        let osTop =
            document.documentElement.scrollTop || document.body.scrollTop;
        let ispeed = Math.floor(-osTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
            osTop + ispeed;
        this.isTop = true;
        if (osTop === 0) {
          clearInterval(timer);
        }
      }, 10);
    },
    toManager(){
      if(this.is_Manager) {
        this.$router.push({
          path: '/administrator'
        })
      }
      else
        this.$message.error("你还不是管理员哟~")

    },
    appendZero(obj) {
      if (obj < 10) {
        return "0" + obj
      } else {
        return obj
      }
    },
    toHome(){
      location.reload();
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  },
}
</script>
<style>

.home{
  margin-top: 60px;
  position: absolute;
  //background: url("../../assets/images/background3.jpg");
  /*width: 100%;*/
  text-align: center;
  background-size: cover;
  overflow-x: hidden ;
  background-color: white;
  background-attachment: fixed;
  background-position: center center;
}

.img-box{
  width:100%;
  /*margin-left: 150px;*/
  /*margin-top: 50px;*/
  text-align: center;
}

.img-box img{
  width: 100%;
  height: 80%;
}

.home img{
  vertical-align: middle;
}

.video-part{
  position: relative;
  margin: auto;
  //border: solid 1px lightcoral;
  text-align: right;
  width:100%;
  height: 500px;
}


.video-box{
  position: relative;
  /*display: flex;*/
  /*flex-wrap: wrap;*/
  width: 870px;
  height: 470px;
  //border: solid 1px lightskyblue;
  //background-color: lightskyblue;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  z-index: 2;
}

.channel-video{
  width: 1450px;
  /*flex: 1;*/
  /*display: flex;*/
}

.channel-func{
  display: flex;
  flex-direction: row;
  //border: solid 1px red;
  width: 1500px;
  margin-top: 10px;
}

.func-btn{
  display: flex;
  flex-direction: row;
}

.func-btn img{
  height: 100px;
  margin-left: 60px;
}

.space-btn{
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 100%;
  //border: solid 1px lightskyblue;
  margin-left: 60px;
  background-color: lightsalmon;
  border-radius: 15px;
  cursor: pointer;
}

.space-btn span{
  font-family: "user-name-black", serif;
}

.manage-btn{
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 100%;
  //border: solid 1px lightskyblue;
  margin-left: 40px;
  background-color: lightpink;
  border-radius: 15px;
  cursor: pointer;
}

.manage-btn span{
  font-family: "user-name-black", serif;
}

.time-inf{
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 100%;
  //border: solid 1px lightskyblue;
  margin-left: 40px;
  background-color: lightskyblue;
  border-radius: 15px;
}

.time-inf span{
  font-size: 10px;
  font-weight: 800;
}

.video-channel{
  position: relative;
  text-align:center;
  width: 640px;
  height: 100px;
  margin-left:60px;
  border-right: solid 2px lightgray;
  background-color: rgba(255,255,255,0.1);
  display: flex;
  flex-direction: column;
}

.channel-line-1{
  position: relative;
  text-align:center;

  width: 600px;
  height: 50px;
  margin-left: 10px;
  //border: solid 1px lightgray;
  background-color: rgba(255,255,255,0.1);
  display: flex;
}

.channel-line-2{
  position: relative;
  text-align:center;

  width: 600px;
  height: 50px;
  margin-left: 10px;
  //border: solid 1px lightgray;
  background-color: rgba(255,255,255,0.1);
  display: flex;
}

.channel-link{
  box-sizing: content-box;
  margin: auto;
  //margin-bottom: 10px;
  width: 80px;
  height: 35px;
  border: 1px solid rgb(241,242,243);
  border-radius: 6px;
  background-color: rgba(246,247,248,0.7);
  color: rgb(97,102,109);
  text-align: center;
  font-weight: 400;
  line-height: 35px;
  transition: background-color .3s,color .3s;
  cursor: pointer;

}

.channel-link:hover{
  background-color: rgba(128,128,128,0.7);
}

.switch-box{
  position: fixed;
  text-align:center;
  width: 50px;
  height: 220px;
  margin-left: 1450px;
  top: 350px;
  margin-right: 50px;
  flex-flow: column;
  background-color: rgba(255,255,255,0.1);
  border-radius: 10px;
  z-index: 5;
}

.switch-btn{
  display: flex;
  box-sizing: content-box;
  margin-top: 20px;
  margin-left: 6px;
  width: 35px;
  height: 40px;
  border: 1px solid rgb(241,242,243);
  border-radius: 6px;
  background-color: rgba(246,247,248,0.7);
  color: black;
  text-align: center;
  font-weight: 400;
  flex-flow: column;
  transition: background-color .3s,color .3s;
  cursor: pointer;
}

.switch-btn:hover{
  background-color: rgba(128,128,128,0.7);
}

.back-top{
  box-sizing: content-box;
  margin-top: 7px;
  margin-left: 6px;
  width: 35px;
  height: 60px;
  border: 1px solid rgb(241,242,243);
  border-radius: 6px;
  background-color: rgba(246,247,248,0.7);
  color: black;
  text-align: center;
  font-weight: 400;
  transition: background-color .3s,color .3s;
  cursor: pointer;
  display: flex;
  flex-flow: column;
}

.back-top:hover{
  background-color: rgba(128,128,128,0.7);
}

.back-top span{
  font-size: 15px;
}

.back-top i{
  margin-top: 2px;
}

.home-btn{
  box-sizing: content-box;
  margin-top: 7px;
  margin-left: 6px;
  margin-bottom: 20px;
  width: 35px;
  height: 60px;
  border: 1px solid rgb(241,242,243);
  border-radius: 6px;
  background-color: rgba(246,247,248,0.7);
  color: black;
  text-align: center;
  font-weight: 400;
  transition: background-color .3s,color .3s;
  cursor: pointer;
  display: flex;
  flex-flow: column;
}

.home-btn span{
  font-size: 15px;
}

.home-btn i{
  margin-top: 2px;
}

.home-btn:hover{
  background-color: rgba(128,128,128,0.7);
}

.home-video-cover{
  //border: solid 1px lightsalmon;
  height: 230px;
  margin-left: 2px;
  margin-top: 2px;
}

.switch-video-box{
  height: 400px;
  width: 900px;
  margin-top: 15px;
  margin-left: 40px;
  margin-right: 10px;
  border-radius: 10px;
  //border: solid 1px lawngreen;

}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.switch-six{
  display: flex;
  flex-direction: row;
}
</style>
