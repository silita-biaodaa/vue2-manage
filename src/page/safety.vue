<template>
    <div class="bdd_header">
        <el-row :gutter="20">
            <el-col :span="20">
                <div class="grid-content bg-purple">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/prize' }">获奖信息</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/quality'}">公路信用评价等级</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/record' }">安全生产许可证</el-breadcrumb-item>
                        <el-breadcrumb-item  :to="{ path: '/safety' }"><span style="color:dodgerblue">不良记录</span></el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/security' }">安全认证</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/' }"></el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-col>
            <el-col :span="4">
                <!--<div class="grid-content bg-purple">-->
                    <!--<el-button type="primary">查看数据维护日志</el-button>-->
                <!--</div>-->
            </el-col>
        </el-row>
        <el-row style="margin-top: 30px;">
            <el-col :span="24" style="line-height:50px;">
            <span class="grid-content bg-purple-dark">企业名称：<el-input
                placeholder="请输入内容"
                v-model.trim="compname"
                clearable>
        </el-input></span>
                <span style="margin-left:20px;" class="grid-content bg-purple-dark">项目名称：<el-input
                    placeholder="请输入内容"
                    v-model.trim="project"
                    clearable>
        </el-input></span>
                <span style='margin-left: 20px;' class="grid-content bg-purple-dark">不良行为内容：<el-input
                    placeholder="请输入内容"
                    v-model.trim="action"
                    clearable>
        </el-input></span>
            </el-col>
        </el-row>

        <el-col :span="24" style="line-height:50px;">
            <span class="grid-content bg-purple-dark">发布单位：<el-input
                placeholder="请输入内容"
                v-model.trim="Release"
                clearable>
        </el-input></span>
            <span style="margin-left:20px;" class="grid-content bg-purple-dark">发布日期：<el-input
                placeholder="请输入内容"
                v-model.trim="issue"
                clearable>
        </el-input></span>
            <span style='margin-left: 20px;' class="grid-content bg-purple-dark">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;有效期至：<el-input
                placeholder="请输入内容"
                v-model.trim="valid"
                clearable>
        </el-input></span>
        </el-col>
        <el-col :span="24" style="line-height:50px;">
           <span class="grid-content bg-purple-dark">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;质：<el-select
               class="bdd_pur" v-model="property" @change="getData(1)" placeholder="请选择">
            <el-option
                v-for="item in natureList"
                :key="item.value"
                :label="item.name"
                :value="item.value">

            </el-option>
          </el-select>
                       </span>
            <!--按钮查询-->
            <el-row>
                <el-col :span="24" style="margin-top: 30px;">
                    <el-row>
                        <el-button type="primary" @click="getData(1)">查询</el-button>
                        <el-button type="primary" @click="deleteConfirm">删除</el-button>
                        <el-button type="primary" @click="allDelete">全部删除</el-button>
                        <el-button type="primary" @click="educe">导出Excel</el-button>

                        <el-upload
                            class="upload-demo"
                            :disabled="func"
                            action="" :http-request='uploadFileMethod' :show-file-list="false">
                            <el-button style="margin-left:10px;" type="primary" size="small">{{upLoadExcelTxt}}</el-button>
                        </el-upload>
                        <el-button type="primary" v-show="excelPath" style="margin-left: 10px;" >
                            <a download="w3logo" :href="excelPath" class="bdd_no" >查看结果
                            </a><span  @click="deletPath"><i style="color: #ffffff" class="el-icon-circle-close-outline"></i></span>
                        </el-button>
                        <!--<el-button style="margin-left: 10px;" type="primary">导出Excel</el-button>-->
                        <!-- <div style="margin-left: 10px;" @click="downLoadExcel" v-show="excelPath">{{excelPath}}<span  @click="deletPath">&nbsp;&nbsp;<i style="color: #3a8ee6" class="el-icon-circle-close-outline"></i></span> -->
                        <!-- </div> -->
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
                    width="240">
                </el-table-column>
                <el-table-column
                    prop="proName"
                    label="项目"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="badInfo"
                    label="不良行为内容">
                </el-table-column>
                <el-table-column
                    prop="property"
                    label="性质">
                </el-table-column>
                <el-table-column
                    prop="issueOrg"
                    label="发布单位">
                </el-table-column>
                <el-table-column
                    prop="issueDate"
                    label="发布日期">
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
                    :current-page.sync="currentPage"
                    :page-sizes="[10, 20, 60]"
                    :page-size="pageSize"
                    :page-count="pageCount"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalSize">
                </el-pagination>
            </div>
        </el-col>

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
                options3: [],
                tableData: [],
                currentPage: 1,
                pageSize: 20,
                pageCount: 20,
                totalSize: 1,
                total: 1,
                compname: '',
                project: '',
                action: '',
                Release: '',
                issue: '',
                valid: '',
                natureList: [],
                property: '',
                excelPath: '',
                upLoadExcelTxt:'上传Excel',
                func:false
            }
        },
        mounted() {
            this.getData();
            this.getProvinceData();
//            this.getYearArray();
//            this.getdelete();
            this.getPrizeList();
        },
        methods: {
            getData(param) {
//                let postBaseUrl = "http://pre-admin.biaodaa.com";
//                console.log(1111)
                if (param != null) {
                    this.currentPage = 1;
                }
//                let postBaseUrl = "http://pre-admin.biaodaa.com";
                console.log(999);
                let dataParam = JSON.stringify({
                    currentPage: this.currentPage ? this.currentPage : 1,
                    pageSize: this.pageSize ? this.pageSize : 20,
                    tabType: "undesirable",
                    comName: this.compname,
                    proName: this.project,
                    badInfo: this.action,
                    issueOrg: this.Release,
                    property: this.property,
                    issueDate: this.issue,
                    expired: this.valid,
                })
                getJsonData("/corp/requ/list", dataParam).then(res => {
                    let dataArray = res.data;
                    if (dataArray == null || dataArray.length == 0) {
                        this.tableData = dataArray.list;
                        this.totalSize = 0;
                        this.pageCount = 0;
                        this.currentPage = 1;
                    } else {
                        this.tableData = dataArray.list;
                        this.totalSize = res.data.total ? res.data.total : 0;
                        this.pageCount = res.data.pageCount ? res.data.pageCount : 0;
                        this.currentPage = res.data.currentPage ? res.data.currentPage : 1;
                    }

                    console.log(88888888);
                });


            },
//            获取省市
            getProvinceData() {
//                let postBaseUrl = "http://pre-admin.biaodaa.com";
                getJsonData('/common/area').then(res => {
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
            //组装获奖等级数组
            getPrizeList() {
                //声明一个数组
                let natureList = new Array();
                //for循环
                for (let i = 0; i < 3; i++) {
                    //声明一个对象
                    let obj = new Object();
                    //根据不同的数值封装对象
                    if (i == 0) {
                        obj.value = "";
                        obj.name = "全部";
                    } else if (i == 1) {
                        obj.value = "1";
                        obj.name = "严重";
                    } else if (i == 2) {
                        obj.value = "2";
                        obj.name = "一般";
                    }
                    //把对象填充到数组中
                    natureList.push(obj);
                }
                this.natureList = natureList;
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

//            删除不良信息
            deleteData() {
//                let postBaseUrl = "http://pre-admin.biaodaa.com";
//                console.log(666);
                let selectDataList = this.selectDataList;
                let pkidStr = "";
                for (let i = 0; i < selectDataList.length; i++) {
                    pkidStr += selectDataList[i].pkid + "|";
                }

                let dataParam = JSON.stringify({
                        tabType: "undesirable",
                        pkids: pkidStr,
                    }
                );
                getJsonData('/corp/requ/del', dataParam).then(res => {
                    this.$message({
                        type: 'info',
                        message: res.msg
                    });
                    let currentPage = this.currentPage;
                    if (currentPage > 1) {
                        currentPage = currentPage - 1;
                        this.currentPage = currentPage;
                    }
                    this.getData();
                });
            },
            select(objArr) {
                this.selectDataList = objArr;
            },
            selectAll(objArr) {
                this.selectDataList = objArr;
            },
            downLoadExcel() {
                window.location.url = this.excelPath;
            },
            //上传文件
            uploadFileMethod(param) {
                let upLoadExcelTxt =  this.upLoadExcelTxt;
                if(upLoadExcelTxt=="传输中……"){
                    return;
                }
               this.excelPath = ''
                this.upLoadExcelTxt = "传输中……";
                this.func = true
                let file = param.file;
                let formData = new FormData();
                formData.append('file', file);
                formData.append('tabType', 'undesirable');
//                let postBaseUrl = "http://pre-admin.biaodaa.com";
                axios.post('/upload/uploadCompanyFile', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': localStorage.getItem("Authorization")
                    }
                }).then(res => {
                    this.upLoadExcelTxt = "上传Excel";
                    this.func = false
                    if (res.data.code == 405) {
                        this.$message({
                            type: 'info',
                            message:'上传失败,请下载上传结果查看'
                        });
                        this.excelPath = res.data.data;
                    } else {
                        this.$message({
                            type: 'success',
                            message:'上传成功~'
                        });
                        this.getData();
                    }

                }).catch(error => {
                    console.log(error)
                })

            },
            deletPath(){
                this.excelPath = "";
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();

            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getData();
            },
            allDelete() {
                this.$confirm('是否删除筛选全部数据 , 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
              educe() {
                // exportX({}).then(res=> {
                //         const blob = new Blob([res]);
                //         const fileName = '公路信用评价等级.xlsx';
                //         const elink = document.createElement('a');
                //         elink.download = fileName;
                //         elink.style.display = 'none';
                //         elink.href = URL.createObjectURL(blob);
                //         document.body.appendChild(elink);
                //         elink.click();
                //         URL.revokeObjectURL(elink.href); // 释放URL 对象
                //         document.body.removeChild(elink);
                // })
            }
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

    .upload-demo {
        display: inline-block;

    }

    .el-button--small {
        padding: 13px 15px;
    }
    .bdd_no {
       text-decoration: none;
       color:#fff;
    }
</style>
