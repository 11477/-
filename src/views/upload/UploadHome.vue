<template>
  <div v-title :data-title=this.title>
    <UploadHead></UploadHead>
  </div>
</template>

<script>
import UploadHead from "@/components/upload/UploadHead";
export default {
  name: "UploadView",
  components: {UploadHead},
  data() {
    return {
      title: "创作中心",
    };
  },
}
</script>

<style scoped>

</style>
