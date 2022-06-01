<template>
  <div id="set-info">
    <div class="left-nav">
      <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical-demo">
        <el-menu-item index="1" @click="toSetAvatar">
          <i class="el-icon-user"></i>
          <span>我的头像</span>
        </el-menu-item>
        <el-menu-item index="2" @click="toSetInfo">
          <i class="el-icon-document"></i>
          <span>个人信息</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right-set-info" v-if="this.activeIndex==='2'">
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
                    v-model="form.userInformation"
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
                          v-model="form.userBirthday"
                          value-format="yyyy-MM-dd"
                          style="float: left"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">设置信息</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right-set-avatar" v-if="this.activeIndex==='1'">
       <UploadImg/>
    </div>
  </div>
</template>

<script>
import user from "@/store/user";
import UploadImg from "@/components/upload/AvatarUpload";
export default {
  name: "SetInfo",
  components: {UploadImg},
  data(){
    return{
      activeIndex: '2',
      form: {
        username: this.prevUsername,
        userInformation: this.prevUserIntro,
        userBirthday: '',
        userSex: this.prevSex,
        userID: 0
      },
      formRule: {
        username:[
          {required: true, message:"请输入用户名", trigger: 'blur'}
        ],
        userInformation:[
          {required: false}
        ],
        userSex:[
          {required: true}
        ],
        userBirthday: [
          {required: true, message:"请选择生日", trigger: 'blur'}
        ]
      }
    }
  },
  props:{
    prevUsername:{},
    prevUserIntro:{},
    prevSex:{},
    prevBirthday:{},
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toSetAvatar(){
      this.activeIndex = '1'
    },
    toSetInfo(){
      this.activeIndex = '2'
    },
    onSubmit() {
      //  console.log('submit!');
      this.$refs.form.validate((valid)=>{
            if(valid){
              const userInfo = user.getters.getUser(user.state());
              this.form.userID=userInfo.user.userID
              if(this.form.userInformation===""){
                this.form.userInformation = "这个人很懒，什么也没有写~"
              }
              // console.log(this.$qs.stringify(this.form))
              this.$axios({
                method: 'post',
                url: 'Webhome/edit/',
                data: this.$qs.stringify(this.form)
              })
                  .then(res => {
                    //   console.log(res)
                    switch (res.data.error) {
                      case 0:
                        this.$message.success('上传成功')
                        location.reload()
                        break;
                      case 2001:
                        this.$message.warning('上传失败！');
                        console.log('请求方式错误')
                        break;
                      case 3001:
                        this.$message.warning('上传失败！');
                        console.log(this.form.userBirthday)
                        console.log('表单信息错误')
                        break;
                      case 4001:
                        this.$message.warning('用户不存在！');
                        break;
                      case 4002:
                        this.$message.warning('用户未登录！');
                        break;
                      case 4003:
                        this.$message.warning('用户名重复！');
                        break;
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  })
            }
            else {
              this.$message.error('信息不完整')
            }
          }
      )
    },
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