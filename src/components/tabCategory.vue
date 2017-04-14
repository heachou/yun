<template>
	<div class="categoryBox" v-show="selected1 == 'category'">
		<div class="categoryArea">
			<ul>
				<li>
					<div>
						<img src="../assets/images/dog.jpg">
					</div>
					<p>图片</p>
				</li>
				<li>
					<div>
						<img src="../assets/images/dog.jpg">
					</div>
					<p>文档</p>
				</li>
				<li>
					<div>
						<img src="../assets/images/dog.jpg">
					</div>
					<p>视屏</p>
				</li>
				<li>
					<div>
						<img src="../assets/images/dog.jpg">
					</div>
					<p>BT种子</p>
				</li>
				<li>
					<div>
						<img src="../assets/images/dog.jpg">
					</div>
					<p>音乐</p>
				</li>
				<li>
					<div>
						<img src="../assets/images/dog.jpg">
					</div>
					<p>应用</p>
				</li>
				<li>
					<div>
						<img src="../assets/images/dog.jpg">
					</div>
					<p>其他</p>
				</li>
			</ul>
		</div>
		<div class="mask" @click="closeModal"></div>
	</div>
</template>
<script type="text/javascript">
	export default{
		props:['selected1','closeModal']
	}
</script>
<style type="text/css" lang='less'>
	.categoryBox{
		width: 100%;
		height: 100%;
		.categoryArea{
			width: 100%;
			height: 100%;
			>ul{
				position: relative;
				z-index: 2;
				clear: both;
				overflow: hidden;
				padding: 10px 15px;
				background: #2f3b49;
				color: #fff;
				animation: myMove 0.3s ease-out;
				li{
					float: left;
					width: 25%;
					margin-bottom: 8px;
					text-align: center;
					img{
						width: 50px;
						height: 50px;
						border-radius: 50%;

					}
					p{
						line-height: 2;
						font-size: 12px;
					}
				}
			}
		}
		.uploadArea{
			width: 100%;
			height: 100%;
			position: relative;
			>.uploadcontent{
				position: absolute;
				left: 50%;
				top:40%;
				width: 80%;
				background: #2f3b49;
				clear:both;
				color: #fff;
				padding: 10px 15px;
				overflow: hidden;
				z-index: 2;
				transform:translate(-50%,-50%);
				p{
					line-height: 2;
					font-size: 12px;
					margin-bottom: 15px;
				}
				li{
					width: 33%;
					float: left;
					text-align: center;
					img{
						width: 50px;
						height: 50px;
						animation: imgscale 0.4s ease-out;
						border-radius: 50%;
					}
				}
			}
		}
		.mask{
			position: absolute;
			left:0;
			top:0;
			height: 100%;
			width: 100%;
			z-index: 1;
			opacity: 0.4;
			background: rgb(0,0,0);
		}
	}
</style>