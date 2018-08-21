import axios from 'axios'

// const baseURL = 'http://192.168.1.161:8080/biaodaa-back/'
// const baseURL = 'http://192.168.1.133:8080/'
const baseURL = 'http://120.79.116.245:19004/'
axios.defaults.baseURL = baseURL

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

// axios.interceptors.response.use(function (response) { // ①10010 token过期（30天） ②10011 token无效
//     if (response.data.code === 402 || response.data.code === 401) {
//         localStorage.removeItem('Authorization')
//         router.replace({
//             path: '/login' // 到登录页重新获取token
//         })
//     } else if (response.data.token) { // 判断token是否存在，如果存在说明需要更新token
//         localStorage.setItem('Authorization',response.data.token) // 覆盖原来的token(默认一天刷新一次)
//     }
//     return response
// }, function (error) {
//     return Promise.reject(error)
// })


// 资质类型接口
export const checkUser = params => {
    return axios.post('dataMaintain/listPbMode').then(res => res.data)
}

// 资质类别接口
export const checkType = params => {
    return axios.post('qual/qualCate').then(res => res.data)
}

//
export const register = params => {
    return axios.post('authorize/login', params).then(res => res.data)
}

// 获取省份code
export const province = params => {
    return axios.post('dataMaintain/listProvince').then(res => res.data)
}
//添加别名
export const addtAlias = params => {
    return axios.post('dataMaintain/insertPbModeAlias', params).then(res => res.data)
}
//删除别名
export const delectAlias = params => {
    return axios.post('dataMaintain/deletePbModeAlias', params).then(res => res.data)
}
//获取别名
export const showAlias = params => {
    return axios.post('dataMaintain/deletePbModeAlias', params).then(res => res.data)
}

// 资质列表查询
export const queryList = params => {
    return axios.post('qual/list', params).then(res => res.data)
}

//添加 修改得
export const curd = params => {
    return axios.post('qual/add', params).then(res => res.data)
}
//删除资质
export const deleteApi = params => {
    return axios.post('qual/del', params).then(res => res.data)
}
//资质别名的添加
export const addAlias = params => {
    return axios.post('qual/alias/add', params).then(res => res.data)
}
//别名资质上传
export const uploadAlias = params => {
    return axios.post('upload/quaAlias', params).then(res => res.data)
}
//添加公告等级
export const addLevel = params => {
    return axios.post('qual/grade/add', params).then(res => res.data)
}
// 展示等级
export const showLevel = params => {
    return axios.post('qual/grade/list', params).then(res => res.data)
}
//等级列表
export const showtLevel = params => {
    return axios.post('grade/list').then(res => res.data)
}
// 别名搜索
export const selectAlias = params => {
    return axios.post('alias/list', params).then(res => res.data)
}
// 资质别名得修改
export const amendAlias = params => {
    return axios.post('qual/alias/update', params).then(res => res.data)
}
// 等级一级查询
export const firstgrade = params => {
    return axios.post('grade/cate/list', params).then(res => res.data)
}
//等级二级查询
export const secondLevel = params => {
    return axios.post('grade/sec/list', params).then(res => res.data)
}

export const addtLevel = params => {
    return axios.post('qual/grade/add', params).then(res => res.data)
}

// 展示等级
export const showgrade = params => {
    return axios.post('qual/grade/list', params).then(res => res.data)
}

//删除等级
export const delgrade = params => {
    return axios.post('qual/grade/del', params).then(res => res.data)
}

export const getJsonData = (url, params) => {
    return new Promise((resolve, reject) => {
        let token = localStorage.getItem("Authorization")
        if (params != null) {
            axios.post(url, params, {
                headers: { 'Content-Type': 'application/json', 'Authorization': token }
            }).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        } else {
            axios.post(url, null, {
                headers: { 'Content-Type': 'application/json', 'Authorization': token }
            }).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        }
    })

}