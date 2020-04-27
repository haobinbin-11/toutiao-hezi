<template>
  <div class="image-container">
      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>素材管理</el-breadcrumb-item>
</el-breadcrumb>
  </div>
  <div style="padding-bottom: 20px;">
      <el-radio-group v-model="radio1" size="mini">
      <el-radio-button label="全部"></el-radio-button>
      <el-radio-button label="收藏"></el-radio-button>
    </el-radio-group>
          <el-row :gutter="10">
        <el-col :xs="12" :sm="6" :md="6" :lg="4" v-for="(img, index) in images" :key="index">
          <el-image
            style="height: 100px"
            :src="img.url"
            fit="cover"
          ></el-image>
        </el-col>
      </el-row>
  </div>
</el-card>
  </div>
</template>

<script>
import { getImages } from '@/APi/image'
export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
    return {
      radio1: '全部',
      images: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages()
  },
  mounted () {},
  methods: {
    loadImages () {
      getImages().then(res => {
        this.images = res.data.data.results
      })
    }
  }
}
</script>
<style scoped lang="less"></style>
