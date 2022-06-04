<template>
  <div id="user-search">
    <div @click="toUser">
      <img class="head-in-user-search" :src=userPortrait alt="头像">
    </div>
    <div class="info-in-user-display">
      <div class="name-in-user-display" @click="toUser">{{ username }}</div>
      <span style="font-size: 10px">{{ userInfoDisplay }}</span>
    </div>
    <div class="subscribe-in-user-display">
      <el-popover placement="bottom" v-model="visible" trigger="hover" v-if="hasFollowed">
        <div style="text-align: center">
          <el-button @click="cancelFollow">取消关注</el-button>
        </div>
        <el-button style="background: #00aeec; color: white" slot="reference">已关注</el-button>
      </el-popover>
      <el-button @click="changeFollow" v-else> + 关注</el-button>
    </div>
  </div>
</template>

<script>
import user from "@/store/user";

export default {
  name: "UserSearch",
  data(){
    return{
      visible: false,
      hasFollowed: true,
      //username: "用户名",
      //userPortrait: "../../assets/avatar/head.jpeg",
      userInfoDisplay: "这个人很懒，什么也没有写~",
    };
  },
  props:{
    userID:{
      default: 0,
    },
    hasLogin:{
      default: true
    },
    username:{default: "用户名"},
    userPortrait: {default: "../../assets/avatar/head.jpeg"},
    userInfo: {default: "这个人很懒，什么也没有写~"},
  },
  mounted() {
    if(this.userInfo===""){
      this.userInfoDisplay = "这个人很懒，什么也没有写~"
    } else{
      this.userInfoDisplay = this.userInfo
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
      dataForm.append("userBID",this.userID)
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
    toUser(){
      let path = this.$router.resolve('/user/'+this.userID);
      window.open(path.href)
    },
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
        followForm.append("followedUserID",this.userID)
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
        followForm.append("followedUserID",this.userID)
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
#user-search{
  width: 550px;
  display: flex;
  flex-direction: row;
  text-align: left;
  padding-right: 30px;
}
.head-in-user-search{
  width: 100px;
  height: 100px;
  margin: 10px;
  border-radius: 20px;
}
.head-in-user-search:hover{
  cursor: pointer;
}
.info-in-user-display{
  display: flex;
  flex-direction: column;
  width: 620px;
}
.name-in-user-display{
  margin-top: 15px;
  margin-bottom: 7px;
  font-size: 20px;
  font-family: "user-name-black",serif;
}
.name-in-user-display:hover{
  cursor: pointer;
}
.subscribe-in-user-display{
  margin-top: 20px;
}
</style>
