import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui';

axios.defaults.headers.common['token'] = sessionStorage.getItem('token')

export const axios_j = new axios.create({
    baseURL: '/jiabingqian',
    withCredentials: true,           // 当跨域请求时发送cookie
    timeout: 5000,                   // request timeout
})

export const axios_w = new axios.create({
    baseURL: '/wangqiang',
    withCredentials: true,          // 当跨域请求时发送cookie
    timeout: 5000,                  // request timeout
})

// export const axios_w = new axios.create({
//     baseURL: '/',
//     withCredentials: true,          // 当跨域请求时发送cookie
//     timeout: 5000,                  // request timeout
// })

// 添加响应拦截器
axios_w.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response.status == '401') {
            Message.error('异地登录')
            sessionStorage.removeItem('token')
            setTimeout(() => {
                location.href = '/'
            }, 2000)
        }
    }
)