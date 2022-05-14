<template>
  <div class="user">
    <h1>This is an user page</h1>
    <el-input v-model="input" placeholder="请输入内容" @input="change($event)"></el-input>
  </div>
</template>

<script>
export default {
  name: "UserView",
  data() {
    return {
      input: ''
    }
  },
  methods:{
    change: function () {
      this.$forceUpdate();
    }
  }
}
</script>

<style scoped>

</style>
