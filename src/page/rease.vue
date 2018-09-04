<template>
    <el-container>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path:'/userlist' }">首页</el-breadcrumb-item>
            <!--<el-breadcrumb-item :to="{ path:'/editer' }">编辑</el-breadcrumb-item>-->
            <!--<el-breadcrumb-item :to="{ path:'/rease' }">增加企业</el-breadcrumb-item>-->
        </el-breadcrumb>
        <el-header style="margin-top: 30px;">
            <el-row :gutter="20">
                <el-col :span="10">
                    <div class="grid-content bg-purple">
                        <el-input
                            placeholder="请输入完整正确的企业名称"
                            v-model.trim="companyName"
                            clearable>
                        </el-input>

                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="grid-content bg-purple">
                        <el-input
                            placeholder="请输入社会统一信用代码"
                            v-model.trim="creditCode"
                            clearable>
                        </el-input>

                    </div>
                </el-col>
                <el-col :span="1">
                    <div class="grid-content bg-purple">
                        <el-button @click='addData' type="primary">增加</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-table
                :data="dataList"
                border
                style="width: 100%">
                <el-table-column
                    prop="comName"
                    label="企业名称"
                >
                </el-table-column>
                <el-table-column
                    prop="creditCode"
                    label="信用代码"
                    width="220"
                >
                </el-table-column>
                <el-table-column
                    prop="createDate"
                    label="提交时间"
                    width="180">
                </el-table-column>
                <el-table-column label="操作"   width="200" >
                    <template slot-scope="scope">

                        <el-button type="mini" @click="updateItem(scope.$index)">修改</el-button>

                        <el-dialog style="text-align: center" title="请修改"
                         :visible.sync="dialogFormVisible">
                            <el-form :model="form">
                                <el-form-item label="企业名称：" :label-width="formLabelWidth">
                                    <el-input v-model="credCode" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="信用代码：" :label-width="formLabelWidth">
                                    <el-input v-model="crCode" auto-complete="off"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                 <el-button type="primary" @click="redactSubmit(scope.$index, scope.row)" >确 定</el-button>
                                <!-- <el-button type="primary" @click="dialogFormVisible = false" >确 定</el-button> -->
                            </div>
                        </el-dialog>
                        <el-button  :id='index' type="text" @click="remove(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row class='baa_ai_n'>
                <div class="block">
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
            </el-row>

        </el-main>
    </el-container>
</template>
<script>
    import axios from 'axios'
    import {
        getJsonData
    } from '../api/index.js'

    export default {
        data() {
            return {
                credCode: '',
                crCode: '',
                companyName: "",
                creditCode: "",
                pkid:"",
                // dialogTableVisible: false,
                dialogFormVisible: false,
                start: 1,
                dataList: [],
                pageSize: 20,
                totalSize: 1,
                pageCount: 20,
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
                tableData: [],
                conname: '',
                condata: ''

            }
        },
        mounted() {
            this.getDataList();
        },
//

        methods: {
//              修改
            dialogFormVisible() {
                this.credCode = ""
                this.crCode = ""

            },
            //编辑
            redactSubmit(index, row){
                 if(!this.credCode) {
                  return this.$message({
                            type: 'warning',
                            message: '请先添写企业名称'
                          });
                }
                
                 let dataParam = JSON.stringify({
                    "pkid": row.pkid,
                    "comName": this.credCode,
                    "creditCode": this.crCode,

                });
                getJsonData('/company/art/save', dataParam).then(res => {
                    console.log(dataParam)
                     console.log(res.code)
                    this.dialogFormVisible = false;
                     if (res.code == 1) {
                         this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                        this.getDataList();
                     }else{
                        this.$message({
                            type: 'fail',
                            message: '修改失败'+res.msg
                        });
                     }

                })
            },
            updateItem(index){
                let dataBean = this.dataList[index];
                this.dialogFormVisible=true;
                this.credCode=dataBean.comName;
                this.crCode=dataBean.creditCode;
            },
//              删除
            remove(index, row) {
                let dataParam = JSON.stringify({
                    "pkid":  row.pkid,

                });

                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                       
                         getJsonData('/company/art/del', dataParam).then(res => {
                            console.log(res);

                            if (res.code == 0) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            }
                    this.getDataList();

                        })

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
            },

            addData() {
                if(this.companyName==null||this.companyName==""){
                     alert("增加失败：企业名称为空");
                    return;
                }
                if(this.creditCode==null||this.creditCode==""){
                     alert("增加失败：社会信用代码为空");
                    return;
                }
                let dataParam = JSON.stringify({
                    "comName": this.companyName,
                    "creditCode": this.creditCode
                });
                getJsonData('/company/art/save', dataParam).then(res => {
                    console.log(res);
                    if (res.code == 1) {
                        alert("增加成功");
                    } else {
                        alert("增加失败：" + res.msg);
                    }
                    this.getDataList();
                });

            },
            handleSizeChange(val){
                  this.pageSize = val;
                this.getDataList();
            },
            handleCurrentChange(val) {
                this.start = val;
                this.getDataList();
            },
//            分页
            getDataList() {
                let dataParam = JSON.stringify({
                    "start": this.start,
                    "pageSize": this.pageSize
                });
                getJsonData('/company/art/list', dataParam).then(res => {
                    this.dataList = res.data.list;
                    this.totalSize = res.data.total;
                    this.pageCount = res.data.pageCount;
                    console.log(res)

                })
            }
        },


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

    .baa_ai_n {
        margin-top: 30px;
    }
</style>
