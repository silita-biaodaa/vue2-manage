
<template>
    <div class="bdd_header">

        <!--table切换-->
        <el-row :gutter="20">
            <el-col :span="20">
                <div class="grid-content bg-purple">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/prize' }"><span style="color:dodgerblue">获奖信息</span></el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/quality'}">公路信用评价等级</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/record' }">安全生产许可证</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/safety' }">不良记录</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/security' }">安全认证</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/' }"></el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-col>
            <el-col :span="4">
                <!--<div class="grid-content bg-purple">-->
                    <!--<el-button @click="handleEdit(scope.$index,scope.row)" type="primary  }">查看数据维护日志</el-button>-->
                <!--</div>-->
            </el-col>
        </el-row>

        <!--多选框-->
        <el-row style="margin-top: 30px;">
            <el-col :span="24" style="line-height:50px;">
                        <span class="grid-content bg-purple-dark ">奖项级别：
            <el-select style="margin-left: 5px;"
               class="el-input"
               v-model="prizeLevel"
               @change="getData(1)"
               placeholder="请选择">
              <el-option
                  v-for="item in prizeLevelList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
              </el-option>
            </el-select></span>
                <span style="margin-left:40px;" class="grid-content bg-purple-dark">所属地区：
            <el-select class="bdd_pur"
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
                               @change="getData(1)"
                               placeholder="市级地区">
            <el-option
                v-for="item in shi1"
                :key="item.pkid"
                :label="item.areaName"
                :value="item.areaCode">
            </el-option>
          </el-select></span>
                <span style="margin-left:20px;" class="grid-content bg-purple-dark">奖项名称：<el-input
                    placeholder="请输入内容"
                    v-model.trim="prizeName"
                    clearable>
        </el-input></span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <span class="grid-content bg-purple-dark">获奖年度：
        <el-input style="margin-left: 5px;" placeholder="请输入内容"
           v-model.trim="year" clearable>
        </el-input></span>
                <span style="margin-left:40px;" class="grid-content bg-purple-dark">企业名称：<el-input
                    placeholder="请输入内容"
                    v-model.trim="comName"
                    clearable>
        </el-input></span>
                <span style="margin-left:20px;" class="grid-content bg-purple-dark">项目名称：<el-input
                    placeholder="请输入内容"
                    v-model.trim="proName"
                    clearable>
        </el-input></span>

            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <span class="grid-content bg-purple-dark">项目类型：
        <el-input style="margin-left: 5px;margin-top: 10px;"
             placeholder="请输入内容"
             v-model.trim="proTypeName" clearable>
        </el-input></span>

            </el-col>
        </el-row>
        <!--按钮查询-->
        <el-row>
            <el-col :span="24" style="margin-top: 30px;">
                <el-row>
                    <el-button type="primary" @click="getData(1)">查询</el-button>
                    <el-button type="primary" @click="deleteConfirm" v-show="isAllows">删除</el-button>
                    <el-button type="primary" @click="allDelete" v-show="isAllows">全部删除</el-button>
                    <el-button type="primary"  @click="educe" v-show="isAllows">导出Excel</el-button>
                   

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
                    <!-- <div v-show="excelPath" ><a style="margin-left: 10px;" download="w3logo" :href="excelPath" >{{excelPath}} -->
                    <!-- </a><span  @click="deletPath">&nbsp;&nbsp;<i style="color: #3a8ee6" class="el-icon-circle-close-outline"></i></span></div> -->
                    
                </el-row>
            </el-col>
        </el-row>

        <!--table表格-->
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
                label="企业"
                width="150">
            </el-table-column>
            <el-table-column
                prop="level"
                label="奖项级别"
                width="120">
            </el-table-column>
            <el-table-column
                prop="prov"
                label="省级"
                width="120">
            </el-table-column>
            <el-table-column
                prop="city"
                label="市级"
                width="120">
            </el-table-column>
            <el-table-column
                prop="awdName"
                label="奖项名称"
                width="300">
            </el-table-column>
            <el-table-column
                prop="year"
                label="获奖年度 "
                width="120">
            </el-table-column>
            <el-table-column
                prop="proName"
                label="项目名称"
                width="120">
            </el-table-column>
            <el-table-column
                prop="proTypeName"
                label="项目类型"
                width="120">
            </el-table-column>
            <el-table-column
                prop="issueDate"
                label="发文日期"
                width="120">
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
    </div>
</template>
<script>
    import axios from 'axios'
    import {
        getJsonData,EXport1,reCol
    } from '../api/index.js'

    export default {
        data() {
            return {
                options: [],
                level: [],
                options3: '',
                input10: '',
                tableData: [],
                currentPage: 1,
                pageSize: 20,
                pageCount: 20,
                totalSize: 1,
                total: '',
                province: '',
                shi: '',
                prizeLevel: '',
                prizeLevelList: [],
                shi1: [],
                prizeName: "",
                proTypeName: "",
                proName: "",
                year: "",
                comName: "",
                selectDataList: [],
                excelPath: '',
                upLoadExcelTxt:'上传Excel',
                func:false,
                exceLrose:'',
                excel1:'',
                isAllows: null,
            }
        },

        mounted() {
            this.getData();
            this.getProvinceData();
            // this.getYearArray();
            this.getPrizeList();

        },
        created() {
            this.isAllows = this.$route.query.isAllows;
        },

        methods: {
            text() {
               console.log(this.year)     
            },
            //  获奖信息接口
            getData(param) {
//                let postBaseUrl = "http://pre-admin.biaodaa.com";
//                console.log(1111)
                if (param != null) {
                    this.currentPage = 1;
                }
                let dataParam = JSON.stringify({
                        tabType: "win_record",
                        comName: this.comName,
                        level: this.prizeLevel,
                        provCode: this.province,
                        cityCode: this.shi,
                        awdName: this.prizeName,
                        proTypeName: this.proTypeName,
                        proName: this.proName,
                        year: this.year,
                        currentPage: this.currentPage ? this.currentPage : "1",
                        pageSize: this.pageSize + ""
                    }
                );
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
                });
            },
