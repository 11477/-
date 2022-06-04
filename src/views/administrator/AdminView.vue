<template>
  <div class="AdminView">
    <el-tabs class="audit-tab" :tab-position="tabPosition" :stretch="true" type="border-card"
             @tab-click="handleTabClick">
      <el-tab-pane label="视频列表">
        <div class="audit-videos" :key="reloadKey">
          <div v-for="(colum,index) in auditVideoList" v-bind:key="index">
            <VideoCover :videoID=colum></VideoCover>
            <el-button type="danger" size="mini" @click="deleteVideo(AdministratorID,colum)">删除</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="投诉处理" :key="reloadKey">
        <div class="audit-videos">
          <div v-for="(colum,index) in auditVideoList" v-bind:key="index">
            <VideoCover :videoID=colum></VideoCover>
            <el-button type="danger" size="mini" @click="auditVideo(AdministratorID,false)">删除</el-button>
            {{ auditInfo[colum] }}
            <el-button type="primary" size="mini" @click="auditVideo(AdministratorID,true)">通过</el-button>
          </div>
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
import user from "@/store/user";

export default {
  components: {VideoCover},
  data() {
    return {
      reloadKey: 0,
      auditVideoList: [],
      tabPosition: 'left',
      reason: "看他不爽",
      AdministratorID: 0,
      AdministratorName: "nohesitate",
      AuditResult: true,
      stateNow: "any",
      auditInfo: [],
    }
  },
  created() {
    const userInfo = user.getters.getUser(user.state())
    if (userInfo) {
      this.AdministratorID = userInfo.user.userID
    }
    this.getAny()
    console.log('created',this.auditVideoList)
  },
  methods: {
    reloadList() {
      console.log(this.stateNow)
      if (this.stateNow === "any") {
        this.getAny()
      } else {
        this.getAudit()
      }
      this.reloadKey=!this.reloadKey
    },
    handleTabClick(tab) {
      if (tab.label === "视频列表") {
        this.getAny()
        this.stateNow = "any"
      } else {
        this.getAudit()
        this.stateNow = "audit"
      }
    },
    auditVideo(aid, result) {

    },
    getAny() {
      const requestForm = new FormData()
      requestForm.append('Type', 'Any')
      console.log('getAny')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
      .then(res=>{
        console.log(res.data)
        this.auditVideoList=res.data.videoID_list
        this.reloadKey=!this.reloadKey
      })
    },
    deleteVideo(aid, vid) {
      let userID = aid
      let videoID = vid
      const deleteForm = new FormData
      deleteForm.append('userID', userID)
      deleteForm.append('videoID', videoID)
      this.$axios({
        method: 'post',
        url: '/VideoManager/deletevideo/',
        data: deleteForm
      })
          .then(res => {
            if (res.data.error) {
              this.$message.error(res.data.error)
            } else {
              this.$message.success('删除视频成功')
              location.reload()
            }
          })
    },
    getAuditInfo(vid) {
      let videoID = vid
      const form = new FormData
      form.append('videoID', videoID)
      this.$axios({
        method: 'post',
        url: '/VideoManager/getAuditInfo/',
        data: form
      }).then(res => {
        if (res.data.error) {
          this.$message.error(res.data.error)
        } else {
          console.log('auditInfo:',res.data)
        }
      })
    },
    getAudit() {
      const requestForm = new FormData()
      requestForm.append('Type', 'Audit')
      console.log('Audit')
      this.$axios({
        method: 'post',
        url: '/VideoManager/getVideoIDByCondition/',
        data: requestForm
      })
          .then(res => {
            console.log(res)
            this.auditVideoList = res.data.videoID_list
            console.log(this.auditVideoList)
            this.reloadKey=!this.reloadKey
            for (const i in this.auditVideoList) {
              this.getAuditInfo(this.auditVideoList[i])
            }
          })
    }
  }
}
</script>
<style scoped>
.audit-tab {
  width: 1440px;
}

.refresh {
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

.refresh:hover {
  background-color: #66ccff;
  cursor: pointer;
}

.AdminView {
  position: absolute;
  display: flex;
}

.audit-videos {
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

.audit-reason {
  color: #000000;
}

.audit-button {
  height: 80%;
  margin-left: 170px;
}
</style>
