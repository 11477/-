<template>
  <div class="about">
    <UploadImg @input="getInput" :value="avatarSrc"></UploadImg>
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
      this.avatarSrc=msg
      console.log('avatarSrc:',this.avatarSrc)
    }
  }
}

</script>
