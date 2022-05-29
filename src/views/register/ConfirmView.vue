<template>
  <div class="confirm">
    <div v-if="success" class="register-success">
      <el-row>
        <div class="msg">
          <h1>恭喜您验证成功！</h1>
        </div>
      </el-row>
      <el-row>
        <el-col span=8 offset=2><h4 style="color: #808080">身份介绍:</h4><br></el-col>

      </el-row>
      <el-row class="identity-choose">
        <el-col :span=6 offset=4>
          <el-card class="box-card" >
            <div slot="header" class="clearfix">
              <h4>读者</h4>
            </div>
            <img class="image" src="https://nohesitate-1312201606.cos.ap-beijing.myqcloud.com/1653807191450"><br>
            <span >读者是注册后的默认选项，无需申请</span>
            <div style="color: #808080;margin-top: 10px">查找、阅读、下载文献...</div>
          </el-card>
        </el-col>
        <el-col :span=6>
          <el-card class="box-card" @click="applyToAuthor">
            <div slot="header" class="clearfix">
              <h4>作者</h4>
            </div>
            <img class="image" src="https://nohesitate-1312201606.cos.ap-beijing.myqcloud.com/1653807191450"><br>
            <span >完善个人信息后可申请成为作者</span>
            <div style="color: #808080;margin-top: 10px">发表文章，审核成功后出版...</div>
          </el-card>
        </el-col>
        <el-col :span=6>
          <el-card class="box-card" @click="applyToAuthor">
            <div slot="header" class="clearfix">
              <h4>审稿人</h4>
            </div>
            <img class="image" src="https://nohesitate-1312201606.cos.ap-beijing.myqcloud.com/1653807191450"><br>
            <span >审稿人无法申请</span>
            <div style="color: #808080;margin-top: 10px">审核作者提交的文章...</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <h3 v-else>验证失败，请检查验证链接，或链接已失效</h3>
  </div>
</template>

<script>

export default {
  data(){
    return {
      success: false,
    }
  },
  mounted() {
    const codeForm = new FormData();
    codeForm.append("code", this.$route.query.code);  // this.$route.query.code获取url中?code=后的参数
    this.$axios({
      method: 'post',
      url: '/Weblogin/confirm/',
      data: codeForm,
    })
        .then(res => {
          switch (res.data.error) {
            case 0:
              this.success = true;
              break;
            case 2001:
              this.$message.error('请求方式错误');
              break;
            case 4001:
              this.$message.error('验证码不存在');
              break;
            case 4002:
              this.$message.error('验证码已过期，请重新注册');
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })
  },
  methods: {

  }
}
</script>

<style scoped>
.confirm {
  margin-top: 15px;
}
.el-card__header {
  padding: 0;
  margin: 0;
}

.identity-choose{
  text-align: center;
}

.box-card:hover{
  margin-top: -5px;
}

.box-card {
  width: 300px;
  transition: all .5s;
  text-align: center;
  cursor: pointer;
}

.image {
  width: 100%;
  height: 100%;
  display: block;
  margin: 0;
}
</style>
