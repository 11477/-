<template>
  <div>
    <div >
      <div class="list-img-box">
        <div class="upload-btn" style="height: 120px; width: 300px" @click="uploadPicture('cover')">
          <i class="el-icon-plus" style="font-size: 30px;"></i>
          <span>头像设置</span>
        </div>
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
const COS = require('cos-js-sdk-v5')
// 填写自己腾讯云cos中的key和id (密钥)
const cosImg = new COS({
  SecretId: 'AKIDlNlupUt1vZx5zd2B4h4A0aFfohJfkZ8Q', // 身份识别ID
  SecretKey: '5uXqthEVXKtDH6g290cz6yby6ze4FBsK' // 身份秘钥
})
export default {
  components: { CropperImage},
  name: 'UploadImg',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      //裁切图片参数
      coverImg: "",
      cropperModel:false,
      cropperName:'',
      imgName: '',
      imgVisible: false,
      avatarPath: '',
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
          this.$message.success('头像上传成功');
          //   console.log(`https:${data.Location}`)
         //  this.imageUrl = `https:${data.Location}`
          let msg = {
            avatarUrl: `https:${data.Location}`
          }
         // console.log(msg.avatarUrl)
          this.$emit('uploadAvatarSuccess',msg)
        }
      })
      this.cropperModel=false
    },
  }
}
</script>
