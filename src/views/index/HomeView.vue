<template>
  <div class="home">
    <div class="img-box">
      <img src="../../assets/icons/home-wel.png">
    </div>
    <div class="channel-video">
        <div class="video-box" v-if="this.type==='Any'">
          <VideoCover :videoID=column v-for="column in auditVideoList" v-bind:key="column"></VideoCover>
        </div>
        <div class="video-box" v-else-if="this.type==='knowledge'">
          <VideoCover :videoID=column v-for="column in klgVideoList" v-bind:key="column"></VideoCover>
        </div>
        <div class="video-box" v-else-if="this.type==='science'">
          <VideoCover :videoID=column v-for="column in sciVideoList" v-bind:key="column"></VideoCover>
        </div>
        <div class="video-box" v-else-if="this.type==='info'">
          <VideoCover :videoID=column v-for="column in infVideoList" v-bind:key="column"></VideoCover>
        </div>
        <div class="video-box" v-else-if="this.type==='life'">
          <VideoCover :videoID=column v-for="column in lifVideoList" v-bind:key="column"></VideoCover>
        </div>
        <div class="video-box" v-else-if="this.type==='charity'">
          <VideoCover :videoID=column v-for="column in crtVideoList" v-bind:key="column"></VideoCover>
        </div>
        <div class="video-box" v-else-if="this.type==='music'">
          <VideoCover :videoID=column v-for="column in mscVideoList" v-bind:key="column"></VideoCover>
        </div>
        <div class="video-box" v-else-if="this.type==='dance'">
          <VideoCover :videoID=column v-for="column in dncVideoList" v-bind:key="column"></VideoCover>
        </div>
        <div class="video-box" v-else-if="this.type==='food'">
          <VideoCover :videoID=column v-for="column in fodVideoList" v-bind:key="column"></VideoCover>
        </div>
        <div class="video-box" v-else-if="this.type==='sport'">
          <VideoCover :videoID=column v-for="column in sptVideoList" v-bind:key="column"></VideoCover>
        </div>
        <div class="video-box" v-else-if="this.type==='movie'">
          <VideoCover :videoID=column v-for="column in movVideoList" v-bind:key="column"></VideoCover>
        </div>
        <div class="video-box" v-else-if="this.type==='history'">
          <VideoCover :videoID=column v-for="column in hisVideoList" v-bind:key="column"></VideoCover>
        </div>
        <div class="video-box" v-else-if="this.type==='entertainment'">
          <VideoCover :videoID=column v-for="column in entVideoList" v-bind:key="column"></VideoCover>
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
      <div class="video-channel">
        <a class="channel-link" @click="C2K()">知识</a>
        <a class="channel-link" @click="C2SC()">科技</a>
        <a class="channel-link" @click="C2I()">资讯</a>
        <a class="channel-link" @click="C2L()">生活</a>
        <a class="channel-link" @click="C2C()">公益</a>
        <a class="channel-link" @click="C2MC()">音乐</a>
        <a class="channel-link" @click="C2D()">舞蹈</a>
        <a class="channel-link" @click="C2F()">美食</a>
        <a class="channel-link" @click="C2SP()">运动</a>
        <a class="channel-link" @click="C2MV()">影视</a>
        <a class="channel-link" @click="C2H()">历史</a>
        <a class="channel-link" @click="C2E()">娱乐</a>
      </div>
    </div>
    <div class="bottom-btn-box">

    </div>

  </div>
</template>

