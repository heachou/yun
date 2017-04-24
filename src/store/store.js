import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:localStorage.getItem('user'),
    username:localStorage.getItem('username'),
    folderInfo:{
      folderRouter:'',
      folderName:''
    }
  },
  mutations: {
    // 改变登录状态
    login:state => {
      localStorage.setItem('user',true)
    },
    logout:state => {
      localStorage.setItem('user',false)
    },
    // 设置登录名
    setUsername:(state,username) => {
      state.username = username;
      localStorage.setItem('username',username);
    },
    changeFolderInfo:(state,obj) => {
      state.folderInfo.folderRouter = obj.folderRouter;
      state.folderInfo.folderName = obj.folderName;
    }
  },
  getters: {
      isLogin:state => {
          return state.isLogin;
      },
      username:state => {
          return state.username;
      },
      folderInfo:state => {
          return state.folderInfo;
      }
  }
})