<template>
<!-- el-from表单组件
  每个表单都必须使用 el-from-item 组件包裹
  -->
  <div class="login-container">
    <el-form class="login-style" ref="form" :model="user">
      <div class="login-header"></div>
  <el-form-item class="top">
    <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
  </el-form-item>
  <el-form-item >
  <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
  </el-form-item>
  <el-form-item>
    <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
  </el-form-item>
  <el-form-item>
    <el-button class="login-btn"  type="primary" @click="onLoginin" :loading="loding">登录</el-button>
  </el-form-item>
</el-form>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      checked: true, // 是否同意协议的选中状态
      loding: false // 登录的loading状态
    }
  },
  methods: {
    onLoginin () {
      // 获取表单数据(根据接口要求绑定数据)
      const user = this.user
      // 表单验证
      // 验证通过,提交登录

      // 开启登陆中loading
      this.loding = true
      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        // data用来设置请求体
        data: user
      }).then(res => {
        // 登录成功
        console.log(res)
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        // 关闭loading
        this.loding = false
      }).catch(err => {
        // 登录失败
        console.log('登录失败', err)
        this.$message.error('登录失败，手机号或验证码错误')
        // 关闭loading
        this.loding = false
      })
      // 处理后端响应结果
      // 成功:XXX
      // 失败:XXX
    }

  }
}
</script>

<style lang="less" scoped>
.login-container{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("./login_bg.jpg") no-repeat;
  background-size: cover;
}
.login-style{
    background-color: #fff;
    padding: 50px;
    min-width: 300px;
}
.login-btn{
  width: 100%;
}
.login-header{
  height: 57px;
  width: 300px;
  background: url("./logo_index.png") no-repeat;
}
.top{
  margin-top: 20px;
}
</style>>
