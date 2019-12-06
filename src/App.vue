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
@import "./style/mixin";
@border-color: #ffffff;
@color: #dddfe4;
@font_Color: #b6b6b6;
@inputHeight: 48px;
/* 解决element-ui的table表格控件表头与内容列不对齐问题 */
.el-table th.gutter{
  display: table-cell !important;
}
.el-header {
  min-width: 1330px;
}
.el-main {
  min-width: 1330px;
  height: 100%;
  background-color: @bgColor;
}
.el-textarea {
  .el-textarea__inner {
    resize: none;
    -ms-overflow-style: none;
  }
}
.el-submenu__title {
  background-color: @mainColor !important;
}
.el-range-editor .el-range-input {
  font-size: 14px;
  height: @inputHeight;
}
.el-range-editor.el-input__inner {
  height: @inputHeight;
}
.el-input--suffix .el-input__inner {
  font-size: 14px;
  height: @inputHeight;
}
.el-table {
  color: #000000 !important;
  font-size: 14px !important;
}
.login_page {
  input {
    height: 60px;
  }
}
/* WebKit browsers */
input::-webkit-input-placeholder {
  color: @font_Color !important;
  font-size: 14px;
}
/* Mozilla Firefox 4 to 18 */
input:-moz-placeholder {
  color: @font_Color !important;
  opacity: 1;
  font-size: 14px;
}
/* Mozilla Firefox 19+ */
input::-moz-placeholder {
  color: @font_Color !important;
  opacity: 1;
  font-size: 14px;
}
/* Internet Explorer 10+ */
input:-ms-input-placeholder {
  color: @font_Color !important;
  font-size: 14px;
}
textarea::-webkit-scrollbar {
  display: none;
}
input[type="text"]:focus {
  border: 1px solid @color;
}
input[type="password"]:focus {
  border: 1px solid @color;
}
.el-select .el-input__inner:focus,
.el-textarea__inner:focus {
  border-color: @color !important;
}
.el-range-editor.is-active,
.el-range-editor.is-active:hover {
  border-color: @color !important;
}
.el-input--prefix .el-input__inner {
  background-color: #f3f5f9;
}
.el-input .el-input__inner {
  background-color: #f3f5f9;
}
.el-message-box .el-button:focus,
  .el-message-box .el-button:hover {
    background: none !important;
  }
