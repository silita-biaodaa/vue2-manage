<template>    
    <div class="compile" ref="refs">
      
      <el-row class="menu-c">
        <el-col :span="24">
           <el-row>
              <el-col :span="12" class="left-c">
                 <div class="message-c">
                    <span :style= "{color:(this.condition === '0' ? 'red' : '#E6A23C')}">{{ condition | condi}}</span>
                    <a :href="this.state" target="_blank">来源站点</a>
                 </div>
                 <div class="handle-c">
                    <span @click='handlemark'>设置</span>
                    <span @click='deletemark'>删除</span>
                    <span @click='textt'>测试</span>
                 </div>
              </el-col>

              <el-col :span="12" class="right-c">                  
                  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color='#EBEEF5' menu-trigger='click' @select="handleSelect" >
                    <el-menu-item index="1" @click='addcompile' >编辑</el-menu-item>
                    <el-menu-item index="2" @click='toocompile' >变更</el-menu-item> 
                  </el-menu>
              </el-col>
           </el-row>
        </el-col>
      </el-row>
      <!-- 中间内容部分展示 -->

      <el-row class="main-t">
        <el-col :span="12" class="edit-c">
           <div class="edit-l" @click='lastlist' v-show="isShow">
             <i class="el-icon-arrow-left" ></i>
           </div>
           <div class="edit-r" @click='nextlist' v-show="isShow" >
             <i class="el-icon-arrow-right" ></i>
           </div>
            <Edit></Edit>
        </el-col>
        <el-col :span="12" class="redact-c">
            
          <el-form ref="edits" :model="form" label-width="200px" class="demo-ruleForm"  >
            <el-form-item label="招标编辑编号">
              <el-input v-model="form.editCode" disabled ></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="标段信息">
              <el-input v-model="form.segment"></el-input>
            </el-form-item>
            <el-form-item label='公示日期'>
              <el-input v-model="form.pubDate"  ></el-input>
            </el-form-item>                  
            <el-form-item  >
              <div :class="['labe',forms.iscontrollSum?'new':'old']">招标控制价(万元)</div>
              <el-input v-model="form.controllSum" @blur="text('controllSum')" ></el-input>
            </el-form-item>
            <el-form-item >
              <div :class="['labe',forms.isproSum?'new':'old']">项目金额(万元)</div>
              <el-input v-model="form.proSum" @blur="text('proSum')" ></el-input>
            </el-form-item>
            <el-form-item >
              <div :class="['labe',forms.isproDuration?'new':'old']">项目工期</div>
              <el-input v-model="form.proDuration" @blur="text('proDuration')" ></el-input>
            </el-form-item>
            <el-form-item >
              <div class="labe"><i class="el-icon-warning"></i>项目地区</div>
              <el-select v-model="form.cityCodeName" filterable placeholder="请选择项目地区" style="width:80%">
                <el-option v-for="item in areas" :key="item.areaCode"  :label="item.areaName" :value="item.areaCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item >
              <div class="labe"><i class="el-icon-warning"></i>项目县区</div>
              <el-select v-model="form.countyCode" filterable placeholder="请选择项目县区" style="width:80%">
                <el-option v-for="item in counties" :key="item.areaCode" :label="item.areaName" :value="item.areaCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item >
              <div :class="['labe',forms.ispbMode?'new':'old']">评标办法</div>
              <el-select v-model="form.pbMode" @change="text('pbMode')" filterable placeholder="请选择评标办法" style="width:80%">
                <el-option v-for="item in ways" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item >
              <div :class="['labe',forms.isbidBonds?'new':'old']">投标保证金(万元)</div>
              <el-input v-model="form.bidBonds" @blur="text('bidBonds')" ></el-input>
            </el-form-item>            
            <el-form-item > 
              <div :class="['labe',forms.isbidBondsEndTime?'new':'old']">保证金截至时间</div>
              <div class="block">
                <el-date-picker v-model="form.bidBondsEndTime" type="datetime"  @blur="text('bidBondsEndTime')" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm" value-format="timestamp" >
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item >
              <div :class="['labe',forms.isenrollEndTime?'new':'old']">报名截止时间</div>
              <div class="block">
                <el-date-picker v-model="form.enrollEndTime" type="datetime"  @blur="text('enrollEndTime')" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm" value-format="timestamp" >
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item >
              <div :class="['labe',forms.isenrollAddr?'new':'old']">报名地点</div>
              <el-input v-model="form.enrollAddr" @blur="text('enrollAddr')" ></el-input>
            </el-form-item>
            <el-form-item>
              <div :class="['labe',forms.isauditTime?'new':'old']">资格审查截止时间</div>
              <div class="block">
                <el-date-picker v-model="form.auditTime" type="datetime"  @blur="text('auditTime')" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm" value-format="timestamp" >
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item >
              <div :class="['labe',forms.iscertAuditAddr?'new':'old']">资格审查地点</div>
              <el-input v-model="form.certAuditAddr" @blur="text('certAuditAddr')" ></el-input>
            </el-form-item>
            <el-form-item >
              <div :class="['labe',forms.isbidEndTime?'new':'old']">投标截止时间</div>
              <div class="block">
                <el-date-picker v-model="form.bidEndTime" type="datetime"  @blur="text('bidEndTime')" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm" value-format="timestamp" >
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item >
              <div :class="['labe',forms.isopeningPerson?'new':'old']">开标人员</div>
              <el-select v-model="form.openingPerson" @change="text('openingPerson')" filterable placeholder="请选择开标人员" style="width:80%">
                <el-option v-for="item in exploits" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item >
              <div :class="['labe',forms.isopeningAddr?'new':'old']">开标地点</div>
              <el-input v-model="form.openingAddr" @blur="text('openingAddr')" ></el-input>
            </el-form-item>
            <el-form-item >
              <div :class="['labe',forms.isproType?'new':'old']"><i class="el-icon-warning"></i>项目类型</div>
              <el-select v-model="form.proType" @blur="text('proType')" filterable placeholder="请选择项目类型" style="width:80%">
                <el-option v-for="item in type1s" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item >
              <div :class="['labe',forms.isbinessType?'new':'old']">招标类型</div>
              <el-select v-model="form.binessType" @change="text('binessType')" filterable placeholder="请选择招标类型" style="width:80%">
                <el-option v-for="item in types" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <div :class="['labe',forms.isfilingPfm?'new':'old']">平台备案要求</div>
               <el-select v-model="form.filingPfm" @change="text('filingPfm')" filterable placeholder="请选择备案要求" style="width:80%">
                <el-option v-for="item in records" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item >
              <div :class="['labe',forms.isntTdStatus?'new':'old']">招标状态</div>
              <el-select v-model="form.ntTdStatus" @change="text('ntTdStatus')" filterable placeholder="请选择招标状态" style="width:80%">
                <el-option v-for="sta in statuss" :key="sta.value" :label="sta.name" :value="sta.value">
                </el-option>
              </el-select> 
            </el-form-item>

            <!-- 资质关系组件 -->
            <el-form-item  v-for="(rela,index) in titurela" :key="index" label="资质关系" class="rela" >
              <!-- 资质和等级 -->
               <el-cascader
                placeholder="资质选择"
                :options="vueles"
                filterable
                 :props="props"
                v-model="rela['qualIds']"
              ></el-cascader> 
              <el-button size="mini" type="danger" class="delete" @click="deleteItem(index)">删除</el-button> 
              <el-button size="mini" type="primary" class="delete" @click="addItem(index)">添加</el-button> 
                <!-- 第二个动态组件  -->
               <div v-for='(item,indexx) in titurela[index].tbNtQuaGroups' :key='indexx' class="rela-sel" >
                  <el-select  v-model="item.relType" placeholder="请选择资质关系" clearable class="sel-conc"
                    filterable>
                    <el-option
                    v-for="item in concern"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                  </el-select>
                  <el-cascader
                    placeholder="资质选择"
                    :options="vueles"
                    filterable
                    :props="props"
                    v-model="item['qualIds']"
                  ></el-cascader> 

                <el-button size="mini" type="danger" @click="deleteeItem(index,indexx)">删除</el-button> 
               
                </div>

              <!-- 资质关系 -->
                <el-form-item  v-show="func(index)" class="el-rela" >
                  <div class="labe-rela">条件类别:</div>
                  <el-select  v-model="rela.relType" placeholder="请选择资质关系"  clearable filterable class="conc-re" >
                        <el-option
                        v-for="item in concern"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                  </el-select>
                </el-form-item>
        
            </el-form-item>

            <el-form-item class="btn">
              <el-button @click="emptyForm('edits')">清空</el-button>
              <el-button type="primary" @click="onSubmit" :disabled="this.Invalid" >保存</el-button>
              <el-button type="primary" @click="addrela">新增资质关系</el-button>
            </el-form-item>  
          </el-form>

        </el-col>

      </el-row>

        <!-- tabs标签页 -->
      <el-row class="fixation">
        <el-col :span="24">
            <!-- 编辑明细 -->
          <el-tabs v-model="activeName2" @tab-click="handleClick" type='border-card'>

              <el-tab-pane label="编辑明细" name="first" >                
  
                    <el-table style="width: 100%" height="200" @selection-change="handleSelectionChange" ref="multipleTable" :data="compileData" @row-click='pilebox'>
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
                      <el-table-column prop="cityCodeName" label="项目地区" width="120" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="countyCodeName" label="项目县市" width="120" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="pbModeName" label="评标办法" width="150" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column prop="bidBonds" label="项目保证金(万元)" width="150" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column width="120" label="保证金截至时间" show-overflow-tooltip> 
                         <template slot-scope="scope">{{ scope.row.bidBondsEndTime | dateFormat('YYYY-MM-DD HH:mm') | nuvalue }}</template>
                      </el-table-column>
                      <el-table-column prop="enrollAddr" label="报名地点" width="120" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column label="资格审查截止时间" width="150" show-overflow-tooltip>
                         <template slot-scope="scope">{{ scope.row.auditTime | dateFormat('YYYY-MM-DD HH:mm') | nuvalue }}</template>
                      </el-table-column> 
                      <el-table-column prop="certAuditAddr" label="资格审查地点" width="150" show-overflow-tooltip>
                      </el-table-column> 
                      <el-table-column  label="投标截止时间" width="150" show-overflow-tooltip>
                         <template slot-scope="scope">{{ scope.row.bidEndTime | dateFormat('YYYY-MM-DD HH:mm') | nuvalue }}</template>                          
                      </el-table-column> 
                      <el-table-column prop="openingPerson" label="开标人员" width="120" show-overflow-tooltip>
                      </el-table-column> 
                      <el-table-column prop="openingAddr" label="开标地点" width="120" show-overflow-tooltip>
                      </el-table-column> 
                      <el-table-column  label="项目类型" width="120" show-overflow-tooltip>
                         <template slot-scope="scope">{{ scope.row.proType | itemtype }}</template>
                      </el-table-column> 
                      <el-table-column label="招标类型" width="120" show-overflow-tooltip>
                         <template slot-scope="scope">{{ scope.row.binessType | trick }}</template>                        
                      </el-table-column> 
                      <el-table-column  label="平台备案要求" width="120" show-overflow-tooltip>
                         <template slot-scope="scope">{{ scope.row.filingPfm | pfm }}</template>                                                
                      </el-table-column> 
                      <el-table-column prop="ntTdStatus" label="招标状态" width="120" show-overflow-tooltip>
                         <template slot-scope="scope">{{ scope.row.ntTdStatus | affair }}</template>                        
                      </el-table-column>     
                    </el-table>

                     <div style="margin-top: 10px">
                       <el-button type="primary" @click='addtop' >添加编辑明细</el-button>
                       <el-button type="primary" @click='delcompile' >删除编辑明细</el-button>
                     </div>
                    
                    
            </el-tab-pane>
             <el-tab-pane label="招标文件" name="second">
               
                  <el-table ref="multipleFile" :data="file" tooltip-effect="dark"  @selection-change="handleFileChange" height="200">
                    <el-table-column type="selection" style="width:5%">
                    </el-table-column>
                    <el-table-column label="招标文件" width="650" >
                      <template slot-scope="scope">{{ scope.row.fileName }}</template>
                    </el-table-column>
                    <el-table-column  label="上传日期" >
                      <template slot-scope="scope">{{ scope.row.created | dateFormat }}</template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态" show-overflow-tooltip >
                    </el-table-column>
                  </el-table>

                  <div style="margin-top: 10px">
                       <el-upload class="updown-list" action="http://admin.biaodaa.com/upload/uploadZhaoBiaoFile/" :data="sendKid()" :on-preview="handlePreview"  :on-success="handleSuccess" name='files' :headers="setHeader()" :before-remove="beforeRemove" :show-file-list='false' multiple :on-exceed="handleExceed" :file-list="fileList">
                         <el-button type="primary">
                           上传招标文件
                         </el-button>
                       </el-upload>
                       <el-button type="primary" @click="uploadurl" >上传文件下载路径</el-button>
                       <el-button type="primary" @click="deleteurl">删除招标文件</el-button>
                  </div>
             </el-tab-pane>

            <el-tab-pane label="相关公告" name="third">
               <el-table ref="multipleRela" :data="relation" tooltip-effect="dark"  @selection-change="handleRelaChange" height="200" @row-click='relabox' >
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
               <div style="margin-top: 10px">
                    <el-button type="primary" @click='editice' >编辑公告</el-button>
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
                <el-radio label="0">未处理</el-radio>
                <el-radio label="5">已处理</el-radio>
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
            <el-input v-model="urltitle" placeholder="请输入上传标题" class="urlma"></el-input>          
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
//  import moment from 'moment'
import Vue from 'vue'
 import { bidAt,delpost,insertNtC,listMain,nsertNtC,getNt,updateStatus,listFixed,listTenders,listFiles,listFilesPath,deleteFiles,listArea,listPbMode,deletePkid,listGp,insertNt,listNtgp,listreli } from '@/api/index';
