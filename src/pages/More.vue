<template>
	<div class="more">
		<div @click='logout'>登出</div>
	</div>
</template>
<script type="text/javascript">
export default {
  name: 'more',
  props:[],
  data () {
    return {

    };
  },
  methods: {
  	logout:function(){
  		var _this = this;
  		this.$http.post('/logout').then(function(response){
  			var result = response.body;
  			if(result.success === 0){
  				return alert("登录超时")
  			}
  			_this.$store.commit('logout');
  			// 回到登录页面
  			_this.$router.push({path:'/login'});
  		})
  	}
  },
};
</script>
<style type="text/css" lang="less" scoped>

</style>