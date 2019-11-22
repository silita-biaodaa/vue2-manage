<template>
  <div class="userInfo">
    <div class="public_top bg-fff mb20">
      <div class="fs16 color-150 top_title pl30 fw600">总体概况</div>
      <div class="top_num drc">
        <el-row type="flex">
          <el-col :span="10">
            <div class="dfrca w33_right">
              <div class="drc">
                <div class="top_img mr20">
                  <img src="../../assets/img/icon20.png" alt />
                </div>
                <div>
                  <div class="fs18 color-150 fw600">{{ yesterdayCount }}</div>
                  <div class="fs14 color-999">昨日注册</div>
                </div>
              </div>
              <div class="drc">
                <div class="top_img mr20">
                  <img src="../../assets/img/icon9.png" alt />
                </div>
                <div>
                  <div class="fs18 color-150 fw600">{{ todayCount }}</div>
                  <div class="fs14 color-999">今日注册</div>
                </div>
              </div>
              <div class="drc">
                <div class="top_img mr20">
                  <img src="../../assets/img/icon12.png" alt />
                </div>
                <div>
                  <div class="fs18 color-150 fw600">{{ userTotal }}</div>
                  <div class="fs14 color-999">总注册用户</div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="10" class="w33_right">
            <div class="dfrca">
              <div class="dfcc">
                <div class="top_img mr20">
                  <img src="../../assets/img/icon16.png" alt />
                </div>
                <div>
                  <div class="fs18 color-150 fw600">{{ yesterdayPay }}</div>
                  <div class="fs14 color-999">昨日付费</div>
                </div>
              </div>
              <div class="dfcc">
                <div class="top_img mr20">
                  <img src="../../assets/img/icon3.png" alt />
                </div>
                <div>
                  <div class="fs18 color-150 fw600">{{ todayPay }}</div>
                  <div class="fs14 color-999">今日付费</div>
                </div>
              </div>
              <div class="dfcc">
                <div class="top_img mr20">
                  <img src="../../assets/img/icon11.png" alt />
                </div>
                <div>
                  <div class="fs18 color-150 fw600">{{ totalPayUser }}</div>
                  <div class="fs14 color-999">总付费用户</div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="dfcc">
              <div class="top_img mr20">
                <img src="../../assets/img/icon22.png" alt />
              </div>
              <div>
                <div class="fs18 color-150 fw600">{{ pastUser }}</div>
                <div class="fs14 color-999">过期用户</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="bg-fff pb30">
      <div class="pt20 pb20 pl20 pr20 userInfo_top">
        <el-row class="bg-fff mb20">
          <el-col :span="6" class="fs16 color150 fw600">
            用户类别：
            <el-select v-model="value" placeholder="请选择" style="width: 55%" @change="changetable">
              <el-option
                v-for="item in userType"
                :key="item.values"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="9" class="fs16 color150 fw600">
            注册时间:
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
          <el-col :span="9" class="fs16 color150 fw600">
            会员到期日:
            <el-date-picker
              v-model="memberTime"
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
          <el-col :span="24" class="fl-right">
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
            <button @click="searchData" class="fl-left cp">搜索</button>
          </el-col>
        </el-row>
      </div>
      <el-row class="public_table_list mt20 fs14">
        <el-col :span="24">
          <el-table class="public_table" :data="tableData" border :header-cell-style="headClass">
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
            <el-table-column label="所在公司" align="center">
              <template slot-scope="scope">
                <div class="text-l">
                  <span>{{ scope.row.inCompany }}</span>
                </div>
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
                <span class="look_info" @click="openMask(scope.$index, scope.row)">查看详情</span>
                <span
                  class="clock_info"
                  @click="userLock(scope.$index, scope.row)"
                  v-show="isAllows"
                >{{scope.row.locks == '未锁定'? "锁定" : "解锁"}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div class="main">
        <jlPopup
          :showMask="true"
          v-model="sendVal"
          :personList="personList"
          dangerText="Delete"
          @refesh="handleRefesh"
          :isAllows="isAllows"
        ></jlPopup>
      </div>
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
  </div>
</template>
<script>
import { userNum, userList, updateLock } from "@/api/index";
export default {
  data() {
    return {
      userList: [
        {
          yesNum: 100,
          value: ""
        }
      ],
      userType: [
        {
          label: "全部",
          values: "1"
        },
        {
          label: "注册",
          values: "2"
        },
        {
          label: "付费",
          values: "3"
        },
        {
          label: "续费",
          values: "4"
        },
        {
          label: "过期",
          values: "5"
        }
      ],
      value: "全部",
      newtime: "",
      memberTime: "",
      firm: "",
      todayCount: "", //今日注册
      yesterdayCount: "", //昨日注册
      totalPayUser: "", //总付费
      todayPay: "", //今日付费
      yesterdayPay: "", //昨日付费
      pastUser: "", //过期用户
      total: null, //总数
      pagesize: 15, // 当前页面条数
      pagenum: 1, //当前页面数
      tableData: [],
      sendVal: false,
      personList: null, //个人用户信息,
      userTotal: "",
      isAllows: null
    };
  },
  methods: {
    userInfo() {
      userNum({}).then(res => {
        if (res.code == "1") {
          const {
            todayCount,
            yesterdayCount,
            totalPayUser,
            todayPay,
            yesterdayPay,
            pastUser,
            total
          } = res.data;
          this.todayCount = todayCount;
          this.yesterdayCount = yesterdayCount;
          this.totalPayUser = totalPayUser;
          this.todayPay = todayPay;
          this.yesterdayPay = yesterdayPay;
          this.pastUser = pastUser;
          this.userTotal = total;
        } else {
          console.info("用户统计接口不通");
        }
      });
    },
    userInfoList() {
      const params = {
        currentPage: this.pagenum,
        pageSize: this.pagesize,
        startDate: this.memberTime ? this.memberTime[0] : "",
        endDate: this.memberTime ? this.memberTime[1] : "",
        createStartDate: this.newtime ? this.newtime[0] : "",
        createdEndData: this.newtime ? this.newtime[1] : "",
        userType: this.value == "全部" ? null : this.value,
        phoneNo: this.firm
      };
      userList(params).then(res => {
        if (res.code == "1") {
          const { total, data } = res;
          this.total = total;
          //截取年月日;
          for (let i of data) {
            i.created = i.created.slice(0, 10);
          }
          this.tableData = data;
        } else {
          console.info("用户列表接口不通");
        }
      });
    },
    clear() {
      if (this.firm == "") {
        this.userInfoList();
      }
    },
    handleCurrentChange(val) {
      // 当前页改变的函数
      this.pagenum = val;
      this.userInfoList();
    },
    handleSizeChange(val) {
      // 每页条数发生改变时做出的函数
      this.pagesize = val;
      this.userInfoList();
    },
    changetable() {
      this.pagenum = 1;
      setTimeout(() => {
        return this.userInfoList();
      }, 100);
    },
    searchData() {
      this.pagenum = 1;
      this.userInfoList();
    },
    openMask(index, row) {
      this.sendVal = true;
      this.personList = row;
    },
    handleRefesh(showMask) {
      if (showMask) {
        setTimeout(() => {
          return this.userInfoList();
        }, 100);
      }
    },
    userLock(index, row) {
      this.$confirm(
        `此操作将${row.locks == "未锁定" ? "锁定" : "解锁"}此用户, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          const params = {
            pkid: row.pkid,
            lock: row.locks == "未锁定" ? 0 : 1
          };
          updateLock(params).then(res => {
            if (res.code == "1") {
              this.$message({
                type: "success",
                message: `${row.locks == "未锁定" ? "锁定" : "解锁"}成功!`
              });
              this.userInfoList();
            } else {
              console.info("管理员锁定用户接口不通");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消${row.locks == "未锁定" ? "锁定" : "解锁"}`
          });
        });
    },
    headClass() {
      return 'text-align: center;background:#DDDFE4;color: #000000'
    }
  },
  created() {
    this.userInfo();
    this.userInfoList();
    this.isAllows = this.$route.query.isAllows;
  }
};
</script>
<style lang="less" scoped>
@import "../../style/mixin";
.userInfo {
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
  .userInfo_top {
    border-bottom: 1px solid @bgColor;
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
  .fl-right {
    // padding-right: 30px;
    .fl-left {
      margin-left: 20px;
      margin-right: 60px;
      height: 48px;
      width: 64px;
      color: @whiteColor;
      background-color: @mainColor;
    }
  }
  .look_info {
    color: @fontColor;
    cursor: pointer;
    border-bottom: 1px solid @fontColor;
  }
  .clock_info {
    color: #FF4343;
    cursor: pointer;
    margin-left: 5px;
    border-bottom: 1px solid #FF4343;
  }
  .block {
    padding: 0 50px;
    margin-top: 30px;
  }
}
</style>