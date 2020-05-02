<template>
<div class="setting-container">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/settings">个人设置</a></el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <el-row>
        <el-col :span="12">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="编号">
                {{ user.id }}
                </el-form-item>
                <el-form-item label="手机">
                {{ user.mobile }}
                </el-form-item>
                <el-form-item label="媒体名称" prop="name">
                    <el-input v-model="user.name"></el-input>
                </el-form-item>
                <el-form-item label="媒体介绍" prop="desc">
                    <el-input type="textarea" v-model="user.intro"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="name">
                    <el-input v-model="user.email"></el-input>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存设置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="3" :offset="6">
            <label for="file">
              <el-avatar shape="square" :size="150" fit="cover" :src="user.photo"></el-avatar>
              <p class="cen">点击修改头像</p>
            </label>
            <input @change="onFileChange" id="file" ref="file" type="file" hidden>
        </el-col>
    </el-row>
  </el-card>
  <el-dialog
    title="修改头像"
    :visible.sync="dialogVisible"
    append-to-body
    @opened="onDialogOpened"
    @closed="onDialogClosed"
  >
    <div class="preview-image-wrap">
      <img ref="preview-image" class="preview-image" :src="previewImage" alt="">
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onUpdatePhoto">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import { getUserProfile, updateUserPhoto } from '@/APi/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      user: { // 用户资料 初始化一下
        email: '',
        id: null,
        intro: '',
        mobile: '',
        name: '',
        photo: ''
      },
      dialogVisible: false, // 控制上传图片裁切预览的显示状态
      previewImage: '', // 预览图片
      cropper: null // 裁切器示例
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUser()
  },
  mounted () {},
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    loadUser () {
      getUserProfile().then(res => {
        // console.log(res)
        this.user = res.data.data
      })
    },
    onFileChange () {
      // 处理图片预览
      const file = this.$refs.file
      const blobData = window.URL.createObjectURL(file.files[0])
      this.previewImage = blobData
      // 展示弹出层, 预览用户选择的图片
      this.dialogVisible = true
      // 解决选择相同文件不触发 change 事件问题
      this.$refs.file.value = ''
    },
    onDialogOpened () {
      // 图片裁切器必须基于 img 进行初始化
      // 注意 : img 必须是可见状态才能正常完成初始化
      // 获取图片 DOM 节点
      const image = this.$refs['preview-image']
      // 初始化 裁切器
      if (this.cropper) {
        this.cropper.replace(this.previewImage)
        return
      }
      this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: 'none',
        cropBoxResizable: false,
        aspectRatio: 1
        // crop (event) {
        //   console.log(event.detail.x)
        //   console.log(event.detail.y)
        //   console.log(event.detail.width)
        //   console.log(event.detail.height)
        //   console.log(event.detail.rotate)
        //   console.log(event.detail.scaleX)
        //   console.log(event.detail.scaleY)
        // }
      })
    },
    onDialogClosed () {
      // 对话框关闭 销毁裁切器
      // this.cropper.destroy()
    },
    onUpdatePhoto () {
      // 获取裁切的图片对象
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo', file)
        // 请求提交 fd
        // 请求跟新用户头像
        updateUserPhoto(fd).then(res => {
          // 关闭对话框
          this.dialogVisible = false
          // 更新视图展示
          this.user.photo = window.URL.createObjectURL(file)
          // this.user.photo = res.data.data.photo
        })
      })
    }
  }
}
</script>
<style scoped lang="less">
.cen {
  text-align: center;
}
.preview-image-wrap {
  .preview-image {
    display: block;
    max-width: 100%;
    height: 200px;
  }
}
</style>