.dialog {
  tr {
    border-top-color: @border-color;
    border-left-color: @border-color;
    border-right-color: @border-color;
    font-size: 14px;
    color: #150000;
  }
  .el-form {
    width: 100%;
    height: 100%;
    .form_remarks {
      font-size: 14px;
      color: #150000;
      .el-form-item {
        margin-bottom: 0;
        .el-form-item__content {
          line-height: 0 !important;
          tr {
            border-bottom-color: @border-color;
          }
        }
        .add_input {
          padding-left: 50px;
          .el-form-item {
            height: 30px;
            margin-bottom: 0;
          }
          .el-textarea {
            .el-textarea__inner {
              width: 938px;
              height: 40px;
              padding: 0;
              resize: none;
              min-height: 40px !important;
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
  .el-input {
    .el-input__inner {
      height: @inputHeight !important;
    }
  }
}
.el-message-box {
  width: 632px !important;
  height: 398px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  padding-bottom: 0 !important;
  p {
    padding-top: 80px;
    text-align: center;
    color: @mainColor;
    font-size: 16px;
    div {
      text-align: center;
      color: @mainColor;
      font-size: 16px;
      margin-bottom: 24px;
    }
  }
  .el-button {
    border: none !important;
  }
  .el-message-box__header {
    padding: 0;
  }
  .el-message-box__content {
    padding: 0;
    color: #150000 !important;
  }
  .el-message-box__btns {
    padding: 0;
    text-align: center;
    margin-top: 142px;
  }
  .el-button--small,
  .el-button--small.is-round {
    padding: 0;
    font-size: 18px;
    color: @subContentColor;
    margin-right: 30px;
  }
  .el-button--primary {
    background-color: none !important;
    border-color: none !important;
    width: 128px;
    height: 40px;
    background: rgba(56, 56, 56, 1);
    border-radius: 20px;
  }
  .el-button--primary:focus,
  .el-button--primary:hover {
    background: rgba(56, 56, 56, 1) !important;
    border-color: none !important;
    color: @subContentColor !important;
  }
  .el-message-box__headerbtn:focus .el-message-box__close,
  .el-message-box__headerbtn:hover .el-message-box__close {
    color: #909399;
  }
  .el-button:focus,
  .el-button:hover {
    border-color: none !important;
    color: @subContentColor !important;
    background-color: none !important;
  }
  .el-message-box__title {
    height: 66px;
    line-height: 66px;
    border-bottom: 1px solid @color;
    span {
      font-size: 18px;
      margin-left: 30px;
      color: #150000;
      font-weight: 700;
    }
  }
  input {
    border: 1px solid #ddd;
    height: 48px;
    width: 94px;
    border-radius: 6px;
    margin: 0 5px;
    margin-left: 202px;
    background-color: @color;
  }
}
.msgBox {
  height: 470px !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  p {
    padding-top: 80px;
    text-align: left;
    div {
      text-align: center;
      color: @mainColor;
      font-size: 16px;
      margin-bottom: 24px;
    }
  }
}
.evaluation,
.mainQualification,
.level,
.parsing {
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
    .el-table td,
    .el-table th.is-leaf {
      border: none !important;
      padding: 5px 0;
    }
  }
}
.passWord,
.info_form {
  .el-card__header {
    padding: 20px 30px !important;
  }
  .el-card__body {
    width: 50%;
    margin: 0 auto;
    margin-top: 113px;
    .el-form-item__label {
      font-size: 16px;
      color: #150000;
    }
    .el-input {
      width: 400px;
    }
    .el-input__inner {
      height: @inputHeight;
      width: 400px;
    }
  }
}
.el-form-item__label {
  font-size: 16px !important;
  color: #150000 !important;
  height: @inputHeight;
  line-height: @inputHeight !important;
}
.el-menu--vertical {
  .el-menu-item {
    background-color: @mainColor !important;
  }
}
.el-button--text {
  color: @fontColor !important;
}
//radio选择样式;
.el-radio__input.is-checked .el-radio__inner {
  border-color: @fontColor !important;
  background: @fontColor !important;
}
.el-radio__input.is-checked+.el-radio__label {
  color: @fontColor !important;
}
.el-radio__inner:hover {
  border-color: @fontColor !important;
}
//全局全选样式修改;
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: @fontColor !important;
  border-color: @fontColor !important;
}
.el-checkbox__input.is-checked+.el-checkbox__label {
  color: @fontColor !important;
}
.el-checkbox__inner:hover,.el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: @fontColor !important;
}
//分页样式修改;
.el-pagination__sizes .el-input .el-input__inner:hover  {
  border-color: none !important;
}
.el-pagination {
  .el-select .el-input.is-focus .el-input__inner,.el-input.is-active .el-input__inner, .el-input__inner:focus {
    border-color: @fontColor !important;
  }
}
.el-select-dropdown__item.selected,.el-pager li:hover,.el-pager li.active,.el-pagination button:hover {
  color: @fontColor !important;
}
//loading颜色改变
.el-loading-spinner .path {
  stroke: @fontColor !important;
}
//权限管理树状图样式;
.el-tree {
  // border: 1px solid #DDDFE4;
  .el-tree-node__content {
      height: 48px;
    }
  .el-tree-node__children {
    border-top: 1px solid #DDDFE4;
    border-left: 1px solid #DDDFE4;
    border-right: 1px solid #DDDFE4;
  }
}
// .el-tree:first-child {
//   background-color: red;
// }
</style>
