import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(ElementUI);

// 全局路由守卫

// router.beforeEach((to, from, next) => {
	// 获取得token
// 	let token = localStorage.getItem('mytoken')
// 	// 如果已经登录，那我不干涉你，让你随便访问
// 	if (token) {
	// 判断得是否拥有得token
// 		next()
   //
// 	} else {
// 		if (to.path !== '/login') {
// 			// 如果没有登录，但你访问其他需要登录的页面，那我就让你跳到登录页面去
// 			next({ path: '/login' })
// 		} else {
// 			// 如果没有登录，但你访问的login，那就不干涉你，让你访问
// 			next()
// 		}
// 	}
// })

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
