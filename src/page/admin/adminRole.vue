<template>
  <div class="adminRole bg-fff">
    <div class="mb30 adminRole_top pl30 pr30">
      <el-row :span="24" type="flex" justify="space-between" align="middle">
        <el-col :span="8" class="fs16 color-150 fw600 text-l">
          角色名称：
          <el-select v-model="desc" class="ml10" style="width: 60%" @change="changetable">
            <el-option v-for="item in role" :key="item.rid" :label="item.desc" :value="item.desc"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <div class="fs14 color-224 drc cp">
            <img src="../../assets/img/add_img.png" alt />
            <span @click="addRole" class="ml10">添加角色</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="bg-fff pb20 pl30 pr30">
      <el-row>
        <el-col :span="24">
          <el-table border :data="tableData" :header-cell-style="headClass">
            <el-table-column label="序号" align="center" type="index"></el-table-column>
            <el-table-column label="角色名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.desc }}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.created }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <span class="handle_authority" @click="editRole(scope.$index, scope.row)">编辑权限</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div class="block mt30">
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
    <div class="dialog" v-show="edit">
      <div class="dialog-container">
        <div class="dfrcb ft20 pl30 pr30 dialog_top">
          <div class="fs16 color-150 fw600">新增账号</div>
          <i class="el-icon-close fs16 cp" @click="closeMask"></i>
        </div>
        <div @keyup.enter="submitForm('ruleFormEdit')" class="dialog_form">
          <el-form
            :label-position="labelPosition"
            label-width="100px"
            :model="ruleFormEdit"
            :rules="rulesEdit"
            ref="ruleFormEdit"
          >
            <div class="form_top">
              <el-row type="flex">
                <el-col class="fs16 color-150 ml20">
                  角色名称：
                  <el-select
                    v-model="rolePower"
                    class="ml10"
                    style="width: 60%"
                    @change="changetable"
                  >
                    <el-option
                      v-for="item in role"
                      :key="item.rid"
                      :label="item.desc"
                      :value="item.desc"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </div>
            <el-form-item class="popup_form">
              <div class="pl20">
                <div class="fs16 color-150">权限:</div>
                <div class="bg-fff popup_scollbar">
                  <el-tree
                    :data="powerData"
                    show-checkbox
                    :props="defaultProps"
                    default-expand-all
                    ref="tree"
                    node-key="id"
                    :default-checked-keys="showId"
                  >
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                      <span class="ml10">{{ node.label }}</span>
                      <span>
                        <span :class="data.id > 10000 ? '': 'hidden'">
                          <input
                            type="radio"
                            class="select_power"
                            :checked="data.optiond == 'read' || data.currentStage == '1' ? true: false"
                            :name="data.id"
                            @click="() => 
                    ready(node,data)"
                          />
                          <span>只读</span>
                        </span>
                        <span :class="data.id > 10000 ? '': 'hidden'">
                          <input
                            type="radio"
                            class="select_power ml10"
                            :checked="data.optiond == 'operability' || data.currentStage == '2' ? true: false"
                            :name="data.id"
                            @click="() => 
                    operate(node,data)"
                          />
                          <span>可操作</span>
                        </span>
                      </span>
                    </span>
                  </el-tree>
                </div>
              </div>
            </el-form-item>
            <el-form-item class="popup_form_btn">
              <div class="popup_btn text-c color-fff" @click="submitForm('ruleFormEdit')">保存</div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <powerPopup :showMask="true" v-model="sendVal" @refesh="handleRefesh" :isAllows="isAllows"></powerPopup>
  </div>
