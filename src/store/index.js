import Vue from 'vue'
import Vuex from 'vuex'
// 导入user
import user from './modules/users'
// 导入getters
import getters from './getters'
// 导入permissions
import permissions from './modules/permissions'


Vue.use(Vuex)

export default new Vuex.Store({
    getters,
    modules: {
        user,
        permissions
    }
})             
