import axios from 'axios'
import Vue from 'vue'
Vue.prototype.$http = axios
// const baseURL = 'http://192.168.1.161:8080/biaodaa-back/'
// const baseURL = 'http://192.168.1.131:8080/'
// const baseURL = 'http://pre-admin.biaodaa.com/'
const baseURL = 'http://admin.biaodaa.com/'


axios.defaults.baseURL = baseURL;

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

axios.interceptors.response.use(function (response) { // ①10010 token过期（30天） ②10011 token无效
    if (response.data.code === 402 || response.data.code === 401) {
        localStorage.removeItem('Authorization')
        // this.$router.replace({
        //     path: '/login' // 到登录页重新获取token
        // })
        location.href = '/#/logo'
    }
    return response
}, function (error) {
    return Promise.reject(error)
})

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

// 资质类别接口
export const checkType = params => {
    return axios.post('qual/qualCate').then(res => res.data)
}
//
export const register = params => {
    return axios.post('authorize/login', params).then(res => res.data)
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
//等级一级查询
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
//地区二级联动下拉框
export const listArea = params => {
    return axios.post('zhaobiao/listSysArea', params).then(res => res.data)
}

// 获取公告状态
export const listStatus = params => {
    return axios.post('zhaobiao/listNoticeStatus').then(res => res.data)
}

// 获取公告列表
export const listMain = params => {
    return axios.post('zhaobiao/listNtMain', params).then(res => res.data)
}

export const exportE = form => {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: 'zhaobiao/exportTendersExcel', // 请求地址
        data: form, // 参数
        responseType: 'blob', // 表明返回服务器返回的数据类型
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.data)
}
// 导出中标EXCEL
export const exportX = form => {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: 'zhongbiao/exportBidsDetail', // 请求地址
        // timeout:300000,
        data: form, // 参数
        responseType: 'blob', // 表明返回服务器返回的数据类型
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.data)
}
// 设置变更招中标参数
export const updateStatus = params => {
    return axios.post('zhaobiao/updateNtMainStatus', params).then(res => res.data)
}

// 设置变更招中标参数
export const listFixed = params => {
    return axios.post('zhaobiao/listFixedEditData').then(res => res.data)
}

// 获取标段信息
export const listTenders = params => {
    return axios.post('zhaobiao/listNtTenders', params).then(res => res.data)
}
// 获取招标文件列表
export const listFiles = params => {
    return axios.post('zhaobiao/listZhaoBiaoFiles', params).then(res => res.data)
}

// 上传招标路径
export const listFilesPath = params => {
    return axios.post('zhaobiao/insertZhaoBiaoFilePath', params).then(res => res.data)
}

// 删除招标文件
export const deleteFiles = params => {
    return axios.post('zhaobiao/deleteZhaoBiaoFile', params).then(res => res.data)
}

// 获取评标办法
export const listPbMode = params => {
    return axios.post('zhaobiao/listPbMode', params).then(res => res.data)
}
// 删除编辑明细
export const deletePkid = params => {
    return axios.post('zhaobiao/deleteNtTendersByPkId', params).then(res => res.data)
}
//获取关联公告列表
export const listGp = params => {
    return axios.post('common/listRelevantNotice', params).then(res => res.data)
}
// 保存招标公告标段信息
export const insertNt = params => {
    return axios.post('zhaobiao/saveNtTenders', params).then(res => res.data)
}

