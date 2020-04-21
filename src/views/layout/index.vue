<template>
  <!-- <div class="home-container"> -->
  <el-container class="layout-container">
  <el-aside class="aside" width="200px" ><app-aside class="aside-menu"></app-aside></el-aside>
  <el-container>
    <el-header class="header">Header</el-header>
    <el-main class="main"><router-view></router-view></el-main>
  </el-container>
</el-container>
  <!-- <div>顶部导航栏</div>

  子路由出口
  <router-view></router-view>
  <div>侧边导航栏</div>
  </div> -->
</template>
<script>
import AppAside from './componets/aside'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {}
  },
  computed: {
  },
  watch: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less">
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.aside {
  background-color: #d3dce6;
  .aside-menu {
      height: 100%;
  }
}
.header {
  background-color: #b3c0d1;
}
.main {
  background-color: #e9eef3;
}
</style>>