<script>
import VideoCover from "@/components/videopage/videopage";
export default {
  name: 'HomeView',
  components: {VideoCover},
  data(){
    return{
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
      offset:6,
    }
  },
  mounted() {
    window.onscroll=this.pageScroll;
  },
  created() {
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
    C2K(){
      this.type='knowledge'
    },
    C2SC(){
      this.type='science'
    },
    C2I(){
      this.type='info'
    },
    C2L(){
      this.type='life'
    },
    C2C(){
      this.type='charity'
    },
    C2MC(){
      this.type='music'
    },
    C2D(){
      this.type='dance'
    },
    C2F(){
      this.type='food'
    },
    C2SP(){
      this.type='sport'
    },
    C2MV(){
      this.type='movie'
    },
    C2H(){
      this.type='history'
    },
    C2E(){
      this.type='entertainment'
    },
    addNewVideo(){
      const requestForm = new FormData()
      requestForm.append('Type','Any')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
            this.auditVideoList=[...this.auditVideoList,...res.data.videoID_list];
          })
      console.log(this.type);
    },
    addNewVideo1(){
      const requestForm = new FormData()
      requestForm.append('Type','knowledge')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
              this.klgVideoList=[...this.klgVideoList,...res.data.videoID_list];
          })
    },
    addNewVideo2(){
      const requestForm = new FormData()
      requestForm.append('Type','science')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
              this.sciVideoList=[...this.sciVideoList,...res.data.videoID_list];
          })
    },
    addNewVideo3(){
      const requestForm = new FormData()
      requestForm.append('Type','info')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
              this.infVideoList=[...this.infVideoList,...res.data.videoID_list];
          })
    },
    addNewVideo4(){
      const requestForm = new FormData()
      requestForm.append('Type','life')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
              this.lifVideoList=[...this.lifVideoList,...res.data.videoID_list];
          })
    },
    addNewVideo5(){
      const requestForm = new FormData()
      requestForm.append('Type','charity')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
              this.crtVideoList=[...this.crtVideoList,...res.data.videoID_list];
          })
    },
    addNewVideo6(){
      const requestForm = new FormData()
      requestForm.append('Type','music')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
              this.mscVideoList=[...this.mscVideoList,...res.data.videoID_list];
          })
    },
    addNewVideo7(){
      const requestForm = new FormData()
      requestForm.append('Type','dance')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
              this.dncVideoList=[...this.dncVideoList,...res.data.videoID_list];
          })
    },
    addNewVideo8(){
      const requestForm = new FormData()
      requestForm.append('Type','food')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
              this.fodVideoList=[...this.fodVideoList,...res.data.videoID_list];
          })
    },
    addNewVideo9(){
      const requestForm = new FormData()
      requestForm.append('Type','sport')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
              this.sptVideoList=[...this.sptVideoList,...res.data.videoID_list];
          })
    },
    addNewVideo10(){
      const requestForm = new FormData()
      requestForm.append('Type','movie')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
              this.movVideoList=[...this.movVideoList,...res.data.videoID_list];
          })
    },
    addNewVideo11(){
      const requestForm = new FormData()
      requestForm.append('Type','history')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
              this.hisVideoList=[...this.hisVideoList,...res.data.videoID_list];
          })
    },
    addNewVideo12(){
      const requestForm = new FormData()
      requestForm.append('Type','entertainment')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
              this.entVideoList=[...this.entVideoList,...res.data.videoID_list];
          })
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
      console.log(this.type);
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
    pageScroll(){
      // 获取滚动的距离
      let scrollTop=document.documentElement.scrollTop;
      // 获取滚动的高度（获取整个html的高度）
      let scrollHeight=document.documentElement.scrollHeight;
      // 获取屏幕(浏览器)高度
      let clienHeight=document.documentElement.clientHeight;
      // 滚动的距离 + 屏幕高度 - 内容高度 >= 0 表示滚动到底部了      (下拉加载判断条件)
      if(scrollTop+clienHeight-scrollHeight >=0){
        console.log("我到底了");
        // this.offset++;
        // //滚动至底部后请求数据
        // //this.getDataList();
        if(this.type==='Any')
          this.addNewVideo();
        else if(this.type==='knowledge')
          this.addNewVideo1();
        else if(this.type==='science')
          this.addNewVideo2();
        else if(this.type==='info')
          this.addNewVideo3();
        else if(this.type==='life')
          this.addNewVideo4();
        else if(this.type==='charity')
          this.addNewVideo5();
        else if(this.type==='music')
          this.addNewVideo6();
        else if(this.type==='dance')
          this.addNewVideo7();
        else if(this.type==='food')
          this.addNewVideo8();
        else if(this.type==='sport')
          this.addNewVideo9();
        else if(this.type==='movie')
          this.addNewVideo10();
        else if(this.type==='history')
          this.addNewVideo11();
        else if(this.type==='entertainment')
          this.addNewVideo12();
      }
    },
    toHome(){
      location.reload();
    }
  }
}
</script>
<style>

.home{
  margin-top: 60px;
  position: absolute;
  background: url("../../assets/images/background3.jpg");
  /*width: 100%;*/
  text-align: center;
  background-size: cover;
  overflow-x: hidden ;
  background-color: #464646;
  background-attachment: fixed;
  background-position: center center;
}

.img-box{
  width: 80%;
  margin-left: 150px;
  margin-top: 50px;
  text-align: center;
}

.img-box img{
  width: 100%;
  height: 100%;
}

.home img{
  vertical-align: middle;
}

.video-box{
  display: flex;
  flex-wrap: wrap;
  margin-left: 120px;
  margin-top: 20px;
}

.channel-video{
  width: 1450px;
  flex: 1;
  display: flex;
}

.video-channel{
  position: fixed;
  text-align:center;
  top:170px;
  width: 80px;
  height: 455px;
  margin-left: 20px;
  margin-top: 20px;
  margin-right: 50px;
  flex-flow: column;
  background-color: rgba(255,255,255,0.1);
  border-radius: 6px;
}

.channel-link{
  display: inline-block;
  box-sizing: content-box;
  margin-top: 10px;
  width: 60px;
  height: 25px;
  border: 1px solid rgb(241,242,243);
  border-radius: 6px;
  background-color: rgba(246,247,248,0.7);
  color: rgb(97,102,109);
  text-align: center;
  font-weight: 400;
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
  margin-left: 1430px;
  margin-top: 250px;
  margin-right: 50px;
  flex-flow: column;
  background-color: rgba(255,255,255,0.1);
  border-radius: 10px;
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
</style>
