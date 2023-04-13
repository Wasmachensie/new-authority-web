import { getInfo, login } from "../../api/login"
import { getToken, setToken } from "../../utils/auth"

const user = {
    state: {
        // 获取储存的token
        token: getToken(),
        roles: [],
        permissions: [],
        name: '',
        avatar: ''
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        }
    },
    actions: {
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim()
            const password = userInfo.password
            const code = userInfo.code
            const uuid = userInfo.uuid
            return new Promise((resolve, reject) => {
                login(username, password, code, uuid).then(res => {
                    console.log('登录接口', res)
                    // 登录成功保存token
                    setToken(res.token)
                    commit('SET_TOKEN', res.token)
                    resolve(res)
                }).catch(error => {
                    // 抛出错误=>login.vue中
                    reject(error)
                })
            })
        },
        // 获取用户信息方法
        GetInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getInfo().then(res => {
                    console.log('users.js-GetInfo=>', res)
                    const user = res.user
                    const avatar = (user.avatar === '' || user.avatar === null) ?
                        require('@/assets/images/avatar.jpg') :
                        process.env.VUE_APP_BASE_URL + user.avatar

                    // 储存一些跟用户相关的信息
                    if (res.roles && res.roles.length > 0) {
                        commit('SET_ROLES', res.roles)
                        commit('SET_PERMISSIONS', res.permissions)
                    } else {
                        commit('SET_ROLES', ['ROLE_DEFAULT'])
                    }

                    commit('SET_NAME', user.username)
                    commit('SET_AVATAR', avatar)

                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
            })

        }
    },
}
export default user