<template>
    <el-row class='bdd_mian'>
        <el-tree
            :data="data5"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span class="bdd_aids">
          <el-button
              type="text"
              size="mini"
              @click="() => append(data)"
              v-if="node.id<3">
            增加
          </el-button>
          <el-button
              type="text"
              size="mini"
              @click="() => updata(data)">
            修改
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

        <el-tree
            class="filter-tree"
            :data="data2"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            ref="tree2">
        </el-tree>
    </el-row>
</template>

<script>
    import axios from 'axios'

    let id = 1000;
    export default {
        name:"app",
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
                data5: JSON.parse(JSON.stringify(data))
            }
        },
        mounted() {
            this.getAjax();
        },
        methods: {
            append(data) {
                const newChild = {id: id++, label: 'testtest', children: []};
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);
            },
            getAjax: function () {

//          var data = JSON.stringify({"type":"江西省"});
                axios.post('/biaodaa-back/dataMaintain/listProvince',
//                  data,
                    {
                        headers: {'Content-Type': 'application/json'}
                    }).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });
            },
            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
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
        margin-right: 15%;

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

    }

</style>
