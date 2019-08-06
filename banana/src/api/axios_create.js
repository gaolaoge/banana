import axios from 'axios'

export const axios_j = new axios.create({
    baseURL: '/jiabingqian',
    withCredentials: true, // 当跨域请求时发送cookie
    timeout: 5000, // request timeout
    // headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    // },
})

export const axios_w = new axios.create({
    baseURL: '/wangqiang',
    withCredentials: true, // 当跨域请求时发送cookie
    timeout: 5000, // request timeout
    // headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    // },
})


