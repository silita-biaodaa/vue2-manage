<template>
  <div class="parsing bg-fff">
    <div class="pt20 pb20 pl30 pr30 parsing_top">
      <el-row :span="24" class="dfcc">
        <el-col :span="6" class="fs16 color-150 fw600">
          类型：
          <el-select v-model="typeList" placeholder="请选择" style="width:75%" @change="changetable">
            <el-option
              v-for="item in typeLists"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="7" class="fs16 color-150 fw600 text-l">
          标准名称：
          <el-input
            placeholder="请输入关键字搜索资质"
            clearable
            v-model="name"
            style="width:70%"
            @change="searchData"
            v-on:input="clear"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
        <el-col :span="8" class="fs16 color-150 fw600 text-l">
          别名：
          <el-input
            placeholder="请输入关键字搜索资质"
            clearable
            v-model="alias"
            style="width:60%"
            @change="searchData"
            v-on:input="clear"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <!-- <el-button type="primary" class="ml10" @click="searchData">查询</el-button> -->
          <button type="primary" class="search ml30 fw600 fs16 cp" @click="searchData">搜索</button>
        </el-col>
        <el-col class="ft14 color-409 cp" :span="3">
          <div class="dfcc parsing_add color-fff cp" @click="addAlias" v-show="isAllows">
            <img src="../../assets/img/add_icon.png" alt />
            <div class="ml10 fs16 fw600">添加别名</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="out_right pr30">
      <div class="outData drc color-150 fs14 mt20 mb20 cp">
        <img src="../../assets/img/out.png" alt="">
        <div>导出数据</div>
      </div>
    </div>
    <el-row class="public_table_list">
      <el-col :span="24">
        <el-table class="public_table" border :data="tableData" :header-cell-style="headClass">
          <el-table-column label="别名" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.jointAilas }}</span>
            </template>
          </el-table-column>
          <el-table-column label="标准名称" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.quaLevel }}</span>
            </template>
          </el-table-column>
          <el-table-column label="类型" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createBy }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <span
                class="handle_authority cp color-409"
                @click="deleteDataTable(scope.$index, scope.row)"
              >{{ scope.row.createBy == "自定义" ? "删除":""}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="mt20 mb20 ml50">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[15, 30, 45, 60]"
            :page-size="15"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @change="searchData"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
    <div class="dialog" v-if="showMask">
      <div class="dialog-container pb40">
        <div class="mb10" @keyup.enter="submitForm('ruleForm')">
          <div class="dfrcb dialog_title pl30 pr30">
            <div class="fs16 color-150 fw600">添加资质别名</div>
            <i class="el-icon-close fs14 cp" @click="cancelMask"></i>
          </div>
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            :rules="rules"
            :label-position="labelPosition"
            label-width="100px"
          >
            <el-form-item label="资质别名:" prop="alias" class="dialog_form">
              <el-input
                clearable
                v-model="ruleForm.alias"
                placeholder="请输入需要添加的资质别名"
              ></el-input>
            </el-form-item>
            <el-form-item label="标准名称:" prop="name" class="dialog_form">
              <el-input
                clearable
                v-model="ruleForm.name"
                placeholder="请输入需要添加的资质标准名称"
              ></el-input>
            </el-form-item>
            <el-form-item class="text-c handle_btn">
              <button class="handle_cancle bg-fff fs18 color-999 cp" plain @click="cancelMask">取消</button>
              <button class="handle_confirm color-fff fs18 ml30 cp" type="primary" @click="submitForm('ruleForm')">确定</button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { qualAnalysis, addAnalysisAlias, deleteAnalysis } from "@/api/index";
export default {
  data() {
    return {
      province: [],
      provinces: [],
      tableData: [],
      name: "",
      alias: "",
      sendVal: "",
      pagesize: 15, // 当前页面条数
      pagenum: 1, //当前页面数
      total: null,
      typeList: "全部",
      typeLists: [
        {
          id: "全部",
          value: "全部"
        },
        {
          id: "system",
          value: "系统"
        },
        {
          id: "2",
          value: "自定义"
        }
      ],
      ruleForm: {
        alias: "",
        name: ""
      },
      rules: {
        alias: [{ required: true, message: "请输入资质别名", trigger: "blur" }],
        name: [
          { required: true, message: "请输入资质标准名称", trigger: "blur" }
        ]
      },
      labelPosition: "right",
      showMask: false,
      isAllows: null
    };
  },
  methods: {
    getqualAnalysis() {
      const params = {
        currentPage: this.pagenum,
        pageSize: this.pagesize,
        quaLevel: this.name,
        createBy: this.typeList == "全部" ? "" : this.typeList,
        jointAilas: this.alias
      };
      qualAnalysis(params).then(res => {
        if (res.code == "1") {
          const { list, total } = res.data;
          this.tableData = list;
          this.total = total;
        } else {
          console.info("资质解析列表数据接口不通");
        }
      });
    },
    changetable() {
      this.pagenum = 1;
      setTimeout(() => {
        return this.getqualAnalysis();
      }, 100);
    },
    searchData() {
      this.pagenum = 1;
      this.getqualAnalysis();
    },
    addAlias() {
      this.showMask = true;
    },
    clear() {
      if (this.firm == "") {
        this.getqualAnalysis();
      }
    },
    handleCurrentChange(val) {
      // 当前页改变的函数
      this.pagenum = val;
      this.getqualAnalysis();
    },
    handleSizeChange(val) {
      // 每页条数发生改变时做出的函数
      this.pagesize = val;
      this.getqualAnalysis();
    },
    //关闭弹窗刷新列表
    handleRefesh(showMask) {
      if (!showMask) {
        setTimeout(() => {
          return this.getLevelAlias(this.code);
        }, 100);
      }
    },
    cancelMask() {
      this.showMask = false;
      this.ruleForm = {
        name: "",
        alias: ""
      };
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            quaLevel: this.ruleForm.name,
            jointAilas: this.ruleForm.alias
          };
          addAnalysisAlias(params).then(res => {
            if (res.code == "1") {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              this.showMask = false;
              this.getqualAnalysis();
              //清空输入框;
              this.ruleForm = {
                alias: "",
                name: ""
              };
            } else {
              this.$message({
                type: "warning",
                message: res.msg
              });
              console.info("资质解析添加别名接口不通");
            }
          });
        }
      });
    },
    deleteDataTable(index, row) {
      this.$confirm("此操作将永久删除该评标办法名称, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteAnalysis({ id: row.id }).then(res => {
            if (res.code == "1") {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getqualAnalysis();
            } else {
              this.$message({
                type: "warning",
                message: res.msg
              });
              console.info("删除资质名称");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    headClass() {
      return "text-align: center;background:#DDDFE4;color: #000000;";
    }
  },
  created() {
    this.getqualAnalysis();
    this.isAllows = this.$route.query.isAllows;
  }
};
</script>
<style lang="less" scoped>
@import "../../style/mixin";
.parsing {
  //弹窗样式
  width: 100%;
  height: 100%;
  .parsing_top {
    border-bottom: 1px solid #dddfe4;
    .search {
      width: 64px;
      height: 48px;
      background-color: @mainColor;
      color: @whiteColor;
    }
    .parsing_add {
      background-color: @mainColor;
      width: 126px;
      height: 48px;
    }
  }
  .out_right {
    display: flex;
    flex-direction: row-reverse;
    .outData {
      width:127px;
      height:48px;
      border:1px solid #DDDFE4;
      padding: 0 18px 0 22px;
      img {
        margin-right: 14px;
      }
    }
  }
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
        margin-top: 60px;
        .handle_confirm {
          width:128px;
          height:40px;
          background: @mainColor;
          border-radius:20px;
        }
      }
    }
  }
  .mode,
  .level {
    width: 300px !important;
  }
  .el-form {
    .el-input,
    .el-select {
      width: 92%;
    }
  }
}
</style>