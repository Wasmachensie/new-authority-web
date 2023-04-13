import Cookies from "js-cookie"

const TokenKey = "Admin-Token"

// 保存token
export function setToken(token) {
    // k-v保存
    return Cookies.set(TokenKey, token)
}

// 获取token
export function getToken(token) {
    // k-v保存
    return Cookies.get(TokenKey)
}

// 移除token
export function removeToken(token) {
    // k-v保存
    return Cookies.remove(token)
}