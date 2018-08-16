<template>
    <el-table
      :data="tableData"
      style="width: 100%">
       <el-table-column 
        prop="message"
        label=""
        width="150" >
      </el-table-column>
      <el-table-column
        prop="yesterday"
        label="昨日新增"
        width="240">
      </el-table-column>
      
      <el-table-column
        prop="today"
        label="今日新增"
        width="240">
      </el-table-column>
      <el-table-column
        prop="sum"
        label="总数"
        >
      </el-table-column>
    </el-table>
</template>

<script>
   export default {
      data() {
        return {
          tableData: [{
            message:'用户',
           yesterday: '102',
            today: '107',
            	sum: '119'
          }, {
            message:'招标',
            yesterday: '108',
            today: '113',
            sum: '312'
          }, {
            message:'中标',
            yesterday: '65',
            today: '99',
            sum: '999'
          }, {
            message:'企信',
            yesterday: '102',
           today: '210',
           sum: '500'
          }]
        }
      }
    }
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
    .wan{
        .sc(16px, #333)
    }
   .el-table .cell {
    white-space: normal;
    word-break: break-all;
    line-height: 60px;
 }
tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
    line-height: 80px;
}
.el-table tr{
  font-size: 16px;
}


</style>
