<template>
  <div id="user-display">
    <img class="head-in-user-display" src="../../assets/avatar/head.jpeg" alt="banner">
    <div class="info-in-user-display">
      <div class="name-in-user-display">{{ username }}</div>
      {{ userInfo }}
    </div>
    <div class="subscribe-in-user-display">
      <el-popover placement="bottom" v-model="visible" trigger="hover" v-if="hasFollowed">
        <div style="text-align: center">
          <el-button @click="hasFollowed=false; visible=false">取消关注</el-button>
        </div>
        <el-button style="background: #00aeec; color: white" slot="reference">已关注</el-button>
      </el-popover>
      <el-button @click="hasFollowed=true" v-else> + 关注</el-button>
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
      username: "用户名",
      userPortrait: "../../assets/avatar/head.jpeg",
      userInfo: "用户介绍",
    };
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
  .subscribe-in-user-display{
    margin-top: 20px;
  }
</style>