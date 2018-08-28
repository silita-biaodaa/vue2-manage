<template>
    <el-container>
        <el-header class="bdd_header">湖南耀邦建设有限公司</el-header>
        <el-row class=" bdd_dv">4252368855555555555555555</el-row>
        <el-row style="margin-top: 30px">
            <el-col :span="12">
                <div class="grid-content bg-purple">统一社会信用代码：</div>
            </el-col>
            <el-col :span="12">
                <div style="text-align: right" class="grid-content bg-purple-light">
                    <el-button type="primary">保存</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="line-height:40px;margin-left: 10%;">
            <el-col :span="12">
                <div class="grid-content bg-purple">程序处理：11111111111111111111111111111</div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">人工处理：
                    <el-input
                        placeholder="请输入内容"
                        v-model="input10"
                        clearable>
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-row class="bdd_hr"></el-row>
        <el-row style="margin-top: 30px">
            <el-col :span="12">
                <div class="grid-content bg-purple">企业名称变更：</div>
            </el-col>
            <el-col :span="12">
                <div style="text-align: right" class="grid-content bg-purple-light">
                    <el-button type="primary">增加</el-button>
                    <el-button type="primary">保存</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="line-height:40px;margin-left: 10%;">
            <el-col :span="12">
                <div class="grid-content bg-purple">变更前：
                    <el-input
                        placeholder="请输入变更前的企业名称"
                        v-model="input10"
                        clearable>
                    </el-input></div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">变更后：
                    <el-input
                        placeholder="请输入变更后的企业名称"
                        v-model="input10"
                        clearable>
                    </el-input>
                </div>
            </el-col>

        </el-row>
        <el-row :gutter="20" style="line-height:40px;margin-left: 10%;">
            <el-col :span="12">
                <div class="grid-content bg-purple">变更时间：
                    <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker></div>
            </el-col>

        </el-row>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="date"
                label="序号"
               >
            </el-table-column>
            <el-table-column
                prop="name"
                label="历史名称"
                >
            </el-table-column>
            <el-table-column
                prop="address"
                label="变更时间">
            </el-table-column>
            <el-table-column
                prop="news"
                label="来源">
            </el-table-column>
            <el-table-column label="操作"
            >
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row class="bdd_hr"></el-row>

    </el-container>
</template>
<script>
    export default {
        data() {
            return {
                tableData:[{
                    date:'1',
                    name:'湖南耀邦建设有限公司',
                    address:'2018年9月10日',
                    news:'程序'



                }],
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                value1: '',
                value2: '',
            };{
                input10:''
            }
        }


    };
</script>





<style lang="less" scoped>
    @import '../style/mixin.less';

    .bdd_header, .bdd_dv {
        text-align: center;
    }

    .bdd_dv {
        margin-top: -40px;
        font-size: 14px;
        color: #cccccc;
        border-bottom: 1px solid #ccc;
        line-height: 50px;

    }

    .el-col {
        border-radius: 4px;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;

    }

    .el-row {
        margin-bottom: 20px;

    }

    .el-col {
        border-radius: 4px;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
    }

    .el-input {
        width: 50%;
    }

    .bdd_hr {
        width: 100%;
        height: 1px;
        background-color: #ccc;
        margin-top: 20px;
    }

</style>
