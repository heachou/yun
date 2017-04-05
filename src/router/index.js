import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import animate from 'animate.css';
import "../assets/css/common.css";
import "../assets/font/iconfont.css";

// 导入组件
import Login from '@/pages/Login'
import Reg from '@/pages/Reg'
import Main from '@/pages/Main'
import Transmission from '@/pages/Transmission'
import Share from '@/pages/Share'
import Look from '@/pages/Look'
import More from '@/pages/More'
import ChildrenFileList from '@/pages/ChildrenFileList'


Vue.use(Router)
Vue.use(VueResource);
Vue.use(Mint)

const router = new Router({
  mode:"history",
  routes: [
    {//登录页
      path: '/login',
      name: 'Login',
      component: Login
    },
    {//注册页
      path: '/reg',
      name: 'Reg',
      component: Reg
    },
    {//首页
      path: '/main',
      name: 'Main',
      component: Main,
    },
    {//在首页点击文件夹跳转的页面
      path: '/main/*',
      name: 'Main',
      component: ChildrenFileList,
    },
    {//分享
      path: '/share',
      name: 'Share',
      component: Share
    },
    {//看吧页面
      path: '/look',
      name: 'Look',
      component: Look
    },
    {//更多页面
      path: '/more',
      name: 'More',
      component: More
    },
    {//传输列表
      path: '/transmission/list',
      name: 'Transmission',
      component: Transmission
    },
    {//所有其他的路由皆定位到login
      path: '*',
      name: 'Login',
      component: Login
    },
  ]
})
router.beforeEach((to, from, next) => {
  next();
})
export default router;
