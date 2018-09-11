<template>
  <el-container>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path:'/userlist' }"><span class="bdd_v">首页</span></el-breadcrumb-item>
      <!--<el-breadcrumb-item :to="{ path:'/editer' }">编辑</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item :to="{ path:'/rease' }">增加企业</el-breadcrumb-item>-->
    </el-breadcrumb>
    <el-header class="bdd_header">{{creditBean.comName}}</el-header>
    <el-row class=" bdd_dv">{{changeCreditCode}}</el-row>


    <!--统一社会信用代码-->
    <el-row style="margin-top: 30px">
      <el-col :span="12">
        <div class="grid-content bg-purples">统一社会信用代码：</div>
      </el-col>
      <el-col :span="12">
        <div style="text-align: right" class="grid-content bg-purple-light">
          <el-button @click="deletePerson" type="primary">清空</el-button>
          <el-button @click="keepList" type="primary">保存</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="line-height:40px;margin-left: 10%;">
      <el-col :span="12">
        <div class="grid-content bg-purple">程序处理：<span>{{creditBean.creditCode}}</span></div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">人工编辑：
          <el-input placeholder="请输入内容" v-model="creditBean.changeCreditCode" clearable>
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row class="bdd_hr"></el-row>


    <!--企业名称变更-->
    <el-row style="margin-top: 30px">
      <el-col :span="12">
        <div class="grid-content bg-purples">企业名称变更：</div>
      </el-col>
      <el-col :span="12">
        <div style="text-align: right" class="grid-content bg-purple-light">
          <el-button @click="changeNameEmpty()" type="primary">清空</el-button>
          <el-button @click="addList()" type="primary">增加</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="line-height:40px;margin-left: 10%;">
      <el-col :span="12">

        <div class="grid-content bg-purple">&nbsp;&nbsp;&nbsp;变更前：<span>{{beforeComName}}</span></div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">变更后：
          <el-input placeholder="请输入变更后的企业名称" v-model="afterComName" clearable>
          </el-input>
        </div>
      </el-col>

    </el-row>

    <el-row :gutter="20" style="line-height:40px;margin-left: 10%;">
      <el-col :span="12">
        <div class="grid-content bg-purple">变更时间：
          <el-date-picker v-model="changeTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-col>

    </el-row>
    <el-table :data="comDataArray" border style="width: 100%">

      <el-table-column type="index" label="序号" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="comNameEx" label="变更前名称">
      </el-table-column>
      <el-table-column prop="comName" label="变更后名称">
      </el-table-column>
      <el-table-column prop="changeTime" label="变更时间">
      </el-table-column>
      <el-table-column prop="sourceStr" label="来源" width="120">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
                              <el-button
                                  size="mini"
                                  type="danger"
                                  @click="deleteComItem(scope.$index, scope.row)">删除
                              </el-button>
</template>
            </el-table-column>
        </el-table>
        <el-row class="bdd_hr"></el-row>

        <!--安许证号-->
        <el-row style="margin-top: 30px">
            <el-col :span="12">
                <div class="grid-content bg-purples">安许证号：</div>
            </el-col>
            <el-col :span="12">
                <div style="text-align: right" class="grid-content bg-purple-light">
                    <el-button type="primary" @click="deleteAnxu()">清空</el-button>
                    <el-button type="primary" @click="saveAnxu()">保存</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="line-height:40px;margin-left: 10%;">
            <el-col :span="12">
                <div class="grid-content bg-purple">程序处理：安许证号（{{this.preCertNo}}）</div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">&nbsp;&nbsp;&nbsp;有效期：{{this.preExpiredStr}}

                </div>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="line-height:40px;margin-left: 10%;">
            <el-col :span="12">
                <div class="grid-content bg-purple">人工编辑：
                    <el-input
                        placeholder="请输入内容"
                        v-model="certNo"
                        clearable>
                    </el-input>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">有效期：
                    <el-date-picker
                        v-model="expiredStr"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </el-col>
        </el-row>
        <el-row class="bdd_hr"></el-row>

        <!--企业资质-->
        <el-row style="margin-top: 30px">
            <el-col :span="12">
                <div class="grid-content bg-purples">企业资质：</div>
            </el-col>
            <el-col :span="12">
                <div style="text-align: right" class="grid-content bg-purple-light">
                    <el-button type="primary" @click="deleteComZhi()">清空</el-button>
                    <el-button type="primary" @click="addQuality()">增加</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="line-height:40px;margin-left: 10%;">
            <el-col :span="8">
                <div class="block">
                    <span class="demonstration bg-purple">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;资质：</span>
                    <el-cascader
                        v-model="elQuality"
                        :options="allQuality"
                        placeholder="请选择资质"
                        filterable @change="handleQualityChange"

                    >
                    </el-cascader>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">证书编号：
                    <el-input
                        placeholder="请输入证书编号"
                        v-model="certNoB"
                        clearable>
                    </el-input>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">发证机关：
                    <el-input
                        placeholder="请输入发证机关"
                        v-model="certOrgB"
                        clearable>
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="line-height:40px;margin-left: 10%;">
            <el-col :span="8">
                <div class="grid-content bg-purple">发证日期：
                    <el-date-picker
                        v-model="certDateB"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">&nbsp;&nbsp;&nbsp;有效期：
                    <el-date-picker
                        v-model="validDateB"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">发文日期：
                    <el-date-picker
                        v-model="certDatep"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </el-col>

        </el-row>
        <el-table
            :data="qualityTableData"
            border
            style="width: 100%">
            <el-table-column
                type="index" label="序号"
                header-align="center" align="center">
            </el-table-column>
            <el-table-column
                prop="qualName"
                label="资质"
            >
            </el-table-column>
            <el-table-column
                prop="certNo"
                label="证书编号">
            </el-table-column>
            <el-table-column
                prop="certDate"
                label="发证日期">
            </el-table-column>
            <el-table-column
                prop="validDate"
                label="有效期">
            </el-table-column>
            <el-table-column
                prop="issueDate"
                label="发文日期">
            </el-table-column>
            <el-table-column
                prop="certOrg"
                label="发证机关">
            </el-table-column>
            <el-table-column
                prop="channel"
                label="来源">
            </el-table-column>
            <el-table-column label="操作"
            >
