<template>
  <!--
      show-file-list: 是否显示上传的文件列表

      action: '#' 用来指定文件要上传的地址，由于我们需要定制上传动作
             这里设为#
      :http-request：自定义上传行为（重点）

      on-success: 上传成功之后的回调
      before-upload： 上传之前的检查
      :on-success="handleAvatarSuccess"
    -->
  <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
  >

    <img v-if="value" :src="value" class="avatar">

    <i v-else class="el-icon-plus avatar-uploader-icon" />
  </el-upload>
</template>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<script>
// 下面的代码是固定写法
const COS = require('cos-js-sdk-v5')
// 填写自己腾讯云cos中的key和id (密钥)
const cos = new COS({
  SecretId: '***', // 身份识别ID
  SecretKey: '***' // 身份秘钥
})
export default {
  name: 'UploadImg',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(this.imageUrl)
    },
    beforeAvatarUpload(file) {
      console.log(file)
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
    upload(file) {
      if (file) {
        // 执行上传操作
        cos.putObject({
          Bucket: 'nohesitate-1312201606', /* 存储桶 */
          Region: 'ap-beijing', /* 存储桶所在地域，必须字段 */
          Key: file.uid.toString(), /* 文件uid */
          StorageClass: 'STANDARD', // 上传模式, 标准模式
          Body: file // 上传文件对象
        }, (err, data) => {
          console.log(err || data)
          // 上传成功之后
          if (data.statusCode === 200) {
             console.log(data)
            this.$emit('input', 'https://' + data.Location)
            // this.imageUrl = `https:${data.Location}`
          }
        })
      }
    }
  }
}
</script>
