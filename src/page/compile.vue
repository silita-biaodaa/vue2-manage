<template>
    <div class="compile">
      <el-row class="menu-c">
        <el-col :span="24">
           <el-row>
              <el-col :span="12" class="left-c">
                 <div class="message-c">
                    <span :style= "{color:(this.condition === '未处理' ? 'red' : 'white')}">{{this.condition}}</span>
                    <a :href="this.state" target="_blank">来源站点</a>
                 </div>
                 <div class="handle-c">
                    <span @click='handlemark'>设置</span>
                    <span @click='deletemark'>删除</span>
                 </div>
              </el-col>

              <el-col :span="12" class="right-c">                  
                  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color='#000' text-color='#fff' active-text-color='yellow' @select="handleSelect">
                    <el-menu-item index="1">处理中心</el-menu-item> 
                    <el-menu-item index="2">订单管理</el-menu-item> 
                  </el-menu>
              </el-col>
           </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="edit-c">
            <Edit></Edit>
        </el-col>
        <el-col :span="12" class="redact-c">
            
          <el-form ref="edit" :model="form" label-width="200px" >
            <el-form-item label="招标编辑编号">
              <el-input v-model="form.number"></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="标段信息">
              <el-input v-model="form.section"></el-input>
            </el-form-item>
            <el-form-item label="公示日期">
              <el-input v-model="form.public"></el-input>
            </el-form-item>                  
            <el-form-item label="招标控制价(万元)">
              <el-input v-model="form.control"></el-input>
            </el-form-item>
            <el-form-item label="项目金额(万元)">
              <el-input v-model="form.project"></el-input>
            </el-form-item>
            <el-form-item label="项目工期">
              <el-input v-model="form.passage"></el-input>
            </el-form-item>
            <el-form-item label="项目地区">             
              <el-select v-model="form.area" filterable placeholder="请选择项目地区" style="width:80%">
                <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目县区">
              <el-select v-model="form.countie" filterable placeholder="请选择项目县区" style="width:80%">
                <el-option v-for="item in counties" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="评标办法">
              <el-select v-model="form.way" filterable placeholder="请选择评标办法" style="width:80%">
                <el-option v-for="item in ways" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目保证金(万元)">
              <el-input v-model="form.cash"></el-input>
            </el-form-item>            
            <el-form-item label="保证金截至时间">   
              <div class="block">
                <el-date-picker v-model="form.limit" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="报名截止时间">
              <div class="block">
                <el-date-picker v-model="form.limittime" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="报名地点">
              <el-input v-model="form.where"></el-input>
            </el-form-item>
            <el-form-item label="资格审查截止时间">
              <div class="block">
                <el-date-picker v-model="form.check" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="资格审查地点">
              <el-input v-model="form.checkplace"></el-input>
            </el-form-item>
            <el-form-item label="投标截止时间">
              <div class="block">
                <el-date-picker v-model="form.abort" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="开标人员">
              <el-select v-model="form.exploit" filterable placeholder="请选择开标人员" style="width:80%">
                <el-option v-for="item in exploits" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开标地点">
              <el-input v-model="form.place"></el-input>
            </el-form-item>
            <el-form-item label="项目类型">
              <el-select v-model="form.type1" filterable placeholder="请选择项目类型" style="width:80%">
                <el-option v-for="item in type1s" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="招标类型">
              <el-select v-model="form.type" filterable placeholder="请选择招标类型" style="width:80%">
                <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="平台备案要求">
               <el-select v-model="form.record" filterable placeholder="请选择备案要求" style="width:80%">
                <el-option v-for="item in records" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="招标状态">
              <el-select v-model="form.statu" filterable placeholder="请选择招标状态" style="width:80%">
                <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>                        

            <div class="btn">
              <el-button @click="emptyForm('edit')">清空</el-button>
              <el-button type="primary" @click="onSubmit('edit')">保存</el-button>
            </div>  
          </el-form>

        </el-col>

      </el-row>

        <!-- tabs标签页 -->
      <el-row>
        <el-col :span="24">
            <!-- 编辑明细 -->
          <el-tabs v-model="activeName2" @tab-click="handleClick" >

              <el-tab-pane label="编辑明细" name="first" >                
  
                    <el-table style="width: 100%" height="300" @selection-change="handleSelectionChange" ref="multipleTable" :data="compileData">
                      <el-table-column type="selection" width="55">
                      </el-table-column>
                      <el-table-column prop="date" label="项目名称" width="300">
                      </el-table-column>
                      <el-table-column prop="name" label="标段信息" width="100">
                      </el-table-column>
                      <el-table-column prop="province" label="发布日期" width="150">
                      </el-table-column>
                      <el-table-column prop="city" label="招标控制价" width="120">
                      </el-table-column>
                      <el-table-column prop="address" label="项目金额" width="120" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="zip" label="项目工期" width="120" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="address" label="项目地区" width="120" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="address" label="项目县市" width="120" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="address" label="评标办法" width="150" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="address" label="项目保证金(万元)" width="150" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="address" label="保证金截至时间" width="120" show-overflow-tooltip> 
                      </el-table-column>
                      <el-table-column prop="address" label="报名地点" width="120" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="address" label="资格审查截止时间" width="150" show-overflow-tooltip>
                      </el-table-column> 
                      <el-table-column prop="address" label="资格审查地点" width="150" show-overflow-tooltip>
                      </el-table-column> 
                      <el-table-column prop="address" label="投标截止时间" width="150" show-overflow-tooltip>
                      </el-table-column> 
                      <el-table-column prop="address" label="开标人员" width="120" show-overflow-tooltip>
                      </el-table-column> 
                      <el-table-column prop="address" label="开标地点" width="120" show-overflow-tooltip>
                      </el-table-column> 
                      <el-table-column prop="address" label="项目类型" width="120" show-overflow-tooltip>
                      </el-table-column> 
                      <el-table-column prop="address" label="招标类型" width="120" show-overflow-tooltip>
                      </el-table-column> 
                      <el-table-column prop="address" label="平台备案要求" width="120" show-overflow-tooltip>
                      </el-table-column> 
                      <el-table-column prop="address" label="招标状态" width="120" show-overflow-tooltip>
                      </el-table-column>     
                    </el-table>

                     <div style="margin-top: 20px">
                       <el-button type="primary" >添加编辑明细</el-button>
                       <el-button type="primary" >删除编辑明细</el-button>
                     </div>
                    
                    
            </el-tab-pane>
             <el-tab-pane label="招标文件" name="second">
               
                  <el-table ref="multipleFile" :data="file" tooltip-effect="dark" style="width: 100%" @selection-change="handleFileChange" height="300">
                    <el-table-column type="selection" style="width:5%">
                    </el-table-column>
                    <el-table-column label="招标文件" width="650" >
                      <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column prop="name" label="上传日期" >
                    </el-table-column>
                    <el-table-column prop="address" label="状态" show-overflow-tooltip >
                    </el-table-column>
                  </el-table>

                  <div style="margin-top: 20px">
                       <el-upload class="updown-list" action="http://120.79.116.245:19004/upload/quaAlias/" :on-preview="handlePreview"  :on-success="handleSuccess" :headers="setHeader()" :before-remove="beforeRemove" :show-file-list='false' multiple :on-exceed="handleExceed" :file-list="fileList">
                         <el-button type="primary">
                           上传招标文件
                         </el-button>
                       </el-upload>
                       <el-button type="primary" >上传文件下载路径</el-button>
                       <el-button type="primary" >删除招标文件</el-button>

                  </div>

             </el-tab-pane>
            <el-tab-pane label="相关公告" name="third">相关公告</el-tab-pane>
          </el-tabs>

        </el-col>
      </el-row>

      <!-- 修改得招标信息 -->
      <el-dialog title="设置" :visible.sync="redactFormVisible" width="40%">            
          
          <el-form :model="handleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">          
            <el-form-item label="公告状态" prop="resource">
              <el-radio-group v-model="handleForm.resource">
                <el-radio label="未处理"></el-radio>
                <el-radio label="已处理"></el-radio>
              </el-radio-group>
            </el-form-item>

            
            <el-form-item label="公告类型" prop="type">
              <el-radio-group v-model="handleForm.type">
                <el-radio label="招标公告"></el-radio>
                <el-radio label="中标公告"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item>              
              <el-button @click="resetForm('ruleForm')">取消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            </el-form-item>
          </el-form>
       
      </el-dialog>

    </div>
