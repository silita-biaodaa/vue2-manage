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
                <span style="margin-left:20px;" class="grid-content bg-purple-dark">项目名称：<el-input
                    placeholder="请输入内容"
                    v-model="input10"
                    clearable>
        </el-input></span>
                <span style='margin-left: 20px;' class="grid-content bg-purple-dark">不良行为内容：<el-input
                    placeholder="请输入内容"
                    v-model="input10"
                    clearable>
        </el-input></span>
            </el-col>
        </el-row>

        <el-col :span="24" style="line-height:50px;">
            <span class="grid-content bg-purple-dark">发布单位：<el-input
                placeholder="请输入内容"
                v-model="input10"
                clearable>
        </el-input></span>
            <span style="margin-left:20px;" class="grid-content bg-purple-dark">发布日期：<el-input
                placeholder="请输入内容"
                v-model="input10"
                clearable>
        </el-input></span>
            <span style='margin-left: 20px;' class="grid-content bg-purple-dark">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;有效期至：<el-input
                placeholder="请输入内容"
                v-model="input10"
                clearable>
        </el-input></span>
        </el-col>
        <el-col :span="24" style="line-height:50px;">
           <span class="grid-content bg-purple-dark">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;质：<el-select
               class="bdd_pur" v-model="value7" placeholder="请选择">
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
                    :page-sizes="[10, 20, 50, 100]"
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
                input10: '',
                value7: '',
                options3: [],
                tableData: [],
                currentPage: 1,
                pageSize: 20,
                pageCount: '',
                totalSize: '',
                total: '',
            }
        },
        mounted() {
            this.getData();
//         this.getProvinceData();
//            this.getYearArray();
         this.getdelete();
        },
        methods: {
            getData() {
                let postBaseUrl = "http://pre-admin.biaodaa.com";
                console.log(999);
                let dataParam = JSON.stringify({
                    currentPage: 1,
                    pageSize: 20,
                    tabType: "undesirable",
                    comName: "",
                    proName: "",
                    badInfo: "",
                    issueOrg: "",
                    property: "",
                    issueDate: "",
                    expired: "",
                })
                getJsonData(postBaseUrl + "/corp/requ/list", dataParam).then(res => {
                    let dataArray = res.data;
                    this.tableData = dataArray.list;
                    this.totalSize = res.data.total;
                    this.pageCount = res.data.pageCount;
                    this.currentPage = res.data.currentPage;
                })

            },
//         删除不良记录
            getdelete() {
                let postBaseUrl = "http://pre-admin.biaodaa.com";
                console.log(666);
                let dataParam = JSON.stringify({
                        tabType: "",
                        pkids: "",
                    }
                );
                getJsonData(postBaseUrl +'/corp/requ/del', dataParam).then(res => {
                    console.log(595959);
                });
            },
            handleSizeChange() {

            },
            handleCurrentChange() {

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
