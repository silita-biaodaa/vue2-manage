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
                       <span class="grid-content bg-purple-dark">企业名称：<el-input
                           placeholder="请输入内容"
                           v-model.trim="comNames"
                           clearable>
        </el-input></span>
                <span style="margin-left:20px;" class="grid-content bg-purple-dark">安全生产许可证号：<el-input
                    placeholder="请输入内容"
                    v-model.trim="licenses"
                    clearable>
        </el-input></span>
                <span style="margin-left:20px;" class="grid-content bg-purple-dark">省份：<el-select class="bdd_pur"
                                                                                                  @change="getData"
                                                                                                  v-model="province"
                                                                                                  placeholder="省级地区">
            <el-option
                v-for="item in options"
                :key="item.pkid"
                :label="item.areaName"
                :value="item.areaCode">
            </el-option>
          </el-select>
          </span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" style="line-height:50px;">
                       <span class="grid-content bg-purple-dark">发布日期：<el-input
                           placeholder="请输入内容"
                           v-model.trim="Time"
                           clearable>
        </el-input></span>
                <span style="margin-left:20px;" class="grid-content bg-purple-dark">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;有效期至：<el-input
                    placeholder="请输入内容"
                    v-model.trim="items"
                    clearable>
        </el-input></span>

            </el-col>
        </el-row>
        <!--按钮查询-->
        <el-row>
            <el-col :span="24" style="margin-top: 30px;">
                <el-row>
                    <el-button type="primary" @click="getData">查询</el-button>
                    <el-button type="primary" @click="deleteConfirm">删除</el-button>
                    <el-upload
                        class="upload-demo"
                        action="" :http-request='uploadFileMethod' :show-file-list="false">
                        <el-button style="margin-left:10px;" type="primary"  size="small">上传Excel</el-button>
                    </el-upload>
                    <el-button style="margin-left: 10px;" type="primary">导出Excel</el-button>
                    <el-button style="margin-left: 10px;"  @click="downLoadExcel" v-show="excelPath">{{excelPath}}</el-button>
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
                width="360">
            </el-table-column>
            <el-table-column
                prop="certNo"
                label="安全生产许可证号"
                width="360">
            </el-table-column>
            <el-table-column
                prop="certProv"
                label="省份"
                width="180">
            </el-table-column>
            <el-table-column
                prop="issueDate"
                label="发布日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="expired"
                label="有效期至"
                width="180">
            </el-table-column>
        </el-table>
        <div class="block" style="margin-top:20px;">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
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
        getJsonData
    } from '../api/index.js'

    export default {
        data() {
            return {
                options3: [],
                tableData: [],
                input10: '',
                value7: '',
                currentPage4: '',
                currentPage: 1,
                options: [],
                pageSize:20,
                pageCount:20,
                totalSize:1,
                total:1,
                province:'',
                licenses:'',
                comNames:'',
                Time:'',
                items:'',
                excelPath:'',

            }
        },

        mounted() {
            this.getData();
            this.getProvinceData();
//            this.getYearArray();
//            this.getdelete();
        },
        methods: {
            //  获取省份接口
            getProvinceData() {
                //获取省份列表
                getJsonData("/common/area").then(res => {
                    let dataArray = new Array();
                    let obj = new Object();
                    obj.areaCode="";
                    obj.areaName="全部";
                    dataArray.push(obj);
                    if( res.data!=null&& res.data.length>0){
                        dataArray = dataArray.concat(res.data);
                    }
                    this.options = dataArray;
                });
            },
            getData() {
                let postBaseUrl = "http://pre-admin.biaodaa.com"
                console.log(333);
                let dataParam = JSON.stringify({
                    currentPage: this.currentPage,
                    pageSize: this.pageSize,
                    tabType: "safety_permission_cert",
                    comName: this.comNames,
                    certNo: this.licenses,
                    certProvCode: this.province,
                    expired: this.items,
                    issueDate: this.Time,

                });
                getJsonData(postBaseUrl+"/corp/requ/list", dataParam).then(res => {
                    let dataArray = res.data;
                    if(dataArray==null||dataArray.length==0){
                        this.tableData = dataArray.list;
                        this.totalSize = 0;
                        this.pageCount = 0;
                        this.currentPage =  1;
                    }else{
                        this.tableData = dataArray.list;
                        this.totalSize = res.data.total?res.data.total:0;
                        this.pageCount = res.data.pageCount?res.data.pageCount:0;
                        this.currentPage = res.data.currentPage?res.data.currentPage:1;
                    }

                    console.log(88888888);
                });

            },
            deleteConfirm(){
                let selectDataList = this.selectDataList;
                if(selectDataList==null||selectDataList.length==0){
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

//            删除公路信用等级
            deleteData() {
                let postBaseUrl = "http://pre-admin.biaodaa.com";
                console.log(666);
                let selectDataList = this.selectDataList;
                let pkidStr = "";
                for(let i=0;i<selectDataList.length;i++){
                    pkidStr += selectDataList[i].pkid+"|";
                }
                let dataParam = JSON.stringify({
                        tabType: "safety_permission_cert",
                        pkids: pkidStr,
                    }
                );
                getJsonData(postBaseUrl+'/corp/requ/del', dataParam).then(res => {
                    this.$message({
                        type: 'info',
                        message: res.msg
                    });
                    let currentPage = this.currentPage;
                    if(currentPage>1){
                        currentPage=currentPage-1;
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
            select(objArr){
                this.selectDataList=objArr;
            },
            selectAll(objArr){
                this.selectDataList=objArr;
            },
            downLoadExcel(){
                window.location.url = this.excelPath;
            },
            //上传文件
            uploadFileMethod(param){
                console.log(55555)
                let file = param.file;
                let formData = new FormData();
                formData.append('file',file);
                formData.append('tabType','safety_permission_cert');
                let postBaseUrl = "http://pre-admin.biaodaa.com";
                axios.post(postBaseUrl+'/upload/uploadCompanyFile', formData, {
                    headers: {'Content-Type': 'multipart/form-data','Authorization':  localStorage.getItem("Authorization")}
                }).then(res => {
                    if(res.data.code==405){
                        this.$message({
                            type: 'info',
                            message: res.data.msg+" 地址为："+res.data.data
                        });
                        this.excelPath=res.data.data;
                    }else {
                        this.$message({
                            type: 'info',
                            message: res.data.msg
                        });
                        this.getData();
                    }

                }).catch(error => {
                    console.log(error)
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
    .upload-demo{
        display: inline-block;

    }
    .el-button--small{
        padding:13px 15px;
    }

</style>

