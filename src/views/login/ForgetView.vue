<template>
  <div id="foget" class="forget" v-title :data-title=this.title>
    <div >
      <img class="title1" src="../../assets/logos/logo-without-white-under.png" @click="handleToHome"/>
    </div>
    <div class="login-word">
      <span class="word" style="font-size: 38px;font-weight: 600">密码找回</span>
    </div>
    <div class="forget-wrap">
      <el-form :model="form" ref="form" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input placeholder="邮箱" v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button type="primary" @click="forget">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="username">
          <el-input placeholder="验证码" v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item id="password" prop="pass">
          <el-input
              placeholder="密码"
              type="password"
              v-model="form.password"
              autocomplete="off"
              @keyup.enter.native="update"
          ></el-input>
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button type="primary" @click="update">更改密码</el-button>
        </el-form-item>
      </el-form>
      <div class="register-text">
        <p @click="handleCommand">注册帐号</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgetView",
  data() {
    return {
      title: '登录',
      is_login: true,
      form: {
        email: '',
        password: '',
        code:'',
      },
    };
  },
  methods: {
    forget(){
      const self = this;
      const formData = new FormData();
      formData.append("email", self.form.email);
      self.$axios({
        method: 'post',
        url: '/Weblogin/forget/',
        data: formData,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                // 前端保存用户信息
                this.$message.success("验证码已发送，请前往邮箱确认！");
                break;
              case 3001:
                this.$message.error('表单信息错误（未全部填写或数据类型有误）！');
                break;
              case 4001:
                this.$message.warning('邮件发送失败！');
                break;
              case 4002:
                this.$message.error('邮箱未注册！');
                break;
              case 2001:
                this.$message.error('请求方式错误！');
                break;
            }
          })
    },
    update(){
      const self = this;
      const formData = new FormData();
      formData.append("useremail", self.form.email);
      formData.append("password",self.form.password);
      formData.append("code",self.form.code);
      //console.log(self.code)
      self.$axios({
        method: 'post',
        url: '/Weblogin/update/',
        data: formData,
      })
          .then(res => {
            switch (res.data.error) {
              case 0:
                // 前端保存用户信息
                this.$message.success("密码修改成功！");
                this.$router.push('/login');
                break;
              case 4001:
                this.$message.error('密码违规！');
                break;
              case 4002:
                this.$message.error('验证码错误！');
                break;
              case 2001:
                this.$message.error('请求方式错误！');
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleCommand() {
      this.$router.push("/register");
    },
    handleToHome() {
      window.location.href = '/';
    },
  }
}
</script>

<style scoped>
.forget {
  width: 100%;
  height: 800px;
  background: url("../../assets/images/login_background.jpg") no-repeat;
  background-size: cover;
}
.title1{
  background: rgba(255,255,255,0);
  position: relative;
  top: 20px;
  font-size: 50px;
  font-weight: 2500;
  line-height: 80px;
  width: 400px;
  height: 150px;
  border-radius: 25px;
  display: inline-block;
  cursor: pointer;
}
.login-word{
  width: 80%;
  height: 28px;
  margin: 0 auto;
  border-bottom: 1px solid #ddd;
  margin-top: 50px;
  margin-bottom: 28px;
  text-align: center;
}
.login-word .word{
  height: 56px;
  line-height: 56px;
  margin: 0 auto;
  padding: 0 20px;
  font-size: 40px;
  background: rgba(255,255,255,0.9);
  border-radius: 10px;
  text-align: center;
}
.forget-wrap {
  width: 350px;
  height: 340px;
  padding: 20px 25px 0 25px;
  line-height: 40px;
  position: relative;
  display: inline-block;
  background-color: rgba(255, 255, 255,0.8);
  border-radius: 20px;
  margin-top: 40px;
}
h3 {
  color: #0babeab8;
  font-size: 24px;
}
hr {
  background-color: #444;
  margin: 20px auto;
}
a {
  text-decoration: none;
  color: #aaa;
  font-size: 15px;
}
a:hover {
  color: coral;
}
.login-btn {
  margin-top: 25px;
  text-align: center;
}
.login-btn button{
  width:100%;
  height:38px;
}
.register-text {
  font-size:14px;
  line-height:10px;
  color:#999;
  cursor: pointer;
  float:right;
}

.forget-text {
  font-size:14px;
  line-height:10px;
  color:#999;
  cursor: pointer;
  float:left;
}
</style>