// 删除公告
export const delpost = params => {
    return axios.post('zhaobiao/del', params).then(res => res.data)
}
// 获取关联公告列表
export const listNtgp = params => {
    return axios.post('zhaobiao/listNtAssociateGp', params).then(res => res.data)
}
//
export const listreli = params => {
    return axios.post('zhaobiao/deleteNtAssociateGp', params).then(res => res.data)
}
// 添加关联公告
export const relivan = params => {
    return axios.post('zhaobiao/insertNtAssociateGp', params).then(res => res.data)
}
// 回收站列表
export const listrecyc = params => {
    return axios.post('recycle/list', params).then(res => res.data)
}
// 公告原文列表
export const cyccontent = params => {
    return axios.post('common/detail', params).then(res => res.data)
}
// 回收站删除
export const cycdel = params => {
    return axios.post('recycle/del', params).then(res => res.data)
}
// 回收站恢复
export const cycrecover = params => {
    return axios.post('recycle/recover', params).then(res => res.data)
}
// 单个标段信息
export const getNt = params => {
    return axios.post('zhaobiao/getNtTenders', params).then(res => res.data)
}
// 变更标段信息
export const insertNtC = params => {
    return axios.post('zhaobiao/insertTbNtChange', params).then(res => res.data)
}
// 中标公告编辑明细列表
export const bidList = params => {
    return axios.post('zhongbiao/listTbNtBids', params).then(res => res.data)
}
// 多选删除中标编辑明细
export const delDidList = params => {
    return axios.post('zhongbiao/deleteTbNtBids', params).then(res => res.data)
}
// 获取中标文件列表
export const bidFiles = params => {
    return axios.post('zhongbiao/listZhaoBiaoFiles', params).then(res => res.data)
}
// 获取中标关联公告列表
export const bidRela = params => {
    return axios.post('zhongbiao/listNtAssociateGp', params).then(res => res.data)
}
// 获取招标编辑明细列表
export const bidzhaoList = params => {
    return axios.post('zhongbiao/listNtTenders', params).then(res => res.data)
}
// 删除招标编辑明细列表
export const biddelList = params => {
    return axios.post('zhongbiao/deleteNtTenders', params).then(res => res.data)
}
// 根据关键词、拼音搜索企业
export const bidcompany = params => {
    return axios.post('zhongbiao/listCompany', params).then(res => res.data)
}
// 保存的中变编辑明细
export const bidSave = params => {
    return axios.post('zhongbiao/saveTbNtBids', params).then(res => res.data)
}
// 纠错首页查询
export const errSelect = params => {
    return axios.post('correction/listNotice', params).then(res => res.data)
}
// 纠错删除
export const errDele = params => {
    return axios.post('correction/deleteNotice', params).then(res => res.data)
}
// 纠错保存
export const errSave = params => {
    return axios.post('correction/updateZhaobiaoDetail', params).then(res => res.data)
}
// 纠错明细
export const gainRes = params => {
    return axios.post('correction/listZhaobiaoDetail', params).then(res => res.data)
}
// 资质别名
export const gainAlia = params => {
    return axios.post('correction/ListAllZh', params).then(res => res.data)
}
// 中标编辑明细
export const ongList = params => {
    return axios.post('correction/listZhongbiaoDetail', params).then(res => res.data)
}
// 中标企业候选人
export const ongCom = params => {
    return axios.post('correction/listCompany', params).then(res => res.data)
}
// 保存中标
export const ongSave = params => {
    return axios.post('correction/updateZhongbiaoDetail', params).then(res => res.data)
}
// 获取内容
export const ongText = params => {
    return axios.post('correction/getSnatchurlcontent', params).then(res => res.data)
}
// 获取资质等级
export const bidAt = params => {
    return axios.post('qual/qualGrade/notic/list', params).then(res => res.data)
}
// 获取资质等级
export const changeF = params => {
    return axios.post('zhongbiao/listDetailChangeFields', params).then(res => res.data)
}
// 导出Excel获奖信息
export const EXport1 = params => {
    return axios.post('export/exportExcel', params).then(res => res.data)
}
// 全选删除
export const reCol = params => {
    return axios.post('corp/requ/check/del', params).then(res => res.data)
}
// 全选删除
export const addNotice = params => {
    return axios.post('notice/add', params).then(res => res.data)
}
// 意见反馈
export const feedback = params => {
    return axios.post('feedback/new/list', params).then(res => res.data)
}
// 用户统计
export const userAll = params => {
    return axios.post('user/count', params).then(res => res.data)
}
// 用户数据
export const userData = params => {
    return axios.post('user/list', params).then(res => res.data)
}
// 锁定
export const userLock = params => {
    return axios.post('user/lock', params).then(res => res.data)
}
// 锁定
export const finData = params => {
    return axios.post('FinService/listFinService', params).then(res => res.data)
}
// 金融Excel
export const finEX = form => {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: 'FinService/exportFinService', // 请求地址
        data: form, // 参数
        responseType: 'blob', // 表明返回服务器返回的数据类型
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.data)
}
// 删除中标公告
export const delbiding = params => {
    return axios.post('zhongbiao/delNtMain', params).then(res => res.data)
}
//活跃用户统计
export const activeUnum = () => {
    return axios.post('user/active/count').then(res => res.data);
}
//活跃用户筛选搜索
export const activeUlist = params => {
    return axios.post('user/active/list', params).then(res => res.data);
}
//用户信息统计
export const userNum = () => {
    return axios.post('user/count').then(res => res.data);
}
//用户列表
export const userList = params => {
    return axios.post('user/info/list', params).then(res => res.data);
}
//个人用户信息
export const personInfo = params => {
    return axios.post('user/info/personage',params).then(res => res.data);
}
//邀请人信息
export const invitInfo = params => {
    return axios.post('user/inviter',params).then(res => res.data);
}
//赠送会员
export const addVip = params => {
    return axios.post('vip/add',params).then(res => res.data);
}
//会员信息
export const vipInfo = params => {
    return axios.post('vip/profits/detail',params).then(res => res.data);
}
//添加备注
export const userRemarks = params => {
    return axios.post('user/updateRemark',params).then(res => res.data);
}
//订单统计
export const orderNum = () => {
    return axios.post('user/order/count').then(res => res.data);
}
//订单管理
export const orderManage = params => {
    return axios.post('order/list',params).then(res => res.data);
}
//反馈统计
export const feedCount = () => {
    return axios.post('feedback/count').then(res => res.data);
}
//反馈列表
export const feedList = params => {
    return axios.post('feedback/new/list',params).then(res => res.data);
}
//修改意见反馈备注
export const upRemark = params => {
    return axios.post('feedback/updateRemark',params).then(res => res.data);
}
//账号管理列表
export const manageList= params => {
    return axios.post('backstage/user/accountList', params).then(res => res.data);
}
//管理员锁定解锁
export const manageLock = params => {
    return axios.post('backstage/user/updateLock', params).then(res => res.data);
}
//操作日志列表
export const operate = params => {
    return axios.post('logs/list',params).then(res => res.data);
}
//修改操作状态
export const operateState = params => {
    return axios.post('feedback/updateState',params).then(res => res.data);
}
//管理员对用户解锁锁定
export const updateLock = params => {
    return axios.post('/user/lock',params).then(res => res.data);
}
//重置初始密码
export const setPassWord = params => {
    return axios.post('backstage/user/updateResetPassword',params).then(res => res.data);
}
//修改密码
export const updatePsd = params => {
    return axios.post('backstage/user/updatePassword',params).then(res => res.data);
}
//展示菜单
export const List= () => {
    return axios.post('module/list').then(res => res.data);
}
//获取角色
export const roleAll = () => {
    return axios.post('role/roleAll').then(res => res.data);
}
//添加管理员
export const addAccount = params => {
    return axios.post('backstage/user/add',params).then(res => res.data);
}
//编辑管理员
export const updateAccount = params => {
    return axios.post('backstage/user/updateAdministrator',params).then(res => res.data);
}
//角色管理列表
export const role = params => {
    return axios.post('role/list', params).then(res => res.data);
}
//添加角色权限
export const powerRole = params => {
    return axios.post('role/addRole',params).then(res => res.data);
}
//可添加角色查询
export const searchRole = () => {
    return axios.post('module/addUserModule').then(res => res.data);
}
//角色权限可查询
export const searchPower = params => {
    return axios.post('module/updateUserModule',params).then(res => res.data);
}
//保存编辑权限
export const editPower = params => {
    return axios.post('role/updateRole',params).then(res => res.data);
}
//获取评标列表
export const evaluList = params => {
    return axios.post('common/list',params).then(res => res.data);
}
//单个或批量删除该评标办法名称
export const deleteInfo = params => {
    return axios.post('common/deleteDicCommonIds',params).then(res => res.data);
}
//添加评标办法
export const addName = params => {
    return axios.post('dataMaintain/insertPbMode',params).then(res => res.data);
}
//查询评标办法别名
export const alias = params => {
    return axios.post('dataMaintain/listPbModeAlias',params).then(res => res.data);
}
//删除评标办法别名
export const deleteAlias = params => {
    return axios.post('dataMaintain/deletePbModeAlias',params).then(res => res.data);
}
//添加评标办法别名
export const addAliasList = params => {
    return axios.post('dataMaintain/insertPbModeAlias',params).then(res => res.data);
}
//修改评标办法名称
export const updateName = params => {
    return axios.post('common/updateDicCommonId',params).then(res => res.data);
}
//修改评标别名名称
export const updateAlias = params => {
    return axios.post('dataMaintain/updatePbModeAlias',params).then(res => res.data);
}
//公告统计
export const noticeNum = () => {
    return axios.post('notice/noticeCount').then(res => res.data);
}
//公告站点统计
export const siteNoticeNum = params => {
    return axios.post('notice/siteNoticeCount',params).then(res => res.data);
}
//资质列表
export const qualList = params => {
    return axios.post('qual/list',params).then(res => res.data);
}
//资质筛选列表
export const screenList = () => {
    return axios.post('qual/qualSpinner').then(res => res.data);
}
//删除资质
export const deteleQual = params => {
    return axios.post('qual/del',params).then(res => res.data);
}
//添加资质
export const addQual = params => {
    return axios.post('qual/add',params).then(res => res.data);
}
//资质别名列表
export const aliasList = params => {
    return axios.post('alias/list',params).then(res => res.data);
}
//删除资质别名
export const deleteQualAlias = params => {
    return axios.post('alias/qual/del',params).then(res => res.data);
}
//添加资质别名
export const addAliasName = params => {
    return axios.post('alias/add',params).then(res => res.data);
}
//资质等级查询
export const searchLevel = params => {
    return axios.post('grade/option/list',params).then(res => res.data);
}
//资质等级列表
export const levelList = params => {
    return axios.post('grade/sec/list',params).then(res => res.data);
}
//资质等级别别名列表
export const levelAlias = params => {
    return axios.post('alias/list',params).then(res => res.data);
}
//资质维护中资质属性
export const aliasMode = params => {
    return axios.post('qual/getBizType',params).then(res => res.data);
}
//修改资质属性
export const changeMode = params => {
    return axios.post('qual/updateBizType',params).then(res => res.data);
}
//修改资质
export const changeQual = params => {
    return axios.post('qual/upd',params).then(res => res.data);
}
//修改等级
export const changeLevelList = params => {
    return axios.post('rel/upd',params).then(res => res.data);
}
//资质解析筛选
export const qualAnalysis = params => {
    return axios.post('analysis/list',params).then(res => res.data);
}
//等级列表
export const levelListData = params => {
    return axios.post('grade/list',params).then(res => res.data);
}
//删除等级别名
export const deleteLevelAlias = params => {
    return axios.post('alias/del',params).then(res => res.data)
}
//资质解析别名添加
export const addAnalysisAlias = params => {
    return axios.post('analysis/add',params).then(res => res.data);
}
//资质解析删除
export const deleteAnalysis = params => {
    return axios.post('analysis/del',params).then(res => res.data);
}



//资质解析删除
export const fromData = params => {
    return axios.post('api/v1/custom/list/form',params).then(res => res.data);
}