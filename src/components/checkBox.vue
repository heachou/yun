<template>
	<div class="checkBox" v-if="checkedNames != 0">
		<header>
			<button @click="cancelSelected">取消</button>
			<h2>已选定{{checkedNames.length}}项</h2>
			<button @click="selectAll">全选</button>
		</header>
	</div>
</template>
<script type="text/javascript">
	export default{
		props:['checkedNames','cancelSelected','selectAll'],
		data (){
			return{

			}
		}
	}
</script>
<style type="text/css" lang="less">
	.checkBox{
		position: fixed;
		left:0;
		top:0;
		height: 60px;
		width: 100%;
		background: rgba(0,0,0,.7);
		z-index: 10;
		header{
			display: flex;
			width: 100%;
			align-items: center;
			height: 100%;
			padding: 0 15px;
			color: #fff;
			justify-content: space-between;
			box-sizing: border-box;
			 button{
				color: #fff;
				background: transparent;
				padding: 6px 12px;
				border-radius: 2px;
				font-size:12px; 
				outline: none;
				border:1px solid #d2d2d2;
			}
			h2{
				font-size: 14px;
				letter-spacing: 1px;
				font-weight: normal;
			}
		}
	}
</style>