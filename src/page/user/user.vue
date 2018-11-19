<template>
 <div class="user">
     <el-row class="top">
         <el-col :span='6' >
            <el-select v-model="topcity" placeholder="请选择省份" @change="register" >
              <el-option
                v-for="item in optionsss"
                :key="item.areaShortName"
                :label="item.areaShortName"
                :value="item.areaCode">
              </el-option>
            </el-select> 
         </el-col>
         <el-col :span="4">
            昨日新增:{{yesterday}}
         </el-col>
         <el-col :span="4">
            今日新增:{{today}}
         </el-col>
         <el-col :span="4">
            总数:{{all}}
         </el-col>
     </el-row>
     <el-row class="user-con">
        <div>
           <el-col :span='7'>
             所属地区:
              <el-select v-model="value" placeholder="请选择省份" style="width:40%" @change="getCity" >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.areaShortName"
                  :value="item.areaCode">
                </el-option>
              </el-select>   
                <el-select v-model="city" placeholder="市区" style="width:30%">
                    <el-option
                      v-for="item in optionss"
                      :key="item.value"
                      :label="item.areaName"
                      :value="item.areaCode">
                    </el-option>
              </el-select> 
           </el-col>
           <el-col :span='4'>
              性别:   
                <el-select v-model="gender" placeholder="性别" style="width:70%">
                    <el-option
                      v-for="item in sex"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
              </el-select> 
           </el-col>
           <el-col :span="11">
             注册时间:
               <el-date-picker v-model="newtime" type="daterange" style='width:80%' align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2" value-format="yyyy-MM-dd" >
                 </el-date-picker>
           </el-col>
        </div>
     </el-row>
     <el-row class="user-con" >
        <el-col :span="6" class="user-sel" >
            <el-input
              placeholder="请输入内容"
              v-model="select"
              clearable>
            </el-input>
        </el-col>
        <el-button type="primary"  @click='gainDate' >查询</el-button>
     </el-row>
      <el-row>
        <el-col>
             <el-table
              :data="tableData"
              style="width: 100%">
              <!-- <el-table-column
                label="ID"
                width="100">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.pkid }}</span>
                </template>
              </el-table-column> -->
              <el-table-column
                label="昵称"
                width="100">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.nikeName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="姓名"
                width="100">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.userName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="性别"
                width="100">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.sex }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="地区"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.province }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="手机号码"
                width="150">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.phoneNo }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="公司"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.company }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="职位"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.position }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="注册时间"
                width="150">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.created }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"  :disabled="btn(scope.row)" >锁定</el-button>
                </template>
              </el-table-column>
            </el-table>
        </el-col>  
      </el-row>
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
import { listArea,userAll,userData } from '@/api/index'
export default {
  data () {
     return {
       province:'',
       citys:'',
       select:'',
         options: [],
         city:'',
         optionss:[],
         topcity:'',
         optionsss:[],
        value:'',
        yesterday:0,
        pagenum:1,
        pagesize:15,
        today:0,
        total:0,
        tableData:[],
        all:0,
        newtime:'',
        sex:[
          {label:'男',
           value:'1' 
          },{
            label:'女',
           value:'2'
          }
        ],
        gender:'',
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
     }
  },
  created () {
    this.getprovince()
    this.register()
    this.gainDate()
  },
  methods: {
    gainDate() {
        userData({currentPage:this.pagenum,pageSize:this.pagesize,provCode:this.citys,cityCode:this.city,startDate:this.newtime[0],endDate:this.newtime[1],sex:this.gender,keyWord:this.select,}).then( res=> {
            if(res.code == 1) {
               this.tableData =res.data.list
               this.total = res.data.total
            }
        } 
          
      )
    },
     getprovince() {
        listArea({areaParentId:'0'}).then( res => {
          if(res.code == 1) {
            this.optionsss = res.data
            this.optionsss.unshift({areaShortName:'全部',areaCode:''})
             res.data.forEach( el => {
                el.areaCode = el.pkid + el.areaCode
             });
              this.options = res.data  
           }
        })
    },
    getCity(val) {
      this.city =''
       this.province =  val.slice(0,32)
       this.citys = val.slice(32)
       listArea({areaParentId:this.province}).then(res => {
          this.optionss = res.data
       })
    },
    register(val){
      val == 'undefined' ? (val='') : val 
      userAll({provCode:val}).then( res=> {
         if(res.code ==1) {
            this.all = res.data.total
            this.today = res.data.todayCount
            this.yesterday = res.data.yesterdayCount
         }
      })
    },
    handleDelete(i,val) {

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
   btn(val) {
      if(val.isEnable) {
        return false
      } else {
         return true 
      }
   }
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.user {
  .top{
     background-color: #eee;
     line-height: 50px;
     padding-left: 15px;
     margin-bottom: 20px;
  }
  .user-con {
     padding-left: 15px;
     background-color: #eee;
     line-height: 50px;
     margin-bottom: 20px;
  }
  .user-sel {
     padding-right: 20px;
  }
}
</style>