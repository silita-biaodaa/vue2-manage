<template>
    <div class="custom-tree-container bdd_main">
        <el-tree :data="data5" show-checkbox node-key="id" default-expand-all :load="loadNode" lazy :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span v-show="node.id==0">{{ node.id }}</span>
            <span class='bdd_aids'>
              <el-button
                  type="text"
                  size="mini"
                  v-if="node.level<3"
                  @click="() => append(node,data)"
                  >
                    增加
              </el-button>
              <el-button
                  type="text"
                  size="mini"
                  v-if="node.level>1"
                  @click="() => remove(node, data)">
               刪除
              </el-button>
               <el-button
                   type="text"
                   size="mini"
                   v-if="node.level>1"
                   @click="() =>updata(node,data)">
                  修改
              </el-button>
            </span>
            </span>
        </el-tree>
        <el-input placeholder="输入关键字进行查看" v-model="filterText">
        </el-input>
    </div>
</template>

<script>
    import axios from 'axios'
    import {
        getJsonData
    } from '../api/index.js'
    let id = 1000;
    export default {
        data() {
            const data = [{
                id: 1,
                label: '地区',
                children: [{
                    id: 4,
                    label: '综合评标法',
                    children: [{
                        id: 9,
                        label: '别名'
                    }, {
                        id: 10,
                        label: '别名'
                    }]
                }]
            }, ];
            return {
                data4: JSON.parse(JSON.stringify(data)),
                data5: JSON.parse(JSON.stringify(data)),
                filterText: ''
            }
        },
        /*  mounted() {
              this.loadNode();
          },*/
        methods: {
            loadNode: function(node, resolve) { //进入页面懒加载方法
                if (node.level === 0) { //如果是0级树节点，则为省份节点
                    getJsonData('/dataMaintain/listProvince', null).then(res => { //调用省份查询接口
                        console.log(res);
                        let dataMap = res.data; //所有的省份
                        let provinceArr = new Array();
                        let provinceEngArr = new Array();
                        var dataBeanArr = new Array();
                        //封装对象并将对象放入数组中，塞给树控件，让树控件绘制
                        for (var key in dataMap) {
                            provinceArr.push(key);
                            provinceEngArr.push(dataMap[key]);
                            var dataBean = new Object();
                            dataBean.label = key;
                            dataBean.value = dataMap[key];
                            dataBean.show = true;
                            dataBeanArr.push(dataBean);
                        }
                        // data = dataBeanArr;
                        return resolve(dataBeanArr);

                    }, error => {
                        console.log(error)
                    })

                } else if (node.level === 1) { //如果是1级树节点，则为评标办法

                    let dataParam = JSON.stringify({
                        "type": node.data.value
                    });

                    getJsonData('/dataMaintain/listPbMode', dataParam).then(res => { //调用评标办法列表接口

                        let dataArray = res.data;
                        if (dataArray && dataArray.length > 0) { //判断省份下面是否有评标办法
                            let newDataArray = new Array();
                            for (let i = 0; i < dataArray.length; i++) { //封装数组，塞给树控件，让树控件绘制
                                let dataBean = dataArray[i];
                                dataBean.label = dataBean.name;
                                newDataArray.push(dataBean);
                            }
                            return resolve(newDataArray); //树控件绘制数据
                        } else {
                            return resolve(new Array()); //树控件绘制空数据，否则会转圈
                        }
                    }, error => {
                        console.log(error)
                    })

                } else if (node.level === 2) { //如果是2级节点，则为别名
                    let dataParam = JSON.stringify({
                        "stdCode": node.data.code
                    });
                    getJsonData('/dataMaintain/listPbModeAlias', dataParam).then(res => {
                        let dataArray = res.data;
                        if (dataArray && dataArray.length > 0) {
                            let newDataArray = new Array();
                            for (let i = 0; i < dataArray.length; i++) {
                                let dataBean = dataArray[i];
                                dataBean.label = dataBean.name;
                                newDataArray.push(dataBean);
                            }
                            return resolve(newDataArray); //树控件绘制数据
                        } else {
                            return resolve(new Array()); //树控件绘制空数据，否则会转圈
                        }
                    }, error => {
                        console.log(error)
                    })
                } else if (node.level === 3) { //3级节点，空节点
                    return resolve(new Array()); //树控件绘制空数据，否则会转圈
                }
            },
            append(node, data) {

                this.$prompt('请输入增加的内容', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    //                    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    //                    inputErrorMessage: '格式不正确'
                }).then(({
                    value
                }) => {
                    if (node.level == 1) { //增加评标办法
                        let dataModel = new Object();
                        dataModel.name = value;
                        dataModel.type = node.data.value;
                        dataModel.orderNo = "2";
                        dataModel.desc = "";
                        let dataParam = JSON.stringify(dataModel);
                        if (!data.children) {
                            this.$set(data, 'children', []);
                        }
                        if (node.childNodes && node.childNodes.length > 0) {
                            let childrenArr = new Array();
                            for (let i = 0; i < node.childNodes.length; i++) {
                                var bean = node.childNodes[i];
                                let childBean = new Object();
                                childBean.id = bean.id;
                                childBean.label = bean.label;
                                childBean.children = [];
                                childrenArr.push(childBean);
                            }
                            data.children = childrenArr;
                        }
                        getJsonData('/dataMaintain/insertPbMode', dataParam).then(res => {
                            //this.loadNode(node,resolve)
                            console.log(res)

                            const newChild = {
                                id: '12421',
                                label: value
                            };
                            if (!data.children) {
                                this.$set(data, 'children', []);//设置监听器，监听children数据变化，否则页面不会局部刷新
                            }
                            data.children.push(newChild);
                        }, error => {
                            console.log(error)
                        })
                    } else if (node.level == 2) { //增加别名
                        let dataModel = new Object();
                        dataModel.name = value;
                        dataModel.stdCode = node.data.code;
                        dataModel.desc = "";
                        dataModel.remark = "";
                        let dataParam = JSON.stringify(dataModel);
                        if (!data.children) {
                            this.$set(data, 'children', []);
                        }
                        if (node.childNodes && node.childNodes.length > 0) {
                            let childrenArr = new Array();
                            for (let i = 0; i < node.childNodes.length; i++) {
                                var bean = node.childNodes[i];
                                let childBean = new Object();
                                childBean.id = bean.id;
                                childBean.label = bean.label;
                                childBean.children = [];
                                childrenArr.push(childBean);
                            }
                            data.children = childrenArr;
                        }
                        getJsonData('/dataMaintain/insertPbModeAlias', dataParam).then(res => {
                            console.log(res)
                            const newChild = {
                                id: '2',
                                label: value
                            };
                            if (!data.children) {
                                this.$set(data, 'children', []);
                            }
                            data.children.push(newChild);

                        }, error => {
                            console.log(error)
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            remove(node, data) {
                this.$confirm('此操作删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (node.level === 2) { //删除评标办法
                        let param = JSON.stringify({
                            "idsStr": node.data.id
                        });

                        getJsonData('/dataMaintain/deletePbMode', param).then(res => {
                            console.log(res);
                            if (res.code == 1) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                const parent = node.parent;
                                const children = parent.childNodes;
                                const index = children.findIndex(d => d.data.id === data.id);
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
                    } else if (node.level === 3) { //删除别名
                        let param = JSON.stringify({
                            "idsStr": node.data.id
                        });

                        getJsonData('/dataMaintain/deletePbModeAlias', param).then(res => {
                            console.log(res);
                            if (res.code == 1) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                const parent = node.parent;
                                const children = parent.childNodes;
                                const index = children.findIndex(d => d.data.id === data.id);
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
                    }
                })
            },
            updata(node, data) {
                this.$prompt('请输入修改的内容', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    //                    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    //                    inputErrorMessage: '格式不正确'
                }).then(({
                    value
                }) => {

                    if (node.level == 1) {
                        var dataModel = new Object();
                        dataModel.id = node.data.id;
                        dataModel.name = value;
                        dataModel.type = node.data.value;
                        dataModel.orderNo = "2";
                        dataModel.desc = "";
                        var dataParam = JSON.stringify(dataModel);
                        if (!data.children) {
                            this.$set(data, 'children', []);
                        }

                        if (node.childNodes && node.childNodes.length > 0) {
                            let childrenArr = new Array();
                            for (let i = 0; i < node.childNodes.length; i++) {
                                var bean = node.childNodes[i];
                                let childBean = new Object();
                                childBean.id = bean.id;
                                childBean.label = bean.label;
                                childBean.children = [];
                                childrenArr.push(childBean);
                            }
                            data.children = childrenArr;
                        }
                        getJsonData('/dataMaintain/updatePbMode', data).then(res => {
                            console.log(res)
                        }, error => {
                            console.log(error)
                        })
                    } else if (node.level == 2) {
                        var dataModelT = new Object();
                        dataModelT.id = node.data.id;
                        dataModelT.name = value;
                        dataModelT.type = node.data.type;
                        dataModelT.orderNo = "2";
                        dataModelT.desc = "";
                        let dataParamT = JSON.stringify(dataModelT);

                        getJsonData('/dataMaintain/updatePbMode', dataParamT).then(res => {
                            console.log(res)
                            const parent = node.parent;
                            const children = parent.childNodes;
                            dataModelT.label = value;
                            const newChild = {
                                id: dataModelT.id,
                                label: value
                            };
                            data.id = dataModelT.id;
                            data.label = value;
                            this.$message({
                                type: 'success',
                                message: '您修改的内容是: ' + value
                            });
                        }, error => {
                            console.log(error)
                        })
                    } else if (node.level == 3) {
                        var dataModelT = new Object();
                        dataModelT.id = node.data.id;
                        dataModelT.name = value;
                        dataModelT.remark = "";
                        dataModelT.desc = "";
                        let dataParamT = JSON.stringify(dataModelT);

                        getJsonData('/dataMaintain/updatePbModeAlias', dataParamT).then(res => {
                            console.log(res)
                            const parent = node.parent;
                            const children = parent.childNodes;
                            dataModelT.label = value;
                            const newChild = {
                                id: dataModelT.id,
                                label: value
                            };
                            data.id = dataModelT.id;
                            data.label = value;
                            this.$message({
                                type: 'success',
                                message: '您修改的内容是: ' + value
                            });
                        }, error => {
                            console.log(error)
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
                // children.splice(index, 1);
            },

        },

    }
</script>

<style lang="less" scoped>
    @import '../style/mixin.less';
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
    }

    .el-tree-node__loading-icon {
        display: none;
    }

    .bdd_aids {
        margin-right: 1400px;
    }

    .bdd_main {
        margin-left: 15%;
        margin-right: 15%;
    }

    .el-input {
        margin-top: 30px;
    }
</style>
