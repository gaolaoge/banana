import {
    axios_j,
    axios_w
} from '@/api/axios_create'

// ——————————————————————————平台管理——————————————————————————
// ————————————————————————数据存储管理————————————————————————
//数据存储管理获取列表
export function storageM_showFATList(data) {
    return axios_w({
        url: `/platform/storageM_showFATList.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//获取部门列表
export function echo_department2(data) {
    return axios_w({
        url: `/system/echo_department2.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//获取自定义部门下文件夹列表
export function storageM_showCustomLsit(data) {
    return axios_w({
        url: `/platform/storageM_showCustomLsit.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//获取固定存储、临时存放文件查看页面列表
export function storageM_showFileDetials(data) {
    return axios_w({
        url: `/platform/storageM_showFileDetials.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//获取自定义文件查看页面列表
export function storageM_showCustomDetials(data) {
    return axios_w({
        url: `/platform/storageM_showCustomDetials.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//获取共享文件查看页面列表
export function storageM_showPublicDetials(data) {
    return axios_w({
        url: `/platform/storageM_showPublicDetials.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//下载
export function enterpriseFile_download(data) {
    return axios_w({
        url: `/company/enterpriseFile_download.do` + data,
        method: 'GET',
        timeout: 5000,
    })
}

//预览
export function enterpriseFile_preview(data) {
    return axios_w({
        url: `/company/enterpriseFile_preview.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

// —————————————————————————数据下载管理————————————————————
//下载管理图表显示
export function downloadChart_A(data) {
    return axios_w({
        url: `/downloadM/downloadChart_A.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//下载管理表格显示
export function downloadChart_B(data) {
    return axios_w({
        url: `/downloadM/downloadChart_B.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//查看下载情况
export function downloadChart_C(data) {
    return axios_w({
        url: `/downloadM/downloadChart_C.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//下载报表
export function downloadChart_D(data) {
    return axios_w({
        url: `/downloadM/downloadChart_D.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//——————————————————————————公告管理——————————————————————
//获取列表
export function affiche_ShowList(data) {
    return axios_w({
        url: `/affiche/affiche_ShowList.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//点击列表查看时触发（用于后台统计数据）
export function afficheUser(data) {
    return axios_w({
        url: `/affiche/afficheUser.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//发布新公告
export function issueAffiche(data) {
    return axios_w({
        url: `/affiche/issueAffiche.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//修改公告
export function changeAffiche(data) {
    return axios_w({
        url: `/affiche/changeAffiche.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//置顶公告
export function stickAffiche(data) {
    return axios_w({
        url: `/affiche/stickAffiche.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//删除公告
export function deleteAffiche(data) {
    return axios_w({
        url: `/affiche/deleteAffiche.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

// ————————————————————————系统管理————————————————————————————
// ——————————————————————文件存储管理——————————————————————————
//文件储存管理获取列表
export function systemM_fileListShow(data) {
    return axios_w({
        url: `/system/systemM_fileListShow.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//文件储存管理更改时间
export function systemM_changeTLDate(data) {
    return axios_w({
        url: `/system/systemM_changeTLDate.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//文件储存管理清空数据
export function systemM_fileEmpty(data) {
    return axios_w({
        url: `/system/systemM_fileEmpty.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}


// ——————————————————————————消息清理管理————————————————————————
//消息清理管理获取列表
export function emailClean(data) {
    return axios_w({
        url: `/sysManage/emailClean.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//消息清理管理更改清理时间
export function delteInfo(data) {
    return axios_w({
        url: `/sysManage/delteInfo.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//消息清理管理清空数据
export function delteEmail(data) {
    return axios_w({
        url: `/sysManage/delteEmail.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}
