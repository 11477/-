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
    <div class="right-set-info">
      <el-form ref="form" :model="form" label-width="80px" :rules="formRule">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"
                    placeholder="请输入您的用户名"
                    maxlength="10"
                    show-word-limit
                    :rows="1"
                    resize="none"></el-input>
        </el-form-item>
        <el-form-item label="用户简介" prop="userIntro">
          <el-input type="textarea"
                    v-model="form.userIntro"
                    placeholder="请输入您的用户简介"
                    maxlength="100"
                    show-word-limit
                    :rows="4"
                    resize="none"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="userSex">
          <el-select v-model="form.userSex" placeholder="请选择性别" style="float: left">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
            <el-option label="保密" value="保密"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="userBirthday">
          <el-date-picker type="date"
                          placeholder="请选择日期"
                          placement="bottom"
                          v-model="form.userBirthday"
                          style="float: left"></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SetInfo",
  data(){
    return{
      form: {
        username: '',
        userIntro: '',
        userBirthday: '',
        userSex: ''
      },
      formRule: {
        username:[
          {required: true, message:"请输入用户名", trigger: 'blur'}
        ],
        userIntro:[
          {required: false}
        ],
        userSex:[
          {required: true}
        ],
        userBirthday: [
          {required: false}
        ]
      }
    }
  },
  props:{
    prevUsername:{},
    prevUserIntro:{},
    prevSex:{},
    prevBirthday:{}
  },
  methods: {
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    }
  }
}
</script>

<style>
 #set-info{
   display: flex;
   flex-direction: row;
 }
 .left-nav{
   width: 200px;
   height: 500px;
 }
 .right-set-info{
   margin-top: 10px;
   width: 600px;
 }
</style>