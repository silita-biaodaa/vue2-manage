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
            @clear="clearDate"
          ></el-date-picker>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="ft14 text-r mr100">合计:{{total?total:0}}条</el-col>
      </el-row>
    </div>
    <div class="charts" v-if="showEcharts">
      <div id="myChart" :style="{width:'100%',height:'1000px'}"></div>
    </div>
  </div>
</template>
<script>
import { noticeNum, listArea, siteNoticeNum } from "@/api/index";
import echarts from "echarts";
import { timestampToTime } from "../public";
export default {
  data() {
    return {
      yesterdayCounts: "", //昨日新增公告
      todayCounts: "", //今日新增公告
      totalCounts: "", //全国公告总数
      province: "湖南省",
      provinces: [],
      newtime: [
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        ),
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        )
      ],
      yAxisData: [],
      seriesData: [],
      showEcharts: true,
      total: ""
    };
  },
  mounted() {
    /*ECharts图表*/
    this.$nextTick(function() {});
  },
  methods: {
    noticeTotal() {
      noticeNum({}).then(res => {
        if (res.code == "1") {
          const { todayCounts, totalCounts, yesterdayCounts } = res.data;
          this.todayCounts = todayCounts;
          this.totalCounts = totalCounts;
          this.yesterdayCounts = yesterdayCounts;
        } else {
          console.info("公告统计接口不通");
        }
      });
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
    resizeCharts (chartBox) {
      myChart.style.width = chartBox.style.width + 'px'
      myChart.style.height = chartBox.style.height + 'px'
    },
    getTableNum() {
      this.yAxisData = [];
      this.seriesData = [];
      var startDate = this.newtime == null?"" : timestampToTime(this.newtime[0]).slice(0, 10);
      var endDate = this.newtime == null?"" : timestampToTime(this.newtime[0]).slice(0, 10);
      const params = {
        source: this.province == "湖南省" ? "hunan" : this.province,
        startDate: startDate,
        endDate: endDate
      };
      siteNoticeNum(params).then(res => {
        if (res.code == "1") {
          const { list, sumTotal } = res.data;
          this.total = sumTotal;
          if (list.length !== 0) {
            this.showEcharts = true;
            for (let i of list) {
              this.yAxisData.push(i.name);
              this.seriesData.push(i.siteCount);
              var option = {
                color: ["#3398DB"],
                grid: {
                  left: "3%",
                  right: "4%",
                  bottom: "3%",
                  containLabel: true
                },
                xAxis: {
                  type: "value"
                },
                yAxis: {
                  type: "category",
                  data: this.yAxisData
                },
                series: [
                  {
                    data: this.seriesData,
                    type: "bar",
                    label: {
                      normal: {
                        show: true,
                        position: "right",
                        color: "#000000"
                      }
                    },
                    barWidth: "80%"
                  }
                ]
              };
              let chartBox = document.getElementsByClassName('charts')[0];
              var myChart = echarts.init(document.getElementById("myChart"));
              this.resizeCharts(chartBox);
              // 使用刚指定的配置项和数据显示图表。
              myChart.setOption(option);
            }
          } else {
            this.showEcharts = false;
          }
        }
      });
    },
    changetable() {
      this.getTableNum();
    },
    clearDate() {
      console.info(1111);
    }
  },
  created() {
    this.noticeTotal();
    this.getArea();
    this.getTableNum();
  },
  components: {}
};
</script>
<style lang="less" scoped>
@import "../style/mixin";
</style>