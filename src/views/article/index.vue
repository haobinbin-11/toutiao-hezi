<template>
  <div class="article-container">
      <!-- 面包屑路径导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>内容管理</el-breadcrumb-item>
</el-breadcrumb>
<!-- 面包屑路径导航 -->

<!-- 数据筛选表单 -->
<el-form ref="form" :model="form" label-width="80px">
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
  <el-form-item label="活动时间">
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
</template>

<script>
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
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>
<style scoped lang="less"></style>
