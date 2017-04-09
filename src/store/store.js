import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    isLogin:false
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--,
    // 改变登录状态
    changeLogin: state => {
    	state.isLogin = !state.isLogin;
    }
  }
})