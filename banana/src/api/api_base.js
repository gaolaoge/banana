import { axios_j,axios_w } from '@/api/axios_create'

//main_modeule 获取基础数据
export function baseData(data){
    return axios_w({
        url: `/company/firm_userBasicInfo.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//user_management_info 批量删除
export function batch_delect(data){
    return axios_w({
        url: `/userInfo/Deletebatch.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//user_management_info table筛选操作
export function table_handle(d){
    return axios_w({
        url: `/userInfo/SAuser.do?${d}`,
        method: 'GET',
        timeout: 5000,
    })
}

//user_management_info table初次获取
export function table_initial(d){
    return axios_w({
        url: `/userInfo/SAuser.do?${d}`,
        method: 'GET',
        timeout: 5000,
    })
}

//user_management_info 单独添加新用户
export function add_user(data){
    return axios_w({
        url: `/userInfo/CAuser.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//user_management_info 批量添加新用户
export function add_users(data){
    return axios_w({
        url: `/userInfo/Cbatch.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//user_management_info 修改信息
export function edit_user(data){
    return axios_w({
        url: `/userInfo/AUuser.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//user_management_self 数据回显
export function personal_message_center(){
    return axios_w({
        url: `/userInfo/CApersonal.do`,
        method: 'GET',
        timeout: 5000,
    })
}

//user_management_self 第一页
export function personal_message_send(data){
    return axios_w({
        url: `/userInfo/uAdmin.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//user_management_self 第二页
export function personal_password_send(data){
    return axios_w({
        url: `/userInfo/UApassword.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//batch_operation 获取数据
export function get_data(){
    return axios_w({
        url: `/userInfo/RBA_User.do`,
        method: 'GET',
        timeout: 5000,
    })
}

//batch_operation 发送数据
export function post_data(data){
    return axios_w({
        url: `/userInfo/UBA_User.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//memory_management 发送数据
export function post_memory(data){
    return axios_w({
        url: `/userInfo/C_space.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//memory_management 回显
export function eochSpace(data){
    return axios_w({
        url: `/userInfo/echoSpace.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//company_list 获取和检索
export function search_(d){
    return axios_w({
        url: `/adminInfo/RSFirmName.do?${d}`,
        method: 'GET',
        timeout: 5000,
    })
}

//company_add 添加企业
export function comp_(data){
    return axios_w({
        url: `/adminInfo/add_enterpriseinfo.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//company_add 添加管理员
export function admin_(data){
    return axios_w({
        url: `/adminInfo/add_adminUser.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//detail_ 查看页回显数据
export function detail_G(data){
    return axios_w({
        url: `/adminInfo/RSInfo.do?${data}`,
        method: 'GET',
        timeout: 5000,
    })
}

//detail_ 编辑页提交
export function detail_P(data){
    return axios_w({
        url: `/adminInfo/update_enterpriseinfo.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//company_list 删除数据
export function de_(data){
    return axios_w({
        url: `/adminInfo//del_enterpriseinfo.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//inbox 回显 + 关键字查询
export function inbox_count(data){
    return axios_w({
        url: `/MessageCenter/EmailMotif.do?${data}`,
        method: 'GET',
        timeout: 5000,
    })
}

//inbox 标星
export function star_(data){
    return axios_w({
        url: `/MessageCenter/make_starTag.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//inbox 删除 + 移动至xx文件夹
export function delete_and_move(data){
    return axios_w({
        url: `/MessageCenter/EmailList.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//inbox 彻底删除
export function delete_t(data){
    return axios_w({
        url: `/MessageCenter/D_EmailList.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//inbox 标记为
export function sign_(data){
    return axios_w({
        url: `/MessageCenter/EmailExamine.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//Dashboard 
export function Dashboard(){
    return axios_w({
        url: `/company/dash_board.do`,
        method: 'POST',
        timeout: 5000,
        data: 'getInfo'
    })
}

//address_book   获取名片信息
export function card_(data){
    return axios_w({
        url: `/company/firm_echoBaiscUser.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//statistics   获取部门信息
export function department_info(data){
    return axios_w({
        url: `/company/echo_Alldepartment.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//statistics   新建部门
export function post_depart(data){
    return axios_w({
        url: `/system/add_department.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//inbox   信息回复
export function message_response(data){
    return axios_w({
        url: `/MessageCenter /EmailReply.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//inbox   自定义文件夹回显
export function customize_echo(){
    return axios_w({
        url: `/MessageCenter/dirName.do`,
        method: 'GET',
        timeout: 5000,
    })
}

//inbox   新建文件夹
export function create_f(data){
    return axios_w({
        url: `/MessageCenter/add_customDirName.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//inbox   当前页标为已读
export function sign_already(data){
    return axios_w({
        url: `/MessageCenter/EmailExamine.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//enterprise   数据回显
export function data_enterprise(data){
    return axios_w({
        url: `/company/enterpriseFile_Echo.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//enterprise   文件预览
export function file_pre(data){
    return axios_w({
        url: `/company/enterpriseFile_preview.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//enterprise   文件下载
export function e_file_download(data){
    return axios_w({
        url: `/company/enterpriseFile_download.do`,
        method: 'GET',
        timeout: 5000,
        responseType: "blob",
        data
    })
}

//inbox   自定义文件夹管理操作
export function customize_m(data){
    return axios_w({
        url: `/MessageCenter/dirNameDB.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//inbox   立即处理
export function immediate_treatment(data){
    return axios_w({
        url: `/MessageCenter/MessageCenterTotalInfo.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//inbox   处理结果发送
export function pu(data){
    return axios_w({
        url: `/MessageCenter/MessageCenterUTotal.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//record   获取时间线数据
export function record_data(data){
    return axios_j({
        url: `/SearchLogs/historyAll.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//data_analysis   昨日关键指标统计
export function DataAnalyzeA(data){
    return axios_w({
        url: `/company/persionDataAnalyzeA.do `,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//data_analysis   图表
export function DataAnalyzeB(data){
    return axios_w({
        url: `/company/persionDataAnalyzeB.do `,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//data_analysis   下载
export function DataAnalyzeC(data){
    return axios_w({
        url: `/company/persionDataAnalyzeC.do `,
        method: 'POST',
        timeout: 5000,
        data
    })
}