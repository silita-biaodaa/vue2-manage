<template> 
    <div class="bidding">

        <el-row class="menu-c">
            <el-col :span="24">
              <el-row>
                  <el-col :span="12" class="left-c">
                    <div class="message-c">
                        <span :style= "{color:(this.condition === '0' ? 'red' : '#E6A23C')}">{{ condition | condi}}</span>
                        <a >来源站点</a>
                    </div>
                    <div class="handle-c">
                        <span @click="biddmark" >设置</span>
                        <span @click='deletebidd'>删除</span>
                        <span @click='textt'>测试</span>
                    </div>
                  </el-col>

                  <el-col :span="12" class="right-c">                  
                      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color='#EBEEF5' menu-trigger='click'  @select="handleSelect"  >
                        <el-menu-item index="1" @click='bidedit' >编辑</el-menu-item>
                        <el-menu-item index="2" @click='bidalter' >变更</el-menu-item> 
                      </el-menu>
                  </el-col>
              </el-row>
            </el-col>
      </el-row>
       
      <!-- 中间内容部分展示 -->
      <el-row>
         <el-col :span='12' >
            <bidEdit></bidEdit>
         </el-col>
         <el-col :span='12'  class="redact-c" >
            <el-form ref="edits" :model="bidForm" label-width="200px" class="demo-ruleForm"  >
                <el-form-item label="中标编辑编号">
                  <el-input v-model="bidForm.editCode" disabled ></el-input>
                </el-form-item>
                <el-form-item label="项目名称">
                  <el-input v-model="bidForm.title"></el-input>
                </el-form-item>
                <el-form-item label="标段信息">
                  <el-input v-model="bidForm.segment"></el-input>
                </el-form-item>
                <el-form-item label='招标控制价(万元)'>
                  <el-input v-model="bidForm.controllSum"  ></el-input>
                </el-form-item>
                <el-form-item label='项目金额(万元)'>
                  <el-input v-model="bidForm.proSum"  ></el-input>
                </el-form-item>  
                <el-form-item label='项目工期'>
                  <el-input v-model="bidForm.proDuration"  ></el-input>
                </el-form-item>  
                 <el-form-item label="项目地区" >
                    <el-select v-model="bidForm.cityCodeName" filterable placeholder="请选择项目地区" style="width:80%">
                      <el-option v-for="item in areas" :key="item.areaCode"  :label="item.areaName" :value="item.areaCode">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目县区" >
                    <el-select v-model="bidForm.countyCode" filterable placeholder="请选择项目县区" style="width:80%">
                      <el-option v-for="item in bidplaces" :key="item.areaCode"  :label="item.areaName" :value="item.areaCode">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目类型" >
                    <el-select v-model="bidForm.proType" filterable placeholder="请选择项目类型" style="width:80%">
                      <el-option v-for="item in bidType" :key="item.code"  :label="item.name" :value="item.code">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="招标类型" >
                    <el-select v-model="bidForm.binessType" filterable placeholder="请选择招标类型" style="width:80%">
                      <el-option v-for="item in bidbiness" :key="item.code"  :label="item.name" :value="item.code">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="评标办法" >
                    <el-select v-model="bidForm.pbMode" filterable placeholder="请选择评标办法" style="width:80%">
                      <el-option v-for="item in bidbiness" :key="item.code"  :label="item.name" :value="item.code">
                      </el-option>
                    </el-select>
                </el-form-item>
                <!-- 第一中标候选人 -->
                <div
                 v-for="(item,index) in bidForm.domains"
                 :key="index"
                 class="bidtask"
                >
                <el-button @click="addDomain" size='mini' class="bidadd" type="danger" v-show="taskadd(index)" >增加</el-button>                   
                <el-form-item label="第一中标候选人">
                    <el-select v-model="item.fCandidate" filterable placeholder="请选择企业名称" style="width:80%">
                      <el-option v-for="item in taskcompany" :key="item.areaCode"  :label="item.areaName" :value="item.areaCode">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="第一联合人之一">
                    <el-select v-model="item.fCandidate" filterable placeholder="请选择企业名称" style="width:80%">
                      <el-option v-for="item in taskcompany" :key="item.areaCode"  :label="item.areaName" :value="item.areaCode">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="第一中标候选人">
                    <el-select v-model="item.fCandidate" filterable placeholder="请选择企业名称" style="width:80%">
                      <el-option v-for="item in taskcompany" :key="item.areaCode"  :label="item.areaName" :value="item.areaCode">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='中标金额（万元）'>
                  <el-input v-model="item.fQuote"  ></el-input>
                </el-form-item>
                <el-form-item label='项目负责人'>
                  <el-input v-model="item.fProLeader"  ></el-input>
                </el-form-item>
                <el-form-item label='技术负责人'>
                  <el-input v-model="item.fTechLeader"  ></el-input>
                </el-form-item> 
                <el-form-item label='施工员'>
                  <el-input v-model="item.fBuilder"  ></el-input>
                </el-form-item> 
                <el-form-item label='安全员'>
                  <el-input v-model="item.fSafety"  ></el-input>
                </el-form-item>
                <el-form-item label='质量员'>
                  <el-input v-model="item.fSafety"  ></el-input>
                </el-form-item>
                <el-form-item label='质量员'>
                  <el-input v-model="item.fQuality"  ></el-input>
                </el-form-item>
                <el-button @click.prevent="removeDomain(index)" size='mini' class="biddel" type="danger" >删除</el-button>                   
                </div>
                 <!-- 第二中标候选人 -->
                <div
                 v-for="(item,index) in bidForm.second"
                 :key="index"
                 class="bidtask"
                >
                <el-button @click="addtDomain" size='mini' class="bidadd" type="danger" v-show="taskadd(index)" >增加</el-button>                   
                <el-form-item label="第二中标候选人">
                    <el-select v-model="item.fCandidate" filterable placeholder="请选择企业名称" style="width:80%">
                      <el-option v-for="item in taskcompany" :key="item.areaCode"  :label="item.areaName" :value="item.areaCode">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="第二联合人之一">
                    <el-select v-model="item.fCandidate" filterable placeholder="请选择企业名称" style="width:80%">
                      <el-option v-for="item in taskcompany" :key="item.areaCode"  :label="item.areaName" :value="item.areaCode">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="第二中标候选人">
                    <el-select v-model="item.fCandidate" filterable placeholder="请选择企业名称" style="width:80%">
                      <el-option v-for="item in taskcompany" :key="item.areaCode"  :label="item.areaName" :value="item.areaCode">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='中标金额（万元）'>
                  <el-input v-model="item.fQuote"  ></el-input>
                </el-form-item>
                <el-form-item label='项目负责人'>
                  <el-input v-model="item.fProLeader"  ></el-input>
                </el-form-item>
                <el-form-item label='技术负责人'>
                  <el-input v-model="item.fTechLeader"  ></el-input>
                </el-form-item> 
                <el-form-item label='施工员'>
                  <el-input v-model="item.fBuilder"  ></el-input>
                </el-form-item> 
                <el-form-item label='安全员'>
                  <el-input v-model="item.fSafety"  ></el-input>
                </el-form-item>
                <el-form-item label='质量员'>
                  <el-input v-model="item.fSafety"  ></el-input>
                </el-form-item>
                <el-form-item label='质量员'>
                  <el-input v-model="item.fQuality"  ></el-input>
                </el-form-item>
                <el-button @click.prevent="removeSecond(index)" size='mini' class="biddel" type="danger" >删除</el-button>                   
                </div>
                <!-- 第三中标候选人 -->
                <div
                 v-for="(item,index) in bidForm.third"
                 :key="index"
                 class="bidtask"
                >
                <el-button @click="addthird" size='mini' class="bidadd" type="danger" v-show="taskadd(index)" >增加</el-button>                   
                <el-form-item label="第三中标候选人">
                    <el-select v-model="item.fCandidate" filterable placeholder="请选择企业名称" style="width:80%">
                      <el-option v-for="item in taskcompany" :key="item.areaCode"  :label="item.areaName" :value="item.areaCode">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="第三联合人之一">
                    <el-select v-model="item.fCandidate" filterable placeholder="请选择企业名称" style="width:80%">
                      <el-option v-for="item in taskcompany" :key="item.areaCode"  :label="item.areaName" :value="item.areaCode">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="第三中标候选人">
                    <el-select v-model="item.fCandidate" filterable placeholder="请选择企业名称" style="width:80%">
                      <el-option v-for="item in taskcompany" :key="item.areaCode"  :label="item.areaName" :value="item.areaCode">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='中标金额（万元）'>
                  <el-input v-model="item.fQuote"  ></el-input>
                </el-form-item>
                <el-form-item label='项目负责人'>
                  <el-input v-model="item.fProLeader"  ></el-input>
                </el-form-item>
                <el-form-item label='技术负责人'>
                  <el-input v-model="item.fTechLeader"  ></el-input>
                </el-form-item> 
                <el-form-item label='施工员'>
                  <el-input v-model="item.fBuilder"  ></el-input>
                </el-form-item> 
                <el-form-item label='安全员'>
                  <el-input v-model="item.fSafety"  ></el-input>
                </el-form-item>
                <el-form-item label='质量员'>
                  <el-input v-model="item.fSafety"  ></el-input>
                </el-form-item>
                <el-form-item label='质量员'>
                  <el-input v-model="item.fQuality"  ></el-input>
                </el-form-item>
                <el-button @click.prevent="removeThird(index)" size='mini' class="biddel" type="danger" >删除</el-button>                   
                </div>

                <el-form-item class="btn">
                  <el-button @click="emptyForm">清空</el-button>
                  <el-button type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>  
            </el-form>    
         </el-col>
      </el-row>   

      <!-- tabs标签页 -->
      <el-row class="fixation">
        <el-col :span="24">
            <!-- 编辑明细 -->
           <el-tabs v-model="biddName" @tab-click="handleClick" type='border-card'>
              <el-tab-pane label="编辑明细" name="first" >                
  
                    <el-table style="width: 100%" height="200" @selection-change="handleSelectionChange" ref="multipleTable" :data="biddData" @row-click='pilebox'>
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
                      <el-table-column  label="项目类型" width="120" show-overflow-tooltip>
                         <template slot-scope="scope">{{ scope.row.proType }}</template>
                      </el-table-column> 
                      <el-table-column label="招标类型" width="120" show-overflow-tooltip>
                         <template slot-scope="scope">{{ scope.row.binessType  }}</template>                        
                      </el-table-column> 
                      
                       <el-table-column prop="first[0].fCandidate" label="第一中标候选人" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="first[0].fCandidate" label="第一联合人之一" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="first[0].fCandidate" label="第一联合人之二" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="first[0].fQuote" label="中标金额(万元)" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="first[0].fProLeader" label="项目负责人" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="first[0].fTechLeader" label="技术负责人" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="first[0].fBuilder" label="施工员" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="first[0].fSafety" label="完全员" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="first[0].fQuality " label="质量员" width="150" show-overflow-tooltip >
                      </el-table-column>

                      <el-table-column prop="first[1].fCandidate" label="第一中标候选人(1)" width="150" show-overflow-tooltip >
                      </el-table-column>
                       <el-table-column prop="first[1].fCandidate" label="第一联合人之一(1)" width="150" show-overflow-tooltip >
                      </el-table-column>
                       <el-table-column prop="first[1].fCandidate" label="第一联合人之二(1)" width="150" show-overflow-tooltip >
                      </el-table-column>
                       <el-table-column prop="first[1].fQuote" label="中标金额(万元)(1)" width="150" show-overflow-tooltip >
                      </el-table-column>
                       <el-table-column prop="first[1].fProLeader" label="项目负责人(1)" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="first[1].fTechLeader" label="技术负责人(1)" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="first[1].fBuilder" label="施工员(1)" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="first[1].fSafety" label="完全员(1)" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="first[1].fQuality " label="质量员(1)" width="150" show-overflow-tooltip>
                      </el-table-column>

                       <el-table-column prop="second[0].fCandidate" label="第二中标候选人" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="second[0].fCandidate" label="第二联合人之一" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="second[0].fCandidate" label="第二联合人之二" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="second[0].fQuote" label="中标金额(万元)" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="second[0].fProLeader" label="项目负责人" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="second[0].fTechLeader" label="技术负责人" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="second[0].fBuilder" label="施工员" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="second[0].fSafety" label="完全员" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="second[0].fQuality " label="质量员" width="150" show-overflow-tooltip>
                      </el-table-column>

                       <el-table-column prop="second[1].fCandidate" label="第二中标候选人(1)" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="second[1].fCandidate" label="第二联合人之一(1)" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="second[1].fCandidate" label="第二联合人之二(1)" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="second[1].fQuote" label="中标金额(万元)(1)" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="second[1].fProLeader" label="项目负责人(1)" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="second[1].fTechLeader" label="技术负责人(1)" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="second[1].fBuilder" label="施工员(1)" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="second[1].fSafety" label="完全员(1)" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="second[1].fQuality " label="质量员(1)" width="150" show-overflow-tooltip>
                      </el-table-column>

                      <el-table-column prop="third[0].fCandidate" label="第三中标候选人" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="third[0].fCandidate" label="第三联合人之一" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="third[0].fCandidate" label="第三联合人之二" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="third[0].fQuote" label="中标金额(万元)" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="third[0].fProLeader" label="项目负责人" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="third[0].fTechLeader" label="技术负责人" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="third[0].fBuilder" label="施工员" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="third[0].fSafety" label="完全员" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="third[0].fQuality " label="质量员" width="150" show-overflow-tooltip>
                      </el-table-column>

                      <el-table-column prop="third[1].fCandidate" label="第三中标候选人(1)" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="third[1].fCandidate" label="第三联合人之一(1)" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="third[1].fCandidate" label="第三联合人之二(1)" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="third[1].fQuote" label="中标金额(万元)(1)" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="third[1].fProLeader" label="项目负责人(1)" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="third[1].fTechLeader" label="技术负责人(1)" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="third[1].fBuilder" label="施工员(1)" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="third[1].fSafety" label="完全员(1)" width="150" show-overflow-tooltip>
                      </el-table-column>
                       <el-table-column prop="third[1].fQuality " label="质量员(1)" width="150" show-overflow-tooltip>
                      </el-table-column>
                    </el-table>
                     <div style="margin-top: 10px">
                       <el-button type="primary" @click='addbid' >添加编辑明细</el-button>
                       <el-button type="primary" @click='delcompilebid' >删除编辑明细</el-button>
                     </div>
              </el-tab-pane>

              <el-tab-pane label="招标文件" name="second">
                  <el-table ref="mulbidFile" :data="bidfile" tooltip-effect="dark"  height="200">
                    <el-table-column label="招标文件" width="650" >
                      <template slot-scope="scope">{{ scope.row.fileName }}</template>
                    </el-table-column>
                    <el-table-column  label="上传日期" >
                      <template slot-scope="scope">{{ scope.row.created | dateFormat }}</template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态" show-overflow-tooltip >
                    </el-table-column>
                  </el-table>
             </el-tab-pane>

              <el-tab-pane label="相关公告" name="third">
               <el-table ref="multipleRela" :data="bidrelation" tooltip-effect="dark"  @selection-change="bidRelaChange" @row-click='relabox' height="200">
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
                    <el-button type="primary" >编辑公告</el-button>
                    <el-button type="primary" >新增关联公告</el-button>
                    <el-button type="primary" @click='bidrelief' >解除关联公告</el-button>                       
               </div>
            </el-tab-pane>

             <el-tab-pane label="相关招标编辑明细" name="four">
               <el-table ref="multipleRelaed" :data="bidrelated" tooltip-effect="dark"  @selection-change="bidRelaedChange" @row-click='relaedbox' height="200">
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
                         <template slot-scope="scope">{{ scope.row.bidBondsEndTime | dateFormat('YYYY-MM-DD hh:mm') }}</template>
                      </el-table-column>
                      <el-table-column prop="enrollAddr" label="报名地点" width="120" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column label="资格审查截止时间" width="150" show-overflow-tooltip>
                         <template slot-scope="scope">{{ scope.row.auditTime | dateFormat('YYYY-MM-DD hh:mm')}}</template>
                      </el-table-column> 
                      <el-table-column prop="certAuditAddr" label="资格审查地点" width="150" show-overflow-tooltip>
                      </el-table-column> 
                      <el-table-column  label="投标截止时间" width="150" show-overflow-tooltip>
                         <template slot-scope="scope">{{ scope.row.bidEndTime | dateFormat('YYYY-MM-DD hh:mm')}}</template>                          
                      </el-table-column> 
                      <el-table-column prop="openingPerson" label="开标人员" width="120" show-overflow-tooltip>
                      </el-table-column> 
                      <el-table-column prop="openingAddr" label="开标地点" width="120" show-overflow-tooltip>
                      </el-table-column> 
                      <el-table-column  label="项目类型" width="120" show-overflow-tooltip>
                         <template slot-scope="scope">{{ scope.row.proType  }}</template>
                      </el-table-column> 
                      <el-table-column label="招标类型" width="120" show-overflow-tooltip>
                         <template slot-scope="scope">{{ scope.row.binessType }}</template>                        
                      </el-table-column> 
                      <el-table-column  label="平台备案要求" width="120" show-overflow-tooltip>
                         <template slot-scope="scope">{{ scope.row.filingPfm  }}</template>                                                
                      </el-table-column> 
                      <el-table-column prop="ntTdStatus" label="招标状态" width="120" show-overflow-tooltip>
                         <template slot-scope="scope">{{ scope.row.ntTdStatus }}</template>                        
                      </el-table-column>    
               </el-table>
               <div style="margin-top: 10px">
                    <el-button type="primary" >修改编辑明细</el-button>
                    <el-button type="primary" @click='delzhaobid' >删除编辑明细</el-button>
                    <el-button type="primary" >导入招标编辑明细</el-button>                       
               </div>
            </el-tab-pane> 
              
           </el-tabs>   
        </el-col>
      </el-row>

      <!-- 修改中标状态信息 -->
      <el-dialog title="设置" :visible.sync="biddFormVisible" width="40%">             
          <el-form :model="biddForm" :rules="biddrules" ref="biddForm" label-width="100px" class="demo-ruleForm">          
            <el-form-item label="公告状态" prop="resource">
              <el-radio-group v-model="biddForm.resource">
                <el-radio label="0">未处理</el-radio>
                <el-radio label="5">已处理</el-radio>
              </el-radio-group>
            </el-form-item>
            
            <el-form-item label="公告类型" prop="type">
              <el-radio-group v-model="biddForm.type">
                <el-radio label="1">招标公告</el-radio>
                <el-radio label="2">中标公告</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>              
              <el-button @click="resetForm('biddForm')">取消</el-button>
              <el-button type="primary" @click="submitForm('biddForm')">确定</el-button>
            </el-form-item>
          </el-form>       
      </el-dialog>

    </div>
