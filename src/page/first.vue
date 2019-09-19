<template>
  <div class="first">
    <el-row :span="24" class="drc color-f62 mb20 ft18 blod">
      <el-col :span="3">昨日新增公告：{{ yesterdayCount }}</el-col>
      <el-col :span="3">昨日新增公告：{{ totalCount }}</el-col>
      <el-col :span="3">全国公告总数：{{ untreatedCount }}</el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="mb50">
      <el-row :span="24" type="flex" class="row-bg" justify="space-around">
        <el-col :span="12" class="ft16">
          省份：
          <el-select v-model="province" placeholder="请选择" style="width:35%" @change="changetable">
            <el-option
              v-for="item in provinces"
              :key="item.areaCode"
              :label="item.areaName"
              :value="item.areaCode"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="12" class="ft16">
          公告抓取日期:
          <el-date-picker
            v-model="newtime"
            type="daterange"
            style="width:70%"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="changetable"
          ></el-date-picker>
        </el-col>
      </el-row>
    </div>
    <div class="charts" style="width:'100%',height:'6.54rem'">
      <div class="charts-title">24小时内最高：99.99</div>
      <div id="myChart" :style="{width:'100%',height:'300px'}"></div>
    </div>
  </div>
</template>
<script>
import { checkType } from "@/api/index";
import echarts from 'echarts'
export default {
  data() {
    return {
      yesterdayCount: "", //昨日新增公告
      totalCount: "", //昨日新增公告
      untreatedCount: "", //全国公告总数
      province: "",
      provinces: [
        {
          areaCode: "",
          areaName: "全部"
        },
        {
          areaCode: "0",
          areaName: "注册"
        },
        {
          areaCode: "1",
          areaName: "付费"
        },
        {
          areaCode: "2",
          areaName: "续费"
        },
        {
          areaCode: "3",
          areaName: "过期"
        }
      ],
      newtime: [new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()),new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())],
    };
  },
  mounted() {
     /*ECharts图表*/
    var myChart = echarts.init(document.getElementById('myChart'));
    var option = {
      color: ['#3398DB'],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value'
       },
       yAxis: {
        type: 'category',
        data: ['0', '6H', '9H', '12H', '15H', '18H', '24H']
       },
       series: [{
        data: [1, 3, 4, 7, 4, 6, 9],
        type: 'bar',
        barWidth: '60%',
      }]
     }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
  methods: {
    changetable() {
      console.info(11);
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
@import "../style/mixin";
</style>