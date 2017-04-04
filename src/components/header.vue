<template>
	<div class="header">
			<mt-header :title="title">
			<template v-if="leftNeed">
				<router-link :to="returnUrl"  slot="left">
			    <mt-button icon="back"></mt-button>
			  </router-link>
			</template>
			  <mt-button icon="more" v-if="rightNeed" slot="right"></mt-button>
			</mt-header>
	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue'
	import { Header } from 'mint-ui';
	Vue.component(Header.name, Header);
	export default{
		props:{
			title:{
		      	type: String
		    },
			returnUrl:{
		      	type: String,
		      	default:'/'
		    },
			leftNeed:{
		      	type: Boolean,
		      	default:true,
		    },
			rightNeed:{
		      	type: Boolean,
		      	default:false,
		    },
		},
		data(){
			return{
				
			}
		}
	}
</script>
<style type="text/css">
	
</style>