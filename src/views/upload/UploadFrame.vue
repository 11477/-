<template>
  <div v-title :data-title=this.title style="position: absolute;margin-left: 100px">
    <UploadHead style="width: 1300px"></UploadHead>
    <div class="uploader-frame">
      <div class="video-form">
      <el-form ref="form" :model="form" label-width="80px" :rules="formRule">
        <el-form-item label="视频上传" prop="videoPath">
          <el-upload
              class="upload-video"
              action=""
              :http-request="uploadVideo"
              :before-upload="beforeVideoUpload"
              :file-list="videoList"
              accept="video/mp4, video/mkv"
              :limit="1">
            <el-progress
                :text-inside="true"
                :stroke-width="26"
                v-if="showPercent"
                style="width: 300px" :percentage="percent" />
            <el-button v-else size="small" plain style="width: 100px">点击上传</el-button>
            <span slot="tip" class="el-upload__tip">&emsp;只能上传mp4文件，且不超过300MB
              <el-button v-if="showReload" size="small" plain style="width: 100px">重新上传</el-button>
            </span>
          </el-upload>
        </el-form-item>
        <canvas id="mycanvas" width="320" height="180" style="display:none"></canvas>
        <el-form-item label="视频标题" prop="videoTitle">
          <el-input v-model="form.videoTitle" maxlength="80" show-word-limit></el-input>
        </el-form-item>
            <el-form-item label="封面上传" prop="videoCoverPath" >
              <div class="list-img-box">
                <div v-if="form.videoCoverPath !== ''">
                  <img :src="form.videoCoverPath" style='width:320px;height:180px' alt="自定义封面">
                  <el-button type="primary" @click="uploadPicture('newImg')">更换封面</el-button>
                </div>
                <div v-else class="upload-btn" style="height: 120px; width: 300px" @click="uploadPicture('cover')">
                  <i class="el-icon-plus" style="font-size: 30px;"></i>
                  <span>封面设置</span>
                </div>
              </div>
              <input type="hidden" v-model="form.videoCoverPath" placeholder="请添加封面">

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
                @uploadImgSuccess = "handleUploadImgSuccess"
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
        <el-form-item label="视频分区" prop="videoPart">
          <el-select v-model="form.videoPart" placeholder="请选择视频分区">
            <el-option label="知识" value="knowledge"></el-option>
            <el-option label="科技" value="science"></el-option>
            <el-option label="资讯" value="info"></el-option>
            <el-option label="生活" value="life"></el-option>
            <el-option label="公益" value="charity"></el-option>
            <el-option label="音乐" value="music"></el-option>
            <el-option label="舞蹈" value="dance"></el-option>
            <el-option label="美食" value="food"></el-option>
            <el-option label="运动" value="sport"></el-option>
            <el-option label="影视" value="movie"></el-option>
            <el-option label="历史" value="history"></el-option>
            <el-option label="娱乐" value="entertainment"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频简介" prop="videoDesc">
          <el-input type="textarea"
                    v-model="form.videoDesc"
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
        <el-dialog
            title="上传成功！"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="backToHome">
          <span>您要继续上传视频吗？</span>
          <span slot="footer" class="dialog-footer">
    <el-button @click="backToHome">回到主页</el-button>
    <el-button type="primary" @click="uploadAgain">继续上传</el-button>
  </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import UploadHead from "@/components/upload/UploadHead";
import CropperImage from "@/components/imageCropper/ImageCropper";
import user from "@/store/user";
// 下面的代码是固定写法
const COS = require('cos-js-sdk-v5')
// 填写自己腾讯云cos中的key和id (密钥)
const cosImg = new COS({
  SecretId: '***', // 身份识别ID
  SecretKey: '***' // 身份秘钥
})

