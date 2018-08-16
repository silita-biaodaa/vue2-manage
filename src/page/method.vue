<template >
    <div class="custom-tree-container bdd_main">
        <el-tree
            :data="data5"
            show-checkbox
            node-key="id"
            default-expand-all
            :load="loadNode"
            lazy
            :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span v-show="node.id==0">{{ node.id }}</span>
        <span class='bdd_aids'>
          <el-button
              type="text"
              size="mini"
              @click="() => append(node,data)"
              >
                增加
          </el-button>
          <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)">
           刪除
          </el-button>
           <el-button
               type="text"
               size="mini"
               @click="() =>updata(node,data)">
              修改
          </el-button>
        </span>
      </span>
        </el-tree>
        <el-input
            placeholder="输入关键字进行查看"
            v-model="filterText">
        </el-input>


    </div>

</template>
<script>
    import axios from 'axios'
    import {getJsonData} from '../api/index.js'
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
            },];
            return {
                data4: JSON.parse(JSON.stringify(data)),
                data5: JSON.parse(JSON.stringify(data)),
                filterText:'',
                threeDataArray:new Array()
            }
        },
        /*  mounted() {
              this.loadNode();
          },*/
        methods: {
            loadNode: function (node, resolve) {
                if (node.level === 0) {
//          var data = JSON.stringify({"type":"江西省"});
                    getJsonData('/dataMaintain/listProvince',null).then(res=>{
                        console.log(res);
                        let dataMap = res.data;//所有的省份
                        let provinceArr = new Array();
                        let provinceEngArr = new Array();
                        var dataBeanArr = new Array();
                        for (var key in dataMap) {
                          //  console.log("属性：" + key + ",值：" + dataMap[key]);
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

                    },error=>{
                        console.log(error)
                    })

                }else if(node.level === 1){

                    let dataParam = JSON.stringify({"type":node.data.value});

                    getJsonData('/dataMaintain/listPbMode',dataParam).then(res=>{

                        let dataArray = res.data;
                        if(dataArray&&dataArray.length>0) {
                            let newDataArray = new Array();
                            for (let i = 0; i < dataArray.length; i++) {
                                let dataBean = dataArray[i];
                                dataBean.label = dataBean.name;
                                newDataArray.push(dataBean);
                            }
                            return resolve(newDataArray);
                        }else{
                            return resolve(new Array());
                        }
                        //console.log(res)



                    },error=>{
                        console.log(error)
                    })

                }else if(node.level === 2){
                    let dataParam = JSON.stringify({"stdCode":node.data.code});

                    getJsonData('/dataMaintain/listPbModeAlias',dataParam).then(res=>{

                        let dataArray = res.data;
                        if(dataArray&&dataArray.length>0) {
                            let newDataArray = new Array();
                            for (let i = 0; i < dataArray.length; i++) {
                                let dataBean = dataArray[i];
                                dataBean.label = dataBean.name;
                                newDataArray.push(dataBean);
                            }
                            return resolve(newDataArray);
                        }else{
                            return resolve(new Array());
                        }
                    },error=>{
                        console.log(error)
                    })
                }
            },
            append(node,data) {

                 this.$prompt('请输入增加的内容', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
//                    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
//                    inputErrorMessage: '格式不正确'
                }).then(({ value }) => {
                    if(node.level==1){
                    let dataModel=new Object();
                    dataModel.name = value;
                    dataModel.type = node.data.value;
                    dataModel.orderNo = "2";
                    dataModel.desc = "";
                    let dataParam = JSON.stringify(dataModel);
                     if (!data.children) {
                         this.$set(data, 'children', []);
                     }
                    if(node.childNodes&&node.childNodes.length>0){
                        let childrenArr = new Array();
                        for(let i=0;i<node.childNodes.length;i++){
                            var bean = node.childNodes[i];
                            let childBean = new Object();
                            childBean.id = bean.id;
                            childBean.label = bean.label;
                             childBean.children = [];
                            childrenArr.push(childBean);
                        }
                        data.children=childrenArr;
                    }
                    getJsonData('/dataMaintain/insertPbMode',dataParam).then(res=>{
                    //this.loadNode(node,resolve)
                       console.log(res)

                       const newChild = { id: '12421', label: value, children: [] };
                    if (!data.children) {
                         this.$set(data, 'children', []);
                     }
                    data.children.push(newChild);


                    },error=>{
                        console.log(error)
                    })
                    }else if(node.level==2){
                      let dataModel=new Object();
                    dataModel.name = value;
                    dataModel.stdCode = node.data.stdCode;
                    dataModel.desc = "";
                    dataModel.remark = "";
                    let dataParam = JSON.stringify(dataModel);
                     if (!data.children) {
                         this.$set(data, 'children', []);
                     }
                     if(node.childNodes&&node.childNodes.length>0){
                        let childrenArr = new Array();
                        for(let i=0;i<node.childNodes.length;i++){
                            var bean = node.childNodes[i];
                            let childBean = new Object();
                            childBean.id = bean.id;
                            childBean.label = bean.label;
                            childBean.children = [];
                            childrenArr.push(childBean);
                        }
                        data.children=childrenArr;
                    }
                    getJsonData('/dataMaintain/insertPbModeAlias',dataParam).then(res=>{
                       console.log(res)
                        const newChild = { id: '2', label: value, children: [] };
                    if (!data.children) {
                         this.$set(data, 'children', []);
                     }
                    data.children.push(newChild);

                    },error=>{
                        console.log(error)
                    })



                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });



                // const newChild = { id: id++, label: 'testtest', children: [] };
                // if (!data.children) {
                //     this.$set(data, 'children', []);
                // }
                // data.children.push(newChild);
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


                    }})


            },
            updata(node, data) {
                 this.$prompt('请输入修改的内容', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
//                    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
//                    inputErrorMessage: '格式不正确'
                }).then(({ value }) => {

                       if(node.level==1){
                    var dataModel=new Object();
                    dataModel.id = node.data.id;
                    dataModel.name = value;
                    dataModel.type = node.data.value;
                    dataModel.orderNo = "2";
                    dataModel.desc = "";
                    var dataParam = JSON.stringify(dataModel);
                    if (!data.children) {
                         this.$set(data, 'children', []);
                     }

                     if(node.childNodes&&node.childNodes.length>0){
                        let childrenArr = new Array();
                        for(let i=0;i<node.childNodes.length;i++){
                            var bean = node.childNodes[i];
                            let childBean = new Object();
                            childBean.id = bean.id;
                            childBean.label = bean.label;
                            childBean.children = [];
                            childrenArr.push(childBean);
                        }
                        data.children=childrenArr;
                    }


                    getJsonData('/dataMaintain/updatePbMode',data).then(res=>{
                       console.log(res)
                    },error=>{
                        console.log(error)
                    })
                    }else if(node.level==2){
                      var dataModelT=new Object();
                    dataModelT.id = node.data.id;
                    dataModelT.name = value;
                    dataModelT.type = node.data.type;
                    dataModelT.orderNo = "2";
                    dataModelT.desc = "";
                    let dataParamT = JSON.stringify(dataModelT);
                
                    getJsonData('/dataMaintain/updatePbMode',dataParamT).then(res=>{
                       console.log(res)
                            const parent = node.parent;
                            const children = parent.childNodes;
                             dataModelT.label = value;
                             const newChild = {id: dataModelT.id, label: value};
                             data.id = dataModelT.id;
                             data.label = value;
                   // data.children.push(newChild);
                    
                            //const index = children.findIndex(d => d.data.id === data.id);
                          
                         
                       this.$message({
                        type: 'success',
                        message: '您修改的内容是: ' + value
                    });
                    },error=>{
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
    .bdd_aids{
        margin-right: 1400px;
    }
    .bdd_main{
        margin-left: 15%;
        margin-right: 15%;
    }
    .el-input{
        margin-top: 30px;
    }
</style>
