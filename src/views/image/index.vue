<template>
  <div class="image-container">
      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>素材管理</el-breadcrumb-item>
</el-breadcrumb>
  </div>
  <div class="action-head">
    <el-radio-group
       v-model="collect"
       size="mini"
       :total="1000"
       @change="loadImages(1)"
    >
    <!-- 分页数据改变以后, 页码不会发生改变
          需要单独处理高亮的页码
    -->
      <el-radio-button
            :label="false"
          >全部</el-radio-button>
          <el-radio-button
            :label="true"
          >收藏</el-radio-button>
    </el-radio-group>
    <el-button
          size="mini"
          type="success"
          @click="dialogUploadVisible = true"
        >上传素材</el-button>
    </div>
          <el-row :gutter="10">
        <el-col :xs="10" :sm="5" :md="5" :lg="4" v-for="(img, index) in images" :key="index">
          <el-image
            class="image_ys"
            :src="img.url"
            fit="cover"
          ></el-image>
        </el-col>
      </el-row>
      <el-pagination
  background
  layout="prev, pager, next"
  :total="totalCount"
  :page-size="pageSize"
  :current-page.sync="page"
  @current-change="onPageChange">
</el-pagination>

</el-card>
<el-dialog
      title="上传素材"
      :visible.sync="dialogUploadVisible"
      :append-to-body="true"
    >
      <el-upload
        class="upload-demo"
        drag
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        multiple
        :show-file-list="false"
        :on-success="onUploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImages } from '@/APi/image'
export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false,
      images: [],
      page: 1, // 当前页码
      totalCount: 0, // 总数据条数
      pageSize: 10, // 每页大小
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    // 页面初始化第一页数据
    this.loadImages(1)
  },
  mounted () {},
  methods: {
    // 有默认值的参数必须作为最后一个参数
    loadImages (page = 1) {
      this.page = page
      getImages({ collect: this.collect, page, per_page: this.pageSize }).then(res => {
        this.images = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    // onCollectChange () {
    //   this.loadImages(1)
    // },
    onUploadSuccess () {
      // 关闭对话框
      this.dialogUploadVisible = false

      // 更新素材列表
      this.loadImages(1)
    },
    onPageChange (page) {
      // console.log(page)
      this.loadImages(page)
    }
  }
}
</script>
<style scoped lang="less">
.action-head {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.image_ys {
  height: 200px;
  margin: 0 10px 10px 0;
}
</style>
