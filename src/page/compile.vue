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
                    <el-menu-item index="1" @click='addcompile' >编辑</el-menu-item>
                    <el-menu-item index="3" @click='toocompile' >变更</el-menu-item>
                  </el-menu>
              </el-col>
           </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="edit-c">
           <div class="edit-l">
             <i class="el-icon-arrow-left"></i>
           </div>
           <div class="edit-r">
             <i class="el-icon-arrow-right"></i>
           </div>

            <Edit></Edit>
        </el-col>
        <el-col :span="12" class="redact-c">

          <el-form ref="edits" :model="form" label-width="200px" class="demo-ruleForm" >
            <el-form-item label="招标编辑编号">
              <el-input v-model="form.editCode"></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="标段信息">
              <el-input v-model="form.segment"></el-input>
            </el-form-item>
            <el-form-item label="公示日期">
              <el-input v-model="form.pubDate"></el-input>
            </el-form-item>
            <el-form-item label="招标控制价(万元)">
              <el-input v-model="form.controllSum"></el-input>
              <i class="el-icon-check"></i>
            </el-form-item>
            <el-form-item label="项目金额(万元)" >
              <el-input v-model="form.proSum"></el-input>
            </el-form-item>
            <el-form-item label="项目工期">
              <el-input v-model="form.proDuration"></el-input>
            </el-form-item>
            <el-form-item label="项目地区">
              <el-select v-model="form.cityCode" filterable placeholder="请选择项目地区" style="width:80%">
                <el-option v-for="item in areas" :key="item.areaCode" :label="item.areaName" :value="item.areaCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目县区">
              <el-select v-model="form.countyCode" filterable placeholder="请选择项目县区" style="width:80%">
                <el-option v-for="item in counties" :key="item.areaCode" :label="item.areaName" :value="item.areaCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="评标办法">
              <el-select v-model="form.pbMode" filterable placeholder="请选择评标办法" style="width:80%">
                <el-option v-for="item in ways" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投标保证金(万元)">
              <el-input v-model="form.bidBonds"></el-input>
            </el-form-item>
            <el-form-item label="保证金截至时间">
              <div class="block">
                <el-date-picker v-model="form.bidBondsEndTime" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="报名截止时间">
              <div class="block">
                <el-date-picker v-model="form.enrollEndTime" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="报名地点">
              <el-input v-model="form.enrollAddr"></el-input>
            </el-form-item>
            <el-form-item label="资格审查截止时间">
              <div class="block">
                <el-date-picker v-model="form.auditTime" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="资格审查地点">
              <el-input v-model="form.certAuditAddr"></el-input>
            </el-form-item>
            <el-form-item label="投标截止时间">
              <div class="block">
                <el-date-picker v-model="form.bidEndTime" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="开标人员">
              <el-select v-model="form.openingPerson" filterable placeholder="请选择开标人员" style="width:80%">
                <el-option v-for="item in exploits" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开标地点">
              <el-input v-model="form.openingAddr"></el-input>
            </el-form-item>
            <el-form-item label="项目类型">
              <el-select v-model="form.ntCategory" filterable placeholder="请选择项目类型" style="width:80%">
                <el-option v-for="item in type1s" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="招标类型">
              <el-select v-model="form.binessType" filterable placeholder="请选择招标类型" style="width:80%">
                <el-option v-for="item in types" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="平台备案要求">
               <el-select v-model="form.filingPfm" filterable placeholder="请选择备案要求" style="width:80%">
                <el-option v-for="item in records" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="招标状态">
              <el-select v-model="form.ntType" filterable placeholder="请选择招标状态" style="width:80%">
                <el-option v-for="item in status" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item class="btn">
              <el-button @click="emptyForm('edits')">清空</el-button>
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
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
                      <el-table-column prop="title" label="项目名称" width="300">
                      </el-table-column>
                      <el-table-column prop="segment" label="标段信息" width="100">
                      </el-table-column>
                      <el-table-column prop="pubDate" label="发布日期" width="150">
                      </el-table-column>
                      <el-table-column prop="controllSum" label="招标控制价" width="120">
                      </el-table-column>
                      <el-table-column prop="proSum" label="项目金额" width="120" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="proDuration" label="项目工期" width="120" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="cityCode" label="项目地区" width="120" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="countyCode" label="项目县市" width="120" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="pbMode" label="评标办法" width="150" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="bidBonds" label="项目保证金(万元)" width="150" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="bidBondsEndTime" label="保证金截至时间" width="120" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="enrollAddr" label="报名地点" width="120" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="auditTime" label="资格审查截止时间" width="150" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="certAuditAddr" label="资格审查地点" width="150" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="bidEndTime" label="投标截止时间" width="150" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="openingPerson" label="开标人员" width="120" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="openingAddr" label="开标地点" width="120" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column  label="项目类型" width="120" show-overflow-tooltip>
                         <template slot-scope="scope">{{ scope.row.ntCategory | gory }}</template>
                      </el-table-column>
                      <el-table-column label="招标类型" width="120" show-overflow-tooltip>
                         <template slot-scope="scope">{{ scope.row.binessType | biness }}</template>
                      </el-table-column>
                      <el-table-column prop="filingPfm" label="平台备案要求" width="120" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="ntType" label="招标状态" width="120" show-overflow-tooltip>
                      </el-table-column>
                    </el-table>

                     <div style="margin-top: 20px">
                       <el-button type="primary" @click='addtop' >添加编辑明细</el-button>
                       <el-button type="primary" @click='delcompile' >删除编辑明细</el-button>
                     </div>


            </el-tab-pane>
             <el-tab-pane label="招标文件" name="second">

                  <el-table ref="multipleFile" :data="file" tooltip-effect="dark" style="width: 100%" @selection-change="handleFileChange" height="300">
                    <el-table-column type="selection" style="width:5%">
                    </el-table-column>
                    <el-table-column label="招标文件" width="650" >
                      <template slot-scope="scope">{{ scope.row.fileName }}</template>
                    </el-table-column>
                    <el-table-column  label="上传日期" >
                      <template slot-scope="scope">{{ scope.row.created | dateFormat }}</template>
                    </el-table-column>
                    <el-table-column prop="address" label="状态" show-overflow-tooltip >
                    </el-table-column>
                  </el-table>

                  <div style="margin-top: 20px">
                       <el-upload class="updown-list" action="http://120.79.116.245:19004/upload/uploadZhaoBiaoFile/" :data="sendKid()" :on-preview="handlePreview"  :on-success="handleSuccess" name='files' :headers="setHeader()" :before-remove="beforeRemove" :show-file-list='false' multiple :on-exceed="handleExceed" :file-list="fileList">
                         <el-button type="primary">
                           上传招标文件
                         </el-button>
                       </el-upload>
                       <el-button type="primary" @click="uploadurl" >上传文件下载路径</el-button>
                       <el-button type="primary" @click="deleteurl">删除招标文件</el-button>

                  </div>

             </el-tab-pane>
            <el-tab-pane label="相关公告" name="third">
                  <el-table ref="multipleRela" :data="relation" tooltip-effect="dark" style="width: 100%" @selection-change="handleRelaChange" height="300">
                    <el-table-column type="selection" style="width:5%">
                    </el-table-column>
                    <el-table-column label="公告名称" width="650" >
                      <template slot-scope="scope">{{ scope.row.title }}</template>
                    </el-table-column>
                    <el-table-column prop="pubDate" label="发布日期" >
                    </el-table-column>
                    <el-table-column prop="ntStatus" label="状态" show-overflow-tooltip >
                    </el-table-column>
                  </el-table>

                  <div style="margin-top: 20px">
                       <el-button type="primary" >编辑公告</el-button>
                       <el-button type="primary" @click='newurl' >新增关联公告</el-button>
                       <el-button type="primary" @click='relieve' >解除关联公告</el-button>
                  </div>

            </el-tab-pane>
          </el-tabs>

        </el-col>
      </el-row>

      <!-- 修改得招标信息 -->
      <el-dialog title="设置" :visible.sync="redactFormVisible" width="40%">
          <el-form :model="handleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="公告状态" prop="resource">
              <el-radio-group v-model="handleForm.resource">
                <el-radio label="1">未处理</el-radio>
                <el-radio label="2">已处理</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="公告类型" prop="type">
              <el-radio-group v-model="handleForm.type">
                <el-radio label="1">招标公告</el-radio>
                <el-radio label="2">中标公告</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button @click="resetForm('ruleForm')">取消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            </el-form-item>
          </el-form>
      </el-dialog>
        <!-- 上传路路径得弹框 -->
       <el-dialog title="文件下载路径传输" :visible.sync="urlFormVisible">
          <el-input v-model="urlupload" placeholder="请输入需要上传得下载地址"></el-input>
         <div slot="footer" class="dialog-footer">
           <el-button @click="urlFormVisible = false">取 消</el-button>
           <el-button type="primary" @click="urlSubmit">确 定</el-button>
         </div>
    </el-dialog>

    </div>
