<template>
	<div class="myAvatar">
    	<mt-header :title="title">
		  <router-link to="/main" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
    </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);
	export default{
		props:['title'],
		data(){
			return{
				
			}
		}
	}
</script>
<style lang="less" scoped>
	.myAvatar{
		position: relative;
		z-index: 222;
		padding: 10px 0;
		background: url("https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1490678941&di=8e66ccec1cbfe2de6c7fd37a05d01b79&src=http://pic9.nipic.com/20100905/3367900_113641047167_2.jpg");
		height: 60px;
		background-position: 0 -30px;
		box-sizing: border-box;
		display: flex;
		align-items:center;
		img{
			width: 30px;
			height: 30px;
			padding: 2px;
			background: #fff;
			border:1px solid #d2d2d2;
			border-radius: 50%;
			margin-left: 30px;
			vertical-align: middle;
		}
		span{
			color: #fff;
			margin-left: 10px;
			font-size: 14px;
		}
	}
	.mint-header{
		width: 100%;
		background: transparent;
	}
</style>