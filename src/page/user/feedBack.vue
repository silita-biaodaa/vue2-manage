<template>
  <div class="feedback">
    <div class="public_top bg-fff mb20">
      <div class="fs16 color-150 top_title pl30 fw600">总体概况</div>
      <div class="top_num drc">
        <el-row type="flex">
          <el-col :span="16">
            <div class="dfrca w33_right">
              <div class="drc">
                <div class="top_img mr20">
                  <img src="../../assets/img/icon15.png" alt />
                </div>
                <div>
                  <div class="fs18 color-150 fw600">{{ yesterdayCount }}</div>
                  <div class="fs14 color-999">昨日反馈</div>
                </div>
              </div>
              <div class="drc">
                <div class="top_img mr20">
                  <img src="../../assets/img/icon2.png" alt />
                </div>
                <div>
                  <div class="fs18 color-150 fw600">{{ totalCount }}</div>
                  <div class="fs14 color-999">总反馈</div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="dfrca">
              <div class="dfcc">
                <div class="top_img mr20">
                  <img src="../../assets/img/icon10.png" alt />
                </div>
                <div>
                  <div class="fs18 color-150 fw600">{{ untreatedCount }}</div>
                  <div class="fs14 color-999">未处理</div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="bg-fff pl30 pr30 pt20 pb20 middle_select">
      <el-row :span="24" class="mt30 mb30">
        <el-col :span="5" class="fs16 color-150 fw600 cp">
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
        <el-col :span="5" class="fs16 color-150 fw600 cp">
          意见类别：
          <el-select v-model="idea" style="width: 60%" @change="changetable">
            <el-option
              v-for="item in ideaType"
              :key="item.values"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="fs16 color-150 fw600 cp">
          状态：
          <el-select v-model="statu" style="width: 60%" @change="changetable">
            <el-option
              v-for="item in status"
              :key="item.values"
              :label="item.label"
              :value="item.values"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="9" class="fs16 color-150 fw600 cp">
          反馈日期:
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
          <button type="primary" class="ml10 search" @click="searchData">搜索</button>
        </el-col>
      </el-row>
    </div>
    <div class="bg-fff pl30 pr30 pt30 pb30">
      <el-row>
        <el-col class="fs14 color-000" :span="24">
          <el-table border :data="tableData" :header-cell-style="headClass">
            <el-table-column label="手机" align="center">
            <template slot-scope="scope">
              <span
                style="color: #244CD7;border-bottom: 1px solid #244CD7;"
                class="cp"
                @click="openMask(scope.$index, scope.row)"
              >{{ scope.row.phoneNo }}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户类别" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.userType }}</span>
            </template>
          </el-table-column>
          <el-table-column label="意见类别" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column label="反馈内容" align="center">
            <template slot-scope="scope">
              <div class="text-l">
                <span>{{ scope.row.problem }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="反馈时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.startTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center">
            <template slot-scope="scope">
              <el-input
                class="feedback_input"
                v-model="scope.row.remark"
                type="textarea"
                @change="keepRemark(scope.$index, scope.row)"
                :disabled="isAllows ? false:true"
              >{{scope.row.remark?scope.row.remark : ""}}</el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <span
                class="feedBack_state"
                @click="changeState(scope.$index, scope.row)"
                v-show="isAllows"
              >{{ scope.row.state == "1" ? "未处理" : "已处理" }}</span>
            </template>
          </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div class="mt30">
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
import { feedCount, feedList, upRemark, operateState } from "@/api/index";
export default {
  data() {
    return {
      value: "全部",
      idea: "全部",
      statu: "",
      yesterdayCount: "", //昨日反馈
      untreatedCount: "", //总反馈
      totalCount: "", //未处理
      newtime: "", //活跃日期
      tableData: [], //意见反馈列表数据
      pagesize: 15, // 当前页面条数
      pagenum: 1, //当前页面数
      firm: "",
      personList: null,
      sendVal: "",
      hideMask: "hideMask", //是否从意见反馈页面点击查看详情;
      userType: [
        {
          values: "",
          label: "全部"
        },
        {
          values: "0",
          label: "注册"
        },
        {
          values: "1",
          label: "付费"
        },
        {
          values: "2",
          label: "续费"
        },
        {
          values: "3",
          label: "过期"
        }
      ],
      ideaType: [
        {
          values: "",
          label: "全部"
        },
        {
          values: "0",
          label: "产品建议"
        },
        {
          values: "1",
          label: "程序错误"
        },
        {
          values: "2",
          label: "吐槽"
        }
      ],
      status: [
        {
          values: "",
          label: "全部"
        },
        {
          values: "2",
          label: "已处理"
        },
        {
          values: "1",
          label: "未处理"
        }
      ],
      total: null,
      isAllows: null
    };
  },
  methods: {
    feedNumber() {
      feedCount().then(res => {
        if (res.code == "1") {
          const { yesterdayCount, untreatedCount, totalCount } = res.data;
          this.yesterdayCount = yesterdayCount;
          this.untreatedCount = untreatedCount;
          this.totalCount = totalCount;
        } else {
          console.info("意见反馈统计接口不通");
        }
      });
    },
    feedBackList() {
      const params = {
        currentPage: this.pagenum,
        pageSize: this.pagesize,
        userType: this.value == "全部" ? "" : this.value,
        phoneNo: this.firm,
        state: this.statu == "全部" ? "" : this.statu,
        startDate: this.newtime ? this.newtime[0] : "",
        endDate: this.newtime ? this.newtime[1] : "",
        type: this.idea == "全部" ? "" : this.idea
      };
      feedList(params).then(res => {
        if (res.code == "1") {
          this.tableData = res.data;
          this.total = res.total;
        } else {
          console.info("意见反馈列表不通");
        }
      });
    },
    handleCurrentChange(val) {
      // 当前页改变的函数
      this.pagenum = val;
      this.feedBackList();
    },
    handleSizeChange(val) {
      // 每页条数发生改变时做出的函数
      this.pagesize = val;
      this.feedBackList();
    },
    changetable() {
      console.info("this.idea", this.idea);
      this.pagenum = 1;
      setTimeout(() => {
        return this.feedBackList();
      }, 100);
    },
    clear() {
      if (this.firm == "") {
        this.feedBackList();
      }
    },
    searchData() {
      this.pagenum = 1;
      this.feedBackList();
    },
    handleRefesh(showMask) {
      if (showMask) {
        setTimeout(() => {
          return this.feedBackList();
        }, 100);
      }
    },
    //输入框失去焦点
    keepRemark(index, row) {
      upRemark({ id: row.id.toString(), remark: row.remark }).then(res => {
        if (res.code == "1") {
          this.feedBackList();
        } else {
          console.info("添加备注接口不通");
        }
      });
    },
    openMask(index, row) {
      this.sendVal = true;
      this.personList = row;
    },
    changeState(index, row) {
      if (row.state == "2") {
        this.$confirm("您已处理过该信息", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {})
          .catch(() => {
            this.$message({
              type: "info",
              message: "您已选择取消"
            });
          });
      } else {
        this.$confirm(`确认本条信息已处理`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            operateState({ id: row.id, state: row.state == "1" ? 2 : "" }).then(
              res => {
                if (res.code == "1") {
                  this.$message({
                    type: "success",
                    message: "修改成功!"
                  });
                  this.feedBackList();
                } else {
                  console.info("修改意见接口不通");
                }
              }
            );
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: `您已取消`
            });
          });
      }
    },
    headClass() {
      return "text-align: center;background:#DDDFE4;color: #000000";
    }
  },
  created() {
    this.feedNumber();
    this.feedBackList();
    this.isAllows = this.$route.query.isAllows;
  }
};
</script>
<style lang="less" scoped>
@import "../../style/mixin";
.feedback {
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
    .el-col {
      color: red;
      font-weight: 700;
    }
  }
  .middle_select {
    border-bottom: 1px solid #dddfe4;
    .search {
      margin-left: 25px;
      width:64px;
      height:48px;
      background-color: @mainColor;
      color: @whiteColor;
    }
  }
  .feedBack_state {
    color: #FF4343;
    cursor: pointer;
  }
  .public_table {
    .el-textarea {
      overflow-y: hidden;
      textarea {
        resize: none;
      }
    }
  }
  .el-textarea::-webkit-scrollbar {
    display: none;
  }
}
</style>