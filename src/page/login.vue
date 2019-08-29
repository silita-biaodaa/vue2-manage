<template >
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer">
        <div class="manage_tip">
          <p>标大大后台管理系统</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" v-show="showLogin">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <!-- <el-form-item>
             <div class="forget_word fr" @click="fogetWord">忘记密码？</div>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn" @keyup.enter.native="submitForm('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
        <p class="tip">温馨提示：</p>
        <p class="tip">注册过的用户可凭账号密码登录</p>
      </section>
    </transition>
    <el-input type="text" v-focus class="logo-put" @keyup.enter.native="submitForm('loginForm')"></el-input>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { register } from "@/api/index";
import { fail } from 'assert';

export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      showLogin: false,
    };
  },
  mounted() {
    this.showLogin = true;
  },
  directives: {
    focus: function(el) {
      el.focus();
    }
  },
  methods: {
    //登录提交表单;
    submitForm(formName) {
      this.$refs[formName].validate(valide => {
        // 只有校验通过，才执行函数
        if (valide) {
          register({
            userName: this.loginForm.username,
            password: this.loginForm.password
          }).then(res => {
            // 如果成功要跳转至首页, 将token保存到localStorage, 将username保存到vuex的state中
            if (res.code === 1) {
              localStorage.setItem("Authorization", res.data);
              this.$router.push({ name: "home" });
            } else {
              // 如果失败，展示提示信息
              this.$message({
                type: "error",
                message: res.msg
              });
            }
          });
        } else {
          console.log("校验不通过");
        }
      });
  },
  //找回密码表单
  },
  watch: {}
};
</script>

<style lang="less" scoped>
@import "../style/mixin";
.login_page {
  background-color: #324057;
}
.logo-put {
  opacity: 0;
}
.manage_tip {
  position: absolute;
  width: 100%;
  top: -100px;
  left: 0;
	z-index: 99;
  p {
    font-size: 34px;
    color: #fff;
  }
}

.form_contianer {
  .ctp(320px, 210px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  width: 320px;
  .forget_word {
    .sc(14px,#0033FF);
    cursor: pointer;
    line-height: 1;
  }
  .submit_btn {
    width: 100%;
    font-size: 16px;
  }
}

.tip {
  font-size: 12px;
  color: red;
}

.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}

.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>
