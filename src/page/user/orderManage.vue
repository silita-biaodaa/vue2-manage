<template>
  <div class="orderManage">
    <div class="public_top bg-fff mb20">
      <div class="fs16 color-150 top_title pl30 fw600">总体概况</div>
      <div class="top_num drc">
        <el-row type="flex">
          <el-col :span="7">
            <div class="dfrca w33_right">
              <!-- 昨日订单 -->
              <div class="drc">
                <div class="top_img mr20">
                  <img src="../../assets/img/icon14.png" alt />
                </div>
                <div>
                  <div class="fs18 color-150 fw600">{{ userList.yesterdayOrder }}</div>
                  <div class="fs14 color-999">昨日订单</div>
                </div>
              </div>
              <!-- 今日订单 -->
              <div class="drc">
                <div class="top_img mr20">
                  <img src="../../assets/img/icon1.png" alt />
                </div>
                <div>
                  <div class="fs18 color-150 fw600">{{ userList.todayOrder }}</div>
                  <div class="fs14 color-999">今日订单</div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="7" class="w33_right">
            <div class="dfrca">
              <!-- 昨日已付 -->
              <div class="dfcc">
                <div class="top_img mr20">
                  <img src="../../assets/img/icon19.png" alt />
                </div>
                <div>
                  <div class="fs18 color-150 fw600">{{ userList.yesterdayPaid }}</div>
                  <div class="fs14 color-999">昨日已付</div>
                </div>
              </div>
              <!-- 今日已付 -->
              <div class="dfcc">
                <div class="top_img mr20">
                  <img src="../../assets/img/icon7.png" alt />
                </div>
                <div>
                  <div class="fs18 color-150 fw600">{{ userList.todayPaid }}</div>
                  <div class="fs14 color-999">今日已付</div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="7" class="w33_right">
            <div class="dfrca">
              <!-- 今日应收 -->
              <div class="dfcc">
                <div class="top_img mr20">
                  <img src="../../assets/img/icon8.png" alt />
                </div>
                <div>
                  <div class="fs18 color-150 fw600">{{ userList.todayReceivable }}</div>
                  <div class="fs14 color-999">今日应收</div>
                </div>
              </div>
              <!-- 今日实收 -->
              <div class="dfcc">
                <div class="top_img mr20">
                  <img src="../../assets/img/icon6.png" alt />
                </div>
                <div>
                  <div class="fs18 color-150 fw600">{{ userList.todayTrueMoney }}</div>
                  <div class="fs14 color-999">今日实收</div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="3">
            <!-- 总资金 -->
            <div class="dfcc">
              <div class="top_img mr20">
                <img src="../../assets/img/icon13.png" alt />
              </div>
              <div>
                <div class="fs18 color-150 fw600">{{ userList.totalMoney }}</div>
                <div class="fs14 color-999">总资金</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="bg-fff pt20 pb20 pl20 pr20 middle_select">
      <el-row class="bg-fff">
        <el-col :span="5" class="fs16 color150 fw600">
          订单类别：
          <el-select v-model="orderType" placeholder="请选择" style="width: 60%" @change="changetable">
            <el-option
              v-for="item in orderTypes"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="fs16 color150 fw600">
          渠道：
          <el-select v-model="channel" placeholder="请选择" style="width: 60%" @change="changetable">
            <el-option
              v-for="item in channels"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="fs16 color150 fw600">
          付款状态：
          <el-select v-model="state" placeholder="请选择" style="width: 60%" @change="changetable">
            <el-option
              v-for="item in states"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="8" class="fs16 color150 fw600">
          订单时间:
          <el-date-picker
            v-model="newtime"
            type="daterange"
            style="width:80%"
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
      <el-row>
        <el-col :span="24" class="fl-right mt30 mb20">
          <el-input
            placeholder="请输入手机号码"
            clearable
            v-model="firm"
            style="width:30%"
            v-on:input="clear"
            @change="searchData"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <button type="primary" class="fl-left cp fs16" @click="searchData">搜索</button>
        </el-col>
      </el-row>
    </div>
    <div class="bg-fff pl30 pr30 pt30 pb30">
      <el-row>
        <el-col class="fs14 color-000" :span="24">
          <el-table border :data="tableData" :header-cell-style="headClass">
            <el-table-column label="订单号" align="center" :resizable="false">
              <template slot-scope="scope">
                <span>{{ scope.row.orderNo }}</span>
              </template>
            </el-table-column>
            <el-table-column label="手机" align="center" :resizable="false">
              <template slot-scope="scope">
                <span
                  class="color-224 cp"
                  style="border-bottom: 1px solid #244CD7;"
                  @click="openMask(scope.$index, scope.row)"
                >{{ scope.row.phoneNo }}</span>
              </template>
            </el-table-column>
            <el-table-column label="金额" align="center" :resizable="false">
              <template slot-scope="scope">
                <span>{{ scope.row.money }}</span>
              </template>
            </el-table-column>
            <el-table-column label="实收" align="center" :resizable="false">
              <template slot-scope="scope">
                <span>{{ scope.row.truePay }}</span>
              </template>
            </el-table-column>
            <el-table-column label="订单类别" align="center" :resizable="false">
              <template slot-scope="scope">
                <span>{{ scope.row.orderType }}</span>
              </template>
            </el-table-column>
            <el-table-column label="渠道" align="center" :resizable="false">
              <template slot-scope="scope">
                <span>{{ scope.row.tradeType }}</span>
              </template>
            </el-table-column>
            <el-table-column label="付款状态" align="center" :resizable="false">
              <template slot-scope="scope">
                <span>{{ scope.row.payStatus }}</span>
              </template>
            </el-table-column>
            <el-table-column label="订单时间" align="center" :resizable="false">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[15, 30, 45, 60]"
          :page-size="15"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
    </div>
    <jlPopup
      :showMask="true"
      v-model="sendVal"
      :personList="personList"
      dangerText="Delete"
      :hideMask="hideMask"
      @refesh="handleRefesh"
    ></jlPopup>
  </div>
