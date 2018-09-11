<template>
    <el-container>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path:'/userlist' }">首页</el-breadcrumb-item>
            <!--<el-breadcrumb-item :to="{ path:'/editer' }">编辑</el-breadcrumb-item>-->
            <!--<el-breadcrumb-item :to="{ path:'/rease' }">增加企业</el-breadcrumb-item>-->
        </el-breadcrumb>
        <el-header class="bdd_header">{{afterComName}}</el-header>
        <el-row class=" bdd_dv">{{creditData.changeCreditCode}}</el-row>


        <!--统一社会信用代码-->
        <el-row style="margin-top: 30px">
            <el-col :span="12">
                <div class="grid-content bg-purples">统一社会信用代码：</div>
            </el-col>
            <el-col :span="12">
                <div style="text-align: right" class="grid-content bg-purple-light">
                    <el-button @click="deletePerson" type="primary">清空</el-button>
                    <el-button @click="keepList" type="primary">保存</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="line-height:40px;margin-left: 10%;">
            <el-col :span="12">
                <div class="grid-content bg-purple">程序处理:<span>{{creditData.creditCode}}</span></div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">人工编辑:
                    <el-input placeholder="请输入内容" v-model="changeCreditCode" clearable>
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-row class="bdd_hr"></el-row>


        <!--企业名称变更-->
        <el-row style="margin-top: 30px">
            <el-col :span="12">
                <div class="grid-content bg-purples">企业名称变更：</div>
            </el-col>
            <el-col :span="12">
                <div style="text-align: right" class="grid-content bg-purple-light">
                    <el-button @click="changeNameEmpty" type="primary">清空</el-button>
                    <el-button @click="addList" type="primary">增加</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="line-height:40px;margin-left: 10%;">
            <el-col :span="12">
                <div class="grid-content bg-purple">&nbsp;&nbsp;&nbsp;变更前：
                    <el-input placeholder="请输入变更前的企业名称" v-model="beforeComName" clearable>
                    </el-input>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">变更后：
                    <el-input placeholder="请输入变更后的企业名称" v-model="afterComName" clearable>
                    </el-input>
                </div>
            </el-col>

        </el-row>
        <el-row :gutter="20" style="line-height:40px;margin-left: 10%;">
            <el-col :span="12">
                <div class="grid-content bg-purple">变更时间：
                    <el-date-picker v-model="changeTime" type="date" placeholder="选择日期">
                    </el-date-picker>
                </div>
            </el-col>

        </el-row>
        <el-table :data="comDataArray" border style="width: 100%">

            <el-table-column type="index" label="序号" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="comName" label="变更前名称">
            </el-table-column>
            <el-table-column prop="changeComName" label="变更后名称">
            </el-table-column>
            <el-table-column prop="changeTime" label="变更时间">
            </el-table-column>
            <el-table-column prop="sourceStr" label="来源" width="120">
            </el-table-column>
            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click="deleteComItem(scope.$index, scope.row)">删除
                                </el-button>
