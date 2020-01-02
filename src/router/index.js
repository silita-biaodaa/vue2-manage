import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login'
import Manage from '@/page/manage'
import Tender from '@/page/tender' //招标
import Bin from '@/page/bin'
import UserList from '@/page/userlist'
import Quality from '@/page/quality'
import Safety from '@/page/safety'
import Security from '@/page/security'
import Prize from '@/page/prize'
import Viwedata from '@/page/viwedata'
import Edit from '@/page/edit'
import Aptitudes from '@/page/aptitudes'
import Method from '@/page/method'
import Maintenance from '@/page/maintenance'
import Home from '@/page/first'
import Compile from '@/page/compile'
const Addgoods = resolve => require(['@/page/addGoods'], resolve)
import Editer from '@/page/editer'
import Rease from '@/page/rease'
import Quillediter from '@/page/QuillEditor'
import Detail from '@/page/detail'
import Relevance from '@/page/relevance'
import Recycle from '@/page/recycle' //回收站
import Bidding from '@/page/bidding'
import PassWord from '@/page/passWord' //修改密码

Vue.use(Router)

const routes = [
	{
		path: '/', //登录页面
		redirect: '/login' 
	},
	{
		path: '/login',
		component: Login,
		name: 'login'
	},
	{
		path: '/edit',
		component: Edit,
		name: 'edit'
	},
	{
		path: '/manage',
		component: Manage,
		name: 'manage',
		children: [
			{
				path: '/tender', //招标
				component: Tender,
				name: 'tender'
			},
			{
				path: '/addgoods', //中标
				component: Addgoods,
				name: 'addGoods'
			},
			{
				path: '/bidding/:id/:code',
				component: Bidding,
				name: 'bidding'
			},
			{
				path: '/bin',
				component: Bin,
				name: 'bin'
			},
			{
				path: '/home',
				component: Home,
				name: 'home'
			},
			{
				path: '/userlist',
				component: UserList,
				name: 'userList'
			},
			{
				path: '/prize',
				component: Prize,
				name: 'prize'
			},
			{
				path: '/quality',
				component: Quality,
				name: 'quality'
			},
			{
				path: '/record',
				component: resolve => require(['@/page/record.vue'], resolve),
				name: 'record'
			},
			{
				path: '/passWord',
				component: PassWord,
				name: 'passWord'
			},
			{
				path: '/safety',
				component: Safety,
				name: 'safety'
			},
			{
				path: '/security',
				component: Security,
				name: 'security'
			},
			{
				path: '/security',
				component: Security,
				name: 'security'
			},
			{
				path: '/viwedata',
				component: Viwedata,
				name: 'viwedata'
			},
			{
				path: '/aptitudes',
				component: Aptitudes,
				name: 'aptitudes'
			},
			{
				path: '/maintenance',
				component: Maintenance,
				name: 'maintenance'
			},
			{
				path: '/method',
				component: Method,
				name: 'method'
			},
			{
				path: '/compile/:id/:code',
				component: Compile,
				name: 'compile'
			},
			{
				path: '/editer/:id',
				component: Editer,
				name: 'editer'
			},
			{
				path: '/rease',
				component: Rease,
				name: 'rease'
			},
			{
				path: '/quillediter',
				component: Quillediter
			}
			, {
				path: '/detail',
				component: Detail,
				name: 'detail'

			},
			{
				path: '/relevance',
				component: Relevance,
				name: 'relevance'
			},
			{
				path: '/recycle',
				component: Recycle,
				name: 'recycle'
			},
			{
				path: '/opinion',
				name: 'opinion',
				component: resolve => require(['@/page/opinion/opinions.vue'], resolve)
			},
			{
				path: '/maintain',
				name: 'maintain',
				component: resolve => require(['@/page/maintains/maintain.vue'], resolve)
			},
			// {
			// 	path: '/users',
			// 	name: 'users',
			// 	component: resolve => require(['@/page/user/user.vue'], resolve)
			// },
			{
				path: '/userInfo', //用户信息
				name: 'userInfo',
				component: resolve => require(['@/page/user/userInfo.vue'], resolve)
			},
			{
				path: '/activeUser', //活跃用户
				name: 'activeUser',
				component: resolve => require(['@/page/user/activeUser.vue'], resolve)
			},
			{
				path: '/orderManage', //订单管理
				name: 'orderManage',
				component: resolve => require(['@/page/user/orderManage.vue'], resolve)
			},
			{
				path: '/feedBack', //意见反馈
				name: 'feedBack',
				component: resolve => require(['@/page/user/feedBack.vue'], resolve)
			},
			{
				path: '/financial', 
				name: 'financial',
				component: resolve => require(['@/page/business/financial.vue'], resolve)
			},
			{
				path: '/adminAccount', //管理账号
				name: 'adminAccount',
				component: resolve => require(['@/page/admin/adminAccount.vue'], resolve)
			},
			{
				path: '/adminRecord', //管理权限
				name: 'adminRecord', 
				component: resolve => require(['@/page/admin/adminRecord.vue'], resolve)
			},
			{
				path: '/adminRole', //添加角色
				name: 'adminRole',
				component: resolve => require(['@/page/admin/adminRole.vue'], resolve)
			},
			{
				path: '/evaluation', //评标办法名称
				name: 'evaluation',
				component: resolve => require(['@/page/dictionary/evaluation.vue'], resolve)
			},
			{
				path: '/mainQualification', //资质名称维护
				name: 'mainQualification',
				component: resolve => require(['@/page/dictionary/mainQualification.vue'], resolve)
			},
			{
				path: '/level', //资质等级维护
				name: 'level',
				component: resolve => require(['@/page/dictionary/level.vue'], resolve)
			},
			{
				path: '/parsing', //资质解析词典
				name: 'parsing',
				component: resolve => require(['@/page/dictionary/parsing.vue'], resolve)
			}
		]
	}
]


export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
