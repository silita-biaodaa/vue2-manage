import axios from 'axios'

<<<<<<< HEAD

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
     this.$router.push({name: 'login'})
    return Promise.reject(error)
})
=======
//葛明义端口
>>>>>>> local/develop


const baseURL = 'http://120.79.116.245:19004/'
axios.defaults.baseURL = baseURL

// 资质类型接口
export const checkUser = params => {
    return axios.post('dataMaintain/listPbMode').then(res => res.data)
}


export const register = params => {
    return axios.post('authorize/login',params).then(res => res.data)
}


export const getJsonData = (url,params) => {
    return new Promise((resolve,reject)=>{
        let token = localStorage.getItem("Authorization")
        if(params!=null) {
            axios.post(url, params, {
                headers: {'Content-Type': 'application/json'}//,'Authorization': token}
            }).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        }else{
            axios.post(url,null, {headers: {'Content-Type': 'application/json'}//,'Authorization': token}
            }).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        }

    })

}
// 获取省份code
export const province = params => {
    return axios.post('dataMaintain/listProvince').then(res => res.data)
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
<<<<<<< HEAD
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
    return axios.post('alias/list',params).then(res => res.data)
}
// 资质别名得修改
export const amendAlias = params => {
    return axios.post('qual/alias/update', params).then(res => res.data)
}
=======
>>>>>>> local/develop

// 朱帅端口
// const baseURL = 'http://192.168.1.133:8080/'
// axios.defaults.baseURL = baseURL

// export const checkUser = params => {
//   return axios.post('qual/qualCate').then(res => res.data)
// }
