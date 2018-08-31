<template>
    <div class="tender">
        
        <el-row class="condition">
            <el-col :span="24" >
                <el-row>
                    <el-col :span="7">
                         省份：
                       <!-- <el-cascader :options="provinces" v-model="province" change-on-select style="width:80%" placeholder="请选择省市" @active-item-change="handleItemChange" :props="props" ></el-cascader> -->
                        <el-select v-model="province" placeholder="请选择" style='width:30%'>
                           <el-option
                             v-for="item in provinces"
                             :key="item.area_code"
                             :label="item.area_name"
                             :value="item.area_code">
                           </el-option>
                         </el-select>
                        市级：
                        <el-select v-model="city" placeholder="请选择" style='width:30%'>
                           <el-option
                             v-for="item in citys"
                             :key="item.area_code"
                             :label="item.area_name"
                             :value="item.area_code">
                           </el-option>
                         </el-select>
                    </el-col>

                    <el-col :span="5">
                        公共状态：
                        <el-select v-model="state" placeholder="请选择状态" style='width:60%'>
                            <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="10">
                        <div class="ma-left">
                            <span >发布日期：</span>
                            <el-date-picker v-model="times" type="daterange" style='width:80%' align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2" value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </div>
                    </el-col>
                    <el-col :span="2">
                         <el-button type="primary" @click="selectword">确定</el-button>    
                    </el-col>
                </el-row>
            </el-col>  
        </el-row>

        <el-row>
            <el-col :span="24" class="fl-right">                
                <el-input placeholder="请输入内容" v-model="firm" style="width:30%" @change="firmchange">
                    <i slot="prefix" class="el-input__icon el-icon-search" ></i>
                </el-input>
                <el-button type="primary" class="fl-left">导出Excel</el-button >  
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
                            <span>{{ scope.row.pub_date }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="公告发布网站">
                        <template slot-scope="scope">
                            <span>{{ scope.row.src_site }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="公告状态" width="100">
                        <template slot-scope="scope">
                            <span>{{ scope.row.nt_status | sum }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">审核</el-button>
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
import { listArea,listStatus,listMain } from '@/api/index';
export default {
  data () {
    return {
    city:'',  //市级数据
    citys:[],  //   市级请求数据 
    province:'',
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
            }, {
                value: '2',
                label: '已审核'
            }, {
                value: '3',
                label: '未审核'
            },
            {
                value:'4',
                label:'审核未通过'
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
          total: 600,
          id:1111 ,
          pubDate:'',
          pubEndDate:'',
          pkid:'',
          code:'',
          pagesize:15, // 当前页面条数
          pagenum: 1  //当前页面数

     }  
  },
  watch: {
     times:function () {
         this.pubDate = this.times[0]
         this. pubEndDate = this.times[1]
     },
     province:function() {
        this.pkid= this.province.substring(0,1)
        this.code= this.province.substring(1)
        listArea({areaParentId:this.pkid}).then(res => {
            if(res.code === 1) {
                this.citys = res.data
            }
        })
     }
  },
  created () {
      this.listTen()
      this.listForm()
  }, 
  filters: {
     sum:function(value){
         if(value ==='0') {
             return '未编辑'
         } else if(value === '1') {
             return '已编辑'
         } else if(value === '2') {
             return '已审核'
         } else if(value === '3') {
             return '未审核'
         } else  {
             return '已审核未通过'
         }
     }
  },
methods: {
      listTen() {
          listArea({areaParentId:0}).then(res => {
              if(res.code === 1 ) {
                 res.data.forEach(itme => {
                    itme.area_code = itme.pkid + itme.area_code
                 })
                 this.provinces = res.data
                 console.log(this.provinces)
              }
          })

      },
      listForm() {
          listMain({source:this.code,proviceCode:this.code,cityCode:this.city,ntStatus:this.state,ntCategory:1,title:this.firm,pubDate:this.pubDate,pubEndDate:this.pubEndDate,currentPage:this.pagenum,pageSize:this.pagesize}).then(res => {
              console.log(res)
            if(res.code ===1) {
                this.tableData = res.data.datas
                console.log(this.tableData)
            }
          })
      },
      firmchange() {  // 搜索框变化的方法
          console.log(this.firm)
      },
      handleEdit(index,row) {  // 编辑框的跳转 
        const { href } = this.$router.resolve({
              name:'compile',params: {id:row.name}
          })
   
          window.open(href, '-blank')
      },
      handleDelete(index,row) {
           this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
               this.$message({
                   type: 'success',
                   message: '删除成功!'
               });
          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '已取消删除'
              });
          });
      },
      handleCurrentChange() {  // 当前页改变的函数
         this.pagenum = val
      },
      handleSizeChange() {  // 每页条数发生改变时做出的函数
         this.pagesize = val  
      },
      selectword() {
          console.log(this.state)
          console.log(this.times)
          console.log(this.pubDate)
          console.log(this.pubEndDate)
          this.listForm()
      }

  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.tender {
    .condition {
        border: 1px solid #000;
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



    
}
</style>