//            获取省市
            getProvinceData() {
//                let postBaseUrl = "http://pre-admin.biaodaa.com";
                getJsonData('/common/area').then(res => {
                    let dataArray = new Array();
                    let obj = new Object();
                    obj.areaCode = "";
                    obj.areaName = "全部";
                    let arr = new Array();
                    let sunObj = new Object();
                    sunObj.areaCode = "";
                    sunObj.areaName = "全部";
                    arr.push(sunObj);
                    obj.citys = arr;
                    dataArray.push(obj);
                    if (res.data != null && res.data.length > 0) {
                        dataArray = dataArray.concat(res.data);
                    }
                    this.options = dataArray;
                    this.shi1 = arr;
                })
            },
            // 选省
            choseProvince: function (e) {
                this.shi = "";
                for (var index2 in this.options) {
                    if (e === this.options[index2].areaCode) {
                        // this.province = this.options[index2].areaName;
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
                            //this.shi = this.options[index2].citys[0].areaName;
                        } else {
                            // this.shi = "全部";
                            let array = new Array();
                            let dataBean = new Object();
                            dataBean.areaName = "全部";
                            dataBean.areaCode = "";
                            dataBean.pkid = "";
                            array.push(dataBean)
                            this.shi1 = array;
                        }
                        this.getData();
                    }
                }
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
                this.$confirm('此操作将删除数据, 是否继续?', '提示', {
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
//                let postBaseUrl = "http://pre-admin.biaodaa.com";
//                console.log(666);
                let selectDataList = this.selectDataList;
                let pkidStr = "";
                for (let i = 0; i < selectDataList.length; i++) {
                    pkidStr += selectDataList[i].pkid + "|";
                }

                let dataParam = JSON.stringify({
                        tabType: "win_record",
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
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getData();
            },
            //组装获奖等级数组
            getPrizeList() {
                //声明一个数组
                let prizeLevelList = new Array();
                //for循环
                for (let i = 0; i < 4; i++) {
                    //声明一个对象
                    let obj = new Object();
                    //根据不同的数值封装对象
                    if (i == 0) {
                        obj.value = "";
                        obj.name = "全部";
                    } else if (i == 1) {
                        obj.value = "1";
                        obj.name = "国家级";
                    } else if (i == 2) {
                        obj.value = "2";
                        obj.name = "省级";
                    } else if (i == 3) {
                        obj.value = "3";
                        obj.name = "市级";
                    }
                    //把对象填充到数组中
                    prizeLevelList.push(obj);
                }
                this.prizeLevelList = prizeLevelList;
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
                console.log(formData,432)
                formData.append('file', file);
                formData.append('tabType', 'win_record');
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
                            message: '上传失败,请下载上传结果查看'
                        });
                        this.excelPath = res.data.data;
                    } else {
                        this.$message({
                            type: 'success',
                            message: '上传成功~'
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
            allDelete() {
               this.$confirm('是否删除筛选全部数据 , 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    reCol({tabType:'win_record',comName:this.comName,level:this.prizeLevel,year:this.year,provCode:this.province,cityCode:this.shi,awdName:this.prizeName,proTypeName:this.proTypeName,proName:this.proName}).then( res=> {
                        if(res.code ==1) {
                            this.getData(1)
                            this.$message({
                                type:'success',
                                message:'筛选数据全部删除'
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
               
            },
            educe() {
                   if (!this.tableData ) {
                       return this.$message({
                           type:'warning',
                           message:'暂无数据可导出!'
                       }) 
                   }     

                EXport1({tabType: "win_record",comName: this.comName,level: this.prizeLevel,provCode: this.province,cityCode: this.shi,awdName: this.prizeName,year: this.year,proTypeName: this.proTypeName,proName: this.proName,}).then( res => {
                    if(res.code == 1) {
                         this.excel1 = res.data
                         const elink = document.createElement('a');
                         elink.href = this.excel1
                         elink.download = 'w3logo'
                        document.body.appendChild(elink);
                        elink.click();
                        document.body.removeChild(elink);

                    }
                })
            }

        },

    }

</script>



<style lang="less" scoped>
    @import '../style/mixin.less';

    /*.el-button {*/
    /*line-height: 0;*/
    /*}*/
    .upload-demo {
        display: inline-block;

    }
    .el-breadcrumb__item:nth-child(1){
        color:#ff0000;
    }
    .el-breadcrumb__inner{
        color:#ff0000;
    }
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

    .bdd_color {
        color: yellow;
    }

    .el-button--small {
        padding: 13px 15px;
    }
    .bdd_no {
       text-decoration:none;
       color:#fff;  
    }

</style>