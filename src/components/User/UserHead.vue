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
            <el-button @click="cancelFollow">取消关注</el-button>
          </div>
          <el-button style="background: #00aeec; color: white" slot="reference">已关注</el-button>
        </el-popover>
        <el-button @click="changeFollow" v-else> + 关注</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import user from "@/store/user";

export default {
   name: "UserBar",
   props:{
     username: {type: String},
     userPortrait: {type: String},
     userSex: {type: String},
     userBirthday: {type: String},
     userIntro: {type: String},
     isMine: {},
     pageUserID: {required: true},
     hasLogin: {default: true}
   },
  data(){
    return{
      visible: false,
      hasFollowed: true,
    }
  },
  created() {
    if(!this.hasLogin){
      this.hasFollowed = false
    } else{
      const userInfo = user.getters.getUser(user.state());
      const loginUserID = userInfo.user.userID;
      const dataForm = new FormData()
      dataForm.append("userAID",loginUserID)
      dataForm.append("userBID",this.pageUserID)
      // console.log('?',dataForm.get("videoID"))
      this.$axios({
        method: 'post',
        url: '/Websurf/getConnectionInfoByID/',
        data: dataForm
      })
          .then(res =>{
            switch (res.data.error) {
              case 0:
                this.hasFollowed = res.data.hasFollowed
                break;
              case 4001:
                this.$message.warning('用户不存在！');
                break;
            }
      })
          .catch(err => {
            console.log(err);
          })
    }
  },
  methods:{
    changeFollow() {
      if(this.hasLogin){
        const userInfo = user.getters.getUser(user.state());
        const loginUserID = userInfo.user.userID;
        if(this.userID===loginUserID){
          this.$message.warning('这么自恋呀~');
          return;
        }
        const followForm = new FormData()
        followForm.append("userID",loginUserID)
        followForm.append("followedUserID",this.pageUserID)
        // console.log('?',dataForm.get("videoID"))
        this.$axios({
          method: 'post',
          url: '/UserCommunication/followuser/',
          data: followForm
        })
            .then(res =>{
              switch (res.data.error) {
                case 0:
                  this.hasFollowed = true;
                  break;
              }
            })
            .catch(err => {
              console.log(err);
            })
      }else {
        this.$router.push({path: '/login'});
      }
    },
    cancelFollow(){
      this.visible=false
      if(this.hasLogin){
        const userInfo = user.getters.getUser(user.state());
        const loginUserID = userInfo.user.userID;
        const followForm = new FormData()
        followForm.append("userID",loginUserID)
        followForm.append("followedUserID",this.pageUserID)
        // console.log('?',dataForm.get("videoID"))
        this.$axios({
          method: 'post',
          url: '/UserCommunication/cancelfollow/',
          data: followForm
        })
            .then(res =>{
              switch (res.data.error) {
                case 0:
                  this.hasFollowed = false;
                  break;
              }
            })
            .catch(err => {
              console.log(err);
            })
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
  border-radius: 15px;
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
