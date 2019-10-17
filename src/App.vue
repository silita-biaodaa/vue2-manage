<template>
  <div id="app" class="fillcontain">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
};
</script>

<style lang="less">
@import "./style/common";
@border-color: #ffffff;
.el-header {
  min-width: 1330px;
}
.el-main {
  min-width: 1330px;
  height: 100%;
}
.el-textarea {
  .el-textarea__inner {
    resize: none;
    -ms-overflow-style: none;
  }
}
textarea::-webkit-scrollbar {
  display: none;
}
.dialog {
  tr {
    border-top-color: @border-color;
    border-left-color: @border-color;
    border-right-color: @border-color;
    font-size: 14px;
    color: #909399;
    font-weight: 700;
  }
  .el-form {
    width: 100%;
    height: 100%;
    .form_remarks {
      border-bottom: 1px solid #ddd;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      background-color: @border-color;
      .el-form-item {
        margin-bottom: 0;
        .el-form-item__content {
          line-height: 0 !important;
          tr {
            border-bottom-color: @border-color;
          }
        }
        .add_input {
          padding-left: 10px;
          span {
            font-size: 14px;
            color: #909399;
            font-weight: 700;
          }
          .el-form-item {
            height: 30px;
            margin-bottom: 0;
          }
          .el-textarea {
            .el-textarea__inner {
              width: 700px;
              padding: 0;
              resize: none;
              max-height: 200px !important;
              overflow-y: scroll;
              overflow: auto;
            }
          }
        }
      }
      input::-webkit-input-placeholder {
        color: #509ee3;
        font-size: 12px;
      }
    }
  }
  .popup_form,
  .popup_form_btn {
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
}
.el-message-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  .el-message-box__title {
    span {
      font-size: 18px;
    }
  }
  span {
    font-size: 15px;
  }
  input {
    border: 1px solid #ddd;
    height: 30px;
    width: 40px;
    border-radius: 6px;
    margin: 0 5px;
  }
}
.evaluation .dialog .el-form-item {
  padding: 0 !important;
}
.evaluation, .mainQualification, .level, .parsing {
  .handle_btn {
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
}
.mainQualification,
.level {
  .right_list {
    .el-table__empty-block {
      display: none;
    }
    .el-table td,.el-table th.is-leaf {
      border: none !important;
      padding: 5px 0;
    }
  }
}
</style>
