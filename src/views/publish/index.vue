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
<el-form :model="article" :rules="rules" ref="article" label-width="100px">
  <el-form-item label="标题" prop="title">
    <el-input v-model="article.title"></el-input>
  </el-form-item>
  <el-form-item label="内容" prop="content">
    <el-input type="textarea" v-model="article.content"></el-input>
  </el-form-item>
    <el-form-item label="封面" prop="cover">
    <el-radio-group v-model="article.cover.type">
      <el-radio :label="1">单图</el-radio>
      <el-radio :label="3">三图</el-radio>
      <el-radio :label="0">无图</el-radio>
      <el-radio :label="-1">自动</el-radio>
    </el-radio-group>
  </el-form-item>
   <el-form-item label="频道" prop="channel_id">
    <el-select v-model="article.channel_id" placeholder="请选择">
      <el-option :label="item.name" v-for="(item, index) in channels" :key="index" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
      <!-- 按钮 默认有一个参数 如果不写 就会传上去 -->
    <el-button type="primary" @click="onPublish(false)">发表</el-button>
    <el-button @click="onPublish(true)">存入草稿</el-button>
  </el-form-item>
</el-form>
  </div>
</el-card>
</div>
</template>

<script>
import { getArticleChannels, addArticle, getArticle } from '@/APi/article'
export default {
  name: 'PublishIndex',
  components: {},
  props: {},
  data () {
    return {
      channels: [], // 文章频道列表
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: { // 文章封面
          type: 0, // 封面类型 -1 自动 0 无图 1 1张 3 3张
          images: [] // 图片地址
        },
        channelss: '',
        chanel_id: null,
        chanel_name: null
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请填写内容', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
    // 发布与修改用的同一组件 要判断
    // 路径有id 则展示文章内容
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  mounted () {},
  methods: {
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    onPublish (draft = false) {
      addArticle(this.article, draft).then(res => {
        console.log(res)
        this.$message({
          message: '成功',
          type: 'success'
        })
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 修改文章: 加载文章内容
    loadArticle () {
      getArticle(this.$route.query.id).then(res => {
        this.article = res.data.data
      })
    }
  }
}
</script>
<style scoped lang="less"></style>
