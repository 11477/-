<template>
  <div id="search-view">
    <el-col :span="700">
      <el-input
          id="search"
          v-model="input1"
          placeholder="请输入关键字搜索"
          @focus="Searching"
      ></el-input>
    </el-col>
    <el-col :span="1">
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "SearchView",
  data() {
    return {
      input1: '',
      isSearching: false
    }
  },
  methods:{
    Searching: function (){
      this.isSearching = true;
    }
  }
}
</script>


<style>
#search-view {
  margin-top: 20px;
  width: 50%;
  margin-left: 30%;
}
</style>
