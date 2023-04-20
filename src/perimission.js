/* 路由拦截 */

import { Message } from "element-ui"
// 引入router
import router from "./router"
import store from "./store"
import { getToken } from "./utils/auth"
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
    console.log('permission.js1=>', to)
    // 判断有没有token
    if (getToken()) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            if (store.getters.roles.length === 0) {
                console.log('permission.js2=>',)
                store.dispatch('GetInfo').then(res => {
                    console.log('permission.js3', res)
                    store.dispatch('GenerateRoutes').then(accessRoutes => {
                        console.log('accessR=>', accessRoutes)
                    })
                    next()
                }).catch(err => {
                    Message.error(err)
                })

            } else {
                next()
            }

        }

    } else {
        // 白名单，直接放行
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            // 不在白名单里就进行跳转
            next(`/login?redirect=${to.fullPath}`)
        }
    }
})