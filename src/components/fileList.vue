<template>
	<div id="fileBox">
		<ul>
			<li v-for="item in fileBox">
				<img :src="imgType(item.extName)">
				<div class="left">
					<p class="ellipsis">{{item.name}}</p>	
					<span>{{item.birth}}</span>
				</div>
				<label class="inputBox">
					<input type="checkbox" >
				</label>
			</li>
		</ul>
		<p v-if="fileBox.length == 0" class="text-center">暂无文件哟...</p>
	</div>
</template>
<script type="text/javascript">
 	import imgTypeData from '../assets/js/imageType.js';
	export default{
		props:{
			fileBox:{
				type:Array
			}
		},
		methods:{
			imgType:function(extname){
				if(extname){
					extname = extname.split('.')[1];
					return imgTypeData[extname];
				}else{	
					return imgTypeData.folder;
				}
			}
		}
	}
</script>
<style type="text/css" scoped>
	#fileBox{
		height: 100%;
		overflow-y: scroll;
		overflow-x: hidden;
	}
	ul{
		height: 100%;
	}
	li{
		position: relative;
		padding: 8px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}
	li:after{
		position: absolute;
		left: 0;
		bottom: 0;
		height: 1px;
		width: 100%;
		background: #d2d2d2;
		content: '';
		transform: scaleY(0.5);
	}
	li>div{
		display: flex;
		max-width: 80%;
		width: 80%;
		height: 100%;
		padding-right: 6px;
		flex-direction: column;
		overflow: hidden;
		align-items: flex-start;
	}
	li input[type='checkbox']{
		width: 14px;
		height: 14px;
	}
	li>div>p{
		max-width: 100%;
		font-size: 14px;
		line-height: 2;
		margin-bottom: 4px;
		color: #333;
	}
	li>div span{
		color: #999;
		font-size: 12px;
	}
	li img{
		width: 62px;
		height: 50px;
		margin-right: 6px;
	}
	label{
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>