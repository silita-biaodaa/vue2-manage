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
        if(params!=null) {
            axios.post(url, params, {
                headers: {'Content-Type': 'application/json'}
            }).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        }else{
            axios.post(url).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        }

    })

}

// 朱帅端口
// const baseURL = 'http://192.168.1.133:8080/'
// axios.defaults.baseURL = baseURL

// export const checkUser = params => {
//   return axios.post('qual/qualCate').then(res => res.data)
// }
