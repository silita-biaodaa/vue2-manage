<template>
  <div class="home">
    <el-container>
      <!-- 侧边栏  :router="true"  :default-openeds="[gethcsubmenuKey()]"-->
      <el-aside width="auto">
        <el-menu
          ref="menu"
          :collapse="isCollapse"
          :default-active="gethcitemKey()"
          class="el-menu-admin"
          @open="handleOpen"
          @close="handleClose"
          background-color="#fff"
          text-color="#ffffff"
          active-text-color="#ffd04b"
        >
        <div class="dfrcb bg-000 h64">
          <div class="drc">
            <div class="logo">
              <img src="../assets/img/logo_white.png" />
            </div>
            <div class="color-fff fs18" :class="{'hide': isCollapse}" style="min-width: 54px;">标大大</div>
          </div>
          <div class="cp" @click="toggleCollapse">
            <img :class="{'hide': isCollapse}" src="../assets/img/pack.png" alt="">
            <img :class="{'hide': !isCollapse}" src="../assets/img/up.png" alt="">
            <div class="color-fff">{{isCollapse ? "展开":"收起"}}</div>
          </div>
          <!-- <i class="myicon myicon-menu toggle-btn" @click="toggleCollapse"></i> -->
        </div>
          <el-menu-item index="1" @click="jumpHome('1')">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu v-for="(submenu,i) in meunList" :key="i" :index="''+submenu.id">
            <template slot="title">
              <i :class="submenu.icon"></i>
              <span>{{submenu.title}}</span>
            </template>
            <!-- :class="childNum == a&&tabNum==i? '':'showColor'"  -->
            <el-menu-item
              v-for="(item,a) in submenu.data"
              :key="a"
              :index="''+item.id"
              @click="jump(item.url,a,i, item.optiond,item.id)"
            >{{item.title}}</el-menu-item>
          </el-submenu>
          <el-menu-item index="2" @click="jumpPassWord('2')">
            <i class="el-icon-lock"></i>
            <span slot="title">修改密码</span>
          </el-menu-item>
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-loading"></i>
              <span>企业数据维护</span>
            </template>
            <el-menu-item index="/addGoods">中标</el-menu-item>
            <el-menu-item index="/recycle">回收站</el-menu-item>
            <el-menu-item index="/userList">企信</el-menu-item>
            <el-menu-item index="/financial">金融服务</el-menu-item>
            <el-menu-item index="/relevance">相关公告</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>运营</span>
            </template>
            <el-menu-item index="compile">行业资质</el-menu-item>
            <el-menu-item index="quillediter">平台公示</el-menu-item>
            <el-menu-item index="addgoods">消息中心</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-loading"></i>
              <span>企业数据维护</span>
            </template>
            <el-menu-item index="/prize">数据维护</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>运营</span>
            </template>
            <el-menu-item index="compile">行业资质</el-menu-item>
            <el-menu-item index="quillediter">平台公示</el-menu-item>
            <el-menu-item index="addgoods">消息中心</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span>应用工具</span>
            </template>
            <el-menu-item index="vueEdit">评标预测</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/userInfo">用户信息</el-menu-item>
            <el-menu-item index="/orderManage">订单管理</el-menu-item>
            <el-menu-item index="/activeUser">活跃用户</el-menu-item>
            <el-menu-item index="/feedBack">企业排名</el-menu-item>
            <el-menu-item index="/feedBack">意见反馈</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>管理员账号</span>
            </template>
            <el-menu-item index="/adminAccount">账号管理</el-menu-item>
            <el-menu-item index="/adminRecord">操作日志</el-menu-item>
            <el-menu-item index="/adminRole">角色管理</el-menu-item>
          </el-submenu>
          <el-menu-item index="passWord">
            <template slot="title">
              <i class="el-icon-lock"></i>
              <span>修改密码</span>
            </template>
          </el-menu-item>
          <el-submenu index="9">
            <template slot="title">
              <i class="el-icon-document-copy"></i>
              <span>词典</span>
            </template>
            <el-menu-item index="/mainQualification">资质名称维护</el-menu-item>
            <el-menu-item index="/level">资质等级维护</el-menu-item>
            <el-menu-item index="/parsing">资质解析词典</el-menu-item>
            <el-menu-item index="/evaluation">评标办法词典</el-menu-item>
          </el-submenu>
          <el-submenu index="10">
            <template slot="title">
              <i class="el-icon-warning"></i>
              <span>设置</span>
            </template>
            <el-menu-item index="/explain">账号管理</el-menu-item>
            <el-menu-item index="/aptitudes">资质维护</el-menu-item>
            <el-menu-item index="/method">评标办法维护</el-menu-item>
            <el-menu-item index="/maintenance">等级维护</el-menu-item>
            <el-menu-item index="/maintain">公告维护</el-menu-item>
          </el-submenu>-->
        </el-menu>
      </el-aside>
      <el-container>
        <!-- header部分 -->
        <el-header>
          <div class="system-title">标大大后台管理系统</div>
          <el-dropdown menu-align="start">
            <div class="drc">
              <div>
                <img src="../assets/img/user.png" alt="">
              </div>
              <div class="color-fff userName ml10">{{userName}}</div>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="singout">
                <el-button type="text" @click="logout">退出</el-button>
              </el-dropdown-item>
              <el-dropdown-item command="passWord">
                <el-button type="text" @click="editWord">修改密码</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <!-- 中间内容部分 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { List } from "@/api/index";
