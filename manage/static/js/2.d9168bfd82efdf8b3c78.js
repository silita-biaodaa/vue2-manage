webpackJsonp([2],{1013:function(e,t,a){a(1049);var r=a(5)(a(1029),a(1066),"data-v-38c7379d",null);e.exports=r.exports},1029:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(52),l=a.n(r),n=a(11),o=a(65);t.default={data:function(){return{userList:"",orderTypes:[{label:"全部",value:""},{label:"充值会员",value:"0"},{label:"综合查询",value:"1"},{label:"续费会员",value:"2"}],states:[{value:"",label:"全部"},{value:"0",label:"已付款"},{value:"1",label:"未付款"},{value:"2",label:"已退款"},{value:"3",label:"已失效"}],channels:[{value:"",label:"全部"},{value:"0",label:"安卓"},{value:"1",label:"苹果"},{value:"2",label:"扫码"},{value:"3",label:"Wap"}],value:"全部",newtime:"",firm:"",total:null,state:"全部",channel:"全部",orderType:"全部",pagesize:15,pagenum:1,tableData:[],personList:null,hideMask:"hideMask",sendVal:""}},methods:{orderList:function(){var e=this,t={pageNo:this.pagenum,pageSize:this.pagesize,orderType:"全部"==this.orderType?null:this.orderType,tradeType:"全部"==this.channel?null:this.channel,payStatus:"全部"==this.state?null:this.state,phoneNo:this.firm,orderStart:this.newtime?this.newtime[0]:"",orderEnd:this.newtime?this.newtime[1]:""};a.i(n.Q)(t).then(function(t){if("1"==t.code){var r=t.data,n=t.total;if(e.total=n,r.length){var i=!0,d=!1,c=void 0;try{for(var s,f=l()(r);!(i=(s=f.next()).done);i=!0){var p=s.value;p.createTime=a.i(o.a)(p.createTime),p.money=parseFloat(p.money).toFixed(2),p.truePay=parseFloat(p.truePay).toFixed(2)}}catch(e){d=!0,c=e}finally{try{!i&&f.return&&f.return()}finally{if(d)throw c}}}e.tableData=r}else console.info("订单列表接口不通")})},orderTotal:function(){var e=this;a.i(n.R)({}).then(function(t){if("1"==t.code){var a=t.data;a.totalMoney=a.totalMoney.toFixed(2),a.todayReceivable=a.todayReceivable.toFixed(2),a.todayTrueMoney=a.todayTrueMoney.toFixed(2),e.userList=a}else console.info("订单统计接口不通")})},changetable:function(){var e=this;this.pagenum=1,setTimeout(function(){return e.orderList()},100)},clear:function(){""==this.firm&&this.orderList()},searchData:function(){this.pagenum=1,this.orderList()},handleCurrentChange:function(e){this.pagenum=e,this.orderList()},handleSizeChange:function(e){this.pagesize=e,this.orderList()},openMask:function(e,t){this.sendVal=!0,this.personList=t},handleRefesh:function(e){var t=this;e&&setTimeout(function(){return t.orderList()},100)}},created:function(){this.orderTotal(),this.orderList()}}},1033:function(e,t,a){t=e.exports=a(996)(!1),t.push([e.i,".allcover[data-v-38c7379d]{position:absolute;top:0;right:0}.ctt[data-v-38c7379d]{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.tb[data-v-38c7379d]{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.lr[data-v-38c7379d]{position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.fl[data-v-38c7379d]{float:left;overflow:hidden}.fr[data-v-38c7379d]{float:right;overflow:hidden}.drc[data-v-38c7379d]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.dc[data-v-38c7379d],.dcr[data-v-38c7379d]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.dcr[data-v-38c7379d]{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.dfcc[data-v-38c7379d]{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.dfcc[data-v-38c7379d],.dfrcb[data-v-38c7379d]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.dfrcb[data-v-38c7379d]{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.dfrb[data-v-38c7379d]{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.dfrb[data-v-38c7379d],.dfrca[data-v-38c7379d]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.dfrca[data-v-38c7379d]{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around}.cp[data-v-38c7379d]{cursor:pointer}.ft14[data-v-38c7379d]{font-size:.254545rem}.ft16[data-v-38c7379d]{font-size:.290909rem}.ft18[data-v-38c7379d]{font-size:.327273rem}.ft20[data-v-38c7379d]{font-size:.363636rem}.ft22[data-v-38c7379d]{font-size:.4rem}.ft24[data-v-38c7379d]{font-size:.436364rem}.blod[data-v-38c7379d]{font-weight:700}.mt10[data-v-38c7379d]{margin-top:.181818rem}.mt20[data-v-38c7379d]{margin-top:.363636rem}.mt30[data-v-38c7379d]{margin-top:.545455rem}.mt40[data-v-38c7379d]{margin-top:.727273rem}.mt50[data-v-38c7379d]{margin-top:.909091rem}.mb10[data-v-38c7379d]{margin-bottom:.181818rem}.mb20[data-v-38c7379d]{margin-bottom:.363636rem}.mb30[data-v-38c7379d]{margin-bottom:.545455rem}.mb40[data-v-38c7379d]{margin-bottom:.727273rem}.mb50[data-v-38c7379d]{margin-bottom:.909091rem}.ml10[data-v-38c7379d]{margin-left:.181818rem}.ml20[data-v-38c7379d]{margin-left:.363636rem}.ml30[data-v-38c7379d]{margin-left:.545455rem}.ml40[data-v-38c7379d]{margin-left:.727273rem}.ml50[data-v-38c7379d]{margin-left:.909091rem}.mr10[data-v-38c7379d]{margin-right:.181818rem}.mr20[data-v-38c7379d]{margin-right:.363636rem}.mr30[data-v-38c7379d]{margin-right:.545455rem}.mr40[data-v-38c7379d]{margin-right:.727273rem}.mr50[data-v-38c7379d]{margin-right:.909091rem}.pt10[data-v-38c7379d]{padding-top:.181818rem}.pt20[data-v-38c7379d]{padding-top:.363636rem}.pt30[data-v-38c7379d]{padding-top:.545455rem}.pt40[data-v-38c7379d]{padding-top:.727273rem}.pt50[data-v-38c7379d]{padding-top:.909091rem}.pb10[data-v-38c7379d]{padding-bottom:.181818rem}.pb20[data-v-38c7379d]{padding-bottom:.363636rem}.pb30[data-v-38c7379d]{padding-bottom:.545455rem}.pb40[data-v-38c7379d]{padding-bottom:.727273rem}.pb50[data-v-38c7379d]{padding-bottom:.909091rem}.pl10[data-v-38c7379d]{padding-left:.181818rem}.pl20[data-v-38c7379d]{padding-left:.363636rem}.pl30[data-v-38c7379d]{padding-left:.545455rem}.pl40[data-v-38c7379d]{padding-left:.727273rem}.pl50[data-v-38c7379d]{padding-left:.909091rem}.pr10[data-v-38c7379d]{padding-right:.181818rem}.pr20[data-v-38c7379d]{padding-right:.363636rem}.pr30[data-v-38c7379d]{padding-right:.545455rem}.pr40[data-v-38c7379d]{padding-right:.727273rem}.pr50[data-v-38c7379d]{padding-right:.909091rem}.text-c[data-v-38c7379d]{text-align:center}.text-l[data-v-38c7379d]{text-align:left}.text-r[data-v-38c7379d]{text-align:right}.bg-red[data-v-38c7379d]{background:#c96148}.bg-fff[data-v-38c7379d]{background:#fff}.bg-fa[data-v-38c7379d]{background:#fafafa}.bg-f62[data-v-38c7379d]{background:#f62135}.bg-00a[data-v-38c7379d]{background:#00ad59}.bg-409[data-v-38c7379d]{background:#409eff}.color-red[data-v-38c7379d]{color:#c96148}.color-666[data-v-38c7379d]{color:#666}.color-fff[data-v-38c7379d]{color:#fff}.color-333[data-v-38c7379d]{color:#333}.color-999[data-v-38c7379d]{color:#999}.color-b3[data-v-38c7379d]{color:#b3b3b3}.color-00a[data-v-38c7379d]{color:#00ad59}.color-90[data-v-38c7379d]{color:#909090}.color-409[data-v-38c7379d]{color:#409eff}.color-60[data-v-38c7379d]{color:#606266}.color-f62[data-v-38c7379d]{color:#f62135}.public_table_list[data-v-38c7379d]{padding:0 .727273rem;border:.018182rem solid #fff}.public_table_list .public_table[data-v-38c7379d]{margin-top:.090909rem;border-top:.018182rem solid #ebeef5!important;border-left:.018182rem solid #ebeef5!important;border-right:.018182rem solid #ebeef5!important}.orderManage .top_nav[data-v-38c7379d]{height:.545455rem;line-height:.545455rem;margin-bottom:.363636rem}.orderManage .top_nav .el-col[data-v-38c7379d]{color:red;font-weight:700}.orderManage .middle_select[data-v-38c7379d]{margin-top:.363636rem}.orderManage .fl-right[data-v-38c7379d]{text-align:right;padding-right:.545455rem}.orderManage .fl-right .fl-left[data-v-38c7379d]{margin-left:.363636rem;margin-right:1.090909rem}.orderManage .block[data-v-38c7379d]{margin:.545455rem .909091rem}",""])},1049:function(e,t,a){var r=a(1033);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(997)("167ebd13",r,!0)},1066:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"orderManage"},[a("el-row",{staticClass:"dfcc top_nav ft18",attrs:{span:24}},[a("el-col",{attrs:{span:3}},[e._v("昨日订单："+e._s(e.userList.yesterdayOrder))]),e._v(" "),a("el-col",{attrs:{span:3}},[e._v("今日订单："+e._s(e.userList.todayOrder))]),e._v(" "),a("el-col",{attrs:{span:4}},[e._v("昨日已付："+e._s(e.userList.yesterdayPaid))]),e._v(" "),a("el-col",{attrs:{span:4}},[e._v("今日已付："+e._s(e.userList.todayPaid))]),e._v(" "),a("el-col",{attrs:{span:4}},[e._v("今日应收："+e._s(e.userList.todayReceivable))]),e._v(" "),a("el-col",{attrs:{span:3}},[e._v("今日实收："+e._s(e.userList.todayTrueMoney))]),e._v(" "),a("el-col",{attrs:{span:3}},[e._v("总资金："+e._s(e.userList.totalMoney))])],1),e._v(" "),a("el-divider"),e._v(" "),a("el-row",{staticClass:"middle_select"},[a("el-col",{staticClass:"ft16",attrs:{span:4}},[e._v("\n      订单类别：\n      "),a("el-select",{staticStyle:{width:"60%"},attrs:{placeholder:"请选择"},on:{change:e.changetable},model:{value:e.orderType,callback:function(t){e.orderType=t},expression:"orderType"}},e._l(e.orderTypes,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.label}})}),1)],1),e._v(" "),a("el-col",{staticClass:"ft16",attrs:{span:4}},[e._v("\n      渠道：\n      "),a("el-select",{staticStyle:{width:"60%"},attrs:{placeholder:"请选择"},on:{change:e.changetable},model:{value:e.channel,callback:function(t){e.channel=t},expression:"channel"}},e._l(e.channels,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.label}})}),1)],1),e._v(" "),a("el-col",{staticClass:"ft16",attrs:{span:4}},[e._v("\n      付款状态：\n      "),a("el-select",{staticStyle:{width:"60%"},attrs:{placeholder:"请选择"},on:{change:e.changetable},model:{value:e.state,callback:function(t){e.state=t},expression:"state"}},e._l(e.states,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.label}})}),1)],1),e._v(" "),a("el-col",{staticClass:"ft16",attrs:{span:10}},[e._v("\n      订单时间:\n      "),a("el-date-picker",{staticStyle:{width:"80%"},attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},on:{change:e.changetable},model:{value:e.newtime,callback:function(t){e.newtime=t},expression:"newtime"}})],1)],1),e._v(" "),a("el-row",[a("el-col",{staticClass:"fl-right mt30 mb20",attrs:{span:24}},[a("el-input",{staticStyle:{width:"30%"},attrs:{placeholder:"请输入手机号码",clearable:""},on:{input:e.clear,change:e.searchData},model:{value:e.firm,callback:function(t){e.firm=t},expression:"firm"}},[a("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})]),e._v(" "),a("el-button",{staticClass:"fl-left",attrs:{type:"primary"},on:{click:e.searchData}},[e._v("查询")])],1)],1),e._v(" "),a("el-row",{staticClass:"public_table_list"},[a("el-col",{attrs:{span:24}},[a("el-table",{staticClass:"public_table",attrs:{data:e.tableData}},[a("el-table-column",{attrs:{label:"订单号",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.orderNo))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"手机",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"color-409",staticStyle:{cursor:"pointer"},on:{click:function(a){return e.openMask(t.$index,t.row)}}},[e._v(e._s(t.row.phoneNo))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"金额",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.money))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"实收",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.truePay))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"订单类别",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.orderType))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"渠道",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.tradeType))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"付款状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.payStatus))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"订单时间",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.createTime))])]}}])})],1)],1)],1),e._v(" "),a("jlPopup",{attrs:{showMask:!0,personList:e.personList,dangerText:"Delete",hideMask:e.hideMask},on:{refesh:e.handleRefesh},model:{value:e.sendVal,callback:function(t){e.sendVal=t},expression:"sendVal"}}),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":1,"page-sizes":[15,30,45,60],"page-size":15,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"current-change":e.handleCurrentChange,"size-change":e.handleSizeChange}})],1)],1)},staticRenderFns:[]}}});