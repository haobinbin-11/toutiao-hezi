<template>
  <div class="publish-container">
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>发布文章</el-breadcrumb-item>
</el-breadcrumb>
  </div>
  <div class="text item">
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="标题" prop="name">
    <el-input v-model="article.title"></el-input>
  </el-form-item>
  <el-form-item label="内容" prop="desc">
    <el-input type="textarea" v-model="article.content"></el-input>
  </el-form-item>
    <el-form-item label="封面" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="单图"></el-radio>
      <el-radio label="三图"></el-radio>
      <el-radio label="无图"></el-radio>
      <el-radio label="自动"></el-radio>
    </el-radio-group>
  </el-form-item>
   <el-form-item label="频道" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">发表</el-button>
    <el-button @click="resetForm('ruleForm')">存入草稿</el-button>
  </el-form-item>
</el-form>
  </div>
</el-card>
</div>
</template>

<script>
export default {
  name: 'PublishIndex',
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
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: { // 文章封面
          type: 0, // 封面类型 -1 自动 0 无图 1 1张 3 3张
          images: [] // 图片地址
        }
      },
      rules: {
        name: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写内容', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
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
    }
  }
}
</script>
<style scoped lang="less"></style>
