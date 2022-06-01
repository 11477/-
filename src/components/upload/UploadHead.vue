<template>
  <div v-title :data-title=this.title>
    <div class="upload-header">
      <div class="upload-left-block">
        <img src="../../assets/logos/logo-upload.png" class="upload-logo" alt="upload-logo" @click="toUploadHome">
        <div class="upload-logo-site" @click="toHome">
          首页
        </div>
      </div>
      <div class="upload-right-block" @click="toUser" v-if="this.isLogin">
        <el-avatar :src=this.avatarSrc size="small"></el-avatar>
        <div class="upload-user-id">{{this.username}}</div>
      </div>
      <div class="upload-right-block" @click="toLogin" v-else>
        <div class="login-button">登录</div>
        <img class="head-pic" v-if="$store.state.islogin" src="avatarSrc" alt="banner">
      </div>
    </div>
  </div>
</template>

<script>
import user from "@/store/user";

export default {
  name: "UploadHead",
  data() {
    return {
      isLogin:false,
      title: "上传页面",
      userId: user.getters.getUser(user.state()).user.userID,
      avatarSrc: "",
      username:''
    };
  },
  created() {
    var userInfo = user.getters.getUser(user.state())
    if(user.getters.getUser(user.state()).user.userID)
      this.isLogin=true
    this.userId = userInfo.user.userID
    const fdata = new FormData
    fdata.append('userID',userInfo.user.userID)
    this.$axios({
      method: 'post',
      url: '/Websurf/getUserInfoByID/',
      data: fdata
    }).then(res =>{
      if(res.data.error===0){
        const resdata=JSON.parse(res.data.user_info)
        this.avatarSrc=resdata.userAvatar
        this.username=resdata.username
      }else {
        this.$message.warning(res.data.error)
      }
    })
  },

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toLogin() {
      this.$router.push({path: '/login'})
    },
    toHome(){
      this.$router.push({path:'/'})
    },
    toUploadHome() {
      this.$router.push({path:'/upload/home'})
    },
    toUser (){
      this.$router.push({path: '/user/'+user.getters.getUser(user.state()).user.userID})
    },
    //封面设置
    uploadPicture(name){
      this.cropperName = name;
      this.cropperModel = true;
    },
    //图片上传成功后
    handleUploadSuccess (data){
      console.log(data)
      switch(data.name){
        case 'flagImg':
          this.formValidate.mainImage = 'http://ydfblog.cn/dfs/'+data.url;
          console.log('最终输出'+data.name)
          break;
      }
      this.cropperModel = false;
    }
  }
}
</script>

<style scoped>
.upload-user-id {
  margin-left: 15px;
  font-size: 15px;
}
.upload-logo-site {
  margin-left: 15px;
  font-size: 15px;
}
.upload-logo {
  height: 50px;
}
.upload-header :hover{
  cursor: pointer;
}
.upload-header {
  height: 60px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 0 100px 0 32px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 5%);
}
.upload-left-block {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.upload-right-block {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  font-size: 16px;
  color: #757575;
}

</style>