</template>
                    </el-table-column>
                </el-table>
                <el-row class="bdd_hr"></el-row>

                <!--安许证号-->
                <el-row style="margin-top: 30px">
                    <el-col :span="12">
                        <div class="grid-content bg-purples">安许证号：</div>
                    </el-col>
                    <el-col :span="12">
                        <div style="text-align: right" class="grid-content bg-purple-light">
                            <el-button type="primary"  @click="deleteAnxu()">清空</el-button>
                            <el-button type="primary" @click="saveAnxu()">保存</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="line-height:40px;margin-left: 10%;">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">程序处理：安许证号（{{this.preCertNo}}）</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">&nbsp;&nbsp;&nbsp;有效期：{{this.preExpiredStr}}

                        </div>
                    </el-col>
                </el-row>

                <el-row :gutter="20" style="line-height:40px;margin-left: 10%;">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">人工编辑：
                            <el-input
                                placeholder="请输入内容"
                                v-model="certNo"
                                clearable>
                            </el-input>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">有效期：
                            <el-date-picker
                                v-model="expiredStr"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="bdd_hr"></el-row>

                <!--企业资质-->
                <el-row style="margin-top: 30px">
                    <el-col :span="12">
                        <div class="grid-content bg-purples">企业资质：</div>
                    </el-col>
                    <el-col :span="12">
                        <div style="text-align: right" class="grid-content bg-purple-light">
                            <el-button type="primary" @click="deleteComZhi()">清空</el-button>
                            <el-button type="primary" @click="addQuality()">增加</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="line-height:40px;margin-left: 10%;">
                    <el-col :span="8">
                        <div class="block">
                            <span class="demonstration bg-purple">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;资质：</span>
                            <el-cascader
                                :options="options"
                                v-model="quality.qualName"
                                @change="handleChange">
                            </el-cascader>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">证书编号：
                            <el-input
                                placeholder="请输入证书编号"
                                v-model="quality.certNo"
                                clearable>
                            </el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">发证机关：
                            <el-input
                                placeholder="请输入发证机关"
                                 v-model="quality.certOrg"
                                clearable>
                            </el-input>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="line-height:40px;margin-left: 10%;">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">发证日期：
                            <el-date-picker
                                v-model="quality.certDate"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">&nbsp;&nbsp;&nbsp;有效期：
                            <el-date-picker
                                v-model="quality.validDate"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">发文日期：
                            <el-date-picker
                                 v-model="quality.certDate"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </el-col>

                </el-row>
                <el-table
                    :data="qualityTableData"
                    border
                    style="width: 100%">
                      <el-table-column
                        type="index" label="序号"
                         header-align="center" align="center">
                        </el-table-column>
                    <el-table-column
                        prop="qualName"
                        label="资质"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="certNo"
                        label="证书编号">
                    </el-table-column>
                    <el-table-column
                        prop="certDate"
                        label="发证日期">
                    </el-table-column>
                    <el-table-column
                        prop="validDate"
                        label="有效期">
                    </el-table-column>
                    <el-table-column
                        prop="news"
                        label="发文日期">
                    </el-table-column>
                    <el-table-column
                        prop="certOrg"
                        label="发证机关">
                    </el-table-column>
                    <el-table-column
                        prop="channel"
                        label="来源">
                    </el-table-column>
                    <el-table-column label="操作"
                    >
<template slot-scope="scope">
    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
        删除
    </el-button>
</template>
                    </el-table-column>
                </el-table>
                <el-row class="bdd_hr"></el-row>

                <!--安全认证-->
                <el-row style="margin-top: 30px">
                    <el-col :span="12">
                        <div class="grid-content bg-purples">安全认证：</div>
                    </el-col>
                    <el-col :span="12">
                        <div style="text-align: right" class="grid-content bg-purple-light">
                            <el-button type="primary">清空</el-button>
                            <el-button type="primary">保存</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="line-height:40px;margin-left: 10%;">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">程序处理：安许认证 省级 湖南省</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">安全认证等级：合格</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">有效期：2019年9月10日

                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="line-height:40px;margin-left: 10%;">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">人工编辑：
                            <el-cascader
                                :options="optionsWithDisabled"
                            ></el-cascader>
                        </div>
                    </el-col>

                    <!--公路信用等级-->
                    <el-col :span="8">
                        <div class="grid-content bg-purple">安全认证等级：
                            <el-dropdown>
                      <span class="el-dropdown-link">
                        全部<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>优秀</el-dropdown-item>
                                    <el-dropdown-item>合格</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">变更时间：
                            <el-date-picker
                                v-model="value1"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="bdd_hr"></el-row>
                <el-row style="margin-top: 30px">
                    <el-col :span="12">
                        <div class="grid-content bg-purples">公路信用等级：</div>
                        <el-row>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 14px">评定省份：</span> <el-select v-model="value" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                v-model="roadInfo.assessProv"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select></el-row>
                    </el-col>
                    <el-col :span="12">
                        <div style="text-align: right" class="grid-content bg-purple-light">
                            <el-button type="primary">保存</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-table
                    :data="roadTableData"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="assessYear"
                        label="评定年度"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="proAssessLevel"
                        label="公路信用评价等级（程序）"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="labAssessLevel"
                        label="公路信用评价等级（人工）"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="assessProv"
                        label="评定省份">
                    </el-table-column>
                    <el-table-column label="操作"
                                     width="200">
<template slot-scope="scope">
    <el-button type="text" @click="dialogFormVisible = true">
        修改</el-button>

    <el-dialog style="text-align: center" title="公路信用评价等级修改" :visible.sync="dialogFormVisible">

        <el-form :model="form">
            <el-form-item label="" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="空值">
                    <el-option label="A" value="shanghai"></el-option>
                    <el-option label="B" value="beijing"></el-option>
                    <el-option label="C" value="beijing"></el-option>
                    <el-option label="D" value="beijing"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
    </el-dialog>
