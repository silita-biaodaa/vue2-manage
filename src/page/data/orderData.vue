<!-- 模型： DOM 结构 -->
<template>
    <div class="orderData bg-fff">
        <div class="pl30 pr30 top-box dfrcb">
            <div class="left dfrcb">
                <div class="dfrcb" style="width:278px;margin-right:60px">
                    <h4 class="color-150 fs16">交货状态</h4>
                    <el-select v-model="data.finishState" placeholder="全部" style="width:180px">
                        <el-option
                            v-for="item in finishList"
                            :key="item.id"
                            :label="item.value"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
                <div class="dfrcb" style="width:278px;margin-right:60px">
                    <h4 class="color-150 fs16">付款状态</h4>
                    <el-select v-model="data.payState" placeholder="全部" style="width:180px">
                        <el-option
                            v-for="item in payList"
                            :key="item.id"
                            :label="item.value"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
                <div class="dfrcb" style="width:493px">
                    <h4 class="color-150 fs16">订单时间</h4>
                    <el-date-picker
                        v-model="time"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    ></el-date-picker>
                </div>
            </div>
            <div class="right fs16 color-282">总收入：{{price}}元</div>
        </div>
        <div class="pl30 pr30 pb30 pt20 mian">
            <div class="serarch-box mb20">
                <el-input placeholder="输入手机号码" v-model="data.phone" style="width:300px">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <button class="searchBtn fw600 fs16 cp color-fff" @click="ajax">搜索</button>
            </div>
            <el-table class="public_table" border :data="list" :header-cell-style="headClass">
                <el-table-column label="订单号" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <span>{{ scope.row.orderNo }}</span>
                    </template>
                </el-table-column>
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
                <el-table-column label="订单价格" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <span>{{ scope.row.price }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="交货状态" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <select  class="list-select" v-model="scope.row.finishState" placeholder="请选择" @change="changeData(scope.row)">
                            <option v-for="item in finishList" :key="item.id" :value="item.id">{{item.value}}</option>
                        </select>
                        <!-- <el-select class="list-select" v-model="scope.row.finishState" placeholder="请选择" style="width:100px" @change="changeData(scope.row)">
                            <el-option
                                v-for="item in finishList"
                                :key="item.id"
                                :label="item.value"
                                :value="item.id"
                            ></el-option>
                        </el-select> -->
                    </template>
                </el-table-column>
                <el-table-column label="付款状态" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <select  class="list-select" v-model="scope.row.payState" placeholder="请选择"  @change="changeData(scope.row)">
                            <option v-for="item in payList" :key="item.id" :value="item.id">{{item.value}}</option>
                        </select>
                        <!-- <el-select class="list-select"  v-model="scope.row.payState" placeholder="请选择" style="width:100px" @change="changeData(scope.row)">
                            <el-option
                                v-for="item in payList"
                                :key="item.id"
                                :label="item.value"
                                :value="item.id"
                            ></el-option>
                        </el-select> -->
                    </template>
                </el-table-column>
                <el-table-column label="定制内容" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <span>{{ scope.row.queryContent }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="备注" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <span>{{ scope.row.remark }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="订单时间" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <span>{{ scope.row.created }}</span>
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
    name: "orderData", // 结构名称
    data() {
        return {
            // 数据模型a
            data:{
                payState:'',
                phone:'',
                finishState:'',
                start:'',
                end:'',
                pageNo:1,
                pageSize:15,
            },
            payList:[
                {
                    value:'未付款',
                    id:0
                },{
                    value:'已付定金',
                    id:1
                },{
                    value:'已付款',
                    id:2
                },{
                    value:'已退款',
                    id:3
                }
            ],
            finishList:[
                {
                    value:'未处理',
                    id:0
                },{
                    value:'正在导出',
                    id:1
                },{
                    value:'已交付',
                    id:2
                }
            ],
            time:'',
            list:[],
            total:0,
            price:0,
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
        let that=this;
        this.$http({
            method:'post',
            url:'/api/v1/custom/total/price',
            data:{}
        }).then(res =>{
            that.price=res.data.data;
        })
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
    // filters:{
    //     payState: function(val) {
    //         switch (val) {
    //             case 0:
    //                 return "未付款";
    //             break;
    //             case 1:
    //                 return "已付定金";
    //             break;
    //             case 2:
    //                 return "已付款";
    //             break;
    //             case 3:
    //                 return "已退款";
    //             break;
    //         }
    //     },
    //     finishState: function(val) {
    //         switch (val) {
    //             case 0:
    //                 return "未处理";
    //             break;
    //             case 1:
    //                 return "正在导出";
    //             break;
    //             case 2:
    //                 return "已交付";
    //             break;
    //         }
    //     },
    // },
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
            this.data.start=this.time[0];
            this.data.end=this.time[1];
            let data=this.data;
            this.$http({
                method:'post',
                url:'/api/v1/custom/list/order',
                data:data
            }).then(res =>{
                that.list=res.data.data.list;
                that.total=res.data.data.total;
            })
        },
        changeData(data){
            let that=this;
            this.$http({
                method:'post',
                url:'/api/v1/custom/update/order',
                data:data
            }).then(res =>{
                that.$alert('操作成功');
            })
        }
    }
};
</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
@import "../../style/mixin";
.top-box {
    height: 87px;
    .bor-b(2px);
}
.serarch-box {
    .searchBtn {
        margin-left: 34px;
        background: @mainColor;
        .wh(64px, 48px);
    }
}
// .cell /deep/ .href{
//     cursor: pointer;
//     color: #244CD7;
//     text-decoration: underline;
// }
</style>
