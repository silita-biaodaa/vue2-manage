webpackJsonp([0],{442:function(e,t,i){i(455);var o=i(2)(i(447),i(459),null,null);e.exports=o.exports},447:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i(37),r=i.n(o),n=(i(3),i(7));t.default={data:function(){return{parentId:"",cpkid:"",careaName:"",pkid:"",code:"",title:"",pubDate:"",form:{projName:"",block:"",pubDate:"",projDq:"",projXs:"",pbMode:""},state:"",types:[],activeIndex:"1",condition:"",relaSelect:[],urlupload:"",reli:[],ajson:{},list:[],releGp:"",urltitle:"",engine:{},errpkid:[],position:"",isShow:!0,mainCo:[],rela:"",uu:[],record:[],userSearchLoading:!1}},mounted:function(){},created:function(){this.gainDate(),this.listfixe(),this.listarr(),this.listFile()},watch:{$route:function(e,t){"wrong"===e.name&&(this.gainDate(),this.listfixe())}},methods:{gainDate:function(){this.code=this.$route.params.code,this.pkid=this.$route.params.id},textt:function(){},listarr:function(){var e=this;this.engine=JSON.parse(localStorage.getItem("errTen")),this.position=localStorage.getItem("erinder"),i.i(n.a)({source:this.code,openDate:this.engine.openDate,openDateEnd:this.engine.openDateEnd,title:this.engine.title,type:this.engine.type,currentPage:"1",pageSize:"15"}).then(function(t){t.data.datas.forEach(function(t){e.errpkid.push(t.id)}),console.log(e.errpkid,182),1==t.data.datas.length&&(e.isShow=!1)})},listAlia:function(){},userSearch:function(e){var t=this;console.log(e,196),""!==e&&(this.userSearchLoading=!0,i.i(n.b)({queryKey:e}).then(function(e){t.types=e.data,t.userSearchLoading=!1}).catch(function(e){t.userSearchLoading=!1}))},listregion:function(){},listMode:function(){},listfixe:function(){var e=this;i.i(n.c)({source:this.code,snatchUrlId:this.pkid}).then(function(t){console.log(t,302),1==t.code&&(e.form=t.data[0])})},listFile:function(){var e=this;i.i(n.b)({queryKey:""}).then(function(t){console.log(t,210),1==t.code&&(e.types=t.data)})},deletemark:function(){var e=this;this.$confirm("此操作将永久删除该公告, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.delpkid()}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},delpkid:function(){var e=this;i.i(n.d)({source:this.code,id:this.pkid}).then(function(t){if(1==t.code){if(e.errpkid.splice(e.position,1),1==e.errpkid.length&&(e.isShow=!1),0==e.errpkid.length)return e.$router.push({path:"/errhome"});e.$router.push({name:"wrong",params:{id:e.errpkid[e.position],code:e.code}}),parseInt(e.position)>e.errpkid.length&&(e.position=parseInt(e.position)-1)}})},lastlist:function(){if(0==parseInt(this.position))return this.$message({type:"warning",message:"已经是第一条公告，无法跳转~"});this.position=parseInt(this.position)-1,this.form={},this.$router.push({name:"wrong",params:{id:this.errpkid[this.position],code:this.code}})},nextlist:function(){if(parseInt(this.position)==this.errpkid.length-1)return this.$message({type:"warning",message:"已经是最后一条公告，无法跳转~"});this.position=parseInt(this.position)+1,this.form={},this.$router.push({name:"wrong",params:{id:this.errpkid[this.position],code:this.code}})},onSubmit:function(){this.form.source=this.code,i.i(n.e)(this.form).then(function(e){console.log(e,280)})},amendlist:function(){},emptyForm:function(e){},texttop:function(){var e=setInterval(function(){document.querySelector(".el-main").scrollTop?(document.querySelector(".el-main").scrollTop-=100,document.querySelector(".el-main").scrollTop-=100):clearInterval(e)})}},components:{Edit:r.a}}},451:function(e,t,i){t=e.exports=i(437)(!1),t.push([e.i,".compile{position:relative;overflow:hidden}.compile .urlma{margin-bottom:15px}.compile .menu-c{box-sizing:border-box;padding:0 10px;color:#303133;background-color:#ebeef5;line-height:60px;font-size:16px}.compile .menu-c .left-c{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.compile .menu-c .left-c .message-c span{margin-right:10px}.compile .menu-c .left-c .message-c a{color:#303133}.compile .menu-c .left-c .handle-c{cursor:pointer}.compile .menu-c .left-c .handle-c span{margin-right:10px}.compile .redact-c{padding:10px 20px}.compile .redact-c .btn{text-align:center}.compile .redact-c .labe{position:absolute;top:0;left:-200px;width:200px;text-align:center;font-size:12px;padding-right:12px;box-sizing:border-box}.compile .redact-c .labe .el-icon-warning{color:red;margin-right:5px}.compile .redact-c .rela .el-form-item{margin-top:8px;margin-bottom:0}.compile .redact-c .rela .el-rela .labe-rela{position:absolute;top:0;left:0;width:100px;text-align:center;font-size:12px;box-sizing:border-box}.compile .redact-c .rela .el-rela .el-select{margin-left:100px;width:40%}.compile .redact-c .old{color:#606266}.compile .redact-c .new{color:red}.compile .redact-c .el-form-item{margin-bottom:8px}.compile .redact-c .el-form-item__content{line-height:30px}.compile .redact-c .el-form-item__label{text-align:center;font-size:12px;line-height:30px;height:30px}.compile .redact-c .el-input__inner{width:80%;height:30px;line-height:30px}.compile .redact-c .el-select .el-input__inner{width:100%}.compile .redact-c .el-input__prefix,.compile .redact-c .el-input__suffix{top:2px}.compile .redact-c .el-date-editor.el-input,.compile .redact-c .el-date-editor.el-input__inner{width:100%}.compile .redact-c .block .el-input__prefix{top:-4px}.compile .main-t .edit-c{position:relative}.compile .main-t .edit-c .edit-l,.compile .main-t .edit-c .edit-r{z-index:99;color:#fff;position:absolute;height:45px;width:45px;border-radius:50%;background-color:#909399;opacity:.2;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);text-align:center;line-height:45px;font-size:30px;font-weight:1000}.compile .main-t .edit-c .edit-l:hover,.compile .main-t .edit-c .edit-r:hover{opacity:1}.compile .main-t .edit-c .edit-r{right:0}.compile .main-t .edit-c .ql-editor{height:815px}.compile .main-t .right-c{overflow:hidden}",""])},455:function(e,t,i){var o=i(451);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);i(438)("8c0ec2ec",o,!0)},459:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{ref:"refs",staticClass:"compile"},[i("el-row",{staticClass:"menu-c"},[i("el-col",{attrs:{span:24}},[i("el-row",[i("el-col",{staticClass:"left-c",attrs:{span:12}},[i("div",{staticClass:"message-c"},[i("a",{attrs:{href:this.state,target:"_blank"}},[e._v("来源站点")])]),e._v(" "),i("div",{staticClass:"handle-c"},[i("span",{on:{click:e.deletemark}},[e._v("删除")]),e._v(" "),i("span",{on:{click:e.textt}},[e._v("测试")])])]),e._v(" "),i("el-col",{staticClass:"right-c",attrs:{span:12}},[i("el-menu",{staticClass:"el-menu-demo",attrs:{"default-active":e.activeIndex,mode:"horizontal","background-color":"#EBEEF5","menu-trigger":"click"}},[i("el-menu-item",{attrs:{index:"1"}},[e._v("编辑")])],1)],1)],1)],1)],1),e._v(" "),i("el-row",{staticClass:"main-t"},[i("el-col",{staticClass:"edit-c",attrs:{span:12}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.isShow,expression:"isShow"}],staticClass:"edit-l",on:{click:e.lastlist}},[i("i",{staticClass:"el-icon-arrow-left"})]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.isShow,expression:"isShow"}],staticClass:"edit-r",on:{click:e.nextlist}},[i("i",{staticClass:"el-icon-arrow-right"})]),e._v(" "),i("Edit")],1),e._v(" "),i("el-col",{staticClass:"redact-c",attrs:{span:12}},[i("el-form",{ref:"edits",staticClass:"demo-ruleForm",attrs:{model:e.form,"label-width":"200px"}},[i("el-form-item",{attrs:{label:"项目名称"}},[i("el-input",{model:{value:e.form.projName,callback:function(t){e.$set(e.form,"projName",t)},expression:"form.projName"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"标段信息"}},[i("el-input",{model:{value:e.form.block,callback:function(t){e.$set(e.form,"block",t)},expression:"form.block"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"公示日期"}},[i("el-input",{model:{value:e.form.gsDate,callback:function(t){e.$set(e.form,"gsDate",t)},expression:"form.gsDate"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"项目地区"}},[i("el-input",{model:{value:e.form.projDq,callback:function(t){e.$set(e.form,"projDq",t)},expression:"form.projDq"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"项目县区"}},[i("el-input",{model:{value:e.form.projXs,callback:function(t){e.$set(e.form,"projXs",t)},expression:"form.projXs"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"第一中标候选人"}},[i("el-select",{staticStyle:{width:"80%"},attrs:{filterable:"",placeholder:"请输入企业名称",remote:"","remote-method":e.userSearch,loading:e.userSearchLoading},model:{value:e.form.oneName,callback:function(t){e.$set(e.form,"oneName",t)},expression:"form.oneName"}},e._l(e.types,function(e,t){return i("el-option",{key:t,attrs:{label:e.companyName,value:e.creditCode}})}))],1),e._v(" "),i("el-form-item",{attrs:{label:"第一联合人之一"}},[i("el-select",{staticStyle:{width:"80%"},attrs:{filterable:"",placeholder:"请输入企业名称",remote:"","remote-method":e.userSearch,loading:e.userSearchLoading},model:{value:e.form.oneName2,callback:function(t){e.$set(e.form,"oneName2",t)},expression:"form.oneName2"}},e._l(e.types,function(e){return i("el-option",{key:e.companyName,attrs:{label:e.companyName,value:e.companyName}})}))],1),e._v(" "),i("el-form-item",{attrs:{label:"第一联合人之二"}},[i("el-select",{staticStyle:{width:"80%"},attrs:{filterable:"",placeholder:"请输入企业名称",remote:"","remote-method":e.userSearch,loading:e.userSearchLoading},model:{value:e.form.oneName3,callback:function(t){e.$set(e.form,"oneName3",t)},expression:"form.oneName3"}},e._l(e.types,function(e){return i("el-option",{key:e.companyName,attrs:{label:e.companyName,value:e.companyName}})}))],1),e._v(" "),i("el-form-item",{attrs:{label:"中标金额（万元）"}},[i("el-input",{model:{value:e.form.oneOffer,callback:function(t){e.$set(e.form,"oneOffer",t)},expression:"form.oneOffer"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"项目负责人"}},[i("el-input",{model:{value:e.form.oneProjDuty,callback:function(t){e.$set(e.form,"oneProjDuty",t)},expression:"form.oneProjDuty"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"技术负责人"}},[i("el-input",{model:{value:e.form.oneSkillDuty,callback:function(t){e.$set(e.form,"oneSkillDuty",t)},expression:"form.oneSkillDuty"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"施工员"}},[i("el-input",{model:{value:e.form.oneSgy,callback:function(t){e.$set(e.form,"oneSgy",t)},expression:"form.oneSgy"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"安全员"}},[i("el-input",{model:{value:e.form.oneAqy,callback:function(t){e.$set(e.form,"oneAqy",t)},expression:"form.oneAqy"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"质量员"}},[i("el-input",{model:{value:e.form.oneZly,callback:function(t){e.$set(e.form,"oneZly",t)},expression:"form.oneZly"}})],1),e._v(" "),i("el-form-item",{staticClass:"btn"},[i("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("保存")])],1)],1)],1)],1)],1)},staticRenderFns:[]}}});