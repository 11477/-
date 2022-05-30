<template>
  <div id="set-info">
    <div class="left-nav">
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
        <el-menu-item index="1">
          <i class="el-icon-user"></i>
          <span>我的头像</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span>个人信息</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="set-info">

    </div>
  </div>
</template>

<script>
export default {
  name: "SetInfo",
  data(){
    return{

    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
 #set-info{
   display: flex;
   flex-direction: column;
 }
 .left-nav{
   width: 200px;
   height: 500px;
 }
</style>