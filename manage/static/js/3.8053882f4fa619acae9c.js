webpackJsonp([3],{491:function(e,t,a){a(517);var l=a(1)(a(502),a(529),"data-v-38c7379d",null);e.exports=l.exports},502:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(69),r=a.n(l),n=a(3),o=a(244);t.default={data:function(){return{userList:"",orderTypes:[{label:"全部",value:""},{label:"充值会员",value:"0"},{label:"综合查询",value:"1"},{label:"续费会员",value:"2"}],states:[{value:"",label:"全部"},{value:"0",label:"已付款"},{value:"1",label:"未付款"},{value:"2",label:"已退款"}],channels:[{value:"",label:"全部"},{value:"0",label:"安卓"},{value:"1",label:"苹果"},{value:"2",label:"扫码"},{value:"3",label:"Wap"}],value:"全部",newtime:"",firm:"",total:null,state:"全部",channel:"全部",orderType:"全部",pagesize:15,pagenum:1,tableData:[]}},methods:{orderList:function(){var e=this,t={pageNo:this.pagenum,pageSize:this.pagesize,orderType:"全部"==this.orderType?null:this.orderType,tradeType:"全部"==this.channel?null:this.channel,payStatus:"全部"==this.state?null:this.state,phoneNo:this.firm,orderStart:this.newtime?this.newtime[0]:"",orderEnd:this.newtime?this.newtime[1]:""};a.i(n.c)(t).then(function(t){if("1"==t.code){var l=t.data,n=t.total;if(e.total=n,l.length){var s=!0,i=!1,c=void 0;try{for(var d,u=r()(l);!(s=(d=u.next()).done);s=!0){var f=d.value;f.createTime=a.i(o.a)(f.createTime),f.money=parseFloat(f.money).toFixed(2),f.truePay=parseFloat(f.truePay).toFixed(2)}}catch(e){i=!0,c=e}finally{try{!s&&u.return&&u.return()}finally{if(i)throw c}}}e.tableData=l}else console.info("订单列表接口不通")})},orderTotal:function(){var e=this;a.i(n.d)({}).then(function(t){if("1"==t.code){var a=t.data;a.totalMoney=a.totalMoney.toFixed(2),a.todayReceivable=a.todayReceivable.toFixed(2),a.todayTrueMoney=a.todayTrueMoney.toFixed(2),e.userList=a}else console.info("订单统计接口不通")})},changetable:function(){var e=this;this.pagenum=1,setTimeout(function(){return e.orderList()},100)},clear:function(){""==this.firm&&this.orderList()},searchData:function(){this.pagenum=1,this.orderList()},handleCurrentChange:function(e){this.pagenum=e,this.orderList()},handleSizeChange:function(e){this.pagesize=e,this.orderList()}},created:function(){this.orderTotal(),this.orderList()}}},506:function(e,t,a){t=e.exports=a(480)(!1),t.push([e.i,".allcover[data-v-38c7379d]{position:absolute;top:0;right:0}.ctt[data-v-38c7379d]{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.tb[data-v-38c7379d]{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.lr[data-v-38c7379d]{position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.fl[data-v-38c7379d]{float:left;overflow:hidden}.fr[data-v-38c7379d]{float:right;overflow:hidden}.dfcc[data-v-38c7379d],.drc[data-v-38c7379d]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.dfcc[data-v-38c7379d]{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.dfrcb[data-v-38c7379d]{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.dfrb[data-v-38c7379d],.dfrcb[data-v-38c7379d]{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.dfrb[data-v-38c7379d],.dfrca[data-v-38c7379d],.dfrcb[data-v-38c7379d]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.dfrca[data-v-38c7379d]{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around}.ft14[data-v-38c7379d]{font-size:.254545rem}.ft16[data-v-38c7379d]{font-size:.290909rem}.ft18[data-v-38c7379d]{font-size:.327273rem}.ft20[data-v-38c7379d]{font-size:.363636rem}.ft22[data-v-38c7379d]{font-size:.4rem}.ft24[data-v-38c7379d]{font-size:.436364rem}.orderManage .top_nav[data-v-38c7379d]{height:.545455rem;line-height:.545455rem;margin-bottom:.363636rem}.orderManage .top_nav .el-col[data-v-38c7379d]{color:red;font-weight:700}.orderManage .middle_select[data-v-38c7379d]{margin-top:.363636rem}.orderManage .order_table_manage[data-v-38c7379d]{padding:0 .909091rem;border-top:.018182rem solid #fff}.orderManage .order_table_manage .order_table[data-v-38c7379d]{margin-top:.363636rem;border:.018182rem solid #eee;border-bottom:none}.orderManage .fl-right[data-v-38c7379d]{text-align:right;margin:.363636rem 0 .090909rem;padding-right:.545455rem}.orderManage .fl-right .fl-left[data-v-38c7379d]{margin-left:.363636rem;margin-right:1.090909rem}.orderManage .block[data-v-38c7379d]{margin:.545455rem .909091rem}",""])},517:function(e,t,a){var l=a(506);"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a(481)("167ebd13",l,!0)},529:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"orderManage"},[a("el-row",{staticClass:"dfcc top_nav ft20",attrs:{span:24}},[a("el-col",{attrs:{span:3}},[e._v("昨日订单："+e._s(e.userList.yesterdayOrder))]),e._v(" "),a("el-col",{attrs:{span:3}},[e._v("今日订单："+e._s(e.userList.todayOrder))]),e._v(" "),a("el-col",{attrs:{span:4}},[e._v("昨日已付："+e._s(e.userList.yesterdayPaid))]),e._v(" "),a("el-col",{attrs:{span:4}},[e._v("今日已付："+e._s(e.userList.todayPaid))]),e._v(" "),a("el-col",{attrs:{span:4}},[e._v("今日应收："+e._s(e.userList.todayReceivable))]),e._v(" "),a("el-col",{attrs:{span:3}},[e._v("今日实收："+e._s(e.userList.todayTrueMoney))]),e._v(" "),a("el-col",{attrs:{span:3}},[e._v("总资金："+e._s(e.userList.totalMoney))])],1),e._v(" "),a("el-divider"),e._v(" "),a("el-row",{staticClass:"middle_select"},[a("el-col",{attrs:{span:4}},[e._v("\n      订单类别：\n      "),a("el-select",{staticStyle:{width:"60%"},attrs:{placeholder:"请选择"},on:{change:e.changetable},model:{value:e.orderType,callback:function(t){e.orderType=t},expression:"orderType"}},e._l(e.orderTypes,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.label}})}),1)],1),e._v(" "),a("el-col",{attrs:{span:4}},[e._v("\n      渠道：\n      "),a("el-select",{staticStyle:{width:"60%"},attrs:{placeholder:"请选择"},on:{change:e.changetable},model:{value:e.channel,callback:function(t){e.channel=t},expression:"channel"}},e._l(e.channels,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.label}})}),1)],1),e._v(" "),a("el-col",{attrs:{span:4}},[e._v("\n      付款状态：\n      "),a("el-select",{staticStyle:{width:"60%"},attrs:{placeholder:"请选择"},on:{change:e.changetable},model:{value:e.state,callback:function(t){e.state=t},expression:"state"}},e._l(e.states,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.label}})}),1)],1),e._v(" "),a("el-col",{attrs:{span:10}},[e._v("\n      订单时间:\n      "),a("el-date-picker",{staticStyle:{width:"80%"},attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},on:{change:e.changetable},model:{value:e.newtime,callback:function(t){e.newtime=t},expression:"newtime"}})],1)],1),e._v(" "),a("el-row",[a("el-col",{staticClass:"fl-right",attrs:{span:24}},[a("el-input",{staticStyle:{width:"30%"},attrs:{placeholder:"请输入手机号码",clearable:""},on:{input:e.clear,change:e.searchData},model:{value:e.firm,callback:function(t){e.firm=t},expression:"firm"}},[a("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})]),e._v(" "),a("el-button",{staticClass:"fl-left",attrs:{type:"primary"},on:{click:e.searchData}},[e._v("查询")])],1)],1),e._v(" "),a("el-row",{staticClass:"order_table_manage"},[a("el-col",{attrs:{span:24}},[a("el-table",{staticClass:"order_table",attrs:{data:e.tableData}},[a("el-table-column",{attrs:{label:"订单号",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.orderNo))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"手机",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.phoneNo))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"金额",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.money))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"实收",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.truePay))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"订单类别",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.orderType))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"渠道",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.tradeType))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"付款状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.payStatus))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"订单时间",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.createTime))])]}}])})],1)],1)],1),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":1,"page-sizes":[15,30,45,60],"page-size":15,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"current-change":e.handleCurrentChange,"size-change":e.handleSizeChange}})],1)],1)},staticRenderFns:[]}}});