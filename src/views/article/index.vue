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
<el-form v-loading="loading" size="mini" ref="form" :model="form" label-width="40px">
  <el-form-item label="状态">
    <!-- el-radio 默认把 label 作为文本和 value值 -->
    <el-radio-group v-model="status">
      <el-radio :label="null">全部</el-radio>
      <el-radio :label="0">草稿</el-radio>
      <el-radio :label="1">待审核</el-radio>
      <el-radio :label="2">审核通过</el-radio>
      <el-radio :label="3">审核失败</el-radio>
      <el-radio :label="4">已删除</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="频道">
    <el-select v-model="channelId" placeholder="请选择频道">
      <el-option
       label="全部"
       :value="null"
      ></el-option>
      <el-option
       :label="channel.name"
       :value="channel.id"
       v-for="(channel, index) in channels"
       :key="index"
      ></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="日期">
    <el-date-picker
      v-model="rangeDate"
      type="datetimerange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['12:00:00']"
      value-format="yyyy-MM-dd"
      format="yyyy-MM-dd"
    >
    </el-date-picker>
  </el-form-item>
  <el-form-item>
    <!-- button 按钮 click事件 有一个 默认参数
    当你没有指定参数时 它会默认传递一个没用的数据
    -->
    <el-button :disabled="loading" type="primary" @click="loadArticles(1)">查询</el-button>
  </el-form-item>
</el-form>
<!-- 数据筛选表单 -->

  </div>
</el-card>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>根筛选条件查询到{{ totalCount }}条结果</span>
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
      v-loading="loading"
      class="list-table"
      stripe
      size="mini"
      :data="articles"
      style="width: 100%">
      <el-table-column
        prop="cover"
        label="封面">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.cover.images[0]"
            fit="cover"
            lazy
          >
            <div slot="placeholder" class="image-slot"
            >
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        <!-- <template slot-scope="scope">
          <img class="article-cover" :src="scope.row.cover.images[0] || 'no-cover.gif'" alt=""> -->
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
        <!-- 容需要在自定义模板中获取当前遍历项数据
        那么 就在template上声明 slot-scope="scope"
        -->
        <template slot-scope="scope">
          <div>
            <el-tag :type="articleStatus[scope.row.status].type">{{ articleStatus[scope.row.status].text }}</el-tag>
            <!-- <el-tag v-if="scope.row.status === 0">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1" type="info">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
        <el-button
          size="mini"
          circle
          type="primary"
          icon="el-icon-edit"
          @click="$router.push('/publish?id=' + scope.row.id.toString())"
        ></el-button>
        <el-button
          size="mini"
          circle
          icon="el-icon-delete"
          type="danger"
          @click="onDeleteArticle(scope.row.id)"
        ></el-button>
      </template>
      </el-table-column>
    </el-table>
<!-- 数据列表 -->
<!-- 分页设置 -->
<el-pagination
    background
    layout="prev, pager, next"
    :total=totalCount
    :disabled="loading"
    @current-change="oncurrentchange"
    :page-size="pageSize"
    :current-page.sync="page"
    />
<!-- 分页设置 -->
  </div>
</el-card>

  </div>
</template>

<script>
import { getArticles, getArticleChannels, deleteArticle } from '@/APi/article'
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
      articles: [], // 文章数据列表
      articleStatus: [
        { type: '', status: 0, text: '草稿' },
        { type: 'info', status: 1, text: '待审核' },
        { type: 'success', status: 2, text: '审核通过' },
        { type: 'warning', status: 3, text: '审核失败' },
        { type: 'danger', status: 4, text: '已删除' }
      ],
      totalCount: 0, // 总数据条数
      pageSize: 10, // 每页大小
      status: null, // 查询文章状态, 不传就是全部
      channels: [], // 文章频道
      channelId: null, // 查询文章频道
      rangeDate: null, // 筛选的范围日期
      loading: true, // 表单数据加载中
      page: 1
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
    this.loadArticles(1)
  },
  mounted () {},
  methods: {
    loadArticles (page = 1) {
      // 展示加载中loading
      this.loading = true
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始日期
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 截止日期
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount
        // 关闭加载中的 loding
        this.loading = false
      })
    },
    oncurrentchange (page) {
      this.loadArticles(page)
    },
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    onDeleteArticle (articleId) {
      // 找到数据接口
      // 封装请求方法
      // 删除请求调用
      // 处理响应结果
      console.log(articleId)
      console.log(articleId.toString())
      this.$confirm('是否要删除?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认
        deleteArticle(articleId.toString()).then(res => {
          console.log(res)
          // 成功 更新文章数据列表
          this.loadArticles(this.page)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
.article-cover{
  width: 80px;
  height: 80px;
  background-size: cover;
}
</style>
