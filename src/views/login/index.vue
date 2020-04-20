<template>
<!-- el-from表单组件
  每个表单都必须使用 el-from-item 组件包裹
  -->
  <div class="login-container">
    <el-form ref="form" :model="user" label-width="80px">
  <el-form-item label="手机号">
    <el-input v-model="user.name"></el-input>
  </el-form-item>
  <el-form-item label="验证码">
  <el-input v-model="user.code"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">登录</el-button>
  </el-form-item>
</el-form>
  </div>
</template>
<script>
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        name: '',
        code: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }

}
</script>

<style>

</style>
