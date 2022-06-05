<template>
  <div class="confirm"  v-title data-title='验证中心'>
    <div v-if="success" class="register-success">
      <el-row>
        <div class="msg">
          <h1>恭喜您验证成功！</h1>
        </div>
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

</style>
