webpackJsonp([8],{529:function(t,e,a){a(565);var i=a(1)(a(541),a(578),"data-v-412d4487",null);t.exports=i.exports},541:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(30),r=a.n(i),o=a(26),d=a.n(o),l=a(2),n=a(31);e.default={data:function(){var t;return t={firm:"",tableData:[],total:0,pagesize:15,pagenum:1,sendVal:"",roleInfo:null,role:"",desc:"",id:""},d()(t,"firm",""),d()(t,"edit",!1),d()(t,"labelPosition","right"),d()(t,"ruleFormEdit",{roles:""}),d()(t,"rulesEdit",{roles:[{required:!0,message:"请输入角色名称",trigger:"blur"}]}),d()(t,"powerData",[]),d()(t,"defaultProps",{children:"data",label:"title"}),d()(t,"rolePower",""),d()(t,"showId",[]),d()(t,"rid",""),d()(t,"isAllows",null),t},methods:{roleList:function(){var t=this;if(this.desc){var e=!0,i=!1,o=void 0;try{for(var d,s=r()(this.role);!(e=(d=s.next()).done);e=!0){var c=d.value;this.desc==c.desc&&(this.id=c.rid)}}catch(t){i=!0,o=t}finally{try{!e&&s.return&&s.return()}finally{if(i)throw o}}}var f={currentPage:this.pagenum,pageSize:this.pagesize,desc:this.firm,rid:this.id};a.i(l.a)(f).then(function(e){if("1"==e.code){var i=e.data,o=i.list,d=i.total;if(o.length>0){var l=!0,s=!1,c=void 0;try{for(var f,m=r()(o);!(l=(f=m.next()).done);l=!0){var p=f.value;p.created&&(p.created=a.i(n.a)(p.created).slice(0,10))}}catch(t){s=!0,c=t}finally{try{!l&&m.return&&m.return()}finally{if(s)throw c}}}t.tableData=o,t.total=d}else console.info("管理员账号接口不通")})},getRole:function(){var t=this;a.i(l.b)().then(function(e){"1"==e.code?t.role=e.data:console.info("获取角色列表接口不通")})},addRole:function(){this.sendVal=!0},changetable:function(){var t=this;this.pagenum=1,setTimeout(function(){return t.roleList()},100)},handleCurrentChange:function(t){this.pagenum=t,this.roleList()},handleSizeChange:function(t){this.pagesize=t,this.roleList()},searchData:function(){this.pagenum=1,this.roleList()},clear:function(){""==this.firm&&this.roleList()},handleRefesh:function(t){var e=this;t||(this.id="",setTimeout(function(){return e.roleList()},100))},editRole:function(t,e){var i=this;this.edit=!0,this.rid=e.rid,this.rolePower=e.desc,a.i(l.c)({rid:e.rid}).then(function(t){if("1"==t.code){for(var e=0;e<t.data.length;e++)for(var a=0;a<t.data[e].data.length;a++)null==t.data[e].data[a].optiond&&(t.data[e].data[a].currentStage="1");i.powerData=t.data;var o=!0,d=!1,l=void 0;try{for(var n,s=r()(t.data);!(o=(n=s.next()).done);o=!0){var c=n.value,f=!0,m=!1,p=void 0;try{for(var u,v=r()(c.data);!(f=(u=v.next()).done);f=!0){var g=u.value;null!==g.optiond&&i.showId.push(g.id)}}catch(t){m=!0,p=t}finally{try{!f&&v.return&&v.return()}finally{if(m)throw p}}}}catch(t){d=!0,l=t}finally{try{!o&&s.return&&s.return()}finally{if(d)throw l}}}else console.info("查询可编辑权限不通")})},closeMask:function(){this.edit=!1,this.powerData=[],this.showId=[]},operate:function(t,e){e.currentStage="2"},ready:function(t,e){e.currentStage="1"},submitForm:function(t){var e=this,i=this.$refs.tree.getCheckedKeys().filter(function(t){return t>1e4});this.$refs[t].validate(function(t){for(var o="",d=0;d<e.powerData.length;d++)for(var n=0;n<e.powerData[d].data.length;n++){var s=!0,c=!1,f=void 0;try{for(var m,p=r()(i);!(s=(m=p.next()).done);s=!0){var u=m.value;if(u==e.powerData[d].data[n].id){var v=u,g="";g="1"==e.powerData[d].data[n].currentStage?"read":"operability",""==o?o=v+"/"+g:o+=","+v+"/"+g}}}catch(t){c=!0,f=t}finally{try{!s&&p.return&&p.return()}finally{if(c)throw f}}}if(!t)return!1;var b={rid:e.rid,desc:e.rolePower,ids:o};a.i(l.d)(b).then(function(t){"1"==t.code?(e.edit=!1,e.$message({type:"success",message:"操作成功"}),e.$refs.tree.setCheckedNodes([]),e.roleList()):e.$message({type:"warning",message:t.msg})})})}},created:function(){this.roleList(),this.getRole(),this.isAllows=this.$route.query.isAllows,console.info("this.isAllows",this.$route.query.isAllows)}}},553:function(t,e,a){e=t.exports=a(523)(!1),e.push([t.i,".allcover[data-v-412d4487]{position:absolute;top:0;right:0}.ctt[data-v-412d4487]{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.tb[data-v-412d4487]{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.lr[data-v-412d4487]{position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.fl[data-v-412d4487]{float:left;overflow:hidden}.fr[data-v-412d4487]{float:right;overflow:hidden}.dfcc[data-v-412d4487],.drc[data-v-412d4487]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.dfcc[data-v-412d4487]{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.dfrcb[data-v-412d4487]{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.dfrb[data-v-412d4487],.dfrcb[data-v-412d4487]{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.dfrb[data-v-412d4487],.dfrca[data-v-412d4487],.dfrcb[data-v-412d4487]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.dfrca[data-v-412d4487]{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around}.ft14[data-v-412d4487]{font-size:.254545rem}.ft16[data-v-412d4487]{font-size:.290909rem}.ft18[data-v-412d4487]{font-size:.327273rem}.ft20[data-v-412d4487]{font-size:.363636rem}.ft22[data-v-412d4487]{font-size:.4rem}.ft24[data-v-412d4487]{font-size:.436364rem}.blod[data-v-412d4487]{font-weight:700}.mt10[data-v-412d4487]{margin-top:.181818rem}.mt20[data-v-412d4487]{margin-top:.363636rem}.mt30[data-v-412d4487]{margin-top:.545455rem}.mt40[data-v-412d4487]{margin-top:.727273rem}.mt50[data-v-412d4487]{margin-top:.909091rem}.mb10[data-v-412d4487]{margin-bottom:.181818rem}.mb20[data-v-412d4487]{margin-bottom:.363636rem}.mb30[data-v-412d4487]{margin-bottom:.545455rem}.mb40[data-v-412d4487]{margin-bottom:.727273rem}.mb50[data-v-412d4487]{margin-bottom:.909091rem}.ml10[data-v-412d4487]{margin-left:.181818rem}.ml20[data-v-412d4487]{margin-left:.363636rem}.ml30[data-v-412d4487]{margin-left:.545455rem}.ml40[data-v-412d4487]{margin-left:.727273rem}.ml50[data-v-412d4487]{margin-left:.909091rem}.mr10[data-v-412d4487]{margin-right:.181818rem}.mr20[data-v-412d4487]{margin-right:.363636rem}.mr30[data-v-412d4487]{margin-right:.545455rem}.mr40[data-v-412d4487]{margin-right:.727273rem}.mr50[data-v-412d4487]{margin-right:.909091rem}.pt10[data-v-412d4487]{padding-top:.181818rem}.pt20[data-v-412d4487]{padding-top:.363636rem}.pt30[data-v-412d4487]{padding-top:.545455rem}.pt40[data-v-412d4487]{padding-top:.727273rem}.pt50[data-v-412d4487]{padding-top:.909091rem}.pb10[data-v-412d4487]{padding-bottom:.181818rem}.pb20[data-v-412d4487]{padding-bottom:.363636rem}.pb30[data-v-412d4487]{padding-bottom:.545455rem}.pb40[data-v-412d4487]{padding-bottom:.727273rem}.pb50[data-v-412d4487]{padding-bottom:.909091rem}.pl10[data-v-412d4487]{padding-left:.181818rem}.pl20[data-v-412d4487]{padding-left:.363636rem}.pl30[data-v-412d4487]{padding-left:.545455rem}.pl40[data-v-412d4487]{padding-left:.727273rem}.pl50[data-v-412d4487]{padding-left:.909091rem}.pr10[data-v-412d4487]{padding-right:.181818rem}.pr20[data-v-412d4487]{padding-right:.363636rem}.pr30[data-v-412d4487]{padding-right:.545455rem}.pr40[data-v-412d4487]{padding-right:.727273rem}.pr50[data-v-412d4487]{padding-right:.909091rem}.text-c[data-v-412d4487]{text-align:center}.text-l[data-v-412d4487]{text-align:left}.text-r[data-v-412d4487]{text-align:right}.bg-red[data-v-412d4487]{background:#c96148}.bg-fff[data-v-412d4487]{background:#fff}.bg-fa[data-v-412d4487]{background:#fafafa}.bg-f62[data-v-412d4487]{background:#f62135}.bg-00a[data-v-412d4487]{background:#00ad59}.bg-409[data-v-412d4487]{background:#409eff}.color-red[data-v-412d4487]{color:#c96148}.color-666[data-v-412d4487]{color:#666}.color-fff[data-v-412d4487]{color:#fff}.color-333[data-v-412d4487]{color:#333}.color-999[data-v-412d4487]{color:#999}.color-b3[data-v-412d4487]{color:#b3b3b3}.color-00a[data-v-412d4487]{color:#00ad59}.color-90[data-v-412d4487]{color:#909090}.color-409[data-v-412d4487]{color:#409eff}.color-60[data-v-412d4487]{color:#606266}.public_table_list[data-v-412d4487]{padding:0 .909091rem;border-top:.018182rem solid #fff}.public_table_list .public_table[data-v-412d4487]{margin-top:.363636rem;border:.018182rem solid #ebeef5;border-bottom:none}.adminRole .adminRole_top[data-v-412d4487]{margin-bottom:.090909rem;padding:0 .545455rem}.adminRole .adminRole_top .fl-left[data-v-412d4487]{margin-left:.545455rem}.adminRole .adminRole_top .el-col-2[data-v-412d4487]{padding-right:.545455rem}.adminRole .adminRole_top .el-col-2 span[data-v-412d4487]{font-size:.290909rem;color:#409eff;cursor:pointer}.adminRole .fl-right[data-v-412d4487]{text-align:right;margin:.363636rem 0 .090909rem}.adminRole .fl-right .fl-left[data-v-412d4487]{margin-left:.363636rem}.adminRole .handle_authority[data-v-412d4487],.adminRole .handle_cancel[data-v-412d4487],.adminRole .handle_set[data-v-412d4487]{font-size:.254545rem;color:#409eff;cursor:pointer}.adminRole .block[data-v-412d4487]{padding:0 .545455rem;margin-top:.545455rem}.adminRole .dialog[data-v-412d4487]{position:fixed;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,.6);z-index:10}.adminRole .dialog .dialog-container[data-v-412d4487]{width:9.090909rem;background:#eee;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);position:relative;padding:.363636rem}.adminRole .dialog .dialog-container .popup_form .el-form-item__content[data-v-412d4487]{margin-left:0!important}.adminRole .dialog .dialog-container .popup_form .popup_title[data-v-412d4487]{color:#606266}.adminRole .dialog .dialog-container .popup_scollbar[data-v-412d4487]{background-color:#fff}.adminRole .dialog .dialog-container .popup_scollbar .el-tree[data-v-412d4487]{max-height:7.272727rem}.adminRole .dialog .dialog-container .popup_scollbar .custom-tree-node[data-v-412d4487]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;font-size:.254545rem;padding-right:.145455rem}.adminRole .dialog .dialog-container .popup_scollbar .select_power[data-v-412d4487]{display:inline-block;width:.218182rem;height:.218182rem;border-radius:.109091rem}.adminRole .dialog .popup_table[data-v-412d4487]{border:.018182rem solid #ddd}.adminRole .dialog .popup_scollbar[data-v-412d4487]{max-height:9.090909rem;overflow-x:hidden;overflow-y:scroll}.adminRole .dialog .popup_scollbar[data-v-412d4487]::-webkit-scrollbar{display:none}.adminRole .dialog .popup_btn[data-v-412d4487]{background-color:#409eff;width:100%;text-align:center;margin-right:.363636rem;cursor:pointer}.adminRole .dialog .el-form-item[data-v-412d4487]{padding-right:.363636rem}.adminRole .dialog .role_list[data-v-412d4487]{width:100%;height:100%;font-size:.254545rem;color:#606266;padding-left:.818182rem;margin-bottom:.4rem}.adminRole .dialog .hidden[data-v-412d4487]{visibility:hidden}",""])},565:function(t,e,a){var i=a(553);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a(524)("568672db",i,!0)},578:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"adminRole"},[a("el-row",{staticClass:"adminRole_top",attrs:{span:24,type:"flex",justify:"space-between",align:"middle"}},[a("el-col",{staticClass:"ft14 text-l",attrs:{span:8}},[t._v("\n      角色权限：\n      "),a("el-select",{staticClass:"ml10",staticStyle:{width:"60%"},on:{change:t.changetable},model:{value:t.desc,callback:function(e){t.desc=e},expression:"desc"}},t._l(t.role,function(t){return a("el-option",{key:t.rid,attrs:{label:t.desc,value:t.desc}})}),1)],1),t._v(" "),a("el-col",{attrs:{span:2}},[a("span",{directives:[{name:"show",rawName:"v-show",value:t.isAllows,expression:"isAllows"}],on:{click:t.addRole}},[t._v("添加角色")])])],1),t._v(" "),a("el-row",[a("el-col",{staticClass:"fl-right",attrs:{span:24}},[a("el-input",{staticStyle:{width:"30%"},attrs:{placeholder:"请输入手机号码",clearable:""},on:{input:t.clear,change:t.searchData},model:{value:t.firm,callback:function(e){t.firm=e},expression:"firm"}},[a("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})]),t._v(" "),a("el-button",{staticClass:"fl-left",attrs:{type:"primary"},on:{click:t.searchData}},[t._v("查询")])],1)],1),t._v(" "),a("el-row",{staticClass:"public_table_list"},[a("el-col",{attrs:{span:24}},[a("el-table",{staticClass:"public_table",attrs:{data:t.tableData}},[a("el-table-column",{attrs:{label:"序号",align:"center",type:"index"}}),t._v(" "),a("el-table-column",{attrs:{label:"角色名称",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.desc))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"创建时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.created))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"角色描述",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.roleName))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{directives:[{name:"show",rawName:"v-show",value:t.isAllows,expression:"isAllows"}],staticClass:"handle_authority",on:{click:function(a){return t.editRole(e.$index,e.row)}}},[t._v("编辑权限")])]}}])})],1)],1)],1),t._v(" "),a("div",{staticClass:"block pl50 mt30"},[a("el-pagination",{attrs:{"current-page":1,"page-sizes":[15,30,45,60],"page-size":15,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange}})],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.edit,expression:"edit"}],staticClass:"dialog"},[a("div",{staticClass:"dialog-container"},[a("div",{staticClass:"dfrcb ft20 mb10"},[a("div",{staticStyle:{margin:"0 auto"}},[t._v("编辑权限")]),t._v(" "),a("i",{staticClass:"el-icon-close",on:{click:t.closeMask}})]),t._v(" "),a("div",{on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submitFormEdit("ruleFormEdit")}}},[a("el-form",{ref:"ruleFormEdit",attrs:{"label-position":t.labelPosition,"label-width":"100px",model:t.ruleFormEdit,rules:t.rulesEdit}},[a("el-row",{attrs:{type:"flex"}},[a("el-col",{staticClass:"ft14 color-60 ml20"},[t._v("\n              角色名称：\n              "),a("el-select",{staticClass:"ml10",staticStyle:{width:"60%"},on:{change:t.changetable},model:{value:t.rolePower,callback:function(e){t.rolePower=e},expression:"rolePower"}},t._l(t.role,function(t){return a("el-option",{key:t.rid,attrs:{label:t.desc,value:t.desc}})}),1)],1)],1),t._v(" "),a("el-form-item",{staticClass:"popup_form"},[a("div",{staticClass:"pl20"},[a("div",{staticClass:"popup_title"},[t._v("权限:")]),t._v(" "),a("div",{staticClass:"bg-fff popup_scollbar"},[a("el-tree",{ref:"tree",attrs:{data:t.powerData,"show-checkbox":"",props:t.defaultProps,"default-expand-all":"","node-key":"id","default-checked-keys":t.showId},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.node,r=e.data;return a("span",{staticClass:"custom-tree-node"},[a("span",{staticClass:"ml10"},[t._v(t._s(i.label))]),t._v(" "),a("span",[a("span",{class:r.id>1e4?"":"hidden"},[a("input",{staticClass:"select_power",attrs:{type:"radio",name:r.id},domProps:{checked:"read"==r.optiond||"1"==r.currentStage},on:{click:function(){return t.ready(i,r)}}}),a("span",[t._v("只读")])]),t._v(" "),a("span",{class:r.id>1e4?"":"hidden"},[a("input",{staticClass:"select_power ml10",attrs:{type:"radio",name:r.id},domProps:{checked:"operability"==r.optiond||"2"==r.currentStage},on:{click:function(){return t.operate(i,r)}}}),a("span",[t._v("可操作")])])])])}}])})],1)])]),t._v(" "),a("el-form-item",{staticClass:"popup_form_btn pl20"},[a("div",{staticClass:"popup_btn color-fff",on:{click:function(e){return t.submitForm("ruleFormEdit")}}},[t._v("保存")])])],1)],1)])]),t._v(" "),a("powerPopup",{attrs:{showMask:!0,isAllows:t.isAllows},on:{refesh:t.handleRefesh},model:{value:t.sendVal,callback:function(e){t.sendVal=e},expression:"sendVal"}})],1)},staticRenderFns:[]}}});