export default {
  data() {
    return {
      isCollapse: false,
      meunList: null,
      childList: [],
      childNum: 0,
      tabNum: 0,
      userName: "",
      isAllowS: true,
      submenuKey: "", //展开的二级menu的index
      itemKey: "", // 展开的三级irem的index
      number: "1",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      this.submenuKey = "" + key;
    },
    handleClose(key, keyPath) {
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    logout() {
      localStorage.removeItem("Authorization");
      this.$router.push({ name: "login" });
    },
    editWord() {
      this.$router.push({ name: "passWord" });
    },
    jump(path, i, index, optiond, itemKey) {
      //是否有权限;
      this.isAllows = optiond == "operability";
      this.tabNum = index;
      this.childNum = i;
      this.$router.push({ name: path, query: { isAllows: this.isAllows } });
      this.itemKey = "" + itemKey;
      //这里缓存 submenuKey
      localStorage.setItem("submenuKey", this.submenuKey);
      //这里缓存 itemkey
      localStorage.setItem("itemKey", this.itemKey);
    },
    jumpHome(itemKey) {
     this.$router.push({ name: "home" });
     localStorage.setItem("itemKey", itemKey);
    },
    jumpPassWord(itemKey) {
      this.$router.push({ name: "passWord" });
      localStorage.setItem("itemKey", itemKey);
    },
    gethcitemKey() {
      //获取缓存itemkey
      var a = localStorage.getItem("itemKey");
      if (a != null) {
        return a;
      } else {
        return "1";
        localStorage.setItem("itemKey", this.number);
      }
    },
    gethcsubmenuKey() {
      //获取缓存submenuKey
      var a = localStorage.getItem("submenuKey");
      if (a != null) {
        return a;
      } else {
        return "0";
      }
    }
  },
  beforeMount() {
    List().then(res => {
      if (res.code == "1") {
        this.meunList = res.data.menu;
        this.userName = res.data.adminName;
      } else {
        console.info("菜单导航栏接口不通");
      }
    });
  },
};
</script>


<style lang="less" scoped>
@import "../style/icon";
@import "../style/mixin";
.home {
  height: 100%;
  ul {
    border-right: 1px solid #000000;
    min-width: 135px !important;
  }
 ul,li {
    background-color: @mainColor !important;
  }
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .h64 {
      height: 65px;
    }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: @mainColor;
  }
  .el-header {
    display: flex;
    height: 64px !important;
    justify-content: space-between;
    align-items: center;
    background-color: #000000;
  }
  .logo {
    height: 64px;
    padding: 10px 20px;
    // width: 200px;
    // background: url(../assets/img/download_logo.png);
    // background-size: contain;
    // background-repeat: no-repeat;
    box-sizing: border-box;
    img {
      height: 44px;
    }
  }
  .toggle-btn {
    font-size: 36px;
    color: #989898;
    cursor: pointer;
    line-height: 60px;
  }
  .system-title {
    font-size: 18px;
    color: white;
    margin-left: 50px;
  }
  .welcome {
    color: white;
  }
  .userName {
    cursor: pointer;
  }
  .avator {
    height: 36px;
    width: 36px;
    border-radius: 50%;
    margin-right: 37px;
  }
  .showColor {
    color: #fff !important;
  }
}
 .el-dropdown-menu__item {
   padding: 0 !important;
  .el-button {
    width: 96px !important;
    height: 36px !important;
  }
}
</style>
