webpackJsonp([4],{1011:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(71),r=a.n(i),n=a(10),l=a(88);a.n(l);e.default={data:function(){return{userType:[{label:"全部",values:"0"},{label:"注册",values:"1"},{label:"付费",values:"2"},{label:"过期",values:"3"},{label:"续费",values:"4"}],value:"全部",todayActive:"",yesterdayActive:"",newtime:[new Date((new Date).getFullYear(),(new Date).getMonth()-1,(new Date).getDate()),new Date((new Date).getFullYear(),(new Date).getMonth(),(new Date).getDate())],firm:"",pagesize:15,pagenum:1,tableData:[],total:null,rules:"",addForm:"",sendVal:"",personList:null,activeUser:"activeUser",isAllows:null}},methods:{activeNum:function(){var t=this;a.i(n.G)({}).then(function(e){if("1"==e.code){var a=e.data,i=a.todayActive,r=a.yesterdayActive;t.todayActive=i,t.yesterdayActive=r}else console.info("活跃用户统计接口不通")})},activeList:function(){var t=this,e={currentPage:this.pagenum,pageSize:this.pagesize,phoneNo:this.firm,userType:"全部"==this.value?null:this.value,startDate:this.newtime?this.newtime[0]:"",endDate:this.newtime?this.newtime[1]:""};a.i(n.H)(e).then(function(e){if("1"==e.code){var a=e.total,i=e.data;if(t.total=a,i.length){var n=!0,l=!1,o=void 0;try{for(var s,f=r()(i);!(n=(s=f.next()).done);n=!0){var d=s.value;d.created=d.created.slice(0,10)}}catch(t){l=!0,o=t}finally{try{!n&&f.return&&f.return()}finally{if(l)throw o}}}t.tableData=i}else console.info("活跃用户列表接口不通")})},clear:function(){""==this.firm&&this.activeList()},handleCurrentChange:function(t){this.pagenum=t,this.activeList()},handleSizeChange:function(t){this.pagesize=t,this.activeList()},changetable:function(){var t=this;this.pagenum=1,setTimeout(function(){return t.activeList()},100)},searchData:function(){this.pagenum=1,this.activeList()},handleEdit:function(){this.addDialogFormVisible=!0},openMask:function(t,e){this.sendVal=!0,this.personList=e},handleRefesh:function(t){var e=this;t&&setTimeout(function(){return e.activeList()},100)}},created:function(){this.activeNum(),this.activeList(),this.isAllows=this.$route.query.isAllows}}},1024:function(t,e,a){e=t.exports=a(980)(!1),e.push([t.i,".allcover[data-v-760f6797]{position:absolute;top:0;right:0}.ctt[data-v-760f6797]{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.tb[data-v-760f6797]{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.lr[data-v-760f6797]{position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.fl[data-v-760f6797]{float:left;overflow:hidden}.fr[data-v-760f6797]{float:right;overflow:hidden}.drc[data-v-760f6797]{-webkit-box-orient:horizontal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.dc[data-v-760f6797],.drc[data-v-760f6797]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-direction:normal}.dc[data-v-760f6797]{-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.dfcc[data-v-760f6797]{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.dfcc[data-v-760f6797],.dfrcb[data-v-760f6797]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.dfrcb[data-v-760f6797]{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.dfrb[data-v-760f6797]{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.dfrb[data-v-760f6797],.dfrca[data-v-760f6797]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.dfrca[data-v-760f6797]{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around}.cp[data-v-760f6797]{cursor:pointer}.ft14[data-v-760f6797]{font-size:.254545rem}.ft16[data-v-760f6797]{font-size:.290909rem}.ft18[data-v-760f6797]{font-size:.327273rem}.ft20[data-v-760f6797]{font-size:.363636rem}.ft22[data-v-760f6797]{font-size:.4rem}.ft24[data-v-760f6797]{font-size:.436364rem}.blod[data-v-760f6797]{font-weight:700}.mt10[data-v-760f6797]{margin-top:.181818rem}.mt20[data-v-760f6797]{margin-top:.363636rem}.mt30[data-v-760f6797]{margin-top:.545455rem}.mt40[data-v-760f6797]{margin-top:.727273rem}.mt50[data-v-760f6797]{margin-top:.909091rem}.mb10[data-v-760f6797]{margin-bottom:.181818rem}.mb20[data-v-760f6797]{margin-bottom:.363636rem}.mb30[data-v-760f6797]{margin-bottom:.545455rem}.mb40[data-v-760f6797]{margin-bottom:.727273rem}.mb50[data-v-760f6797]{margin-bottom:.909091rem}.ml10[data-v-760f6797]{margin-left:.181818rem}.ml20[data-v-760f6797]{margin-left:.363636rem}.ml30[data-v-760f6797]{margin-left:.545455rem}.ml40[data-v-760f6797]{margin-left:.727273rem}.ml50[data-v-760f6797]{margin-left:.909091rem}.mr10[data-v-760f6797]{margin-right:.181818rem}.mr20[data-v-760f6797]{margin-right:.363636rem}.mr30[data-v-760f6797]{margin-right:.545455rem}.mr40[data-v-760f6797]{margin-right:.727273rem}.mr50[data-v-760f6797]{margin-right:.909091rem}.pt10[data-v-760f6797]{padding-top:.181818rem}.pt20[data-v-760f6797]{padding-top:.363636rem}.pt30[data-v-760f6797]{padding-top:.545455rem}.pt40[data-v-760f6797]{padding-top:.727273rem}.pt50[data-v-760f6797]{padding-top:.909091rem}.pb10[data-v-760f6797]{padding-bottom:.181818rem}.pb20[data-v-760f6797]{padding-bottom:.363636rem}.pb30[data-v-760f6797]{padding-bottom:.545455rem}.pb40[data-v-760f6797]{padding-bottom:.727273rem}.pb50[data-v-760f6797]{padding-bottom:.909091rem}.pl10[data-v-760f6797]{padding-left:.181818rem}.pl20[data-v-760f6797]{padding-left:.363636rem}.pl30[data-v-760f6797]{padding-left:.545455rem}.pl40[data-v-760f6797]{padding-left:.727273rem}.pl50[data-v-760f6797]{padding-left:.909091rem}.pr10[data-v-760f6797]{padding-right:.181818rem}.pr20[data-v-760f6797]{padding-right:.363636rem}.pr30[data-v-760f6797]{padding-right:.545455rem}.pr40[data-v-760f6797]{padding-right:.727273rem}.pr50[data-v-760f6797]{padding-right:.909091rem}.text-c[data-v-760f6797]{text-align:center}.text-l[data-v-760f6797]{text-align:left}.text-r[data-v-760f6797]{text-align:right}.bg-red[data-v-760f6797]{background:#c96148}.bg-fff[data-v-760f6797]{background:#fff}.bg-fa[data-v-760f6797]{background:#fafafa}.bg-f62[data-v-760f6797]{background:#f62135}.bg-00a[data-v-760f6797]{background:#00ad59}.bg-409[data-v-760f6797]{background:#409eff}.color-red[data-v-760f6797]{color:#c96148}.color-666[data-v-760f6797]{color:#666}.color-fff[data-v-760f6797]{color:#fff}.color-333[data-v-760f6797]{color:#333}.color-999[data-v-760f6797]{color:#999}.color-b3[data-v-760f6797]{color:#b3b3b3}.color-00a[data-v-760f6797]{color:#00ad59}.color-90[data-v-760f6797]{color:#909090}.color-409[data-v-760f6797]{color:#409eff}.color-60[data-v-760f6797]{color:#606266}.color-f62[data-v-760f6797]{color:#f62135}.public_table_list[data-v-760f6797]{padding:0 .909091rem;border:.018182rem solid #fff}.public_table_list .public_table[data-v-760f6797]{margin-top:.090909rem;border-top:.018182rem solid #ebeef5!important;border-left:.018182rem solid #ebeef5!important;border-right:.018182rem solid #ebeef5!important}.activeUser .top_nav[data-v-760f6797]{height:.545455rem;line-height:.545455rem;margin-bottom:.363636rem}.activeUser .top_nav .el-col[data-v-760f6797]{color:red;font-weight:700}.activeUser .fl-right[data-v-760f6797]{text-align:right}.activeUser .fl-right .fl-left[data-v-760f6797]{margin-left:.363636rem}.activeUser .look_info[data-v-760f6797]{color:#409eff;cursor:pointer}.activeUser .block[data-v-760f6797]{padding:0 .909091rem;margin-top:.545455rem}",""])},1040:function(t,e,a){var i=a(1024);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a(981)("409c16a9",i,!0)},1057:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"activeUser"},[a("el-row",{staticClass:"drc top_nav ft18",attrs:{span:24}},[a("el-col",{attrs:{span:3}},[t._v("昨日活跃："+t._s(t.yesterdayActive))]),t._v(" "),a("el-col",{attrs:{span:3}},[t._v("今日活跃："+t._s(t.todayActive))])],1),t._v(" "),a("el-divider"),t._v(" "),a("el-row",{staticClass:"row-bg",attrs:{type:"flex",justify:"space-between",span:24}},[a("el-col",{staticClass:"ft16",attrs:{span:4}},[t._v("\n      用户类别：\n      "),a("el-select",{staticStyle:{width:"60%"},on:{change:t.changetable},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},t._l(t.userType,function(t){return a("el-option",{key:t.values,attrs:{label:t.label,value:t.label}})}),1)],1),t._v(" "),a("el-col",{staticClass:"ft16 mb20",attrs:{span:10}},[t._v("\n      活跃日期:\n      "),a("el-date-picker",{staticStyle:{width:"70%"},attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},on:{change:t.changetable},model:{value:t.newtime,callback:function(e){t.newtime=e},expression:"newtime"}})],1)],1),t._v(" "),a("div",{staticClass:"mb10"},[a("el-row",[a("el-col",{staticClass:"fl-right",attrs:{span:24}},[a("el-input",{staticStyle:{width:"30%"},attrs:{placeholder:"请输入手机号码",clearable:""},on:{input:t.clear,change:t.searchData},model:{value:t.firm,callback:function(e){t.firm=e},expression:"firm"}},[a("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})]),t._v(" "),a("el-button",{staticClass:"fl-left",attrs:{type:"primary"},on:{click:t.searchData}},[t._v("查询")])],1)],1)],1),t._v(" "),a("el-row",{staticClass:"public_table_list"},[a("el-col",{attrs:{span:24}},[a("el-table",{staticClass:"public_table",attrs:{data:t.tableData}},[a("el-table-column",{attrs:{label:"手机",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.phoneNo))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"姓名",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.loginName))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"登录天数",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.loginCount))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"注册时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.created))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"用户类别",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.userType))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"会员到期日",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.expiredDate))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"look_info",on:{click:function(a){return t.openMask(e.$index,e.row)}}},[t._v("查看详情")])]}}])})],1)],1)],1),t._v(" "),a("div",{staticClass:"main"},[a("jlPopup",{attrs:{showMask:!0,personList:t.personList,activeUser:t.activeUser,isAllows:t.isAllows},on:{refesh:t.handleRefesh},model:{value:t.sendVal,callback:function(e){t.sendVal=e},expression:"sendVal"}})],1),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":1,"page-sizes":[15,30,45,60],"page-size":15,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange}})],1)],1)},staticRenderFns:[]}},995:function(t,e,a){a(1040);var i=a(5)(a(1011),a(1057),"data-v-760f6797",null);t.exports=i.exports}});