</template>
<script>
import {
  manageList,
  manageLock,
  setPassWord,
  role,
  roleAll,
  searchPower,
  editPower
} from "@/api/index";
import { timestampToTime } from "../../public";
export default {
  data() {
    return {
      firm: "",
      tableData: [],
      total: 0,
      pagesize: 15, // 当前页面条数
      pagenum: 1, //当前页面数
      sendVal: "",
      roleInfo: null,
      role: "",
      desc: "",
      id: "",
      firm: "",
      edit: false,
      labelPosition: "right",
      ruleFormEdit: {
        roles: ""
      },
      rulesEdit: {
        roles: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
      },
      powerData: [],
      defaultProps: {
        children: "data",
        label: "title"
      },
      rolePower: "", //选择角色权限;
      showId: [],
      rid: "", //角色id;
      isAllows: null
    };
  },
  methods: {
    roleList() {
      if (this.desc) {
        for (let i of this.role) {
          if (this.desc == i.desc) {
            this.id = i.rid;
          }
        }
      }
      const params = {
        currentPage: this.pagenum,
        pageSize: this.pagesize,
        desc: this.firm,
        rid: this.id
      };
      role(params).then(res => {
        if (res.code == "1") {
          const { list, total } = res.data;
          if (list.length > 0) {
            for (let i of list) {
              if (i.created) {
                i.created = timestampToTime(i.created).slice(0, 10);
              }
            }
          }
          this.tableData = list;
          this.total = total;
        } else {
          console.info("管理员账号接口不通");
        }
      });
    },
    getRole() {
      roleAll().then(res => {
        if (res.code == "1") {
          this.role = res.data;
        } else {
          console.info("获取角色列表接口不通");
        }
      });
    },
    addRole() {
      this.sendVal = true;
    },
    changetable() {
      this.pagenum = 1;
      setTimeout(() => {
        return this.roleList();
      }, 100);
    },
    handleCurrentChange(val) {
      // 当前页改变的函数
      this.pagenum = val;
      this.roleList();
    },
    handleSizeChange(val) {
      // 每页条数发生改变时做出的函数
      this.pagesize = val;
      this.roleList();
    },
    searchData() {
      this.pagenum = 1;
      this.roleList();
    },
    clear() {
      if (this.firm == "") {
        this.roleList();
      }
    },
    handleRefesh(showMask) {
      if (!showMask) {
        this.id = "";
        setTimeout(() => {
          return this.roleList(), this.getRole();
        }, 100);
      }
    },
    editRole(index, row) {
      this.$refs.tree.setCheckedNodes([]);
      this.showId = [];
      this.edit = true;
      this.rid = row.rid;
      this.rolePower = row.desc;
      searchPower({ rid: row.rid }).then(res => {
        if (res.code == "1") {
          for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < res.data[i].data.length; j++) {
              if (res.data[i].data[j].optiond == null) {
                //默认3为空;1为只读;2为可操作;
                res.data[i].data[j].currentStage = "3";
              }
            }
          }
          this.powerData = res.data;
          for (let i of res.data) {
            for (let j of i.data) {
              if (j.optiond !== null) {
                this.showId.push(j.id);
              }
            }
          }
        } else {
          console.info("查询可编辑权限不通");
        }
      });
    },
    closeMask() {
      this.edit = false;
      this.powerData = [];
      this.showId = [];
    },
    operate(node, data) {
      data.currentStage = "2";
    },
    ready(node, data) {
      data.currentStage = "1";
    },
    submitForm(formName) {
      //一级菜单过滤,一级菜单为四位数;
      var treeList = this.$refs.tree.getCheckedKeys().filter(x => {
        return x > 10000;
      });
      this.$refs[formName].validate(valid => {
        var result = "";
        for (let i = 0; i < this.powerData.length; i++) {
          for (let j = 0; j < this.powerData[i].data.length; j++) {
            for (let a of treeList) {
              //当前选择的id筛选;
              if (a == this.powerData[i].data[j].id) {
                var id = a;
                var value = "";
                if (this.powerData[i].data[j].currentStage) {
                  if (this.powerData[i].data[j].currentStage == "2") {
                    value = "operability";
                  } else {
                    value = "read";
                  }
                  if (result == "") {
                    result = `${id}/${value}`;
                  } else {
                    result += `,${id}/${value}`;
                  }
                } else {
                  if (result == "") {
                    result = `${id}/${this.powerData[i].data[j].optiond}`;
                  } else {
                    result += `,${id}/${this.powerData[i].data[j].optiond}`;
                  }
                }
              }
            }
          }
        }
        if (valid) {
          const params = {
            rid: this.rid,
            desc: this.rolePower,
            ids: result
          };
          editPower(params).then(res => {
            if (res.code == "1") {
              this.edit = false;
              this.$message({
                type: "success",
                message: "操作成功"
              });
              this.$refs.tree.setCheckedNodes([]);
              this.roleList();
            } else {
              this.$message({
                type: "warning",
                message: res.msg
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    headClass() {
      return "text-align: center;background:#DDDFE4;color: #000000;";
    }
  },
  created() {
    this.roleList();
    this.getRole();
    this.isAllows = this.$route.query.isAllows;
  }
};
</script>
<style lang="less" scoped>
@import "../../style/mixin";
.adminRole {
  height: 100%;
  width: 100%;
  .adminRole_top {
    height: 88px;
    line-height: 88px;
    border-bottom: 1px solid #dddfe4;
    .fl-left {
      margin-left: 30px;
    }
    .el-col-2 {
      padding-right: 30px;
      span {
        .sc(16px, @fontColor);
        cursor: pointer;
      }
    }
  }
  .fl-right {
    text-align: right;
    margin: 20px 0 5px 0;
    .fl-left {
      margin-left: 20px;
    }
  }
  .handle_authority,
  .handle_cancel,
  .handle_set {
    .sc(14px, @fontColor);
    cursor: pointer;
    border-bottom: 1px solid @fontColor;
  }
  .block {
    padding: 0 30px;
    margin-top: 30px;
  }
  .dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 10;
    .dialog-container {
      width: 920px;
      height: 769px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.5);
      border-radius: 12px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: relative;
      .dialog_top {
        height: 66px;
        border-bottom: 1px solid #dddfe4;
      }
      .dialog_form {
        padding: 0 60px;
        .form_top {
          height: 96px;
          line-height: 96px;
          border-bottom: 1px solid #DDDFE4;
        }
        .popup_form {
          border-bottom: 1px solid #DDDFE4;
          .el-form-item__content {
            margin-left: 0 !important;
          }
        }
        .popup_scollbar {
          background-color: #ffffff;
          .el-tree {
            max-height: 500px;
          }
          .custom-tree-node {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            padding-right: 8px;
          }
          .select_power {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 6px;
          }
        }
      }
    }
    .popup_table {
      border: 1px solid #ddd;
    }
    .popup_scollbar {
      height: 480px;
      min-height: 480px;
      overflow-x: hidden;
      overflow-y: scroll;
    }
    .popup_scollbar::-webkit-scrollbar {
      display: none;
    }
    .popup_form_btn {
      background-color: @mainColor;
      width: 128px;
      height: 40px;
      border-radius: 20px;
      margin: 0 auto;
      cursor: pointer;
    }
    // .el-form-item {
    //   padding-right: 20px;
    // }
    .role_list {
      width: 100%;
      height: 100%;
      font-size: 14px;
      color: #606266;
      padding-left: 45px;
      margin-bottom: 22px;
    }
    .hidden {
      display: none;
    }
  }
}
</style>