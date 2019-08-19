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
      .el-input__inner {
        border: none;
      }
      input::-webkit-input-placeholder {
        color: #509ee3;
        font-size: 12px;
      }
    }
  }
}
</style>