<template slot-scope="scope">
  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
    删除
  </el-button>
</template>
            </el-table-column>
        </el-table>
        <el-row class="bdd_hr"></el-row>

        <!--安全认证-->
        <el-row style="margin-top: 30px">
            <el-col :span="12">
                <div class="grid-content bg-purples">安全认证：</div>
            </el-col>
            <el-col :span="12">
                <div style="text-align: right" class="grid-content bg-purple-light">
                    <el-button type="primary" @click="deleteAnquan">清空</el-button>
                    <el-button type="primary" @click="saveAnquan">保存</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="line-height:40px;margin-left: 10%;">
            <el-col :span="8">
                <div class="grid-content bg-purple">程序处理：安许认证
                    {{(anquanBean.pro&&anquanBean.pro.certLevelStr)?anquanBean.pro.certLevelStr:""}}
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    安全认证等级：{{(anquanBean.pro&&anquanBean.pro.certResultStr)?anquanBean.pro.certResultStr:""}}
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    有效期：{{(anquanBean.pro&&anquanBean.pro.expiredStr)?anquanBean.pro.expiredStr:""}}

                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="line-height:40px;margin-left: 10%;">
            <el-col :span="8">
                <div class="grid-content bg-purple">人工编辑：
                    <el-cascader
                        v-model="certProvAndCity"
                        placeholder="请选择所属地区"
                        :options="optionsProData"
                        filterable @change="handleItemChange"

                    ></el-cascader>
                </div>
            </el-col>

            <!--公路信用等级-->
            <el-col :span="8">
                <div class="grid-content bg-purple">安全认证等级：

                    <el-select v-model="anquanCertLevelStr" placeholder="请选择">
                        <el-option
                            v-for="item in certLevelArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">变更时间：
                    <el-date-picker
                        v-model="timeExpiredStr"
                        type="date"
                         format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </el-col>
        </el-row>
        <el-row class="bdd_hr"></el-row>
        <el-row style="margin-top: 30px">
            <el-col :span="12">
                <div class="grid-content bg-purples">公路信用等级：</div>
                <el-row>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                    style="font-size: 14px">评定省份：</span>
                    <el-select v-model="selectProvice" placeholder="请选择" @change="chooseProvince">
                        <el-option
                            v-for="item in roadProArr"
                            :key="item.assessProvCode"
                            :label="item.areaName"
                            :value="item.assessProvCode">
                        </el-option>
                    </el-select>
                </el-row>
            </el-col>
            <el-col :span="12">
                <div style="text-align: right" class="grid-content bg-purple-light">
                    <!--<el-button type="primary">保存</el-button>-->
                </div>
            </el-col>
        </el-row>
        <el-table
            :data="roadTableData"
            border
            style="width: 100%">
            <el-table-column
                prop="assessYear"
                label="评定年度"
                width="100">
            </el-table-column>
            <el-table-column
                prop="proAssessLevel"
                label="公路信用评价等级（程序）"
            >
            </el-table-column>
            <el-table-column
                prop="labAssessLevel"
                label="公路信用评价等级（人工）"
            >
            </el-table-column>
            <el-table-column
                prop="assessProv"
                label="评定省份">
            </el-table-column>
            <el-table-column label="操作"
                             width="200">