</template>
<script>
import { orderNum, orderManage } from "@/api/index";
import { timestampToTime } from "../../public";
export default {
  data() {
    return {
      userList: "",
      orderTypes: [ //订单类别;
        {
          label: "全部",
          value: ""
        },
        {
          label: "充值会员",
          value: "0"
        },
        {
          label: "综合查询",
          value: "1"
        },
        {
          label: "续费会员",
          value: "2"
        },
        {
          label: "重庆人员专查",
          value: "3"
        },
        {
          label: "重庆企业专查",
          value: "4"
        },
        {
          label: "住建专查",
          value: "5"
        },
        {
          label: "公路专查",
          value: "6"
        },
        {
          label: "水利专查",
          value: "7"
        },
      ],
      states: [ //付款状态
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "已付款"
        },
        {
          value: "1",
          label: "未付款"
        },
        {
          value: "2",
          label: "已退款"
        },
        {
          value: "3",
          label: "已失效"
        }
      ],
      channels: [//渠道
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "安卓"
        },
        {
          value: "1",
          label: "苹果"
        },
        {
          value: "2",
          label: "扫码"
        },
        {
          value: "3",
          label: "Wap"
        }
      ],
      value: "全部",
      newtime: "", //注册时间
      firm: "",
      total: null,
      state: "全部", //付款状态
      channel: "全部", //渠道
      orderType: "全部",
      pagesize: 15, // 当前页面条数
      pagenum: 1, //当前页面数
      tableData: [], //表格数据
      personList: null, //传给子组件的值;
      hideMask: "hideMask", 
      sendVal: ""
    };
  },
  methods: {
    //订单列表展示;
    orderList() {
      const params = {
        pageNo: this.pagenum,
        pageSize: this.pagesize,
        orderType: this.orderType == "全部" ? null : this.orderType,
        tradeType: this.channel == "全部" ? null : this.channel,
        payStatus: this.state == "全部" ? null : this.state,
        phoneNo: this.firm,
        orderStart: this.newtime ? this.newtime[0] : "",
        orderEnd: this.newtime ? this.newtime[1] : ""
      };
      orderManage(params).then(res => {
        if (res.code == "1") {
          const { data, total } = res;
          this.total = total;
          if (data.length) {
            for (let i of data) {
              // timestampToTime()筛选日期;
              i.createTime = timestampToTime(i.createTime);
              i.money = parseFloat(i.money).toFixed(2);
              i.truePay = parseFloat(i.truePay).toFixed(2);
            }
          }
          this.tableData = data;
        } else {
          console.info("订单列表接口不通");
        }
      });
    },
    //订单统计接口渲染;
    orderTotal() {
      orderNum({}).then(res => {
        if (res.code == "1") {
          const { data } = res;
          //保留两位小数点;
          data.totalMoney = data.totalMoney.toFixed(2);
          data.todayReceivable = data.todayReceivable.toFixed(2);
          data.todayTrueMoney = data.todayTrueMoney.toFixed(2);
          this.userList = data;
        } else {
          console.info("订单统计接口不通");
        }
      });
    },
    //切换刷新列表;
    changetable() {
      this.pagenum = 1;
      setTimeout(() => {
        return this.orderList();
      }, 100);
    },
    //清除输入框数据;
    clear() {
      if (this.firm == "") {
        this.orderList();
      }
    },
    searchData() {
      this.pagenum = 1;
      this.orderList();
    },
    handleCurrentChange(val) {
      // 当前页改变的函数
      this.pagenum = val;
      this.orderList();
    },
    handleSizeChange(val) {
      // 每页条数发生改变时做出的函数
      this.pagesize = val;
      this.orderList();
    },
    openMask(index, row) {
      this.sendVal = true;
      this.personList = row;
    },
    //关闭弹窗刷新列表;
    handleRefesh(showMask) {
      if (showMask) {
        setTimeout(() => {
          return this.orderList();
        }, 100);
      }
    },
    //表格头部样式;
    headClass() {
      return "text-align: center;background:#DDDFE4;color: #000000";
    }
  },
  created() {
    this.orderTotal();
    this.orderList();
  }
};
</script>
<style lang="less" scoped>
@import "../../style/mixin";
.orderManage {
  .public_top {
    height: 176px;
    .top_title {
      height: 62px;
      line-height: 62px;
      border-bottom: 1px solid @bgColor;
    }
    .top_num {
      height: 112px;
      .el-row--flex {
        width: 100%;
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
  .top_nav {
    height: 30px;
    line-height: 30px;
    margin-bottom: 20px;
    .el-col {
      color: red;
      font-weight: 700;
    }
  }
  .middle_select {
    border-bottom: 1px solid #dddfe4;
  }
  .fl-right {
    padding-right: 30px;
    .fl-left {
      margin-left: 20px;
      margin-right: 60px;
      width: 64px;
      height: 48px;
      background: @mainColor;
      color: @whiteColor;
    }
  }
  .table {
    padding: 0 20px;
  }
  .block {
    margin-top: 30px;
  }
}
</style>