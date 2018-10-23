<template>
    <div class="tender">
        
        <el-row class="condition">
            <el-col :span="24" >
                <el-row>
                    <el-col :span="5">
                         省份：
                        <el-select v-model="province" placeholder="请选择" style='width:80%' @change='changetable'>
                           <el-option
                             v-for="item in provinces"
                             :key="item.areaCode"
                             :label="item.areaName"
                             :value="item.areaCode">
                           </el-option>
                         </el-select>
                    </el-col>

                    <el-col :span="5">
                        公告类型：
                        <el-select v-model="state" placeholder="请选择状态" style='width:60%' @change='changetable' >
                            <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="10">
                        <div class="ma-left">
                            <span >发布日期：</span>
                            <el-date-picker v-model="times" type="daterange" style='width:80%' align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2" value-format="yyyy-MM-dd" @change='changetable'>
                            </el-date-picker>
                        </div>
                    </el-col>
                </el-row>
            </el-col>  
        </el-row>

        <el-row>
            <el-col :span="24" class="fl-right">                
                <el-input placeholder="请输入内容" v-model="firm" style="width:30%" @change="firmchange">
                    <i slot="prefix" class="el-input__icon el-icon-search" ></i>
                </el-input>
                <!-- <el-button type="primary" class="fl-left" @click='exportexcel'>导出Excel</el-button >   -->
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">

                <el-table class='baa_ai' :data="tableData" style="width:90%;">
                    <el-table-column label="公告标题" width="400" >
                        <template slot-scope="scope"  >
                            <span>{{ scope.row.title }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="发布日期"  width="150" >
                        <template slot-scope="scope">
                            <span>{{ scope.row.openDate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="公告发布网站" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <a :href="scope.row.url" target="_black" >{{ scope.row.url }}</a>
                        </template>
                    </el-table-column>
                    
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">纠错</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
import { listArea,delpost,errSelect,errDele } from '@/api/index';
export default {
  data () {
    return {
    // city:'',  //市级数据
    citys:[],  //   市级请求数据 
    province:'jiangs',
     provinces: [],
        state:'0',  //公共状态数据
        states:[
            {
                value: '2',
                label: '中标'
            }, {
                value: '0',
                label: '招标'
            }
        ],
         pickerOptions2: {
            shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近一个月',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近三个月',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                }
            }]
         },
          times: [],  //  时间选择器
          firm:'',    //搜索框得数据得
          tableData:[],
          total: 0,
          id:1111 ,
          pubDate:'',
          pubEndDate:'',
          pkid:'033edfc75fb045c9b9e75ea6e3c67f10',
          coDe:'hunan',
          pagesize:15, // 当前页面条数
          pagenum: 1,  //当前页面数
          json:'',
          j:{}
     }  
  },
  watch: {
     times:function () {
         this.pubDate = this.times[0]
         this. pubEndDate = this.times[1]
     },
     province:function() {
        this.pkid= this.province.substring(0,32)
        this.coDe= this.province.substring(32)
     }
  },
  created () {
      this.listTen()
      this.listForm()
  }, 
  filters: {
     
  },
methods: {
      listTen() {         
          listArea({areaParentId:0}).then(res => {
              console.log(res)
              if(res.code === 1 ) { 
                   res.data.forEach(itme => {
                    itme.areaCode = itme.pkid + itme.areaCode
                 })               
                 this.provinces = res.data
              }
          })
      },
      listForm() {
          errSelect({source:this.province,openDate:this.pubDate,openDateEnd:this.pubEndDate,title:this.firm,type:this.state,currentPage:this.pagenum,pageSize:this.pagesize}).then( res => {
              if(res.code == 1 ) {
                  this.total = res.data.total
                  this.tableData = res.data.datas
              }
          })
      },
      firmchange() {  // 搜索框变化的方法
          this.listForm()
      },
      handleEdit(index,row) {  // 编辑框的跳转
        //     this.j.cityCode = this.city,
        //     this.j.ntStatus = this.state
        //     this.j.title = this.firm
        //     this.j.pubDate = this.pubDate
        //     this.j.pubEndDate = this.pubEndDate
        //     this.j.currentPage = this.pagenum
        //     this.j.pageSize = this.pagesize 
        //      this.json = JSON.stringify(this.j)
        //      localStorage.removeItem('tensele')
        //      localStorage.setItem('tensele',this.json)
        //      localStorage.removeItem('indexer')
        //      localStorage.setItem('indexer',index)
             localStorage.removeItem('reId')
             localStorage.setItem('reId',this.pkid)
        // console.log(row);
        const { href } = this.$router.resolve({
              name:'recovery',params: {id:row.id,code:row.province}
          })

   
          window.open(href, '_blank')
      },
      handleDelete(index,row) {
          console.log(row.source);
          console.log(row.id);
          
           this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
            errDele({source:row.source,id:row.id}).then( res => {
                // console.log(res,220);
               if( res.code == 1  ) {
                 this.$message({
                    type:'success',
                    message:'删除公告成功~'
                 })
                 this.listForm()
               }
            })
          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '已取消删除'
              });
          });
      },
      handleCurrentChange(val) {  // 当前页改变的函数
         this.pagenum = val
          this.listForm()
      },
      handleSizeChange(val) {  // 每页条数发生改变时做出的函数
        // console.log(val)
            this.pagenum = 1
         this.pagesize = val  
          this.listForm()
      },
      changetable() {
            this.pagenum = 1
          setTimeout(() => {
              return this.listForm()
          }, 100);                    
      },

  },
  components: {
  }
}
</script>
<style lang="less">
.tender {
   .el-button {
     margin-left:10px;
    }
    .condition {
        background-color: #f8f8f8;
        height: 60px;
        line-height: 60px;  
        padding: 0 10px;
        margin-bottom: 25px;
        font-size: 14px;
    }
    .fl-right {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
        .fl-left {
            margin-left: 20px;
            margin-right: 60px;
        }
    }
    
	.baa_ai,
	.baa_ai_n {
	    width: 90%;
	    margin-left: 50px;
	    margin-right: 50px;
	    margin: 30px auto;
    }
    
    .baa_ai {
        border: 1px solid #ccc;
    }
    
    .block {
        display: inline-block;
        line-height: 50px;
    }
    .el-button+.el-button {
        margin-left: 8px;
    }
    .el-button--mini, .el-button--mini.is-round {
        padding: 7px 10px;
    }


    
}
</style>