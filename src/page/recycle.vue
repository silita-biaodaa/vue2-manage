<template>
   <div class="relevance">
       <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path:'/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/home'}">业务</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path:'/recycle' }">回收站</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row class="rele-selction" >
          <el-col :span='24'>
              <el-select v-model="city" placeholder="请选择" @change='changetab' >
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
              <el-button type="primary" @click='correlation' class="rele-btn" >批量恢复</el-button>
              <el-button type="primary" @click='focusdel' >批量删除</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
               <el-table
                  :data="tableData3"
                  height="450"
                  border
                  @selection-change="handleRelevance"
                  @row-click='mulcheckbox'
                  @row-dblclick='contentlist'
                  ref="moviesTable"
                  style="width: 100%">
                  <el-table-column
                    type="selection"
                     align='center'
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="title"
                    label="项目名称"
                   width="350">
                  </el-table-column>
                  <el-table-column
                    label="发布日期"
                   width='150'>
                  <template slot-scope="scope">{{ scope.row.pubDate | dateFormat }}</template>
                  </el-table-column>
                  <el-table-column
                    prop="srcSite"
                    label="公告来源站点"
                    width='250'>
                  </el-table-column>
                  <el-table-column
                    label="状态"
                    align='center'
                    width="150">
                    <template slot-scope="scope"   >{{ scope.row.delType | del }}</template>
                  </el-table-column>
                 <el-table-column label="操作"  min-width="180" >
                        <template slot-scope="scope">
                            <el-button size="mini" @click="relevanEdit(scope.$index, scope.row)">恢复</el-button>
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

            <!-- 文章标题展示弹框 -->
            <el-dialog
              :title="title"
              :visible.sync="dialogVisible"
              width="50%">
              <span v-html="context" ></span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
              </span>
            </el-dialog>
   </div>
</template>
<script>
import { listrecyc,cycrecover,cycdel,listArea,cyccontent } from '@/api/index'
export default {
  data() {
    return {
      skip:true,
      options:[],
      city:'hunan',
      firm: '',
      total: 10,
      pagenum: '1',
      pagesize: '15',
      tableData3: [],
      title:'',
      pkid:localStorage.getItem('relipkid'),
      arrreli:[],
      arMsg:[],
      reStr:'',
      title:'',
      dialogVisible:false,
      context:''
    }
  },
  created () {
     this.listsou() 
     this.recyclist() 
  },
  filters:{
    del: function (val) {
       if(val == '1') {
         return '程序去重'
       } else if (val == '2') {
         return '程序去重'
       } else if (val == '3') {
         return '人工去重'
       } else {
         return '手动删除'
       }
    }
  },
  mounted () {
    
  },
  methods: {
      // 回收站页面的展示
      recyclist() { 
        listrecyc({title:this.firm,source:this.city,currentPage:this.pagenum,pageSize:this.pagesize}).then(res => {
            if(res.code ===1) {
              this.tableData3 = res.data.list
              this.total = res.data.total
            }
        })
      },
    handleRelevance(val) {
        this.arrreli = val
    },
     listsou(){
       listArea({areaParentId:'0'}).then(res => {
         console.log(res)
          this.options = res.data
       })
      //  this.arrreli.push(this.kpid)
     },
     firmchange() {  // 搜索框变化的方法
          this.pagenum= 1
          this.recyclist()
      },
      focusdel() {
            this.arrreli.forEach(element => {
            this.arMsg.push(element.pkid)
        });
          this.reStr = this.arMsg.join("|")
           cycdel({pkids:this.reStr,source:this.city}).then(res => {
            console.log(res)
             if(res.code === 1) {
                this.$message({
                     type: 'success',
                     message: res.msg
                 });
                this.arrreli = {}
                this.arMsg = []
                this.reStr = ''
                this.recyclist()
             }
          })
      },
      correlation() {
           this.arrreli.forEach(element => {
            this.arMsg.push(element.pkid)
        });
          this.reStr = this.arMsg.join("|")
          cycrecover({pkids:this.reStr,source:this.city}).then(res => {
            console.log(res)
             if(res.code === 1) {
                this.$message({
                     type: 'success',
                     message: res.msg
                 });
                this.arrreli = {}
                this.arMsg = []
                this.reStr = ''
                this.recyclist()
             }
          })
      },
      changetab(){
          this.pagenum = 1
           this.recyclist()
      },
      handleCurrentChange(val) {  // 当前页改变的函数
         this.pagenum = val
          this.recyclist()
      },
      handleSizeChange(val) {  // 每页条数发生改变时做出的函数
        this.pagenum = 1
         this.pagesize = val
         this.recyclist()            
      },
      relevanEdit(index,row){
        cycrecover({pkids:row.pkid,source:this.city}).then(res=> {
          if(res.code === 1) {
            this.$message({
              type:'success',
              message:'恢复成功'
            })
            this.recyclist() 
          }
        })
      },
      relevanDelete(index,row) {
          this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              cycdel({pkids:row.pkid,source:this.city}).then(res => {
                     this.$message({
                        type: 'success',
                        message: res.msg
                    });
                    this.recyclist()
              })
          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '已取消删除'
              });
          }); 
      },
     mulcheckbox(	row, event, column) {
        this.$refs.moviesTable.toggleRowSelection(row)
     },
     contentlist(row,event) {
       this.dialogVisible = true
       this.title = row.title
          cyccontent({source:this.city,ntId:row.ntId}).then(res=> {
             if(res.code === 1 ) {
                this.context = res.data.content
             }
          })
     }
  },
  components: {
  },
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
     margin-left: 20px;
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