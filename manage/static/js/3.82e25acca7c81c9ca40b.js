webpackJsonp([3],{530:function(t,e,a){a(559);var r=a(1)(a(542),a(572),"data-v-38c7379d",null);t.exports=r.exports},542:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(76),l=a.n(r),n=a(2),d=a(35);e.default={data:function(){return{userList:"",orderTypes:[{label:"全部",value:""},{label:"充值会员",value:"0"},{label:"综合查询",value:"1"},{label:"续费会员",value:"2"}],states:[{value:"",label:"全部"},{value:"0",label:"已付款"},{value:"1",label:"未付款"},{value:"2",label:"已退款"}],channels:[{value:"",label:"全部"},{value:"0",label:"安卓"},{value:"1",label:"苹果"},{value:"2",label:"扫码"},{value:"3",label:"Wap"}],value:"全部",newtime:"",firm:"",total:null,state:"全部",channel:"全部",orderType:"全部",pagesize:15,pagenum:1,tableData:[]}},methods:{orderList:function(){var t=this,e={pageNo:this.pagenum,pageSize:this.pagesize,orderType:"全部"==this.orderType?null:this.orderType,tradeType:"全部"==this.channel?null:this.channel,payStatus:"全部"==this.state?null:this.state,phoneNo:this.firm,orderStart:this.newtime?this.newtime[0]:"",orderEnd:this.newtime?this.newtime[1]:""};a.i(n.k)(e).then(function(e){if("1"==e.code){var r=e.data,n=e.total;if(t.total=n,r.length){var o=!0,i=!1,c=void 0;try{for(var s,m=l()(r);!(o=(s=m.next()).done);o=!0){var p=s.value;p.createTime=a.i(d.b)(p.createTime),p.money=parseFloat(p.money).toFixed(2),p.truePay=parseFloat(p.truePay).toFixed(2)}}catch(t){i=!0,c=t}finally{try{!o&&m.return&&m.return()}finally{if(i)throw c}}}t.tableData=r}else console.info("订单列表接口不通")})},orderTotal:function(){var t=this;a.i(n.l)({}).then(function(e){if("1"==e.code){var a=e.data;a.totalMoney=a.totalMoney.toFixed(2),a.todayReceivable=a.todayReceivable.toFixed(2),a.todayTrueMoney=a.todayTrueMoney.toFixed(2),t.userList=a}else console.info("订单统计接口不通")})},changetable:function(){var t=this;this.pagenum=1,setTimeout(function(){return t.orderList()},100)},clear:function(){""==this.firm&&this.orderList()},searchData:function(){this.pagenum=1,this.orderList()},handleCurrentChange:function(t){this.pagenum=t,this.orderList()},handleSizeChange:function(t){this.pagesize=t,this.orderList()}},created:function(){this.orderTotal(),this.orderList()}}},547:function(t,e,a){e=t.exports=a(518)(!1),e.push([t.i,".allcover[data-v-38c7379d]{position:absolute;top:0;right:0}.ctt[data-v-38c7379d]{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.tb[data-v-38c7379d]{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.lr[data-v-38c7379d]{position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.fl[data-v-38c7379d]{float:left;overflow:hidden}.fr[data-v-38c7379d]{float:right;overflow:hidden}.dfcc[data-v-38c7379d],.drc[data-v-38c7379d]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.dfcc[data-v-38c7379d]{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.dfrcb[data-v-38c7379d]{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.dfrb[data-v-38c7379d],.dfrcb[data-v-38c7379d]{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.dfrb[data-v-38c7379d],.dfrca[data-v-38c7379d],.dfrcb[data-v-38c7379d]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.dfrca[data-v-38c7379d]{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around}.ft14[data-v-38c7379d]{font-size:.254545rem}.ft16[data-v-38c7379d]{font-size:.290909rem}.ft18[data-v-38c7379d]{font-size:.327273rem}.ft20[data-v-38c7379d]{font-size:.363636rem}.ft22[data-v-38c7379d]{font-size:.4rem}.ft24[data-v-38c7379d]{font-size:.436364rem}.blod[data-v-38c7379d]{font-weight:700}.mt10[data-v-38c7379d]{margin-top:.181818rem}.mt20[data-v-38c7379d]{margin-top:.363636rem}.mt30[data-v-38c7379d]{margin-top:.545455rem}.mt40[data-v-38c7379d]{margin-top:.727273rem}.mt50[data-v-38c7379d]{margin-top:.909091rem}.mb10[data-v-38c7379d]{margin-bottom:.181818rem}.mb20[data-v-38c7379d]{margin-bottom:.363636rem}.mb30[data-v-38c7379d]{margin-bottom:.545455rem}.mb40[data-v-38c7379d]{margin-bottom:.727273rem}.mb50[data-v-38c7379d]{margin-bottom:.909091rem}.ml10[data-v-38c7379d]{margin-left:.181818rem}.ml20[data-v-38c7379d]{margin-left:.363636rem}.ml30[data-v-38c7379d]{margin-left:.545455rem}.ml40[data-v-38c7379d]{margin-left:.727273rem}.ml50[data-v-38c7379d]{margin-left:.909091rem}.mr10[data-v-38c7379d]{margin-right:.181818rem}.mr20[data-v-38c7379d]{margin-right:.363636rem}.mr30[data-v-38c7379d]{margin-right:.545455rem}.mr40[data-v-38c7379d]{margin-right:.727273rem}.mr50[data-v-38c7379d]{margin-right:.909091rem}.pt10[data-v-38c7379d]{padding-top:.181818rem}.pt20[data-v-38c7379d]{padding-top:.363636rem}.pt30[data-v-38c7379d]{padding-top:.545455rem}.pt40[data-v-38c7379d]{padding-top:.727273rem}.pt50[data-v-38c7379d]{padding-top:.909091rem}.pb10[data-v-38c7379d]{padding-bottom:.181818rem}.pb20[data-v-38c7379d]{padding-bottom:.363636rem}.pb30[data-v-38c7379d]{padding-bottom:.545455rem}.pb40[data-v-38c7379d]{padding-bottom:.727273rem}.pb50[data-v-38c7379d]{padding-bottom:.909091rem}.pl10[data-v-38c7379d]{padding-left:.181818rem}.pl20[data-v-38c7379d]{padding-left:.363636rem}.pl30[data-v-38c7379d]{padding-left:.545455rem}.pl40[data-v-38c7379d]{padding-left:.727273rem}.pl50[data-v-38c7379d]{padding-left:.909091rem}.pr10[data-v-38c7379d]{padding-right:.181818rem}.pr20[data-v-38c7379d]{padding-right:.363636rem}.pr30[data-v-38c7379d]{padding-right:.545455rem}.pr40[data-v-38c7379d]{padding-right:.727273rem}.pr50[data-v-38c7379d]{padding-right:.909091rem}.text-c[data-v-38c7379d]{text-align:center}.text-l[data-v-38c7379d]{text-align:left}.text-r[data-v-38c7379d]{text-align:right}.bg-red[data-v-38c7379d]{background:#c96148}.bg-fff[data-v-38c7379d]{background:#fff}.bg-fa[data-v-38c7379d]{background:#fafafa}.bg-f62[data-v-38c7379d]{background:#f62135}.bg-00a[data-v-38c7379d]{background:#00ad59}.bg-409[data-v-38c7379d]{background:#409eff}.color-red[data-v-38c7379d]{color:#c96148}.color-666[data-v-38c7379d]{color:#666}.color-fff[data-v-38c7379d]{color:#fff}.color-333[data-v-38c7379d]{color:#333}.color-999[data-v-38c7379d]{color:#999}.color-b3[data-v-38c7379d]{color:#b3b3b3}.color-00a[data-v-38c7379d]{color:#00ad59}.color-90[data-v-38c7379d]{color:#909090}.color-409[data-v-38c7379d]{color:#409eff}.public_table_list[data-v-38c7379d]{padding:0 .909091rem;border-top:.018182rem solid #fff}.public_table_list .public_table[data-v-38c7379d]{margin-top:.363636rem;border:.018182rem solid #ebeef5;border-bottom:none}.orderManage .top_nav[data-v-38c7379d]{height:.545455rem;line-height:.545455rem;margin-bottom:.363636rem}.orderManage .top_nav .el-col[data-v-38c7379d]{color:red;font-weight:700}.orderManage .middle_select[data-v-38c7379d]{margin-top:.363636rem}.orderManage .fl-right[data-v-38c7379d]{text-align:right;margin:.363636rem 0 .090909rem;padding-right:.545455rem}.orderManage .fl-right .fl-left[data-v-38c7379d]{margin-left:.363636rem;margin-right:1.090909rem}.orderManage .block[data-v-38c7379d]{margin:.545455rem .909091rem}",""])},559:function(t,e,a){var r=a(547);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(519)("167ebd13",r,!0)},572:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"orderManage"},[a("el-row",{staticClass:"dfcc top_nav ft18",attrs:{span:24}},[a("el-col",{attrs:{span:3}},[t._v("昨日订单："+t._s(t.userList.yesterdayOrder))]),t._v(" "),a("el-col",{attrs:{span:3}},[t._v("今日订单："+t._s(t.userList.todayOrder))]),t._v(" "),a("el-col",{attrs:{span:4}},[t._v("昨日已付："+t._s(t.userList.yesterdayPaid))]),t._v(" "),a("el-col",{attrs:{span:4}},[t._v("今日已付："+t._s(t.userList.todayPaid))]),t._v(" "),a("el-col",{attrs:{span:4}},[t._v("今日应收："+t._s(t.userList.todayReceivable))]),t._v(" "),a("el-col",{attrs:{span:3}},[t._v("今日实收："+t._s(t.userList.todayTrueMoney))]),t._v(" "),a("el-col",{attrs:{span:3}},[t._v("总资金："+t._s(t.userList.totalMoney))])],1),t._v(" "),a("el-divider"),t._v(" "),a("el-row",{staticClass:"middle_select"},[a("el-col",{staticClass:"ft16",attrs:{span:4}},[t._v("\n      订单类别：\n      "),a("el-select",{staticStyle:{width:"60%"},attrs:{placeholder:"请选择"},on:{change:t.changetable},model:{value:t.orderType,callback:function(e){t.orderType=e},expression:"orderType"}},t._l(t.orderTypes,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.label}})}),1)],1),t._v(" "),a("el-col",{staticClass:"ft16",attrs:{span:4}},[t._v("\n      渠道：\n      "),a("el-select",{staticStyle:{width:"60%"},attrs:{placeholder:"请选择"},on:{change:t.changetable},model:{value:t.channel,callback:function(e){t.channel=e},expression:"channel"}},t._l(t.channels,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.label}})}),1)],1),t._v(" "),a("el-col",{staticClass:"ft16",attrs:{span:4}},[t._v("\n      付款状态：\n      "),a("el-select",{staticStyle:{width:"60%"},attrs:{placeholder:"请选择"},on:{change:t.changetable},model:{value:t.state,callback:function(e){t.state=e},expression:"state"}},t._l(t.states,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.label}})}),1)],1),t._v(" "),a("el-col",{staticClass:"ft16",attrs:{span:10}},[t._v("\n      订单时间:\n      "),a("el-date-picker",{staticStyle:{width:"80%"},attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},on:{change:t.changetable},model:{value:t.newtime,callback:function(e){t.newtime=e},expression:"newtime"}})],1)],1),t._v(" "),a("el-row",[a("el-col",{staticClass:"fl-right",attrs:{span:24}},[a("el-input",{staticStyle:{width:"30%"},attrs:{placeholder:"请输入手机号码",clearable:""},on:{input:t.clear,change:t.searchData},model:{value:t.firm,callback:function(e){t.firm=e},expression:"firm"}},[a("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})]),t._v(" "),a("el-button",{staticClass:"fl-left",attrs:{type:"primary"},on:{click:t.searchData}},[t._v("查询")])],1)],1),t._v(" "),a("el-row",{staticClass:"public_table_list"},[a("el-col",{attrs:{span:24}},[a("el-table",{staticClass:"public_table",attrs:{data:t.tableData}},[a("el-table-column",{attrs:{label:"订单号",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.orderNo))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"手机",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.phoneNo))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"金额",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.money))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"实收",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.truePay))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"订单类别",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.orderType))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"渠道",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.tradeType))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"付款状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.payStatus))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"订单时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.createTime))])]}}])})],1)],1)],1),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":1,"page-sizes":[15,30,45,60],"page-size":15,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange}})],1)],1)},staticRenderFns:[]}}});