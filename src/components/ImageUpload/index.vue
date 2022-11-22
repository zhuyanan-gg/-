<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :limit="1"
      :file-list="fileList"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-change="onChange"
      :before-upload="onBeforeUpload"
      :http-request="onHttpRequest"
      :class="{ 'img-upload': fileList.length === 1}"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-show="showPercent" :text-inside="true" :stroke-width="26" :percentage="percent" style="width:150px; margin-top:5px;" />
    <el-dialog :visible="isShow" width="30%" title="预览图片" @close="onClose">
      <img :src="imgUrl" style="width:100%;">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'

const cos = new COS({
  SecretId: 'AKIDcGpOLj5nRuFMGvT8hKtRo8Xr44sfL0W4',
  SecretKey: 'a1HKAucDoN3oRsBLPOCtSo3ITbYKzjW9'
})

export default {
  name: 'ImageUpload',
  data() {
    return {
      fileList: [],
      isShow: false,
      imgUrl: '',
      currUid: '',
      percent: 0,
      showPercent: false
    }
  },
  methods: {
    onClose() {
      this.isShow = false
      this.imgUrl = ''
    },
    onPreview(file) {
      this.imgUrl = file.url
      this.isShow = true
    },
    onRemove(file, fileList) {
      // console.log(file, fileList)
      this.fileList = fileList
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    onChange(file, fileList) {
      // console.log(file, fileList)
      this.fileList = fileList.map(item => item)
    },
    onBeforeUpload({ size, type, uid }) {
      // 检查文件类型
      const types = ['image/jpeg', 'image/jpg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(type)) {
        this.$message.warning('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        // return false
        return Promise.reject('失败')
      }
      //  检查大小
      const maxSize = 5 * 1024 * 1024
      if (maxSize < size) {
        this.$message.warning('图片大小最大不能超过5M')
        return false
      }
      this.currUid = uid
      return true
    },
    onHttpRequest(params) {
      this.showPercent = true
      const file = params.file
      cos.putObject({
        Bucket: 'photo-1315218804', // 存储桶
        Region: 'ap-nanjing', // 地域
        Key: file.name, // 文件名
        Body: file, // 要上传的文件对象
        onProgress: (progressData) => {
          this.percent = progressData.percent * 100
        }
      }, (err, data) => {
        // console.log(err || data)
        if (!err && data.statusCode === 200) {
          this.fileList = this.fileList.map(item => {
            if (item.uid === this.currUid) {
              return { url: 'http://' + data.Location, upload: true }
            }
            return item
          })
          setTimeout(() => {
            this.showPercent = false
            this.percent = 0
          }, 500)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
