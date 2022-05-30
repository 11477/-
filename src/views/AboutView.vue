<template>
  <div class="about">
    <UploadImg @uploadAvatarSuccess="getInput" :value="avatarSrc"></UploadImg>
  </div>
</template>
<script>
import UploadImg from "@/components/upload/AvatarUpload";
export default {
  components: {UploadImg},
  data(){
    return{
      avatarSrc:''
    }
  },
  methods: {
    getInput(msg){
      console.log(msg.avatarUrl)
    }
  }
}

</script>
