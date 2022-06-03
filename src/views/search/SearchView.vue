<template>
  <div id="search-view">
    <div class="flex-center">
      <div class="search-input-wrap">
        <div class="searchView-search-button">
          <i class="el-icon-search"></i>
        </div>
        <input class="search-input-content" type="text"
               :placeholder=placeHolder
               v-model="input2"
               ref="searchContent"
               @keyup.enter="searchContent">
        <el-button type="primary" icon="el-icon-search" @click="searchContent">搜索</el-button>
      </div>
    </div>
    <div class="menu-box">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" @click="toVideo">视频</el-menu-item>
        <el-menu-item index="2" @click="toUser">用户</el-menu-item>
      </el-menu>
    </div>
    <div class="video-in-search" v-if="activeIndex==='1'">
      <img class="pic404" src="../../assets/images/404.png" alt="404 not found" v-if="video404">
      <div v-else>
        有video！
      </div>
    </div>
    <div class="user-in-search" v-else>
      <img class="pic404" src="../../assets/images/404.png" alt="404 not found" v-if="user404">
      <div v-else>
        有user！
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchView",
  data() {
    return {
      input2: '',
      activeIndex: '1',
      placeHolder: '请输入关键词搜索',
      videoList: [],
      userList: [],
      video404: false,
      user404: false,
    }
  },
  created() {
    const searchForm = new FormData()
    if(this.$route.query.searchContent){
    console.log(1)
    searchForm.append("key",this.$route.query.searchContent)
    console.log(searchForm.get("key"))
    this.$axios({
      method: 'post',
      url: '/Websurf/search/',
      data: searchForm
    })
        .then(res=>{
          switch (res.data.error) {
            case 0:
              this.videoList = JSON.parse(res.data.video_list)
              this.userList = JSON.parse(res.data.user_list)
              console.log(this.userList.length)
              console.log(this.userList)
              console.log(this.videoList.length);
              console.log(this.videoList);
              break;
            case 4004:
              this.user404 = true;
              this.video404 = true;
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })}
  },
  methods: {
    searchContent() {
      const content = this.$refs.searchContent.value
      if(content){
        this.$router.push({path: '/search', query: {searchContent: content}})
        location.reload()
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toVideo() {
      this.activeIndex = '1';
    },
    toUser() {
      this.activeIndex = '2';
    },
  }
}
</script>


<style>
#search-view {
  position: absolute;
  margin-top: 70px;
  margin-left: 250px;
}
.flex-center{
  display: flex;
  width: 600px;
  margin-left: 200px;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
}
.search-input-wrap{
  position: relative;
  width: 640px;
  margin-left: 0;
  padding: 5px;
  background: #ffffff;
  border: 1px solid #00aeec;
  border-radius: 6px;
  transition: all .2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-box-align: center;
}
.searchView-search-button{
  width: 20px;
  color: #00aeec;
  margin-left: 15px;
  margin-right: 10px;
}
.search-input-content{
  width: calc(100% - 160px);
  height: 36px;
  font-size: 18px;
  color: #18191c;
  margin-right: 15px;
  border: none;
  outline: none;
  background: transparent;
}
.menu-box{
  margin-left: 0;
  width: 1000px;
}
.pic404{
  padding-left: 0;
  height: 550px;
}
</style>
