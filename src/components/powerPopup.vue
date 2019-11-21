<template>
  <div class="dialog" v-show="showMask">
    <div class="dialog-container"  @keyup.enter="submitForm('ruleForm')">
      <div class="dfrcb ft20 mb10">
        <div style="margin: 0 auto;">权限管理</div>
        <i class="el-icon-close" @click="hideMask"></i>
      </div>
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="角色名称：" prop="role">
          <el-input v-model="ruleForm.role" placeholder="请输入" autocomplete="new-password"></el-input>
        </el-form-item>
        <el-form-item class="popup_form">
          <div class="pl20">
            <div class="popup_title">权限:</div>
            <div class="bg-fff popup_scollbar">
              <el-tree :data="powerData" show-checkbox :props="defaultProps" default-expand-all ref="tree" node-key="id">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span class="ml10">{{ node.label }}</span>
                  <span>
                    <span :class="data.id > 10000 ? '': 'hidden'"><input type="radio" class="select_power" :checked="data.currentStage == '1' ? true: false" :name="data.id" @click="() => 
                    ready(node,data)" /><span>只读</span></span>
                    <span :class="data.id > 10000 ? '': 'hidden'"><input type="radio" class="select_power ml10"  :checked="data.currentStage == '2' ? true: false" :name="data.id" @click="() => 
                    operate(node,data)" /><span>可操作</span></span>
                  </span>
                </span>
              </el-tree>
            </div>
          </div>
        </el-form-item>
        <el-form-item class="popup_form_btn pl20">
          <div class="popup_btn color-fff" @click="submitForm('ruleForm')">保存</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { roleAll, addRole, powerRole, searchRole } from "@/api/index";
import { timestampToTime, checkPhone } from "../public";
import { debug, debuglog } from "util";
import { fail } from "assert";
export default {
  props: {
    value: {},
  },
  data() {
    return {
      showMask: true,
      labelPosition: "right",
      powerData: [],
      defaultProps: {
        children: 'data',
        label: 'title'
      },
      radio: "",
      ruleForm: {
        role: ""
      },
      rules: {
        role: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    hideMask() {
      //向父组件传值，若为关闭则刷新页面;
      this.showMask = false;
      this.ruleForm.role = "";
      //tree选中的节点置空;
      this.$refs.tree.setCheckedNodes([]);
    },
    searchPower() {
      searchRole({}).then(res => {
        if(res.code == '1') {
          for(let i = 0; i<res.data.length;i++) {
           for(let j=0;j<res.data[i].data.length;j++) {
            res.data[i].data[j].currentStage = '3';
            }
          }
        this.powerData = res.data;
        }else {
          console.info('添加权限接口不通');
        }
      })
    },
    operate(node,data) {
      data.currentStage = "2";
    },
    ready(node,data) {
      data.currentStage = "1";
    },
    submitForm(formName) {
      //一级菜单过滤,一级菜单为四位数;
      var treeList = this.$refs.tree.getCheckedKeys().filter(x => {
        return x > 10000;
      })
      this.$refs[formName].validate(valid => {
        var result = '';
        for(let i =0 ; i < this.powerData.length; i++) {
          for(let j =0 ; j < this.powerData[i].data.length; j++) {
            for(let a of treeList) {
              //当前选择的id筛选;
              if(a == this.powerData[i].data[j].id) {
                var id = a;
                var value = "";
                if(this.powerData[i].data[j].currentStage == "2"){
                  value = "operability";
                }else {
                  value = "read";
                }
                if(result == ""){
                  result = `${id}/${value}`
                }else{
                  result +=`,${id}/${value}`
                }
              }
            }
          }
        }
        if (valid) {
          const params = {
            desc: this.ruleForm.role,
            ids: result,
          };
          powerRole(params).then(res => {
            if(res.code == '1') {
              this.showMask = false;
              //向父组件传值，若创建成功则刷新列表；
              this.$emit("refesh", this.showMask);
              this.ruleForm.role = "";
              this.powerData= [];
              this.$refs.tree.setCheckedNodes([]);
              this.searchPower();
            }else {
              this.$message({
                type: "warning",
                message: res.msg,
              });
            }
          })
        } else {
          return false;
        }
      });
    },
  },
  mounted() {
    this.showMask = this.value;
  },
  created() {
    this.searchPower();
  },
  watch: {
    value(newVal, oldVal) {
      this.showMask = newVal;
    },
    showMask(val) {
      this.$emit("input", val);
    },
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
    .popup_form {
      .el-form-item__content {
        margin-left: 0 !important;
      }
      .popup_title {
        color: #606266;
      }
    }
    .popup_scollbar {
      background-color: #ffffff;
      .el-tree {
        max-height: 400px;
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
  .popup_table {
    border: 1px solid #ddd;
  }
  .popup_scollbar {
    max-height: 500px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .popup_scollbar::-webkit-scrollbar {
    display: none;
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
  .hidden {
    visibility: hidden;
  }
}
</style>