<template>    
    <div class="compile" ref="refs">
      
      <el-row class="menu-c">
        <el-col :span="24">
           <el-row>
              <el-col :span="12" class="left-c">
                 <div class="message-c">
                    <a :href="this.state" target="_blank">来源站点</a>
                 </div>
                 <div class="handle-c">
                    <span @click='deletemark'>删除</span>
                    <span @click='textt'>测试</span>
                 </div>
              </el-col>

              <el-col :span="12" class="right-c">                  
                  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color='#EBEEF5' menu-trigger='click'  >
                    <el-menu-item index="1"  >编辑</el-menu-item>
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
            <el-form-item label="项目名称">
              <el-input v-model="form.projName"></el-input>
            </el-form-item>
            <el-form-item label="标段信息">
              <el-input v-model="form.block"></el-input>
            </el-form-item>
            <el-form-item label='公示日期'>
              <el-input v-model="form.pubDate"  ></el-input>
            </el-form-item>                  
            <el-form-item label="项目地区">
              <el-select v-model="form.projDq" filterable placeholder="请选择项目地区" style="width:80%">
                <el-option v-for="item in areas" :key="item.areaCode"  :label="item.areaName" :value="item.areaCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目县区" >
              <el-select v-model="form.projXs" filterable placeholder="请选择项目县区" style="width:80%">
                <el-option v-for="item in counties" :key="item.areaCode" :label="item.areaName" :value="item.areaCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="评标办法" >
              <el-select v-model="form.pbMode"  filterable placeholder="请选择评标办法" style="width:80%">
                <el-option v-for="item in ways" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-select>          
            </el-form-item>
            <el-form-item label="资质要求" >
                 
        <!-- 第一个动态组件  -->
                    <div v-for='(item,index) in aptituform' :key='index'  class="box" >
                      <el-select class="el-select" v-model="item.label" placeholder="请选择资质和等级" clearable
                          filterable style="width:65%" >
                          <el-option
                          v-for="item in addList"
                          :key="item.uuid"
                          :label="item.name"
                          :value="item.uuid">
                          </el-option>
                        </el-select>
                      <el-button class="delete"  type="primary" size="mini" @click='deleteItem(index)'>删除</el-button> 
                      <el-select class="el-select" v-model="item.rela" placeholder="请选择资质关系" clearable
                          filterable v-show="func(index)">
                          <el-option
                          v-for="item in relation"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                          </el-option>
                        </el-select>
                    </div>  
                       
            </el-form-item>
            <!-- 资质关系组件 -->

            <el-form-item class="btn">
              <el-button @click="emptyForm('edits')">清空</el-button>
              <el-button type="primary" @click="onSubmit">保存</el-button>
              <el-button type="primary" @click='addaptitu'>添加</el-button> 
            </el-form-item>  
          </el-form>

        </el-col>

      </el-row>
    </div>
</template>

<script>
 import  Edit  from "@/page/edit";
//  import moment from 'moment'
import Vue from 'vue'
 import { gainAlia,gainRes,errSave,delpost,insertNtC,listMain,nsertNtC,getNt,updateStatus,listFixed,listTenders,listFiles,listFilesPath,deleteFiles,listArea,listPbMode,deletePkid,listGp,insertNt,listNtgp,listreli } from '@/api/index';
export default {
  data () {
    return {
      parentId:'',
      cpkid:'',
      careaName:'',
      pkid:'',
      code:'',
      title: '',
      pubDate: '', 
       form: {   //编辑变更数据
        projName:'',     //标段名称
        block:'',  // 标段
        pubDate:'',   // 公示日期
        projDq:'',    //项目地区
        projXs:'',  //项目县区
        pbMode:'',  //评标办法     
             
      },
       areas: [],
       counties: [],
       ways:[],  // 评标办法
       type1s:[], //项目类型
       types:[],  //招标类型
      activeIndex:'1',
      condition:'',
      state:'http://',
       relaSelect:[],
       urlupload:'',
       deurl:[],
       deleurl:[],
       deleturl:'',
       delcom:[],
       delcomp:[],
       delcompl:'',
       reli:[],
       ajson:{},
       list:[],
       releGp:'',
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
       aptituform:[
            {}
          ],
       addList: [

      ],
      relation:[
        {
          value:'OR',
          label:'和'
        },
        {
          value:'AND',
          label:'或'
        }
      ],
      rela:'',
      uu:[]
    }
  },
  mounted () {

  },
  created () {
    this.parentId = localStorage.getItem('reId')
    this.code = this.$route.params.code
    this.pkid = this.$route.params.id
    this.listfixe()
    this.listFile()
    this.listregion()
    this.listMode()
    this.listarr()
    this.listAlia()
  },

  watch: {
    // "$route"(to,from) {
    //     if(to.name === 'compile') {
    //         this.listFile()
    //     }
    // },
    "form.projDq":{
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
    },
    addaptitu() {
      this.aptituform.push({})
    },
    deleteItem(index) {
        if(index == (this.aptituform.length - 1) ) {
          if(!(this.aptituform[ index - 1 ].rela == undefined) ) {
              Vue.delete(this.form[index - 1 ],'rela')
          }
        }

        this.aptituform.splice(index,1)
    },
    func(index) {
      if(this.aptituform.length - 1 == index) {
           return false
      } else {
        return true
      }
    },
    // 获取上一条下一条数据
    listarr(){
        
    },
    listAlia() {
      gainAlia({name:''}).then( res => {
        // console.log(res,266)
          res.data.forEach(item => {
             this.uu.push(item.uuid,item.rank)
            item.uuid = this.uu.join('|')
          })
          console.log(res,266);
          
          this.addList = res.data
      })
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
          // console.log(res,277)
           if(res.code === 1 ) {
             this.ways = res.data
            //  console.log(res.data,869)
           }
        })
    },
    // 固定下拉框
    listfixe() {
      gainRes({source:this.code,snatchUrlId:this.pkid}).then( res => {
         console.log(res,292);
         if(res.code == 1) {
            // this.careaName = res.data[0].source
            // this.form = res.data[0]
            // this.aptituform = res.data[0].snatchUrlCerts
         }
      })
    },
    listFile() {     
      // listFiles({bizId:this.pkid,source:this.code}).then(res=> {
      //   this.file = res.data  
      //    this.form.title = this.arrtitle[this.position]
      //    this.form.pubDate = this.arrpub[this.position]      
      // })
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
    lastlist() {

    },
    nextlist() {
     
    },
    onSubmit() {   //保存按钮
      errSave({projName:this.form.projName,block:this.form.block,projDq:this.careaName,projXs:this.form.projXs,pbMode:this.form.pbMode,id:this.form.id,snatchUrlCerts:this.aptituform}).then( res => {
         console.log(res)
      })
    },
    // 修改或者添加信息字段
    amendlist(){

    },
     emptyForm(formName) {  // 清空按钮

    },  
    texttop() {     
        let back = setInterval(() => {
          if(document.querySelector('.el-main').scrollTop){
           document.querySelector('.el-main').scrollTop-=100;
           document.querySelector('.el-main').scrollTop-=100;            
          }else {
            clearInterval(back)
          }
        });
    },
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
    .el-form-item{
     margin-top: 8px;
     margin-bottom: 0px;
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
  
 }
</style>