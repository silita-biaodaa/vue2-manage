
<template>
 <div class="financial">
     <el-row class="top">
         <el-col :span='9'>
            提交时间:
            <el-date-picker
              v-model="times"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2">
            </el-date-picker>
         </el-col>
         <el-col :span='6'>
              <el-input
                  placeholder="请输入借款人姓名，项目名称进行搜索"
                  v-model.trim="select"
                  clearable>
                </el-input>
         </el-col>
         <el-col :span='7' class="fin" >
              <el-button type="primary"  @click='gainDate' >查询</el-button>
              <el-button type="primary"  @click='educe' >导出Excel</el-button>
         </el-col>
     </el-row>
      <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                label="地区"
                width="100">
                <template slot-scope="scope">
                  <span >{{ scope.row.proRegion }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="开标时间"
                width="150">
                <template slot-scope="scope">
                  <span >{{ scope.row.proOpenTime }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="项目名称"
                width="220">
                <template slot-scope="scope">
                  <span >{{ scope.row.proName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="借款金额"
                width="150">
                <template slot-scope="scope">
                  <span >{{ scope.row.balance }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="借款人"
                width="150">
                <template slot-scope="scope">
                  <span>{{ scope.row.borrower }}</span>
                </template>
              </el-table-column>
               <el-table-column
                label="联系方式"
                width="150">
                <template slot-scope="scope">
                  <span >{{ scope.row.borrowerPhone }}</span>
                </template>
              </el-table-column>
               <el-table-column
                label="借款时间"
                width="150">
                <template slot-scope="scope">
                  <span >{{ scope.row.borrowerTime }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="提交时间"
                width="180">
                <template slot-scope="scope">
                  <span >{{ scope.row.created }}</span>
                </template>
              </el-table-column>           
            </el-table>
              <el-row class='baa_ai_n'>
                      <el-col :span="24">
                        <div >
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
import { finData,finEX } from '@/api/index'
export default {
  data() {
    return {
      tableData:[],
      times:[],
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
         select:'',
         pagenum:1,
         pagesize:15,
        total:0,
    }
  },
  created () {
     this.gainData()
  },
  methods: {
  gainDate() {
      this.pagenum = 1
      this.gainData()
  },
  gainData() {
     this.startDate = this.times ? this.times[0] : ''
       this.endDate = this.times ? this.times[1] : ''
     finData({proName:this.select,created:this.startDate,createdTwo:this.endDate,currentPage:this.pagenum,pageSize:this.pagesize}).then(res=> {
        if(res.code == 1) {
          console.log(res)
           this.tableData = res.data.datas 
           this.total = res.data.total
        }
     })
  },
  handleCurrentChange(val) {  // 当前页改变的函数
      this.pagenum = val
      this.gainData()
   },
   handleSizeChange(val) {  // 每页条数发生改变时做出的函数
      this.pagesize = val  
      this.pagenum = 1
      this.gainData()
   },
   educe() {
        this.startDate = this.newtime ? this.newtime[0] : ''
        this.endDate = this.newtime ? this.newtime[1] : ''
        finEX({proName:this.select,created:this.startDate,createdTwo:this.endDate},{responseType: 'blob'}).then(res=> {
               const blob = new Blob([res]);
                const fileName = '金融数据.xlsx';
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
  }
}
</script>
<style lang="less" scoped>
  .financial {
    .top {
       margin-bottom: 20px;
       background-color: #eee;
       line-height: 50px;
    }
      .fin {
         padding-left: 15px;
      }
  }
</style>