<template>
    <!--导航栏-->
    <el-container>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path:'/userlist' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item  :to="{ path:'/editer' }">编辑</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path:'/rease' }">增加企业</el-breadcrumb-item>
        </el-breadcrumb>
        <!--搜索框-->
        <el-header>
            <div><span>所属地区：
                      <el-select
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
        
            <el-select
              v-model="shi"
             @change="queryData"
              placeholder="市级地区">
              <el-option
                v-for="item in shi1"
                :key="item.pkid"
                :label="item.areaName"
                :value="item.areaName">
              </el-option>
            </el-select>
                    </span>
            </div>
        </el-header>
        <div style="width:100%;text-align:left;overflow: hidden">
            <div style="margin-top: 15px;">
                <el-input placeholder="请按照企业名称模糊搜索" v-model.trim="compName" @keyup.enter.native="queryData" class="input-with-select">
    
                    <el-button slot="append" @click="queryData" icon="el-icon-search"></el-button>
                </el-input>
                <span style="float: right">
                              <router-link to="/rease"><el-button type="primary">增加企业</el-button></router-link>
                        <el-button type="primary">批量数据维护</el-button>
                        </span>
            </div>
        </div>
        <el-main style="width: 100%;text-align:right;">
    
        </el-main>
        <!--表格-->
        <el-table :data="companyInfo.list" style="width: 100%;border: 1px solid #ccc;">
            <el-table-column prop="comName" label="公司名称">
            </el-table-column>
            <el-table-column prop="regisAddress" label="所属地区">
            </el-table-column>
            <el-table-column prop="createDate" label="创建日期" width="150">
    
            </el-table-column>
            <el-table-column prop="updateDate" label="最后更近日期" width="150">
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                            <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑
                            </el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">详情
                            </el-button>
</template>
            </el-table-column>
        </el-table>
        <div class="block" style="margin-top: 30px;">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                :page-count="pageCount"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </el-container>
</template>

<script>
    import axios from "axios";
    import {
        getJsonData
    } from "../api/index.js";
    
    export default {
        data() {
            return {
                tableData: [],
                options: [],
                selectedOptions: [],
                province: '',
                shi: '',
                shi1: [],
                props: {
                    children: "cities"
                },
                val: {},
                vals: [],
                currentPage:1,
                companyInfo:{},
                compName: '',
                 start:0,
                  pageSize:20, 
                  total:0,
                  pageCount:0
            };
        },
        mounted() {//进入页面调用方法
            this.getProvinceData();
        },
        methods: {
            handleEdit(index, row) {
                // 编辑框的跳转
                const {
                    href
                } = this.$router.resolve({
                    name: "editer",
                    params: {
                        id: row.name
                    }
                });
    
                window.open(href, "-blank");
            },
            sendParams(){
            this.$router.push({
            path: 'yourPath', 
            name: '要跳转的路径的 name,在 router 文件夹下的 index.js 文件内找',
            params: { 
                name: 'name', 
                dataObj: this.msg
            }
            });
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.queryData();
             },
             handleCurrentChange(val) {
                 this.currentPage=val;
                 this.queryData();
              
            },
            //  企信首页列表接口
            getProvinceData() {
                //获取省份列表
                getJsonData("/common/area").then(res => {
                    let dataArray = res.data;
                    this.options = dataArray; 
                });
                //查询企业列表数据
               this.queryData();
            },
            queryData:function(){
                let dataModel = new Object();
                        dataModel.start = this.currentPage;
                        dataModel.pageSize =this.pageSize;
                        dataModel.regisAddress = this.province;
                        dataModel.city = (this.shi=="全部")?"":this.shi;
                        dataModel.comName =this.compName;
                        let dataParam = JSON.stringify(dataModel);
                getJsonData("/company/list",dataParam).then(res => {
                    let dataObject = res.data;
                    this.companyInfo = dataObject;
                    this.total = res.data.total;
                    this.pageCount =  res.data.pageCount;
                    this.pageSize =  res.data.pageSize;
                    console.log(8888888888888);
                   
                });
            },
            // 选省
            choseProvince: function(e) {
                for (var index2 in this.options) {
                    if (e === this.options[index2].areaCode) {
                        this.province = this.options[index2].areaName;
                        
                        let cityArray = this.options[index2].citys;
                         if(cityArray!=null&&cityArray.length>0){
                             let dataBean = new Object();
                             dataBean.areaName = "全部";
                             dataBean.areaCode="";
                             dataBean.pkid = "";
                             var firstDataBean = cityArray[0];
                             if(firstDataBean.areaName !="全部"){
                             cityArray.unshift(dataBean);
                             }
                              this.shi1 = cityArray;
                              this.shi = this.options[index2].citys[0].areaName;
                        }else{
                            this.shi = "";
                        }
                       
                       
                        
                         this.queryData();
                    }
                }
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../style/mixin.less";
    .el-header {
        height: 100px;
        background-color: #f8f8f8;
        margin-top: 30px;
        line-height: 60px;
        width: 100%;
    }
    
    .el-row {
        line-height: 60px;
    }
    
    .el-input {
        width: 60%;
    }
    
    .el-row {
        margin-bottom: 20px;
    }
    
    .el-col {
        border-radius: 4px;
    }
    
    .bg-purple-dark {
        background: #99a9bf;
    }
    
    .bg-purple {
        background: #d3dce6;
    }
    
    .bg-purple-light {
        background: #e5e9f2;
    }
    
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    
    .el-select .el-input {
        width: 130px;
    }
    
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
    
    .el-input[data-v-e47dfd12] {
        width: 100%;
    }
    
    .el-input[data-v-e47dfd12][data-v-e47dfd12] {
        width: 30%;
    }
</style>
