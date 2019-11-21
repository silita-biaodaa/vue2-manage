<template>
  <div class="dialog" v-show="showMask">
    <div class="dialog-container">
      <div class="dfrcb ft20 mb10">
        <div style="margin: 0 auto;">新增账号</div>
        <i class="el-icon-close" @click="hideMask"></i>
      </div>
      <div @keyup.enter="submitForm('ruleForm')">
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入手机号" autocomplete="new-password"></el-input>
          </el-form-item>
          <el-form-item label="部门：" prop="depart">
            <el-input v-model="ruleForm.depart" placeholder="请输入部门"></el-input>
          </el-form-item>
          <el-form-item label="岗位：" prop="jobs">
            <el-input v-model="ruleForm.jobs" placeholder="请输入岗位"></el-input>
          </el-form-item>
          <el-row type="flex">
            <el-col :span="4" class="role_list">
              角色：
              <el-select v-model="desc" class="ml10">
                <el-option
                  v-for="item in role"
                  :key="item.rid"
                  :label="item.desc"
                  :value="item.desc"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-form-item class="popup_form_btn pl20">
            <div class="popup_btn color-fff mb20" @click="submitForm('ruleForm')">保存</div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { roleAll, addAccount, updateAccount } from "@/api/index";
import { timestampToTime, checkPhone } from "../public";
import { debug } from "util";
import { fail } from "assert";
export default {
  props: {
    value: {},
    roleInfo: {
      type: Object,
      default: ""
    }
  },
  data() {
    return {
      showMask: true,
      role: "",
      desc: "",
      id: "",
      showList: null,
      ruleForm: {
        name: "",
        phone: "",
        passWord: "12345678",
        depart: "",
        jobs: ""
      },
      rules: {
        name: [{ required: true, message: "请输入名字", trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
        depart: [{ message: "请输入部门", trigger: "blur" }],
        jobs: [{ message: "请输入岗位", trigger: "blur" }]
      },
      labelPosition: "right"
    };
  },
  methods: {
    hideMask() {
      this.showMask = false;
      this.ruleForm = {
        name: "",
        phone: "",
        passWord: "12345678",
        depart: "",
        jobs: ""
      };
      this.desc = "";
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.desc == "") {
            this.$message({
              type: "warning",
              message: "请选择角色名称"
            });
          } else {
            for (let i of this.role) {
              if (this.desc == i.desc) {
                this.id = i.rid;
              }
            }
            const { name, phone, passWord, depart, jobs } = this.ruleForm;
            const params = {
              realName: name,
              phone: phone,
              password: passWord,
              department: depart,
              post: jobs,
              rid: this.id
            };
            addAccount(params).then(res => {
              if (res.code == "1") {
                this.$message({
                  type: "success",
                  message: "创建成功!"
                });
                this.showMask = false;
                //向父组件传值，若为关闭则刷新页面;
                this.$emit("refesh", this.showMask);
                this.ruleForm = {
                  name: "",
                  phone: "",
                  passWord: "12345678",
                  depart: "",
                  jobs: ""
                };
                this.desc = "";
              } else {
                this.$message({
                  type: "warning",
                  message: res.msg
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    this.showMask = this.value;
  },
  created() {
    this.getRole();
  },
  watch: {
    value(newVal, oldVal) {
      this.showMask = newVal;
    },
    showMask(val) {
      this.$emit("input", val);
    },
    //父组件中获取的数据
    roleInfo() {
      if (this.$parent.roleInfo) {
        this.showList = this.$parent.roleInfo;
        const {
          realName,
          department,
          post,
          desc,
          phone
        } = this.$parent.roleInfo;
        this.ruleFormEdit = {
          name: realName,
          depart: department,
          jobs: post,
          phone: phone
        };
        this.desc = desc;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../style/mixin";
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
    .popup_form {
      .el-form-item__content {
        margin-left: 0 !important;
      }
    }
  }
  .popup_btn {
    background-color: #409eff;
    width: 100%;
    text-align: center;
    margin-right: 20px;
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
    padding-left: 45px;
    margin-bottom: 22px;
  }
  .popup_form_btn {
    width: 60%;
    margin: 0 auto;
  }
}
</style>