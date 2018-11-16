<template>
    <div class="bdd_header">
        <el-row :gutter="20">
            <el-col :span="20">
                <div class="grid-content bg-purple">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/prize' }">获奖信息</el-breadcrumb-item>
                        <el-breadcrumb-item  :to="{ path: '/quality'}"><span style="color:dodgerblue">公路信用评价等级</span></el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/record' }">安全生产许可证</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/safety' }">不良记录</el-breadcrumb-item>
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
        <el-row style="margin-top:30px">
            <el-col :span="24" style="line-height:50px;">
                <span class="grid-content bg-purple-dark">企业名称：<el-input style="margin-left: 5px;"
                                                                         placeholder="请输入内容"
                                                                         v-model.trim="comName"
                                                                         clearable>
        </el-input></span>
                <span style="margin-left:19px;" class="grid-content bg-purple-dark ">省份：
                    <el-select
                        v-model="province"
                        @change="getData(1)"
                        placeholder="省级地区">
              <el-option
                  v-for="item in options"
                  :key="item.pkid"
                  :label="item.areaName"
                  :value="item.areaCode">
              </el-option>
            </el-select>

                </span>
                <span style="margin-left:20px;" class="grid-content bg-purple-dark">年度：<el-select
                    v-model="curYear"
                    @change="queryYear"
                    placeholder="年份">
              <el-option
                  v-for="item in yearArr"
                  :key="item.year"
                  :label="item.name"
                  :value="item.year">
              </el-option>
            </el-select>
