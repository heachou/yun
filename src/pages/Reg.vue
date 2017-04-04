<template>
    <div class="reg">
    	<v-header title="注册" :rightNeed="rightNeed" :leftNeed="leftNeed"></v-header>
    	<div class="avatarBox">
        	<img src="" alt="avatar" >
        </div>
        <div class="formBox">
        	<mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
        	<mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        	<mt-field label="密码" placeholder="请再输入密码" type="password" v-model="ensurePass"></mt-field>
        </div>
        <div id="regBox">
        	<router-link to="/login" id="reg">去登录</router-link>
        </div>
        <div class="loginBtn">
        	<mt-button type="primary" size="large" @click="reg">注册</mt-button>
        </div>
    </div>
</template>
<script>
import header from '../components/header.vue'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
    name: 'register',
    data(){
        return {
          username:"",
          password:'',
          ensurePass:'',
          rightNeed:false,
          leftNeed:true,
        }
    },
    methods:{
    	reg:function(){
    		if(this.username == '' || this.password == '' || this.ensurePass == ''){
    			Toast('请输入登录相关信息');
    			return;
    		}
    		if( this.password != this.ensurePass){
    			Toast('两次输入密码不一致');
    			return;
    		}
    		var params = {
    			username:this.username,
    			password:this.password,
    		};
    		Indicator.open();
    		this.$http.post('/api/reg',params).then(function(response){
    			if(response.body.success == 1){
    				Toast('注册成功,去登录吧..');
    				Indicator.close();
    				//跳转到首页
    				this.$router.push({path:'/login'})
    			}
    			if(response.body.success == 0){
    				Toast('用户名已经存在,换一个吧...');
    				Indicator.close();
    			}
    		},function(response){
    			Indicator.close();
    		});

    	}
    },
    components:{
    	'v-header':header
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
