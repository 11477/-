<template>
  <div class="AdminView">
      <el-tabs class="audit-tab" :tab-position="tabPosition" :stretch="true" type="border-card" @tab-click="handleTabClick">
        <el-tab-pane label="视频列表">
          <div class="audit-videos">
              <VideoCover :videoID=colum v-for="colum in auditVideoList" v-bind:key="colum"></VideoCover>
          </div>
        </el-tab-pane>
        <el-tab-pane label="投诉处理">
          <div class="audit-videos">
            <VideoCover :videoID=colum v-for="colum in auditVideoList" v-bind:key="colum"></VideoCover>
          </div>
        </el-tab-pane>
      </el-tabs>
    <div class="refresh" @click="reloadList()">
      换一批视频
    </div>
  </div>
</template>

<script>
import VideoCover from "@/components/videopage/videopage";
export default {
  components: {VideoCover},
  data() {
    return {
      auditVideoList:[
      ],
      tabPosition: 'left',
      reason: "看他不爽",
      AdministratorID: 1,
      AdministratorName: "nohesitate",
      AuditResult:  true,
      stateNow: "any",
    }
  },
  created() {
    this.getAny()
  },
  methods: {
    reloadList(){
      console.log(this.stateNow)
      if(this.stateNow==="any"){
        this.getAny()
      }
      else {
        this.getAudit()
      }
    },
    handleTabClick(tab){
      if(tab.label==="视频列表"){
        this.getAny()
        this.stateNow="any"
      }
      else {
        this.getAudit()
        this.stateNow="audit"
      }
    },
    getAny(){
      const requestForm = new FormData()
      requestForm.append('Type','Any')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
            this.auditVideoList=res.data.videoID_list
          })
    },
    getAudit(){
      const requestForm = new FormData()
      requestForm.append('Type','Audit')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res=>{
            this.auditVideoList=res.data.videoID_list
          })
    }
  }
}
</script>
<style scoped>
.audit-tab{
  width: 1440px;
}
.refresh{
  background-color: #00A1D6;
  margin-right: 20px;
  margin-left: 20px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  font-size: 40px;
  color: white;
}
.refresh:hover{
  background-color: #66ccff;
  cursor: pointer;
}
.AdminView {
  position: absolute;
  display: flex;
}
.audit-videos{
  display: flex;
  flex-wrap: wrap;
}

.audit-info {
  display: flex;
  text-align: left;
  margin-left: 10px;
  margin-top: 30px;
  font-size: 14px;
}
.audit-reason{
  color: #000000;
}
.audit-button{
  height: 80%;
  margin-left: 170px;
}
</style>
