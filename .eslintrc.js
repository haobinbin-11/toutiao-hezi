// ESLint 代码规范校验工具的配置文件

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  // 自定义代码校验规范
  rules: {
    // process.env.NODE_ENV === 'production' 是来判断代码运行环境的
    // production 生产环境(发布环境)
    // development 开发环境
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off' // 把规则关掉
  }
}
