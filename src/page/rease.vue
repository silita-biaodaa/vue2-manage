<template>

    <el-container>
        <el-header style="margin-top: 50px;"><el-row :gutter="20">
            <el-col :span="10"><div class="grid-content bg-purple">
                <el-input
                    placeholder="请输入完整正确的企业名称"
                    v-model="input10"
                    clearable>
                </el-input>

            </div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple">
                <el-input
                    placeholder="请输入"
                    v-model="input10"
                    clearable>
                </el-input>

            </div></el-col>
            <el-col :span="1"><div class="grid-content bg-purple">
                <el-button type="primary">增加</el-button>
            </div></el-col>
        </el-row></el-header>
        <el-main>
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="企业名称"
                    >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="信用代码"
                    >
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="提交时间">
                </el-table-column>
                <el-table-column label="操作"
                >
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin.less';

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
</style>
