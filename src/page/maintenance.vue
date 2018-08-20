<template>
    <el-row class='bdd_mian'>
        <el-tree
            :data="data5"
            show-checkbox
            node-key="id"
            default-expand-all
            :load="loadNode"
            :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
          <span v-show="node.id==0">{{node.id}}</span>
        <span class="bdd_aids">
          <el-button
              type="text"
              size="mini"
              @click="() => append(node,data)"
              v-if="node.id<3">
            增加
          </el-button>
          <el-button
              type="text"
              size="mini"
              @click="() => updata(node,data)">
           <el-button type="text" @click="open3">修改</el-button>
          </el-button>
          <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
        </el-tree>
        <el-input
            placeholder="输入关键字进行查看"
            v-model="filterText">
        </el-input>

    </el-row>
</template>

<script>
    import axios from 'axios'
    import {getJsonData} from '../api/index.js'
    let id = 1000;
    export default {
        data() {
            const data = [{
                id: 1,
                label: '一类',
                children: [{
                    id: 4,
                    label: '一级',
                    children: [{
                        id: 9,
                        label: '别名'
                    }, {
                        id: 10,
                        label: '别名'
                    }]
                }]
            },
            ];
            return {
                data5: JSON.parse(JSON.stringify(data)),
                filterText:''
            }
        },

        methods:{
            loadNode: function(node, resolve) {
                this.resolve = resolve;
                this.node = node;
                if(node.level===0){
                    getJsonData('/grade/list',null).then(res=>{
                        console.log(res)
                    })
                }

            },
            open3() {
                this.$prompt('请修改', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    inputErrorMessage: '邮箱格式不正确'
                }).then(({ value }) => {
                    this.$message({
                        type: 'success',
                        message: '你修改的内容是: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });

            },

            append(data) {
                const newChild = {id: id++, label: 'testtest', children: []};
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);

            },


            remove(node, data) {
                this.$confirm('此操作删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if(node.level === 2) {
                        let param = JSON.stringify({"idsStr": node.data.id});

                        getJsonData('/dataMaintain/deletePbMode', param).then(res => {
                            console.log(res);

                            if (res.code == 1) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                const parent = node.parent;
                                const children = parent.data.children || parent.data;
                                const index = children.findIndex(d => d.id === data.id);
                                children.splice(index, 1);
                            } else {
                                this.$message({
                                    type: 'fail',
                                    message: res.msg
                                });
                            }

                        }, error => {
                            this.$message({
                                type: 'fail',
                                message: '删除失败'
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });


                        });


                    }})


            },
            updata(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                //children.splice(index, 1);
            }

        }

    }


</script>
<style lang="less" scoped>
    @import '../style/mixin.less';

    .bdd_mian {
        margin-left: 15%;
        margin-right: 15%;}

    .bdd_aids {
        margin-rigth: 1300px;
    }

    .el-input {
        margin-top: 30px;
    }

    .el-tree-node {
        margin-left: 15%;
        margin-right: 15%;
    }



</style>
