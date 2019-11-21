<template>
  <div class="activeUser">
    <div class="public_top bg-fff mb20">
      <div class="fs16 color-150 top_title pl30 fw600">总体概况</div>
      <div class="top_num drc">
        <el-row type="flex">
          <el-col :span="12">
            <div class="dfrca w33_right">
              <div class="drc">
                <div class="top_img mr20">
                  <img src="../../assets/img/icon18.png" alt />
                </div>
                <div>
                  <div class="fs18 color-150 fw600">{{ yesterdayActive }}</div>
                  <div class="fs14 color-999">昨日活跃</div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="dfrca">
              <div class="dfcc">
                <div class="top_img mr20">
                  <img src="../../assets/img/icon5.png" alt />
                </div>
                <div>
                  <div class="fs18 color-150 fw600">{{ todayActive }}</div>
                  <div class="fs14 color-999">今日活跃</div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="bg-fff pl30 pr30 pt20 pb20 middle_select">
      <el-row type="flex" class="row-bg fs16 color-150 fw600" justify="space-between" :span="24">
        <el-col :span="6">
          用户类别：
          <el-select v-model="value" style="width: 60%" @change="changetable">
            <el-option
              v-for="item in userType"
              :key="item.values"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="12" class="fs16 color-150 fw600 cp">
          活跃日期:
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
      <div class="mt20">
        <el-row>
          <el-col :span="24">
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
            <button type="primary" class="fl-left cp" @click="searchData">搜索</button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="bg-fff pl30 pr30 pt30 pb30">
      <el-row>
        <el-col class="fs14 color-000" :span="24">
          <el-table class="public_table" border :data="tableData" :header-cell-style="headClass">
          <el-table-column label="手机" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.phoneNo }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.loginName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="登录天数" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.loginCount }}</span>
            </template>
          </el-table-column>
          <el-table-column label="注册时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.created }}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户类别" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.userType }}</span>
            </template>
          </el-table-column>
          <el-table-column label="会员到期日" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.expiredDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <span class="look_info cp" @click="openMask(scope.$index, scope.row)">查看详情</span>
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
    <div class="main">
      <jlPopup
        :showMask="true"
        v-model="sendVal"
        :personList="personList"
        :activeUser="activeUser"
        @refesh="handleRefesh"
        :isAllows="isAllows"
      ></jlPopup>
    </div>
  </div>
</template>
<script>
import { activeUnum, activeUlist } from "@/api/index";
import { debug } from "util";
export default {
  data() {
    return {
      userType: [
        {
          label: "全部",
          values: "0"
        },
        {
          label: "注册",
          values: "1"
        },
        {
          label: "付费",
          values: "2"
        },
        {
          label: "过期",
          values: "3"
        },
        {
          label: "续费",
          values: "4"
        }
      ],
      value: "全部",
      todayActive: "", //今日活跃数
      yesterdayActive: "", //昨日活跃数
      newtime: [
        new Date(
          new Date().getFullYear(),
          new Date().getMonth() - 1,
          new Date().getDate()
        ),
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        )
      ],
      firm: "",
      pagesize: 15, // 当前页面条数
      pagenum: 1, //当前页面数
      tableData: [], //表格数据
      total: null,
      rules: "",
      addForm: "",
      sendVal: "",
      personList: null, //个人用户信息
      activeUser: "activeUser", //是否从activeUser页面
      isAllows: null
    };
  },
  methods: {
    activeNum() {
      activeUnum({}).then(res => {
        if (res.code == "1") {
          const { todayActive, yesterdayActive } = res.data;
          this.todayActive = todayActive;
          this.yesterdayActive = yesterdayActive;
        } else {
          console.info("活跃用户统计接口不通");
        }
      });
    },
    activeList() {
      const params = {
        currentPage: this.pagenum,
        pageSize: this.pagesize,
        phoneNo: this.firm,
        userType: this.value == "全部" ? null : this.value,
        startDate: this.newtime ? this.newtime[0] : "",
        endDate: this.newtime ? this.newtime[1] : ""
      };
      activeUlist(params).then(res => {
        if (res.code == "1") {
          const { total, data } = res;
          this.total = total;
          //截取年月日；
          if (data.length) {
            for (let i of data) {
              i.created = i.created.slice(0, 10);
            }
          }
          this.tableData = data;
        } else {
          console.info("活跃用户列表接口不通");
        }
      });
    },
    clear() {
      if (this.firm == "") {
        this.activeList();
      }
    },
    handleCurrentChange(val) {
      // 当前页改变的函数
      this.pagenum = val;
      this.activeList();
    },
    handleSizeChange(val) {
      // 每页条数发生改变时做出的函数
      this.pagesize = val;
      this.activeList();
    },
    changetable() {
      this.pagenum = 1;
      setTimeout(() => {
        return this.activeList();
      }, 100);
    },
    searchData() {
      this.pagenum = 1;
      this.activeList();
    },
    handleEdit() {
      this.addDialogFormVisible = true;
    },
    openMask(index, row) {
      this.sendVal = true;
      this.personList = row;
    },
    handleRefesh(showMask) {
      if (showMask) {
        setTimeout(() => {
          return this.activeList();
        }, 100);
      }
    },
    headClass() {
      return "text-align: center;background:#DDDFE4;color: #000000";
    }
  },
  created() {
    this.activeNum();
    this.activeList();
    this.isAllows = this.$route.query.isAllows;
  }
};
</script>
<style lang="less" scoped>
@import "../../style/mixin";
.activeUser {
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
  .middle_select {
    border-bottom: 1px solid #DDDFE4;
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
  .fl-left {
    margin-left: 25px;
    width:64px;
    height:48px;
    background-color: @mainColor;
    color: @whiteColor;
  }
  .look_info {
    color: @fontColor;
    border-bottom: 1px solid @fontColor;
  }
  .block {
    padding: 0 50px;
    margin-top: 30px;
  }
}
</style>