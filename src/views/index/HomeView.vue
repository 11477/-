<template>
  <div class="home">
    <div class="img-box">
<!--      <img src="">-->
    </div>
    <div class="video-box">
      <VideoCover class="video-cover">
      </VideoCover>
    </div>
  </div>
</template>

<script>
import VideoCover from "@/components/videopage/videopage";
export default {
  name: 'HomeView',
  components: {VideoCover},
}
</script>
<style>

.video-cover{
  margin-top: 40px;
  margin-left: 50px;
}


</style>
