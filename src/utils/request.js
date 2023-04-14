// 引入axios 注意没有{}
import store from '@/store'
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken } from './auth'

// 是否展示弹窗
let isRelogin = { show: false }

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 10000
})

service.interceptors.request.use(config => {
    const notToken = (config.headers || {}).notToken === true
    if (getToken() && !notToken) {
        config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    console.log('request-config=>', config)
    return config
}), err => {
    // 请求出现错误时回调
    let { message } = err
    Message({
        message: message,
        type: 'error',
        // 显示时间, 毫秒。设为 0 则不会自动关闭	
        duration: 5 * 1000
    })
    return Promise.reject(err)
}


// axios请求拦截器
service.interceptors.response.use(res => {
    console.log('request.js=>', res)
    const code = res.data.code
    const msg = res.data.msg
    // 封装请求,对结果数据进行操作
    if (code === 200) {
        return res.data
    } else if (code === 500) {
        // 错误弹窗
        Message({
            type: 'error',
            message: msg
        })
        return Promise.reject(new Error(msg))
    } else if (code === 401) {
        if (!isRelogin.show) {
            isRelogin.show = true
            MessageBox.confirm('登录状态已过期，请重新登录', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                isRelogin.show = false
                store.dispatch('Logout').then(() => {
                    console.log('1111111111')
                    // 重定向
                    location.href = '/'
                })
            }).catch(() => {
                isRelogin.show = false
            })
        }


        return Promise.reject(new Error('无效的会话，或者会话已过期，请重新登录'))
    } else if (code != 200) {
        return Promise.reject(new Error('err'))
    }
}, err => {
    // 请求出现错误时回调
    let { message } = err
    console.log('错误', message)
    if (message.includes('timeout')) {
        message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
        message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    Message({
        message: message,
        type: 'error',
        // 显示时间, 毫秒。设为 0 则不会自动关闭	
        duration: 5 * 1000
    })
    return Promise.reject(err)
})
export default service
