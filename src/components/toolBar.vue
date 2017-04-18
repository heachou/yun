<template>
	<div class='toolbar'  v-if="checkedNames != 0">
		<ul>
			<li :class="[checkedNames.length>1?'cantchoose':'']"><i class="fa fa-folder-open-o" aria-hidden="true"></i><p>打开</p></li>
			<!-- <li><i class="fa fa-folder-open-o" aria-hidden="true"></i><p>打开</p></li> -->
			<li><i class="fa fa-cloud-download" aria-hidden="true"></i><p>下载</p></li>
			<li><i class="fa fa-paper-plane-o" aria-hidden="true"></i><p>分享</p></li>
			<li><i class="fa fa-times" aria-hidden="true"></i><p>删除</p></li>
			<li class="pore" @click="">
				<i class="fa fa-ellipsis-h" aria-hidden="true"></i>
				<p>更多</p>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
export default {
  name: 'toolBar',
  props:['checkedNames'],
  data () {
    return {
    	isA:true
    };
  },
  methods: {
  
  },
};
</script>
<style type="text/css" lang="less" scoped>
	.toolbar{
		height: 46px;
		background: #393f4f;
		position: fixed;
		z-index: 10;
		width: 100%;
		left: 0;
		bottom: 0;
		>ul{
			display: flex;
			align-items:center;
			width: 100%;
			height: 100%;
			li{
				display: flex;
				color: #fff;
				flex:1;
				height: 100%;
				text-align: center;
				align-items:center;
				justify-content:center;
				transition:all 0.2s;
				flex-direction:column;
				i{
					display: inline-block;
					width: 18px;
					height: 18px;
					text-align: center;
					font-size: 16px;
					margin-bottom: 2px;
				}
				p{
					width: 100%;
					text-align: center;
				}
				ul{
					top:46px;
					right: 0;
				}
			}
			.cantchoose{
				color: #999;
				transition:all 0.2s;
			}
		}
	}
</style>