export default {
  name: "UploadView",
  components: {UploadHead, CropperImage},
  data() {
    return {
      ruleValidate: {
        mainImage: [
          {required: true, message: '请上传封面', trigger: 'blur'}
        ],
      },
      //上传完成弹框
      dialogVisible: false,
      //进度条相关
      showPercent: false,
      percent: 0,
      showReload: false,
      //裁切图片参数
      coverImg: "",
      cropperModel:false,
      cropperName:'',
      imgName: '',
      imgVisible: false,
      //视频上传参数
      videoList: [],
      title: "投稿中心",
      imageUrl: '',
      isUploaded: false,
      downImg: '#',
      //表单
      form: {
        videoPath: '',
        videoTitle: '',
        videoCoverPath: '',
        videoPart: '',
        videoDesc: '',
        uploaderID: 0,
        videoUpTime: '',
      },
      //表单规则
      formRule: {
        videoPath:[
          {required: true, message:"您还没有上传视频哦~", trigger: 'blur'}
        ],
        videoTitle:[
          {required: true, message:"您的视频需要一个标题", trigger: 'blur'}
        ],
        videoCoverPath:[
          {required: true, message:"您还没有上传封面哦~", trigger: 'blur'}
        ],
        videoDesc:[
          {required: true, message:"请为您的视频添加简介吧", trigger: 'blur'}
        ],
        videoPart:[
          {required: true, message:"请选择分区", trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    //截取视频第一帧作为播放前默认图片
    findvideocover(url) {
      //const  video = document.getElementById("upvideo"); // 获取视频对象
       const video = document.createElement("video") // 也可以自己创建video
      video.src=url // url地址 url跟 视频流是一样的s
      var canvas = document.getElementById('mycanvas') // 获取 canvas 对象
      const ctx = canvas.getContext('2d'); // 绘制2d
      video.crossOrigin = 'anonymous' // 解决跨域问题，也就是提示污染资源无法转换视频
      video.currentTime = 1 // 第一帧
      video.oncanplay = () => {
        console.log('video', video)
        canvas.width = video.clientWidth // 获取视频宽度
        canvas.height = video.clientHeight // 获取视频高度
        // 利用canvas对象方法绘图
        ctx.drawImage(video, 0, 0, video.clientWidth, video.clientHeight)
        // 转换成base64形式
        const imgUrl = canvas.toDataURL('image/png') // 截取后的视频封面
        this.videoImg = [imgUrl]
      }
    },
    uploadPicture(name){
      this.cropperName = name;
      this.cropperModel = true;
    },
    //视频上传成功对话框
    backToHome(){
      this.$router.push({path: '/'})
    },
    uploadAgain(){
      location.reload()
    },
    //图片上传成功后
    handleUploadImgSuccess (cover){
      //console.log(cover.type);
      let file = new window.File([cover], Date.now(), {type:cover.type})
     // console.log(file)
      cosImg.putObject({
        Bucket: 'nohesitate-1312201606',
        Region: 'ap-beijing',
        Key: 'VideoCover/'+file.lastModified.toString(),
        StorageClass: 'STANDARD',
        Body: file // 上传文件对象
      }, (err, data) => {
       // console.log(err || data)
        // 上传成功之后
        if (data.statusCode === 200) {
       //   console.log(data)
          this.form.videoCoverPath='https://' + data.Location
          this.$message.success('封面上传成功');
          // this.imageUrl = `https:${data.Location}`
        }
      })
      this.cropperModel=false
    },
    onSubmit() {
    //  console.log('submit!');
      this.$refs.form.validate((valid)=>{
        if(valid){
          const userInfo = user.getters.getUser(user.state());
          this.form.uploaderID=userInfo.user.userID
      this.form.videoUpTime=Date()
         // console.log(this.$qs.stringify(this.form))
          this.$axios({
            method: 'post',
            url: '/VideoManager/uploadvideo/',
            data: this.$qs.stringify(this.form)
          })
              .then(res => {
             //   console.log(res)
                switch (res.data.error) {
                  case 0:
                    this.$message.success('上传成功')
                      this.dialogVisible=true
                    break;
                  default:
                    this.$message.error(res.data.msg);
                    break;
                }
              })
}
        else {
          this.$message.error('信息不完整')
        }
    }
      )
    },
    uploadVideo(request){
    //  console.log(request)
      cosImg.putObject({
        Bucket: 'nohesitate-1312201606',
        Region: 'ap-beijing',
        Key: 'Video/'+request.file.lastModified.toString(),
        StorageClass: 'STANDARD',
        Body: request.file, // 上传文件对象
          //进度条
        onProgress: (params) => {
          this.percent = params.percent * 100
        }
      }, (err, data) => {
      //  console.log(err || data)
        // 上传成功之后
        if (data.statusCode === 200) {
      //    console.log(data)
          this.form.videoPath='https://' + data.Location
          // this.imageUrl = `https:${data.Location}`
          this.$message.success('视频上传成功');
          this.showReload=true
          this.findvideocover(this.form.videoPath,)
          var config = {
            // 需要替换成您自己的存储桶信息
            Bucket: 'nohesitate-1312201606', /* 存储桶，必须 */
            Region: 'ap-beijing', /* 存储桶所在地域，必须字段 */
          };
          cosImg.request({
                Bucket: config.Bucket,
                Region: config.Region,
                Method: 'GET',
                Key: 'Video/'+request.file.lastModified.toString(),  /* 存储桶内的媒体文件，必须字段 */
                Query: {
                  'ci-process': 'snapshot', /** 固定值，必须 */
                  time: 1, /** 截图的时间点，单位为秒，必须 */
                  // width: 0, /** 截图的宽，非必须 */
                  // height: 0, /** 截图的高，非必须 */
                  // format: 'jpg', /** 截图的格式，支持 jpg 和 png，默认 jpg，非必须 */
                  // rotate: 'auto', /** 图片旋转方式，默认为'auto'，非必须 */
                  // mode: 'exactframe', /** 截帧方式，默认为'exactframe'，非必须 */
                },
                RawBody: true,
              },
              function(err, data){
                console.log(data.Body);
              });
        }
      })
    },
    beforeVideoUpload(file) {
      const filename = file.name;
      let suffix = '';
      let isVideo = false;
      const isLt2M = file.size / 1024 / 1024 < 300;
      try {
        const flieArr = filename.split('.');
        suffix = flieArr[flieArr.length - 1];
      } catch (err) {
        suffix = '';
      }
      const videoList = ['mp4', 'mkv'];
      const judge = videoList.some(function (item) {
        return item === suffix;
      });
      if (judge) {
        isVideo = true;
      }
      if (!isVideo) {
        this.$message.error('上传视频文件只能是 MP4/MKV 格式!');
      } else if (!isLt2M) {
        this.$message.error('上传视频文件大小不能超过 300MB!');
      }
    if(isLt2M && isVideo){
      this.showPercent=true
    }
      return isLt2M && isVideo;
    },
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
.upload-video {
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
