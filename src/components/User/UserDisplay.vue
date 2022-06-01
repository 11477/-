<template>
  <div id="user-display">
    <div @click="toUser">
      <img class="head-in-user-display" :src=userPortrait alt="头像">
    </div>
    <div class="info-in-user-display">
      <div class="name-in-user-display" @click="toUser">{{ username }}</div>
      {{ userInfoDisplay }}
    </div>
    <div class="subscribe-in-user-display">
      <el-popover placement="bottom" v-model="visible" trigger="hover" v-if="hasFollowed">
        <div style="text-align: center">
          <el-button @click="hasFollowed=false; visible=false">取消关注</el-button>
        </div>
        <el-button style="background: #00aeec; color: white" slot="reference">已关注</el-button>
      </el-popover>
      <el-button @click="changeFollow" v-else> + 关注</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserDisplay",
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
      type: Number,
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
    }
  },
  /*
  mounted() {
    //console.log("wtf",this.videoID)
    const uid = this.userID
    const dataForm = new FormData()
    dataForm.append("userID", uid.toString())
    //console.log('?',dataForm.get("videoID"))
    this.$axios({
      method: 'post',
      url: '/Websurf/getUserInfoByID',
      data: dataForm,
    })
        .then(
            res => {
              //console.log(res.data)
              if (res.data.error === 0) {
                this.username = res.data.username
                this.userInfo = res.data.userDesc
                this.userPortrait = res.data.userAvatar
              } else {
                this.$message(res.data.msg)
              }
            }
        )
  },
  */
  methods:{
    toUser(){
      this.$router.push('/user/'+this.userID);
      location.reload();
    },
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
  #user-display{
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-radius: 20px;
    width: 800px;
    display: flex;
    flex-direction: row;
    text-align: left;
  }
  .head-in-user-display{
    width: 60px;
    height: 60px;
    margin: 10px;
  }
  .head-in-user-display:hover{
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
