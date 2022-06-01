<template>
  <div id="notice-box">
    <div class="info-box-title">
      <div class="info-box">{{ letterText }}</div>
      <div class="name-time">
        <div class="name-line">{{ letterUser }}</div>
        <div class="time-line">{{ letterTime }}</div>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "UserNotice",
  data(){
    return{

    }
  },
  props:{
    letterTime:{default: "发送时间"},
    letterText:{default: "私信内容"},
    letterUser:{required:true},
  }
}
</script>

<style scoped>
#notice-box{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 20px;
  width: 800px;
  text-align: left;
}

.info-box-title{
  width: 800px;
}
.info-box{
  margin-top: 20px;
  margin-bottom: 5px;
  margin-left: 15px;
  margin-right: 10px;
  font-size: 15px;
  min-height: 50px;
  max-height: 400px;
  font-family: "video-title-black",serif;
}

.name-time{
  display: flex;
}

.name-line{
  margin-left: 12px;
  margin-right: 50px;
  margin-bottom: 5px;
  font-size: 13px;
  transition: background-color .3s,color .3s;
}

.name-line:hover{
  cursor: pointer;
  color: #00A1D6;
}

.time-line{
  margin-top: 3px;
  margin-left: 550px;
  float: right;
  font-size: 13px;
}

</style>
