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
              <el-input v-model="form.gsDate"  ></el-input>
            </el-form-item>                  
            <el-form-item label="项目地区">
              <el-input v-model="form.projDq"  ></el-input>
            </el-form-item>
            <el-form-item label="项目县区" >
              <el-input v-model="form.projXs"  ></el-input>
            </el-form-item>
            <el-form-item label="第一中标候选人" >
              <el-select v-model="form.oneName"  filterable placeholder="请输入企业名称" style="width:80%" remote :remote-method="userSearch" :loading="userSearchLoading" >
                <el-option v-for="(item,index) in types" :key="index" :label="item.companyName" :value="item.companyName"    >
                </el-option>
              </el-select>          
            </el-form-item>
            <el-form-item label="第一联合人之一" >
              <el-select v-model="form.oneName2"  filterable placeholder="请输入企业名称" style="width:80%" remote :remote-method="userSearch" :loading="userSearchLoading" >
                <el-option v-for="item in types" :key="item.companyName " :label="item.companyName" :value="item.companyName"  >
                </el-option>
              </el-select>          
            </el-form-item>
            <el-form-item label="第一联合人之二" >
              <el-select v-model="form.oneName3"  filterable placeholder="请输入企业名称" style="width:80%" remote :remote-method="userSearch" :loading="userSearchLoading">
                <el-option v-for="item in types" :key="item.companyName" :label="item.companyName" :value="item.companyName" >
                </el-option>
              </el-select>          
            </el-form-item>
             <el-form-item label="中标金额（万元）" >
              <el-input v-model="form.oneOffer"  ></el-input>
            </el-form-item>
             <el-form-item label="项目负责人" >
              <el-input v-model="form.oneProjDuty"  ></el-input>
            </el-form-item>
             <el-form-item label="技术负责人" >
              <el-input v-model="form.oneSkillDuty"  ></el-input>
            </el-form-item>
             <el-form-item label="施工员" >
              <el-input v-model="form.oneSgy"  ></el-input>
            </el-form-item>
            <el-form-item label="安全员" >
              <el-input v-model="form.oneAqy"  ></el-input>
            </el-form-item>
            <el-form-item label="质量员" >
              <el-input v-model="form.oneZly"  ></el-input>
            </el-form-item>

            <el-form-item class="btn">
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>  
          </el-form>

        </el-col>

      </el-row>
    </div>
</template>

<script>
 import  Edit  from "@/page/edit";
import Vue from 'vue'
 import { ongSave,ongCom,ongList,errDele,errSelect } from '@/api/index';
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
      state:'',
       types:[],  //招标类型
      activeIndex:'1',
      condition:'',
       relaSelect:[],
       urlupload:'',
       reli:[],
       ajson:{},
       list:[],
       releGp:'',
       urltitle:'',
       engine:{},
       errpkid:[],
       position:'',
       isShow: true,
       mainCo :[],
      rela:'',
      uu:[],
      record:[],
      userSearchLoading: false,
    }
  },
  created () {
    this.gainDate()  // 获取数据
    this.listfixe()  // 获取编辑明细
    this.listarr()  // 上下数据
    this.listFile() // 企业companyName
  },

  watch: {
    "$route"(to,from) {
        if(to.name === 'wrong') {
           this.gainDate()  // 获取pkid
           this.listfixe()
        }
    },

  },
  methods: {
    gainDate() {
        this.code = this.$route.params.code
        this.pkid = this.$route.params.id        
    },
    // 获取上一条下一条数据
    listarr(){
       this.engine = JSON.parse(localStorage.getItem('errTen'))
       this.position = localStorage.getItem('erinder')
       errSelect({source:this.code,openDate:this.engine.openDate,openDateEnd:this.engine.openDateEnd,title:this.engine.title,type:this.engine.type,currentPage:'1',pageSize:'15'}).then( res => {   
          res.data.datas.forEach( el => {
              this.errpkid.push(el.id)
          })
          console.log(this.errpkid,182)
          if(res.data.datas.length == 1 ) {
             this.isShow = false 
          }       
       }) 
    },
    userSearch(query) {
        if (query !== '') {
          this.userSearchLoading = true
          ongCom({queryKey:query}).then(r => {
            this.types = r.data
            this.userSearchLoading = false
          })
          .catch(r => {
            this.userSearchLoading = false
          })
        }
      },
    listfixe() {
      ongList({source:this.code,snatchUrlId:this.pkid}).then( res => {
          console.log(res,302);
         if(res.code == 1) {
            this.form = res.data[0]
         }
      })
    },
    listFile() {     
      ongCom({queryKey:''}).then( res => {
        console.log(res,210)
         if(res.code ==1) {
            this.types = res.data
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
                      name:'wrong',params:{id:this.errpkid[this.position],code:this.code}
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
              name:'wrong',params:{id:this.errpkid[this.position],code:this.code}
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
              name:'wrong',params:{id:this.errpkid[this.position],code:this.code}
            })
      }
    },
    onSubmit() {   //保存按钮
        this.form.source = this.code
        ongSave(this.form).then( res => {
          if(res.code == 1) {
             this.$message({
                type:'success',
                message:'保存成功'
             })
          }
        })
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