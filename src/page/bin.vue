<template>
<el-row>
 <el-row class="bdd_so">
  <el-input placeholder="请输入内容" v-model="input5" class="input-with-select bdd_mi">
    <template slot="append"><el-button slot="append" icon="el-icon-search"></el-button></template> 
  </el-input>
  
 <el-button type="primary">查询</el-button>
  </el-row>
  <el-table class='baa_ai' 
    ref="multipleTable"
    :data="tableData3"
    tooltip-effect="dark"
    style="width: 90%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="公告标题"
      width="200">
      <template slot-scope="scope">{{ scope.row.name }}</template>
    </el-table-column>
    <el-table-column
      prop="date"
      label="公布时间"
      width="200">
    </el-table-column>
    <el-table-column
      prop="address"
      label="公告来源网站"
      show-overflow-tooltip  width="200">
    </el-table-column>
    <el-table-column label="操作"  width="1000">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
           <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">审核</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-row class='baa_ai_n'>
  <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
       @size-change="handleSizeChange">
    </el-pagination>
  </div>
  </el-row>
 </el-row>
</template>

<script>
  export default {
    data() {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: '湖南耀邦建设有限公司',
          address: 'http://www.biaodaa.com/neirong/1848181'
        }, {
          date: '2016-05-02',
          name: '湖南耀邦建设有限公司',
          address: 'http://www.biaodaa.com/neirong/1848181'
        }, {
          date: '2016-05-04',
          name: '湖南耀邦建设有限公司',
          address: 'http://www.biaodaa.com/neirong/1848181'
        }, {
          date: '2016-05-01',
          name: '湖南耀邦建设有限公司',
          address: 'http://www.biaodaa.com/neirong/1848181'
        }, {
          date: '2016-05-08',
          name: '湖南耀邦建设有限公司',
          address: 'http://www.biaodaa.com/neirong/1848181'
        }, {
          date: '2016-05-06',
          name: '湖南耀邦建设有限公司',
          address: 'http://www.biaodaa.com/neirong/1848181'
        }, {
          date: '2016-05-07',
          name: '湖南耀邦建设有限公司',
          address: 'http://www.biaodaa.com/neirong/1848181'
        }],
        multipleSelection: []
      }
    },

    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../style/mixin';
 

	.baa_ai,.baa_ai_n{
		width:90%;
		margin-right:50px;
		margin: 30px auto;
   
   
    }
    .baa_ai{
     border: 1px solid #ccc;
     margin-left: 5%;
     margin-right: 5%;
    }
	.el-select>.el-input{
		width: 100px;	
	}	
	.el-select{
		line-height:30px;
		margin-left:20px;
	}	
	.bdd_yo{
		margin-left:125px;
	}
    .el-tag {
    background-color:white;
    padding: 0 5px;
    line-height: 22px;
    font-size: 12px;
    color: black;
    border-radius: 4px;
    box-sizing: border-box;
	  border: 1px solid transparent;

}
.el-cascader{
  width: 100px;
  margin-top: 10px;
  line-height:20px;
  margin-left: 10px;
 
}
.el-cascader__label{
  line-height: 50px;
}
.block{
  display: inline-block;
  line-height: 50px;
}
.bdd_mi{
  width: 300px;
  padding-left: -60px;
  
}
.bdd_so{
  text-align:right;
  margin-right: 5%;
  margin-top: 150px;
}
.icon-list li i {
    display: block;
    font-size: 32px;
    margin-bottom: 15px;
    color: #606266;
}
.baa_ui{
  line-height: 50px;
}
</style>
