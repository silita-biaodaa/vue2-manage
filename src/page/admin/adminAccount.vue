<template>
  <div class="adminAccount bg-fff">
    <el-row
      :span="24"
      type="flex"
      justify="space-between"
      align="middle"
      class="adminAccount_top pl30 pr30 mb30"
    >
      <el-col :span="12">
        <el-input
          placeholder="请输入手机号码"
          clearable
          v-model="firm"
          style="width:50%"
          @click="searchData"
          v-on:input="clear"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <button type="primary" class="fl-left color-fff fs16 cp" @click="searchData">查询</button>
      </el-col>
      <el-col :span="2" v-show="isAllows">
        <div class="fs14 color-224 drc cp">
          <img src="../../assets/img/add_img.png" alt />
          <span @click="addAccount" class="ml10">添加账号</span>
        </div>
      </el-col>
    </el-row>
    <div class="bg-fff pb20 pl30 pr30">
      <el-row>
        <el-col :span="24">
          <el-table class="public_table" border :data="tableData" :header-cell-style="headClass">
            <el-table-column label="序号" align="center" type="index" width="60" :resizable="false"></el-table-column>
            <el-table-column label="姓名" align="center" width="180" :resizable="false">
              <template slot-scope="scope">
                <span>{{ scope.row.realName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="手机号" align="center" width="180" :resizable="false">
              <template slot-scope="scope">
                <span>{{ scope.row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column label="部门" align="center" width="150" :resizable="false">
              <template slot-scope="scope">
                <span>{{ scope.row.department }}</span>
              </template>
            </el-table-column>
            <el-table-column label="岗位" align="center" width="150" :resizable="false">
              <template slot-scope="scope">
                <span>{{ scope.row.post }}</span>
              </template>
            </el-table-column>
            <el-table-column label="角色" align="center" width="150" :resizable="false">
              <template slot-scope="scope">
                <span>{{ scope.row.desc }}</span>
              </template>
            </el-table-column>
            <el-table-column label="注册时间" align="center" width="180" :resizable="false">
              <template slot-scope="scope">
                <span>{{ scope.row.created }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="calc(100% - 1050)" :resizable="false">
              <template slot-scope="scope">
                <div class="dfcc user_info">
                  <div
                    class="color-224 dfcc cp"
                    @click="editRole(scope.$index, scope.row)"
                    v-show="isAllows"
                  >
                    <img src="../../assets/img/add_img.png" alt />
                    <span class="handle_authority ml10">编辑</span>
                  </div>
                  <div
                    class="color-224 dfcc ml30 cp"
                    @click="openMask(scope.$index, scope.row)"
                    v-show="isAllows"
                  >
                    <img src="../../assets/img/open_img.png" alt />
                    <span class="handle_cancel ml10">{{ scope.row.locks }}</span>
                  </div>
                  <div
                    class="color-224 dfcc ml30 cp"
                    @click="setWord(scope.$index, scope.row)"
                    v-show="isAllows"
                  >
                    <img src="../../assets/img/set_img.png" alt />
                    <span class="handle_set ml10">重置为初始密码</span>
                  </div>
                </div>
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
    <div class="dialog" v-show="edit">
      <div class="dialog-container">
        <div class="dfrcb pl30 pr30 dialog_top">
          <div class="fs16 color-150 fw600">编辑账号</div>
          <i class="el-icon-close fs16 cp" @click="closeMask"></i>
        </div>
        <div @keyup.enter="submitFormEdit('ruleFormEdit')" class="dialog_form fs16 color-150">
          <el-form
            :label-position="labelPosition"
            label-width="100px"
            :model="ruleFormEdit"
            :rules="rulesEdit"
            ref="ruleFormEdit"
          >
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="ruleFormEdit.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" prop="phone">
              <el-input
                v-model="ruleFormEdit.phone"
                placeholder="请输入手机号"
                autocomplete="new-password"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="部门：" prop="depart">
              <el-input v-model="ruleFormEdit.depart" placeholder="请输入部门"></el-input>
            </el-form-item>
            <el-form-item label="岗位：" prop="jobs">
              <el-input v-model="ruleFormEdit.jobs" placeholder="请输入岗位"></el-input>
            </el-form-item>
            <el-form-item label="角色：">
              <el-row type="flex">
                <el-col :span="4" class="role_list">
                  <el-select v-model="desc">
                    <el-option
                      v-for="item in role"
                      :key="item.rid"
                      :label="item.desc"
                      :value="item.desc"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item class="popup_form_btn pl20">
              <div class="popup_btn color-fff" @click.prevent="submitFormEdit('ruleFormEdit')">保存</div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <addPopup :showMask="true" v-model="sendVal" :roleInfo="roleInfo" @refesh="handleRefesh"></addPopup>
  </div>
</template>
<script>
import {
  manageList,
  manageLock,
  setPassWord,
  roleAll,
  updateAccount
} from "@/api/index";
import { timestampToTime } from "../../public";
import { fail } from "assert";
export default {
  data() {
    //表单验证
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入名称"));
      } else {
        if (this.ruleFormEdit.name !== "") {
          this.$refs.ruleFormEdit.validateField("confirmPsd");
        }
        callback();
      }
    };
    return {
      firm: "",
      tableData: [], //表格数据列表
      total: 0,
      pagesize: 15, // 当前页面条数
      pagenum: 1, //当前页面数
      sendVal: "", //自定义组件传值;
      roleInfo: null,
      list: null, //清空添加所有值
      role: "", //角色列表;
      desc: "",
      edit: false, //编辑窗口是否展示;
      roleList: null, //角色列表
      ruleFormEdit: { //表单值
        name: "",
        phone: "",
        depart: "",
        jobs: ""
      },
      rulesEdit: { //验证
        name: [{ required: true, validator: validatePass, trigger: "blur" }],
        depart: [{ message: "请输入部门", trigger: "blur" }],
        jobs: [{ message: "请输入岗位", trigger: "blur" }]
      },
      labelPosition: "right", //表单样式靠右;
      isAllows: null //接受路由可操作的值;
    };
  },
  methods: {
    //管理账号列表;
    accountList() {
      const params = {
        currentPage: this.pagenum,
        pageSize: this.pagesize,
        phone: this.firm
      };
      manageList(params).then(res => {
        if (res.code == "1") {
          const { list, total } = res.data;
          if (list.length > 0) {
            for (let i of list) {
              if (i.created) {
                //筛选时间timestampToTime方法;
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
    //添加角色;
    getRole() {
      roleAll().then(res => {
        if (res.code == "1") {
          this.role = res.data;
        } else {
          console.info("获取角色列表接口不通");
        }
      });
    },
    //锁定用户
    openMask(index, row) {
      this.$confirm(
        `是否${row.locks == "未锁定" ? "锁定" : "解锁"}该管理员账号？`,
        "提示",
        {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
        }
      )
        .then(() => {
          manageLock({
            uid: row.uid,
            lock: row.locks == "未锁定" ? 1 : 0
          }).then(res => {
            if (res.code == "1") {
              this.$message({
                type: "success",
                message: `${row.locks == "未锁定" ? "锁定" : "解锁"}成功!`
              });
              this.accountList();
            } else {
              console.info("管理员锁定接口不通");
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
    handleCurrentChange(val) {
      // 当前页改变的函数
      this.pagenum = val;
      this.accountList();
    },
    handleSizeChange(val) {
      // 每页条数发生改变时做出的函数
      this.pagesize = val;
      this.accountList();
    },
    addAccount() {
      this.sendVal = true;
    },
    searchData() {
      this.pagenum = 1;
      this.accountList();
    },
    clear() {
      if (this.firm == "") {
        this.accountList();
      }
    },
    //编辑角色权限
    editRole(index, row) {
      this.edit = true;
      //获取当前行的数据;
      const { realName, phone, department, post, desc } = row;
      this.roleList = row;
      this.ruleFormEdit = {
        name: realName,
        phone: phone,
        depart: department,
        jobs: post
      };
      this.desc = desc;
    },
    //关闭弹窗，清空值;
    closeMask() {
      this.edit = false;
      this.ruleFormEdit = {
        name: "",
        phone: "",
        depart: "",
        jobs: ""
      };
    },
    //重置密码;
    setWord(index, row) {
      const params = {
        uid: row.uid,
        password: "12345678",
        phone: row.phone
      };
      this.$confirm(`是否重置该管理员密码?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          setPassWord(params).then(res => {
            if (res.code == "1") {
              this.$message({
                type: "success",
                message: `重置密码成功!`
              });
              this.accountList();
            } else {
              console.info("重置密码接口不通");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消重置该管理员密码`
          });
        });
    },
    //提交订单表单;
    submitFormEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { realName, desc, department, post } = this.roleList;
          const { name, depart, jobs } = this.ruleFormEdit;
          if (department == undefined || post == undefined) {
            (this.roleList.department = ""), (this.roleList.post = "");
          }
          //没改时点击保存按钮筛选;
          if (
            realName == name &&
            desc == this.desc &&
            this.roleList.department == depart &&
            this.roleList.post == jobs
          ) {
            this.edit = false;
          } else {
            for (let i of this.role) {
              if (this.desc == i.desc) {
                this.id = i.rid;
              }
            }
            const { name, phone, passWord, depart, jobs } = this.ruleFormEdit;
            const params = {
              realName: name,
              phone: phone,
              department: depart,
              post: jobs,
              rid: this.id,
              uid: this.roleList.uid
            };
            //更新列表的值;
            updateAccount(params).then(res => {
              if (res.code == "1") {
                this.$message({
                  type: "success",
                  message: "编辑成功!"
                });
                this.edit = false;
                //向父组件传值，若为关闭则刷新页面;
                setTimeout(() => {
                  return this.accountList();
                }, 100);
              } else {
                console.info("编辑账号接口不通");
              }
            });
          }
        }
      });
    },
    //接受子组件传值,刷新列表
    handleRefesh(showMask) {
      if (!showMask) {
        setTimeout(() => {
          //表格列表刷新赋值;
          return this.accountList();
        }, 100);
      }
    },
    headClass() {
      return "text-align: center;background:#DDDFE4;color: #000000;";
    }
  },
  created() {
    this.accountList();
    this.getRole();
    this.isAllows = this.$route.query.isAllows;
  }
};
</script>
<style lang="less" scoped>
@import "../../style/mixin";
.adminAccount {
  width: 100%;
  height: 100%;
  .adminAccount_top {
    height: 88px;
    line-height: 88px;
    border-bottom: 1px solid #dddfe4;
    .fl-left {
      margin-left: 30px;
      height: 48px;
      width: 64px;
      background-color: @mainColor;
    }
    .el-col-8 {
      text-align: center;
      padding-right: 30px;
      span {
        .sc(16px, @fontColor);
        cursor: pointer;
      }
    }
  }
  .user_info {
    min-width: 355px;
  }
  .handle_authority,
  .handle_cancel,
  .handle_set {
    .sc(14px, @fontColor);
    border-bottom: 1px solid @fontColor;
  }
  .block {
    padding: 0 30px;
    margin-top: 30px;
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
    border-radius: 10px;
    .dialog-container {
      width: 632px;
      height: 536px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.5);
      border-radius: 12px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: relative;
      .dialog_top {
        height: 66px;
        border-bottom: 1px solid #dddfe4;
      }
      .dialog_form {
        padding: 30px 60px 0 50px;
      }
      .popup_form {
        .el-form-item__content {
          margin-left: 0 !important;
        }
      }
    }
    .popup_btn {
      background-color: @mainColor;
      width: 128px;
      height: 40px;
      border-radius: 20px;
      text-align: center;
      margin: 0 auto;
      cursor: pointer;
    }
    .el-form-item {
      padding-right: 20px;
    }
    .role_list {
      width: 100%;
      height: 100%;
      font-size: 14px;
      color: #606266;
      margin-bottom: 22px;
      .el-select {
        width: 100%;
      }
    }
    .popup_form_btn {
      width: 60%;
      margin: 0 auto;
    }
  }
}
</style>