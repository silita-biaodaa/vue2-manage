<template>
  <div class="first">
    <div class="public_top bg-fff mb20">
      <div class="fs16 color-150 top_title pl30 fw600">总体概括</div>
      <div class="dfrca top_num">
        <div class="dfcc w33 w33_right">
          <div class="top_img mr20">
            <img src="../assets/img/icon17.png" alt="">
          </div>
          <div>
            <div class="fs18 color-150 fw600">{{ yesterdayCounts }}</div>
            <div class="fs14 color-999">昨日新增公告</div>
          </div>
        </div>
        <div class="dfcc w33 w33_right">
          <div class="top_img mr20">
            <img src="../assets/img/icon4.png" alt="">
          </div>
          <div>
            <div class="fs18 color-150 fw600">{{ yesterdayCounts }}</div>
            <div class="fs14 color-999">昨日新增公告</div>
          </div>
        </div>
        <div class="dfcc w33 w33_right">
          <div class="top_img mr20">
            <img src="../assets/img/icon21.png" alt="">
          </div>
          <div>
            <div class="fs18 color-150 fw600">{{ yesterdayCounts }}</div>
            <div class="fs14 color-999">昨日新增公告</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-fff pt20 first_table pl30 pr30 pb20">
      <el-row :span="24" type="flex" class="row-bg" justify="space-around">
        <el-col :span="8" class="fs16 color-150 fw600">
          省份：
          <el-select v-model="province" placeholder="请选择" style="width:35%" @change="changetable">
            <el-option
              v-for="item in provinces"
              :key="item.areaCode"
              :label="item.areaName"
              :value="item.areaName"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="12" class="fs16 color-150 fw600">
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
        <el-col :span="4" class="fs14 color-150 text-r mr100">合计 :&nbsp;&nbsp;{{total?total:0}}条</el-col>
      </el-row>
    </div>
    <el-row v-loading="loading" style="height: 100%;" class="bg-fff pt30">
      <div class="charts" v-if="showEcharts">
        <div id="myChart" :style="{width:'100%',height: '100%'}"></div>
      </div>
    </el-row>
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
      mid: "1000px",
      province: "全国",
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
      total: "",
      loading: false,
      code: "",
      list: "",
      loading: true,
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
          var data = { areaName: "全国", areaCode: "" };
          this.provinces.unshift(data);
        } else {
          console.info("获取省份接口不通");
        }
      });
    },
    resizeCharts(chartBox) {
      myChart.style.width = chartBox.style.width + "px";
      myChart.style.height = chartBox.style.height + "px";
    },
    getTableNum() {
      this.yAxisData = [];
      this.seriesData = [];
      var startDate =
        this.newtime == null
          ? ""
          : timestampToTime(this.newtime[0]).slice(0, 10);
      var endDate =
        this.newtime == null
          ? ""
          : timestampToTime(this.newtime[1]).slice(0, 10);
      for (let i of this.provinces) {
        if (this.province == i.areaName) {
          this.code = i.areaCode;
        }
      }
      const params = {
        source: this.code,
        startDate: startDate,
        endDate: endDate
      };
      siteNoticeNum(params).then(res => {
        if (res.code == "1") {
          const { list, sumTotal } = res.data;
          this.total = sumTotal;
          this.list = list;
          if (list.length !== 0) {
            this.showEcharts = true;
            for (let i of list) {
              this.yAxisData.push(i.name);
              this.seriesData.push(i.siteCount);
              this.getCharts(this.yAxisData,this.seriesData);
            }
          } else {
            this.showEcharts = false;
          }
        }
      });
    },
    getCharts(yAxisData,seriesData) {
      var option = {
        color: ["#3398DB"],
        grid: {
          left: "3%",
          bottom: '4%',
          height: '96%',
          containLabel: true
        },
        xAxis: {
          type: "value",
          axisLabel: {
            textStyle:{
              fontSize:14,
              fontWeight: 700
            }
          }
        },
        yAxis: {
          type: "category",
          data: yAxisData,
          triggerEvent: true,
          axisLabel: {
            interval: 0,
            textStyle:{
              fontSize:14,
              fontWeight: 700
            }
          },
        },
        series: [
          {
            data: seriesData,
            type: "bar",
            barWidth: '20px',
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#000000",
                fontSize:14
              }
            }
          }
        ]
      };
      var chartBox = document.getElementsByClassName("charts")[0];
      var myChart = echarts.init(document.getElementById("myChart"));
      myChart.setOption(option);
      this.autoHeight = yAxisData.length * 35 + 50;
      myChart.getDom().style.height = `${this.autoHeight}px`;
      myChart.getDom().childNodes[0].style.height = `${this.autoHeight}px`;
      myChart
        .getDom()
        .childNodes[0].childNodes[0].setAttribute(
          "height",
          `${this.autoHeight}`
        );
        this.loading = false;
      myChart.getDom().childNodes[0].childNodes[0].style.height = `${this.autoHeight}px`;
      //改变大小后重新加载图表;
      myChart.resize();
      var categoryList = this.list;
      myChart.on('click',function(param){
        for(let i of categoryList) {
          if(param.value == i.name) {
            window.open(i.url);
          }
        }
      });
    },
    changetable() {
      this.getTableNum();
    },
    clearDate() {}
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
.first {
  width: 100%;
  height: 100%;
  .public_top {
    height: 176px;
    .top_title {
      height: 62px;
      line-height: 62px;
      border-bottom: 1px solid @bgColor;
    }
    .top_num {
      height: 112px;
      .w33 {
        width: 33.33%;
        height: 58px;
      }
      .w33_right {
        border-right: 1px solid @bgColor;
      }
      .top_img {
        width: 42px;
        height: 42px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .first_table {
    border-bottom: 1px solid @bgColor;
    height: 88px;
    line-height: 88px;
  }
  .charts {
    max-height: 800px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .charts::-webkit-scrollbar {
    display: none;
  }
}
</style>