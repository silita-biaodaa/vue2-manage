<template>
  <div class="evaluation bg-fff">
    <div class="evaluation_name pr20 pl20 pt20 pb20">
      <div class="mb20">
        <el-row :span="24">
          <el-col :span="12" class="fs16 color-150 fw600 text-l">
            地区：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-select v-model="province" placeholder="请选择" style="width:70%" @change="changetable">
              <el-option
                v-for="item in provinces"
                :key="item.areaCode"
                :label="item.areaName"
                :value="item.areaName"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="mb20">
        <el-row :span="24" class="dfrcb">
          <el-col :span="16" class="fs16 fw600 color-150 text-l">
            评标办法：
            <el-input
              placeholder="请输入名称"
              clearable
              v-model="firm"
              style="width:60%"
              @change="searchData"
              v-on:input="clear"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <button type="primary" class="ml30 fw600 fs16 cp search" @click="searchData">查询</button>
          </el-col>
          <el-col :span="8">
            <div class="add_delete drfe color-fff">
              <div class="mr10 cp dfcc add fs16 fw600" @click="addWays" v-show="isAllows">
                <img src="../../assets/img/add_icon.png" alt="">
                <div class="ml10">添加评标办法</div>
              </div>
              <div class="detele dfcc fs16 fw600 cp" @click="toggleSelection" v-show="isAllows">
                <img src="../../assets/img/delete_icon.png" alt="">
                <div class="ml10">删除</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="24">
          <el-table
            class="table cp"
            :data="tableData"
            @selection-change="handleSelectionChange"
            ref="multipleTable"
            @row-click="openDetails"
            border
            :header-cell-style="headClass"
          >
            <el-table-column label="序号" align="center" type="selection" width="60"></el-table-column>
            <el-table-column label="地区" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.region }}</span>
              </template>
            </el-table-column>
            <el-table-column label="评标办法名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <span
                  class="handle_delete color-409"
                  @click="deleteName(scope.$index, scope.row)"
                  v-show="isAllows"
                >删除</span>
                <span
                  class="handle_change color-409 ml20"
                  @click="changeName(scope.$index, scope.row)"
                  v-show="isAllows"
                >修改</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div class="evaluation_alias pl20 pr20">
      <div class="mb20 alias fs14 fw600">
        <el-row>
          <el-col class="text-l">
            <span>别名:</span>
            <span>{{areaName}}</span>
            <span class="ml30">{{aliasName}}</span>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-row class="dfrcb">
          <el-col class="fs16 fw600 text-l drc">
            <div style="min-width: 120px;">评标办法别名：</div>
            <el-input
              placeholder="请输入名称"
              clearable
              v-model="firmAlias"
              style="width:80%"
              @change="searchAlias"
              v-on:input="clearAlias"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-col>
          <button type="primary" class="ml10 cp search" @click="searchAlias">搜索</button>
        </el-row>
      </div>
      <el-row class="mt20 mb20">
        <el-col class="add_delete dfrcb color-fff fs16 fw600">
          <div class="mr10 cp add dfcc" @click="addAlias" v-show="isAllows">
            <img src="../../assets/img/add_icon.png" alt="">
            <div class="ml10">添加评标办法别名</div>
          </div>
          <div class="cp delete dfcc" @click="toggleAlias" v-show="isAllows">
            <img src="../../assets/img/delete_icon.png" alt="">
            <div class="ml10">删除</div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            class="table"
            :data="tableAlias"
            @selection-change="selectionChange"
            ref="multipleAlias"
            border
            :header-cell-style="headClass"
          >
            <el-table-column label="序号" align="center" type="selection" width="60"></el-table-column>
            <el-table-column label="别名名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <span
                  class="handle_delete cp"
                  @click="deleteAliasInfo(scope.$index, scope.row)"
                  v-show="isAllows"
                >删除</span>
                <span
                  class="handle_change ml20 cp"
                  @click="changeAliasInfo(scope.$index, scope.row)"
                  v-show="isAllows"
                >修改</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <!-- 增加弹窗 -->
    <div class="dialog" v-if="showMask || showAlias">
      <div class="dialog-container pb40">
        <div @keyup.enter="submitForm('ruleForm')">
          <div class="dfrcb dialog_title pl30 pr30">
            <div class="fs16 color-150 fw600">{{showMask ? "添加评标办法":"添加评标办法别名"}}</div>
            <i class="el-icon-close fs14 cp" @click="cancelMask"></i>
          </div>
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            :rules="rules"
            :label-position="labelPosition"
            label-width="100px"
          >
            <el-form-item label="评标办法:" prop="name" v-if="showMask" class="dialog_form">
              <el-input
                placeholder="请输入需要增加的评标办法"
                clearable
                v-model="ruleForm.name"
              ></el-input>
            </el-form-item>
            <el-form-item label="评标办法别名:" prop="name" v-if="showAlias" label-width="140px" class="dialog_form">
              <el-input
                placeholder="请输入需要增加的评标办法别名"
                clearable
                v-model="ruleForm.name"
              ></el-input>
            </el-form-item>
            <el-form-item class="text-c handle_btn">
              <button class="handle_cancle bg-fff fs18 color-999 cp" plain @click="cancelMask">取消</button>
              <button class="handle_confirm color-fff fs18 ml30 cp" type="primary" @click="submitForm('ruleForm')">确定</button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 修改弹窗 -->
    <div class="dialog" v-if="changeMask || changeAlias">
      <div class="dialog-container pb40">
        <div class="mb10" @keyup.enter="submitFormChange('ruleFormChange')">
          <div class="dfrcb dialog_title pl30 pr30">
            <div class="fs16 color-150 fw600">{{changeMask ? "修改评标办法":"修改评标办法别名"}}</div>
            <i class="el-icon-close fs14 cp" @click="cancelMask"></i>
          </div>
          <el-form
            :model="ruleFormChange"
            ref="ruleFormChange"
            :rules="rulesChange"
            :label-position="labelPosition"
            label-width="100px"
          >
            <el-form-item label="评标办法:" prop="name" v-if="changeMask" class="dialog_form">
              <el-input clearable v-model="ruleFormChange.name"></el-input>
            </el-form-item>
            <el-form-item label="评标办法别名:" prop="name" v-if="changeAlias" label-width="140px" class="dialog_form">
              <el-input clearable v-model="ruleFormChange.name"></el-input>
            </el-form-item>
            <el-form-item class="text-c handle_btn">
              <button class="handle_cancle bg-fff fs18 color-999 cp" plain @click="cancelMask">取消</button>
              <button class="handle_confirm color-fff fs18 ml30 cp" type="primary" @click="submitFormChange('ruleFormChange')">确定</button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  listArea,
  evaluList,
  deleteInfo,
  addName,
  alias,
  deleteAlias,
  addAliasList,
  updateName,
  updateAlias,
  changeQual
} from "@/api/index";
import { timestampToTime } from "../../public";
export default {
  data() {
    return {
      province: "湖南省",
      provinces: [],
      firm: "",
      firmAlias: "",
      showMask: false, //增加评标办法名称;
      showAlias: false, //增加评标办法名称别名;
      changeMask: false, //修改评标办法名称;
      changeAlias: false, //修改评标办法名称别名;
      tableData: [], //评标办法名称列表;
      tableAlias: [], //评标办法别名名称列表;
      source: "",
      sourceAlias: "", //判断当前输入框的值是否改变;
      labelPosition: "right",
      ruleForm: {
        name: ""
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      ruleFormChange: {
        name: ""
      },
      rulesChange: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      multipleSelection: [],
      multipleAlias: [],
      areaName: "", //省份;
      aliasName: "", //评标办法标准名称;
      aliasCode: "", //评标办法标准编码;
      isAllows: null
    };
  },
  methods: {
    getArea() {
      listArea({ areaParentId: 0 }).then(res => {
        if (res.code == "1") {
          res.data.forEach(itme => {
            itme.areaCode = itme.pkid + itme.areaCode;
          });
          this.provinces = res.data;
        } else {
          console.info("获取省份接口不通");
        }
      });
    },
    getList() {
      const params = {
        source: this.source == "" ? "" : this.source,
        name: this.firm
      };
      evaluList(params).then(res => {
        if (res.code == "1") {
          const { data } = res;
          if (data.length > 0) {
            for (let i of data) {
              if (i.createTime) {
                i.createTime = timestampToTime(i.createTime).slice(0, 10);
              }
            }
          }
          this.tableData = data;
          if (data.length > 0) {
            var tr = document.getElementsByTagName("tr");
              for (let i = 0; i < tr.length - 1; i++) {
                tr[i].style.backgroundColor = "#fff";
                setTimeout(() => {
                  return tr[1].style.backgroundColor = "#F3F5F9";
                }, 100);
              }
            this.areaName = data[0].region;
            this.aliasName = data[0].name;
            this.aliasCode = data[0].quaCode;
            this.getAlias(data[0].quaCode);
          } else {
            this.areaName = "";
            this.aliasName = "";
            this.aliasCode = "";
            this.tableAlias = [];
          }
        } else {
          console.info("获取评标办法列表不通");
        }
      });
    },
    infoList(ids) {
      deleteInfo({ ids: ids }).then(res => {
        if (res.code == "1") {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          setTimeout(() => {
            return this.getList();
          }, 500);
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
          console.info("删除评标办法名称接口不通");
        }
      });
    },
    aliasList(idsStr) {
      deleteAlias({ idsStr: idsStr }).then(res => {
        if (res.code == "1") {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          setTimeout(() => {
            return this.getAlias(this.aliasCode);
          }, 500);
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
          console.info("删除评标办法名称接口不通");
        }
      });
    },
    getAlias(nameCode) {
      const params = {
        stdCode: nameCode,
        name: this.firmAlias
      };
      alias(params).then(res => {
        if (res.code == "1") {
          const { data } = res;
          this.tableAlias = data;
        } else {
          console.info("获取评标办法别名接口不通");
        }
      });
    },
    changetable() {
      this.$nextTick(function() {
          // console.log('执行完后，执行===============》mounted');
          // console.info('clientHeight',document.getElementsByClassName('table_list')[0].clientHeight);
      });
      for (let i of this.provinces) {
        if (this.province == i.areaName) {
          this.source = i.areaCode.slice(32);
        }
      }
      setTimeout(() => {
        return this.getList();
      }, 100);
    },
    searchData() {
      this.getList();
    },
    searchAlias() {
      this.getAlias(this.aliasCode);
    },
    clear() {
      if (this.firm == "") {
        this.getList();
      }
    },
    //清空别名刷新列表;
    clearAlias() {
      if (this.firmAlias == "") {
        this.getAlias(this.aliasCode);
      }
    },
    addWays() {
      this.showMask = true;
    },
    addAlias() {
      this.showAlias = true;
    },
    cancelMask() {
      if (this.showMask) {
        this.showMask = false;
        this.ruleForm.name = "";
      } else {
        this.showAlias = false;
        this.ruleForm.name = "";
      }
      this.changeMask = false;
      this.changeAlias = false;
    },
    //删除评标办法
    deleteName(index, row) {
      this.$confirm("此操作将永久删除该评标办法名称, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.infoList(row.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //修改评标办法
    changeName(index, row) {
      this.changeMask = true;
      this.ruleFormChange.name = row.name;
      this.sourceAlias = row;
    },
    //修改评标办法别名
    changeAliasInfo(index, row) {
      this.changeAlias = true;
      this.ruleFormChange.name = row.name;
      this.sourceAlias = row;
    },
    //批量删除
    toggleSelection() {
      var ids = "";
      if (this.multipleSelection) {
        for (let i of this.multipleSelection) {
          if (ids == "") {
            ids = `${i.id}`;
          } else {
            ids += `,${i.id}`;
          }
        }
        if (ids == "") {
          this.$message({
            type: "warning",
            message: "请选择您要删除的内容"
          });
        } else {
          this.$confirm("此操作将永久删除该评标办法名称, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.infoList(ids);
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
        }
      }
    },
    //批量删除别名名称
    toggleAlias() {
      var idsStr = "";
      if (this.multipleAlias) {
        for (let i of this.multipleAlias) {
          if (idsStr == "") {
            idsStr = `${i.id}`;
          } else {
            idsStr += `|${i.id}`;
          }
        }
        if (idsStr == "") {
          this.$message({
            type: "warning",
            message: "请选择您要删除的内容"
          });
        } else {
          this.$confirm("此操作将永久删除该评标办法名称, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.aliasList(idsStr);
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    selectionChange(val) {
      this.multipleAlias = val;
    },
    //添加评标名称;
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          for (let i of this.provinces) {
            if (this.province == i.areaName) {
              this.source = i.areaCode.slice(32);
            }
          }
          if (this.showMask) {
            addName({
              type: this.source,
              name: this.ruleForm.name
            }).then(res => {
              if (res.code == "1") {
                this.$message({
                  type: "success",
                  message: "添加成功!"
                });
                this.showMask = false;
                //清空输入框;
                this.ruleForm.name = "";
                this.getList();
              } else {
                this.$message({
                  type: "warning",
                  message: res.msg
                });
                console.info("添加评标办法接口不通");
              }
            });
          } else {
            addAliasList({
              name: this.ruleForm.name,
              stdCode: this.aliasCode
            }).then(res => {
              if (res.code == "1") {
                this.$message({
                  type: "success",
                  message: "添加成功!"
                });
                this.showAlias = false;
                //清空输入框;
                this.ruleForm.name = "";
                this.getAlias(this.aliasCode);
              } else {
                this.$message({
                  type: "warning",
                  message: res.msg
                });
                console.info("添加评标办法别名接口不通");
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitFormChange(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.sourceAlias.name == this.ruleFormChange.name) {
            this.changeAlias = false;
            this.changeMask = false;
          } else {
            if (this.changeMask) {
              const params = {
                source: this.source == "" ? "hunan" : this.source,
                id: this.sourceAlias.id,
                name: this.ruleFormChange.name
              };
              updateName(params).then(res => {
                if (res.code == "1") {
                  this.$message({
                    type: "success",
                    message: "修改成功!"
                  });
                  this.changeMask = false;
                  this.getList();
                } else {
                  this.$message({
                    type: "warning",
                    message: res.msg
                  });
                  console.info("修改评标办法名称接口不通");
                }
              });
            } else {
              const params = {
                name: this.ruleFormChange.name,
                id: this.sourceAlias.id
              };
              updateAlias(params).then(res => {
                if (res.code == "1") {
                  this.$message({
                    type: "success",
                    message: "修改成功!"
                  });
                  this.changeAlias = false;
                  this.getAlias(this.aliasCode);
                } else {
                  this.$message({
                    type: "warning",
                    message: res.msg
                  });
                  console.info("修改评标办法别名名称接口不通");
                }
              });
            }
          }
        }
      });
    },
    //点击标准评标名称展示别名;
    openDetails(row, column) {
      //首先清除tr背景颜色;
      var tr = document.getElementsByTagName('tr')
      for(let i =0; i< tr.length-1;i++) {
        tr[i].style.backgroundColor = '#fff';
      }
      // 点击选中重新赋值;
      event.currentTarget.style.backgroundColor = '#F3F5F9';
      this.areaName = row.region;
      this.aliasName = row.name;
      this.aliasCode = row.quaCode;
      this.getAlias(row.quaCode);
    },
    //删除评标办法别名;
    deleteAliasInfo(index, row) {
      this.$confirm("此操作将永久删除该评标办法别名名称, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.aliasList(row.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    headClass() {
      return "text-align: center;background:#DDDFE4;color: #000000;";
    }
  },
  created() {
    this.getArea();
    this.getList();
    this.isAllows = this.$route.query.isAllows;
  },
  mounted() {
      // this.showHeight();
      // console.group('挂载结束状态===============》mounted');
      this.$nextTick(function() {
          // console.log('执行完后，执行===============》mounted');
      });
  },
  
};
</script>
<style scoped lang="less">
@import "../../style/mixin";
.evaluation {
  width: 100%;
  min-height: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  .evaluation_name {
    width: 60%;
    border-right: 1px dashed #000;
    display: flex;
    flex-direction: column;
    .add_delete {
      .add {
        min-width: 158px;
      }
      .add,.detele {
        width: 158px;
        height: 48px;
        line-height: 48px;
        background-color: @mainColor;
      }
      .detele {
        width: 94px;
        min-width: 94px;
      }
    }
  }
  .search {
      width: 64px;
      height: 48px;
      background-color: @mainColor;
      color: @whiteColor;
    }
  .evaluation_alias {
    width: 40%;
    height: 100%;
    .add_delete {
      .add,.delete {
        width: 190px;
        height: 48px;
        line-height: 48px;
        background-color: @mainColor;
      }
      .delete {
        width: 94px;
      }
    }
    .alias {
      height: 40px;
      line-height: 40px;
    }
    .search {
      width: 64px;
      height: 48px;
      background-color: @mainColor;
      color: @whiteColor;
    }
  }
  .handle_delete,
  .handle_change {
    color: @fontColor;
    border-bottom: 1px solid @fontColor;
  }
  //   弹窗样式
  .dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 10;
    .dialog-container {
      width: 632px;
      background: #ffffff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: relative;
      border-radius: 10px;
      box-shadow:0px 0px 21px 0px rgba(0,0,0,0.5);
      .dialog_title {
        height: 66px;
        line-height: 66px;
        border-bottom: 1px solid #DDDFE4;
        margin-bottom: 60px;
      }
      .dialog_form {
        padding: 0 67px;
      }
      .handle_btn {
        margin-top: 128px;
        .handle_confirm {
          width:128px;
          height:40px;
          background: @mainColor;
          border-radius:20px;
        }
      }
      .popup_form {
        .el-form-item__content {
          margin-left: 0 !important;
        }
        .popup_title {
          color: #606266;
        }
      }
    }
    .el-form-item {
      padding-right: 20px;
    }
    .hidden {
      visibility: hidden;
    }
  }
}
</style>