</span>
                <span style="margin-left:20px;" class="grid-content bg-purple-dark">等级：<el-select class="bdd_pur"
                                                                                                  v-model="ssessLevel"
                                                                                                  @change="getData(1)"
                                                                                                  placeholder="请选择">
    <el-option
        v-for="item in ssessLevelList"
        :key="item.value"
        :label="item.name"
        :value="item.value">
    </el-option>
  </el-select></span>
            </el-col>
        </el-row>
        <!--按钮查询-->
        <el-row>
            <el-col :span="24" style="margin-top: 30px;">
                <el-row>
                    <el-button type="primary" @click="getData(1)">查询</el-button>
                    <el-button type="primary" @click="deleteConfirm">删除</el-button>
                    <el-button type="primary" @click="allDelete">全部删除</el-button>
                    <el-button type="primary"  @click="educe"  >导出Excel</el-button>
                    <el-upload
                        class="upload-demo"
                        :disabled="func"
                        action="" :http-request='uploadFileMethod' :show-file-list="false">
                        <el-button style="margin-left:10px;" type="primary" size="small">{{upLoadExcelTxt}}</el-button>
                    </el-upload>
                    <el-button type="primary" v-show="excelPath" style="margin-left: 10px;"  >
                        </a><span  @click="deletPath"><i style="color: #ffffff" class="el-icon-circle-close-outline"></i></span>
                    </el-button>
                    <!--<el-button style="margin-left: 10px;" type="primary">导出Excel</el-button>-->
                    <!-- <div style="margin-left: 10px;" v-show="excelPath">{{excelPath}}<span  @click="deletPath">&nbsp;&nbsp;<i style="color: #3a8ee6" class="el-icon-circle-close-outline"></i></span> -->
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
                width="300">
            </el-table-column>
            <el-table-column
                prop="province"
                label="省份"
                width="200">
            </el-table-column>
            <el-table-column
                prop="assessYear"
                label="年度"
                width="300">
            </el-table-column>
            <el-table-column
                prop="assessLevel"
                label="等级"
                width="300">
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
                tableData: [],
                comName: '',
                province: '',
                assessYear: '',
                assessLevel: '',
                currentPage: 1,
                pageSize: 20,
                assessProvCode: '',
                curYear: '',
                options3: '',
                pageCount: 20,
                totalSize: 100,
                currentPage4: '',
                input10: '',
                options: [],
                yearArr: [],
                ssessLevel: '',
                ssessLevelList: [],
                excelPath: '',
                upLoadExcelTxt:'上传Excel',
                func:false,
                excel1:''
            }
        },

        mounted() {
            this.getData();
            this.getProvinceData();
            this.getYearArray();
            this.getPrizeList();


        },
        methods: {
            //  获取省份接口
            getProvinceData() {
                //获取省份列表
                getJsonData("/common/area").then(res => {
                    let dataArray = new Array();
                    let obj = new Object();
                    obj.areaCode = "";
                    obj.areaName = "全部";
                    dataArray.push(obj);
                    if (res.data != null && res.data.length > 0) {
                        dataArray = dataArray.concat(res.data);
                    }
                    this.options = dataArray;
                });
            },
            getData(param) {
//                let postBaseUrl = "http://pre-admin.biaodaa.com";
//                console.log(1111)
                if (param != null) {
                    this.currentPage = 1;
                }              //获取公路信用评价等级列表
                let dataParam = JSON.stringify({
                        currentPage: this.currentPage ? this.currentPage : 1,
                        pageSize: this.pageSize ? this.pageSize : 20,
                        tabType: "highway_grade",
                        comName: this.comName,
                        province: this.getProvinceName(this.province),
                        assessProvCode: this.province,
                        assessLevel: this.ssessLevel,
                        assessYear: this.assessYear,

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

                    console.log(88888888);
                });
            },
            getProvinceName(code) {
                if (code == "") {
                    return "";
                }
                let provinceArr = this.options;
                if (provinceArr != null && provinceArr.length > 0) {
                    for (let i = 0; i < provinceArr.length; i++) {
                        if (provinceArr[i].areaCode == code) {
                            return provinceArr[i].areaName;
                        }
                    }
                }
                return "";

            },
            getYearArray() {
                let yearArr = new Array();
                let object = new Object();//定义对象接收年份
                object.year = "";
                object.name = "全部";
                yearArr.push(object);
                let curDate = new Date();//获取当天日期
                let curYear = curDate.getFullYear();//获取当年年份

                for (let i = 0; i < 10; i++) {//取最近10年的数据
                    let curYearNum = Number(curYear);//转化为数字类型进行计算
                    let obj = new Object();//定义对象接收年份
                    obj.year = curYearNum - i;  //定义变量接收年份,当前年份减i
                    obj.name = curYearNum - i;  //定义变量接收年份,当前年份减i
                    yearArr.push(obj);//将对象push到数组中
                }
                this.yearArr = yearArr;//接收数组
            },

//            公路信用等级删除接口
            deleteRoadData() {
//                let postBaseUrl = "http://pre-admin.biaodaa.com";
//                console.log(555);
                let dataParam = JSON.stringify({
                        tabType: " ",
                        pkids: " ",
                    }
                );
                getJsonData("/corp/requ/list", dataParam).then(res => {
                    console.log(5555);
                });
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

//            删除公路信用等级
            deleteData() {
//                let postBaseUrl = "http://pre-admin.biaodaa.com";
//                console.log(666);
                let selectDataList = this.selectDataList;
                let pkidStr = "";
                for (let i = 0; i < selectDataList.length; i++) {
                    pkidStr += selectDataList[i].pkid + "|";
                }

                let dataParam = JSON.stringify({
                        tabType: "highway_grade",
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
            queryYear() {//年份查询方法，下拉值改变时触发此方法

                this.assessYear = this.curYear;//将下拉获取的数据赋值给assessYear，
                this.getData();//查询数据

            },

            handleCurrentChange(val) {
                this.currentPage = val;
                this.getData();
            },
            //组装获奖等级数组
            getPrizeList() {
                //声明一个数组
                let ssessLevelList = new Array();
                //for循环
                for (let i = 0; i < 6; i++) {
                    //声明一个对象
                    let obj = new Object();
                    //根据不同的数值封装对象
                    if (i == 0) {
                        obj.value = "";
                        obj.name = "全部";
                    } else if (i == 1) {
                        obj.value = "AA";
                        obj.name = "AA";
                    } else if (i == 2) {
                        obj.value = "A";
                        obj.name = "A";
                    } else if (i == 3) {
                        obj.value = "B";
                        obj.name = "B";
                    } else if (i == 4) {
                        obj.value = "C";
                        obj.name = "C";
                    } else if (i == 5) {
                        obj.value = "D";
                        obj.name = "D";
                    }
                    //把对象填充到数组中
                    ssessLevelList.push(obj);
                }
                this.ssessLevelList = ssessLevelList;
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
                this.upLoadExcelTxt = "传输中……";
                this.excelPath = ''
                this.func = true
                let file = param.file;
                let formData = new FormData();
                formData.append('file', file);
                formData.append('tabType', 'highway_grade');
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
            allDelete() {
                this.$confirm('是否删除筛选全部数据 , 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    reCol({tabType:'highway_grade',comName:this.comName,assessProvCode:this.province,assessLevel:this.ssessLevel,assessYear:this.curYear}).then( res=> {
                        if(res.code == 1) {
                            this.getData(1)
                             this.$message({
                                 type:'success',
                                 message:'筛选数据全删成功'
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
                  if( !this.tableData ) {
                       return this.$message({
                           type:'warning',
                           message:'暂无数据可导出!'
                       }) 
                   }   
                this.curYear = this.curYear ? this.curYear : null; 
                EXport1({tabType:'highway_grade',comName:this.comName,assessProvCode:this.province,assessYear:this.curYear,assessLevel:this.ssessLevel}).then(res=> {

                     if(res.code == 1 ) {
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

    .el-breadcrumb__inner {
        color: red;
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


