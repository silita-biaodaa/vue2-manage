<template>
    <div class="bdd_header">
        <el-row :gutter="20">
            <el-col :span="20">
                <div class="grid-content bg-purple">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/prize' }">获奖信息</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/quality'}">公路信用评价等级</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/record' }">安全生产许可证</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/safety' }">不良记录</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/security' }">安全认证</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/' }"></el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <el-button type="primary">查看数据维护日志</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row style="margin-top: 30px;">
            <el-col :span="24" style="line-height:50px;">
                        <span class="grid-content bg-purple-dark">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级别：<el-select
                            class="el-input" v-model="distinction" @change="getDate" placeholder="请选择">
            <el-option
                v-for="item in distinctionList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
            </el-option>
          </el-select></span>
                <span style="margin-left:15px;" class="grid-content bg-purple-dark">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;等级：<el-select
                    class="el-input" v-model="ssessLevel" @change="getDate" placeholder="请选择">

              <el-option
                  v-for="item in ssessLevelList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
              </el-option>
          </el-select></span>
                <span style="margin-left:20px;" class="grid-content bg-purple-dark">所属地区：<el-select class="bdd_pur"
                                                                                                    v-model="province"
                                                                                                    @change="choseProvince"
                                                                                                    placeholder="省级地区">
            <el-option
                v-for="item in options"
                :key="item.pkid"
                :label="item.areaName"
                :value="item.areaCode">
            </el-option>
          </el-select>
                        <el-select class="bdd_pur" v-model="shi"
                                   @change="queryData"
                                   placeholder="市级地区">
            <el-option
                v-for="item in shi1"
                :key="item.pkid"
                :label="item.areaName"
                :value="item.areaName">

            </el-option>
          </el-select></span>

            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <span class="grid-content bg-purple-dark">企业名称：<el-input
                    placeholder="请输入内容"
                    v-model.trim="comepname"
                    clearable>
        </el-input></span>
                <span style="margin-left:23px;" class="grid-content bg-purple-dark">评定日期：<el-input
                    placeholder="请输入内容"
                    v-model.trim="evaluation"
                    clearable>
        </el-input></span>
                <span style="margin-left:20px;" class="grid-content bg-purple-dark">有效期至：<el-input
                    placeholder="请输入内容"
                    v-model.trim="times"
                    clearable>
        </el-input></span>

            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" style="margin-top: 30px;">
                <el-row>
                    <el-button type="primary" @click="getData">查询</el-button>
                    <el-button type="primary" @click="deleteConfirm">删除</el-button>
                    <el-button type="primary">上传Excel</el-button>
                    <el-button type="primary">导出Excel</el-button>
                </el-row>
            </el-col>
        </el-row>
        <el-table
            :data="tableData"
            @select="select"
            @select-all="selectAll"
            border
            style="width: 100%;margin-top: 30px;">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="comName"
                label="企业名称"
                width="300">
            </el-table-column>
            <el-table-column
                prop="certLevel"
                label="级别"
                width="180">
            </el-table-column>
            <el-table-column
                prop="certResult"
                label="等级">
            </el-table-column>
            <el-table-column
                prop="certProv"
                label="省级">
            </el-table-column>
            <el-table-column
                prop="certCity"
                label="市级">
            </el-table-column>
            <el-table-column
                prop="issueDate"
                label="评定日期">
            </el-table-column>
            <el-table-column
                prop="expired"
                label="有效期至">
            </el-table-column>

        </el-table>
        <div class="block" style="margin-top:20px;">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                :page-count="pageCount"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalSize">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import {
        getJsonData
    } from '../api/index.js'

    export default {
        data() {
            return {
                value7: '',
                options3: [],
                input10: '',
                tableData: [],
                currentPage4: '',
                currentPage: '',
                province: '',
                shi: '',
                options:'',
                pageSize:20,
                pageCount:1,
                shi1:'',
                totalSize:1,
                distinction:'',
                distinctionList:[],
                ssessLevelList:[],
                ssessLevel:'',
                comepname:'',
                evaluation:'',
                times:'',
            }
        },
        mounted() {
            this.getData();
         this.getProvinceData();
            this.getdelete();
            this.getPrizeList();
    },
        methods: {
            getData() {
                let postBaseUrl = "http://pre-admin.biaodaa.com"
                console.log(333);
                let dataParam = JSON.stringify({
                    currentPage: 1,
                    pageSize: 20,
                    tabType: "safety_cert",
                    comName: this.comepname,
                    certProvCode: "",
                    certCityCode: "",
                    certLevel: "",
                    certResult: "",
                    expired: this.times,
                    issueDate: this.evaluation,
                });
                getJsonData(postBaseUrl + "/corp/requ/list", dataParam).then(res => {
                    let dataArray = res.data;
                    this.tableData = dataArray.list;
                    console.log(9999);
                    this.totalSize = res.data.total;
                    this.pageCount = res.data.pageCount;
                    this.pageSize = res.data.currentPage;
                });

            },
            //获取省市
            getProvinceData() {
                let postBaseUrl = "http://pre-admin.biaodaa.com";
                getJsonData(postBaseUrl + '/common/area').then(res => {
                    let dataArray = res.data;
                    this.options = dataArray;
                    console.log(7777)
                })
                this.queryData();
            },
            queryData: function () {
                let dataModel = new Object();
                dataModel.currentPage = this.currentPage;
                dataModel.pageSize = this.pageSize;
                dataModel.regisAddress = this.province;
                dataModel.city = (this.shi == "全部") ? "" : this.shi;
                dataModel.comName = this.compName;
                let dataParam = JSON.stringify(dataModel);
                getJsonData("/company/list", dataParam).then(res => {
                    let dataObject = res.data;
                    this.companyInfo = dataObject;
                    this.total = res.data.total;
                    this.pageCount = res.data.pageCount;
                    this.pageSize = res.data.pageSize;
                    console.log(8888888888888);

                });

            },
            // 选省
            choseProvince: function (e) {
                for (var index2 in this.options) {
                    if (e === this.options[index2].areaCode) {
                        this.province = this.options[index2].areaName;

                        let cityArray = this.options[index2].citys;
                        if (cityArray != null && cityArray.length > 0) {
                            let dataBean = new Object();
                            dataBean.areaName = "全部";
                            dataBean.areaCode = "";
                            dataBean.pkid = "";
                            var firstDataBean = cityArray[0];
                            if (firstDataBean.areaName != "全部") {
                                cityArray.unshift(dataBean);
                            }
                            this.shi1 = cityArray;
                            this.shi = this.options[index2].citys[0].areaName;
                        } else {
                            this.shi = "全部";
                            let array = new Array();
                            let dataBean = new Object();
                            dataBean.areaName = "全部";
                            dataBean.areaCode = "";
                            dataBean.pkid = "";
                            array.push(dataBean)
                            this.shi1 = array;
                        }
                        this.queryData();
                    }
                }
            },

//            删除安全认证
            getdelete() {
                let postBaseUrl = "http://pre-admin.biaodaa.com";
                console.log(666);
                let dataParam = JSON.stringify({
                        tabType: "",
                        pkids: "",
                    }
                );
                getJsonData(postBaseUrl + '/corp/requ/del', dataParam).then(res => {
                    console.log(858585);
                });
            },
            handleSizeChange() {
                this.pageSize = val;
                this.queryData();
            },
            handleCurrentChange() {
                this.currentPage = val;
                this.queryData();
            },
            deleteConfirm() {
                let selectDataList = this.selectDataList;
                if (selectDataList == null || selectDataList.length == 0) {
                    this.$message({
                        type: 'info',
                        message: "没有选择项"
                    });
                    return;
                }
                this.$confirm('此操作将删除该条企业, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteData();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },

//            删除获奖信息
            deleteData() {
                let postBaseUrl = "http://pre-admin.biaodaa.com";
                console.log(666);
                let selectDataList = this.selectDataList;
                let pkidStr = "";
                for (let i = 0; i < selectDataList.length; i++) {
                    pkidStr += selectDataList[i].pkid + "|";
                }

                let dataParam = JSON.stringify({
                        tabType: "safety_cert",
                        pkids: pkidStr,
                    }
                );
                getJsonData(postBaseUrl + '/corp/requ/del', dataParam).then(res => {
                    this.$message({
                        type: 'info',
                        message: res.msg
                    });
                    this.getData();
                });
            },
            getPrizeList(){
                let  distinctionList=new Array();
                for( let i=0;i<3;i++){
                    let obj=new Object();
                    if(i==0){
                        obj.name='';
                        obj.value="全部"
                    }else if(i==1){
                        obj.value='1'
                        obj.name='省级'
                    }else if(i==2){
                        obj.value='2'
                        obj.name='市级'
                    }
                    distinctionList.push(obj);
                }
                this.distinctionList=distinctionList;
                let  ssessLevelList=new Array();
                for( let i=0;i<3;i++){
                    let obj=new Object();
                    if(i==0){
                        obj.name='';
                        obj.value="全部"
                    }else if(i==1){
                        obj.value='1'
                        obj.name='优秀'
                    }else if(i==2){
                        obj.value='2'
                        obj.name='合格'
                    }
                    ssessLevelList.push(obj);
                }
                this.ssessLevelList=ssessLevelList;
            },
            select(objArr) {
                this.selectDataList = objArr;
            },
            selectAll(objArr) {
                this.selectDataList = objArr;
            },
        }
    }

</script>
<style lang="less" scoped>
    @import '../style/mixin.less';

    /*.el-button {*/
    /*line-height: 0;*/
    /*}*/

    .bdd_header {
        margin-left: 30px;
        margin-right: 30px;
    }

    .bdd_pur {
        width: 88px;
    }

    .el-input {
        width: 180px;
    }
</style>

