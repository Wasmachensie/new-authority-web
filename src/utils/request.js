// 引入axios 注意没有{}
import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from './auth'


const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 10000
})

service.interceptors.request.use(config => {
    const notToken = (config.headers || {}).notToken === true
    if (getToken() && !notToken) {
        console.log('fdsa')
        config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    console.log('request-config=>', config)
    return config
})


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
        return Promise.reject(new Error('无效的会话，或者会话已过期，请重新登录'))
    } else if (code != 200) {
        return Promise.reject(new Error('err'))
    }
}, err => {
    // 请求出现错误时回调
    console.log('错误', err)
})
export default service