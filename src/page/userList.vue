<template>
    <el-container>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="Increase">添加</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-header>
            <div><span>所属地区：<el-cascader
                :options="options2"
                @active-item-change="handleItemChange"
                :props="props"
            ></el-cascader></span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;备案地区：<el-cascader
                :options="options2"
                @active-item-change="handleItemChange"
                :props="props"
            ></el-cascader></span></div>
        </el-header>
        <el-main style="width: 100%;text-align:left;margin-left:340px;">
            <div style="margin-top: 15px;">
                <div style="display: inline-block" class="demo-input-size">
                    <el-input
                        placeholder="请输入内容"
                        suffix-icon="el-icon-search"
                        v-model="input6">
                    </el-input>
                </div>
                <el-button  type="primary">查询</el-button>
                <el-button type="primary">增加企业</el-button>
                <el-button  type="primary">批量数据维护</el-button>

            </div>
        </el-main>
        <el-table
            :data="tableData"
            style="width:100%;border: 1px solid #ccc;margin: 0 auto">
            <el-table-column
                label="公司名称"
                width="220">
                <template slot-scope="scope">
                    <span>{{ scope.row.corporate }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="所属地区"
                width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.Area}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="创建日期"
                width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{ scope.row.time }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="最后更新日期"
                width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block" style="margin-top: 30px;">
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
    </el-container>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [{
                    corporate: '湖南耀邦建设有限公司',
                    Area:'湖南长沙',
                    time:'2018年8月27日',
                    date:'2018年9月10日',
                }, {
                    corporate: '湖南耀邦建设有限公司',
                    Area:'湖南长沙',
                    time:'2018年8月27日',
                    date:'2018年9月10日',

                }, {
                    corporate: '湖南耀邦建设有限公司',
                    Area:'湖南长沙',
                    time:'2018年8月27日',
                    date:'2018年9月10日',
                }, {
                    corporate: '湖南耀邦建设有限公司',
                    Area:'湖南长沙',
                    time:'2018年8月27日',
                    date:'2018年9月10日',

                }],
                options2: [{
                    label: '江苏',
                    cities: []
                }, {
                    label: '浙江',
                    cities: []
                }],
                props: {
                    value: 'label',
                    children: 'cities'
                }
            }
        },
        methods: {
            handleItemChange(val) {
                console.log('active item:', val);
                setTimeout(_ => {
                    if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
                        this.options2[0].cities = [{
                            label: '南京'
                        }];
                    } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
                        this.options2[1].cities = [{
                            label: '杭州'
                        }];
                    }
                }, 300);
            }
        }, handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        }


    };

</script>

<style lang="less" scoped>
    @import '../style/mixin.less';

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
        margin-bottom: 20px;}

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
   .el-input[data-v-e47dfd12]{
       width: 100%;
   }
</style>
