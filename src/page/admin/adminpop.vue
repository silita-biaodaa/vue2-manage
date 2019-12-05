<template>
  <div class="adminpop">
    <div class="dialog-container">
      <!-- 标题 -->
      <div class="dfrcb ft20 pl30 pr30 dialog_top">
        <div class="fs16 color-150 fw600">权限管理</div>
        <i class="el-icon-close fs16 cp" @click="closeMask"></i>
      </div>
      <!-- 列表 -->
      <div class="dialog_form">
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="ruleFormEdit"
          :rules="rulesEdit"
          ref="ruleFormEdit"
        >
          <div class="form_top">
            角色名称：
            <input type="text" :disabled="disabled" v-model="roleName" />
          </div>

          <div class="form_title">权限</div>

          <div class="form_Alist">
            <div
              v-for="(el,i) of list"
              :key="i"
              style=" marginBottom: 10px"
              v-if="el.title != '首页' && el.title != '修改密码' "
              :class="el.show ? 'show' : 'close'"
            >
              <div class="form_list">
                <div class="list-left">
                  <div @click="listup(el)">
                    <img src="../../assets/img/water.png" v-if="el.allshow  == false" alt />
                    <img src="../../assets/img/all.png" v-else alt />
                  </div>

                  <span>全选</span>
                  <span class="lits-title">{{el.title}}</span>
                </div>
                <div @click="opClose(el)">
                  <img src="../../assets/img/upper.png" v-if="el.show" alt />
                  <img src="../../assets/img/lower.png" v-else alt />
                </div>
              </div>
              <div class="form-rule" v-for="(o,l) in el.data" :key="l">
                <div class="list-left">
                  <div @click="listlow(el,o)">
                    <img src="../../assets/img/water.png" v-if="o.optiond == null" alt />
                    <img src="../../assets/img/all.png" v-else alt />
                  </div>
                  <span>{{o.title}}</span>
                </div>
                <div class="rule-opera">
                  <div class="list-left" @click="listread(el,o)">
                    <img src="../../assets/img/solid.png" v-if="o.optiond == 'read'" alt />
                    <img src="../../assets/img/hollow.png" v-else alt />
                    <span>只读</span>
                  </div>
                  <div class="list-left" style="marginLeft: 15px" @click="listoper(el,o)">
                    <img src="../../assets/img/solid.png" v-if="o.optiond == 'operability'" alt />
                    <img src="../../assets/img/hollow.png" v-else alt />
                    <span>可操作</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <div class="form_btn">
        <div class="role-btn" @click="savelist">保存</div>
      </div>
    </div>
  </div>
</template>
<script>
import { searchPower, editPower, searchRole, powerRole } from "@/api/index";

