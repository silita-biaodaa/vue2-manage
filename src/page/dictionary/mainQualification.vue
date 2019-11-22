<template>
  <div class="mainQualification bg-fff pl20 pr20">
    <div class="left_list pr20 pt20 pb20">
      <div class="mb20">
        <span class="fs16 color-150 fw600">
          资质:
          <el-select
            v-model="level1"
            @change="choseQual"
            placeholder="请选择"
            clearable
            style="width: 20%;margin-left: 20px"
            @clear="clearQual"
          >
            <el-option
              v-for="item in levelList1"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="level2"
            @change="choseQual"
            placeholder="请选择"
            clearable
            style="width: 20%;"
            @clear="clearQual"
            v-show="checkBox1"
          >
            <el-option
              v-for="item in levelList2"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="level3"
            @change="choseQual"
            placeholder="请选择"
            clearable
            style="width: 20%;"
            @clear="clearQual"
            v-show="checkBox2"
          >
            <el-option
              v-for="item in levelList3"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="level4"
            @change="choseQual"
            placeholder="请选择"
            clearable
            style="width: 20%;"
            @clear="clearQual"
            v-show="checkBox3"
          >
            <el-option
              v-for="item in levelList4"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </span>
      </div>
      <div class="drcfb mb20">
        <el-row :span="24">
          <el-col :span="16" class="ft16 text-l">
            <el-input
              placeholder="请输入关键字搜索资质"
              clearable
              v-model="firm"
              style="width:60%"
              @change="searchData"
              v-on:input="clear"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <button type="primary" class="ml10 search cp" @click="searchData">搜索</button>
          </el-col>
          <el-col :span="8" class="addAlias">
            <div class="addAlias_btn dfcc cp" @click="addQualList">
              <img src="../../assets/img/add_icon.png" alt />
              <div class="fs16 color-fff fw600 ml10 cp" v-show="isAllows">添加资质</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="24">
          <el-table
            class="table cp"
            border
            :data="tableData"
            ref="multiple"
            @row-click="openDetails"
            :header-cell-style="headClass"
          >
            <el-table-column label="资质类别" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.qualType }}</span>
              </template>
            </el-table-column>
            <el-table-column label="资质大类" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.quaBig }}</span>
              </template>
            </el-table-column>
            <el-table-column label="资质小类" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.quaTiny }}</span>
              </template>
            </el-table-column>
            <el-table-column label="资质名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.quaName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="资质标准名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.benchName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <span
                  class="handle_delete color-409 cp"
                  @click="deleteInfo(scope.$index, scope.row)"
                  v-show="isAllows"
                >删除</span>
                <span
                  class="handle_change color-409 ml20 cp"
                  @click="changeInfo(scope.$index, scope.row)"
                  v-show="isAllows"
                >修改</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div class="block mt20">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-sizes="[15, 30, 45, 60]"
          :page-size="15"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
    </div>
    <div class="right_list pl20 pr20 pt20 pb20">
      <div class="fs14 fw600">资质名称：{{aliasName}}</div>
      <el-row>
        <el-col>
          <ul class="drc cp checkList mb20">
            <li :class="{'active':activeIndex == '1'}" @click="checkIndex('1')">资质别名</li>
            <li :class="{'active':activeIndex == '2'}" @click="checkIndex('2')">资质等级</li>
            <li :class="{'active':activeIndex == '3'}" @click="checkIndex('3')">资质属性</li>
          </ul>
          <el-col v-show="activeIndex == '1'">
            <div class="dfrcb mb20">
              <!-- <span class="ft14">资质别名：</span> -->
              <el-input v-model="alias" placeholder="请输入资质名称" clearable @change="searchDataAlias" v-on:input="clear">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <button type="primary" class="search ml30 fw600 fs16 cp" @click="searchDataAlias">搜索</button>
            </div>
            <div class="dfrcb mb20">
              <div class="dfcc add_left color-fff cp" @click="addAlias" v-show="isAllows">
                <img src="../../assets/img/add_icon.png" alt />
                <div class="ml10 fs16 fw600">添加别名</div>
              </div>
              <div class="dfcc delete_right color-fff cp" @click="deleteAlias" v-show="isAllows">
                <img src="../../assets/img/delete_icon.png" alt />
                <div class="ml10 fs16 fw600">删除</div>
              </div>
            </div>
            <div class="select_right">
              <div class="drc pl20 select_des">
                <div class="drc">
                  <el-radio v-model="radio" label="createTime" @change="checkRadio">按时间排序</el-radio>
                  <div class="dcr cp ml10">
                    <i
                      class="el-icon-caret-top ft14 color-666"
                      @click="checkTime"
                      v-bind:class="{ 'color-409': isActive, active: hasCheck }"
                    ></i>
                    <i
                      class="el-icon-caret-bottom ft14 color-666"
                      @click="checkTime"
                      v-bind:class="{ 'color-409': !isActive, active: hasCheck }"
                    ></i>
                  </div>
                </div>
                <div class="drc ml30">
                  <el-radio v-model="radio" label="code" @change="checkRadio">按拼音排序</el-radio>
                  <div class="dcr cp ml10">
                    <i
                      class="el-icon-caret-top ft14 color-666"
                      @click="checkCombine"
                      v-bind:class="{ 'color-409': isCombine, active: checked }"
                    ></i>
                    <i
                      class="el-icon-caret-bottom ft14 color-666"
                      @click="checkCombine"
                      v-bind:class="{ 'color-409': !isCombine, active: checked }"
                    ></i>
                  </div>
                </div>
              </div>
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
                class="pl20 pt20"
              >全选</el-checkbox>
              <div style="margin: 10px 0;"></div>
              <el-checkbox-group
                v-model="checkedAlias"
                @change="handleCheckedChange"
                class="dcr pl20"
              >
                <el-checkbox
                  v-for="(item,i) in tableDataAlias"
                  :label="item"
                  :key="i"
                  class="mb10"
                >{{item}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="mt20">
              <el-pagination
                @current-change="handleCurrentChangeAlias"
                :current-page="currentPage2"
                :page-sizes="[15, 30, 45, 60]"
                :page-size="15"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalAlias"
                @size-change="handleSizeChangeAlias"
              ></el-pagination>
            </div>
          </el-col>
          <el-col class="changeLevel pt20 pl20 pb40" v-show="activeIndex == '2'">
            <ul class="fs14 color-000">
              <li v-for="(item,i) in levelData" :key="i" class="mb10">{{item.name}}</li>
            </ul>
            <div class="text-c levelBottomBtn cp"  @click="changeLevelBtn">
              <button class="fs16 color-fff" plain v-if="levelBtn" v-show="isAllows">修改等级</button>
            </div>
          </el-col>
          <el-col class="changeMode pt20 pl20 pb40" v-show="activeIndex == '3'">
            <ul class="fs14 color-000">
              <li v-for="(item,i) in modeData" class="mb10" :key="i">{{item.name}}</li>
            </ul>
            <div class="text-c modeBottomBtn cp" @click="changeModeBtn">
              <button class="fs16 color-fff" plain v-show="isAllows">修改属性</button>
            </div>
          </el-col>
        </el-col>
      </el-row>
    </div>
    <!-- 增加以及修改弹窗 -->
    <div class="dialog" v-if="showMask">
      <div class="dialog-container">
        <div @keyup.enter.native="submitForm('ruleForm')">
          <div class="dialog_title dfrcb pl20 pr20">
            <div class="fs16 color-150 fw600">添加资质</div>
            <i class="el-icon-close fs16 cp" @click="cancelMask"></i>
          </div>
          <div class="form_modal">
            <el-form
              :model="ruleForm"
              ref="ruleForm"
              :rules="rules"
              :label-position="labelPosition"
              label-width="100px"
            >
              <el-form-item label="资质类别：" prop="qualType">
                <el-select v-model="ruleForm.qualType" @change="choseQual" placeholder="请选择资质类别">
                  <el-option
                    v-for="item in typeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="资质大类：" prop="quaBig">
                <el-input v-model="ruleForm.quaBig" placeholder="请输入资质大类名称"></el-input>
              </el-form-item>
              <el-form-item label="资质小类：" prop="quaTiny">
                <el-input v-model="ruleForm.quaTiny" placeholder="请输入资质小类名称"></el-input>
              </el-form-item>
              <el-form-item label="资质名称：" prop="quaName">
                <el-input v-model="ruleForm.quaName" placeholder="请输入资质名称"></el-input>
              </el-form-item>
              <el-form-item label="标准名称：" prop="benchName">
                <el-input v-model="ruleForm.benchName" placeholder="请输入资质标准名称"></el-input>
              </el-form-item>
              <el-form-item label="等级类型：" prop="levelType">
                <el-select v-model="ruleForm.levelType" placeholder="请选择资质类型">
                  <el-option
                    v-for="item in levelsType"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="资质类型：" prop="bizType">
                <el-select v-model="ruleForm.bizType" placeholder="请选择资质类型">
                  <el-option
                    v-for="item in qualType"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="text-c handle_btn">
                <button class="bg-fff fs18 color-999 mr30 cp" plain @click="cancelMask">取消</button>
                <button class="confirm_btn bg-fff color-fff fs18 cp" type="primary" @click="submitForm('ruleForm')">确定</button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改资质弹窗 -->
    <div class="dialog" v-if="aliasMask">
      <div class="dialog-container">
        <div @keyup.enter.native="changeSubmitForm('ruleFormChange')">
          <div class="dialog_title dfrcb pl20 pr20">
            <div class="fs16 color-150 fw600">修改资质</div>
            <i class="el-icon-close fs16 cp" @click="cancelMask"></i>
          </div>
          <div class="form_modal">
            <el-form
            :model="ruleFormChange"
            ref="ruleFormChange"
            :rules="rulesChange"
            :label-position="labelPosition"
            label-width="100px"
          >
              <el-form-item label="资质类别：" prop="qualType">
                <el-select
                  v-model="ruleFormChange.qualType"
                  @change="choseQual"
                  placeholder="请选择资质大类"
                >
                  <el-option
                    v-for="item in typeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="资质大类：" prop="quaBig">
                <el-input class="form_ipt" v-model="ruleFormChange.quaBig"></el-input>
              </el-form-item>
              <el-form-item label="资质小类：" prop="quaTiny">
                <el-input class="form_ipt" v-model="ruleFormChange.quaTiny"></el-input>
              </el-form-item>
              <el-form-item label="资质名称：" prop="quaName">
                <el-input class="form_ipt" v-model="ruleFormChange.quaName"></el-input>
              </el-form-item>
              <el-form-item label="标准名称：" prop="benchName">
                <el-input class="form_ipt" v-model="ruleFormChange.benchName"></el-input>
              </el-form-item>
              <el-form-item label="等级类型：" prop="levelType">
                <el-select v-model="ruleFormChange.levelType" placeholder="请选择等级类型">
                  <el-option
                    v-for="item in levelsType"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="资质类型：" prop="bizType">
                <el-select v-model="ruleFormChange.bizType" placeholder="请选择资质类型">
                  <el-option
                    v-for="item in qualType"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="text-c handle_btn">
                <button class="bg-fff fs18 color-999 mr30 cp" plain @click="cancelMask">取消</button>
                <button class="confirm_btn bg-fff color-fff fs18 cp" type="primary" @click="changeSubmitForm('ruleFormChange')">确定</button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改等级 -->
    <div class="dialog" v-if="changeLevel">
      <div class="dialog-container level pb40">
        <div @keyup.enter.native="levelSubmitForm">
          <div class="dialog_title dfrcb pl20 pr20">
            <div class="fs16 color-150 fw600">修改等级</div>
            <i class="el-icon-close fs16 cp" @click="cancelMask"></i>
          </div>
          <el-checkbox-group v-model="checkedLevel" @change="handleCheckedLevelChange" class="dc checkGroup">
            <el-checkbox v-for="level in levels" :label="level" :key="level">{{level}}</el-checkbox>
          </el-checkbox-group>
          <div class="text-c mt10 handle_btn">
            <button class="bg-fff fs18 color-999 mr30 cp" plain @click="cancelMask">取消</button>
            <button class="confirm_btn bg-fff color-fff fs18 cp" type="primary" @click="levelSubmitForm">确定</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改属性 -->
    <div class="dialog" v-if="changeMode">
      <div class="dialog-container mode pb40">
        <div @keyup.enter.native="modeSubmitForm">
          <div class="dialog_title dfrcb pl20 pr20">
            <div class="fs16 color-150 fw600">修改属性</div>
            <i class="el-icon-close fs16 cp" @click="cancelMask"></i>
          </div>
          <el-checkbox-group v-model="checkedMode" @change="handleCheckedModeChange" class="dc checkGroup">
            <el-checkbox class="mb10" v-for="mode in modes" :label="mode" :key="mode">{{mode}}</el-checkbox>
          </el-checkbox-group>
          <div class="text-c handle_btn">
            <button class="bg-fff fs18 color-999 mr30 cp" plain @click="cancelMask">取消</button>
            <button class="confirm_btn bg-fff color-fff fs18 cp" type="primary" @click="modeSubmitForm">确定</button>
          </div>
        </div>
      </div>
    </div>
    <addAlias
      :showMask="true"
      v-model="sendVal"
      :code="code"
      @refesh="handleRefesh"
      @mainQual="mainQual"
    ></addAlias>
  </div>
</template>
<script>
import {
  listArea,
  qualList,
  screenList,
  deteleQual,
  addQual,
  aliasList,
  deleteQualAlias,
  addAliasName,
  searchLevel,
  levelList,
  aliasMode,
  changeMode,
  changeQual,
  changeLevelList
} from "@/api/index";
import { checkValue } from "../../public";
// const cityOptions = [];
export default {
  data() {
    return {
      firm: "",
      level1: "",
      level2: "",
      level3: "",
      level4: "",
      level5: "",
      levelList1: [],
      levelList2: [],
      levelList3: [],
      levelList4: [],
      levelList5: [],
      checkBox1: false,
      checkBox2: false,
      checkBox3: false,
      sources1: "",
      sources2: "",
      sources3: "",
      activeIndex: "1",
      tableData: [],
      tableDataAlias: [], //资质别名名称;
      total: null,
      totalAlias: null,
      pagenum: 1, //页数;
      pagesize: 15, //每页条数;
      pagenumAlias: 1, //页数;
      pagesizeAlias: 15, //每页条数;
      currentPage1: 1,
      currentPage2: 1,
      activeIndex: "1", //导航栏点击
      firm: "",
      checkList: [],
      showMask: false,
      showAlias: false,
      changeMask: false, //修改弹窗
      ruleForm: {
        qualType: "",
        quaBig: "",
        quaTiny: "",
        quaName: "",
        benchName: "",
        levelType: "",
        bizType: ""
      },
      rules: {
        qualType: [
          { required: true, message: "请选择资质类别", trigger: "blur" }
        ],
        quaName: [
          { required: true, message: "请输入资质名称", trigger: "blur" }
        ],
        benchName: [
          { required: true, message: "请输入资质标准名称", trigger: "blur" }
        ],
        levelType: [
          { required: true, message: "请选择等级类别", trigger: "blur" }
        ],
        bizType: [
          { required: true, message: "请选择资质类别", trigger: "blur" }
        ]
      },
      ruleFormChange: {
        qualType: "",
        quaBig: "",
        quaTiny: "",
        quaName: "",
        benchName: "",
        levelType: "",
        bizType: ""
      },
      rulesChange: {
        qualType: [
          { required: true, message: "请选择资质类别", trigger: "blur" }
        ],
        quaName: [
          { required: true, message: "请输入资质名称", trigger: "blur" }
        ],
        benchName: [
          { required: true, message: "请输入资质标准名称", trigger: "blur" }
        ],
        levelType: [
          { required: true, message: "请选择等级类别", trigger: "blur" }
        ],
        bizType: [
          { required: true, message: "请选择资质类别", trigger: "blur" }
        ]
      },
      labelPosition: "right",
      ids: "",
      type: "",
      typeList: [],
      qualType: [
        {
          id: "0",
          value: "公告和企信"
        },
        {
          id: "1",
          value: "公告"
        },
        {
          id: "2",
          value: "企信"
        }
      ],
      levelsType: [
        {
          id: "0",
          value: "不分等级"
        },
        {
          id: "1",
          value: "一类"
        },
        {
          id: "2",
          value: "二类"
        }
      ],
      aliasName: "", //资质别名;-
      alias: "",
      aliasMask: "",
      code: "", //资质code;
      id: "", //资质id;
      multipleAlias: [], //资质别名数据
      sendVal: "",
      levelData: [], //资质等级;
      modeData: [], //资质属性;
      changeLevel: false,
      changeMode: false,
      levelBtn: true,
      checkAll: false,
      checkedMode: [], //属性列表
      checkModeList: [],
      checkedLevel: ["特级"], //等级列表
      levels: [],
      modes: ["公告", "企信"],
      isIndeterminate: true,
      checkValue: "",
      checkModeValue: "",
      checkForm: [],
      levelQuery: [],
      mainQual: "mainQual",
      isAllows: null,
      radio: "createTime",
      isActive: false,
      hasCheck: false,
      isCombine: false,
      checked: true,
      repeated: true, //防止重复触发事件;
      checkAll: false,
      checkedAlias: [],
      isIndeterminate: false,
      aliasTableList: [] //当前对应的资质的资质名称;
    };
  },
  methods: {
    mainQualList() {
      const params = {
        pageNo: this.pagenum,
        pageSize: this.pagesize,
        benchName: this.firm,
        ids: this.ids
      };
      qualList(params).then(res => {
        if (res.code == "1") {
          const { data, total } = res;
          this.tableData = data;
          this.total = total;
          if (data.length > 0) {
            var tr = document.getElementsByTagName("tr");
            for (let i = 0; i < tr.length - 1; i++) {
              tr[i].style.backgroundColor = "#fff";
              tr[1].style.backgroundColor = "#F3F5F9";
            }
            this.aliasName = data[0].benchName;
            this.code = data[0].quaCode;
            this.id = data[0].id;
            this.aliasInfo(data[0].quaCode);
          } else {
            this.aliasName = "";
          }
        } else {
          console.info("资质列表接口不通");
        }
      });
    },
    //修改成功之后的刷新列表展示;
    refreshList() {
      const params = {
        pageNo: this.pagenum,
        pageSize: this.pagesize,
        benchName: this.firm,
        ids: this.ids
      };
      qualList(params).then(res => {
        if (res.code == "1") {
          const { data, total } = res;
          this.tableData = data;
          for (let i of this.tableData) {
            if (i.benchName == this.ruleFormChange.quaName) {
              this.code = i.quaCode;
            }
          }
          this.getModeList();
          this.getLevelList();
          this.aliasInfo(this.code);
          this.total = total;
        } else {
          console.info("资质列表接口不通");
        }
      });
    },
    //获取资质等级;
    getLevelList() {
      levelList({ quaCode: this.code }).then(res => {
        if (res.code == "1") {
          const { data } = res;
          if (data.length == 0) {
            this.levelBtn = false;
          } else {
            this.levelBtn = true;
          }
          console.info('')
          this.levelData = data;
        } else {
          console.info("资质等级接口不通");
        }
      });
    },
    //别名属性;
    getModeList() {
      aliasMode({ id: this.id }).then(res => {
        if (res.code == "1") {
          const { data } = res;
          if (data.bizType == "0") {
            const params = [{ name: "公告" }, { name: "企信" }];
            this.modeData = params;
          } else if (data.bizType == "1") {
            const params = [{ name: "公告" }];
            this.modeData = params;
          } else if (data.bizType == "2") {
            const params = [{ name: "企信" }];
            this.modeData = params;
          }
        } else {
          console.info("资质属性接口不通");
        }
      });
    },
    //资质别名列表
    aliasInfo(code) {
      const params = {
        currentPage: this.pagenumAlias,
        pageSize: this.pagesizeAlias,
        code: code,
        name: this.alias,
        rank: this.radio,
        sort:
          this.radio == "createTime"
            ? this.isActive
              ? "asc"
              : "desc"
            : this.isCombine
            ? "asc"
            : "desc"
      };
      aliasList(params).then(res => {
        if (res.code == "1") {
          const { list, total } = res.data;
          this.aliasTableList = list;
          this.tableDataAlias = [];
          for (let item of list) {
            this.tableDataAlias.push(item.name);
          }
          this.totalAlias = total;
        } else {
          console.info("资质别名列表接口不通");
        }
      });
    },
    //资质等级选项列表
    levelOption() {
      this.checkedLevel = [];
      searchLevel({ quaCode: this.code }).then(res => {
        if (res.code == "1") {
          this.levelQuery = res.data;
          for (let i of res.data) {
            this.levels.push(i.name);
          }
          for (let j of this.levelData) {
            this.checkedLevel.push(j.name);
          }
        } else {
          console.info("查询资质等级列表接口不通");
        }
      });
    },
    //资质列表
    getScreenList() {
      screenList({}).then(res => {
        if (res.code == "1") {
          const { data } = res;
          this.typeList = data;
        } else {
          console.info("资质列表接口不通");
        }
      });
    },
    //资质多级筛选
    qualScreen() {
      this.ids = "";
      //切换选择框清除数据;
      if (this.level1 !== "" && this.level1 !== this.sources1) {
        this.checkBox1 = false;
        this.checkBox2 = false;
        this.checkBox3 = false;
        this.level2 = "";
        this.level3 = "";
        this.level4 = "";
      } else if (this.level2 !== "" && this.level2 !== this.sources2) {
        this.checkBox2 = false;
        this.checkBox3 = false;
        this.level3 = "";
        this.level4 = "";
      } else if (this.level3 !== "" && this.level3 !== this.sources3) {
        this.checkBox3 = false;
        this.level4 = "";
      }
      screenList({}).then(res => {
        if (res.code == "1") {
          const { data } = res;
          this.levelList1 = data;
          this.sources1 = this.level1;
          this.ids = this.level1;
          if (data !== undefined && this.sources1 !== "") {
            for (let i of data) {
              if (this.level1 == i.id) {
                if (i.data !== undefined) {
                  this.checkBox1 = true;
                }
                this.levelList2 = i.data;
                this.sources2 = this.level2;
                if (this.level2 !== "") {
                  this.ids += `,${this.level2}`;
                }
                if (i.data !== undefined && this.sources2 !== "") {
                  for (let j of i.data) {
                    if (this.level2 == j.id) {
                      if (j.data !== undefined) {
                        this.checkBox2 = true;
                      }
                      this.levelList3 = j.data;
                      this.sources3 = this.level3;
                      if (this.level3 !== "") {
                        this.ids += `,${this.level3}`;
                      }
                      if (j.data !== undefined && this.sources3 !== "") {
                        for (let z of j.data) {
                          if (this.level3 == z.id) {
                            if (z.data !== undefined) {
                              this.checkBox3 = true;
                            }
                            this.levelList4 = z.data;
                            this.ids += `,${this.level4}`;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          setTimeout(() => {
            return this.mainQualList();
          }, 100);
        } else {
          console.info("资质下拉展示接口不通");
        }
      });
    },
    checkIndex(index) {
      this.activeIndex = index;
      if(index == '2') {
        this.getLevelList();
      }else if(index == '3') {
        this.getModeList();
      }
    },
    //点击资质等级
    noticeLevel() {
      this.getLevelList();
    },
    noticeFirm() {
      this.getModeList();
    },
    //点击添加资质
    addQualList() {
      this.showMask = true;
      this.getScreenList();
    },
    //添加资质提交;
    submitForm(formName) {
      this.repeated = true;
      if (this.repeated) {
        this.$refs[formName].validate(valid => {
          this.repeated = false;
          if (valid) {
            const {
              qualType,
              quaBig,
              quaTiny,
              quaName,
              benchName,
              bizType,
              levelType
            } = this.ruleForm;
            if (quaTiny !== "" && quaBig == "") {
              this.$message({
                type: "warning",
                message: "填写小类则必须有大类名称"
              });
              setTimeout(() => {
                this.repeated = true;
              }, 10000);
            } else {
              const params = {
                qualType: qualType,
                quaBig: quaBig,
                quaTiny: quaTiny,
                quaName: quaName,
                benchName: benchName,
                bizType: bizType,
                levelType: levelType
              };
              addQual(params).then(res => {
                if (res.code == "1") {
                  this.repeated = true;
                  this.$message({
                    type: "success",
                    message: "添加成功!"
                  });
                  this.showMask = false;
                  this.mainQualList();
                  this.aliasInfo(this.code);
                  this.ruleForm = {
                    qualType: "",
                    quaBig: "",
                    quaTiny: "",
                    quaName: "",
                    benchName: "",
                    levelType: "",
                    bizType: ""
                  };
                } else {
                  setTimeout(() => {
                    this.repeated = true;
                  }, 10000);
                  this.$message({
                    type: "warning",
                    message: res.msg
                  });
                  console.info("添加资质接口不通");
                }
              });
            }
          }
        });
      }
    },
    //修改资质;
    changeSubmitForm(formName) {
      this.repeated = true;
      if (this.repeated) {
        this.$refs[formName].validate(valid => {
          this.repeated = false;
          if (valid) {
            const {
              qualType,
              quaBig,
              quaTiny,
              quaName,
              benchName,
              bizType,
              levelType
            } = this.ruleFormChange;
            for (let i of this.typeList) {
              if (this.ruleFormChange.qualType == i.name) {
                var qualId = i.id;
              }
            }
            if (quaTiny !== "" && quaBig == "") {
              this.$message({
                type: "warning",
                message: "填写小类则必须有大类名称"
              });
              setTimeout(() => {
                this.repeated = true;
              }, 1000);
            } else {
              const params = {
                quaId: this.id,
                qualType: qualId,
                quaBig: quaBig,
                quaTiny: quaTiny,
                quaName: quaName,
                benchName: benchName,
                bizType: bizType,
                levelType: levelType,
                quaCode: this.code
              };
              changeQual(params).then(res => {
                this.repeated = true;
                if (res.code == "1") {
                  this.$message({
                    type: "success",
                    message: "修改成功!"
                  });
                  this.aliasMask = false;
                  this.refreshList();
                } else {
                  this.repeated = true;
                  console.info("修改资质接口不通");
                }
              });
            }
          }
        });
      }
    },
    cancelMask() {
      this.showMask = false;
      this.aliasMask = false;
      this.showAlias = false;
      this.changeMode = false;
      this.changeLevel = false;
      this.ruleForm = {
        qualType: "",
        quaBig: "",
        quaTiny: "",
        quaName: "",
        benchName: "",
        levelType: "",
        bizType: ""
      };
      this.checkedAlias = [];
    },
    searchData() {
      this.mainQualList();
      this.aliasInfo("");
    },
    //资质多级筛选
    choseQual() {
      this.qualScreen();
    },
    //删除标准资质;
    deleteInfo(index, row) {
      this.$confirm("此操作将永久删除该资质名称, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deteleQual({ id: row.id }).then(res => {
            if (res.code == "1") {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.level1 = "";
              this.level2 = "";
              this.level3 = "";
              this.level4 = "";
              this.checkBox1 = false;
              this.checkBox2 = false;
              this.checkBox3 = false;
              this.ids = "";
              this.mainQualList();
              this.aliasInfo(this.code);
            } else {
              this.$message({
                type: "warning",
                message: res.msg
              });
              console.info("删除资质名称");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //修改资质名称;
    changeInfo(index, row) {
      this.getScreenList();
      const {
        benchName,
        quaBig,
        quaName,
        quaTiny,
        levelType,
        qualType,
        bizType,
        quaCode
      } = row;
      this.aliasMask = true;
      this.ruleFormChange.benchName = benchName;
      this.ruleFormChange.quaBig = quaBig;
      this.ruleFormChange.quaName = quaName;
      this.ruleFormChange.quaTiny = quaTiny;
      this.ruleFormChange.levelType = levelType == null ? "0" : levelType;
      this.ruleFormChange.qualType = qualType;
      this.ruleFormChange.bizType = bizType;
      this.code = quaCode;
      this.checkForm = JSON.stringify(this.ruleFormChange);
    },
    handleCurrentChange(val) {
      // 当前页改变的函数
      this.pagenum = val;
      this.mainQualList();
    },
    handleSizeChange(val) {
      // 每页条数发生改变时做出的函数
      this.pagesize = val;
      this.mainQualList();
    },
    handleCurrentChangeAlias(val) {
      // 当前页改变的函数
      this.pagenumAlias = val;
      this.aliasInfo(this.code);
    },
    handleSizeChangeAlias(val) {
      // 每页条数发生改变时做出的函数
      this.pagesizeAlias = val;
      this.aliasInfo(this.code);
    },
    handleSelect(key, keyPath) {
      this.activeIndex = key;
    },
    //点击标准评标名称展示别名;
    openDetails(row, column) {
      //清空所有值;
      this.alias = "";
      (this.radio = "createTime"),
        (this.isActive = false),
        (this.hasCheck = false),
        (this.isCombine = false),
        (this.checked = true),
        (this.pagenumAlias = 1);
      //首先清除tr背景颜色;
      this.code = row.quaCode;
      this.id = row.id;
      this.aliasInfo(this.code);
      this.aliasInfo(row.quaCode);
      this.getLevelList();
      this.getModeList();
      var tr = document.getElementsByTagName("tr");
      for (let i = 0; i < tr.length - 1; i++) {
        tr[i].style.backgroundColor = "#fff";
      }
      // 点击选中重新赋值;
      this.aliasName = row.benchName;
      event.currentTarget.style.backgroundColor = "#F3F5F9";
    },
    clear() {
      if (this.firm == "") {
        this.mainQualList();
      }
    },
    //清空选择;
    clearQual() {
      if (this.level1 == "") {
        this.checkBox1 = false;
        this.checkBox2 = false;
        this.checkBox3 = false;
        this.levelList2 = "";
        this.levelList3 = "";
        this.levelList4 = "";
        this.level2 = "";
        this.level3 = "";
        this.level4 = "";
      } else if (this.level2 == "") {
        this.checkBox2 = false;
        this.checkBox3 = false;
        this.levelList3 = "";
        this.levelList4 = "";
        this.level3 = "";
        this.level4 = "";
      } else if (this.level3 == "") {
        this.checkBox3 = false;
        this.levelList4 = "";
        this.level4 = "";
      }
    },
    //查询资质别名
    searchDataAlias() {
      this.aliasInfo(this.code);
    },
    //添加资质别名;
    addAlias() {
      this.sendVal = true;
    },
    //删除资质别名;
    deleteAlias() {
      var ids = "";
      if (this.multipleAlias) {
        for (let i of this.multipleAlias) {
          for (let j of this.aliasTableList) {
            if (i == j.name) {
              if (ids == "") {
                ids = `${j.id}`;
              } else {
                ids += `,${j.id}`;
              }
            }
          }
        }
      }
      if (ids == "") {
        this.$message({
          type: "warning",
          message: "请选择您要删除的内容"
        });
      } else {
        this.$confirm("此操作将永久删除该资质别名名称, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            deleteQualAlias({ ids: ids }).then(res => {
              if (res.code == "1") {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                //删除成功后刷新列表
                this.aliasInfo(this.code);
              } else {
                console.info("删除资质别名接口不通");
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    //关闭弹窗刷新列表
    handleRefesh(showMask) {
      if (!showMask) {
        setTimeout(() => {
          return this.refreshList();
        }, 100);
      }
    },
    //修改属性;
    changeModeBtn() {
      this.checkedMode = [];
      this.changeMode = true;
      for (let i of this.modeData) {
        this.checkedMode.push(i.name);
        this.checkValue = this.checkedMode;
      }
    },
    //属性框点击确定;
    modeSubmitForm() {
      this.repeated = true;
      if (this.repeated) {
        this.repeated = false;
        if (this.checkValue == "") {
          this.$message({
            type: "warning",
            message: "请至少选一个资质属性"
          });
          setTimeout(() => {
            this.repeated = true;
          }, 1000);
        } else {
          for (let i of this.checkValue) {
            var bizType = "";
            if (this.checkValue.length !== 2 && i == "公告") {
              bizType = "1";
            } else if (this.checkValue.length !== 2 && i == "企信") {
              bizType = "2";
            } else if (this.checkValue !== "") {
              bizType = "0";
            }
          }
          const params = {
            id: this.id,
            bizType: bizType
          };
          changeMode(params).then(res => {
            if (res.code == "1") {
              this.repeated = true;
              this.$message({
                type: "success",
                message: "修改成功!"
              });
              this.changeMode = false;
              this.checkedMode = [];
              this.refreshList();
            }
          });
        }
      }
    },
    //等级框点击确定;
    levelSubmitForm() {
      this.repeated = true;
      if (this.repeated) {
        this.repeated = false;
        var result = "";
        for (let i of this.checkModeValue) {
          for (let j of this.levelQuery) {
            if (i == j.name) {
              if (result == "") {
                result = `${j.code}`;
              } else {
                result += `,${j.code}`;
              }
            }
          }
        }
        changeLevelList({ quaCode: this.code, codes: result }).then(res => {
          if (res.code == "1") {
            this.repeated = true;
            this.$message({
              type: "success",
              message: "修改成功!"
            });
            this.refreshList();
            this.checkedLevel = [];
            this.changeLevel = false;
          } else {
            this.repeated = true;
            console.info("修改等级接口不通");
          }
        });
      }
    },
    //修改等级;
    changeLevelBtn() {
      this.levels = [];
      this.changeLevel = true;
      this.levelOption();
    },
    handleCheckedModeChange(value) {
      this.checkValue = value;
    },
    //勾选等级触发函数
    handleCheckedLevelChange(value) {
      this.checkModeValue = value;
    },
    checkTime() {
      if (this.radio == "createTime") {
        this.isActive = !this.isActive;
        this.aliasInfo(this.code);
      }
    },
    checkCombine() {
      if (this.radio == "code") {
        this.isCombine = !this.isCombine;
        this.aliasInfo(this.code);
      }
    },
    checkRadio() {
      if (this.radio == "code") {
        this.hasCheck = true;
        this.aliasInfo(this.code);
      } else {
        this.hasCheck = false;
      }
      if (this.radio == "createTime") {
        this.checked = true;
        this.aliasInfo(this.code);
      } else {
        this.checked = false;
      }
    },
    handleCheckAllChange(val) {
      this.checkedAlias = val ? this.tableDataAlias : [];
      this.isIndeterminate = false;
    },
    handleCheckedChange(value) {
      this.multipleAlias = value;
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.tableDataAlias.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.tableDataAlias.length;
    },
    headClass() {
      return "text-align: center;background:#DDDFE4;color: #000000;";
    }
  },
  created() {
    this.mainQualList();
    this.qualScreen();
    this.isAllows = this.$route.query.isAllows;
  }
};
</script>
<style lang="less" scoped>
@import "../../style/mixin";
.mainQualification {
  width: 100%;
  min-height: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  .left_list {
    border-right: 1px dashed #000;
    width: 60%;
    .search {
      margin-left: 25px;
      width: 64px;
      height: 48px;
      background-color: @mainColor;
      color: @whiteColor;
    }
    .addAlias {
      display: flex;
      flex-direction: row-reverse;
      .addAlias_btn {
        display: flex;
        width: 126px;
        height: 48px;
        line-height: 48px;
        background-color: @mainColor;
      }
    }
  }
  .right_list {
    width: 40%;
    height: 100%;
    .checkList {
      border-bottom: 1px solid #dddfe4;
      padding: 0 30px;
      li {
        border-bottom: 6px solid @whiteColor;
        height: 54px;
        line-height: 54px;
        margin-right: 45px;
      }
      .active {
        border-bottom: 6px solid @fontColor;
        color: @fontColor;
        font-weight: 600;
      }
    }
    .search {
      width: 64px;
      height: 48px;
      background-color: @mainColor;
      color: @whiteColor;
    }
    .add_left {
      background-color: @mainColor;
      width: 126px;
      height: 48px;
    }
    .delete_right {
      background-color: @mainColor;
      width: 94px;
      height: 48px;
    }
    .select_right {
      border: 1px solid #dddfe4;
      .select_des {
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #dddfe4;
      }
    }
    .changeLevel,.changeMode {
      border: 1px solid #DDDFE4;
      .levelBottomBtn,.modeBottomBtn {
        width: 180px;
        height: 48px;
        line-height: 48px;
        background-color: @mainColor;
        margin: 0 auto;
        margin-top: 275px;
        button {
          background-color: @mainColor;
        }
      }
    }
    .changeMode {
      .modeBottomBtn {
        margin-top: 475px;
      }
    }
    .el-table::before {
      background-color: #ffffff;
    }
    .el-radio {
      margin: 0;
    }
    .active {
      color: #666;
    }
  }
  .handle_delete,
  .handle_change {
    color: @fontColor;
    border-bottom: 1px solid @fontColor;
  }
  //弹窗样式
  .dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 10;
    .dialog-container {
      width: 632px;
      background: #ffffff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: relative;
      box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.5);
      border-radius: 12px;
      .form_modal {
        padding: 0 65px 40px;
        .form_input {
          background-color: #F3F5F9;
        }
      }
      .dialog_title {
        height: 66px;
        line-height: 66px;
        border-bottom: 1px solid #dddfe4;
        margin-bottom: 60px;
      }
      .handle_btn {
        .confirm_btn {
          width:128px;
          height:40px;
          background: @mainColor;
          border-radius:20px;
        }
      }
      .checkGroup {
        margin-left: 268px;
        margin-bottom: 60px;
      }
    }
  }
  .el-form {
    .el-input,
    .el-select {
      width: 92%;
    }
  }
}
</style>