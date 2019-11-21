<template>
  <div class="dialog" v-show="showMask">
    <div class="dialog-container pb40">
      <div @keyup.enter.native="submitForm('ruleForm')">
        <div class="dfrcb dialog_title pl30 pr30">
          <div class="fs16 color-150 fw600">添加别名</div>
          <i class="el-icon-close fs14 cp" @click="cancelMask"></i>
        </div>
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item label="资质别名:" prop="name" class="dialog_form">
            <el-input clearable v-model="ruleForm.name" placeholder="请输入别名"></el-input>
          </el-form-item>
          <el-form-item class="text-c handle_btn">
            <button class="handle_cancle bg-fff fs18 color-999 cp" plain @click="cancelMask">取消</button>
            <button class="handle_confirm color-fff fs18 ml30 cp" type="primary" @click="submitForm('ruleForm')">确定</button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { addAliasName } from "@/api/index";
export default {
  props: {
    value: {},
    mainQual: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      showMask: false,
      repeated: true,
      labelPosition: "right",
      radio: "",
      ruleForm: {
        name: ""
      },
      rules: {
        name: [{ required: true, message: "请输入别名", trigger: "blur" }]
      }
    };
  },
  methods: {
    cancelMask() {
      this.showMask = false;
      this.ruleForm.name = "";
      //向父组件传值，若为关闭则刷新页面;
      this.$emit("refesh", this.showMask);
    },
    submitForm(formName) {
      if(this.repeated) {
        this.repeated = false;
        this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            stdCode: this.$parent.code,
            name: this.ruleForm.name,
            stdType: this.$parent.mainQual == "mainQual"?"1":"3"
          };
          addAliasName(params).then(res => {
            if (res.code == "1") {
              this.repeated = true;
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              //清空输入框;
              this.ruleForm.name = "";
              this.cancelMask();
            } else {
              this.repeated = true;
              this.$message({
                type: "warning",
                message: res.msg
              });
              console.info("添加别名接口不通");
            }
          });
        }
      });
      }
    }
  },
  mounted() {
    this.showMask = this.value;
  },
  created() {},
  watch: {
    value(newVal, oldVal) {
      this.showMask = newVal;
    },
    showMask(val) {
      this.$emit("input", val);
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
    width: 632px;
    background: #fff;
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
  }
  .hidden {
    visibility: hidden;
  }
}
</style>