webpackJsonp([2],{492:function(e,t,a){a(525);var n=a(1)(a(503),a(537),"data-v-c2b8a61e",null);e.exports=n.exports},503:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(9),s=a.n(n),i=a(3);t.default={data:function(){return{province:"",citys:"",select:"",options:[],city:"",optionss:[],topcity:"",optionsss:[],value:"",yesterday:0,pagenum:1,pagesize:15,today:0,startDate:"",endDate:"",total:0,tableData:[],all:0,newtime:"",sex:[{label:"全部",value:""},{label:"男",value:"1"},{label:"女",value:"2"}],gender:"",pickerOptions2:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]}}},created:function(){this.getprovince(),this.register(),this.gainDate()},filters:{btn:function(e){return e?"未锁定":"已锁定"}},methods:{gainDate:function(){var e=this;this.startDate=this.newtime?this.newtime[0]:"",this.endDate=this.newtime?this.newtime[1]:"",a.i(i.i)({currentPage:this.pagenum,pageSize:this.pagesize,provCode:this.citys,cityCode:this.city,startDate:this.startDate,endDate:this.endDate,sex:this.gender,keyWord:this.select}).then(function(t){1==t.code&&(e.tableData=t.data.list,e.total=t.data.total)})},gainData:function(){this.pagenum=1,this.gainDate()},getprovince:function(){var e=this;a.i(i.j)({areaParentId:"0"}).then(function(t){1==t.code&&(t.data.unshift({areaShortName:"全部",areaCode:""}),e.optionsss=JSON.parse(s()(t.data)),t.data.forEach(function(e){e.areaCode=e.pkid+e.areaCode}),e.options=t.data)})},getCity:function(e){var t=this;this.city="",this.province=e.slice(0,32),this.citys=e.slice(32),a.i(i.j)({areaParentId:this.province}).then(function(e){e.data.unshift({areaName:"全部",areaCode:""}),t.optionss=e.data})},register:function(e){var t=this;"undefined"==e&&(e=""),a.i(i.k)({provCode:e}).then(function(e){1==e.code&&(t.all=e.data.total,t.today=e.data.todayCount,t.yesterday=e.data.yesterdayCount)})},handleDelete:function(e,t){var n=this;this.$confirm("此操作将变更用户状态, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.isEnable?a.i(i.l)({pkid:t.pkid,isEnable:0}).then(function(e){1==e.code&&(n.$message({type:"success",message:"用户锁定成功"}),n.gainDate())}):a.i(i.l)({pkid:t.pkid,isEnable:1}).then(function(e){1==e.code&&(n.$message({type:"success",message:"用户解锁成功"}),n.gainDate())})}).catch(function(){n.$message({type:"info",message:"已取消锁定"})})},handleCurrentChange:function(e){this.pagenum=e,this.gainDate()},handleSizeChange:function(e){this.pagesize=e,this.pagenum=1,this.gainDate()}}}},514:function(e,t,a){t=e.exports=a(480)(!1),t.push([e.i,".user .top[data-v-c2b8a61e],.user .user-con[data-v-c2b8a61e]{background-color:#eee;line-height:1rem;padding-left:.3rem;margin-bottom:.4rem}.user .user-sel[data-v-c2b8a61e]{padding-right:.4rem}",""])},525:function(e,t,a){var n=a(514);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a(481)("d0d88938",n,!0)},537:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"user"},[a("el-row",{staticClass:"top"},[a("el-col",{attrs:{span:6}},[a("el-select",{attrs:{placeholder:"请选择省份"},on:{change:e.register},model:{value:e.topcity,callback:function(t){e.topcity=t},expression:"topcity"}},e._l(e.optionsss,function(e){return a("el-option",{key:e.areaShortName,attrs:{label:e.areaShortName,value:e.areaCode}})}),1)],1),e._v(" "),a("el-col",{attrs:{span:4}},[e._v("\n           昨日新增:"+e._s(e.yesterday)+"\n        ")]),e._v(" "),a("el-col",{attrs:{span:4}},[e._v("\n           今日新增:"+e._s(e.today)+"\n        ")]),e._v(" "),a("el-col",{attrs:{span:4}},[e._v("\n           总数:"+e._s(e.all)+"\n        ")])],1),e._v(" "),a("el-row",{staticClass:"user-con"},[a("div",[a("el-col",{attrs:{span:7}},[e._v("\n            所属地区:\n             "),a("el-select",{staticStyle:{width:"40%"},attrs:{placeholder:"请选择省份"},on:{change:e.getCity},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.areaShortName,value:e.areaCode}})}),1),e._v(" "),a("el-select",{staticStyle:{width:"30%"},attrs:{placeholder:"市区"},model:{value:e.city,callback:function(t){e.city=t},expression:"city"}},e._l(e.optionss,function(e){return a("el-option",{key:e.value,attrs:{label:e.areaName,value:e.areaCode}})}),1)],1),e._v(" "),a("el-col",{attrs:{span:4}},[e._v("\n             性别:   \n               "),a("el-select",{staticStyle:{width:"70%"},attrs:{placeholder:"性别"},model:{value:e.gender,callback:function(t){e.gender=t},expression:"gender"}},e._l(e.sex,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),a("el-col",{attrs:{span:11}},[e._v("\n            注册时间:\n              "),a("el-date-picker",{staticStyle:{width:"80%"},attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions2,"value-format":"yyyy-MM-dd"},model:{value:e.newtime,callback:function(t){e.newtime=t},expression:"newtime"}})],1)],1)]),e._v(" "),a("el-row",{staticClass:"user-con"},[a("el-col",{staticClass:"user-sel",attrs:{span:6}},[a("el-input",{attrs:{placeholder:"请输入姓名，公司，职位，手机号码",clearable:""},model:{value:e.select,callback:function(t){e.select="string"==typeof t?t.trim():t},expression:"select"}})],1),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.gainData}},[e._v("查询")])],1),e._v(" "),a("el-row",[a("el-col",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData}},[a("el-table-column",{attrs:{label:"昵称",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.nikeName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"姓名",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.userName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"性别",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.sex))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"地区",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.province))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"手机号码",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.phoneNo))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"公司",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.company))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"职位",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.position))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"注册时间",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.created))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v(e._s(e._f("btn")(t.row.isEnable))+"                                      \n                   ")])]}}])})],1)],1)],1),e._v(" "),a("el-row",{staticClass:"baa_ai_n"},[a("el-col",{attrs:{span:24}},[a("div",[a("el-pagination",{attrs:{"current-page":1,"page-sizes":[15,30,45,60],"page-size":15,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"current-change":e.handleCurrentChange,"size-change":e.handleSizeChange}})],1)])],1)],1)},staticRenderFns:[]}}});