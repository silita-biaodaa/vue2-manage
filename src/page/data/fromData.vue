<!-- 模型： DOM 结构 -->
<template>
    <div class="fromData bg-fff">
        <div class="pl30 pr30 top-box dfrcb">
            <div class="left dfrcb">
                <div class="dfrcb" style="width:246px;margin-right:60px">
                    <h4 class="color-150 fs16">状态</h4>
                    <el-select v-model="data.state" placeholder="请选择" style="width:180px">
                        <el-option
                            v-for="item in ztList"
                            :key="item.id"
                            :label="item.value"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
                <div class="dfrcb" style="width:493px">
                    <h4 class="color-150 fs16">提交时间</h4>
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
            <div class="right color-fff cp dfcc" @click="mask=true">
                <img src="../../assets/img/add_icon.png" alt />
                <div class="ml10 fs16 fw600">生成订单</div>
            </div>
        </div>
        <div class="pl30 pr30 pb30 pt20 mian">
            <div class="serarch-box mb20">
                <el-input placeholder="输入手机号码" v-model="data.phone" style="width:300px">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <button class="searchBtn fw600 fs16 cp color-fff" @click="ajax">搜索</button>
            </div>
            <el-table class="public_table fs14" border :data="list" :header-cell-style="headClass">
                <el-table-column label="姓名" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="手机号" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <span class="href" @click="jump(scope.row.phone)">{{ scope.row.phone }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="定制内容" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <span>{{ scope.row.queryContent }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="提交时间" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <span>{{ scope.row.creted }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="备注" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <textarea class="bor bg-f4 color-666 fs14" v-model="scope.row.remark"></textarea>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.state" placeholder="请选择" style="width:100px">
                            <el-option
                                v-for="item in ztList"
                                :key="item.id"
                                :label="item.value"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                        <div>
                            <span class="cp operation fs14" @click="submitFn(scope.row)">生成订单</span>
                            <span class="cp ml20 fs14 color-409" @click="update(scope.row)">更改状态</span>
                        </div>
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
        <div class="pop-box" v-if="mask">
            <div class="content-box">
                <h5 class="dfrcb">
                    <font class="fs16 color-150">生成订单</font>
                    <i class="el-icon-close cp" @click="mask=false"></i>
                </h5>
                <div class="from-box">
                    <div class="ipt-box dfrcb mb20">
                        <font class="color-150">手机号码</font>
                        <el-input style="width:400px" placeholder="请输入手机号码" v-model="submitData.phone"></el-input>
                    </div>
                    <div class="ipt-box dfrcb mb20">
                        <font class="color-150">客户称呼</font>
                        <el-input style="width:400px" placeholder="请输入客户称呼"  v-model="submitData.name"></el-input>
                    </div>
                    <div class="ipt-box dfrcb mb20">
                        <font class="color-150">订单价格</font>
                        <el-input style="width:400px" placeholder="请输入订单价格" v-model="submitData.price"></el-input>
                    </div>
                    <div class="text-box dfrb mb20">
                        <font class="color-150">查询内容</font>
                        <textarea class="bor" placeholder="请输入查询内容" v-model="submitData.content"></textarea>
                    </div>
                    <div class="text-box dfrb mb20">
                        <font class="color-150">备注</font>
                        <textarea class="bor" placeholder="请输入备注" v-model="submitData.remark"></textarea>
                    </div>
                </div>
                <button class="btn cp" @click="submitFn(submitData)">确认</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "fromData", // 结构名称
    data() {
        return {
            // 数据模型a
            ztList: [
                {
                    value:'全部',
                    id:''
                },{
                    value:'未处理',
                    id:0
                },{
                    value:'正在沟通',
                    id:1
                },{
                    value:'已生成',
                    id:2
                },{
                    value:'已结束',
                    id:3
                }
            ],
            time:'',
            list:[],
            total:0,
            mask:false,
            data:{
                pageNo:1,
                pageSize:15,
                start:'',
                end:'',
                phone:'',
                state:''
            },
            submitData:{
                phone:'',
                name:'',
                price:'',
                content:'',
                remark:''
            }
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
                url:'/api/v1/custom/list/form',
                data:data
            }).then(res =>{
                that.list=res.data.data.list;
                that.total=res.data.data.total;
            })
        },
        submitFn(data){
            let that=this;
            // let data=this.submitData;
            this.$http({
                method:'post',
                url:'/api/v1/custom/create/order',
                data:data
            }).then(res =>{
                if(that.mask){
                    that.mask=false
                }
                that.$alert('生成成功');
            })
        },
        update(data){
            let that=this;
            let d={
                pkid:data.pkid,
                contentId:data.contentId,
                remark:data.remark,
                state:data.state
            }
            this.$http({
                method:'post',
                url:'/api/v1/custom/update/form',
                data:d
            }).then(res =>{
                that.$alert('更改成功');
            })
        },
        jump(p){
            // this.$router.push({ path: "/customerData" ,query:{phone:p}});
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
    .right {
        background: @mainColor;
        .wh(126px, 48px);
    }
}
.serarch-box {
    .searchBtn {
        margin-left: 34px;
        background: @mainColor;
        .wh(64px, 48px);
    }
}

.pop-box{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1999;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .content-box{
        .wh(632px,722px);
        background: #fff;
        box-shadow:0px 0px 21px 0px rgba(0,0,0,0.5);
        border-radius:12px;
        padding-bottom: 40px;
        box-sizing: border-box;
        h5{
            padding: 0 30px;
            line-height: 68px;
            .bor-b;
        }
        .from-box{
            padding: 60px 74px 40px;
            textarea{
                width: 400px;
                height: 118px;
                padding: 14px;
                border-radius:4px;
                box-sizing: border-box;
                resize: none;
                background: #F3F5F9;
            }
        }
        button{
            .wh(128px,40px);
            background: #383838;
            border-radius: 20px;
            color: #fff;
            line-height: 40px;
            display: block;
            margin: 0 auto;
        }
    }
}
.cell /deep/ textarea{
    resize: none;
    height: 100%;
    min-height: 60px;
    padding: 4px;
}
// .cell /deep/ .href{
//     cursor: pointer;
//     color: #244CD7;
//     text-decoration: underline;
// }
.cell /deep/ .operation{
    color: #FF4343;
}
</style>
