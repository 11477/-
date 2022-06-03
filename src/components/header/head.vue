<template>
  <div id="nav-bar">
    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" style="display: flex">
      <div class="left-entry">
        <el-menu-item index="1" @click="toHome">
          <img class="logo-pic" src="../../assets/logos/logo-long.png" alt="banner">
          <span class="home-char">首页</span>
        </el-menu-item>
      </div>
      <div class="searchBar" v-if="!($route.path==='/search')">
        <form id="nav-searchForm" class style="border-radius: 8px">
          <div class="nav-search-content">
            <input class="nav-search-input" type="text" placeholder="请输入关键词搜索"
                   v-model="input"
                   ref="searchContent"
                   @keyup.enter="searchContent" >
          </div>
          <div class="nav-search-button" @click="searchContent">
            <i class="el-icon-search"></i>
          </div>
        </form>
      </div>
      <div v-else>
        <img src="@/assets/images/blank.png" height="60px" width="500px">
      </div>
      <div class="right-entry">
        <div class="first-right-button">
          <div v-if="this.is_login">
            <el-dropdown>
          <img class="head-pic" :src="loginUserAvatar" alt="banner" @click="toSpace">
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="toSpace">我的关注:{{loginUserFollow}}</el-dropdown-item>
                <el-dropdown-item @click.native="toSpace">我的粉丝:{{loginUserFans}}</el-dropdown-item>
                <el-dropdown-item @click.native="toSpace">我的投稿:{{loginUserVideos}}</el-dropdown-item>
                <el-dropdown-item style="color: crimson;text-align: center" @click.native="logout" >退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="login-button" v-else @click="toLogin">登录</div>
        </div>
        <div class="right-button" @click="toMessage">
          <i class="el-icon-message"></i>
          <div>通知</div>
        </div>
        <div class="right-button" @click="toStore">
          <i class="el-icon-view"></i>
          <div>收藏</div>
        </div>
        <div class="right-button" @click="toHistory">
          <i class="el-icon-pie-chart"></i>
          <div>历史</div>
        </div>
        <div class="right-button" @click="toFollow">
          <i class="el-icon-star-off"></i>
          <div>关注</div>
        </div>
        <div class="right-button" @click="upLoad">
          <i class="el-icon-upload2"></i>
          <div>投稿</div>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
import user from "@/store/user";
export default {
  name: 'NavBar',
  data() {
    return {
      input: '',
      is_login: false,
      loginUserID: 2,
      loginUserFollow: 66,
      loginUserFans: 66,
      loginUserVideos: 66,
      loginUserAvatar: require("../../assets/avatar/head.jpeg")
    }
  },
  created() {
    var userInfo = user.getters.getUser(user.state())
    if (userInfo) {
      this.is_login = true
      this.loginUserID = userInfo.user.userID
      const fdata = new FormData
      fdata.append('userID',userInfo.user.userID)
      this.$axios({
        method: 'post',
        url: '/Websurf/getUserInfoByID/',
        data: fdata
      }).then(res =>{
        if(res.data.error===0){
          const resdata=JSON.parse(res.data.user_info)
          //console.log(resdata)
          this.loginUserFans=resdata.userFansNum
          this.loginUserVideos=resdata.userVideosNum
          this.loginUserFollow=resdata.userFollowNum
          this.loginUserAvatar=resdata.userAvatar
        }else {
          this.$message.warning(res.data.error)
        }
      })
    }
  },
  methods:{
    toHome() {
      window.location.href = '/';
    },
    handleSelect() {
      console.log("select")
    },
    searchContent() {
      console.log(this.$refs.searchContent.value)
      const content = this.$refs.searchContent.value
      if(content){
        this.$router.push({path: '/search', query: {searchContent: content}})
      }
    },
    toMessage() {
      if(!this.is_login)
        this.$router.push({
          path: '/login',
          params:{
            active:'5',
          }
            }
        )
      else
        this.$router.push({path: '/user/' + this.loginUserID})
    },
    toStore() {
      if(!this.is_login)
        this.$router.push({
          path: '/login',
          params:{
            active:'2',
          }
        })
      else
        this.$router.push({path: '/user/' + this.loginUserID})
    },
    toHistory() {
      if(!this.is_login)
        this.$router.push({
          path: '/login',
          params:{
            active:'6',
          }
        })
      else
        this.$router.push({path: '/user/' + this.loginUserID})
    },
    toFollow() {
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
    toLogin() {
      this.$router.push({path: '/login'})
    },
    upLoad() {
      if(!this.is_login)
        this.$router.push({path: '/login'})
      else
        this.$router.push({path: '/upload/frame'})
    },
    toSpace() {
      //console.log('tospace!')
      let path = this.$router.resolve({path: '/user/' + this.loginUserID})
      //console.log(path)
        window.open(path.href)
    },
    logout() {
      this.$axios(
          {
            method: 'get',
            url: '/Weblogin/logout/'
          }
      )
          .then(res => {
            switch (res.data.error) {
              case 0:
                // location.reload();
                // 前端保存用户信息
                this.$store.dispatch('clearUserInfo')
                this.$message.success("登出成功");
                location.reload()
                break;
              default:
                this.$store.dispatch('clearUserInfo')
                  this.$message.error(res.data.msg);
            location.reload()}
    })}
  },
}
</script>

<style>
#nav-bar {
  margin: auto 0;
  position: absolute;
  padding: 0 10% 0 10%;
  height: 60px;
}
.logo-pic {
  width: 150px;
}
.home-char{
  margin-left: 10px;
  font-size: 17px;
}
.head-pic {
  width: 41px;
  margin-top: -5px;
  margin-right: -10px;
  margin-left: 10px;
  border-radius: 20px;
}
.login-button{
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #00aeec;
  background: #f6f6f6;
  text-align: center;
  letter-spacing: 0;
  font-size: 14px;
  line-height: 36px;
}
.searchBar {
  display: inline-block;
  width: 500px;
  margin-top: 7px;
}
.searchBarImg {
  display: inline-block;
  width: 500px;
  height: 60px;
}
#nav-searchForm{
  display: flex;
  align-items: center;
  padding: 0 48px 0 4px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  line-height: 38px;
  border: 1px solid #E3E5E7;
  height: 40px;
  background-color: #F1F2F3;
  opacity: .9;
  transition: background-color .3s;
}
.nav-search-content{
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0 8px;
  width: 100%;
  height: 32px;
  border: 2px solid transparent;
  border-radius: 6px;
}
.nav-search-button{
  position: absolute;
  top: 5px;
  right: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  color: #00aeec;
  line-height: 32px;
  cursor: pointer;
  transition: background-color .3s;
}
.nav-search-input{
  flex: 1;
  overflow: hidden;
  padding-right: 8px;
  border: none;
  background-color: transparent;
  box-shadow: none;
  color: #61666D;
  font-size: 14px;
  line-height: 20px;
}
input:focus{
  outline: none;
}
el-menu-item {
  font-size: 20px;
  display: flex;
  flex-direction: column;
}
.first-right-button{
  flex-direction: column;
  margin: 10px 20px;
  margin-right: 10px;
  width: max-content;
  cursor: pointer;
  //margin-left: 100px;

}

.right-button{
  flex-direction: column;
  margin: 10px 20px;
  margin-right: 10px;
  width: max-content;
}
.right-button :hover{
  cursor: pointer;
}
.left-entry {
  float: left;
  display: flex;
  flex-shrink: 0;
}
.right-entry {
  display: flex;
  align-items: center;
  text-align: center;
  margin-right: 10px;
}
</style>
