<template>
		
	<div class="home">
		<el-container>
			<!-- 侧边栏 -->
			<el-aside width="auto">

				<el-menu 
				:router="true" 
				:collapse="isCollapse" 
				class="el-menu-admin" 
				@open="handleOpen" 
				@close="handleClose" 
				background-color="#545c64" 
				text-color="#fff" 
				active-text-color="#ffd04b">			
						<div class="logo">
							<img src="../assets/img/download_logo.png">
						</div>
						<el-submenu index="3">
							<template slot="title">
								<i class="el-icon-plus"></i>
								<span>业务</span>			
							</template>
							<el-menu-item index="addShop">招标</el-menu-item>
							<el-menu-item index="addGoods">中标</el-menu-item>
							<el-menu-item index="bin">回收站</el-menu-item>
							<el-menu-item index="userList">企信</el-menu-item>
							<el-menu-item index="service">金融服务</el-menu-item>
						</el-submenu>
						<el-submenu index="4">
							<template slot="title">
								<i class="el-icon-star-on"></i>
								<span>运营</span>
							</template>
							<el-menu-item index="visitor">行业资质</el-menu-item>
							<el-menu-item index="visitor">平台公示</el-menu-item>
							<el-menu-item index="addgoods">消息中心</el-menu-item>
							<el-menu-item index="visitor">意见反馈</el-menu-item>
							<!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
						</el-submenu>
						<el-submenu index="5">
							<template slot="title">
								<i class="el-icon-edit"></i>
								<span>应用工具</span>
							</template>
							<!-- <el-menu-item index="uploadImg">上传图片</el-menu-item> -->
							<el-menu-item index="vueEdit">评标预测</el-menu-item>
						</el-submenu>
						<el-submenu index="6">
							<template slot="title">
								<i class="el-icon-setting"></i>
								<span>用户管理</span>
							</template>
							<el-menu-item index="adminSet">管理员设置</el-menu-item>
							<!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
						</el-submenu>
						<el-submenu index="7">
							<template slot="title">
								<i class="el-icon-warning"></i>
								<span>设置</span>
								</template>
							<el-menu-item index="explain">账号管理</el-menu-item>
							<el-menu-item index="aptitudes">资质维护</el-menu-item>
							<el-menu-item index="method">评标办法维护</el-menu-item>
							<el-menu-item index="maintenance">等级维护</el-menu-item>
						</el-submenu>

				</el-menu>
			</el-aside>
			<el-container>

				<!-- header部分 -->
				<el-header>
					<i class="myicon myicon-menu toggle-btn" @click="toggleCollapse"></i>
					<div class="system-title">后台运营系统</div>
					
						<el-dropdown  menu-align='start'>
							<img src="../assets/img/2.png" class="avator">
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="home">首页</el-dropdown-item>
								<el-dropdown-item command="singout" ><el-button type="text" @click="logout">退出</el-button></el-dropdown-item>
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
    export default {
		 data() {
		return {
			isCollapse: false
		}
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath)
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath)
		},
		toggleCollapse() {
			this.isCollapse = !this.isCollapse
		},
		logout() {
			localStorage.removeItem('Authorization')
			this.$router.push({ name: 'login' })
		}
	},
	mounted() {
		// let params = { params: { query: '', pagenum: 1, pagesize: 1 } }
		// getUserList(params).then(res => {
		//   console.log(res)
		// })
	}
}
</script>


<style lang="less" scoped>
   @import '../style/icon';
.home {
	height: 100%;
	.el-menu-admin:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}
	.el-container {
		height: 100%;
	}
	.el-aside {
		background-color: #545c64;
	}
	.el-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #545c64;
	}

	.logo {
		height: 60px;
		padding: 10px 20px;
		// width: 200px;
    // background: url(../assets/img/download_logo.png);
		// background-size: contain;
		// background-repeat: no-repeat;
		box-sizing: border-box;
		background-color: #fff;
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
		font-size: 28px;
		color: white;
	}
	.welcome,
	{
		color: white;
	}
	
	.avator {
		height: 36px;
		width: 36px;
		border-radius: 50%;
		margin-right: 37px;
	}

}

	
</style>
