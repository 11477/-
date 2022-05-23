<template>
  <div class="upload" v-title data-title="上传界面">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1" @click="toHome">
        <img class="logo-pic" src="../../assets/logos/logo-upload.png" alt="banner">
        <span class="home-char">首页</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>
export default {
  name: "UploadView",
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toHome(){
      this.$router.push({path:'/'})
    }
  }
}
</script>

<style scoped>
.logo-pic {
  width: 150px;
}
.home-char{
   margin-left: 10px;
   font-size: 17px;
 }
</style>
