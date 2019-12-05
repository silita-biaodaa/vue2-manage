<template>
  <div class="dialog userPopup" v-if="showMask" @keyup.enter="submitForm('ruleForm')">
    <el-form :model="ruleForm" ref="ruleForm">
      <div class="dialog-container pb30">
        <div class="dfrcb ft20 dialog_top">
          <div class="dialog-title ml30">查看详情</div>
          <i class="el-icon-close fs14 mr30"></i>
        </div>
        <div class="user_table">
          <div class="dfrcb">
            <div class="fs14 color-150 mt20 mb20 fw600">个人信息</div>
          </div>
          <table class="user_info">
            <tr>
              <td>手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：{{infoList.phoneNo ? infoList.phoneNo: '暂无'}}</td>
              <td>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：{{infoList.nikeName ? infoList.nikeName: '暂无'}}</td>
              <td>
                <div class="drc">
                  <span>头&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;像：</span>
                  <img :src="infoList.imageUrl?infoList.imageUrl: ''" />
                </div>
              </td>
            </tr>
            <tr>
              <td>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：{{infoList.userName ? infoList.userName: '暂无' }}</td>
              <td>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：{{infoList.sex ? (infoList.sex == "2" ? "其他" : (infoList.sex == "0" ? "女":"男") ): '暂无'}}</td>
              <td>出生年月：{{infoList.birthYear ? infoList.birthYear : '暂无'}}</td>
            </tr>
            <tr>
              <td>所在城市：{{infoList.inCity ? infoList.inCity: '暂无'}}</td>
              <td>所在公司：{{infoList.inCompany ? infoList.inCompany: '暂无'}}</td>
              <td>担任职位：{{infoList.POSITION ? infoList.POSITION: '暂无'}}</td>
            </tr>
            <tr>
              <td>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：{{infoList.email ? infoList.email: '暂无'}}</td>
              <td>邀 请 人 ：{{infoList.inviterPhone ? infoList.inviterPhone: '暂无'}}</td>
              <td>注册时间：{{infoList.created ? infoList.created: '暂无'}}</td>
            </tr>
          </table>
          <div class="dfrcb form_remarks">
            <el-form-item prop="remarks">
              <div class="drc add_input">
                <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                <el-input
                  v-model="ruleForm.remarks"
                  placeholder="添加备注"
                  type="textarea"
                  style="width: 60%;"
                ></el-input>
              </div>
            </el-form-item>
          </div>

          <el-row>
            <el-col>
              <div class="drc mt40 mb20">
                <span class="fs14 color-150 fw600">会员信息</span>
                <span v-if="allow || feed" class="member_num" @click="sendDays">赠送会员天数</span>
              </div>
              <div class="popup_scollbar">
                <el-table class="popup_table" :data="memberData" :header-cell-style="headClass">
                  <el-table-column label="时间" align="center">
                    <template slot-scope="scope">
                      <span>{{ scope.row.created }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="用户行为" align="center">
                    <template slot-scope="scope">
                      <span>{{ scope.row.behavior }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="获得会员权益" align="center">
                    <template slot-scope="scope">
                      <span>{{ scope.row.vipDay }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="会员到期日" align="center">
                    <template slot-scope="scope">
                      <span>{{ scope.row.expiredDate }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>
          <el-row class="invit_user">
            <el-col>
              <div class="drcb mt40 mb20">
                <span class="fs14 color-150 mt20 mb20 fw600">被邀请人信息({{invitNum}})</span>
              </div>
              <div class="popup_scollbar">
                <el-table
                  class="popup_table"
                  :data="invitData"
                  align="center"
                  :header-cell-style="headClass"
                >
                  <el-table-column label="手机" align="center">
                    <template slot-scope="scope">
                      <span>{{ scope.row.phoneNo }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="姓名" align="center">
                    <template slot-scope="scope">
                      <span>{{ scope.row.loginName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="所在公司" align="center">
                    <template slot-scope="scope">
                      <span>{{ scope.row.inCompany }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="注册时间" align="center">
                    <template slot-scope="scope">
                      <span>{{ scope.row.created }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="用户类别" align="center">
                    <template slot-scope="scope">
                      <span>{{ scope.row.userType }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="VIP到期时间" align="center">
                    <template slot-scope="scope">
                      <span>{{ scope.row.expiredDate }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>
          <div class="close-btn" @click="closeMask">
            <i class="iconfont icon-close"></i>
          </div>
        </div>
        <el-form-item class="keep_btn mt20">
          <div class="popup_btn">
            <div v-if="allow || feed" class="fs18 color-999 cp" @click="closeMask">取消</div>
            <button
              type="primary"
              @click="submitForm('ruleForm')"
              v-if="allow || feed"
              class="fs18 color-fff cp ml30"
            >确定</button>
          </div>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import {
  personInfo,
  invitInfo,
  addVip,
  vipInfo,
  userRemarks
} from "@/api/index";
import { timestampToTime } from "../public";
import { debug } from "util";
import { fail } from "assert";
export default {
  props: {
    personList: {
      type: Object,
      default: ""
    },
    value: {},
    // 类型包括 defalut 默认， danger 危险， confirm 确认，
    type: {
      type: String,
      default: "default"
    },
    activeUser: {
      type: String,
      default: ""
    },
    feedBack: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      showMask: true,
      infoList: "",
      memberData: [],
      invitData: [],
      invitNum: "",
      ruleForm: {
        remarks: ""
      },
      feed: false,
      allow: null
    };
  },
  methods: {
    invit() {
      invitInfo({ ownInviteCode: this.$parent.personList.ownInviteCode }).then(
        res => {
          if (res.code == "1") {
            const { total, list } = res.data;
            this.invitNum = total;
            if (list.length > 0) {
              for (let i of list) {
                i.created = i.created.slice(0, 10);
              }
            }
            this.invitData = list;
          } else {
            console.info("邀请人信息接口不通");
          }
        }
      );
    },
    member() {
      vipInfo({
        userId: this.$parent.personList.pkid
          ? this.$parent.personList.pkid
          : this.$parent.personList.userId
      }).then(res => {
        if (res.code == "1") {
          const { data } = res;
          if (data.length) {
            for (let i of data) {
              i.created = timestampToTime(i.created);
            }
          }
          this.memberData = data;
        } else {
          console.info("会员信息接口不通");
        }
      });
    },
    person() {
      personInfo({
        pkid: this.$parent.personList.pkid
          ? this.$parent.personList.pkid
          : this.$parent.personList.userId
      }).then(res => {
        if (res.code == "1") {
          const { data } = res;
          data.created = timestampToTime(data.created).slice(0, 10);
          this.infoList = data;
          this.ruleForm.remarks = data.remark;
        } else {
          console.info("个人用户信息接口不通");
        }
      });
    },
    sendDays() {
      const h = this.$createElement;
      // 置空备注
      //自动聚焦
      if (this.$parent.activeUser) {
        //置空输入框;
        let inputVal = document.getElementsByTagName("input")[6];
        if (inputVal) {
          document.getElementsByTagName("input")[6].value = "";
        }
      } else {
        //置空输入框;
        let inputVal = document.getElementsByTagName("input")[8];
        if (inputVal) {
          document.getElementsByTagName("input")[8].value = "";
        }
      }
      this.$msgbox({
        title: "赠送会员",
        message: h("p", null, [
          h("div", null, "赠送手机号码为：" + this.$parent.personList.phoneNo),
          h("input", { style: "text-align: center;" }),
          h("span", null, "天体验会员")
        ]),
        customClass: "msgBox",
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            //活跃用户输入框在第七位;
            if (this.$parent.activeUser) {
              var value = document.getElementsByTagName("input")[6].value;
            } else {
              var value = document.getElementsByTagName("input")[8].value;
            }
            var regu = /^[0-9]+\.?[0-9]*$/;
            console.info("value", value);
            if (
              value.length == "" ||
              !regu.test(value) ||
              value == "0" ||
              value == "00" ||
              value.indexOf(".") != -1
            ) {
              this.$message({
                type: "warning",
                message: "请输入1到99的整数"
              });
            } else if (value.length >= 3) {
              this.$message({
                type: "warning",
                message: "最多输入99天"
              });
            } else {
              addVip({
                vipDay: value,
                userId: this.$parent.personList.pkid
              }).then(res => {
                if (res.code == "1") {
                  done();
                  this.$message({
                    type: "success",
                    message: "赠送成功"
                  });
                  this.member();
                } else {
                  console.info("赠送会员接口不通");
                }
              });
            }
          } else {
            done();
          }
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          userRemarks({
            pkid: this.$parent.personList.pkid,
            remark: this.ruleForm.remarks
          }).then(res => {
            if (res.code == "1") {
              this.$message({
                type: "success",
                message: "添加成功"
              });
              this.person();
            } else {
              console.info("添加备注接口不通");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    closeMask() {
      //向父组件传值，若为关闭则刷新页面;
      this.$emit("refesh", this.showMask);
      this.showMask = false;
      this.ruleForm.remarks = "";
    },
    headClass() {
      return "text-align: center;background:#DDDFE4;color: #000000";
    },
  },
  mounted() {
    this.showMask = this.value;
    if (this.$parent.hideMask) {
      this.feed = false;
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.showMask = newVal;
    },
    showMask(val) {
      this.$emit("input", val);
    },
    //父组件中获取的数据
    personList() {
      if (this.$parent.personList) {
        this.allow = this.$parent.isAllows;
        this.person();
        this.invit();
        this.member();
      }
    }
  },
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
    width: 1180px;
    height: 770px;
    background: @whiteColor;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: relative;
    border-radius: 12px;
    box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.5);
    .dialog_top {
      height: 66px;
      border-bottom: 1px solid #dddfe4;
    }
    .dialog-title {
      display: inline-block;
      height: 66px;
      line-height: 66px;
      font-size: 18px;
      color: #150000;
      font-weight: 600;
      box-sizing: border-box;
    }
    .member_num {
      color: @fontColor;
      margin-left: 20px;
      cursor: pointer;
      font-size: 12px;
      padding: 0 10px;
      border: 1px solid @fontColor;
      border-radius: 4px;
    }
    .el-icon-close {
      size: 16px;
    }
    .inp {
      margin: 10px 0 0 20px;
      width: 200px;
      height: 40px;
      padding-left: 4px;
      border-radius: 4px;
      border: none;
      background: #efefef;
      outline: none;
      &:focus {
        border: 1px solid #509ee3;
      }
    }
    .close-btn {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 18px;
      cursor: pointer;
      &:hover {
        font-weight: 600;
      }
    }
  }
  .user_table {
    height: 650px;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 0 50px;
    .user_info {
      border-bottom: none;
      // text-align: right;
      .keep_btn {
        .el-button--primary {
          height: 30px;
          line-height: 0;
        }
      }
      width: 100%;
      .el-form-item {
        margin: 0;
        line-height: 0;
        height: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      tr {
        img {
          width: 30px;
          height: 30px;
        }
        td {
          padding: 12px 10px;
          width: 33%;
          padding-left: 50px;
        }
      }
    }
  }
  .user_table::-webkit-scrollbar {
    display: none;
  }
  .popup_table {
    border: 1px solid #ddd;
    border-bottom: none;
  }
  // .popup_scollbar {
  //   max-height: 110px;
  //   overflow-x: hidden;
  //   overflow-y: scroll;
  //   border: 1px solid #ffffff;
  // }
  // .popup_scollbar::-webkit-scrollbar {
  //   display: none;
  // }
  .popup_btn {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    button {
      width: 128px;
      height: 40px;
      border-radius: 20px;
      background-color: @mainColor;
    }
  }
}
</style>