<template>
	<div class="footerBar">
		<ul>
			<li>
				<router-link to="/main">
					<img src="../assets/images/doc.png" height="196" width="154">
					<p>网盘</p>
				</router-link>
			</li>
			<li>
				<router-link to="/share">
					<img src="../assets/images/doc.png" height="196" width="154">
					<p>分享</p>
				</router-link>
			</li>
			<li>
				<router-link to="/look">
					<img src="../assets/images/doc.png" height="196" width="154">
					<p>看吧</p>
				</router-link>
			</li>
			<li>
				<router-link to="/more">
					<img src="../assets/images/doc.png" height="196" width="154">
					<p>更多</p>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript"></script>
<style type="text/css" scoped>
	.footerBar{
		position: fixed;
		left: 0;
		bottom: 0;
		height: 46px;
		width: 100%;
		background: #fff;
	}
	.footerBar:after{
		position: absolute;
		width: 100%;
		height: 1px;
		content: '';
		background: #d2d2d2;
		left:0;
		top: 0;
		transform: scaleY(0.5);
	}
	ul{
		display: flex;
		height: 100%;
	}
	ul li{
		flex:1;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	ul li a{
		display: flex;
		align-items: center;
		justify-content: space-around;
		text-align: center;
		flex-direction: column;
	}
	ul li img{
		width: 20px;
		height: 20px;
		margin-bottom: 3px;
	}
	ul li p{	
		color: #666;
		font-size: 12px;
	}
	a.router-link-active p{
		color: #3879d9;
	}
</style>