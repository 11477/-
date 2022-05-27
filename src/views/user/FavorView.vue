<template>
  <div class="favor">
    <UserView/>
    favor
  </div>
</template>

<script>
import UserView from "./UserView";
export default {
  name: "FavorView",
  // eslint-disable-next-line vue/no-unused-components
  components:{UserView},
  data(){
    return{
      activeIndex: '2'
    }
  }
}
</script>