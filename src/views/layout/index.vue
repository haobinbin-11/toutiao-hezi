<template>
  <!-- <div class="home-container"> -->
  <el-container class="layout-container">
  <el-aside class="aside" width="200px" ><app-aside class="aside-menu"></app-aside></el-aside>
  <el-container>
    <el-header class="header">
        <div>
        <i class="el-icon-s-fold"></i>
        <span>江苏传智播客科技教育有限公司</span>
        </div>
        <el-dropdown>
      <div class="avatar-wrap">
        <img class="avatar" src="http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg" alt="">
        <span>用户昵称</span>
        <i class="el-icon-arrow-down"></i>
      </div>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item class="el-icon-setting">设置</el-dropdown-item>
    <el-dropdown-item class="el-icon-unlock">退出</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>

        </el-header>
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
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.main {
  background-color: #e9eef3;
}
.avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-left: 5px;
    }
}
</style>>
