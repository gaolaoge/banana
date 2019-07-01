import { axios_j,axios_w } from '@/api/axios_create'

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
    return axios_j({
        url: `/userInfo/SAuser.do?${d}`,
        method: 'GET',
        timeout: 5000,
    })
}

//user_management_info table初次获取
export function table_initial(d){
    return axios_j({
        url: `/userInfo/SAall.do?${d}`,
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
    return axios_j({
        url: `/userInfo/CApersonal.do`,
        method: 'GET',
        timeout: 5000,
    })
}

//user_management_self 第一页
export function personal_message_send(data){
    return axios_j({
        url: `/userInfo/uAdmin.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//user_management_self 第二页
export function personal_password_send(data){
    return axios_j({
        url: `/userInfo/UApassword.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//batch_operation 获取数据
export function get_data(){
    return axios_j({
        url: `/userInfo/RBA_User.do`,
        method: 'GET',
        timeout: 5000,
    })
}

//batch_operation 发送数据
export function post_data(data){
    return axios_j({
        url: `/userInfo/UBA_User.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//memory_management 发送数据
export function post_memory(data){
    return axios_j({
        url: `/userInfo/C_space.do`,
        method: 'POST',
        timeout: 5000,
        data
    })
}

//company_list 获取和检索
export function search_(d){
    return axios_j({
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
    return axios_j({
        url: `/adminInfo/RSInfo.do?${data}`,
        method: 'GET',
        timeout: 5000,
    })
}