export default {
  data() {
    return {
      labelPosition: "right",
      rolePower: "",
      role: [],
      ruleFormEdit: {
        roles: ""
      },
      rulesEdit: {
        roles: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
      },
      roleName: "",
      detail: {},
      list: [],
      disabled: false
    };
  },
  methods: {
    closeMask() {
      // 窗口关闭
      this.$emit("closePop", {});
    },
    changetable() {
      // 当选择用户改变时
    },
    gainList() {
      searchPower({ rid: this.detail.rid }).then(res => {
        if (res.code == 1) {
          for (var i of res.data) {
            if (i.data.length >= 1) {
              for (var o of i.data) {
                i.show = false;
                if (o.optiond == null) {
                  i.allshow = false;
                  break;
                } else {
                  i.allshow = true;
                }
              }
            } else {
              i.allshow = false;
            }
          }
          this.list = res.data;
        }
      });
    },
    emputLits() {
      searchRole({}).then(res => {
        if (res.code == 1) {
          for (var i of res.data) {
            if (i.data.length >= 1) {
              for (var o of i.data) {
                i.show = false;
                o.optiond == null;
                i.allshow = false;
              }
            } else {
              i.allshow = false;
            }
          }
          this.list = res.data;
        }
      });
    },
    listlow(el, o) {
      if (o.optiond == null) {
        o.optiond = "read";
        for (var i of el.data) {
          if (i.optiond == null) {
            el.allshow = false;
            break;
          } else {
            el.allshow = true;
          }
        }
      } else {
        o.optiond = null;
        el.allshow = false;
      }
    },
    listup(el) {
      if (el.allshow == false) {
        el.allshow = true;
        for (var i of el.data) {
          if (i.optiond == null) {
            i.optiond = "read";
          }
        }
        el.show = true;
      } else {
        el.allshow = false;
        for (var i of el.data) {
          i.optiond = null;
        }
      }
    },
    listread(el, o) {
      o.optiond = "read";
      for (var i of el.data) {
        if (i.optiond == null) {
          el.allshow = false;
          break;
        } else {
          el.allshow = true;
        }
      }
    },
    listoper(el, o) {
      o.optiond = "operability";
      for (var i of el.data) {
        if (i.optiond == null) {
          el.allshow = false;
          break;
        } else {
          el.allshow = true;
        }
      }
    },
    savelist() {
      let arr = [];
      for (var i of this.list) {
        if (i.data.length >= 1) {
          for (var o of i.data) {
            if (o.optiond != null) {
              arr.push(o.id + "/" + o.optiond);
            }
          }
        }
      }
      let str = arr.join(",");
      if (this.type == 1) {
        editPower({
          rid: this.detail.rid,
          desc: this.detail.desc,
          ids: str
        }).then(res => {
          if (res.code == 1) {
            this.$emit("closePop", { txt: "1" });
          }
        });
      } else {
        if (this.roleName.trim() == "") {
          this.$message({
            message: "请输入角色名称",
            type: "warning"
          });
          return;
        }
        powerRole({ desc: this.roleName, ids: str }).then(res => {
          if (res.code == 1) {
            this.$emit("closePop", { txt: "2" });
          }
        });
      }
    },
    opClose(el) {
      el.show = !el.show;
    }
  },
  props: {
    obj: {
      default: {}
    },
    type: {
      default: 1
    }
  },
  mounted() {},
  created() {
    if (this.type == 1) {
      this.detail = this.obj;
      this.roleName = this.detail.desc;
      this.gainList();
      this.disabled = true;
    } else {
      this.disabled = false;
      this.emputLits();
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../style/mixin";
.adminpop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
  .dialog-container {
    width: 920px;
    max-height: 769px;
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
      padding: 0 60px 50px;
      border-bottom: 1px solid #dddfe4;

      .form_top {
        height: 96px;
        line-height: 96px;
        border-bottom: 1px solid #dddfe4;
        font-size: 16px;
        input {
          border: 1px solid rgba(221, 223, 228, 1);
          width: 418px;
          height: 48px;
          padding: 0 20px;
        }
      }
      .popup_form {
        border-bottom: 1px solid #dddfe4;
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
    .form_title {
      line-height: 57px;
      font-size: 16px;
      color: #150000;
    }

    .form_list {
      height: 48px;
      background: rgba(244, 244, 244, 1);
      border: 1px solid rgba(221, 223, 228, 1);
      padding: 0 21px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .list-left {
      font-size: 14px;
      color: #424040;
      display: flex;
      align-items: center;
      img {
        margin-right: 8px;
      }
      .lits-title {
        margin-left: 15px;
        font-size: 16px;
        font-weight: 600;
      }
    }
    .form-rule {
      height: 47px;
      border: 1px solid rgba(221, 223, 228, 1);
      border-top: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px 0 73px;
      .rule-opera {
        display: flex;
        img {
          margin-right: 10px;
        }
      }
    }
  }
  .form_Alist {
    max-height: 380px;
    overflow-x: auto;
    .close {
      height: 48px;
      overflow: hidden;
    }
    .show {
      height: auto;
    }
  }
  .form_Alist::-webkit-scrollbar {
    display: none;
  }
  .form_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 96px;
    .role-btn {
      width: 128px;
      height: 40px;
      background: rgba(56, 56, 56, 1);
      border-radius: 20px;
      font-size: 18px;
      color: rgba(255, 255, 255, 1);
      line-height: 40px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>