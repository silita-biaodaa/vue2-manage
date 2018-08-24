
<template>
  <div class="aptitudes">

    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12" class="line">

        <el-row>
          <el-col :span='24'>
            <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="ruleForm">

              <el-form-item label="资质类型">
                <el-select v-model="formInline.region" placeholder="资质类型">
                  <el-option v-for="item in type" :key="item.id" :label="item.quaName" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="资质名称">
                <el-input v-model="formInline.user" placeholder="资质名称"></el-input>
              </el-form-item>
              <el-button type="primary" @click="addCategory">添加资质</el-button>
              <el-button type="primary" @click="query('ruleForm')">查询资质</el-button>
            </el-form>
          </el-col>
        </el-row>

        <hr/>

        <div class="form-type">
          <el-table height="950" @row-click='delivery' :data="tableName" style="width: 100%">
            <el-table-column label="资质类型" style="width: 33.3%">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.parentName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="资质名称" style="width: 33.3%">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>资质名称: {{ scope.row.quaName }}</p>
                  <div slot="reference" class="name-wrapper">
                    <span size="medium">{{ scope.row.quaName }}</span>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="amendaptitudes(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteapti(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>

      <el-col :span="12" class="right">

        <el-menu class="menu" mode="horizontal" @select="handleSelect" background-color="#99a9bf" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="1" @click='noticeAlias'>资质别名</el-menu-item>
          <el-menu-item index="2" @click='noticeLevel'>公告资质等级</el-menu-item>
          <el-menu-item index="3" @click='noticeFirm'>企业资质等级</el-menu-item>
        </el-menu>

        <div class="alia">
          <div class="right-apti">
            <p>资&nbsp&nbsp&nbsp质:</p>
            <input placeholder="请先选择资质名称" v-model="selectApti" disabled class="disappear">
            </input>
          </div>
          <div class="right-search">

            <el-input placeholder="请输入搜索或添加的名称...." v-model="aliaput" class="search-put" v-show='changebut'>
            </el-input>

            <el-select v-model="svalue" placeholder="请选择" v-show='!changebut'>
              <el-option v-for="item in single" :key="item.id" :label="item.name" :value="item.id" >
              </el-option>
            </el-select>


            <el-select v-model="mvalue" multiple collapse-tags style="margin-left: 20px" placeholder="请选择" v-show='!changebut'>
              <el-option v-for="item in multiple" :key="item.id" :label="item.name" :value="item.code">
              </el-option>
            </el-select>
          </div>

          <!--文件上传的控件 -->
          <div class="right-search">

            <el-button type="primary" icon="el-icon-edit" @click='addNewalias'>添加</el-button>
            <transition name="my">
              <el-button type="primary" icon="el-icon-search" v-show='changebut' @click='selectWord'>搜索</el-button>
            </transition>
            <el-upload class="updown-list" action="http://120.79.116.245:19004/upload/quaAlias/" :on-preview="handlePreview" :data="sendCode()" :on-success="handleSuccess" :headers="setHeader()" :before-remove="beforeRemove" :show-file-list='false' multiple :limit="100" v-show='changebut' :on-exceed="handleExceed" :file-list="fileList">
              <el-button type="primary">
                <i class="el-icon-upload el-icon--right"></i>
                上传
              </el-button>
            </el-upload>

          </div>

          <el-table :data="tableData" style="width: 100%" max-height='760'>
            <el-table-column :label="searchname" width="310">
              <template slot-scope="scope">
                <i class="el-icon-caret-right"></i>
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" v-show='changebut' @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

      </el-col>
    </el-row>

    <!-- 添加分类弹框 -->
    <el-dialog title="添加资质" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm" label-width="80px" :rules="rules" ref="addCateForm">
        <el-form-item label="资质名称" prop="cat_name">
          <el-input v-model="addForm.cat_name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="父级名称" prop="cat_name" >
          <el-select v-model="addForm.fatherid" placeholder="资质类型">
            <el-option v-for="item in type" :key="item.id" :label="item.quaName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCateSubmit('addCateForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改资质弹框 -->
    <el-dialog title="修改资质" :visible.sync="amendFormVisible">
      <el-form :model="amendForm" label-width="100px"  ref="amendForm">
        <el-form-item label="原资质名称:">
          <el-input v-model="amendForm.old_name" auto-complete="off" disabled></el-input>
        </el-form-item>

        <el-form-item label="新资质名称:" >
          <el-input v-model="amendForm.new_name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="amendFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="amendSubmit('amendForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑资质别名弹框 -->
    <el-dialog title="编辑" :visible.sync="redactFormVisible">
      <el-form :model="redactForm" label-width="100px" :rules="rules" ref="amendForm">
        <el-form-item label="原名称:">
          <el-input v-model="redactForm.old_name" auto-complete="off" disabled></el-input>
        </el-form-item>

        <el-form-item label="新名称:" prop="new_aptitudes">
          <el-input v-model="redactForm.new_name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="redactFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="redactSubmit('redactForm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { checkType, queryList, curd, deleteApi, addAlias, uploadAlias, delectAlias, showAlias, showLevel, addLevel, showtLevel, addtAlias, selectAlias, amendAlias, secondLevel, addtLevel, showgrade, delgrade, firstgrade } from "@/api/index";

