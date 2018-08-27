<template>
    <el-container>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
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


    </el-container>
</template>
<script>
    export default {
        data() {
            return {
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
            };
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
        }
    };
</script>

<style lang="less" scoped>
    @import '../style/mixin.less';

    .el-header {
        width: 100%;
        height: 100px;
        background-color: #f8f8f8;
        margin-top: 30px;
        line-height: 60px;
    }

    .el-row {
        line-height: 60px;
    }

    .el-input {
        width: 60%;
    }

</style>
