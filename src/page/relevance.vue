<template>
   <div class="relevance">
       <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path:'/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/home'}">业务</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path:'/relevance' }">相关公告</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="rele-selction" >
          <el-col :span='24'>
              <el-input placeholder="请输入内容" v-model="firm" style="width:30%" @change="firmchange">
                  <i slot="prefix" class="el-input__icon el-icon-search" ></i>
              </el-input>
              <el-button type="primary" @click='correlation' class="rele-btn">关联已选择的公告</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
               <el-table
                  :data="tableData3"
                  height="450"
                  border
                  style="width: 100%">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="项目名称"
                   width="350">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="发布日期"
                   width='150'>
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="公告来源站点"
                    width='250'>
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="状态"
                    width="150">
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
export default {
  data() {
    return {
      firm: '',
      total: 10,
      pagenum: '',
      pagesize: '',
      tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
    }
  },
  methods: {
     firmchange() {  // 搜索框变化的方法
          console.log(this.firm)
      },
      correlation() {

      },
      handleCurrentChange(val) {  // 当前页改变的函数
         this.pagenum = val
          
      },
      handleSizeChange(val) {  // 每页条数发生改变时做出的函数
        console.log(val)
         this.pagesize = val            
      },
      relevanEdit(index,row){

      },
      relevanDelete(index,row) {

      }
  },
  components: {
  }
}
</script>
<style lang="less" >
 .relevance {
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