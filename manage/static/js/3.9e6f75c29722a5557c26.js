webpackJsonp([3],{463:function(e,t,i){i(486);var n=i(1)(i(472),i(494),null,null);e.exports=n.exports},472:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(67),o=(i.n(n),i(65)),a=(i.n(o),i(66)),l=(i.n(a),i(64)),s=(i.n(l),i(38)),r=i.n(s),c=i(3);t.default={data:function(){return{isActivated:!0,iActivated:!1,formInline:{user:"",city:""},value1:"",labelPosition:"left",formLabelAlign:{name:"",region:""},options:[],optionss:[],province:"",citys:"",loading:!1,headers:{Authorization:localStorage.getItem("Authorization")},content:"",editorOption:{placeholder:"请输入内容",modules:{toolbar:[["bold","italic","underline","strike"],["blockquote","code-block"],[{header:1},{header:2}],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["clean"],["link","image","video"]]}},addRange:[],uploadData:{file:""},photoUrl:"",uploadType:""}},created:function(){this.getprovince(),this.$refs={myQuillEditor:HTMLInputElement,imgInput:HTMLInputElement}},mounted:function(){this.$on("handleChange",function(){this.test()}),this.$on("editormsg",function(e){this.editor(e)}),console.log(this.$refs.myQuillEditor.quill),this.$refs.myQuillEditor.quill.getModule("toolbar").addHandler("image",this.imgHandler),this.$refs.myQuillEditor.quill.getModule("toolbar").addHandler("video",this.videoHandler)},methods:{deletPath:function(){this.$refs.htmlContainer.innerHTML=null},preview:function(){var e=this;if(console.log(this.$refs.htmlContainer.innerHTML,199),!this.content||""===this.content)return void this.$message.warning("内容为空，无预览效果！");console.log(this.content.replace(/(?=[^>]*(?=<))\s/g,"&nbsp;")),setTimeout(function(){console.log(e.$refs.htmlContainer),e.$refs.htmlContainer.innerHTML=e.content.replace(/(?=[^>]*(?=<))\s/g,"&nbsp;")},100)},suptext:function(){var e=this;if(!(this.formInline.city&&this.formLabelAlign.name&&this.formLabelAlign.region&&this.content&&this.citys))return this.$message({type:"warning",message:"所有项都是必填项！"});this.isActivated?i.i(c.d)({source:this.citys,proviceCode:this.citys,cityCode:this.formInline.city,title:this.formLabelAlign.name,ntCategory:"1",pubDate:this.value1,url:this.formLabelAlign.region,content:this.content}).then(function(t){1==t.code&&e.$message({type:"success",message:"保存招标公告成功"})}):i.i(c.d)({source:this.citys,proviceCode:this.citys,cityCode:this.formInline.city,title:this.formLabelAlign.name,ntCategory:"2",pubDate:this.value1,url:this.formLabelAlign.region,content:this.content}).then(function(t){1==t.code&&e.$message({type:"success",message:"保存中标公告成功"})})},chancetain:function(){this.isActivated=!0,this.iActivated=!1},chanceno:function(){this.isActivated=!1,this.iActivated=!0},getprovince:function(){var e=this;i.i(c.b)({areaParentId:"0"}).then(function(t){1==t.code&&(t.data.forEach(function(e){e.areaCode=e.pkid+e.areaCode}),e.options=t.data)})},getCity:function(e){var t=this;this.formInline.city="",this.province=e.slice(0,32),this.citys=e.slice(32),i.i(c.b)({areaParentId:this.province}).then(function(e){console.log(e,214),t.optionss=e.data})},save:function(){new RegExp("(?=[^>]*(?=<))s","g");console.log(this.content.replace(/(?=[^>]*(?=<))\s/g,"&nbsp;")),this.$refs.htmlContainer.innerHTML=this.$refs.myQuillEditor.getContent()},beforeUpload:function(e){return this.uploadData.file=e.type,this.qnUpload(e)},qnUpload:function(e){this.loading=!0},upScuccess:function(e,t,i){this.loading=!1;var n=this,o="";if("image"===this.uploadType?(o=e.data,console.log(e),console.log(o)):"video"===this.uploadType&&(o=n.url+e.message),null!=o&&o.length>0){var a=o;n.addRange=n.$refs.myQuillEditor.quill.getSelection(),a=-1!==a.indexOf("http")?a:"http:"+a,n.$refs.myQuillEditor.quill.insertEmbed(null!==n.addRange?n.addRange.index:0,n.uploadType,a,r.a.sources.USER)}else this.$message.error(n.uploadType+"插入失败");this.$refs.upload.clearFiles()},imgHandler:function(e){if(this.addRange=this.$refs.myQuillEditor.quill.getSelection(),e){document.getElementById("imgInput").click()}this.uploadType="image"},onEditorChange:function(e){var t=(e.editor,e.html);e.text;this.$emit("transferuser",t)},videoHandler:function(e){if(this.addRange=this.$refs.myQuillEditor.quill.getSelection(),e){document.getElementById("imgInput").click()}this.uploadType="video"},test:function(){console.log("test触发了")},editor:function(e){this.content=e},handleAvatarFail:function(e,t){console.log(123),console.log(e)}},components:{quillEditor:n.quillEditor}}},478:function(e,t,i){t=e.exports=i(457)(!1),t.push([e.i,".maintain{box-shadow:-2px 0 8px #ccc,0 -2px 8px #ccc,0 2px 8px #ccc,2px 0 8px #ccc}.maintain .main-text{height:60px;background-color:#eee;border-bottom:1px dashed #000}.maintain .main-text li{color:#6c6c6c;margin-left:20px;float:left;line-height:60px;font-size:18px;width:60px;text-align:center;font-weight:700;font-family:Franklin Gothic Medium,Arial Narrow,Arial,sans-serif}.maintain .main-text .activated,.maintain .main-text li:hover{color:#000}.maintain .main-select{padding-top:20px;background-color:#eee}.maintain .main-contain{background-color:#eee}.maintain .quillEditor{background-color:#fff}.maintain .quillEditor .ql-editor{min-height:300px}.maintain .main-btu{margin-top:5px;margin-left:80%}",""])},486:function(e,t,i){var n=i(478);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);i(458)("c09e5242",n,!0)},494:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"maintain"},[i("ul",{staticClass:"main-text"},[i("li",{class:{activated:e.isActivated},on:{click:e.chancetain}},[e._v("招标")]),e._v(" "),i("li",{class:{activated:e.iActivated},on:{click:e.chanceno}},[e._v("中标")])]),e._v(" "),i("div",{staticClass:"main-select"},[i("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[i("el-form-item",{attrs:{label:"项目地区:"}},[i("el-select",{attrs:{placeholder:"请选择省份"},on:{change:e.getCity},model:{value:e.formInline.user,callback:function(t){e.$set(e.formInline,"user",t)},expression:"formInline.user"}},e._l(e.options,function(e){return i("el-option",{key:e.index,attrs:{label:e.areaShortName,value:e.areaCode}})}))],1),e._v(" "),i("el-form-item",[i("el-select",{attrs:{placeholder:"请选择县市"},model:{value:e.formInline.city,callback:function(t){e.$set(e.formInline,"city",t)},expression:"formInline.city"}},e._l(e.optionss,function(e){return i("el-option",{key:e.pkid,attrs:{label:e.areaName,value:e.areaCode}})}))],1),e._v(" "),i("el-form-item",{attrs:{label:"发布时间:"}},[i("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd",placeholder:"选择日期"},model:{value:e.value1,callback:function(t){e.value1=t},expression:"value1"}})],1)],1),e._v(" "),i("el-form",{attrs:{"label-position":e.labelPosition,"label-width":"70px",model:e.formLabelAlign,"style.background-color":"#eee"}},[i("el-form-item",{attrs:{label:"公告名称"}},[i("el-input",{model:{value:e.formLabelAlign.name,callback:function(t){e.$set(e.formLabelAlign,"name",t)},expression:"formLabelAlign.name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"原文链接"}},[i("el-input",{model:{value:e.formLabelAlign.region,callback:function(t){e.$set(e.formLabelAlign,"region",t)},expression:"formLabelAlign.region"}})],1)],1),e._v(" "),i("div",{staticClass:"main-contain"},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"quillEditor"},[i("quillEditor",{ref:"myQuillEditor",staticClass:"main-quill",attrs:{options:e.editorOption},on:{change:function(t){e.onEditorChange(t)}},model:{value:e.content,callback:function(t){e.content=t},expression:"content"}}),e._v(" "),i("el-upload",{ref:"upload",staticClass:"upload-demo",staticStyle:{display:"none"},attrs:{action:"http://pre-admin.biaodaa.com/upload/uploadImage","before-upload":e.beforeUpload,data:e.uploadData,"on-success":e.upScuccess,"on-error":e.handleAvatarFail,headers:e.headers}},[i("el-button",{attrs:{size:"small",type:"primary",id:"imgInput","element-loading-text":"插入中,请稍候"}},[e._v("\n                     点击上传")])],1)],1),e._v(" "),i("div",{staticClass:"main-btu"},[i("el-button",{attrs:{type:"success"}},[i("span",{on:{click:e.preview}},[e._v("预览")]),e._v(" "),i("span",{on:{click:e.deletPath}},[i("i",{staticClass:"el-icon-circle-close-outline",staticStyle:{color:"#ffffff"}})])]),e._v(" "),i("el-button",{attrs:{type:"success"},on:{click:e.suptext}},[e._v("保存公告")])],1),e._v(" "),i("div",{ref:"htmlContainer",staticClass:"box ql-editor"})])],1)])},staticRenderFns:[]}}});