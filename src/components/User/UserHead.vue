<template>
  <div id="user-bar">
    <div class="box-outside">
      <img class="head-in-box" :src="userPortrait" alt="用户头像">
      <div class="user-info">
        <div class="user-name">{{ username }}</div>
        <div class="user-intro-box">
          <div class="user-self-intro">{{ userIntro }}</div>
          <span class="user-sex">性别：{{userSex}} </span>
          <span class="user-birthday">生日：{{userBirthday}}</span>
        </div>
      </div>
      <div class="subscribe-in-user-display" v-if="!isMine">
        <el-popover placement="bottom" v-model="visible" trigger="hover" v-if="hasFollowed">
          <div style="text-align: center">
            <el-button @click="hasFollowed=false; visible=false">取消关注</el-button>
          </div>
          <el-button style="background: #00aeec; color: white" slot="reference">已关注</el-button>
        </el-popover>
        <el-button @click="changeFollow" v-else> + 关注</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
   name: "UserBar",
   props:{
     username: {type: String},
     userPortrait: {type: String},
     userSex: {type: String},
     userBirthday: {type: String},
     userIntro: {type: String},
     isMine: {},
     hasLogin: {default: true}
   },
  data(){
    return{
      visible: false,
      hasFollowed: true,
    }
  },
  methods:{
    changeFollow() {
      if(this.hasLogin){
        this.hasFollowed = true;
      }else {
        this.$router.push({path: '/login'});
      }
    }
  }
 }
</script>

<style>
#user-bar{
  margin-top: 10px;
}
.box-outside{
  padding: 0 10%;
  height: 109px;
  display: flex;
  flex-direction: row;
  text-align: left;
}
.head-in-box{
  width: 100px;
  height: 100px;
  margin-left: 10px;
}
.user-info{
  font-size: 14px;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 253px;
}
.user-name{
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 30px;
  font-family: "user-name-black",serif;
}
.user-birthday{
  margin-left: 20px;
  margin-right: 20px;
  white-space: nowrap;
}
.user-intro-box{
  display: flex;
  flex-direction: row;
}
.user-self-intro{
  width: 300px;
  font-size: 10px;
}
.user-sex{
  margin-left: 20px;
  margin-right: 20px;
  white-space: nowrap;
}
</style>