<template slot-scope="scope">
  <el-button  :class="{ red:editGongLuRed == index}" type="text" @click="editGongLu(scope.$index)">
    修改
  </el-button>

  <el-dialog style="text-align: center;width:50%" title="公路信用评价等级修改" :visible.sync="dialogFormVisible">

    <el-form :model="form">
      <el-form-item label="" :label-width="formLabelWidth">
        <el-select style="margin-right:110px;" v-model="selectGongLuLevel" placeholder=" ">
          <el-option label=" " value=" "></el-option>
          <el-option label="A" value="A"></el-option>
          <el-option label="B" value="B"></el-option>
          <el-option label="C" value="C"></el-option>
          <el-option label="D" value="D"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="editGongLuSure">确 定</el-button>
    </div>
  </el-dialog>
</template>
            </el-table-column>
        </el-table>
    </el-container>

</template>

<script>
  import axios from "axios";
  import {
    getJsonData
  } from "../api/index.js";

  export default {
    mounted() {
      console.log(1111);
      this.getDataList();
      this.getAnxuData();
      this.getQuality();
      this.getRoadLevel();
      this.getAnquanData();
      this.getCreditData();
      this.getProviceData();
      this.getRoadLevelPro();
      this.getAllQuality();
    },

    methods: {
      editGongLu(index) {
        this.roadBean = this.roadTableData[index];
        this.dialogFormVisible = true;
        this.editGongLured=index;


      },
      editGongLuSure() {
        let roadBean = this.roadBean;
        let selectGongLuLevel = this.selectGongLuLevel;
        let dataParam = JSON.stringify({
          comId: this.comId,
          assessProvCode: roadBean.assessProvCode ? roadBean.assessProvCode : "hunan",
          assessYear: roadBean.assessYear,
          assessLevel: selectGongLuLevel
        });
        getJsonData("/company/highway/add", dataParam).then(res => {
          console.log(res.data);
          this.dialogFormVisible = false;
          console.log(res);
          this.getRoadLevel();
          this.dialogFormVisible = false;
        });
      },
      //  显示程序和人工编辑信用代码

      handleChange() {},
      getCascaderObj(val, opt) {
        return val.map(function(value, index, array) {
          for (var itm of opt) {
            if (itm.value == value) {
              opt = itm.children;
              return itm;
            }
          }
          return null;
        });
      },

      //获取信用代码
      getCreditData() {
        let dataParam = JSON.stringify({
          comId: this.comId
        });
        getJsonData("/company/creditCode/detail", dataParam).then(res => {
          console.log(777);
          let creditBean = res.data;
          this.creditBean = creditBean;
          if( this.beforeComName==null||this.beforeComName==""){
          this.beforeComName = creditBean.comName;
          }
          this.changeCreditCode = creditBean.changeCreditCode;
        });
      },
      handleItemChange() {
        let certProvAndCityArr = this.getCascaderObj(
          this.certProvAndCity,
          this.optionsProData
        );
        var citySer = this.certProvAndCity;
        console.log(citySer);
        this.certProvAndCityArr = certProvAndCityArr;
        if (certProvAndCityArr != null && certProvAndCityArr.length > 0) {
          this.oneCertLevel = certProvAndCityArr[0].value;
          if (this.oneCertLevel == "1") {
            this.threeCertLevel = certProvAndCityArr[1].value;
          } else {
            this.twoCertLevel = certProvAndCityArr[1].value;
            this.threeCertLevel = certProvAndCityArr[2].value;
          }
        }
      },
      handleQualityChange(e, v) {
        console.log(3333);

        let allQualityArr = this.getCascaderObj(this.elQuality, this.allQuality);

        if (allQualityArr != null && allQualityArr.length > 0) {
          this.oneQualityLevel = allQualityArr[0].value;
          this.twoQualityLevel = allQualityArr[1].value;
          this.threeQualityLevel = allQualityArr[2].value;
        }
      },
      //公路信用等级选择省份
      chooseProvince() {
        let selectProvice = this.selectProvic;
        console.log(selectProvice);
        this.getRoadLevel();
      },
      handleDelete(index) {
        let qualityBean = this.qualityTableData[index];
        if (qualityBean.pkid == null) {
          this.$message({
            message: "非人工添加的无法删除！",
            type: "fail"
          });
          return;
        }
        this.$confirm("此操作将删除该条资质信息吗？, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            let dataParam = JSON.stringify({
              pkid: qualityBean.pkid
            });
            getJsonData("/company/qual/del", dataParam).then(res => {
              console.log(888);
              console.log(222);
              console.log(111);
              this.getQuality();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });


      },
      //公路信用等级
      getRoadLevelPro() {
        let dataParam = JSON.stringify({
          comId: this.comId
        });
        getJsonData("/company/highway/prov", dataParam).then(res => {
          console.log(777);
          this.roadProArr = res.data;
        });
      },
      //公路信用等级
      getRoadLevel() {
        let dataParam = JSON.stringify({
          comId: this.comId,
          assessProvCode: this.selectProvice
        });
        getJsonData("/company/highway/detail", dataParam).then(res => {
          console.log(777);
          this.roadTableData = res.data;
          this.roadInfo = res.data[0];
        });
      },
      deleteAnxu() {
        let anxuBean =  this.anxuBean;
            if(anxuBean==null||anxuBean.lab==null||anxuBean.lab.pkid==null){
              this.$message({
              type: "info",
              message: "人工安许证号已删除,无需再次删除"
            });
              return;
            }
        this.$confirm("此操作将删除该条变更人工安许证号, 是否继续?", "提示", )
          .then(() => {

            let dataParam = JSON.stringify({
              pkid: this.anxuBean.lab.pkid
            });

            getJsonData("/company/security/del", dataParam).then(res => {
              console.log(888);
              this.certNo = "";
              this.expiredStr = "";

              this.getAnxuData();
            });
          })

      },
      getAnquanData() {
        let dataParam = JSON.stringify({
          comId: this.comId
        });
        getJsonData("/company/security/detail", dataParam).then(res => {
          console.log(888);
          let anquanBean = res.data;
          this.anquanBean = anquanBean;
          if (anquanBean != null && anquanBean.lab != null) {
            var seLevel = anquanBean.lab.certLevel;
            var sePro = anquanBean.lab.certProvCode;
            var seCity = anquanBean.lab.certCityCode;
            let certProvAndCity = new Array();
            if (seLevel)
              certProvAndCity.push(seLevel);
            if (sePro)
              certProvAndCity.push(sePro);
            if (seCity)
              certProvAndCity.push(seCity);
            this.certProvAndCity = certProvAndCity;
          }
          // var certProvAndCity = anquanBean.lab.certProv?anquanBean.lab.certProv:""+ anquanBean.lab.certCity?anquanBean.lab.certCity:"";
          //var selectCityArr = new Array();
          // selectCityArr.push(certProvAndCity);
          //this.certProvAndCity =certProvAndCity;
          if (anquanBean != null && anquanBean.lab != null) {
            this.twoCertLevel = anquanBean.lab.certProvCode ?
              anquanBean.lab.certProvCode :
              "";
            this.threeCertLevel = anquanBean.lab.certCityCode ?
              anquanBean.lab.certCityCode :
              "";
            this.oneCertLevel = anquanBean.lab.certLevel ?
              anquanBean.lab.certLevel :
              "";
            this.anquanCertLevelStr = anquanBean.lab.certResult ?
              anquanBean.lab.certResult :
              "";
            this.timeExpiredStr = anquanBean.lab.expiredStr ?
              anquanBean.lab.expiredStr :
              "";
          }
        });
      },
      saveAnquan() {
        let expiredStr = this.timeExpiredStr;
        let certLevel = this.oneCertLevel;
        let certResult = this.anquanCertLevelStr;
        if (expiredStr == null || expiredStr.trim() == "" || certLevel == null || certLevel.trim() == "" || certResult == null || certResult == "") {
          this.$message({
            message: "请输入内容！",
            type: "info"
          });
          return;
        }
        let dataParam = JSON.stringify({
          comId: this.comId,
          expiredStr: this.timeExpiredStr,
          certProvCode: this.twoCertLevel,
          certCityCode: this.threeCertLevel,
          certLevel: this.oneCertLevel,
          certResult: this.anquanCertLevelStr
        });

        getJsonData("/company/security/add", dataParam).then(res => {
          console.log(888);
          this.$message({
            message: "企业安全认证保存成功！",
            type: "success"
          });
          this.getAnquanData();
        });
      },
      //获取资质信息
      getQuality() {
        let dataParam = JSON.stringify({
          comId: this.comId
        });
        getJsonData("/company/qual/detail", dataParam).then(res => {
          console.log(888);
          this.qualityTableData = res.data;
          let quality = res.data[0];
          this.quality = quality;
          this.certNoB = quality.certNo;
          this.certDateB = quality.certDate;
          this.certOrgB = quality.certOrg;
          this.validDateB = quality.validDate;
        });
      },

      deleteComZhi() {
        let elQuality = new Array(null, null, null);
        this.elQuality = elQuality;
        this.certNoB = "";
        this.certOrgB = "";
        this.certDateB = "";
        this.validDateB = "";
      },
      //添加资质信息
      addQuality() {
        let certNo = this.certNoB;
        let certDate = this.certDateB;
        let certOrg = this.certOrgB;
        let validDate = this.validDateB;


        if (certNo == null || certNo.trim() == "" || certDate == null || certDate.trim() == "" || certOrg == null || certOrg == "" || validDate == null || validDate == "") {
          this.$message({
            message: "请输入内容！",
            type: "info"
          });
          return;
        }

        let dataParam = JSON.stringify({
          comId: this.comId,
          certNo: this.certNoB,
          certDate: this.certDateB,
            issueDate: this.certDatep,
          certOrg: this.certOrgB,
          validDate: this.validDateB,
          quaCode: this.twoQualityLevel,
          gradeCode: this.threeQualityLevel

        });

        getJsonData("/company/qual/add", dataParam).then(res => {
          console.log(res.data)
          if (res.code == 400) {
            this.$message({
              type: "info",
              message: res.msg
            });
          } else {
            this.$message({
              type: "success",
              message: "添加成功"
            });
            this.getQuality();
          }

        });
      },
      deleteAnquan() {

          let anquanBean =  this.anquanBean;
            if(anquanBean==null||anquanBean.lab==null||anquanBean.lab.pkid==null){
              this.$message({
              type: "info",
              message: "人工安全认证已删除,无需再次删除"
            });
              return;
            }

           this.$confirm("此操作将删除安全认证, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            let dataParam = JSON.stringify({
              pkid: this.anquanBean.lab.pkid
            });

            getJsonData("/company/security/del", dataParam).then(res => {
              console.log(888);
              this.certNo = "";
              this.expiredStr = "";
               this.anquanCertLevelStr = [];
              this.certProvAndCity = [];
              this.timeExpiredStr = ''
              this.getAnquanData();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });



      },
      // 清空
      deletePerson() {
        let dataParam = JSON.stringify({
          comId: this.comId
        });

        this.$confirm("此操作将删除人工编辑的社会信用代码, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            getJsonData("/company/creditCode/del", dataParam).then(res => {
              this.getCreditData();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },

      //保存
      keepList() {
        let changeCreditCode = this.creditBean.changeCreditCode;
        if (changeCreditCode == null || changeCreditCode.trim() == "") {
          this.$message({
            type: "fail",
            message: "请输入内容！"
          });
          retrun;
        }
        let dataParam = JSON.stringify({
          comId: this.comId,
          creditCode: this.creditBean.changeCreditCode
        });
        getJsonData("/company/creditCode/add", dataParam).then(res => {
          this.$message({
            message: "企业统一社会信用代码保存成功！",
            type: "success"
          });

          this.getCreditData();
        });
      },
      deleteComItem(index, row) {
        let dataParam = JSON.stringify({
          pkid: this.comDataArray[index].pkid
        });

        this.$confirm("此操作将删除该条变更企业名称, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            getJsonData("/company/comName/del", dataParam).then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getDataList();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },

      saveAnxu() {
        let curCertNo = this.certNo;
        let curExpiredStr = this.expiredStr;
        if (curCertNo == null || curCertNo.trim() == "") {
          this.$message({
            type: "info",
            message: "安许证号-人工编辑不能为空"
          });
          retrun;
        }

        if (curExpiredStr == null || curExpiredStr.trim() == "") {
          this.$message({
            type: "info",
            message: "安许证号-有效期不能为空"
          });
          retrun;
        }

        let dataParam = JSON.stringify({
          comId: this.comId,
          certNo: curCertNo,
          expiredStr: curExpiredStr
        });
        getJsonData("/company/certNo/Add", dataParam).then(res => {
          if (res.code == 400) {
            this.$message({
              message: res.msg,
              type: "fail"
            });
            retrun;
          }
          let bddArray = res.data;
          this.$message({
            message: "企业安许证号保存成功！",
            type: "success"
          });
          console.log(555);
          this.getAnxuData();
        });
      },
      getAllQuality() {
        getJsonData("/qual/qualGrade/list").then(res => {
          let allQuality = res.data;
          let oneLevelArr = new Array();
          if (allQuality != null && allQuality.length > 0) {
            for (let i = 0; i < allQuality.length; i++) {
              let oneLevel = allQuality[i];
              let oneBean = new Object();
              oneBean.value = oneLevel.quaName;
              oneBean.label = oneLevel.quaName;
              let qualArr = oneLevel.qualList;
              let oneChildren = new Array();
              if (qualArr != null && qualArr.length > 0) {
                var twoLevelArr = new Array();
                for (let j = 0; j < qualArr.length; j++) {
                  let twoLevel = qualArr[j];
                  let twoBean = new Object();
                  twoBean.value = twoLevel.quaCode;
                  twoBean.label = twoLevel.quaName;
                  let twoChildren = new Array();
                  let gradeArr = twoLevel.gradeList;
                  if (gradeArr != null && gradeArr.length > 0) {
                    for (let k = 0; k < gradeArr.length; k++) {
                      let threeBean = new Object();
                      let threeLevel = gradeArr[k];
                      threeBean.value = threeLevel.gradeCode;
                      threeBean.label = threeLevel.name;
                      if (threeLevel != null) {
                        twoChildren.push(threeBean);
                      }
                    }
                  }
                  if (twoChildren != null && twoChildren.length > 0) {
                    twoBean.children = twoChildren;
                  }
                  twoLevelArr.push(twoBean);
                }
                if (twoLevelArr != null && twoLevelArr.length > 0) {
                  oneBean.children = twoLevelArr;
                }
              }

              oneLevelArr.push(oneBean);
            }
          }
          this.allQuality = oneLevelArr;
        });
      },

      /*称显示企业名称记录*/
      getDataList(type) {
        let dataParam = JSON.stringify({
          comId: this.comId
        });
        getJsonData("/company/comName/detail", dataParam).then(res => {
          let bddArray = res.data;
          console.log(555);
          this.order = res.data.creditCode;
          this.creditData = res.data[0];
          let comDataArray = res.data;

          if( this.beforeComName ==null||this.beforeComName==""||this.afterComName ==null||this.afterComName==""){
          this.beforeComName = res.data[0].comName;
          }

          if(type==0){
            this.changeTime = "";
            this.afterComName = "";
          }
          for (let j = 0; j < comDataArray.length; j++) {
            let comDataBean = comDataArray[j];
            comDataBean.sourceStr = comDataBean.source == 1 ? "程序" : "人工";
            comDataArray.splice(j, 1, comDataBean);
          }
          this.comDataArray = comDataArray;
        });
      },
      //添加
      addList() {
        let changeTime = this.changeTime;
        let afterComName = this.afterComName;
        //let month = changeTime.getMonth()+1;
        // let date = changeTime.getDate();
        // let time =  changeTime.getFullYear()+"-" +(month<10?("0"+month):month)+"-"+(date<10?("0"+date):date);
        let dataParam = JSON.stringify({
          comId: this.comId,
          comName: this.afterComName,
          changeTime: changeTime,
          comNameEx: this.beforeComName
        });
        if (changeTime == null || changeTime.trim() == "" || afterComName == null || afterComName.trim() == "") {
          this.$message({
            type: "info",
            message: "请输入内容"
          });
          retrun;
        }
        getJsonData("/company/comName/add", dataParam).then(res => {
          console.log(res);
          this.$message({
            message: "恭喜你，企业名称变更成功！",
            type: "success"
          });

          this.beforeComName = res.data;
          this.getDataList(0);

        });
      },
      getProviceData() {
        getJsonData("/common/area").then(res => {
          console.log(222);
          let oneChildArrA = new Array();
          let oneChildArrB = new Array();
          let provinceArr = res.data;
          if (provinceArr != null) {
            for (let j = 0; j < provinceArr.length; j++) {
              let proBean = provinceArr[j];
              let newProBean = new Object();
              newProBean.label = proBean.areaName;
              newProBean.value = proBean.areaCode;
              newProBean.key = proBean.pkid;
              oneChildArrA.push(newProBean);

              let newProBeanT = new Object();
              newProBeanT.label = proBean.areaName;
              newProBeanT.value = proBean.areaCode;
              newProBeanT.key = proBean.pkid;
              let cityArr = proBean.citys;
              let newCityArr = new Array();
              if (cityArr != null && cityArr.length > 0) {
                for (let k = 0; k < cityArr.length; k++) {
                  let cityBean = cityArr[k];
                  let newCityBean = new Object();
                  newCityBean.label = cityBean.areaName;
                  newCityBean.value = cityBean.areaCode;
                  newCityBean.key = cityBean.pkid;
                  newCityArr.push(newCityBean);
                }
              }
              newProBeanT.children = newCityArr;
              oneChildArrB.push(newProBeanT);
            }
          }

          let proInfoArr = new Array();
          let oneBeanA = new Object();
          oneBeanA.key = "1";
          oneBeanA.label = "省级";
          oneBeanA.value = "1";
          oneBeanA.children = oneChildArrA;
          proInfoArr.push(oneBeanA);
          let oneBeanB = new Object();
          oneBeanB.key = "2";
          oneBeanB.label = "市级";
          oneBeanB.value = "2";
          oneBeanB.children = oneChildArrB;
          proInfoArr.push(oneBeanB);
          this.optionsProData = proInfoArr;
        });
      },
      getAnxuData() {
        let dataParam = JSON.stringify({
          comId: this.comId
        });
        getJsonData("/company/certNo/detail", dataParam).then(res => {
          console.log(444);
          let anxuBean = res.data;
          this.anxuBean = anxuBean;
          if (anxuBean != null) {
            if (anxuBean.pro != null) {
              this.preExpiredStr = anxuBean.pro.expiredStr;
              this.preCertNo = anxuBean.pro.certNo;
            }
            if (anxuBean.lab != null) {
              this.expiredStr = anxuBean.lab.expiredStr;
              this.certNo = anxuBean.lab.certNo;
            }
          }
        });
      },

      changeNameEmpty() {
        this.afterComName = "";
        this.changeTime = "";
      }
    },

    data() {
      return {
        anxuBean: {},
        elQuality: [],
        certProvAndCity: [],
        certProvAndCityArr: [],
        certLevelArr: [{
            value: "1",
            label: "优秀"
          },
          {
            value: "2",
            label: "良好"
          }
        ],

        data: '',
          certDatep:'',
        oneQualityLevel: "",
        twoQualityLevel: "",
        threeQualityLevel: "",
        oneCertLevel: "",
        twoCertLevel: "",
        threeCertLevel: "",
        allQuality: [],
        selectGongLuLevel: "",
        roadBean: {},
        anquanCertLevelStr: "",
        selectProvice: "",
        roadProArr: [],
        creditBean: {},
        roadTableData: [],
        roadInfo: {},
        assessProvCode: "",
        qualityTableData: [],
        quality: {},
        certNoB: "",
        certDateB: "",
        certOrgB: "",
        validDateB: "",
        preCertNo: "",
        preExpiredStr: "",
        certNo: "",
        anquanBean: {},
        expiredStr: "",
        certProvCode: "",
        certCityCode: "",
        certLevel: "",
        certResult: "",
        changeCreditCode: "",
        changePkid: "",
        beforeComName: "",
        afterComName: "",
        changeTime: "",
        creditData: {},
        comDataArray: [],
        timeExpiredStr: "",
        value2: "",
        value3: "",
        creditCode: "",
        crCode: "",
        comId: this.$route.params.id,
        order: "",
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: "",
          region: "",
          date1: "",
          date2: "",
          delivery: false,
          type: [],
          resource: "",
          desc: ""
        },
        formLabelWidth: "120px",
        optionsProData: [],
        options1: [{
            value: "zhinan",
            label: "指南",
            children: [{
                value: "shejiyuanze",
                label: "设计原则",
                children: [{
                    value: "yizhi",
                    label: "一致"
                  },
                  {
                    value: "fankui",
                    label: "反馈"
                  },
                  {
                    value: "xiaolv",
                    label: "效率"
                  },
                  {
                    value: "kekong",
                    label: "可控"
                  }
                ]
              },
              {
                value: "daohang",
                label: "导航",
                children: [{
                    value: "cexiangdaohang",
                    label: "侧向导航"
                  },
                  {
                    value: "dingbudaohang",
                    label: "顶部导航"
                  }
                ]
              }
            ]
          },
          {
            value: "zujian",
            label: "组件",
            children: [{
                value: "basic",
                label: "Basic",
                children: [{
                    value: "layout",
                    label: "Layout 布局"
                  },
                  {
                    value: "color",
                    label: "Color 色彩"
                  },
                  {
                    value: "typography",
                    label: "Typography 字体"
                  },
                  {
                    value: "icon",
                    label: "Icon 图标"
                  },
                  {
                    value: "button",
                    label: "Button 按钮"
                  }
                ]
              },
              {
                value: "form",
                label: "Form",
                children: [{
                    value: "radio",
                    label: "Radio 单选框"
                  },
                  {
                    value: "checkbox",
                    label: "Checkbox 多选框"
                  },
                  {
                    value: "input",
                    label: "Input 输入框"
                  },
                  {
                    value: "input-number",
                    label: "InputNumber 计数器"
                  },
                  {
                    value: "select",
                    label: "Select 选择器"
                  },
                  {
                    value: "cascader",
                    label: "Cascader 级联选择器"
                  },
                  {
                    value: "switch",
                    label: "Switch 开关"
                  },
                  {
                    value: "slider",
                    label: "Slider 滑块"
                  },
                  {
                    value: "time-picker",
                    label: "TimePicker 时间选择器"
                  },
                  {
                    value: "date-picker",
                    label: "DatePicker 日期选择器"
                  },
                  {
                    value: "datetime-picker",
                    label: "DateTimePicker 日期时间选择器"
                  },
                  {
                    value: "upload",
                    label: "Upload 上传"
                  },
                  {
                    value: "rate",
                    label: "Rate 评分"
                  },
                  {
                    value: "form",
                    label: "Form 表单"
                  }
                ]
              },
              {
                value: "data",
                label: "Data",
                children: [{
                    value: "table",
                    label: "Table 表格"
                  },
                  {
                    value: "tag",
                    label: "Tag 标签"
                  },
                  {
                    value: "progress",
                    label: "Progress 进度条"
                  },
                  {
                    value: "tree",
                    label: "Tree 树形控件"
                  },
                  {
                    value: "pagination",
                    label: "Pagination 分页"
                  },
                  {
                    value: "badge",
                    label: "Badge 标记"
                  }
                ]
              },
              {
                value: "notice",
                label: "Notice",
                children: [{
                    value: "alert",
                    label: "Alert 警告"
                  },
                  {
                    value: "loading",
                    label: "Loading 加载"
                  },
                  {
                    value: "message",
                    label: "Message 消息提示"
                  },
                  {
                    value: "message-box",
                    label: "MessageBox 弹框"
                  },
                  {
                    value: "notification",
                    label: "Notification 通知"
                  }
                ]
              },
              {
                value: "navigation",
                label: "Navigation",
                children: [{
                    value: "menu",
                    label: "NavMenu 导航菜单"
                  },
                  {
                    value: "tabs",
                    label: "Tabs 标签页"
                  },
                  {
                    value: "breadcrumb",
                    label: "Breadcrumb 面包屑"
                  },
                  {
                    value: "dropdown",
                    label: "Dropdown 下拉菜单"
                  },
                  {
                    value: "steps",
                    label: "Steps 步骤条"
                  }
                ]
              },
              {
                value: "others",
                label: "Others",
                children: [{
                    value: "dialog",
                    label: "Dialog 对话框"
                  },
                  {
                    value: "tooltip",
                    label: "Tooltip 文字提示"
                  },
                  {
                    value: "popover",
                    label: "Popover 弹出框"
                  },
                  {
                    value: "card",
                    label: "Card 卡片"
                  },
                  {
                    value: "carousel",
                    label: "Carousel 走马灯"
                  },
                  {
                    value: "collapse",
                    label: "Collapse 折叠面板"
                  }
                ]
              }
            ]
          },
          {
            value: "ziyuan",
            label: "省级",
            children: [{
                value: "axure",
                label: "Axure Components"
              },
              {
                value: "sketch",
                label: "Sketch Templates"
              },
              {
                value: "jiaohu",
                label: "组件交互文档"
              }
            ]
          }
        ],
        selectedOptions: [],
        selectedOptions2: [],

        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
              text: "今天",
              onClick(picker) {
                picker.$emit("pick", new Date());
              }
            },
            {
              text: "昨天",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit("pick", date);
              }
            },
            {
              text: "一周前",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", date);
              }
            }
          ]
        },
        value2: ""
      };
    }
  };
</script>


<style lang="less" scoped>
  @import "../style/mixin.less";
  .bdd_header,
  .bdd_dv {
    text-align: center;
  }

  .bdd_header {
    font-size: 24px;
    font-weight: 700;
  }

  .bdd_dv {
    margin-top: 0px;
    font-size: 14px;
    color: #999999;
    border-bottom: 1px solid #ccc;
    line-height: 50px;
  }

  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
  }

  .el-input {
    width: 50%;
  }

  .bdd_hr {
    width: 100%;
    height: 1px;
    background-color: #ccc;
    margin-top: 20px;
  }

  .bg-purples {
    font-size: 16px;
    font-weight: 600;
  }

  .bg-purple {
    font-size: 14px;
    color: #666666;
  }

  .el-dialog {
    width: 30%;
  }

  .el-dialog__wrapper {
    position: fixed;
    top: 200px;
    right: 0;
    bottom: 0;
    left: 500px;
    overflow: auto;
    margin: 0;
  }
.red{
    color:red;
}
  .bdd_v:hover{
      color: red;
      cursor:pointer;
  }
</style>


