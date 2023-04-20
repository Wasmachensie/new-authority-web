// 通过export方式导出，在导入时要加{}，export default则不需要
import { getRouters } from "@/api/menu"

const permissions = {
    state: {
        sidebarRouters: []
    },
    mutations: {
        SET_SIDEBAR_ROUTERS: (state, routes) => {
            state.sidebarRouters = routes
        }
    },
    actions: {
        GenerateRoutes({ commit }) {
            return new Promise(resolve => {
                getRouters().then(res => {
                    commit('SET_SIDEBAR_ROUTERS', res.data)
                    resolve(res)
                })
            })
        }
    }
}

export default permissions