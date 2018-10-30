<template>
    <div class="bdd_header">

        <!--table切换-->
        <el-row :gutter="20">
            <el-col :span="20">
                <div class="grid-content bg-purple">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
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
                    <el-button @click="handleEdit(scope.$index,scope.row)" type="primary  }">查看数据维护日志</el-button>
                </div>
            </el-col>
        </el-row>

        <!--多选框-->
        <el-row style="margin-top: 30px;">
            <el-col :span="24" style="line-height:50px;">
                        <span class="grid-content bg-purple-dark">奖项级别： <el-select class="el-input" v-model="level"
                                                                                   placeholder="请选择">
            <el-option-group
                v-for="group in options3"
                :key="group.label"
                :label="group.label">
              <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-option-group>
          </el-select></span>
                <span style="margin-left:20px;" class="grid-content bg-purple-dark">所属地区：<el-select class="bdd_pur"
                                                                                                    v-model="options"
                                                                                                    placeholder="请选择">
            <el-option-group
                v-for="item in options"
                :key="item.pkid"
                :label="item.areaName"
                :value="item.areaCode">
            </el-option-group>
          </el-select>
                        <el-select class="bdd_pur" v-model="options" placeholder="请选择">
            <el-option-group
                v-for="group in options"
                :key="group.label"
                :label="group.label">
              <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-option-group>
          </el-select></span>
                <span style="margin-left:20px;" class="grid-content bg-purple-dark">项目名称：<el-input
                    placeholder="请输入内容"
                    v-model="input10"
                    clearable>
        </el-input></span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <span class="grid-content bg-purple-dark">获奖年度：<el-input style="margin-left: 5px;" placeholder="请输入内容"
                                                                         v-model="input10" clearable>

        </el-input></span>
                <span style="margin-left:19px;" class="grid-content bg-purple-dark">项目名称：<el-input
                    placeholder="请输入内容"
                    v-model="input10"
                    clearable>
        </el-input></span>
                <span style="margin-left:20px;" class="grid-content bg-purple-dark">项目类型：<el-input
                    placeholder="请输入内容"
                    v-model="input10"
                    clearable>
        </el-input></span>

            </el-col>
        </el-row>

        <!--按钮查询-->
        <el-row>
            <el-col :span="24" style="margin-top: 30px;">
                <el-row>
                    <el-button type="primary">查询</el-button>
                    <el-button type="primary">删除</el-button>
                    <el-button type="primary">上传Excel</el-button>
                    <el-button type="primary">导出Excel</el-button>
                </el-row>
            </el-col>
        </el-row>

        <!--table表格-->
        <el-table
            :data="tableData"
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
                options:'',
                level:'',
                options3:'',
                input10:'',
                tableData:[],
                currentPage:1,
                pageSize:20,
                pageCount:'',
                totalSize:'',
            }
        },

        mounted() {
            this.getData();
            this.getProvinceData();
//            this.getYearArray();
            this.getdelete();
        },

        methods: {
            //  获奖信息接口
            getData() {
                let postBaseUrl = "http://pre-admin.biaodaa.com";
                console.log(1111)
                let dataParam = JSON.stringify({
                        currentPage: 1,
                        pageSize: 20,
                        tabType:"win_record",
                        comName:"",
                        level:"",
                        provCode:"",
                        cityCode:"",
                        awdName:"",
                        proTypeName:"",
                        proName:"",
                        year:"",
                        options:[],
                        pageCount:'',
                        total:'',
                    }
                );
                getJsonData(postBaseUrl+"/corp/requ/list",dataParam).then(res => {
                    let dataArray = res.data;
                    this.tableData = dataArray.list;
                    this.totalSize = res.data.total;
                    this.pageCount = res.data.pageCount;
                    this.currentPage = res.data.currentPage;
                    console.log(88888888);
                });
            },
//            获取省市
            getProvinceData(){
                let postBaseUrl = "http://pre-admin.biaodaa.com";
                getJsonData(postBaseUrl+'/common/area').then(res=>{
                    let dataArray = res.data;
                    this.options = dataArray;
                    console.log(7777)
                })
            },
//            删除获奖信息
            getdelete(){
                let postBaseUrl = "http://pre-admin.biaodaa.com";
                console.log(666);
                let dataParam = JSON.stringify({
                        tabType:"",
                        pkids:"",
                    }
                );
                getJsonData(postBaseUrl +'/corp/requ/list', dataParam).then(res => {
                    console.log(5555);
                });
            },
            handleSizeChange(){


            },
            handleCurrentChange() {

            },
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
</style>

