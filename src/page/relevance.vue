<template>
   <div class="relevance">
       <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path:'/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path:'/home' }">业务</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path:'/relevance' }">相关公告</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="rele-title" v-show='skip' >
           <el-col :span='24' >
             相关公告标题:{{title}}
           </el-col>
        </el-row>
        <el-row class="rele-selction" >
          <el-col :span='24'>
              <el-select v-model="civiic" placeholder="请选择" @change='changetab' >
                <el-option
                  v-for="item in options"
                  :key="item.areaCode"
                  :label="item.areaName"
                  :value="item.areaCode">
                </el-option>
              </el-select>
              <el-input placeholder="请输入内容" v-model="firm" style="width:30%" @change="firmchange">
                  <i slot="prefix" class="el-input__icon el-icon-search" ></i>
              </el-input>
              <el-button type="primary" @click='correlation' class="rele-btn" >关联已选择的公告</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
               <el-table
                  :data="tableData3"
                  height="450"
                  border
                  @selection-change="handleRelevance"
                  style="width: 100%">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="title"
                    label="项目名称"
                   width="350">
                  </el-table-column>
                  <el-table-column
                    prop="pubDate"
                    label="发布日期"
                   width='150'>
                  </el-table-column>
                  <el-table-column
                    prop="srcSite"
                    label="公告来源站点"
                    width='250'>
                  </el-table-column>
                  <el-table-column
                    prop="ntStatus"
                    label="状态"
                    width="150">
                    <template slot-scope="scope">{{ scope.row.ntStatus | relnt }}</template>
                  </el-table-column>
                 <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="relevanEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="relevanDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
          </el-col>
        </el-row>

         <el-row class='baa_ai_n'>
                <el-col :span="24">
                   <div class="block">
                        <el-pagination
                         @current-change="handleCurrentChange" 
                         :current-page="1" 
                         :page-sizes="[15, 30, 45, 60]" 
                         :page-size="15" 
                         layout="total, sizes, prev, pager, next, jumper" 
                         :total="total" 
                         @size-change="handleSizeChange">
                        </el-pagination>
                    </div> 
                </el-col> 
                
            </el-row>
   </div>
</template>
<script>
import { listArea,listGp,delpost,relivan } from '@/api/index'
export default {
  data() {
    return {
      skip:true,
      options:[],
      civiic:'hunan',
      firm: '',
      total: 10,
      pagenum: '',
      pagesize: '',
      tableData3: [],
      title:'',
      pkid:localStorage.getItem('relipkid'),
      arrreli:[],
      arMsg:[],
      reStr:''
    }
  },

  created () {
    // this.showtitle()
     this.listsou() 
     this.listRele()
      
  },
  filters: {
    relnt:function(val) {
        switch (val) {
             case '0':
               return '新建'  
                 break;
             case '1':
               return '未审核'  
                 break;
                 case '2':
               return '已审核'  
                 break;
                 case '4':
               return '审核未通过'  
                 break;
                 case '5':
               return '已处理'  
                 break; 
         }
    }
  },
  mounted () {
    this.showtitle()
  },
  beforeRouteEnter(to, from, next){

      if(from.name == 'compile' || 'bidding' ) {
          next()
      } else {
          localStorage.removeItem('reliTitle')
          localStorage.removeItem('reliSource')
          localStorage.removeItem('relipkid') 
          next()
      }
  },
  methods: {  
      showtitle() {
        if(localStorage.getItem('reliSource')) {
            this.civiic = localStorage.getItem('reliSource')
             this.title = localStorage.getItem('reliTitle') 
        }            
         if(localStorage.getItem('reliTitle')) {
          this.skip = true 
         } else {
          this.skip = false

         }       
     },
    handleRelevance(val) {
        this.arrreli = val
    },
     listsou(){
       listArea({areaParentId:'0'}).then(res => {
          this.options = res.data
       })
     },
     listRele() {
        listGp({source:this.civiic,title:this.firm,currentPage:this.pagenum,pageSize:this.pagesize}).then(res=> {
          if(res.code ===1) {
            console.log(res,170)
            this.tableData3 = res.data.datas
            this.total = res.data.total
          }

        })
     },
     firmchange() {  // 搜索框变化的方法
          this.pagenum = 1
          this.listRele()
      },
      correlation() {
           this.arrreli.forEach(element => {
            this.arMsg.push(element.pkid)
            });
            console.log(this.civiic,166)
            console.log(this.pkid,191)
        if(this.pkid) {
          this.arMsg.push(this.pkid)
          this.reStr = this.arMsg.join("|")
          console.log(this.reStr,195)
          
          relivan({idsStr:this.reStr,source:this.civiic}).then(res => {
            console.log(res)
             if(res.code === 1) {
                this.$message({
                     type: 'success',
                     message: res.msg
                 });
             }
          })
        } else {
          console.log('为空')
            this.reStr = this.arMsg.join("|")
          relivan({idsStr:this.reStr,source:this.civiic}).then(res => {
             if(res.code === 1) {
                this.$message({
                     type: 'success',
                     message: res.msg
                 });
             }
          })
        }
      },
      changetab(){
          this.pagenum = 1
           this.listRele()
      },
      handleCurrentChange(val) {  // 当前页改变的函数
         this.pagenum = val
          this.listRele()
      },
      handleSizeChange(val) {  // 每页条数发生改变时做出的函数
         this.pagesize = val
         this.listRele()            
      },
      relevanEdit(index,row){

      },
      relevanDelete(index,row) {
          this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              delpost({pkid:row.pkid,source:this.civiic}).then(res => {
                     this.$message({
                        type: 'success',
                        message: res.msg
                    });
                    this.listRele()
              })
          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '已取消删除'
              });
          }); 
      }
  },
  components: {
  },
  beforeDestroy () {
    localStorage.removeItem('reliTitle')
    localStorage.removeItem('reliSource')
    localStorage.removeItem('relipkid')
  },
  destroyed() {
    localStorage.removeItem('reliTitle')
    localStorage.removeItem('reliSource')
    localStorage.removeItem('relipkid')
  }
}
</script>
<style lang="less" >
 .relevance {
   .el-select {
     margin-right: 15px;
   }
   .rele-title {
     margin: 20px 0;
     font-size: 25px;
   }
   .rele-selction {
     background-color: #f8f8f8;
     margin-top: 30px;
     margin-bottom: 40px; 
     .rele-btn {
       margin-left: 15px;
     }
   }
   .el-table th>.cell {
      text-align: center;
   }
   .el-button+.el-button {
     margin-left: 40px;
   }
   .baa_ai_n {
	    width: 90%;
	    margin-left: 50px;
	    margin-right: 50px;
      margin: 30px auto;
      line-height: 53px;
        .block {
          display: inline-block;
          line-height: 50px;
      }
    }

 }
</style>