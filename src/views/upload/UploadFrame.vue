<template>
  <div v-title :data-title=this.title>
    <UploadHead></UploadHead>
    <div class="uploader-frame">
      <div class="video-form">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="视频上传">
          <div class="not-uploaded" v-if="!isUploaded">
            <el-upload
                class="video-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                drag
                :show-file-list="false"
                :on-success="handleVideoSuccess"
                :before-upload="beforeVideoUpload">
              <i class="el-icon-plus video-uploader-icon"></i>
            </el-upload>
            <div class="upload-hint-info">在这里上传视频，拖拽也可以哦~</div>
          </div>
          <div class="uploaded" v-else>
            <h1>114514</h1>
          </div>
        </el-form-item>
        <el-form-item label="视频标题">
          <el-input v-model="form.name" maxlength="80" show-word-limit></el-input>
        </el-form-item>
            <el-form-item label="封面上传" prop="mainImage">
              <div class="list-img-box">
                <div v-if="formValidate.mainImage !== ''">
                  <img :src="formValidate.mainImage" style='width:300px;height:150px' alt="自定义封面">
                </div>
                <div v-else class="upload-btn" style="height: 120px;" @click="uploadPicture('flagImg')">
                  <i class="el-icon-plus" style="font-size: 30px;"></i>
                  <span>封面设置</span>
                </div>
              </div>
              <input type="hidden" v-model="formValidate.mainImage" placeholder="请添加封面">
            </el-form-item>
          <!-- 剪裁组件弹窗 -->
          <el-dialog
              title="裁切封面"
              :visible.sync="cropperModel"
              width="950px"
              center
          >
            <cropper-image
                :Name="cropperName"
                @uploadImgSuccess = "handleUploadSuccess"
                ref="child">
            </cropper-image>
          </el-dialog>
          <!--查看大封面-->
          <el-dialog
              title="查看大封面"
              :visible.sync="imgVisible"
              center>
            <img :src="imgName" v-if="imgVisible" style="width: 100%" alt="查看">
          </el-dialog>
        <el-form-item label="视频分区" >
          <el-select v-model="form.region" placeholder="请选择视频分区">
            <el-option label="分区一" value="math"></el-option>
            <el-option label="分区二" value="OS"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频简介">
          <el-input type="textarea"
                    v-model="form.desc"
                    maxlength="500"
                    show-word-limit
                    :rows="10"
                    resize="none"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即投稿</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import UploadHead from "@/components/upload/UploadHead";
import CropperImage from "@/components/imageCropper/ImageCropper";
export default {
  name: "UploadView",
  components: {UploadHead, CropperImage},
  data() {
    return {
      formValidate: {
        mainImage: '',
      },
      ruleValidate: {
        mainImage: [
          {required: true, message: '请上传封面', trigger: 'blur'}
        ],
      },
      //裁切图片参数
      coverImg: "#",
      cropperModel:false,
      cropperName:'',
      imgName: '',
      imgVisible: false,
      title: "投稿中心",
      imageUrl: '',
      isUploaded: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    };
  },
  methods: {
    uploadPicture(name){
      this.cropperName = name;
      this.cropperModel = true;
    },
    //图片上传成功后
    handleUploadSuccess (data){
      console.log(data+"nani")
      this.coverImg=window.URL.createObjectURL(data)
      this.cropperModel = false;
      console.log(this.coverImg)
    },
    onSubmit() {
      console.log('submit!');
    },
    handleVideoSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.isUploaded=true
      console.log(this.imageUrl)
    },
    beforeVideoUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style scoped>
.uploader-frame {
  display: inline-block;
}
.list-img-box{
  width: 600px;
}
.video-form{
  text-align: left;
  width: 1200px;
  margin: 0 auto;
  display: inline-block;
}
.not-uploaded {
  margin: 0 auto;
}
.video-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.video-uploader .el-upload:hover {
  border-color: #409EFF;
}
.video-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.video-cover {
  width: 178px;
  height: 178px;
  display: block;
}
.upload-list-cover{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 40px;
  align-items: center;
  background: rgba(0,0,0,.6);
  opacity: 0;
  transition: opacity 1s;
}
.cover_icon {
  font-size: 30px;
}
.upload-btn{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border: 1px solid #cccccc;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 1px #cccccc;
  cursor: pointer;
}
.upload-btn:hover {
  border: 1px solid #69b7ed;
}
.upload-btn i{
  margin: 5px;
}
</style>
