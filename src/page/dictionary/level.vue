<template>
  <div class="level bg-fff">
    <div class="left_list pr20 pl20">
      <el-row class="table_list mt20">
        <el-col>
          <el-table class="table cp" :data="tableData" ref="multiple" @row-click="openDetails" :header-cell-style="headClass">
            <el-table-column label="等级名称" align="center" :resizable="false">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="类型" align="center" :resizable="false">
              <template slot-scope="scope">
                <span>{{ scope.row.typology == "1" ? "一类":"二类" }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div class="mt20">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[15, 30, 45, 60]"
          :page-size="15"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @change="searchData"
        ></el-pagination>
      </div>
    </div>
    <div class="right_list pl20 pr20">
      <div class="fs14 fw600 color-000 mt20">等级：{{aliasName}}</div>
      <!-- <div class="level_alias ft14 text-c mb20 cp color-fff">等级别名</div> -->
      <ul class="right_top mb20">
        <li class="text-c cp fw600">等级别名</li>
      </ul>
      <el-row>
        <el-col>
          <div class="dfr mb20">
            <div class="dfrcb mb20">
              <!-- <span class="ft14">资质别名：</span> -->
              <el-input v-model="firm" placeholder="请输入关键字搜索" clearable @change="searchData" v-on:input="clear">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <button type="primary" class="search ml30 fw600 fs16 cp" @click="searchData">搜索</button>
              <!-- <el-button type="primary" @click="deleteAlias" v-show="isAllows">删除</el-button> -->
              <!-- <span class="ft14 color-409 cp ml10" @click="addAlias" v-show="isAllows">添加别名</span> -->
            </div>
            <div class="dfrcb mb20">
              <div class="dfcc add_left color-fff cp" @click="addAlias" v-show="isAllows">
                <img src="../../assets/img/add_icon.png" alt />
                <div class="ml10 fs16 fw600">添加别名</div>
              </div>
              <div class="dfcc delete_right color-fff cp" @click="deleteAlias" v-show="isAllows">
                <img src="../../assets/img/delete_icon.png" alt />
                <div class="ml10 fs16 fw600">删除</div>
              </div>
            </div>
          </div>
          <div class="select_right">
            <div class="mb20 pl20 drc select_des">
            <div class="drc">
              <el-radio v-model="radio" label="createTime" @change="checkRadio">按时间排序</el-radio>
              <div class="dcr cp ml10">
                <i
                  class="el-icon-caret-top ft14 color-666"
                  @click="checkTime"
                  v-bind:class="{ 'color-224': isActive, active: hasCheck }"
                ></i>
                <i
                  class="el-icon-caret-bottom ft14 color-666"
                  @click="checkTime"
                  v-bind:class="{ 'color-224': !isActive, active: hasCheck }"
                ></i>
              </div>
            </div>
            <div class="drc ml30">
              <el-radio v-model="radio" label="code" @change="checkRadio">按拼音排序</el-radio>
              <div class="dcr cp ml10">
                <i
                  class="el-icon-caret-top ft14 color-666"
                  @click="checkCombine"
                  v-bind:class="{ 'color-224': isCombine, active: checked }"
                ></i>
                <i
                  class="el-icon-caret-bottom ft14 color-666"
                  @click="checkCombine"
                  v-bind:class="{ 'color-224': !isCombine, active: checked }"
                ></i>
              </div>
            </div>
          </div>
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="pl20">全选</el-checkbox>
          <div style="margin: 10px 0;"></div>
          <el-checkbox-group v-model="checkedAlias" @change="handleCheckedChange" class="dcr pl20">
            <el-checkbox v-for="(item,i) in tableDataAlias" :label="item" :key="i" class="mb10">{{item}}</el-checkbox>
          </el-checkbox-group>
          </div>
        </el-col>
      </el-row>
    </div>
    <addAlias :showMask="true" v-model="sendVal" :code="code" @refesh="handleRefesh"></addAlias>
  </div>
</template>
<script>
import { levelListData, levelAlias, deleteLevelAlias } from "@/api/index";
export default {
  data() {
    return {
      tableData: [], //等级列表
      tableDataAlias: [],
      pagesize: 15, // 当前页面条数
      pagenum: 1, //当前页面数
      total: null, //条数
      sendVal: "",
      aliasName: "",
      code: "",
      firm: "",
      multipleAlias: [],
      isAllows: null,
      radio: "createTime",
      isActive: false,
      hasCheck: false,
      isCombine: false,
      checked: true,
      checkAll: false,
      checkedAlias: [],
      isIndeterminate: false,
      aliasTableList: [], //当前对应的资质的资质名称;
    };
  },
  methods: {
    getLevelList() {
      levelListData({
        currentPage: this.pagenum,
        pageSize: this.pagesize
      }).then(res => {
        if (res.code == "1") {
          const { list, total } = res.data;
          this.tableData = list;
          this.total = total;
          if (list !== undefined) {
            if (list.length > 0) {
              var tr = document.getElementsByTagName("tr");
              for (let i = 0; i < tr.length; i++) {
                tr[i].style.backgroundColor = "#fff";
                setTimeout(() => {
                  return tr[1].style.backgroundColor = "#F3F5F9";
                }, 100);
              }
              this.aliasName = list[0].name;
              this.code = list[0].code;
              this.getLevelAlias(list[0].code);
            } else {
              this.aliasName = "";
            }
          }
        } else {
          console.info("资质等级维护列表接口不通");
        }
      });
    },
    getLevelAlias(code) {
      const params = {
        currentPage: 1,
        pageSize: 9999,
        code: code,
        name: this.firm,
        rank: this.radio,
        sort: this.radio == 'createTime'? (this.isActive ? 'asc' : 'desc'): (this.isCombine ? 'asc' : 'desc')
      };
      levelAlias(params).then(res => {
        if (res.code == "1") {
          const { list } = res.data;
          this.aliasTableList = list;
          this.tableDataAlias = [];
          for(let item of list) {
            this.tableDataAlias.push(item.name);
          }
        } else {
          console.info("资质等级别名接口不通");
        }
      });
    },
    //点击等级名称展示别名;
    openDetails(row, column) {
      this.firm = "";
      this.getLevelAlias(row.code);
      this.code = row.code;
      //首先清除tr背景颜色;
      var tr = document.getElementsByTagName("tr");
      for (let i = 0; i < tr.length - 1; i++) {
        tr[i].style.backgroundColor = "#fff";
      }
      // 点击选中重新赋值;
      this.aliasName = row.name;
      event.currentTarget.style.backgroundColor = "#F3F5F9";
    },
    searchData() {
      this.getLevelAlias(this.code);
    },
    clear() {
      if (this.firm == "") {
        this.getLevelAlias(this.code);
      }
    },
    handleCurrentChange(val) {
      // 当前页改变的函数
      this.pagenum = val;
      this.getLevelList();
    },
    handleSizeChange(val) {
      // 每页条数发生改变时做出的函数
      this.pagesize = val;
      this.getLevelList();
    },
    addAlias() {
      this.sendVal = true;
    },
    deleteAlias() {
      var ids = "";
      if (this.multipleAlias) {
        for(let i of this.multipleAlias) {
          for(let j of this.aliasTableList) {
            if(i == j.name) {
              if (ids == "") {
                ids = `${j.id}`;
              } else {
                ids += `,${j.id}`;
              }
            }
          }
        }
      }
      if (ids == "") {
        this.$message({
          type: "warning",
          message: "请选择您要删除的内容"
        });
      } else {
        this.$confirm("此操作将永久删除该资质等级别名名称, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(() => {
            deleteLevelAlias({ ids: ids }).then(res => {
              if (res.code == "1") {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                //删除成功后刷新列表
                this.getLevelAlias(this.code);
              } else {
                console.info("删除资质别名接口不通");
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    //关闭弹窗刷新列表
    handleRefesh(showMask) {
      if (!showMask) {
        setTimeout(() => {
          return this.getLevelAlias(this.code);
        }, 100);
      }
    },
    checkTime() {
      if (this.radio == "createTime") {
        this.isActive = !this.isActive;
        this.getLevelAlias(this.code);
      }
    },
    checkCombine() {
      if (this.radio == "code") {
        this.isCombine = !this.isCombine;
        this.getLevelAlias(this.code);
      }
    },
    checkRadio() {
      if (this.radio == "code") {
        this.hasCheck = true;
        this.getLevelAlias(this.code);
      } else {
        this.hasCheck = false;
      }
      if (this.radio == "createTime") {
        this.checked = true;
        this.getLevelAlias(this.code);
      } else {
        this.checked = false;
      }
    },
    handleCheckAllChange(val) {
       this.checkedAlias = val ? this.tableDataAlias : [];
       this.isIndeterminate = false;
     },
    handleCheckedChange(value) {
      this.multipleAlias = value;
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.tableDataAlias.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.tableDataAlias.length;
    },
    headClass() {
      return "text-align: center;background:#DDDFE4;color: #000000;";
    }
  },
  created() {
    this.getLevelList();
    this.getLevelAlias(this.code);
    this.isAllows = this.$route.query.isAllows;
  }
};
</script>
<style lang="less" scoped>
@import "../../style/mixin";
.level {
  width: 100%;
  min-height: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  .left_list {
    width: 50%;
    border-right: 1px dashed #000;
  }
  .right_list {
    width: 50%;
    .right_top {
      border-bottom: 1px solid #dddfe4;
      padding: 0 30px;
      li {
        border-bottom: 6px solid @fontColor;
        color: @fontColor;
        width: 54px;
        height: 54px;
        line-height: 54px;
        margin-right: 45px;
      }
    }
    .search {
      width: 64px;
      height: 48px;
      background-color: @mainColor;
      color: @whiteColor;
    }
    .add_left {
      background-color: @mainColor;
      width: 126px;
      height: 48px;
    }
    .delete_right {
      background-color: @mainColor;
      width: 94px;
      height: 48px;
    }
    .select_right {
      border: 1px solid #dddfe4;
      .select_des {
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #dddfe4;
      }
    }
    .el-table::before {
      background-color: #ffffff;
    }
    .level_alias {
      width: 120px;
      height: 40px;
      line-height: 40px;
      background-color: rgb(153, 169, 191);
    }
    .el-radio {
      margin: 0;
    }
    .active {
      color: #666;
    }
  }
  .table_list {
    border: 1px solid #ffffff;
    .table {
      margin-top: 5px;
      border-top: 1px solid #ebeef5 !important;
      border-left: 1px solid #ebeef5 !important;
      border-right: 1px solid #ebeef5 !important;
    }
  }
  //弹窗样式
  .dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 10;
    .dialog-container {
      width: 500px;
      background: #eeeeee;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: relative;
      padding: 20px;
      border-radius: 10px;
    }
  }
}
</style>