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
           <div class="ql-editor" v-html="content" ></div>
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
              <el-input v-model="form.gsDate"  ></el-input>
            </el-form-item>                  
            <el-form-item label="项目地区">
              <el-input v-model="form.projDq"  ></el-input>
              <!-- <el-select v-model="form.projDq" filterable placeholder="请选择项目地区" style="width:80%">
                <el-option v-for="item in areas" :key="item.areaCode"  :label="item.areaName" :value="item.areaCode">
                </el-option>
              </el-select> -->
            </el-form-item>
            <el-form-item label="项目县区" >
              <el-input v-model="form.projXs"  ></el-input>
              <!-- <el-select v-model="form.projXs" filterable placeholder="请选择项目县区" style="width:80%">
                <el-option v-for="item in counties" :key="item.areaCode" :label="item.areaName" :value="item.areaCode">
                </el-option>
              </el-select> -->
            </el-form-item>
            <el-form-item label="评标办法" >
              <!-- <el-select v-model="form.pbMode"  filterable placeholder="请选择评标办法" style="width:80%">
                <el-option v-for="item in ways" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-select>           -->
              <el-input v-model="form.pbMode"  ></el-input>
            </el-form-item>
            <el-form-item label="资质要求" >
                 
        <!-- 第一个动态组件  -->
                    <div v-for='(item,index) in aptituform' :key='index'  class="box" >
                      <el-select class="el-select" v-model="item.aliasName" placeholder="请选择资质和等级" 
                          filterable style="width:65%" @focus="vanish(index)"  remote :remote-method="userSearch" :loading="userSearchLoading" >
                          <el-option
                          v-for="(item,index) in addListt"
                          :key="index"
                          :label="item.name"
                          :value="item.name"
                          >
                          </el-option>
                        </el-select>
                      <el-button class="delete"  type="primary" size="mini" @click='deleteItem(index)'>删除</el-button> 
                      <el-select class="el-select" v-model="item.type" placeholder="请选择资质关系" clearable
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
 import { ongText,errDele,errSelect,gainAlia,gainRes,errSave,listPbMode } from '@/api/index';
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
       arrpare:[],  // 用于变更时n候请求接口几次判断
       urltitle:'',
       fieldNames:[],
       engine:{},
       errpkid:[],
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
      uu:[],
      record:[],
      userSearchLoading: false,
      addListt:[],
      content:''
    }
  },
  created () {
    this.gainDate()  // 获取pkid
    this.listfixe()  
    // this.listMode()  // 获取评标办法
    this.listarr()   // 获取上下一条数据
    this.listAlia()  // 公司
    this.gainText()
  },
  mounted () {
    // this.getADD()
    // this.getAList()
  },
  watch: {
    "$route"(to,from) {
        if(to.name === 'recovery') {
           this.gainDate()  // 获取pkid
           this.listfixe()
           this.gainText()
          //  this.getADD()
          //  this.getAList()
        }
    },
  },
  methods: {
    vanish(i) {
        // this.aptituform[i].aliasName = ''
    },
    gainText() {
        ongText({source:this.code,snatchUrlId:this.pkid}).then(res =>{
          // console.log(res,);
          if(res.code == 1) {
             this.content = res.data.content
          }
        })
    },
    userSearch(query) {
        if (query !== '') {
          this.userSearchLoading = true
          gainAlia({name:query}).then(r => {
          //   r.data.forEach(item => {
          //    this.uu.push(item.mainUuid,item.rank)
          //   item.mainUuid = this.uu.join('/')
          //   this.uu = []
          // })
            this.addListt = r.data
            this.userSearchLoading = false
          })
          .catch(r => {
            this.userSearchLoading = false
          })
        }
      },
    gainDate() {
        this.code = this.$route.params.code
        this.pkid = this.$route.params.id
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
       this.engine = JSON.parse(localStorage.getItem('errTen'))
       this.position = localStorage.getItem('erinder')
       errSelect({source:this.code,openDate:this.engine.openDate,openDateEnd:this.engine.openDateEnd,title:this.engine.title,type:this.engine.type,currentPage:'1',pageSize:'15'}).then( res => {   
          res.data.datas.forEach( el => {
              this.errpkid.push(el.id)
          })
          if(res.data.datas.length == 1 ) {
             this.isShow = false 
          }       
       }) 
    },
    listAlia() {
      gainAlia({name:''}).then( res => {
          // res.data.forEach(item => {
          //    this.uu.push(item.mainUuid,item.rank)
          //   item.mainUuid = this.uu.join('/')
          //   this.uu = []
          // })
          this.addListt = res.data         
      })
    },
    // getTT(name) { 
    //   gainAlia({name:name}).then( res => {
    //     console.log(res,'远程搜索到的企业');
    //       res.data.forEach(item => {
    //          this.uu.push(item.mainUuid,item.rank)
    //         item.mainUuid = this.uu.join('/')
    //         this.uu = []
    //         this.addList.push(item)
    //       })
    //       console.log(this.addList,'放进数组里面的企业');
          
    //   })
    // },
    // getADD() {
    //   setTimeout(() => {
    //     console.log(this.aptituform[0].certificate,'测试数据存在');
    //     console.log(this.aptituform,'检测数据');
    //     if(this.aptituform[0].certificate) {
    //       this.aptituform.forEach(el => {
    //          this.getTT(el.certificate)
    //       })
    //       console.log(this.addListt,'第二次检测数组');
    //       this.addListt = this.addList
    //    } else {
    //       this.addListt = this.addList
    //    }
         
    //   }, 300);
       
    // },
    // getAList() {
    //     setTimeout(() => {
    //       this.addListt = this.addList
    //       console.log(this.addListt);
    //     }, 350);
      
    // },
    // listMode() {
    //     listPbMode({type:this.code}).then(res => {
    //        if(res.code === 1 ) {
    //          this.ways = res.data
    //        }
    //     })
    // },
    listfixe() {
      gainRes({source:this.code,snatchUrlId:this.pkid}).then( res => {
          // console.log(res,303)
         if(res.code == 1) {
            this.careaName = res.data[0].source
            this.form = res.data[0]
             if( ! res.data[0].snatchUrlCerts.length == 0) {
                this.aptituform = res.data[0].snatchUrlCerts
                this.aptituform.forEach( el => {
                   el.aliasName = el.certificate
                })
             } else {
               this.aptituform = [{}]
             }
         }
      })
    },
    deletemark() {     // 删除操作得弹框 
       this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         this.delpkid()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    delpkid() {
        errDele({source:this.code,id:this.pkid}).then( res => {
                if(res.code == 1) {
                    this.errpkid.splice(this.position,1)
                    if(this.errpkid.length == 1 ) {
                      this.isShow = false
                    }
                    if(this.errpkid.length == 0) {
                      return this.$router.push({path:'/errhome'})
                    }
                    this.$router.push({
                      name:'recovery',params:{id:this.errpkid[this.position],code:this.code}
                    })
                    if(parseInt(this.position) > this.errpkid.length) {
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
              name:'recovery',params:{id:this.errpkid[this.position],code:this.code}
            })
      }  
    },
    nextlist() {
        if(parseInt(this.position) == this.errpkid.length - 1 ) {
          return this.$message({
             type:'warning',
             message:'已经是最后一条公告，无法跳转~'
          })
      } else {
        this.position = parseInt(this.position) + 1
        this.form = {}
        this.$router.push({
              name:'recovery',params:{id:this.errpkid[this.position],code:this.code}
            })
      }
    },
    onSubmit() {   //保存按钮  
    //  console.log(this.form,401);
      if(!this.aptituform[0].aliasName) {
         errSave({snatchUrlId:this.pkid,source:this.code,projName:this.form.projName,block:this.form.block,projDq:this.form.projDq,projXs:this.form.projXs,pbMode:this.form.pbMode,id:this.form.id,snatchUrlCerts:this.record}).then( res => {
           if(res.code == 1) {
              this.$message({
                type:'success',
                message:'保存成功'
              })
           } else  {
             console.log(res);
           }
        })  
      } else {
        errSave({snatchUrlId:this.pkid,source:this.code,projName:this.form.projName,block:this.form.block,projDq:this.form.projDq,projXs:this.form.projXs,pbMode:this.form.pbMode,id:this.form.id,snatchUrlCerts:this.aptituform}).then( res => {
          if(res.code == 1) {
              this.$message({
                type:'success',
                message:'保存成功'
              })
           } else  {
             console.log(res);
           }
        })  
      }
      
      
    },
  },
  components: {
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
        height: 600px;
        }
      }
      .right-c {
        overflow: hidden;
      } 
  }
  
 }
</style>