<template>
    <div class="alia">  
        <div class="right-apti">
          <p>资&nbsp;&nbsp;&nbsp;质:</p>
          <el-input placeholder="曾丹是个傻子" v-model="input2" disabled>
          </el-input>
        </div> 
         <div class="right-search">
          <p>资质别名:</p>
          <el-input placeholder="请输入...." v-model="aliaput" class="search-put">
          </el-input>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button type="primary" icon="el-icon-edit">添加</el-button>
          <el-button type="primary">上传
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
        </div>     

        
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="资质别名" width="310">
              <template slot-scope="scope">
                <i class="el-icon-caret-right"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>



    </div>




</template>
<script>
export default {
  data () {
    return {
      input2:'',
      aliaput:'',
       tableData: [{
        date: '建筑工程施工总承包',
      }, {
        date: '建筑工程总承包',
      }, {
        date: '建筑总承包',
      }, {
        date: '别名4',
      }],
      editDialogFormVisible: false,
      editForm:{
        username:'',
        email:''
      }
    }
  },
  components: {
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    editUserSubmit(editAliasForm) {

    }
  }
}
</script>
<style lang="less" scoped>
.alia{
  .right-apti {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
    p {
      margin-right: 10px;
      width: 55px;
      line-height: 40px;
      height: 40px;
      font-size: 16px;
    }
  }
  .right-search {
     display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
    p {
      margin-right: 5px;
      width: 140px;
      line-height: 40px;
      font-size: 12px;
    }
    .search-put {
      margin-right: 10px;
    }
  }
}
</style>