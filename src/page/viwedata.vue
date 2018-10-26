<template>
    <div>
  <div style="margin-top: 30px;">查看数据维护日志</div>
    <el-table
        :data="tableData"
        border
        style="width: 100%;margin-top: 30px;">
        <el-table-column
            prop="date"
            label="操作类型"
            width="150">
        </el-table-column>
        <el-table-column
            prop="name"
            label="操作时间"
            width="150">
        </el-table-column>
        <el-table-column
            prop="province"
            label="总数"
            width="150">
        </el-table-column>
        <el-table-column
            prop="city"
            label="失败条数"
            width="150">
        </el-table-column>
        <el-table-column
            prop="address"
            label="成功条数"
            width="300">
        </el-table-column>
        <el-table-column
            label="操作"
            width="300">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">导出成功数据</el-button>
                <el-button type="text" size="small">导出失败数据</el-button>
            </template>
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
                }]
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
        width:88px;
    }

    .el-input {
        width:180px;
    }
</style>

