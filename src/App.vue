<template>
  <div id="app">
    <NavBar v-if="!$route.meta.unShowNav"/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/header/head.vue';
import user from "@/store/user";
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    NavBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

*{
  padding: 0;
  margin: 0;

}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}
@font-face {
  font-family: "user-name-black";
  src: url("./assets/fonts/RuiZiTaiKongZhuMengHeiJian-Shan-TeHei(REEJI-TaikodreamGB-Flash-Black)-2.ttf");
}
@font-face {
  font-family: "video-title-black";
  src: url("./assets/fonts/AaJueXingHei-55J-2.ttf");
}
</style>
