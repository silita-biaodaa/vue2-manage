<template>
  <div class="opinion">
        <el-row>
           <el-col :span='24'>
              <div class="op-til">意见反馈</div>
           </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="op-cen">
                <el-table class='baa_ai' :data="tableData" style="width:100%;">
                    <el-table-column label="意见类别" width="130">
                        <template slot-scope="scope">
                            <span>{{ scope.row.type }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="反馈内容" header-align="center" show-overflow-tooltip > 
                        <template slot-scope="scope">
                            <span>{{ scope.row.content }}</span>
                        </template> 
                    </el-table-column>
                    <el-table-column label="发布时间" width="110">
                        <template slot-scope="scope">
                            <span>{{ scope.row.created }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="用户名称/昵称" width="130">
                        <template slot-scope="scope">
                            <span>{{ scope.row.userName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="手机号码"  width="150" >
                        <template slot-scope="scope">
                            <span>{{ scope.row.phone }}</span>
                        </template> 
                    </el-table-column>
                    <el-table-column label="操作" width='100'>
                        <template slot-scope="scope">
                            <el-button
                            type="primary"
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">查看</el-button>
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
        <el-dialog title="意见反馈内容" :visible.sync="urlFormVisible">
            <div>{{opTitle}}</div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="urlFormVisible = false">关 闭</el-button>
              </div>
        </el-dialog>
  </div>
</template>
<script>
import { feedback} from '@/api/index'
export default {
  data() {
    return {
      pagenum:1,
        pagesize:15,
      tableData:[],
      total:0,
      urlFormVisible:false,
      opTitle:''  
    } 
  },
  methods: {
   gainData() {
       feedback({currentPage: this.pagenum,pageSize:this.pagesize}).then( res => {
            if(res.code == 1 ) {
                this.total = res.data.total
                this.tableData = res.data.list
            }
       }
       )
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
   handleEdit(i,row) {
        this.urlFormVisible = true
        this.opTitle = row.content
   }
  },
  created () {
    this.gainData()
  },
  components: {
  }
}
</script>
<style lang="less">
.opinion {     
  .op-til{
     margin-left: 20px;
     margin-bottom: 20px;
     color: #000;
     font-size: 25px;
     font-weight: 700;
  }
  .op-cen{
    .el-tooltip__popper {
       width: 50%;
    } 
  }

}
 .el-tooltip__popper {
       width: 50%;
    } 
</style>
