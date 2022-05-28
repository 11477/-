<template>
  <div id="VideoCover">
    <div class="video-card">
        <div class="video-cover">
          <div class="video-cover-img" @click="ToVideo">
            <img src="../../assets/images/login_background.jpg" alt="视频封面"/>
          </div>
          <div class="bottom-line">
            <div class="bottom-line-left">
              <div class="view-line">
                <span>播放：</span>
                <span>4万</span>
              </div>
              <div class="comment-line">
                <span>评论：</span>
                <span>293</span>
              </div>
            </div>
            <div class="bottom-line-right">
              <span>22:50</span>
            </div>
          </div>
          <div class="title-inf">
            <div class="video-title">
              <span @click="ToVideo">顶尖枪法与身法的视觉盛宴</span>
            </div>
            <div class="upload-inf">
              <div class="title-inf-left">
                <span>P友</span>
                <span @click="ToUser">cbm的爹</span>
              </div>
              <div class="title-inf-right">
                <span>5-21</span>
              </div>
            </div>
          </div>
        </div>

    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'VideoCover',
  methods:{
    ToVideo(){
      this.$router.push('/video/0');
    },
    ToUser(){
      this.$router.push('/user');
    }
  }
}
</script>

<style scoped>

.video-card {
  width: 400px;
  height: 250px;
  text-align: center;
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
  cursor: pointer;
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
  cursor: pointer;
  color: #00A1D6;
}


</style>
