<template>
  <div class="passWord" @keyup.enter="submitForm('ruleForm')">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="fs16 fw600">修改密码</span>
      </div>
        <el-form label-width="120px" :model="ruleForm" class="pr30 fs16 color-150" :rules="rules" ref="ruleForm">
          <el-form-item label="手机号码：" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入您的手机号"></el-input>
          </el-form-item>
          <el-form-item label="原密码：" prop="oldPsd">
            <el-input show-password v-model="ruleForm.oldPsd" placeholder="请输入原密码" auto-complete="new-password"></el-input>
          </el-form-item>
          <el-form-item label="新密码：" prop="newPsd">
            <el-input show-password v-model="ruleForm.newPsd" placeholder="请输入新密码" auto-complete="new-password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="confirmPsd">
            <el-input show-password v-model="ruleForm.confirmPsd" placeholder="请再次输入密码" auto-complete="new-password"></el-input>
          </el-form-item>
          <el-form-item class="mt80">
            <div class="pad_btn color-fff text-c cp fs18" @click="submitForm('ruleForm')">保存</div>
          </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>
<script>
import { checkPhone, getCookies } from "../public";
import { updatePsd } from "@/api/index";
import { METHODS } from "http";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.confirmPsd !== "") {
          this.$refs.ruleForm.validateField("confirmPsd");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPsd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        phone: "",
        oldPsd: "",
        newPsd: "",
        confirmPsd: "",
      },
      rules: {
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        oldPsd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        newPsd: [{ required: true, validator: validatePass, trigger: "blur" }],
        confirmPsd: [{ required: true, validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { phone, oldPsd, newPsd } = this.ruleForm;
          const params = {
            phone: phone,
            password: oldPsd,
            newpassword: newPsd
          };
          updatePsd(params).then(res => {
            if (res.code == "1") {
              this.$message({
                type: "success",
                message: "修改密码成功!"
              });
              this.$router.push('/login');
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
    addAttribute() {
      console.info('this.oldPsd',this.oldPsd);
    }
  },
  created() {
    this.ruleForm.phone = localStorage.getItem("phone");
  }
};
</script>
<style scoped lang="less">
@import "../style/mixin";
.passWord {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  .box-card {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    .el-form-item {
      margin-bottom: 30px !important;
    }
  }
  .pad_btn {
    width: 400px;
    height: 48px;
    line-height: 48px;
    background-color: @mainColor;
    div {
      cursor: pointer;
    }
  }
}
</style>