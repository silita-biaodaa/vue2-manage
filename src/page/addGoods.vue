<template>
    <div class="tender">
        
        <el-row class="condition">
            <el-col :span="24" >
                <el-row>
                    <el-col :span="9">
                         省份：
                        <el-select v-model="province" placeholder="请选择" style='width:35%' @change='changetable'>
                           <el-option
                             v-for="item in provinces"
                             :key="item.areaCode"
                             :label="item.areaName"
                             :value="item.areaCode">
                           </el-option>
                         </el-select>
                        市级：
                        <el-select v-model="city" placeholder="请选择" style='width:35%' @change='changetable'>
                           <el-option
                             v-for="item in citys"
                             :key="item.areaCode"
                             :label="item.areaName"
                             :value="item.areaCode">
                           </el-option>
                         </el-select>
                    </el-col>
                    <el-col :span="5">
                        公告状态：
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
                <el-button type="primary" class="fl-left" @click='exportexcel'>导出Excel</el-button >  
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">

                <el-table class='baa_ai' :data="tableData" style="width:90%;">
                    <el-table-column label="公告标题">
                        <template slot-scope="scope">
                            <span>{{ scope.row.title }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="发布日期">
                        <template slot-scope="scope">
                            <span>{{ scope.row.pubDate }}</span>
                        </template> 
                    </el-table-column>
                    <el-table-column label="公告发布网站">
                        <template slot-scope="scope">
                            <span>{{ scope.row.srcSite }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="公告状态" width="100">
                        <template slot-scope="scope">
                            <span>{{ scope.row.ntStatus | sum }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">审核</el-button> -->
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
import { exportX,listArea,listStatus,listMain,listExcel,delbiding } from '@/api/index';
export default {
  data () {
    return {
    city:'',  //市级数据
    citys:[],  //   市级请求数据 
    province:'15fb9d5310ab4f7b9375884df98d45d8hunan',
     provinces: [],
        state:'',  //公共状态数据
        states:[
             {
                value: '',
                label: '全部'
            }, {
                value: '0',
                label: '未编辑'
            }, {
                value: '1',
                label: '已编辑'
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
          pkid:'15fb9d5310ab4f7b9375884df98d45d8',
          coDe:'hunan',
          pagesize:15, // 当前页面条数
          pagenum: 1,  //当前页面数
          json:'',
          j:{}
     }  
  },
  watch: {
     times:function () {
         if(this.times) {
            this.pubDate = this.times[0] 
            this. pubEndDate = this.times[1]      
          } else {
             this.pubDate = ''
             this. pubEndDate = ''
          }
     },
     province:function() {
        this.city = ''
        this.pkid= this.province.substring(0,32)
        this.coDe= this.province.substring(32)
         this.gainCity()
     }
  },
  created () {
      this.listTen()
      this.listForm()
      this.gainCity()
  }, 
  filters: {
     sum:function(val){
         switch (val) {
             case '0':
               return '未编辑'  
                 break;
             case '1':
               return '已编辑'  
                 break;
                 case '2':
               return '已审核'  
                 break;
                 case '4':
               return '未通过'  
                 break;
                 case '5':
               return '已处理'  
                 break;  
         }
     }
  },
methods: {
      listTen() {         
          listArea({areaParentId:0}).then(res => {
              console.log(res,232)
              if(res.code === 1 ) {
                 res.data.forEach(itme => {
                    itme.areaCode = itme.pkid + itme.areaCode
                 })                 
                 this.provinces = res.data
              }
          })
        

      },
      gainCity() {
         listArea({areaParentId:this.pkid}).then(res => {
            if(res.code === 1) {               
                this.citys = res.data
                this.citys.unshift({areaName:'全部',areaCode:''})
            }
        })
      },
      listForm() {
          listMain({source:this.coDe,proviceCode:this.coDe,cityCode:this.city,ntStatus:this.state,ntCategory:2,title:this.firm,pubDate:this.pubDate,pubEndDate:this.pubEndDate,currentPage:this.pagenum,pageSize:this.pagesize}).then(res => {

            if(res.code ===1) {
                this.tableData = res.data.datas
                this.total = res.data.total
            }
          })
      },
      firmchange() {  // 搜索框变化的方法
          this.listForm()
      },
      handleEdit(index,row) {  // 编辑框的跳转
            this.j.cityCode = this.city,
            this.j.ntStatus = this.state
            this.j.title = this.firm
            this.j.pubDate = this.pubDate
            this.j.pubEndDate = this.pubEndDate
            this.j.currentPage = this.pagenum
            this.j.pageSize = this.pagesize 
             this.json = JSON.stringify(this.j)
             localStorage.removeItem('tensele')
             localStorage.setItem('tensele',this.json)
             localStorage.removeItem('indexer')
             localStorage.setItem('indexer',index)
             localStorage.removeItem('bidId')
             localStorage.setItem('bidId',this.pkid)
        
        const { href } = this.$router.resolve({
              name:'bidding',params: {id:row.pkid,code:this.coDe}
          })
   
          window.open(href, '_blank')
      },
      handleDelete(index,row) {
           this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              delbiding({pkid:row.pkid,source:this.coDe}).then(res => {
                     this.$message({
                        type: 'success',
                        message: res.msg
                    });
                    this.listForm()
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
        console.log(val)
         this.pagesize = val  
          this.listForm()
      },
      changetable() {
            this.pagenum = 1
          setTimeout(() => {
              return this.listForm()
          }, 100);                    
      },
      exportexcel(){
          exportX({source:this.coDe,proviceCode:this.coDe,cityCode:this.city,ntStatus:this.state,ntCategory:2,title:this.firm,pubDate:this.pubDate,pubEndDate:this.pubEndDate,currentPage:this.pagenum,pageSize:this.pagesize},{responseType: 'blob',timeout:300000}).then(res=> {
               const blob = new Blob([res]);
                const fileName = '中标公告.xlsx';
                const elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href); // 释放URL 对象
                document.body.removeChild(elink);
          })
     
      }

  },
  components: {
  }
}
</script>
<style lang="less">
.tender {
    .condition {
        background-color: #f8f8f8;
        height: 60px;
        line-height: 60px;  
        padding: 0 10px;
        margin-bottom: 25px;
        font-size: 14px;
    }
    .fl-right {
      text-align: right;
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