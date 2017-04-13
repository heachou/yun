<template>
    <div class="login">
        <v-header title="登录" :leftNeed="leftNeed" :rightNeed="rightNeed"></v-header>
        <div class="avatarBox">
        	<img src="" alt="avatar" >
        </div>
        <div class="formBox" @keyup.enter ="login">
        	<mt-field label="用户名" placeholder="请输入用户名" v-focus v-model="username"></mt-field>
        	<mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        </div>
        <div id="regBox">
        	<router-link to="/reg" id="reg">去注册</router-link>
        </div>
        <div class="loginBtn">
        	<mt-button type="primary" size="large" @click="login">登录</mt-button>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { Field } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Button } from 'mint-ui';
import header from '../components/header.vue'

Vue.component(Button.name, Button);
Vue.component(Field.name, Field);
export default {
    name: 'login',
    data(){
        return {
          username:"",
          password:'',
          rightNeed:false,
          leftNeed:false,
        }
    },
    created:function(){
    	//判断是否已经登陆过，如果登陆过，直接重定向到main页面
    	if(this.$store.state.isLogin){
            this.$router.push({path:'/main'});
        }
    },
    methods:{
    	login:function(){
    		var p = {
    			username:this.username,
    			password:this.password,
    		}
    		if(p.username == '' || p.password == ''){
    			Toast('请输入登录相关信息');
    			return;
    		}
    		Indicator.open();
    		this.$http.post('/api/login',p).then(function(response){
    			if(response.body.success == 1){
    				Toast('登录成功');
    				Indicator.close();
    				//将密码存储到localstorage
                    this.$store.commit('changeLogin');
    				this.$store.commit('setUsername',p.username);
    				//跳转到首页
    				this.$router.push({path:'/main'})
    			}
    			if(response.body.success == 0){
    				Toast('用户名或密码错误');
    				Indicator.close();
    			}
    		},function(response){
    			Indicator.close();
    		});
    	},
    },
    components:{
        'v-header':header
    },
    directives: {
      focus: {
        inserted: function (el) {
            // 聚焦元素
           var el = el.getElementsByTagName('input')[0];
           el.focus();
        }
      }
    }
}
</script>

<style scoped lang="less">
.avatarBox{
	text-align: center;
	margin-top: 30px;
	img{
		width: 30px;
		height: 30px;
		display: inline-block;
		padding: 2px;
		background: #fff;
		border:1px solid #d2d2d2;
		border-radius: 50%;
		overflow: hidden;
	}
}
.loginBtn{
	text-align: center;
	margin-top: 50px;
	padding: 0 20px;
	box-sizing: border-box;
}
.formBox{
	margin-top: 25px;
}
#regBox{
	text-align: right;
	padding-right: 15px;
	a{
		color: red;
		line-height: 2.2;
		font-size: 14px;
	}
}
</style>
