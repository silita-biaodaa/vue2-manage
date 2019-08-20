<template>
  <div id="app" class="fillcontain">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
@import "./style/common";
@border-color: #ffffff;
.el-header {
  min-width: 600px;
}
.el-main {
  min-width: 1330px;
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
    .el-form-item {
      .el-form-item__content {
        line-height: 0 !important;
        tr {
          border-bottom-color: @border-color;
        }
      }
      .add_input {
        .el-input__inner {
          border: none;
          padding: 0;
        }
      }
      input::-webkit-input-placeholder {
        color: #509ee3;
        font-size: 12px;
      }
    }
  }
}
.el-message-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  .el-message-box__title{
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
</style>
