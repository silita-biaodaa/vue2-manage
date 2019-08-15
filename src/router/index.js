import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login'
import Manage from '@/page/manage'
import Tender from '@/page/tender'
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
import Recycle from '@/page/recycle'
import Bidding from '@/page/bidding'


Vue.use(Router)

const routes = [
	{
		path: '/',
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
				path: '/tender',
				component: Tender,
				name: 'tender'
			},
			{
				path: '/addgoods',
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
			{
				path: '/users',
				name: 'users',
				component: resolve => require(['@/page/user/user.vue'], resolve)
			},
			{
				path: '/userInfo',
				name: 'userInfo',
				component: resolve => require(['@/page/user/userInfo.vue'], resolve)
			},
			{
				path: '/activeUser',
				name: 'activeUser',
				component: resolve => require(['@/page/user/activeUser.vue'], resolve)
			},
			{
				path: '/orderManage',
				name: 'orderManage',
				component: resolve => require(['@/page/user/orderManage.vue'], resolve)
			},
			{
				path: '/financial',
				name: 'financial',
				component: resolve => require(['@/page/business/financial.vue'], resolve)
			}
		]
	}
]


export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
