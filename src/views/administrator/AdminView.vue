<template>
  <div class="AdminView">
      <el-tabs class="audit-tab" :tab-position="tabPosition" :stretch="true" type="border-card">
        <el-tab-pane label="视频列表">
          <div class="audit-videos" v-for="colum in 2" v-bind:key="colum">
            <div v-for="row in 3" v-bind:key="row">
              <VideoCover :videoID="12"></VideoCover>
              <div class="audit-info">
                <el-button type="danger" class="audit-button" size="mini">删除</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="投诉处理">
          <div class="audit-videos" v-for="colum in 2" v-bind:key="colum">
            <div v-for="row in 3" v-bind:key="row">
              <VideoCover :videoID="6"></VideoCover>
              <div class="audit-info">
                <div class="audit-reason">投诉理由 : {{reason}}</div>
                <el-button type="primary" class="audit-button" size="mini">处理</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    <div class="refresh">
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
    }
  },
  methods: {}
}
</script>
<style scoped>
.audit-tab{
  width: 1500px;
}
.refresh{
  background-color: #00A1D6;
  margin-right: 20px;
  margin-left: 20px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  font-size: 50px;
  color: white;
}
.refresh:hover{
  background-color: #66ccff;
  cursor: pointer;
}
.AdminView {
  display: flex;
}
.audit-videos{
  display: flex;
  margin-bottom: auto;
}

.audit-info {
  display: flex;
  text-align: left;
  margin-left: 20px;
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
