<template >
  <div class="login_page fillcontain" @keyup.enter="submitForm('loginForm')">
    <div class="login_top dfrcb">
      <div class="login_top_left drc color-150">
        <div class="login_img">
          <img :src="logo" alt="">
        </div>
        <div class="ml20">标大大后台管理系统</div>
      </div>
      <div class="login_top_right">亲爱的用户,欢迎您~</div>
    </div>
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="mb30 login_form color-150 fs28">登录</div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <div class="color-150 fs18 mb10">账号</div>
          <el-form-item prop="phone">
            <el-input v-model.number="loginForm.phone" placeholder="手机号" class="fs18 color-999">
            </el-input>
          </el-form-item>
          <div class="color-150 fs18 mb10">登录密码</div>
          <el-form-item prop="password">
            <el-input type="password" placeholder="请输入登录密码" v-model="loginForm.password" class="fs18 color-999"></el-input>
          </el-form-item>
          <!-- <el-checkbox class="mb40 fs18 color-666" v-model="checked" @click="seleckLogin">点击免15天登陆</el-checkbox> -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn fs24 fw600">登录</el-button>
          </el-form-item>
        </el-form>
        <p class="fs18 color-666">提示：忘记密码请联系管理员：</p>
      </section>
    </transition>
    <!-- <input
      type="text"
      autofocus="autofocus"
      class="logo-put"
      @keyup.enter="submitForm('loginForm')"
    /> -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { register, List, searchPower, siteNoticeNum } from "@/api/index";
import { checkPhone, setCookie, removeCookie, getCookies, timestampToTime } from "../public";

export default {
  data() {
    return {
      loginForm: {
        password: "",
        phone: ""
      },
      rules: {
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      showLogin: false,
      yAxisData: [],
      seriesData: [],
      checked: false,
      logo: require("../assets/img/logo.png"),
    };
  },
  mounted() {
    this.showLogin = true;
  },
  computed: {},
  directives: {
    focus: function(el) {
      el.focus();
    }
  },
  methods: {
    // ...mapActions(['getAdminData']),
    submitForm(formName) {
      this.$refs[formName].validate(valide => {
        // 只有校验通过，才执行函数
        if (valide) {
          register({
            phone: this.loginForm.phone,
            password: this.loginForm.password
          }).then(res => {
            // 如果成功要跳转至首页, 将token保存到localStorage, 将username保存到vuex的state中
            if (res.code === 1) {
              if(this.checked == false) {
                localStorage.setItem("Authorization", res.data);
              }else {
                this.checked = false;
                localStorage.setItem("checked",this.checked);
              }
              localStorage.setItem("phone", this.loginForm.phone);
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
    //首页站点数据优化;
    getTableNum() {
      this.yAxisData = [];
      this.seriesData = [];
      var time = timestampToTime(new Date()).slice(0,10);
      const params = {
        source: "",
        startDate: time,
        endDate: time
      };
      siteNoticeNum(params).then(res => {
        if (res.code == "1") {
          const { list, sumTotal } = res.data;
          this.total = sumTotal;
          if (list.length !== 0) {
            this.showEcharts = true;
            for (let i of list) {
              this.yAxisData.push(i.name);
              this.seriesData.push(i.siteCount);
              localStorage.setItem("yAxisData", this.yAxisData);
              localStorage.setItem("seriesData", this.seriesData);
            }
          } else {
            console.info("首页站点统计接口不通");
          }
        }
      });
    },
    seleckLogin() {
      this.checked = !this.checked;
    },
  },
  created() {
    // this.getTableNum();
  },
};
</script>

<style lang="less" scoped>
@import "../style/mixin";
.login_page {
  background: url("../assets/img/bg_login.png") no-repeat center center;
  background-size: 100% 100%;
  min-width: 1148px;
  .login_top {
    background-color: @fc;
    height: 64px;
    padding: 0 360px;
    .login_top_left {
      font-size: 20px;
      .login_img {
        width: 45px;
        height: 38px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .login_top_right {
      font-size: 18px;
      color: #5A5A5A;
    }
  }
}
.logo-put {
  opacity: 0;
}

.form_contianer {
  .wh(460px, 490px);
  .ctp(460px, 490px);
  padding: 20px 30px;
  border-radius: 5px;
  background-color: #fff;
  .submit_btn {
    width: 100%;
    font-size: 16px;
    background-color: @mainColor;
    border-color: @mainColor;
  }
  button {
    height: 60px;
  }
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
