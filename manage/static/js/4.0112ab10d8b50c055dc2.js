webpackJsonp([4],{493:function(e,t,a){a(521);var c=a(1)(a(505),a(534),"data-v-0ef1eccb",null);e.exports=c.exports},505:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var c=a(2);t.default={data:function(){return{value:"全部",idea:"全部",statu:"",yesterdayCount:"",untreatedCount:"",totalCount:"",newtime:"",tableData:[],pagesize:15,pagenum:1,firm:"",personList:null,sendVal:"",hideMask:"hideMask",userType:[{values:"",label:"全部"},{values:"0",label:"注册"},{values:"1",label:"付费"},{values:"2",label:"续费"},{values:"3",label:"过期"}],ideaType:[{values:"",label:"全部"},{values:"0",label:"产品建议"},{values:"1",label:"程序错误"},{values:"2",label:"吐槽"}],status:[{values:"",label:"全部"},{values:"2",label:"已处理"},{values:"1",label:"未处理"}],total:null}},methods:{feedNumber:function(){var e=this;a.i(c.g)().then(function(t){if("1"==t.code){var a=t.data,c=a.yesterdayCount,n=a.untreatedCount,l=a.totalCount;e.yesterdayCount=c,e.untreatedCount=n,e.totalCount=l}else console.info("意见反馈统计接口不通")})},feedBackList:function(){var e=this,t={currentPage:this.pagenum,pageSize:this.pagesize,userType:"全部"==this.value?"":this.value,phoneNo:this.firm,state:"全部"==this.statu?"":this.statu,startDate:this.newtime?this.newtime[0]:"",endDate:this.newtime?this.newtime[1]:"",type:"全部"==this.idea?"":this.idea};a.i(c.h)(t).then(function(t){"1"==t.code?(e.tableData=t.data,e.total=t.total):console.info("意见反馈列表不通")})},handleCurrentChange:function(e){this.pagenum=e,this.feedBackList()},handleSizeChange:function(e){this.pagesize=e,this.feedBackList()},changetable:function(){var e=this;this.pagenum=1,setTimeout(function(){return e.feedBackList()},100)},clear:function(){""==this.firm&&this.feedBackList()},searchData:function(){this.pagenum=1,this.feedBackList()},handleRefesh:function(e){var t=this;e&&setTimeout(function(){return t.feedBackList()},100)},keepRemark:function(e,t){var n=this;a.i(c.i)({id:t.id.toString(),remark:t.remark}).then(function(e){"1"==e.code?(n.$message({type:"info",message:"添加备注成功"}),n.feedBackList()):console.info("添加备注接口不通")})},openMask:function(e,t){this.sendVal=!0,this.personList=t},changeState:function(e,t){var n=this;"2"==t.state?this.$confirm("您已处理过该信息","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){}).catch(function(){n.$message({type:"info",message:"您已选择取消"})}):this.$confirm("确认本条信息已处理","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.i(c.j)({id:t.id,state:"1"==t.state?2:""}).then(function(e){"1"==e.code?(n.$message({type:"success",message:"修改成功!"}),n.feedBackList()):console.info("修改意见接口不通")})}).catch(function(){n.$message({type:"info",message:"您已取消"})})}},created:function(){this.feedNumber(),this.feedBackList()}}},509:function(e,t,a){t=e.exports=a(482)(!1),t.push([e.i,".allcover[data-v-0ef1eccb]{position:absolute;top:0;right:0}.ctt[data-v-0ef1eccb]{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.tb[data-v-0ef1eccb]{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.lr[data-v-0ef1eccb]{position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.fl[data-v-0ef1eccb]{float:left;overflow:hidden}.fr[data-v-0ef1eccb]{float:right;overflow:hidden}.dfcc[data-v-0ef1eccb],.drc[data-v-0ef1eccb]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.dfcc[data-v-0ef1eccb]{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.dfrcb[data-v-0ef1eccb]{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.dfrb[data-v-0ef1eccb],.dfrcb[data-v-0ef1eccb]{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.dfrb[data-v-0ef1eccb],.dfrca[data-v-0ef1eccb],.dfrcb[data-v-0ef1eccb]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.dfrca[data-v-0ef1eccb]{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around}.ft14[data-v-0ef1eccb]{font-size:.254545rem}.ft16[data-v-0ef1eccb]{font-size:.290909rem}.ft18[data-v-0ef1eccb]{font-size:.327273rem}.ft20[data-v-0ef1eccb]{font-size:.363636rem}.ft22[data-v-0ef1eccb]{font-size:.4rem}.ft24[data-v-0ef1eccb]{font-size:.436364rem}.mt10[data-v-0ef1eccb]{margin-top:.181818rem}.mt20[data-v-0ef1eccb]{margin-top:.363636rem}.mt30[data-v-0ef1eccb]{margin-top:.545455rem}.mt40[data-v-0ef1eccb]{margin-top:.727273rem}.mt50[data-v-0ef1eccb]{margin-top:.909091rem}.mb10[data-v-0ef1eccb]{margin-bottom:.181818rem}.mb20[data-v-0ef1eccb]{margin-bottom:.363636rem}.mb30[data-v-0ef1eccb]{margin-bottom:.545455rem}.mb40[data-v-0ef1eccb]{margin-bottom:.727273rem}.mb50[data-v-0ef1eccb]{margin-bottom:.909091rem}.ml10[data-v-0ef1eccb]{margin-left:.181818rem}.ml20[data-v-0ef1eccb]{margin-left:.363636rem}.ml30[data-v-0ef1eccb]{margin-left:.545455rem}.ml40[data-v-0ef1eccb]{margin-left:.727273rem}.ml50[data-v-0ef1eccb]{margin-left:.909091rem}.mr10[data-v-0ef1eccb]{margin-right:.181818rem}.mr20[data-v-0ef1eccb]{margin-right:.363636rem}.mr30[data-v-0ef1eccb]{margin-right:.545455rem}.mr40[data-v-0ef1eccb]{margin-right:.727273rem}.mr50[data-v-0ef1eccb]{margin-right:.909091rem}.pt10[data-v-0ef1eccb]{padding-top:.181818rem}.pt20[data-v-0ef1eccb]{padding-top:.363636rem}.pt30[data-v-0ef1eccb]{padding-top:.545455rem}.pt40[data-v-0ef1eccb]{padding-top:.727273rem}.pt50[data-v-0ef1eccb]{padding-top:.909091rem}.pb10[data-v-0ef1eccb]{padding-bottom:.181818rem}.pb20[data-v-0ef1eccb]{padding-bottom:.363636rem}.pb30[data-v-0ef1eccb]{padding-bottom:.545455rem}.pb40[data-v-0ef1eccb]{padding-bottom:.727273rem}.pb50[data-v-0ef1eccb]{padding-bottom:.909091rem}.pl10[data-v-0ef1eccb]{padding-left:.181818rem}.pl20[data-v-0ef1eccb]{padding-left:.363636rem}.pl30[data-v-0ef1eccb]{padding-left:.545455rem}.pl40[data-v-0ef1eccb]{padding-left:.727273rem}.pl50[data-v-0ef1eccb]{padding-left:.909091rem}.pr10[data-v-0ef1eccb]{padding-right:.181818rem}.pr20[data-v-0ef1eccb]{padding-right:.363636rem}.pr30[data-v-0ef1eccb]{padding-right:.545455rem}.pr40[data-v-0ef1eccb]{padding-right:.727273rem}.pr50[data-v-0ef1eccb]{padding-right:.909091rem}.text-c[data-v-0ef1eccb]{text-align:center}.text-l[data-v-0ef1eccb]{text-align:left}.text-r[data-v-0ef1eccb]{text-align:right}.bg-red[data-v-0ef1eccb]{background:#c96148}.bg-fff[data-v-0ef1eccb]{background:#fff}.bg-fa[data-v-0ef1eccb]{background:#fafafa}.bg-f62[data-v-0ef1eccb]{background:#f62135}.bg-00a[data-v-0ef1eccb]{background:#00ad59}.color-red[data-v-0ef1eccb]{color:#c96148}.color-666[data-v-0ef1eccb]{color:#666}.color-fff[data-v-0ef1eccb]{color:#fff}.color-333[data-v-0ef1eccb]{color:#333}.color-999[data-v-0ef1eccb]{color:#999}.color-b3[data-v-0ef1eccb]{color:#b3b3b3}.color-00a[data-v-0ef1eccb]{color:#00ad59}.color-90[data-v-0ef1eccb]{color:#909090}.color-409[data-v-0ef1eccb]{color:#409eff}.public_table_list[data-v-0ef1eccb]{padding:0 .909091rem;border-top:.018182rem solid #fff}.public_table_list .public_table[data-v-0ef1eccb]{margin-top:.363636rem;border:.018182rem solid #ebeef5;border-bottom:none}.feedback .top_nav[data-v-0ef1eccb]{height:.545455rem;line-height:.545455rem}.feedback .top_nav .el-col[data-v-0ef1eccb]{color:red;font-weight:700}.feedback .feedBack_state[data-v-0ef1eccb]{color:red;cursor:pointer}.feedback .public_table .el-textarea[data-v-0ef1eccb]{overflow-y:hidden}.feedback .public_table .el-textarea textarea[data-v-0ef1eccb]{resize:none}.feedback .el-textarea[data-v-0ef1eccb]::-webkit-scrollbar{display:none}",""])},521:function(e,t,a){var c=a(509);"string"==typeof c&&(c=[[e.i,c,""]]),c.locals&&(e.exports=c.locals);a(483)("6b23e57e",c,!0)},534:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"feedback"},[a("el-row",{staticClass:"drc top_nav mb20 ft18",attrs:{span:24}},[a("el-col",{attrs:{span:3}},[e._v("昨日反馈："+e._s(e.yesterdayCount))]),e._v(" "),a("el-col",{attrs:{span:3}},[e._v("总反馈："+e._s(e.totalCount))]),e._v(" "),a("el-col",{attrs:{span:3}},[e._v("未处理："+e._s(e.untreatedCount))])],1),e._v(" "),a("el-divider"),e._v(" "),a("el-row",{staticClass:"mt30 mb30",attrs:{span:24}},[a("el-col",{staticClass:"ft16",attrs:{span:4}},[e._v("\n      用户类别：\n      "),a("el-select",{staticStyle:{width:"60%"},on:{change:e.changetable},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},e._l(e.userType,function(e){return a("el-option",{key:e.values,attrs:{label:e.label,value:e.label}})}),1)],1),e._v(" "),a("el-col",{staticClass:"ft16",attrs:{span:4}},[e._v("\n      意见类别：\n      "),a("el-select",{staticStyle:{width:"60%"},on:{change:e.changetable},model:{value:e.idea,callback:function(t){e.idea=t},expression:"idea"}},e._l(e.ideaType,function(e){return a("el-option",{key:e.values,attrs:{label:e.label,value:e.label}})}),1)],1),e._v(" "),a("el-col",{staticClass:"ft16",attrs:{span:4}},[e._v("\n      状态：\n      "),a("el-select",{staticStyle:{width:"60%"},on:{change:e.changetable},model:{value:e.statu,callback:function(t){e.statu=t},expression:"statu"}},e._l(e.status,function(e){return a("el-option",{key:e.values,attrs:{label:e.label,value:e.values}})}),1)],1),e._v(" "),a("el-col",{staticClass:"ft16",attrs:{span:12}},[e._v("\n      反馈日期:\n      "),a("el-date-picker",{staticStyle:{width:"80%"},attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},on:{change:e.changetable},model:{value:e.newtime,callback:function(t){e.newtime=t},expression:"newtime"}})],1)],1),e._v(" "),a("el-row",{staticClass:"pr30"},[a("el-col",{staticClass:"text-r",attrs:{span:24}},[a("el-input",{staticStyle:{width:"30%"},attrs:{placeholder:"请输入手机号码",clearable:""},on:{input:e.clear,change:e.searchData},model:{value:e.firm,callback:function(t){e.firm=t},expression:"firm"}},[a("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})]),e._v(" "),a("el-button",{staticClass:"ml10",attrs:{type:"primary"},on:{click:e.searchData}},[e._v("查询")])],1)],1),e._v(" "),a("el-row",{staticClass:"public_table_list"},[a("el-col",{attrs:{span:24}},[a("el-table",{staticClass:"public_table",attrs:{data:e.tableData}},[a("el-table-column",{attrs:{label:"手机",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{color:"#409EFF",cursor:"pointer"},on:{click:function(a){return e.openMask(t.$index,t.row)}}},[e._v(e._s(t.row.phoneNo))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"用户类别",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.userType))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"意见类别",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.type))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"反馈内容",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.problem))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"反馈时间",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.starttime))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"备注",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{staticClass:"feedback_input",attrs:{type:"textarea"},on:{change:function(a){return e.keepRemark(t.$index,t.row)}},model:{value:t.row.remark,callback:function(a){e.$set(t.row,"remark",a)},expression:"scope.row.remark"}},[e._v(e._s(t.row.remark?t.row.remark:""))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"feedBack_state",on:{click:function(a){return e.changeState(t.$index,t.row)}}},[e._v(e._s("1"==t.row.state?"未处理":"已处理"))])]}}])})],1)],1)],1),e._v(" "),a("jlPopup",{attrs:{showMask:!0,personList:e.personList,dangerText:"Delete",hideMask:e.hideMask},on:{refesh:e.handleRefesh},model:{value:e.sendVal,callback:function(t){e.sendVal=t},expression:"sendVal"}}),e._v(" "),a("div",{staticClass:"block pl50 mt30"},[a("el-pagination",{attrs:{"current-page":1,"page-sizes":[15,30,45,60],"page-size":15,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"current-change":e.handleCurrentChange,"size-change":e.handleSizeChange}})],1)],1)},staticRenderFns:[]}}});