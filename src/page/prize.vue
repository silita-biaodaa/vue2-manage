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
                        <span class="grid-content bg-purple-dark">奖项级别： <el-select class="el-input" v-model="value7"
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
                                                                                                    v-model="value7"
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
                        <el-select class="bdd_pur" v-model="value7" placeholder="请选择">
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
                prop="date"
                label="企业"
                width="150">
            </el-table-column>
            <el-table-column
                prop="name"
                label="奖项级别"
                width="120">
            </el-table-column>
            <el-table-column
                prop="province"
                label="省级"
                width="120">
            </el-table-column>
            <el-table-column
                prop="city"
                label="市级"
                width="120">
            </el-table-column>
            <el-table-column
                prop="address"
                label="奖项名称"
                width="300">
            </el-table-column>
            <el-table-column
                prop="zip"
                label="获奖年度 "
                width="120">
            </el-table-column>
            <el-table-column
                prop="zip"
                label="项目名称"
                width="120">
            </el-table-column>
            <el-table-column
                prop="zip"
                label="项目类型"
                width="120">
            </el-table-column>
            <el-table-column
                prop="zip"
                label="发文日期"
                width="120">
            </el-table-column>
        </el-table>
        <div class="block" style="margin-top:20px;">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
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
        methods: {
            handleClick(row) {
                console.log(row);
            },
            handleEdit(index, row) {
                // 编辑框的跳转
                console.log(row, 1)
                const {
                    href
                } = this.$router.resolve({
                    name: "viwedata",
                    params: {
                        id: row.comId

                    }

                });
                window.open(href, "_blank");
            },
        },
        data() {
            return {
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }],
                options3: [{
                    label: '热门城市',
                    options: [{
                        value: 'Shanghai',
                        label: '上海'
                    }, {
                        value: 'Beijing',
                        label: '北京'
                    }]
                }, {
                    label: '城市名',
                    options: [{
                        value: 'Chengdu',
                        label: '成都'
                    }, {
                        value: 'Shenzhen',
                        label: '深圳'
                    }, {
                        value: 'Guangzhou',
                        label: '广州'
                    }, {
                        value: 'Dalian',
                        label: '大连'
                    }]
                }],
                value7: ''

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
</style>