export default {
  data() {
    return {
      type: [],
      changebut: true,
      // 资质类型下拉列表
      //  上传文件
      fileList: [],
      // 资质选择的
      formInline: {
        user: '',
        region: ''
      },
      option: [

      ],
      selectedOptions: [], // 级联选择器选中后的数据
      selectedOptions2: [],
      addForm: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      addDialogFormVisible: false,
      // props表示配置级联选择器展示的数据字段
      props: {
        value: 'cat_id',
        label: 'cat_name'
      },
      rules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ],
        new_aptitudes: [
          { required: true, message: '请输入新资质名称', trigger: 'blur' }
        ]
      },
  
      //  修改资质弹框
      amendFormVisible: false,
      amendForm: {
        new_name: ''
      },
      // 编辑的别名的弹框
      redactFormVisible: false,
      redactForm: {
        new_name: '',
        old_name: '',
        id: ''
      },
      // 单选下拉框
      single: [

      ],
      svalue: "",
      //多选下拉框
      multiple: [
      ],
      mvalue: [],
      newmvalue:'',

      //  查询列表的数据
      tableName: [

      ],

      defaultProps: {
        children: 'children',
        label: 'label'
      },
      selectApti: '',
      input2: '',
      aliaput: '',
      tableData: [],
      editDialogFormVisible: false,
      editForm: {
        username: '',
        email: ''
      },
      searchname: '资质别名',
      stdCode: '',
      parentId: ''
    }
  },
  components: {
  },
  created() {
    this.initList()
  },
  watch: {
    svalue: function(newId,oldId){
       this.seList(this.svalue)
    },
    mvalue: function(){
     this.stringto()
    }
  },
  methods: {
    stringto() {
        this.newmvalue = this.mvalue.join(",").replace(/,/g, "|")
    },
    seList(val) {
        secondLevel({parentId:val}).then(res => {
            if(res.code === 1 ) {
              this.multiple = res.data
            }
            this.newmvalue = ''
            this.mvalue= []
        })
    },
    sendCode() {
      return { quaCode: this.stdCode }
    },
    handleChange(value) {
      console.log(value)
    },
    // 页面挂架初始化的
    initList() {
      checkType().then(res => {
        if (res.code === 1) {
          this.type = res.data
        }
      }),
      queryList({ quaName: '', parentId: '' }).then(res => {
        if (res.code === 1) {
          this.tableName = res.data
          this.selectApti = this.tableName[0].quaName
          this.stdCode = this.tableName[0].quaCode
            selectAlias({ stdCode: this.stdCode, name: '', stdType: '1' }).then(res => {
              if (res.code === 1) {
                this.tableData = res.data
              }
            })
          
        }
      })
    },
    // 弹框得添加分类
    addCateSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.addForm.cat_name.trim()) {
         if(this.addForm.fatherid ) {
            curd({ parentId: this.addForm.fatherid, quaName: this.addForm.cat_name }).then(res => {
              // console.log(res)
              if (res.code === 1) {
                queryList({ parentId: this.addForm.fatherid }).then(res => {
                  if (res.code === 1) {
                    this.tableName = res.data
                  }
                })
                 this.addDialogFormVisible = false
                 this.addForm.cat_name = ''
              }else {
                  this.$message({
                  type: 'warning',
                  message: res.msg
                });
              }
            })
           
         } else {
           this.$message({
             type: 'warning',
             message: '请选择父级资质!'
           });
         }
          
        } else {
           this.$message({
            type: 'warning',
            message: '请输入资质名称!'
          });
        }
      });
      
     
    },
    //删除
    deleteapti(index, row) {

      this.$confirm('此操作将永久删除该资质, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteApi({ id: row.id }).then(res => {
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.tableData = []
            this.selectApti = ''
          }
          queryList({ quaName: this.formInline.user, parentId: this.formInline.region }).then(res => {
            if (res.code === 1) {
              this.tableName = res.data
            }
          })
        })  
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    addCategory() {
      this.addDialogFormVisible = true
    },
    query(formName) {

      this.$refs[formName].validate((valid) => {
        if (valid) {

          queryList({ quaName: this.formInline.user, parentId: this.formInline.region }).then(res => {
            if (res.code === 1) {
              this.tableName = res.data
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleSelect() {

    },
    handleEdit(index, row) {
      this.redactFormVisible = true
      this.redactForm.old_name = row.name
      this.redactForm.id = row.id
    },
    redactSubmit() {
        if(!this.redactForm.new_name) {
          return this.$message({
                    type: 'warning',
                    message: '请先添写新别名'
                  });
        }
      
      amendAlias({ id: this.redactForm.id, name: this.redactForm.new_name }).then(res => {
        if (res.code === 1) {
          this.$message({
            type: 'success',
            message: res.msg
          });
          selectAlias({ stdCode: this.stdCode, name: this.aliaput, stdType: '1' }).then(res => {
            console.log(res.data)
            if (res.code === 1) {
              this.tableData = res.data
            }
          })
        } else {
          this.$message({
            type: 'info',
            message: res.msg
          });
        }
      })

      this.redactFormVisible = false
      this.redactForm.new_name = ''
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该资质, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        if(this.searchname === '资质别名') {
              delectAlias({ idsStr: row.id }).then(res => {
              if (res.code === 1) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
              selectAlias({ stdCode: this.stdCode, name: this.aliaput, stdType: '1' }).then(res => {
                if (res.code === 1) {
                  this.tableData = res.data
                }
              })
            })
        } else {
            delgrade({ id: row.id }).then(res => {
              if (res.code === 1) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
             if(this.searchname === '公告等级') {
                showgrade({ quaCode: this.stdCode, bizType: 1 }).then(res => {
                  this.tableData = res.data
                  console.log(res)
                })
            } else {
              showgrade({ quaCode: this.stdCode, bizType: 2 }).then(res => {
                this.tableData = res.data
                console.log(res)
              })
            }
            })

        }


      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    editUserSubmit(editAliasForm) {

    },
    //  修改资质的确定框
    amendaptitudes(index, row) {
      this.amendFormVisible = true
      this.amendForm.old_name = row.quaName
      this.amendForm.parentId = row.parentId
      this.amendForm.id = row.id
    },
    amendSubmit() {
        if(this.amendForm.new_name.trim()==='') {
            return   this.$message({
                        type: 'warning',
                        message: '请输入新资质名称'
                      });
        }
      curd({ quaName: this.amendForm.new_name, parentId: this.amendForm.parentId, id: this.amendForm.id }).then(res => {
        
        if (res.code === 1) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          if(this.selectApti) {
            this.selectApti = this.amendForm.new_name
          } else {
            this.amendForm.new_name = ''
            
          }
          this.amendForm.new_name = ''
          this.amendFormVisible = false
        } else {
           this.$message({
            type: 'warning',
            message: res.msg
          });
        }
        queryList({ quaName: this.formInline.user, parentId: this.formInline.region }).then(res => {
          if (res.code === 1) {
            this.tableName = res.data
          }
        })
      })
      
      
    },
    //点击公告资质等级
    noticeLevel() {
      this.searchname = '公告等级'
      this.changebut = false
      firstgrade({}).then(res => {
        if (res.code === 1) {
          this.single = res.data
        }
        this.seList(this.svalue)
      })
      showgrade({ quaCode: this.stdCode, bizType: 1 }).then(res => {
        this.tableData = res.data
      })
    },
    // 点击的资质别名
    noticeAlias() {
      this.searchname = '资质别名'
      this.changebut = true
        selectAlias({ stdCode: this.stdCode, name: '', stdType: '1' }).then(res => {
        if (res.code === 1) {
          this.tableData = res.data
        }
      })
    },
    // 点击的企业等级
    noticeFirm() {
      this.searchname = '企业等级'
      this.changebut = false
        firstgrade({}).then(res => {
        if (res.code === 1) {
          this.single = res.data
        }
        this.seList(this.svalue)
      })
      showgrade({ quaCode: this.stdCode, bizType: 2 }).then(res => {
        this.tableData = res.data
      })
      // this.mvalue = ''
    },
    // 添加的资质别名
    addNewalias() {

        if (this.searchname === '资质别名') {

              if (this.selectApti) {
                if(this.aliaput) {
                      addAlias({ stdCode: this.stdCode, name: this.aliaput }).then(res => {
                      if (res.code === 1) {
                        selectAlias({ stdCode: this.stdCode, name: '', stdType: '1' }).then(res => {
                          if (res.code === 1) {
                            this.tableData = res.data
                          }
                        })
                      } else {
                        this.$message({
                          message: res.msg,
                          type: 'warning'
                        });
                      }
                      this.aliaput = ''
                    })
                } else {
                   this.$message({
                    message: '请输入要添加的别名',
                    type: 'warning'
                  });
                }
                
              } else {
                this.$message({
                  message: '请先选择资质名称',
                  type: 'warning'
                });
              }
        } else if (this.searchname === '公告等级') {
              if(this.newmvalue){
                addtLevel({quaCode:this.stdCode,bizType:1,gradeCode:this.newmvalue}).then(res => {
                      console.log(res)
                     if(res.code === 1 ) {
                         this.$message({
                         type: 'success',
                         message: '添加成功!'
                       });
                     }  else {
                         this.$message({
                         type: 'warning',
                         message: res.msg
                       });
                     }
                     this.noticeLevel()
                     this.newmvalue = ''
                     this.mvalue = []
                  })

              } else {
              this.$message({
                  message: '请选择添加等级或者资质',
                  type: 'warning'
                });
              }
        } else {
           if (this.newmvalue) {
            addtLevel({ quaCode: this.stdCode, bizType: 2, gradeCode: this.newmvalue }).then(res => {
              console.log(res)
               if( res.code === 1 ) {
                   this.$message({
                   type: 'success',
                   message: '添加成功!'
                 });
               } else {
                   this.$message({
                   type: 'warning',
                   message: res.msg
                 });
               }

               this.noticeFirm()
                this.newmvalue = ''
                this.mvalue = []
            })

          } else {
            this.$message({
              message: '请选择先添加得等级或资质',
              type: 'warning'
            });
          }
        }

    },

    //   上传文件等方法
    //  文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //  点击文件列表已上传的文件时的钩子的
    handlePreview(file) {

    },
    handleSuccess(response, file, fileList) {
      console.log(response)
      if (response.code === 1) {
        this.$message({
          type: 'success',
          message: response.msg
        })
      }else {
         this.$message({
          type: 'warning',
          message: response.msg
        })
      }
    },
    setHeader() {
      let token = localStorage.getItem('Authorization')
      return { Authorization: token }
    },
    //  文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //  查询
    onSubmit() {
      console.log('submit!');
    },
    //点击行调转的
    delivery(row, column) {


      this.selectApti = row.quaName
      this.stdCode = row.quaCode

      if (this.searchname === '资质别名') {
        //展示列表
        selectAlias({ stdCode: this.stdCode, name: '', stdType: '1' }).then(res => {
          if (res.code === 1) {
            this.tableData = res.data
          }
        })
      } else if (this.searchname === '公共等级') {
          showgrade({ quaCode: this.stdCode, bizType: 1 }).then(res => {
            this.tableData = res.data
          })
      } else {
           showgrade({ quaCode: this.stdCode, bizType: 2 }).then(res => {
            this.tableData = res.data
          })
      }
      
      
    },

    selectWord() {
      if (this.selectApti) {
        selectAlias({ stdCode: this.stdCode, name: this.aliaput, stdType: '1' }).then(res => {
          if (res.code === 1) {
            this.tableData = res.data
          }
        })
      } else {
        this.$message.error('请先选择的资质名称');
      }

    }
  }
}
</script>
<style lang="less" scoped>
.my-enter,
.my-leave-to {
  opacity: 0;
  transform: translateX(250px);
}

.my-enter-active,
.my-leave-active {
  transition: all 0.8 ease;
}

.aptitudes {
  height: 1150px;
  .bg-purple-dark {
    background: #99a9bf;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .line {
    border-right: 1px dashed #000;
    padding: 10px;
    height: 1100px;
  }


  .right {
    padding: 10px;

    .menu {
      margin-bottom: 20px;
    }

    .alia {

      .right-apti {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 20px;
        .disappear {
          outline: none;
          background: none;
          border: 0;
          font-size: 16px;
          padding-left: 10px;
        }
        p {
          margin-right: 10px;
          width: 55px;
          line-height: 40px;
          height: 40px;
          font-size: 16px;
        }
      }
      .right-search {
        margin-bottom: 20px;
        display: flex;
        justify-content: flex-start;
        p {
          margin-right: 5px;
          box-sizing: border-box;
          height: 40px;
          line-height: 40px;
          font-size: 12px;
          width: 75px;
          float: left;
        }
        .search-put {
          margin-left: -5px;

          width: 100%;
        }
      }
      .updown-list {
        margin-left: 10px;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
}
</style>
