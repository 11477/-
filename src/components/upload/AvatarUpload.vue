<template>
  <div>
    <div>
      <h3 style="margin-top: 23px; margin-left: 100px">上传头像</h3>
      <div class="avatar-uploader" @click="uploadPicture('cover')">
        <i class="el-icon-plus" style="font-size: 30px; margin-top: 110px;"></i>
      </div>
    </div>
    <!-- 剪裁组件弹窗 -->
    <el-dialog
        title="裁切头像"
        :visible.sync="cropperModel"
        width="950px"
        center
    >
      <cropper-image
          :Name="cropperName"
          @uploadImgSuccess = "handleUploadImgSuccess"
          ref="child">
      </cropper-image>
    </el-dialog>
    <!--查看大图-->
    <el-dialog
        title="查看大图"
        :visible.sync="imgVisible"
        center>
      <img :src="imgName" v-if="imgVisible" style="width: 100%" alt="查看">
    </el-dialog>
  </div>
</template>
<style>
</style>

<script>
// 下面的代码是固定写法
import CropperImage from "@/components/imageCropper/AvatarCropper";
import user from "@/store/user";
const COS = require('cos-js-sdk-v5')
// 填写自己腾讯云cos中的key和id (密钥)
const cosImg = new COS({
  SecretId: '***', // 身份识别ID
  SecretKey: '***' // 身份秘钥
})
export default {
  components: { CropperImage},
  name: 'UploadImg',
  data() {
    return {
      //裁切图片参数
      coverImg: "",
      cropperModel:false,
      cropperName:'',
      imgName: '',
      imgVisible: false,
      avatarPath: '',
      form: {
        userID: '',
        portrait: '',
      },
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
     // console.log(this.imageUrl)
    },
    beforeAvatarUpload(file) {
    //  console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        return this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        return this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      this.upload(file)
    },
    uploadPicture(name){
      this.cropperName = name;
      this.cropperModel = true;
    },
    //图片上传成功后
    handleUploadImgSuccess (cover){
      //console.log(cover.type);
      let file = new window.File([cover], Date.now(), {type:cover.type})
      // console.log(file)
      cosImg.putObject({
        Bucket: 'nohesitate-1312201606',
        Region: 'ap-beijing',
        Key: 'UserAvatar/'+file.lastModified.toString(),
        StorageClass: 'STANDARD',
        Body: file // 上传文件对象
      }, (err, data) => {
      //  console.log(err || data)
        // 上传成功之后
        if (data.statusCode === 200) {
           //  console.log(data)
          //console.log('https://' + data.Location)
          //this.$message.success('头像设置成功');
          //   console.log(`https:${data.Location}`)
         //  this.imageUrl = `https:${data.Location}`
          let msg = {
            avatarUrl: `https:${data.Location}`
          }
         // console.log(msg.avatarUrl)
          this.$emit('uploadAvatarSuccess',msg)
          const userInfo = user.getters.getUser(user.state())
          this.form.userID = userInfo.user.userID
          this.form.portrait = msg.avatarUrl
          this.$axios({
            method: 'post',
            url: '/Webhome/uploadPortrait/',
            data: this.$qs.stringify(this.form)
          })
              .then(res => {
                //   console.log(res)
                switch (res.data.error) {
                  case 0:
                    this.$message.success('头像设置成功')
                    location.reload()
                    break;
                  case 4001:
                    this.$message.warning('用户不存在！');
                    break;
                  case 4002:
                    this.$message.error('未登录！');
                    break;
                  case 3001:
                    this.$message.error('表单信息有有误！');
                    break;
                  default:
                    this.$message.error(res.data.msg);
                    break;
                }
              })
        }
      })
      this.cropperModel=false
    },
  }
}
</script>

<style>
.avatar-uploader{
  width: 250px;
  height: 250px;
  border: 1px dashed #409EFF;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background: #f7f7f7;
  margin-left: 100px;
  margin-top: 30px;
}
.avatar-uploader :hover {
  border: #409EFF;
}
</style>