</template>
<script>
import bidEdit from '@/page/edit';
import { listFixed,listPbMode,listArea,updateStatus,bidList,delDidList,bidFiles,listreli,listTenders,bidRela,bidzhaoList,biddelList } from '@/api/index'
export default {
  data () {
     return {
        pkid:'',
        source:'',
        activeIndex:'1',
        condition:'0',
        biddFormVisible:false,
        biddForm:{
          resource:'',
          type:''
        },
        bidstr:'编辑',
        biddrules:{
          resource: [
           { required: true, message: '请选择公告状态', trigger: 'change' }
         ],
         type:[
           { required: true, message: '请选择公告类型', trigger: 'change' }
         ]
        },
        biddName:'first',  // tabs 标签页默认选中
        biddData:[], // 编辑明细数据
        biddlist:[], // 选中时候收集到的数据 
        biddpkid:[], // 收集的编辑明细的kpid
        bidfile:[], // 招标文件的数据
        bidrelation:[], // 相关公告数据
        bidrelated:[], // 相关招标编辑明细
        list:[],
        ajson:{},
        bidForm:{
          editCode:'',
          title:'',
          segment:'',
          controllSum:'',
          proSum:'',
          proDuration:'',
          proType:'',
          binessType:'',
          pbMode:'',
          domains:[{}], 
          second:[{}],
          third:[{}],          
        }, // 编辑明细列表数据
        areas:[], //项目地区
        bidplaces:[], //项目县区
        bidType:[], //项目类型
        bidbiness:[], //招标类型
        bidMode:[], //评标办法
        taskcompany:[],  // 企业候选人 
      }
  },
  watch: {
    "bidForm.cityCodeName":{
        handler:function(val){
           if(val) {
              if(val.length >= 32 ) {
                    this.bidForm.countyCode = ''
                  this.cpkid= val.substring(0,32)
                  this.careaName= val.substring(32)
                  listArea({areaParentId:this.cpkid}).then(res => {
                      if(res.code === 1) {
                          this.bidplaces = res.data              
                      }
                  })
              } else {
                  return listTenders({ntId:this.pkid,source:this.source}).then(res=> {
                                  this.bidplaces = res.data[0].countys
                            })
              }
              
           }
        
        deep: true
      }
    }
  },
  created () {
    this.pkid = this.$route.params.id
    this.source = this.$route.params.code
    this.bidid = localStorage.getItem('bidId')
    this.biddetail() // 获取中标编辑明细
    this.gainbidfile() // 获取招标文件
    this.gainRelation() // 获取相关的公告文件列表
    this.gainzhaoList()     // 获取相关的招标编辑明细
    this.gaindown()
  },
  methods: {
    textt(){
       console.log(this.bidForm.domains);
    },
    // 获取的相关下拉数据列表的
    gaindown(){
       // 加载下拉地区
      listArea({areaParentId:this.bidid}).then(res => {
            if(res.code === 1 ) {
               res.data.forEach(itme => {
                   itme.areaCode = itme.pkid + itme.areaCode
                }) 
               this.areas = res.data
            }        
        })
        // 评标办法
      listPbMode({type:this.source}).then(res => {
           if(res.code === 1 ) {
             this.bidbiness = res.data
            //  console.log(res.data,869)
           }
        })
        listFixed({}).then(res=> {
           this.bidType = res.data.projectType
           this.bidbiness = res.data.biddingType   
        })    
    },
    // 获取相关公告列表
    gainRelation() {
      bidRela({pkid:this.pkid,source:this.source}).then(res => {
          // console.log(res,356)
          if(res.code == 1) {
             this.bidrelation = res.data.datas
          }
      })
    },
    // 获取相关的招标编辑明细
    gainzhaoList(){
        bidzhaoList({pkid:this.pkid,source:this.source}).then(res => {
           if(res.code == 1 ) {
              this.bidrelated = res.data
           }  
        })
    },
    // 获取中标编辑明细
    biddetail(){
      bidList({ntId:this.pkid,source:this.source}).then(res => {
            res.data.forEach(item => {
                item.first = new Array()
                item.second = new Array()
                item.third = new Array()
                  item.bidsCands.forEach(el => {
                       if(el.number == 1 ) {
                          item.first.push(el)
                       } else if (el.number == 2) {
                         item.second.push(el)
                       } else {
                         item.third.push(el)
                       }
                  })  
            }); 
            // console.log(res.data)   
            this.biddData = res.data

          //    if(res.data.length >= 1) {
          //   this.state = this.state + res.data[0].url
          //   this.condition = res.data[0].ntStatus
          //   this.compileData = res.data.concat()
          //   this.form = JSON.parse(JSON.stringify(res.data[0]))             
          // } else {
          //   this.condition = '0'
          //   this.emptyForm('edits')
          //    this.compileData = res.data.concat()
          //   this.form.title = this.arrtitle[this.position]
          //   this.form.pubDate = this.arrpub[this.position]
          // } 
      })
    },
    // 获取中标文件列表
    gainbidfile(){
      bidFiles({pkid:this.pkid,source:this.source}).then(res => {       
         this.bidfile = res.data
      })
    },
    // 相关公告被多选选中
    bidRelaChange(val) {
        this.biddlist = val        
    },
    // 收集每个相关公告的数据集中成一个对象
    arrjson(obj) {
      this.ajson.ntId = obj.ntId
      this.ajson.relGp = obj.relGp
      this.ajson.source = this.source
      this.list.push(this.ajson)
      this.ajson = {}
    },
      // 单行点击选中功能
    relabox(row){
      this.$refs.multipleRela.toggleRowSelection(row)
    },
    // 相关招标编辑明细
    bidRelaedChange(val) {
        this.biddlist = val
    },
    relaedbox(row) {
      this.$refs.multipleRelaed.toggleRowSelection(row)
    },
    //  修改公告状态
    biddmark() {
        if(this.condition != '0' && '5') {
          return this.$message({
                  type:'warning',
                  message:'该公告无法设置'
                })
      }else {
          this.biddFormVisible = true
      } 
    },
    // 公告页面编辑设置弹框处理
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateStatus({ntCategory:this.handleForm.type,ntStatus:this.handleForm.resource,pkid:this.pkid,source:this.code}).then(res=> {
            if(res.code === 1 ) {
              this.$message({
                message:res.msg,
                type:'success'
              });
              //  中标公告变为招标公告处理
              if(this.handleForm.type == 2) {
                // this.nextdel()
              }
              this.condition = this.handleForm.resource
              this.biddFormVisible = false;
            }            
          })
        
        } else {
          return false;
        }
      });
    },
    // 设置页面得操作得
     resetForm() {    
      this.biddFormVisible = false
    },
    // 删除中标公告
    deletebidd(){
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
    // 添加编辑明细的时候额
    addbid() {

    },
    // 多选删除编辑的
    delcompilebid() {
        this.$confirm('此操作将永久删除该标段信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.biddlist.forEach(item => {
            this.biddpkid.push(item.pkid)
          })          
          this.biddpkids = this.biddpkid.join('|')
          delDidList({idsStr:this.biddpkids,source:this.source}).then(res => {
                if(res.code === 1 ) {
                  this.$message({
                    type:'success',
                    message:'删除成功'
                  })
                  this.biddlist = []
                  this.biddpkids = ''
                  this.biddpkid = []
                  this.biddetail()
                }
            })
          
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      }); 
    },
    //  选中的时候发生的变化
    handleSelectionChange(val) {
        this.biddlist = val        
    },
    // 点击当前编辑明细选中
    pilebox(row) {
    this.$refs.multipleTable.toggleRowSelection(row)
    },
    // 被选中的tab标签的实例
     handleClick(tab, event) {  // 被选中tab标签实例
         this.biddlist = []
     },
    // 解除关联公告
    bidrelief() {
      if(!this.biddlist.length) {
        return this.$message({
            type:'warning',
            message:'请选择要解除的公告~' 
        })
      } 
        this.biddlist.forEach(item => {
             this.arrjson(item)
        })
        console.log(this.list,543)
        listreli({list:this.list}).then(res => {
         if(res.code ===1) {
            this.$message({
              type: 'success',
              message: '解除关联成功~'
            });
            this.gainRelation()
            this.biddlist = []
            this.list.length = 0                       
         } else {
             this.$message({
              type: 'warning',
              message: res.msg
            });
         }

      })
     },
    //  删除招标编辑明细 
    delzhaobid() {
      if(!this.biddlist.length) {
         return this.$message({
              type: 'warning',
              message: '请先选择需要操作的标段信息~'
            });
      }

    this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.biddlist.forEach(item => {
            this.biddpkid.push(item.pkid)
          })          
          this.biddpkids = this.biddpkid.join('|')
          biddelList({idsStr:this.biddpkid,source:this.source}).then( res => {
              if(res.code == 1) {
                 this.$message({
                    type:'success',
                    message:'删除招标编辑明细成功'
                 })
                this.gainzhaoList()
                this.biddpkids = ''
                this.biddpkid = []
                this.biddlist = []
              }             
          })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 删除所选中得候选人列表 
    removeDomain(i) {
       if(i != 0) {
          this.bidForm.domains.splice(i, 1);
          // console.log(this.bidForm.domains);
       } else {
          this.$message({
            type:'warning',
            message:'第一条数据不能删除'
          })
       }
    },
    // 显示隐藏
    taskadd(i) {
       if(i == 0 ) {
         return true  
       } else {
        return false  
       }
    },
    addDomain() {
      //  console.log(1) 
       this.bidForm.domains.push({});
    },
    // 第二个列表增加按钮
    addtDomain(){
        this.bidForm.second.push({});
    },

    removeSecond(i) {
      if(i != 0) {
          this.bidForm.second.splice(i, 1);
          // console.log(this.bidForm.domains);
       } else {
          this.$message({
            type:'warning',
            message:'第一条数据不能删除'
          })
       }
    },
    addthird() {
      this.bidForm.third.push({});
    },
    removeThird(i) {
      if(i != 0) {
          this.bidForm.third.splice(i, 1);
       } else {
          this.$message({
            type:'warning',
            message:'第一条数据不能删除'
          })
       }
    },
    // 清空按钮
    emptyForm() {

    },
    // 保存按钮 
    onSubmit() {

    },
    //  点击编辑
    bidedit() {
      this.bidstr = '编辑'
      this.activeIndex = '1' 
    },
    // 点击变更
    bidalter() {
      this.bidstr = '变更'
      this.activeIndex = '2'
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath); 
    },
  },
  filters: {
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
  },
  components: {
    bidEdit,
  }
}
</script>
<style lang="less" >
  .bidding {
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
    .bidtask {
       position: relative;
    }
    .biddel {
       position: absolute;
       bottom: 0;
       right: 0;
    }
    .bidadd {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 999;
    }
  }
  }
</style>