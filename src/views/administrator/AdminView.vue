<template>
  <div v-title :data-title=this.title>
    <div class="AdminView" v-if="isAudit">
      <el-tabs class="audit-tab" :tab-position="tabPosition" :stretch="true" type="border-card"
               @tab-click="handleTabClick">
        <el-tab-pane label="视频列表">
          <div class="audit-videos" :key="reloadKey">
            <div v-for="(colum,index) in auditVideoList" v-bind:key="index">
              <VideoCover :videoID=colum class="admin-cover"></VideoCover>
              <el-button type="danger" size="mini" @click="deleteVideo(AdministratorID,colum,1)">删除</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="投诉处理" :key="reloadKey">
          <div class="audit-videos">
            <div v-for="(colum,index) in auditVideoList" v-bind:key="index">
              <VideoCover :videoID=colum class="admin-cover"></VideoCover>
              <el-button type="danger" size="mini"
                         @click="auditVideo(AdministratorID,0,auditID[index],colum,auditReason[index])">删除
              </el-button>
              {{ auditReason[index] }}
              <el-button type="primary" size="mini"
                         @click="auditVideo(AdministratorID,1,auditID[index],colum,auditReason[index])">通过
              </el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="refresh" @click="reloadList()">
        换一批视频
      </div>
      <el-button @click="toHome">回到主页</el-button>
    </div>
    <div v-else>
      <page-not-found></page-not-found>
    </div>
  </div>
</template>

<script>
import VideoCover from "@/components/videopage/AdminVideopage";
import user from "@/store/user";
import PageNotFound from "@/views/error/PageNotFound";

export default {
  components: {PageNotFound, VideoCover},
  data() {
    return {
      title: '审核中心',
      isAudit: false,
      reloadKey: 0,
      auditVideoList: [],
      vidList: [],
      tabPosition: 'left',
      reason: "看他不爽",
      AdministratorID: 0,
      AdministratorName: "nohesitate",
      AuditResult: true,
      stateNow: "any",
      auditID: [],
      auditReason: [],
    }
  },
  created() {
    const userInfo = user.getters.getUser(user.state())
    if (userInfo && userInfo.user.isAudit) {
      this.AdministratorID = userInfo.user.userID
      this.isAudit = true
    }
    this.getAny()
  },
  methods: {
    toHome(){
      this.$router.push({path: '/'})
    },
    reloadList() {
      console.log(this.stateNow)
      if (this.stateNow === "any") {
        this.getAny()
      } else {
        this.getAudit()
      }
      this.reloadKey = !this.reloadKey
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
    auditVideo(adminID, result, auditID, videoID, reason) {
      console.log('adminID', adminID, 'result', result, 'auditID', auditID)
      const auditForm = new FormData
      auditForm.append('AdministratorID', adminID)
      auditForm.append('AuditID', auditID)
      auditForm.append('AuditResult', result)
      if (result === 0) {
        const auditInfo = new FormData
        auditInfo.append('videoID', videoID)
        auditInfo.append('adminID', adminID)
        auditInfo.append('message', '您的视频因' + reason + '被管理员删除')
        this.$axios({
          method: 'post',
          url: '/VideoManager/sendResultInfo/',
          data: auditInfo
        }).then(res => {
          if (res.data.error != 0) {
            this.$message.error(res.data.msg)
          }
        })
      }
      this.$axios({
        method: 'post',
        url: '/VideoManager/auditvideo/',
        data: auditForm
      }).then(res => {
        if (res.data.error === 0) {
          if (result === 0) {
            this.deleteVideo(auditID, videoID, 0)
          }
          this.$message.success('处理成功！')
        } else {
          this.$message.error(res.data.error)
        }
      })
          .finally(() => {
            this.getAudit()
          })
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
          .then(res => {
            // console.log(res.data)
            this.auditVideoList = res.data.videoID_list

          })
          .finally(() => {
            this.reloadKey = !this.reloadKey
          })
    },
    deleteVideo(aid, vid, type) {
      let self = this
      if(type===1){
      this.$prompt('删除视频', '删除理由', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({value}) => {
        let userID = aid
        let videoID = vid
        let message = value
        let adminID = self.AdministratorID
        const auditInfo = new FormData
        auditInfo.append('videoID', videoID)
        auditInfo.append('adminID', adminID)
        auditInfo.append('message', '您的视频因' + message + '被管理员删除')
        this.$axios({
          method: 'post',
          url: '/VideoManager/sendResultInfo/',
          data: auditInfo
        }).then(res => {
          if (res.data.error != 0) {
            this.$message.error(res.data.msg)
          }
        })

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
      }).catch(() => {
        this.$message.info('取消')
      })}
      else {
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
      }
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
          let cReason = res.data.complainReason
          this.auditVideoList.push(vid)
          this.auditID.push(res.data.auditID)
          this.auditReason.push(cReason)
          console.log('vid:', vid, ' auditID:', res.data.auditID, ' auditReason:', cReason)
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
            // console.log(res)
            this.vidList = res.data.videoID_list
            // console.log('vidList:',this.vidList)
            this.auditInfo = []
            this.auditReason = []
            this.auditVideoList = []
            for (const i in this.vidList) {
              this.getAuditInfo(this.vidList[i])
            }
            // console.log('auditInfo[]:',this.auditInfo)
            // console.log('auditReason[]:',this.auditReason)
          })
          .finally(() => {

            // console.log('auditVideoList[]:',this.auditVideoList)
            this.reloadKey = !this.reloadKey
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
