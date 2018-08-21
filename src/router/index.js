import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login'
import Manage from '@/page/manage'
import addShop from '@/page/addShop'
import Bin from '@/page/bin'
import userList from '@/page/userlist'
import Edit from '@/page/edit'
import Aptitudes from '@/page/aptitudes'
import Method from '@/page/method'
import Maintenance from '@/page/maintenance'
import Home from '@/page/first'
Vue.use(Router)

const routes = [
		{
			path:'/',
			component:Login,
			name:'login'
		},
		{
			path:'/edit',
			component:Edit,
			name:'edit'
		},
		{
			path:'/manage',
			component:Manage,
			name:'manage',
			children:[
					{
						path:'/addshop',
					component: addShop,
						name:'addShop'
					},
					{
						path:'/addgoods',
						component: () => import('@/page/addGoods'),
						name:'addGoods'
					},
					{
						path:'/bin',
						component:Bin,
						name:'bin'
					},
					{
						path:'/home',
						component:Home,
						name:'home'
					},
					{
						path:'/userlist',
						component:userList,
						name:'userList'
					},
					{
						path:'/aptitudes',
						component:Aptitudes,
						name:'aptitudes'
				  },
					{
              path:'/maintenance',
              component:Maintenance,
              name:'maintenance'
          },
          {
              path:'/method',
              component:Method,
              name:'method'
          }
]
		}


]


export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