</template>
                    </el-table-column>
                </el-table>
            </el-container>

        </template>

<script>
    import axios from "axios";
    import {
        getJsonData
    } from "../api/index.js";

    export default {
        mounted() {
            console.log(1111)
            this.getDataList();
           this.getAnxuData();
           this.getQuality();
           this.getRoadLevel();
        },

        methods: {
            //  显示程序和人工编辑信用代码

            handleChange() {

            },
            //公路信用等级
             getRoadLevel(){
                let dataParam = JSON.stringify({
                    comId: this.comId,
                    assessProvCode:'hunan'
                });
                getJsonData('/company/highway/detail', dataParam).then(res => {
                   console.log(777);
                   this.roadTableData = res.data;
                   this.roadInfo = res.data[0];
                })
            },
            //获取资质信息
            getQuality(){
                let dataParam = JSON.stringify({
                    comId: this.comId,
                });
                getJsonData('/company/qual/detail', dataParam).then(res => {
                   console.log(888);
                   this.qualityTableData = res.data;
                   this.quality = res.data[0];
                })
            },
            //添加资质信息
            addQuality(){
                let dataParam = JSON.stringify({
                    comId: this.comId,
                    certNo: this.certNo,
                    certOrg: this.certOrg,
                    certDate: this.certDate,
                    validDate: this.validDate,
                    quaCode: this.quaCode,
                    gradeCode: this.gradeCode
                });
                getJsonData('/company/qual/add', dataParam).then(res => {
                   console.log(res);
                })
            },
            //                清空
            deletePerson() {
                let dataParam = JSON.stringify({
                    comId: this.comId,
                });
                getJsonData('company/creditCode/del', dataParam).then(res => {
                    this.getDataList();
                    this.changeCreditCode = ''

                })
            },
            //保存
            keepList() {
                let dataParam = JSON.stringify({
                    comId: this.comId,
                    "creditCode": this.changeCreditCode
                });
                getJsonData('company/creditCode/add', dataParam).then(res => {
                    alert(res.msg);
                    this.getDataList();

                })
            },
            deleteComItem(index,row){
                let dataParam = JSON.stringify({
                    pkid: this.comDataArray[index].changePkid
                });
                getJsonData('/company/comName/del', dataParam).then(res => {
                    alert(res.msg);
                    this.getDataList();
                })
            },
            deleteAnxu(){
                this.certNo="";
                this.expiredStr="";

            },
            saveAnxu(){
                  let dataParam = JSON.stringify({
                    comId: this.comId,
                    certNo:this.certNo,
                    expiredStr:this.expiredStr
                });
                getJsonData('/company/certNo/Add', dataParam).then(res => {
                    let bddArray = res.data;
                    console.log(555);
                   this.getAnxuData();


                })
            },

            /*称显示企业名称记录*/
            getDataList() {
                let dataParam = JSON.stringify({
                    comId:this.comId
                });
                getJsonData('/company/comName/detail', dataParam).then(res => {
                    let bddArray = res.data;
                    console.log(555);
                    this.order = res.data.creditCode;
                    this.creditData = res.data[0];
                    let comDataArray = res.data;
                    this.changeCreditCode = res.data[0].changeCreditCode;
                    this.beforeComName = res.data[0].comName;
                    this.afterComName=res.data[0].changeComName;
                    this.changeTime=res.data[0].changeTime;
                    for(let j=0;j<comDataArray.length;j++){
                        let comDataBean = comDataArray[j];
                        comDataBean.sourceStr = comDataBean.source==1?"程序":"人工";
                        comDataArray.splice(j,1,comDataBean);
                    }
                    this.comDataArray = comDataArray;


                })
            },
            //添加
            addList() {
                let changeTime =  this.changeTime;
                let month = changeTime.getMonth()+1;
                let date = changeTime.getDate();
                let time =  changeTime.getFullYear()+"-" +(month<10?("0"+month):month)+"-"+(date<10?("0"+date):date);
                let dataParam = JSON.stringify({
                    comId: this.comId,
                    comName: this.afterComName,
                    changeTime:time
                });
                getJsonData('/company/comName/add', dataParam).then(res => {
                    console.log(222);

                    alert(res.msg);
                    this.getDataList();


                })

            },
            getAnxuData() {

                let dataParam = JSON.stringify({
                    comId: this.comId
                });
                getJsonData('/company/certNo/detail', dataParam).then(res => {
                    console.log(444);
                    let anxuBean = res.data;
                    this.preExpiredStr = anxuBean.lab.expiredStr;
                    this.preCertNo = anxuBean.lab.certNo;

                })

            },

            changeNameEmpty() {
                this.afterComName = '';
                this.changeTime = "";
            },

        },


        data() {
            return {
                roadTableData:[],
                roadInfo:{},
                assessProvCode:"",
                qualityTableData:[],
                quality:{},
                preCertNo:"",
                preExpiredStr:"",
                certNo:"",
                expiredStr:"",
                changeCreditCode: "",
                changePkid: '',
                beforeComName: "",
                afterComName: "",
                changeTime: '',
                creditData: {},
                comDataArray: [],
                value1: '',
                anxuBean:{},
                value2: '',
                value3: '',
                creditCode: '',
                crCode: '',
                comId: this.$route.params.id,
                order: '',
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
                optionsWithDisabled: [{
                    value: 'zhinan',
                    label: '省份',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }, {
                            value: 'fankui',
                            label: '反馈'
                        }, {
                            value: 'xiaolv',
                            label: '效率'
                        }, {
                            value: 'kekong',
                            label: '可控'
                        }]
                    }, {
                        value: 'daohang',
                        label: '导航',
                        children: [{
                            value: 'cexiangdaohang',
                            label: '侧向导航'
                        }, {
                            value: 'dingbudaohang',
                            label: '顶部导航'
                        }]

                    }, {
                        value: 'notice',
                        label: 'Notice',
                        children: [{
                            value: 'alert',
                            label: 'Alert 警告'
                        }, {
                            value: 'loading',
                            label: 'Loading 加载'
                        }, {
                            value: 'message',
                            label: 'Message 消息提示'
                        }, {
                            value: 'message-box',
                            label: 'MessageBox 弹框'
                        }, {
                            value: 'notification',
                            label: 'Notification 通知'
                        }]
                    }, {
                        value: 'navigation',
                        label: 'Navigation',
                        children: [{
                            value: 'menu',
                            label: 'NavMenu 导航菜单'
                        }, {
                            value: 'tabs',
                            label: 'Tabs 标签页'
                        }, {
                            value: 'breadcrumb',
                            label: 'Breadcrumb 面包屑'
                        }, {
                            value: 'dropdown',
                            label: 'Dropdown 下拉菜单'
                        }, {
                            value: 'steps',
                            label: 'Steps 步骤条'
                        }]
                    }, {
                        value: 'others',
                        label: 'Others',
                        children: [{
                            value: 'dialog',
                            label: 'Dialog 对话框'
                        }, {
                            value: 'tooltip',
                            label: 'Tooltip 文字提示'
                        }, {
                            value: 'popover',
                            label: 'Popover 弹出框'
                        }, {
                            value: 'card',
                            label: 'Card 卡片'
                        }, {
                            value: 'carousel',
                            label: 'Carousel 走马灯'
                        }, {
                            value: 'collapse',
                            label: 'Collapse 折叠面板'
                        }]
                    }]
                }, {
                    value: 'ziyuan',
                    label: '市级',
                    children: [{
                        value: 'axure',
                        label: 'shen'
                    }, {
                        value: 'sketch',
                        label: 'Sketch Templates'
                    }, ]
                }],
                options: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }, {
                            value: 'fankui',
                            label: '反馈'
                        }, {
                            value: 'xiaolv',
                            label: '效率'
                        }, {
                            value: 'kekong',
                            label: '可控'
                        }]
                    }, {
                        value: 'daohang',
                        label: '导航',
                        children: [{
                            value: 'cexiangdaohang',
                            label: '侧向导航'
                        }, {
                            value: 'dingbudaohang',
                            label: '顶部导航'
                        }]
                    }]
                }, {
                    value: 'zujian',
                    label: '组件',
                    children: [{
                        value: 'basic',
                        label: 'Basic',
                        children: [{
                            value: 'layout',
                            label: 'Layout 布局'
                        }, {
                            value: 'color',
                            label: 'Color 色彩'
                        }, {
                            value: 'typography',
                            label: 'Typography 字体'
                        }, {
                            value: 'icon',
                            label: 'Icon 图标'
                        }, {
                            value: 'button',
                            label: 'Button 按钮'
                        }]
                    }, {
                        value: 'form',
                        label: 'Form',
                        children: [{
                            value: 'radio',
                            label: 'Radio 单选框'
                        }, {
                            value: 'checkbox',
                            label: 'Checkbox 多选框'
                        }, {
                            value: 'input',
                            label: 'Input 输入框'
                        }, {
                            value: 'input-number',
                            label: 'InputNumber 计数器'
                        }, {
                            value: 'select',
                            label: 'Select 选择器'
                        }, {
                            value: 'cascader',
                            label: 'Cascader 级联选择器'
                        }, {
                            value: 'switch',
                            label: 'Switch 开关'
                        }, {
                            value: 'slider',
                            label: 'Slider 滑块'
                        }, {
                            value: 'time-picker',
                            label: 'TimePicker 时间选择器'
                        }, {
                            value: 'date-picker',
                            label: 'DatePicker 日期选择器'
                        }, {
                            value: 'datetime-picker',
                            label: 'DateTimePicker 日期时间选择器'
                        }, {
                            value: 'upload',
                            label: 'Upload 上传'
                        }, {
                            value: 'rate',
                            label: 'Rate 评分'
                        }, {
                            value: 'form',
                            label: 'Form 表单'
                        }]
                    }, {
                        value: 'data',
                        label: 'Data',
                        children: [{
                            value: 'table',
                            label: 'Table 表格'
                        }, {
                            value: 'tag',
                            label: 'Tag 标签'
                        }, {
                            value: 'progress',
                            label: 'Progress 进度条'
                        }, {
                            value: 'tree',
                            label: 'Tree 树形控件'
                        }, {
                            value: 'pagination',
                            label: 'Pagination 分页'
                        }, {
                            value: 'badge',
                            label: 'Badge 标记'
                        }]
                    }, {
                        value: 'notice',
                        label: 'Notice',
                        children: [{
                            value: 'alert',
                            label: 'Alert 警告'
                        }, {
                            value: 'loading',
                            label: 'Loading 加载'
                        }, {
                            value: 'message',
                            label: 'Message 消息提示'
                        }, {
                            value: 'message-box',
                            label: 'MessageBox 弹框'
                        }, {
                            value: 'notification',
                            label: 'Notification 通知'
                        }]
                    }, {
                        value: 'navigation',
                        label: 'Navigation',
                        children: [{
                            value: 'menu',
                            label: 'NavMenu 导航菜单'
                        }, {
                            value: 'tabs',
                            label: 'Tabs 标签页'
                        }, {
                            value: 'breadcrumb',
                            label: 'Breadcrumb 面包屑'
                        }, {
                            value: 'dropdown',
                            label: 'Dropdown 下拉菜单'
                        }, {
                            value: 'steps',
                            label: 'Steps 步骤条'
                        }]
                    }, {
                        value: 'others',
                        label: 'Others',
                        children: [{
                            value: 'dialog',
                            label: 'Dialog 对话框'
                        }, {
                            value: 'tooltip',
                            label: 'Tooltip 文字提示'
                        }, {
                            value: 'popover',
                            label: 'Popover 弹出框'
                        }, {
                            value: 'card',
                            label: 'Card 卡片'
                        }, {
                            value: 'carousel',
                            label: 'Carousel 走马灯'
                        }, {
                            value: 'collapse',
                            label: 'Collapse 折叠面板'
                        }]
                    }]
                }, {
                    value: 'ziyuan',
                    label: '资源',
                    children: [{
                        value: 'axure',
                        label: 'Axure Components'
                    }, {
                        value: 'sketch',
                        label: 'Sketch Templates'
                    }, {
                        value: 'jiaohu',
                        label: '组件交互文档'
                    }]
                }],
                selectedOptions: [],
                selectedOptions2: [],

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
            };
        }


    };
</script>


<style lang="less" scoped>
    @import '../style/mixin.less';
    .bdd_header,
    .bdd_dv {
        text-align: center;
    }

    .bdd_header {
        font-size: 24px;
        font-weight: 700;
    }

    .bdd_dv {
        margin-top:0px;
        font-size: 14px;
        color: #999999;
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

    .bg-purples {
        font-size: 16px;
        font-weight: 600;
    }

    .bg-purple {
        font-size: 14px;
        color: #666666;
    }
</style>
