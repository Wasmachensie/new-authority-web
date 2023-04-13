import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/users'
// 导入getters
import getters from './getters'


Vue.use(Vuex)

export default new Vuex.Store({
    getters,
    modules: {
        user
    }
})             
