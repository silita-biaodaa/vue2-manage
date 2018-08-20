import axios from 'axios'

//葛明义端口


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

// 朱帅端口
// const baseURL = 'http://192.168.1.133:8080/'
// axios.defaults.baseURL = baseURL

// export const checkUser = params => {
//   return axios.post('qual/qualCate').then(res => res.data)
// }
