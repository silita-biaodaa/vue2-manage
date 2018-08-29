<template>

    <el-container>
        <el-header style="margin-top: 30px;"><el-row :gutter="20">
            <el-col :span="10"><div class="grid-content bg-purple">
                <el-input
                    placeholder="请输入完整正确的企业名称"
                    v-model="input10"
                    clearable>
                </el-input>

            </div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple">
                <el-input
                    placeholder="请输入社会统一信用代码"
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
                    width="220"
                    >
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="提交时间"
                    width="180">
                </el-table-column>
                <el-table-column label="操作"
                width="200">
                    <template slot-scope="scope">

                            <el-button type="mini"  @click="dialogFormVisible = true">修改</el-button>

                            <el-dialog style="text-align: center" title="请修改" :visible.sync="dialogFormVisible">
                                <el-form :model="form">
                                    <el-form-item label="企业名称：" :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="信用代码：" :label-width="formLabelWidth">
                                        <el-input v-model="form.name" auto-complete="off"></el-input>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                                </div>
                            </el-dialog>

                        <el-button class="bdd_btn"
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
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                tableData: [{
                    date: '湖南省耀邦建设有限公司',
                    name: '123456789456123456',
                    address: '2015.5.10'
                }, {
                    date: '湖南省耀邦建设有限公司',
                    name: '123456789456123456',
                    address: '2015.5.10'
                }, {
                    date: '湖南省耀邦建设有限公司',
                    name: '123456789456123456',
                    address: '2015.5.10'
                }, {
                    date: '湖南省耀邦建设有限公司',
                    name: '123456789456123456',
                    address: '2015.5.10'
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