</template>

<script>
 import  Edit  from "@/page/edit";
 import { updateStatus,listFixed,listTenders,listFiles,listFilesPath,deleteFiles,listArea,listPbMode,deletePkid,listGp,insertNt,listNtgp,listreli } from '@/api/index';
export default {
  data () {
    return {
      ckpid:'',
      careaName:'',
      pkid:this.$route.params.id,
      code:this.$route.params.code,
      title: '',
      pubDate: '',
       form: {   //编辑变更数据
        editCode: '',  // 编辑明细编码
        title:'',     //标段名称
        segment:'',  // 标段
        pubDate:'',   // 公示日期
        controllSum:'',  //超标控制价
        proSum:'',   //项目金额
        proDuration:'',  //项目工期
        cityCode:'',    //项目地区
        countyCode:'',  //项目县区
        pbMode:'',  //评标办法
        bidBonds:'', // 投标保证金
        bidBondsEndTime:'', //投标保证金截止时间
        enrollEndTime:'',  // 报名截止时间
        enrollAddr:'',   // 报名地址
        auditTime:'',   // 资格审查时间
        bidEndTime:'',  // 投标截止时间
        openingPerson:'', //开发人员
        openingAddr:'', //开标地点
        ntCategory:'', //项目类型
        binessType:'', // 招标类型
        filingPfm:'', //备案要求
        ntType:'',// 招标状态
        certAuditAddr:'' //资格审查地点
      },
      activeName2:'first',
       areas: [],
       counties: [],
       exploits:[], // 开发人员
       ways:[],  // 评标办法
       type1s:[], //项目类型
       types:[],  //招标类型
       records:[],  //备案要求
       status:[], //开标状态
      activeIndex:'1',
      condition:'未处理',
      state:'http://',
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

       ],
       multipleSelection: [],
       //招标文件的数据
       file:[],
       fileSelect:[],  //招标文件
        // 相关公告的名称
       relation:[

       ],
       relaSelect:[],
       fileList:[],
       urlupload:'',
       urlFormVisible:false,
       deurl:[],
       deleurl:[],
       deleturl:'',
       delcom:[],
       delcomp:[],
       delcompl:'',
       typecompile: '编辑',
       again:[],
       reli:[],
       ajson:{},
       list:[],
       relGp:''
    }
  },
  created () {
    this.listNtgp()
    this.listfixe()
    this.listTender()
    this.listFile()
    this.listregion()
    this.listMode()

  },
  filters: {
    // 项目类型
     gory:function(val) {
        if(val === '1' ) {
          return '招标'
        } else if (val === '2') {
          return '中标'
        } else {
          return '其他'
        }
     },
     biness:function(val) {
        if(val=== '1') {
          return '建筑工程'
        } else {
          return '政府采购'
        }
     }
  },
  watch: {
    "form.cityCode"(val) {
      console.log(val,1)
        this.cpkid= val.substring(0,1)
        this.careaName= val.substring(1)
        // console.log(this.careaName,426)
        listArea({areaParentId:this.cpkid}).then(res => {
            if(res.code === 1) {
                this.counties = res.data
            }
        })
    }
  },
  methods: {
    newurl() {
      localStorage.setItem("reliTitle",this.title)
      localStorage.setItem('reliSource', this.code)
      localStorage.setItem('relipkid',this.pkid)
      this.$router.push('/relevance')
      // console.log(this)

    },
    listregion() {
        listArea({areaParentId:this.pkid}).then(res => {
            if(res.code === 1 ) {
               res.data.forEach(itme => {
                   itme.areaCode = itme.pkid + itme.areaCode
                })
               this.areas = res.data

            }
        })
    },
    listMode() {
        listPbMode({type:this.code}).then(res => {
           if(res.code === 1 ) {
             this.ways = res.data
           }
        })
    },
    listNtgp() {
        listNtgp({ntId:this.pkid,source:this.code}).then(res => {
          console.log(res,461)
          if(res.code ===1) {
            console.log(res.data,471)
            this.relGp = res.data.datas[0].relGp

            console.log(this.relGp,471)
            this.relation =res.data.datas
          }
        })
    },
    listfixe() {
      this.title = localStorage.getItem('lititle')
      this.pubDate = localStorage.getItem('lipubtime')
      this.form.title = this.title
      this.form.pubDate = this.pubDate
      listFixed({}).then(res=> {
        this.exploits = res.data.bidOpeningPersonnel
        this.types = res.data.biddingType
        this.type1s = res.data.projectType
        this.records = res.data.filingRequirements
        this.status = res.data.biddingStatus
      })

    },
    listTender() {
        listTenders({ntId:this.pkid,source:this.code}).then(res=> {
          console.log(res.data[0],484)
         this.state = this.state + res.data[0].url
          this.form = res.data[0]
          this.again = res.data[0]
         this.compileData = res.data
          this.arrjson(res.data[0])

      })
    },
    listFile() {
      listFiles({bizId:this.pkid}).then(res=> {

        this.file = res.data

      })
    },
    // 解除相关公告函数
    arrjson(obj) {
      this.ajson.ntId = obj.ntId
      this.ajson.relGp = this.relGp
      this.ajson.source = this.code
      // this.ajson = JSON.stringify(this.ajson)

      console.log(this.ajson,504)
      this.list.push(this.ajson)
      console.log(this.list,   11111111)
      this.ajson = {}
      // console.log(this.ajson,508)
    },
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
    // 公告页面得编辑设置弹框处理
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateStatus({ntCategory:this.handleForm.type,ntStatus:this.handleForm.resource,pkid:this.pkid,source:this.code}).then(res=> {
            if(res.code ===1 ) {
              this.$message({
                message:res.msg,
                type:'success'
              });
              this.redactFormVisible = false;
            }
          })
          if(this.handleForm.resource === '1') {
              this.condition = '未处理'
            } else {
              this.condition = '已处理'
            }
        } else {
          return false;
        }
      });
    },
      onSubmit() {   //保存按钮
      if(this.typecompile === '编辑') {
        if(this.form.cityCode === '') {
            return this.$message({
                    message:'请选择项目地区',
                    type:'warning'
                  })
          } else if (this.form.countyCode === '') {
              return this.$message({
                    message:'请选择项目县区',
                    type:'warning'
                  })
          } else if (this.form.ntCategory ==='') {
            return this.$message({
                    message:'请选择项目类型',
                    type:'warning'
                  })
          }
          // console.log(this.form.ntCategory)
          //  insertNt({source:this.code,ntId:this.pkid,segment:this.form.segment,controllSum:this.form.controllSum,proSum:this.form.proSum,proDuration:this.form.proDuration,cityCode:this.careaName,countyCode:this.form.countyCode,pbMode:this.form.pbMode,bidBonds:this.form.bidBonds,bidBondsEndTime:this.form.bidBondsEndTime,enrollEndTime:this.form.enrollEndTime,enrollAddr:this.form.enrollAddr,auditTime:this.form.auditTime,bidEndTime:this.form.bidEndTime,openingPerson:this.form.openingPerson,openingAddr:this.form.openingAddr,ntCategory:this.form.ntCategory,binessType:this.form.binessType,filingPfm:this.form.filingPfm,ntType:this.form.ntType,certAuditAddr:this.form.certAuditAddr}).then( res=> {
          //     console.log(res,559)
          //  })

      }

    },
     emptyForm(formName) {  // 清空按钮
        for (let key in this.form) {
          this.form[key] = ''
        }
    },
     handleClick(tab, event) {  // 被选中tab标签实例
       console.log(tab, event);
     },
      handleSelectionChange(val) {   // 编辑明细  选中时发生变化会触发该事件
          this.delcom = val
          this.again = val[0]
          this.form = val[0]
      },
      handleFileChange(val) {   //  招标文件的
           this.deurl = val
      },
      handleRelaChange(val) {   //相关公告得
          console.log(val,586)
          // this.relGp = val[0].relGp
          // console.log(this.relGp)
          this.reli = val
      },
      sendKid() {
      return { bizId: this.pkid }
    },
       //   上传文件等方法
    //  文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    //  点击文件列表已上传的文件时的钩子的
    handlePreview(file) {
        console.log(file,1)
    },
    handleSuccess(response, file, fileList) {   //当文件上传成功的时候的回调函数
      console.log(response)
      if (response.code === 1) {
        this.$message({
          type: 'success',
          message: response.msg
        })
      }else {
         this.$message({
          type: 'warning',
          message: response.msg
        })
      }
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
    uploadurl() {  //上传下载路径
        this.urlFormVisible = true

    },
    urlSubmit() {

        if(this.urlupload.trim()==='') {
            this.$message({
             type:'warning',
             message:'地址栏不能为空~'
           })
       } else {
         listFilesPath({bizId:this.id,filePath:this.urlupload}).then(res=> {
            console.log(res)
          })
       }
    },
    // 删除招标文件
    deleteurl() {
      this.deurl.forEach(item => {
         this.deleurl.push(item.pkid)
      })
      this.deleturl = this.deleurl.join('|')

       this.$confirm('此操作将永久删除该招标文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFiles({idsStr:this.deleturl}).then(res => {
           if(res.code ===1) {
              this.$message({
              type: 'success',
              message: '删除成功!'
            });
           }
           this.deurl=[],
           this.deleurl = [],
           this.deleturl = ''
           this.listFile()
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    delcompile() {
       this.$confirm('此操作将永久删除该招标文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delcom.forEach(item => {
         this.delcomp.push(item.pkid)
      })
      this.delcompl = this.delcomp.join('|')
        deletePkid({idsStr:this.delcompl,source:this.code}).then(res => {
          console.log(res,670)
           if(res.code ===1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
           }
           this.delcom=[],
           this.delcomp = [],
           this.delcompl = ''
           this.listTender()
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    addtop() {
       this.form.segment = ''
       this.form.editCode = ''
    },
    addcompile() {
      this.typecompile = '编辑'
      this.form = this.again
    },
    toocompile () {
      this.typecompile = '变更'
      this.form = this.again
    },
    //接触相关的公告
    relieve() {
      this.reli.forEach(item => {
          this.arrjson(item)
      })

      console.log(this.list,739)
      listreli({list:this.list}).then(res => {
        console.log(res)
         if(res.code ===1) {
            this.$message({
              type: 'success',
              message: '解除关联成功~'
            });
            this.listNtgp()
            this.list = []
         } else {
             this.$message({
              type: 'warning',
              message: res.msg
            });
         }

      })
    }
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
    position: relative;
    .edit-l,
    .edit-r {
      color:#fff;
      position: absolute;
       height: 45px;
       width: 45px;
       border-radius: 50%;
       background-color: #000;
       top: 50%;
       transform: translateY(-50%);
       text-align: center;
       line-height: 45px;
       font-size: 30px;
       font-weight: 1000;
    }
    .edit-r {
      right:0;
    }
    .ql-editor {
      height: 815px;
    }
  }
  .compiletable {
    width: 100%;
    overflow: hidden;
  }

 ::-webkit-scrollbar {
   height: 13px;
 }

::-webkit-scrollbar-thumb {
  border-radius: 0;
  background-color: #c4c4c4;

}
.updown-list {
  float:left;
  margin-right:20px;
}
 .el-icon-check {
   color:red;
   font-size: 18px;
   line-height: 30px;
   position: absolute;
   right: 10%;
   top:0;
   font-weight: 700;
 }

 }
</style>
