<template>
  <div id="user-bar">
    <div class="box-outside">
      <img class="head-in-box" src="../../assets/avatar/head.jpeg" alt="banner">
      <div class="user-info">
        <div class="user-name">这是用户名</div>
        <div class="user-intro-box">
          <div class="user-self-intro">wosabi wosabi wosabi wyc是傻逼wyc是傻逼啦啦啦啦啦啦啦啦啦啦啦啦啦啦噜噜噜噜噜还可以再长一点再长就受不了啦啊啊</div>
          <span class="user-sex">性别：火星人 </span>
          <span class="user-birthday">生日：1000年15月40日</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 export default {
   name: "UserBar"
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