</template>

<script>
 import  Edit  from "@/page/edit";
export default {
  data () {
    return {
       form: {   //编辑变更数据
        number: '',
        name:'',
        section:'',
        public:'',
        control:'',
        project:'',
        passage:'',
        area:'',
        countie:'',
        way:'',
        cash:'',
        limit:'',
        limittime:'',
        where:'',
        check:'',
        abort:'',  // 投标截止时间
        exploit:'', //开发人员
        place:'', //开标地点
        type1:'', //项目类型
        type:'', // 招标类型
        recored:'', //备案要求
        statu:'',// 招标状态
        checkplace:'' //资格审查地点 
      },
      activeName2:'first',
       areas: [{  // 项目地区
         value: '选项1',
         label: '长沙'
       }, {
         value: '选项2',
         label: '株洲'
       }, {
         value: '选项3',
         label: '湘潭'
       }, {
         value: '选项4',
         label: '衡阳'
       }, {
         value: '选项5',
         label: '常德'
       }],
       counties: [{  // 项目县区
         value: '选项1',
         label: '我旁边是个傻子'
       }, {
         value: '选项2',
         label: '曾丹是个傻子'
       }, {
         value: '选项3',
         label: '大傻子'
       }, {
         value: '选项4',
         label: '小傻子'
       }, {
         value: '选项5',
         label: '曾丹'
       }],
       exploits:[], // 开发人员
       ways:[],  // 评标办法
       type1s:[], //项目类型
       types:[],  //招标类型
       records:[],  //备案要求
       status:[], //开标状态
      activeIndex:'1',
      condition:'未处理',
      state:'http://www.baidu.com',
      redactFormVisible : false,
      handleForm:{
        resource:'',
        type:''
      },
       rules: {
         resource: [
           { required: true, message: '请选择公告状态', trigger: 'change' }
         ],
         type:[
           { required: true, message: '请选择公告类型', trigger: 'change' }
         ]
       },
       // 编辑明细数据
       compileData:[    
         {
           date: '2016-05-03',
           name: '王小虎',
           address: '上海市普陀区金沙江路 1518 弄'
         }, {
           date: '2016-05-02',
           name: '王小虎',
           address: '上海市普陀区金沙江路 1518 弄'
         }, {
           date: '2016-05-04',
           name: '王小虎',
           address: '上海市普陀区金沙江路 1518 弄'
         }, {
           date: '2016-05-01',
           name: '王小虎',
           address: '上海市普陀区金沙江路 1518 弄'
         }, {
           date: '2016-05-08',
           name: '王小虎',
           address: '上海市普陀区金沙江路 1518 弄'
         }, {
           date: '2016-05-06',
           name: '王小虎',
           address: '上海市普陀区金沙江路 1518 弄'
         }, {
           date: '2016-05-07',
           name: '王小虎',
           address: '上海市普陀区金沙江路 1518 弄'
         }
       ],
       multipleSelection: [],
       //招标文件的数据
       file:[{
         date: '2016-05-03',
         name: '王小虎',
         address: '上海市普陀区金沙江路 1518 弄'
       }, {
         date: '2016-05-02',
         name: '王小虎',
         address: '上海市普陀区金沙江路 1518 弄'
       }, {
         date: '2016-05-04',
         name: '王小虎',
         address: '上海市普陀区金沙江路 1518 弄'
       }, {
         date: '2016-05-01',
         name: '王小虎',
         address: '上海市普陀区金沙江路 1518 弄'
       }, {
         date: '2016-05-08',
         name: '王小虎',
         address: '上海市普陀区金沙江路 1518 弄'
       }, {
         date: '2016-05-06',
         name: '王小虎',
         address: '上海市普陀区金沙江路 1518 弄'
       }],
       fileSelect:[],  //招标文件  s
       fileList:[]
    }
  },
  methods: {
    handlemark() {    //中标设置弹框
      this.redactFormVisible = true
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    deletemark() {     // 删除操作得弹框 
       this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    resetForm() {    // 设置页面得操作得
      this.redactFormVisible = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.handleForm.resource)
        } else {
          return false;
        }
      });
    },
      onSubmit(formName) {   //保存按钮
      console.log('submit!');
    },
     emptyForm(formName) {  // 清空按钮
        this.$refs[formName].resetFields();
    },
     handleClick(tab, event) {  // 被选中tab标签实例
       console.log(tab, event);
     },
      handleSelectionChange(val) {   // 编辑明细  选中时发生变化会触发该事件
          console.log(val)
      },
      handleFileChange(val) {   //  招标文件的

      },
       //   上传文件等方法
    //  文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //  点击文件列表已上传的文件时的钩子的
    handlePreview(file) {

    },
    handleSuccess(response, file, fileList) {   //当文件上传成功的时候的回调函数
      console.log(response)
      // if (response.code === 1) {
      //   this.$message({
      //     type: 'success',
      //     message: response.msg
      //   })
      //     selectAlias({ stdCode: this.stdCode, name: '', stdType: '1' }).then(res => {
      //       if (res.code === 1) {
      //         this.tableData = res.data
      //       }
      //     })
      // }else {
      //    this.$message({
      //     type: 'warning',
      //     message: response.msg
      //   })
      // }
    },
    setHeader() {
      let token = localStorage.getItem('Authorization')
      return { Authorization: token }
    },
    //  文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
  components: {
     Edit
  },
}
</script>
<style lang="less">
 .compile {
  .menu-c {
    box-sizing: border-box;
    padding: 0 10px;
    color: #fff;
    background-color: #000;
    line-height: 60px;
    font-size: 16px;
    .left-c {
      display: flex;
      justify-content: space-between;
      .message-c {
        span {
          margin-right: 10px;
        }
        a {
          color:white;
        }
      }
      .handle-c {
        span {
          margin-right: 10px;
        }
      }
    }
    .right-c {
      .el-menu--horizontal>.el-menu-item.is-active {
        border-bottom: none;
      }
    }
  }
  .redact-c {
    padding: 10px 20px;
    .btn {
      text-align: center;
    }
    // font-size:12px;
    .el-form-item{
       margin-bottom: 8px;
    }
    .el-form-item__content {
      line-height: 30px;
    }
    .el-form-item__label {
        text-align: center;
        font-size: 12px;
        line-height: 30px;
        height: 30px;
      }
    .el-input__inner{
        width: 80%;
        height: 30px;
        line-height: 30px;
    }
    .el-select {
      .el-input__inner {
        width: 100%;
      }
    }
    .el-input__prefix, .el-input__suffix {
      top:2px;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
      width: 100%;
    }
    .block {
      .el-input__prefix {
        top:-4px;
      }
    }
  }
  .edit-c {   
    .ql-editor {
      height: 815px;
    }
  }
  .compiletable {
    width: 100%;
    overflow: hidden;
  }
  
 ::-webkit-scrollbar {
   height: 15px;
 }
 
::-webkit-scrollbar-thumb {
  border-radius: none;
  background-color: #c4c4c4;

}
.updown-list {
  float:left;
  margin-right:20px;
}

 }
</style>