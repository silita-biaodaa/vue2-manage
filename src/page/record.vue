<template>
    <div class="bdd_header">
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
                    <el-button type="primary">查看数据维护日志</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row style="margin-top: 30px;">
            <el-col :span="24" style="line-height:50px;">
                       <span class="grid-content bg-purple-dark">企业名称：<el-input
                           placeholder="请输入内容"
                           v-model="input10"
                           clearable>
        </el-input></span>
                <span style="margin-left:20px;" class="grid-content bg-purple-dark">安全生产许可证号：<el-input
                    placeholder="请输入内容"
                    v-model="input10"
                    clearable>
        </el-input></span>
                <span style="margin-left:20px;" class="grid-content bg-purple-dark">省份：<el-select class="bdd_pur"
                                                                                                  v-model="options"
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
          </el-select>
          </span>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24" style="line-height:50px;">
                       <span class="grid-content bg-purple-dark">发布日期：<el-input
                           placeholder="请输入内容"
                           v-model="input10"
                           clearable>
        </el-input></span>
                <span style="margin-left:20px;" class="grid-content bg-purple-dark">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;有效期至：<el-input
                    placeholder="请输入内容"
                    v-model="input10"
                    clearable>
        </el-input></span>

            </el-col>
            <el-col :span="24" style="margin-top: 30px;">
                <el-row>
                    <el-button type="primary">查询</el-button>
                    <el-button type="primary">删除</el-button>
                    <el-button type="primary">上传Excel</el-button>
                    <el-button type="primary">导出Excel</el-button>
                </el-row>
            </el-col>
        </el-row>
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
                options3: [],
                tableData: [],
                input10: '',
                value7: '',
                currentPage4: '',
                currentPage: 1,
                options: [],
                pageSize:10,
                pageCount:'',
                totalSize:'',
                total:'',
                pageCount:"",

            }
        },

        mounted() {
            this.getData();
            this.getProvinceData();
//            this.getYearArray();
            this.getdelete();
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
                let postBaseUrl = "http://pre-admin.biaodaa.com"
                console.log(333);
                let dataParam = JSON.stringify({
                    currentPage: 1,
                    pageSize: 10,
                    tabType: "safety_permission_cert",
                    comName: "",
                    certNo: "",
                    certProvCode: "",
                    expired: "",
                    issueDate: "",
                    pageCount:"",
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
//            删除安全生产许可证信息
            getdelete() {
                let postBaseUrl = "http://pre-admin.biaodaa.com";
                console.log(666);
                let dataParam = JSON.stringify({
                        tabType: "",
                        pkids: "",
                    }
                );
                getJsonData(postBaseUrl +'/corp/requ/del', dataParam).then(res => {
                    console.log(95959);
                });
            },

            handleSizeChange() {

            },
            handleCurrentChange(){

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