export default {
  data () {
    return {
      forms:{
        iscontrollSum:false,
        isproSum:false,
        isproDuration:false,
        ispbMode:false,
        isbidBonds:false,
        isbidBondsEndTime:false,
        isenrollEndTime:false,
        isenrollAddr:false,
        isauditTime:false,
        iscertAuditAddr:false,
        isbidEndTime:false,
        isopeningPerson:false,
        isopeningAddr:false,
        isproType:false,
        isbinessType:false,
        isfilingPfm:false,
        isntTdStatus:false        
      },
      arrf:[], // 收集变更字段信息的数组
      parentId:'',
      cpkid:'',
      careaName:'',
      pkid:'',
      code:'',
      title: '',
      pubDate: '', 
       form: {   //编辑变更数据
        // editCode: '',  // 编辑明细编码
        // title:'',     //标段名称
        // segment:'',  // 标段
        // pubDate:'',   // 公示日期
        // controllSum:'',  //超标控制价
        // proSum:'',   //项目金额
        // proDuration:'',  //项目工期
        // cityCodeName:'',    //项目地区
        // countyCode:'',  //项目县区
        // pbMode:'',  //评标办法
        // bidBonds:'', // 投标保证金
        // bidBondsEndTime:'', //投标保证金截止时间
        // enrollEndTime:'',  // 报名截止时间
        // enrollAddr:'',   // 报名地址
        // certAuditAddr:'', //资格审查地点 
        // auditTime:'',   // 资格审查时间
        // bidEndTime:'',  // 投标截止时间
        // openingPerson:'', //开发人员
        // openingAddr:'', //开标地点
        // proType:'', //项目类型
        // binessType:'', // 招标类型
        // filingPfm:'', //备案要求
        // ntTdStatus:'',// 招标状态           
      },
      quaI:[],
      titurela:[{tbNtQuaGroups:[]}], // 资质关系逻辑
      company:[
          {
            value: '老板',
            label: '老板'
          }, {
            value: '经理',
            label: '经理'
          }, {
            value: '主管',
            label: '主管'
          }
      ],
      concern:[
        {
          value:'&',
          label:'和'
        },
        {
          value:'|',
          label:'或'
        }
      ],
      activeName2:'first',
       areas: [],
       counties: [],
       exploits:[], // 开发人员
       ways:[],  // 评标办法
       type1s:[], //项目类型
       types:[],  //招标类型
       records:[],  //备案要求
       statuss:[], //开标状态
      activeIndex:'1',
      condition:'',
      state:'',
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
       reli:[],
       ajson:{},
       list:[],
       releGp:'',
       comparepile:{},  // 用于变更时候的比较字段
       arrpare:[],  // 用于变更时候请求接口几次判断
       urltitle:'',
       fieldNames:[],
       engine:{},
       arrpkid:[],
       arrtitle:[],
       arrpub:[],
       position:'',
       isShow: true,
       mainCo :[],
      vueles:[],
         props:{
           value: 'key',
           label:'value',
           children: 'qualList'
         },
       Invalid:false,  
       intact:false 
      } 
  },
  mounted () {

  },
  created () {
    this.parentId = localStorage.getItem('parentId')
    this.listfixe()   // 固定下拉框
    this.listNtgpn()   // 相关公告 获取id和source 
    this.listFile()    // 相关文件
    this.listregion()  // 加载地区
    this.listMode()  // 评标办法
    this.listTender()   // 获取编辑列表
    this.listarr()  // 上下一条得数据，获取刷选条件
    this.listAtt()  // 获取资质关系组
  },
  filters: {
    nuvalue:function (val) {
      if(val == null)  {
         return ''
      }
    },
    condi:function(val) {
      switch (val) {
        case '0':
          return '未处理'
          break;
         case '1':
          return '未审核'
          break;
          case '2':
          return '已通过'
          break;
          case '4':
          return '审核未通过'
          break;
          case '5':
          return '已处理'
          break; 
      }
    },

    itemtype:function(val) {
       switch (val) {
         case '1':
            return "建筑工程"
           break;
         case '2':
          return "公路工程"
           break;
         case '3':
          return "铁路工程"
           break;   
         case '4':
          return  "港口与航道工程"
           break;
           case '5':
          return "港口与航道工程"
           break;
           case '6':
          return "电力工程"
           break;
           case '7':
          return "矿山工程"
           break;
           case '8':
          return "冶金工程"
           break;
           case '9':
           return "石油化工工程"
           break;
           case '10':
           return "市政公用工程"
           break;
           case '11':
           return "通信工程"    
           break;
           case '12':
           return "电信工程"
           break;
           case '13':
           return "地基基础工程"
           break;
           case '14':
           return "建筑装修装饰工程"
           break;
           case '15':
           return "建筑幕墙工程"
           break;
           case '16':
           return "预拌混凝土"
           break;
           case '17':
           return "钢结构工程"
           break;
           case '18':
           return "消防设施工程"
           break;
           case '19':
           return "模板脚手架"
           break;
           case '20':
           return "起重设备安装"
           break;
           case '21':
           return "防水防腐保温工程"
           break;
           case '22':
           return "建筑机电安装工程"
           break;
           case '23':
           return "古建筑工程"
           break;
           case '24':
           return "城市及道路照明工程"
           break;
           case '25':
           return "环保工程"
           break;
           case '26':
           return "桥梁工程"
           break;
           case '27':
           return "电子与智能化工程"
           break;
           case '28':
          return "隧道工程"
           break;
           case '29':
           return "公路路基工程"
           break;
           case '31':
           return "铁路电务工程"
           break;
           case '32':
           return "铁路铺轨架梁工程"
           break;
           case '33':
           return "铁路电气化工程"
           break;
           case '34':
           return "机场场道工程"
           break;
           case '35':
           return "民航空管工程及机场弱电系统工程"
           break;
           case '36':
           return "机场目视助航工程"
           break;
           case '37':
           return "港口与海岸工程"
           break;
           case '38':
           return "港航设备安装及水上交管工程"
           break;
           case '39':
           return "航道工程"
           break;
           case '40':
           return "水利水电机电设备安装工程"
           break;
           case '41':
           return "水工金属结构制作与安装工程"
           break;
           case '42':
           return "河湖整治工程"
           break;
           case '43':
           return "通航建筑工程"
           break;
           case '44':
           return "核工程"
           break;
           case '45':
           return "输变电工程"
           break;
           case '46':
           return "公路交通工程"
           break;
           case '47':
           return "海洋石油工程"
           break;
           case '48':
           return "特种工程"
           break;
           case '49':
           return "勘察项目"
           break;
           case '50':
           return "设计项目"
           break;
           case '51':
           return "监理项目"
           break;
           case '52':
           return "招标代理工程"
           break;
           case '53':
           return "地质灾害治理工程"
           break;
           case '54':
           return "城市园林绿化工程"
           break;
           case '55':
           return "土石方工程"
           break;
           case '56':
           return "文物保护工程"
           break;
           case '57':
           return "设计与施工一体化项目"
           break;
           case '58':
           return "造价咨询项目"
           break;
           case '59':
           return "公路养护工程"
           break;
           case '60':
           return "检测项目"
           break;
           case '61':
           return "土整项目"
           break;
           case '62':
           return "室内装饰"
           break;
           case '63':
           return "EPC项目"
           break;
           case '64':
           return "PPP项目"
           break;
           case '65':
           return "安防工程"
           break;
       
       }
    },
    affair:function(val) {
      switch (val) {
        case '1':
        return "未开标"            
          break;
          case '2':
        return "流标"           
          break;
          case '3':
        return "重新招标"            
          break;
          case '4':
        return "终止"           
          break;
          case '5':
        return "中止"            
          break;
          case '6':
        return "废标"            
          break;
          case '7':
        return "延期"            
          break;
          case '8':
        return "已开标"           
          break;
          case '':
        return             
          break;
      }
    },
    trick:function(val) {
      switch (val) {
        case '01':
        return "施工"            
          break;
           case '02':
        return "监理"            
          break;
           case '03':
        return "设计"            
          break;
           case '04':
        return "勘察"            
          break;
           case '05':
        return "采购"            
          break;
           case '06':
        return "其他"            
          break;
           case '07':
        return "PPP"            
          break;
           case '08':
        return "设计施工"            
          break;
           case '09':
        return "EPC"            
          break;
           case '10':
        return "检测"            
          break;
           case '11':
        return "施工采购"            
          break;
           case '12':
        return "造价咨询"            
          break;
          case '13':
        return "造价咨询"
          break;
      }
    },
    pfm:function(val) {
      switch (val) {
        case '01':
         return "长沙公共资源交易电子服务平台"
          break;
        case '02':
         return "湖南省水利建设市场信用信息平台"
          break;
        case '03':
         return "全国水利建设市场信用信息平台"
          break;
        case '04':
         return "湘潭市公共资源交易中心"
          break;
        case '05':
         return "湘西州公共资源交易网"
          break;
        case '06':
         return "湖南省交通运输厅公路建设市场信用信息管理系统"
          break;
        case '07':
         return "全国公路建设市场信用信息管理系统"
          break;          
      }
    }
  },
  watch: {
    "$route"(to,from) {
        if(to.name === 'compile') {
            this.listNtgpn()
            this.listTender()
            this.listFile()
        }
    },
    "form.cityCodeName":{
        handler:function(val){
          
           if(val) {
              if(val.length >= 32 ) {
                    this.form.countyCode = ''
                  this.cpkid= val.substring(0,32)
                  this.careaName= val.substring(32)
                  listArea({areaParentId:this.cpkid}).then(res => {
                      if(res.code === 1) {
                          this.counties = res.data   
                          if(this.counties.length ==0 ) {
                            
                          }            
                      }
                  })
              } else {
                  return listTenders({ntId:this.pkid,source:this.code}).then(res=> {
                                  this.counties = res.data[0].countys
                            })
              }
           }
        
        deep: true
      }
    }

  },
  methods: {
    textt() {
        console.log(this.quaId)
        console.dir(this.titurela,965);
        console.log(this)
        
    },
    listAtt(){
      bidAt({}).then(res => {
         this.vueles = res.data
      })
    },
    // 判断是否隐藏多余的下拉框
    func(index) {
      if(this.titurela.length - 1 == index) {
           return false
      } else {
        return true
      }
    },
    // 添加
     addItem(index){
      this.titurela[index].tbNtQuaGroups.push({})      
    },
    //  删除
    deleteItem(index) {
         // 此处的有待的商定的功能性！
         if(this.titurela.length == 1) {
            return this.$message({
               type:'warning',
               message:'必须保留一组资质关系'
            })
         }
        if(index == (this.titurela.length - 1) ) {
          if(!(this.titurela[ index - 1 ].relType == undefined) ) {
              Vue.delete(this.titurela[index - 1 ],'relType')
          }
        }
        this.titurela.splice(index,1)        
    },
    deleteeItem(index,indexx){
       this.titurela[index].tbNtQuaGroups.splice(indexx,1)
    },
    addrela() {
      this.titurela.push({tbNtQuaGroups:[]})
    },
    text(val) {
      if(this.typecompile === '编辑') {
          return 
      }
      if( this.form[val] === this.comparepile[val]) {   
        this.forms['is'+ val] = false
      } else {
        this.forms['is'+ val] = true 
        this.fieldNames.push(val)    
      }
    },
    newurl() {
      localStorage.setItem("reliTitle",this.form.title)
      localStorage.setItem('reliSource', this.code)
      localStorage.setItem('relipkid',this.pkid)
      this.$router.replace('/relevance')
    },    
    // 获取上一条下一条数据
    listarr(){
      if(localStorage.getItem('tensele')) {
          this.engine = JSON.parse(localStorage.getItem('tensele'))
          listMain({source:this.code,proviceCode:this.code,cityCode:this.engine.cityCode,ntStatus:this.engine.ntStatus,ntCategory:1,title:this.engine.title,pubDate:this.engine.pubDate,pubEndDate:this.engine.pubEndDate,currentPage:this.engine.currentPage,pageSize:this.engine.pageSize }).then(res => {
              if(res.code ===1){
                  res.data.datas.forEach(item => {
                      this.arrpkid.push(item.pkid)
                      this.arrtitle.push(item.title)
                      this.arrpub.push(item.pubDate)
                  })
                  this.form.title = this.arrtitle[this.position]
                  this.form.pubDate = this.arrpub[this.position]
                if(this.arrpkid.length == 1 ) {
                    this.isShow = false   
                }
              } 
          }) 
      } else {
          this.isShow = false
      }       
    },
    // 加载地区 
    listregion() {
        listArea({areaParentId:this.parentId}).then(res => {
            if(res.code === 1 ) {
               res.data.forEach(itme => {
                   itme.areaCode = itme.pkid + itme.areaCode
                }) 
               this.areas = res.data
            }
        })
    },
    //评标办法
    listMode() {
        listPbMode({type:this.code}).then(res => {
           if(res.code === 1 ) {
             this.ways = res.data
           }
        })
    },
    // 相关公告得
    listNtgpn() {
        this.pkid = this.$route.params.id
        this.code = this.$route.params.code
        listNtgp({ntId:this.pkid,source:this.code}).then(res => {
          if(res.code ===1) {
            // 相关公告列表
            this.relation = res.data.datas
          }
        })
    },
    // 固定下拉框
    listfixe() {
        this.position = localStorage.getItem('indexer')
      listFixed({}).then(res=> {
        this.exploits = res.data.bidOpeningPersonnel
        this.types = res.data.biddingType      
        this.type1s = res.data.projectType
        this.records = res.data.filingRequirements
        this.statuss = res.data.biddingStatus
      })
        
    },
     // 获取编辑列表
    listTender() {
        
        listTenders({ntId:this.pkid,source:this.code}).then(res=> {
            console.log(res,1025)
          // this.mainCo = res.data[0]     // 暂时得思先行保存，渲染标题，公式日期
          this.condition = res.data[0].ntStatus
          this.careaName = res.data[0].cityCode   // 接口数据请求得地区
          
          if(res.data[0].pkid) {
            this.state = res.data[0].url
            this.condition = res.data[0].ntStatus
            this.compileData = res.data.concat()
            this.form = JSON.parse(JSON.stringify(res.data[0]))
            if(res.data[0].tbNtRegexGroups == null) {
               this.titurela = [{tbNtQuaGroups:[]}]
            } else {
                this.titurela = res.data[0].tbNtRegexGroups
                if(res.data[0].tbNtRegexGroups.length == 1) {
                    this.titurela.push({tbNtQuaGroups:[]})
                } 
            }  
          } else {
              this.emptyForm('edits')

             if(localStorage.getItem('setTitle')) {   //单个跳转过来，后期重点优化得程序
                this.form.title = localStorage.getItem('setTitle')
                this.form.pubDate = localStorage.getItem('setPud')
             } else {

               this.form = JSON.parse(JSON.stringify(res.data[0]))   
             }
           
          }         
      }) 
    },
    // 获取招标文件
    listFile() {     
      listFiles({bizId:this.pkid,source:this.code}).then(res=> {
        this.file = res.data  
         this.form.title = this.arrtitle[this.position]
         this.form.pubDate = this.arrpub[this.position]      
      })
    },
    // 解除相关公告函数
    arrjson(obj) {
      this.ajson.ntId = obj.ntId
      this.ajson.relGp = obj.relGp
      this.ajson.source = this.code
      this.list.push(this.ajson)
      this.ajson = {}
    },
    handlemark() {    //中标设置弹框.
      if(this.condition != '0' && '5') {
          return this.$message({
                  type:'warning',
                  message:'该公告无法设置'
                })
        }else {
            this.redactFormVisible = true
        }
    },
    handleSelect(key, keyPath) {
    },
    deletemark() {     // 删除操作得弹框 
       this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         this.nextdel()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 删除这条公告得操作
    nextdel() {
         delpost({pkid:this.pkid,source:this.code}).then(res => {
           if(res.code === 1 ) {
            this.arrpkid.splice(this.position,1)
            this.arrtitle.splice(this.position,1)
            this.arrpub.splice(this.position,1)
            if(this.arrpkid.length == 1) {
               this.isShow = false 
            }
            if(this.arrpkid.length == 0) {
               return this.$router.push({path:'/tender'})
            }
            this.$router.push({
              name:'compile',params:{id:this.arrpkid[this.position],code:this.code}
            })
            if(parseInt(this.position) > this.arrpkid.length) {
               this.position = parseInt(this.position) -1
             }
           }

        })
    },
    lastlist() {
      if(parseInt(this.position) == 0) {
          return this.$message({
             type:'warning',
             message:'已经是第一条公告，无法跳转~'
          })
      } else {
        this.position = parseInt(this.position) - 1
        this.form = {}
        this.$router.push({
              name:'compile',params:{id:this.arrpkid[this.position],code:this.code}
            })
      }
    },
    nextlist() {
       if(parseInt(this.position) == this.arrpkid.length - 1 ) {
          return this.$message({
             type:'warning',
             message:'已经是最后一条公告，无法跳转~'
          })
      } else {
        this.position = parseInt(this.position) + 1
        this.form = {}
        this.$router.push({
              name:'compile',params:{id:this.arrpkid[this.position],code:this.code}
            })
      }
    },
    resetForm() {    // 设置页面得操作得
      this.redactFormVisible = false
    },
    // 公告页面得编辑设置弹框处理
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateStatus({ntCategory:this.handleForm.type,ntStatus:this.handleForm.resource,pkid:this.pkid,source:this.code}).then(res=> {
            if(res.code === 1 ) {
              this.$message({
                message:res.msg,
                type:'success'
              });
              
              this.condition = this.handleForm.resource
              this.redactFormVisible = false;
            }
            if(this.handleForm.type == 2) {
                  this.$router.push({name:'bidding',params: {id:this.pkid,code:this.code}}) 
              }            
          })
        
        } else {
          return false;
        }
      });
    },
      onSubmit() {   //保存按钮
       this.Invalid = true
      if(this.typecompile === '编辑') {   
        if(this.form.cityCodeName === '') {
             this.Invalid = false
            return this.$message({
                    message:'请选择项目地区',
                    type:'warning'
                  })
        } else if ( !this.form.countyCode) {
             this.Invalid = false
           return this.$message({
                    message:'请选择项目县区',
                    type:'warning'
                  })
        } else if(!this.form.proType) {
             this.Invalid = false
          return this.$message({
                    message:'请选择项目类型',
                    type:'warning'
                  })
        } else {
          if(this.titurela[0].qualIds == null && this.titurela[0].tbNtQuaGroups.length == 0 ) {
              this.titurela = []
          } else {
                  this.titurela.forEach( el => {
                if( el.qualIds == null ) {
                    this.intact = true
                    
                }
              })
              if(this.intact) {
                this.intact = false 
                this.Invalid = false
                return this.$message({
                              message:'请保证资质的关系组全部填写',
                              type:'warning'
                            })    
              }
          }
         
        }     
         
          insertNt({pkid:this.form.pkid,source:this.code,ntId:this.pkid,title:this.form.title,segment:this.form.segment,pubDate:this.form.pubDate,controllSum:this.form.controllSum,proSum:this.form.proSum,proDuration:this.form.proDuration,cityCode:this.careaName,countyCode:this.form.countyCode,pbMode:this.form.pbMode,bidBonds:this.form.bidBonds,bidBondsEndTime:this.form.bidBondsEndTime,enrollEndTime:this.form.enrollEndTime,enrollAddr:this.form.enrollAddr,auditTime:this.form.auditTime,bidEndTime:this.form.bidEndTime,openingPerson:this.form.openingPerson,openingAddr:this.form.openingAddr,proType:this.form.proType,binessType:this.form.binessType,filingPfm:this.form.filingPfm,ntTdStatus:this.form.ntTdStatus,certAuditAddr:this.form.certAuditAddr,tbNtRegexGroups:this.titurela}).then( res=> {
               console.log(res,1181)
             if(res.code == 1 ) {
               this.$message({
                    message:res.msg,
                    type:'success'
                  })
             } else {
               this.$message({
                    message:res.msg,
                    type:'warning'
                  })
             }
             this.listTender()
             this.condition = '1'
             
         })

      } else {
          this.fieldNames.forEach(item => {
              insertNtC({ntId:this.pkid,ntEditId:this.form.pkid,ntCategory:1,source:this.code,fieldFrom:this.comparepile[item],fieldName:item,fieldValue:this.form[item]}).then(res => {                            
                  if(res.code === 0 ) {
                     return this.$message({
                       type:'warning',
                       message:'变更失败' 
                     })
                  }
                this.$message({
                  type:'success',
                  message:'变更成功'
                })
              })
          })
          
      }
      setTimeout(() => {
        this.Invalid = false
      }, 1000);

    },
    // 修改或者添加信息字段
    amendlist(){
    },
     emptyForm(formName) {  // 清空按钮
        for (let key in this.form) {
          if(key == 'title' || key == 'pubDate' ) {
              continue
          }
          this.form[key] = ''
        }
        this.titurela = [{tbNtQuaGroups:[]}]
    },  
     handleClick(tab, event) {  // 被选中tab标签实例
     },
      handleSelectionChange(val) { 
          this.delcom = val
          this.activeIndex = '1'
          Object.keys(this.forms).forEach(key => {
                this.forms[key] = false
            })
          this.form = JSON.parse(JSON.stringify(val[0]))
      },
      handleFileChange(val) {   //  招标文件的
           this.deurl = val       
      },
      handleRelaChange(val) {   //相关公告得                   
          this.reli = val

           if(this.reli.length ===0) {
             this.releGp = 0 
           } else {
             this.releGp = val[0].relGp
           }
      },
      editice() {
        if(this.reli.length == 0) {
           return this.$message({
              type:'warning',
              message:'请先选择中要操作数据'
           })
        }
         if(this.reli[0].relType == 1) {
               this.isShow = false
               this.$router.push({name:'compile',params: {id:this.reli[0].ntId,code:this.code}})
               this.texttop()
         } else {
           this.$router.push({name:'bidding',params: {id:this.reli[0].ntId,code:this.code}})
         }
         this.reli.length = 0
      },
      sendKid() {
      return { 
        bizId: this.pkid,
        source:this.code
      }
    },
       //   上传文件等方法
    handleRemove(file, fileList) {
    },
    handlePreview(file) {
    },
    handleSuccess(response, file, fileList) {   //当文件上传成功的时候的回调函数
      if (response.code === 1) {
        this.$message({
          type: 'success',
          message: response.msg
        })
        this.listFile()
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
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    uploadurl() { 
        this.urlFormVisible = true

    },
    urlSubmit() {
       
        if(this.urlupload.trim()==='') {
            this.$message({
             type:'warning',
             message:'地址栏不能为空~'
           })        
       } else if(this.urltitle.trim() === '') {
             this.$message({
             type:'warning',
             message:'上传标题不能为空~'
           })  
       } else {
         listFilesPath({bizId:this.pkid,filePath:this.urlupload,type:4,orderNo:1,source:this.code,fileName:this.urltitle,}).then(res=> {
               if(res.code === 1) {
                 this.$message({
                   type:'success',
                   message: res.msg
                 })
                 this.urlFormVisible = false 
                 this.listFile()
               }
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
        deleteFiles({idsStr:this.deleturl,source:this.code}).then(res => {
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
       this.$confirm('此操作将永久删除该标段信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.delcom.forEach(item => {
            this.delcomp.push(item.pkid)
          })          
      this.delcompl = this.delcomp.join('|')
      this.emptyForm('edits')
        deletePkid({idsStr:this.delcompl,source:this.code}).then(res => {
           if(res.code ===1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.delcom=[],
              this.delcomp = [],
              this.delcompl = ''
              this.listTender()
          }
           
        })
  
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 添加编辑明细得
    addtop() {
       this.addcompile()       
      setTimeout(() => {
        this.form.segment = ''
        this.form.editCode = '' 
        this.texttop()
      }, 150);
      this.$message({
        type:'success',
        message:'请注意标段信息已经清空~'
      })
       
    },
    // 回到顶部
    texttop() {     
        let back = setInterval(() => {
          if(document.querySelector('.el-main').scrollTop){
           document.querySelector('.el-main').scrollTop-=100;
          //  document.querySelector('.el-main').scrollTop-=100;            
          }else {
            clearInterval(back)
          }
        });
    },
    addcompile() {
      this.typecompile = '编辑'
      this.activeIndex = '1' 
       getNt({ntId:this.pkid,source:this.code,pkid:this.form.pkid}).then(res => {
          if(res.code === 1) {
            this.form = res.data
            Object.keys(this.forms).forEach(key => {
                this.forms[key] = false
            })
          }          
       })
    },
    toocompile () {
      this.typecompile = '变更' 
      this.activeIndex = '2'
      getNt({ntId:this.pkid,source:this.code,pkid:this.form.pkid}).then(res => {
        if(res.code === 1 ) {
          this.form = res.data
          this.comparepile = JSON.parse(JSON.stringify(res.data))
          res.data.fieldName.split(',').forEach((item,index) => {
             this.forms['is' + item ] = true
             this.form[item] = res.data.fieldValue.split(',')[index]
          })
       

        }
      })
    },
    //接触相关的公告
    relieve() {
      if(this.releGp ==='') {
        return this.$message({
            type:'warning',
            message:'请选择要解除的公告' 
        })
      }
      this.reli.forEach(item => {
          this.arrjson(item)
      })
      listreli({list:this.list}).then(res => {
         if(res.code ===1) {
            this.$message({
              type: 'success',
              message: '解除关联成功~'
            });
            this.listNtgpn()
            this.reli = []
            this.list.length = 0                       
         } else {
             this.$message({
              type: 'warning',
              message: res.msg
            });
         }

      })
   

    },
    pilebox(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    relabox(row) {
      this.$refs.multipleRela.toggleRowSelection(row)
    }
  },
  beforeRouteEnter(to, from, next){
      if(from.name == 'bidding' ) {
          localStorage.removeItem('parentId')
          localStorage.removeItem('tensele')
          next()
      } else if(from.name == 'compile') {
          if(localStorage.getItem('tensele')) {
             console.log('等等等等')  
          }
      } else {
          localStorage.removeItem('setTitle')
          localStorage.removeItem('setPud')
          next()
      }
  },
  components: {
     Edit
  },
}
</script>
<style lang="less">
 .compile {
   position: relative;
   overflow: hidden;
   .urlma { 
     margin-bottom: 15px;
   }
    .menu-c {
    box-sizing: border-box;
    padding: 0 10px;
    color: #303133;
    background-color:#EBEEF5;
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
          color:#303133;
        }
      }
      .handle-c {
        cursor: pointer;
        span {
          margin-right: 10px;
        }
      }
    }
  }
  .redact-c {
    padding: 10px 20px;
    
    .btn {
      text-align: center;
    }
    .labe {
      // float: left;
      position: absolute;
      top: 0;
      left: -200px;
      width: 200px;
      text-align: center;
      font-size: 12px;
      padding-right: 12px;
      box-sizing: border-box;
      .el-icon-warning {
        color: red;
        margin-right: 5px;
      }   
    }
    .rela{
      .el-input__inner {
       width: 100% ;
    }
    .el-form-item{
     margin-top: 8px;
     margin-bottom: 0px;
    }
    .rela-sel{
      .sel-conc  {
        width: 40%;
        margin-left: 50px;
      }
    }
    .el-rela {
        .labe-rela {
         position: absolute;
          top: 0;
          left: 0px;
          width: 100px;
          text-align: center;
          font-size: 12px;
          // padding-right: 12px;
          box-sizing: border-box;
      }
      .el-select {
        margin-left: 100px;
        width: 40%;
      }
    }
  } 
    
    .old {
      color:#606266;
    }
    .new {
      color:red;
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
  .main-t {
    //  height: 1500px;
     .edit-c {
      position: relative;
        .edit-l,
        .edit-r {
          z-index: 99;
          color:#fff; 
          position: absolute;
          height: 45px;
          width: 45px;
          border-radius: 50%;
          background-color: #909399;
          opacity: 0.2;
          top: 50%;
          transform: translateY(-50%);
          text-align: center;
          line-height: 45px;
          font-size: 30px;
          font-weight: 1000;  
        }
        .edit-l:hover,
        .edit-r:hover {
          opacity: 1;
        }
        .edit-r {
          right:0;
        }   
        .ql-editor {
        height: 815px;
        }
      }
      .right-c {
        overflow: hidden;
      } 
  }
  
  .fixation{
      // position: fixed;
      // bottom: -5px;
      // width: 84%;
      // overflow: hidden;
      // z-index: 999;
        ::-webkit-scrollbar {
            height: 10px;
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

 }
</style>