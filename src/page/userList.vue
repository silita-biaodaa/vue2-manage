<template>
    <!--导航栏-->
    <el-container>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path:'/userlist' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path:'/editer' }">编辑</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path:'/rease' }">增加企业</el-breadcrumb-item>
            <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!--搜索框-->
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
        <div style="width:100%;text-align:left;overflow: hidden">
            <div style="margin-top: 15px;">
                <el-input placeholder="请按照企业名称模糊搜索" v-model="input5" class="input-with-select">

                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <span style="float: right">
                <el-button type="primary">增加企业</el-button>
                <el-button type="primary">批量数据维护</el-button>
                </span>
            </div>

        </div>
        </div>
        <el-main style="width: 100%;text-align:right;">

        </el-main>
        <!--表格-->
        <el-table
            :data="tableData"
            style="width: 100%;border: 1px solid #ccc;">
            <el-table-column
                prop="corporate"
                label="公司名称"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                label="所属地区"

            >
            </el-table-column>
            <el-table-column
                prop="time"
                label="创建日期"
            width="150">

            </el-table-column>
            <el-table-column
                prop="address"
                label="最后更近日期"
                width="150"
            >
            </el-table-column>
            <el-table-column label="操作"
            width="200">
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
                    name: '湖南长沙',
                    time: '2018年8月27日',
                    address: '2018年9月10日'
                }, {
                    corporate: '湖南耀邦建设有限公司',
                    name: '湖南长沙',
                    time: '2018年8月27日',
                    address: '2018年9月10日'
                }, {
                    corporate: '湖南耀邦建设有限公司',
                    name: '湖南长沙',
                    time: '2018年8月27日',
                    address: '2018年9月10日'
                }, {
                    corporate: '湖南耀邦建设有限公司',
                    name: '湖南长沙',
                    time: '2018年8月27日',
                    address: '2018年9月10日'
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
        },  handleEdit(index,row) {  // 编辑框的跳转
            const { href } = this.$router.resolve({
                name:'editer',params: {id:row.name}
            })


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
