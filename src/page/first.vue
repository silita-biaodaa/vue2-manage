<template>
  <div class="first">
    <el-row :span="24" class="drc color-f62 mb20 ft18 blod">
      <el-col :span="8">昨日新增公告：{{ yesterdayCounts }}</el-col>
      <el-col :span="8">昨日新增公告：{{ todayCounts }}</el-col>
      <el-col :span="8">全国公告总数：{{ totalCounts }}</el-col>
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
      <div id="myChart" :style="{width:'100%',height:'300px'}"></div>
    </div>
  </div>
</template>
<script>
import { noticeNum, listArea, siteNoticeNum } from "@/api/index";
import echarts from 'echarts'
export default {
  data() {
    return {
      yesterdayCounts: "", //昨日新增公告
      todayCounts: "", //今日新增公告
      totalCounts: "", //全国公告总数
      province: "湖南省",
      provinces: [],
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
    noticeTotal() {
      noticeNum({}).then(res => {
        if(res.code == '1') {
          const { todayCounts, totalCounts, yesterdayCounts } = res.data;
          this.todayCounts = todayCounts;
          this.totalCounts = totalCounts;
          this.yesterdayCounts = yesterdayCounts;
        }else {
          console.info('公告统计接口不通');
        }
      })
    },
    getArea() {
      listArea({ areaParentId: 0 }).then(res => {
        if (res.code == "1") {
          this.provinces = res.data;
        } else {
          console.info("获取省份接口不通");
        }
      });
    },
    changetable() {
      console.info(11);
    }
  },
  created() {
    this.noticeTotal();
    this.getArea();
  },
  components: {}
};
</script>
<style lang="less" scoped>
@import "../style/mixin";
</style>