<template>
    <div class="tender">
        
        <el-row class="condition">
            <el-col :span="24" >
                <el-row>
                    <el-col :span="7">
                        地区：
                        <el-cascader :options="provinces" v-model="province" change-on-select style="width:80%" placeholder="请选择省市"></el-cascader>
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
                            <el-date-picker v-model="times" type="daterange" style='width:80%' align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                            </el-date-picker>
                        </div>
                    </el-col>
                    <el-col :span="2">
                         <el-button type="primary">确定</el-button>    
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
                            <span>{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="发布日期">
                        <template slot-scope="scope">
                            <span>{{ scope.row.date }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="公告发布网站">
                        <template slot-scope="scope">
                            <span>{{ scope.row.news }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="公告状态" width="100">
                        <template slot-scope="scope">
                            <span>{{ scope.row.stort }}</span>
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
                         :page-sizes="[100, 200, 300, 400]" 
                         :page-size="100" 
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
  data () {
    return {
    province:[],
     provinces: [{  //省市数据
            value: 'zhinan',
            label: '指南',
            children: [{
                value: 'shejiyuanze',
                label: '设计原则',
                children: [{
                    value: 'yizhi',
                    label: '一致'
                }, {
                    value: 'fankui',
                    label: '反馈'
                }, {
                    value: 'xiaolv',
                    label: '效率'
                }, {
                    value: 'kekong',
                    label: '可控'
                }]
            }, {
                value: 'daohang',
                label: '导航',
                children: [{
                    value: 'cexiangdaohang',
                    label: '侧向导航'
                }, {
                    value: 'dingbudaohang',
                    label: '顶部导航'
                }]
            }]
        }],
        state:'',  //公共状态数据
        states:[
            {
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
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
          times: '',
          firm:'',
          tableData:[{   //表格数据  
              name: '湖南耀邦建设有限公司',
              date: '2018-7-28',
              news: 'http://www.biaodaa.com/neirong/1846263',
              stort: '未处理',

          }, {
              name: '湖南耀邦建设有限公司',
              date: '2018-7-28',
              news: 'http://www.biaodaa.com/neirong/1846263',
              stort: '未处理',

          }, {
              name: '湖南耀邦建设有限公司',
              date: '2018-7-28',
              news: 'http://www.biaodaa.com/neirong/1846263',
              stort: '未处理',

          }, {
              name: '湖南耀邦建设有限公司',
              date: '2018-7-28',
              news: 'http://www.biaodaa.com/neirong/1846263',
              stort: '未处理',

          }],
          total: 600,
          id:1111 
     }  
  },
  watch: {
   
  },
  methods: {
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
           
      },
      handleSizeChange() {  // 每页条数发生改变时做出的函数

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