<template>
  <div class="comment-container">
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>评论管理</el-breadcrumb-item>
</el-breadcrumb>
  </div>
  <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="date"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="总评论数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="粉丝评论数">
      </el-table-column>
      <el-table-column
        prop="address"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
      </el-table-column>
    </el-table>
</el-card>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style scoped lang="less"></style>
