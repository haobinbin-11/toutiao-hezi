<template>
<!-- el-from表单组件
  每个表单都必须使用 el-from-item 组件包裹
  -->
  <div class="login-container">
    <el-form ref="login-from" class="login-style" :model="user" :rules="fromRules">
      <div class="login-header"></div>
  <el-form-item prop="mobile"  class="top">
    <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
  </el-form-item>
  <el-form-item prop="code">
  <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
  </el-form-item>
  <el-form-item prop="agree">
    <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
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
        code: '',
        agree: false // 是否同意协议的选中
      },
      loding: false, // 登录的loading状态
      fromRules: {
        mobile: [
          // 要验证的数据名称
          { required: true, message: '手机号不能为空', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确手机号格式', trigger: 'change' }
        ],
        code: [
          // 要验证的数据名称
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确验证码格式', trigger: 'change' }
        ],
        agree: [
          // 自定义校验规则
          // 验证通过: callback()
          // 验证失败: callback(new Error('错误消息))
          // false: 验证失败
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请勾选同意用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onLoginin () {
      // 获取表单数据(根据接口要求绑定数据)
      // const user = this.user
      // 表单验证
      this.$refs['login-from'].validate(vaild => {
        // 如果表单验证失败, 停止请求提交
        if (!vaild) {
          return
        }
        // 验证通过, 请求登录
        this.login()
      })
      // 处理后端响应结果
      // 成功:XXX
      // 失败:XXX
    },
    login () {
      // 开启登陆中loading
      this.loding = true
      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        // data用来设置请求体
        data: this.user
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
