<template>
  <div class="article-container">
    <el-card class="top-card">
  <div slot="header" class="clearfix">
    <span>      <!-- 面包屑路径导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>内容管理</el-breadcrumb-item>
</el-breadcrumb>
<!-- 面包屑路径导航 --></span>
  </div>
  <div class="text item">
    <!-- 数据筛选表单 -->
<el-form size="mini" ref="form" :model="form" label-width="40px">
  <el-form-item label="状态">
    <el-radio-group v-model="form.resource">
      <el-radio label="全部"></el-radio>
      <el-radio label="草稿"></el-radio>
      <el-radio label="待审核"></el-radio>
      <el-radio label="审核通过"></el-radio>
      <el-radio label="审核失败"></el-radio>
      <el-radio label="已删除"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="频道">
    <el-select v-model="form.region" placeholder="请选择">
      <el-option label="开发者咨询" value="shanghai"></el-option>
      <el-option label="iOS" value="iOS"></el-option>
      <el-option label="大数据" value="da"></el-option>
      <el-option label="C++" value="C"></el-option>
      <el-option label="Android" value="A"></el-option>
      <el-option label="css" value="CSS"></el-option>
      <el-option label="数据库" value="mysqle"></el-option>
      <el-option label="区域链" value="QY"></el-option>
      <el-option label="java" value="java"></el-option>
      <el-option label="PHP" value="php"></el-option>
      <el-option label="python" value="python"></el-option>
      <el-option label="WEB" value="web"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="日期">
    <el-date-picker
      v-model="form.date1"
      type="datetimerange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['12:00:00']">
    </el-date-picker>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">筛选</el-button>
  </el-form-item>
</el-form>
<!-- 数据筛选表单 -->

  </div>
</el-card>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>根筛选条件查询到153658条结果</span>
  </div>
  <div class="text item">
    <!-- 数据列表 -->
    <!-- table 表格组件
    1. 把需要展示的数组列表数据绑定给 table 组件的 data 属性
       注意: 不要 v-for 遍历 会自己遍历
    2. 设计表格列 el-table
        with 可以设定表格列的宽度
        label 可以设定列的标题
        prop 用来设定要渲染的列表项数据字段
    3. 用自定义表格 放按钮 图片...
    -->
<el-table
      class="list-table"
      stripe
      size="mini"
      :data="articles"
      style="width: 100%">
      <el-table-column
        prop="cover"
        label="封面">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template>
        <el-button
          size="mini"
          circle
          type="primary"
          icon="el-icon-edit"
        ></el-button>
        <el-button
          size="mini"
          circle
          icon="el-icon-delete"
          type="danger"
        ></el-button>
      </template>
      </el-table-column>
    </el-table>
<!-- 数据列表 -->
<!-- 分页设置 -->
<el-pagination
    background
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
<!-- 分页设置 -->
  </div>
</el-card>

  </div>
</template>

<script>
import { getArticles } from '@/APi/article'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articles: [] // 文章数据来列表
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
  },
  mounted () {},
  methods: {
    loadArticles () {
      getArticles().then(res => {
        this.articles = res.data.data.results
      })
    },
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>
<style scoped lang="less">
.top-card {
  margin-bottom: 25px;
}
.list-table {
  margin-bottom: 30px;
}
</style>
