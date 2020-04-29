<template>
  <div class="fans-container">
      <!-- 1.为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div ref="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
// 2.导入echarts
import echarts from 'echarts'
export default {
  name: 'fans',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    // 3. 初始化图表
    var myChart = echarts.init(this.$refs.main)
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
    // 使用刚指定的配置项和数据展示图表
    myChart.setOption(option)
  },
  methods: {}
}
</script>
<style scoped lang="less"></style>
