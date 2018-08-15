import axios from 'axios' 
const baseURL = 'http://120.79.116.245:19004/'
axios.defaults.baseURL = baseURL

// const baseURL = 'http://192.168.1.133:8080/'
// axios.defaults.baseURL = baseURL
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 将token给到一个前后台约定好的key中，作为请求发送
  let token = localStorage.getItem('Authorization')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})


// 资质页面资质的类型获取
export const checkUser = params => {
  return axios.post('qual/qualCate').then(res => res.data)
}

//
export const register = params => {
  return axios.post('authorize/login',params).then(res => res.data)
}

// 获取省份code 
export const province = params => {
  return axios.post('dataMaintain/listProvince').then(res => res.data)
}


