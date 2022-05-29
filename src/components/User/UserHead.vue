<template>
  <div id="user-bar">
    <div class="box-outside">
      <img class="head-in-box" src="../../assets/avatar/head.jpeg" alt="banner">
      <div class="user-info">
        <div class="user-name">{{ username }}</div>
        <div class="user-intro-box">
          <div class="user-self-intro">{{ userInfo }}</div>
          <span class="user-sex">性别：{{userSex}} </span>
          <span class="user-birthday">生日：{{userBirthday}}</span>
        </div>
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
     userInfo: {type: String}
   }
 }
</script>

<style>
#user-bar{

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
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
.user-name{
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 30px;
  font-family: "user-name-black",serif;
}
.user-intro-box{
  display: flex;
  flex-direction: row;
}
.user-self-intro{
  max-width: 300px;
}
.user-sex{
  margin-left: 20px;
  margin-right: 20px;
}
</style>
