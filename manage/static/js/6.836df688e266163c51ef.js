webpackJsonp([6],{1009:function(t,e,a){a(1060);var n=a(5)(a(1025),a(1077),null,null);t.exports=n.exports},1025:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(11);e.default={data:function(){return{pagenum:1,pagesize:15,tableData:[],total:0,urlFormVisible:!1,opTitle:""}},methods:{gainData:function(){var t=this;a.i(n.R)({currentPage:this.pagenum,pageSize:this.pagesize}).then(function(e){1==e.code&&(t.total=e.data.total,t.tableData=e.data.list)})},handleCurrentChange:function(t){this.pagenum=t,this.gainData()},handleSizeChange:function(t){this.pagesize=t,this.pagenum=1,this.gainData()},handleEdit:function(t,e){this.urlFormVisible=!0,this.opTitle=e.content}},created:function(){this.gainData()},components:{}}},1044:function(t,e,a){e=t.exports=a(996)(!1),e.push([t.i,".opinion .op-til{margin-left:.363636rem;margin-bottom:.363636rem;color:#000;font-size:.454545rem;font-weight:700}.el-tooltip__popper,.opinion .op-cen .el-tooltip__popper{width:50%}",""])},1060:function(t,e,a){var n=a(1044);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(997)("52811104",n,!0)},1077:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"opinion"},[a("el-row",[a("el-col",{attrs:{span:24}},[a("div",{staticClass:"op-til"},[t._v("意见反馈")])])],1),t._v(" "),a("el-row",[a("el-col",{staticClass:"op-cen",attrs:{span:24}},[a("el-table",{staticClass:"baa_ai",staticStyle:{width:"100%"},attrs:{data:t.tableData}},[a("el-table-column",{attrs:{label:"意见类别",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.type))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"反馈内容","header-align":"center","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.content))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"发布时间",width:"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.created))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"用户名称/昵称",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.userName))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"手机号码",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.phone))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return t.handleEdit(e.$index,e.row)}}},[t._v("查看")])]}}])})],1)],1)],1),t._v(" "),a("el-row",{staticClass:"baa_ai_n"},[a("el-col",{attrs:{span:24}},[a("div",[a("el-pagination",{attrs:{"current-page":1,"page-sizes":[15,30,45,60],"page-size":15,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange,"size-change":t.handleSizeChange}})],1)])],1),t._v(" "),a("el-dialog",{attrs:{title:"意见反馈内容",visible:t.urlFormVisible},on:{"update:visible":function(e){t.urlFormVisible=e}}},[a("div",[t._v(t._s(t.opTitle))]),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.urlFormVisible=!1}}},[t._v("关 闭")])],1)])],1)},staticRenderFns:[]}}});