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
        <el-row style="margin-top:30px">
            <el-col :span="24" style="line-height:50px;">
                <span class="grid-content bg-purple-dark">项目名称：<el-input style="margin-left: 5px;"
                                                                         placeholder="请输入内容"
                                                                         v-model.trim="input10"
                                                                         clearable>
        </el-input></span>
                <span style="margin-left:19px;" class="grid-content bg-purple-dark ">省份：

                    <el-select
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
                <span style="margin-left:20px;" class="grid-content bg-purple-dark">年度：<el-select
                    v-model="curYear"
                    @change="queryYear"
                    placeholder="省级地区">
              <el-option
                  v-for="item in yearArr"
                  :key="item.year"
                  :label="item.year"
                  :value="item.year">
              </el-option>
            </el-select>
</span>
                <span style="margin-left:20px;" class="grid-content bg-purple-dark">等级：<el-select class="bdd_pur"
                                                                                                  v-model="ssessLevel" @change="getData" placeholder="请选择">
    <el-option
        v-for="item in ssessLevelList"
        :key="item.value"
        :label="item.name"
        :value="item.value">
    </el-option>
  </el-select></span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" style="margin-top: 30px;">
                <el-row>
                    <el-button type="primary">查询</el-button>
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
                prop="prov"
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
                tableData: [],
                comName: '',
                province: '',
                assessYear: '',
                assessLevel: '',
                currentPage: 1,
                pageSize: 20,
                province: '',
                assessProvCode: '',
                assessLevel: '',
                assessYear: '',
                province: '',
                curYear:'',
                assessLevel: '',
                options3: '',
                pageCount: 20,
                totalSize: 100,
                currentPage4: '',
                input10: '',
                options: [],
                yearArr: [],
                assessLevel:'',
                ssessLevel:'',
                ssessLevelList:[],
            }
        },

        mounted() {
            this.getData();
            this.getProvinceData();
            this.getYearArray();
            this.getdelete();
            this.getPrizeList();



        },
        methods: {
            //  获取省份接口
            getProvinceData() {
                //获取省份列表
                getJsonData("/common/area").then(res => {
                    let dataArray = res.data;
                    this.options = dataArray;
                });
            },
            getData() {
                let postBaseUrl = "http://pre-admin.biaodaa.com";
                console.log(1111)
                //获取公路信用评价等级列表
                let dataParam = JSON.stringify({
                        currentPage: 1,
                        pageSize:this.pageSize,
                        tabType: "highway_grade",
                        comName: "",
                        province: "",
                        assessProvCode: "",
                        assessLevel:this.ssessLevel,
                        assessYear: this.assessYear,
                        pageCount:this.pageCount,
                    }
                );

                getJsonData(postBaseUrl + "/corp/requ/list", dataParam).then(res => {
                    let dataArray = res.data;
                    this.tableData = dataArray.list;
                    this.pageCount = res.data.pageCount;
                    this.totalSize = res.data.total;
                    this.pageSize = res.data.pageSize;
                    this.currentPage = res.data.currentPage;
                    console.log(1111);
                });
            },
            getYearArray() {
                let curDate = new Date();//获取当天日期
                let curYear = curDate.getFullYear();//获取当年年份
                let yearArr = new Array();
                for (let i = 0; i < 10; i++) {//取最近10年的数据
                    let curYearNum = Number(curYear);//转化为数字类型进行计算
                    let obj = new Object();//定义对象接收年份
                    obj.year = curYearNum-i;  //定义变量接收年份,当前年份减i
                    yearArr.push(obj);//将对象push到数组中
                }
                this.yearArr = yearArr;//接收数组
            },

//            公路信用等级删除接口
            getdelete(){
                let postBaseUrl = "http://pre-admin.biaodaa.com";
                console.log(555);
                let dataParam = JSON.stringify({
                        tabType:" ",
                        pkids:" ",
                    }
                );
                getJsonData(postBaseUrl + "/corp/requ/list", dataParam).then(res => {
                    console.log(5555);
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
                        tabType: "highway_grade",
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
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            queryYear(){//年份查询方法，下拉值改变时触发此方法

                this.assessYear=this.curYear;//将下拉获取的数据赋值给assessYear，
                this.getData();//查询数据

            },

            handleCurrentChange(val) {
                this.currentPage = val;
                this.getData();
            },
            //组装获奖等级数组
            getPrizeList(){
                //声明一个数组
                let ssessLevelList = new Array();
                //for循环
                for(let i=0;i<6;i++){
                    //声明一个对象
                    let obj = new Object();
                    //根据不同的数值封装对象
                    if(i==0){
                        obj.value="";
                        obj.name="全部";
                    }else if(i==1){
                        obj.value="1";
                        obj.name="AA";
                    }else if(i==2){
                        obj.value="2";
                        obj.name="A";
                    }else if(i==3){
                        obj.value="3";
                        obj.name="B";
                    }else if(i==4){
                        obj.value="4";
                        obj.name="C";
                    }else if(i==5){
                        obj.value="4";
                        obj.name="D";
                    }
                    //把对象填充到数组中
                    ssessLevelList.push(obj);
                }
                this.ssessLevelList = ssessLevelList;
            },
            select(objArr){
                this.selectDataList=objArr;
            },
            selectAll(objArr){
                this.selectDataList=objArr;
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


