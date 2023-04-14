/* 登录界面接口 */

import request from '../utils/request.js'

// 验证码图片接口
export function getCodeImg() {
    return request({
        url: '/captchaImage',
        method: 'GET',
        // 不需要携带token
        headers: {
            notToken: true
        },
        timeout: 20000
    })
}

// 登录接口
export function login(username, password, code, uuid) {
    const data = {
        username, password, code, uuid
    }
    return request({
        url: '/login',
        method: 'POST',
        headers: {
            notToken: true
        },
        data: data
    })
}

// 获取用户信息接口
export function getInfo() {
    return request({
        url: '/getInfo',
        method: 'GET',
    })
}

// 退出登录接口
export function logout() {
    return request({
        url: '/logout',
        method: 'POST'
    })
}