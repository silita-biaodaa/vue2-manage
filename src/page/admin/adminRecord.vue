<template>
  <div class="adminRecord bg-fff">
    <div class="mb30 adminRecord_top pl30 pr30">
      <el-row type="flex" class="row-bg" justify="space-between" :span="24">
        <el-col :span="4" class="fs16 color-150 fw600">
          操作：
          <el-select v-model="value" style="width: 60%" @change="changetable">
            <el-option
              v-for="item in operate"
              :key="item.values"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="20" class="fl-right">
          <el-input
            placeholder="请输入姓名"
            clearable
            v-model="firm"
            style="width:30%"
            v-on:input="clear"
            @change="searchData"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <button type="primary" class="fl-left color-fff fs16" @click="searchData">查询</button>
        </el-col>
      </el-row>
    </div>
    <div class="bg-fff pb20 pl30 pr30">
      <el-row>
        <el-col :span="24">
          <el-table border :data="tableData" :header-cell-style="headClass">
            <el-table-column label="序号" align="center" type="index"></el-table-column>
            <el-table-column label="操作时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.optTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.realName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="部门" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.department }}</span>
              </template>
            </el-table-column>
            <el-table-column label="岗位" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.post }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.optType }}</span>
              </template>
            </el-table-column>
            <el-table-column label="详情" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.optDesc }}</span>
              </template>
            </el-table-column>
            <el-table-column label="用户" align="center">
              <template slot-scope="scope">
                <div
                  class="color-224 user_info dfcc"
                  @click="openMask(scope.$index, scope.row)"
                ><img src="../../assets/img/user_img.png" alt="" :class="{'hide':scope.row.operand == ''}"><span class="ml10">{{ scope.row.operand }}</span></div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div class="block pl50 mt30">
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
import { operate } from "@/api/index";
import { timestampToTime } from "../../public";
export default {
  data() {
    return {
      tableData: [],
      pagesize: 15, // 当前页面条数
      pagenum: 1, //当前页面数
      total: null,
      value: "全部",
      personList: null,
      sendVal: "",
      hideMask: "hideMask",
      firm: "",
      operate: [
        {
          label: "全部",
          values: "0"
        },
        {
          label: "赠送会员",
          values: "1"
        },
        {
          label: "用户账号",
          values: "2"
        },
        {
          label: "用户信息",
          values: "3"
        },
        {
          label: "意见反馈",
          values: "4"
        }
      ]
    };
  },
  methods: {
    operateList() {
      operate({
        currentPage: this.pagenum,
        pageSize: this.pagesize,
        optType: this.value == "全部" ? null : this.value,
        realName: this.firm
      }).then(res => {
        if (res.code == "1") {
          const { total, list } = res.data;
          if (list.length > 0) {
            for (let i of list) {
              i.optTime = timestampToTime(i.optTime);
            }
          }
          this.tableData = list;
          this.total = total;
        } else {
          console.info("操作日志接口不通");
        }
      });
    },
    handleCurrentChange(val) {
      // 当前页改变的函数
      this.pagenum = val;
      this.operateList();
    },
    handleSizeChange(val) {
      // 每页条数发生改变时做出的函数
      this.pagesize = val;
      this.operateList();
    },
    openMask(index, row) {
      this.sendVal = true;
      this.personList = row;
    },
    searchData() {
      this.pagenum = 1;
      this.operateList();
    },
    changetable() {
      this.pagenum = 1;
      setTimeout(() => {
        return this.operateList();
      }, 100);
    },
    handleRefesh(showMask) {
      if (showMask) {
        setTimeout(() => {
          return this.operateList();
        }, 100);
      }
    },
    clear() {
      if (this.firm == "") {
        this.operateList();
      }
    },
    headClass() {
      return "text-align: center;background:#DDDFE4;color: #000000;";
    }
  },
  created() {
    this.operateList();
  }
};
</script>
<style lang="less" scoped>
@import "../../style/mixin";
.adminRecord {
  height: 100%;
  width: 100%;
  .adminRecord_top {
    height: 88px;
    line-height: 88px;
    border-bottom: 1px solid #DDDFE4;
    .fl-left {
      height: 48px;
      width: 64px;
      background-color: @mainColor;
      margin-left: 35px;
    }
  }
  .fl-right {
    text-align: right;
    .el-button {
      margin-left: 10px;
    }
  }
  .user_info {
    cursor: pointer;
    span {
      border-bottom: 1px solid @fontColor;
    }
  }
}
</style>