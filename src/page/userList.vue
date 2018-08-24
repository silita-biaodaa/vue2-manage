<template>
<el-row>
  <el-row class='baa_ai'>
<el-select class="baa_ui" v-model="value7" placeholder="请选择">
    <el-option-group
      v-for="group in options3"
      :key="group.label"
      :label="group.label">
      <el-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-option-group>
  </el-select>
  <el-tag>昨日新增：1000</el-tag>
  <el-tag>今日新增：1000</el-tag>
  <el-tag>总数：1000</el-tag>

 </el-row>
 <el-row class='baa_ai baa_ui'>
	<el-tag  type="success">筛选</el-tag>
  	<el-tag type="success">所属地区:
   <el-cascader
  :options="options2"
  @active-item-change="handleItemChange"
  :props="props"
></el-cascader>
    </el-tag>
    <el-tag type="success">备案地区：<el-select v-model="value" placeholder="请选择"><el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </el-tag>


 </el-row>
 <el-row class="bdd_so">

   <el-button type="primary">增加企业</el-button>
    <el-button type="primary">批量数据维护</el-button>


  </el-row>
  <el-table class='baa_ai'
    :data="tableData"
    style="width:90%;">
    <el-table-column
       label="公司名称"
      >
      <template slot-scope="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="所属地区"
      >
       <template slot-scope="scope">
        <span>{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column label="创建日期" >
       <template slot-scope="scope">
        <span>{{ scope.row.news }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="最后更新日期"
      width="100">
      <template slot-scope="scope">
        <span>{{ scope.row.stort }}</span>
      </template></el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
           <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">详情</el-button>

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
        tableData: [{
          name: '湖南耀邦建设有限公司',
          date: '2018-7-28',
          news:'http://www.biaodaa.com/neirong/1846263',
          stort:'未处理',

        }, {
          name: '湖南耀邦建设有限公司',
          date: '2018-7-28',
          news:'http://www.biaodaa.com/neirong/1846263',
           stort:'未处理',

        }, {
          name: '湖南耀邦建设有限公司',
          date: '2018-7-28',
          news:'http://www.biaodaa.com/neirong/1846263',
           stort:'未处理',

        }, {
          name: '湖南耀邦建设有限公司',
          date: '2018-7-28',
          news:'http://www.biaodaa.com/neirong/1846263',
           stort:'未处理',

        }]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.button_submit{
		text-align: center;
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 120px;
	    line-height: 120px;
	    text-align: center;
	}
	.avatar {
	    width: 120px;
	    height: 120px;
	    display: block;
	}
	.el-table .info-row {
	    background: #c9e5f5;
	}

	.el-table .positive-row {
	    background: #e2f0e4;
	}
	.baa_ai,.baa_ai_n{
		width:90%;
		margin-left:50px;
		margin-right:50px;
		margin: 30px auto;


    }
    .baa_ai{
 border: 1px solid #ccc;
    }
	.el-select>.el-input{
		width: 100px;
	}
	.el-select{
		line-height:px;
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
