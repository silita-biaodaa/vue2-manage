<!-- 模型： DOM 结构 -->
<template>
    <div class="data28 customerData bg-fff">
        <div class="pl30 pr30 pb30 pt20 mian">
            <div class="serarch-box mb20">
                <el-input placeholder="输入手机号码" v-model="data.phone" style="width:300px">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <button class="searchBtn fw600 fs16 cp color-fff" @click="ajax">搜索</button>
            </div>
            <el-table class="public_table" border :data="list" :header-cell-style="headClass">
                <el-table-column label="手机号" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <template v-if="scope.row.biaoUserId">
                            <span style="color: #244CD7;border-bottom: 1px solid #244CD7;" class="cp" @click="openMask(scope.row)">{{ scope.row.phone }}</span>
                        </template>
                        <template v-else>
                            <span>{{ scope.row.phone }}</span>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="称呼" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="订单笔数" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <span>{{ scope.row.orderCount }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="正在处理" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <span>{{ scope.row.process }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="已完成" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <span>{{ scope.row.finishd }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="已退款" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <span>{{ scope.row.refund }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="收入资金" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <span>{{ scope.row.totalPrice }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="退回资金" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <span>{{ scope.row.refPrice }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="mt30">
                <el-pagination
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[15, 30, 45, 60]"
                :page-size="15"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                ></el-pagination>
            </div>
        </div>
        <jlPopup
        v-model="sendVal"
        :showMask="true"
        :personList="personList"
        :hideMask="true"
        ></jlPopup>
    </div>
</template>
<script>
export default {
    name: "customerData", // 结构名称
    data() {
        return {
            // 数据模型a
            data:{
                phone:'',
                pageNo:1,
                pageSize:15,
            },
            list:[],
            total:0,
            personList:null,
            sendVal:'',

        };
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.ajax()
    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    mounted() {
        // console.group('挂载结束状态===============》mounted');
        this.$nextTick(function() {
            // console.log('执行完后，执行===============》mounted');
        });
    },
    beforeUpdate() {
        // console.group('更新前状态  ===============》beforeUpdate');
    },
    updated() {
        // console.group('更新完成状态===============》updated');
    },
    beforeDestroy() {
        // console.group('销毁前状态  ===============》beforeDestroy');
    },
    destroyed() {
        // console.group('销毁完成状态===============》destroyed');
    },
    methods: {
        // 方法 集合
        openMask(row) {
            this.sendVal = true;
            row.pkid=row.biaoUserId;
            this.personList = row;
        },
        headClass() {
            return "text-align: center;background:#DDDFE4;color: #000000;";
        },
        handleCurrentChange(val) {
            // 当前页改变的函数
            this.data.pageNo = val;
            this.ajax();
        },
        handleSizeChange(val) {
            // 每页条数发生改变时做出的函数
            this.data.pageSize = val;
            this.ajax();
        },
        ajax(){
            let that=this;
            that.list=[];
            let data=this.data;
            this.$http({
                method:'post',
                url:'/api/v1/custom/list/user',
                data:data
            }).then(res =>{
                that.list=res.data.data.list;
                that.total=res.data.data.total;
            })
        }
    }
};
</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
@import "../../style/mixin";
.serarch-box {
    .searchBtn {
        margin-left: 34px;
        background: @mainColor;
        .wh(64px, 48px);
    }
}

</style>
