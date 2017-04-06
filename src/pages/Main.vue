<template>
    <div class="main">
    	<!-- 顶部固定区域 -->
        <div class="fixedTop">
        	<div class="myAvatar">
	        	<img src="http://img.hb.aicdn.com/ff669ebb96bd7338ac72a09f8510bdd554b8e30224d22-cuDTSL_fw658">
	        	<span>admin</span>
	        </div>
			<div class="tabBox">
		      <mt-tabbar :value="selected" v-model="selected">
				  <mt-tab-item id="category" @click.native="popupVisible = true">
				    <i class="icon iconfont icon-viewgallery"></i>分类
				  </mt-tab-item>
				  <mt-tab-item id="upload">
				    <i class="icon iconfont icon-share"></i>上传
				  </mt-tab-item>
				  <mt-tab-item id="sendList">
				    <i class="icon iconfont icon-category"></i>传输列表
				  </mt-tab-item>
				</mt-tabbar>
			</div>
        </div>
        <!-- 文件列表 -->
		<v-file :fileBox ="fileBox"></v-file>
		<!-- 切换区域 -->
		<div class="tabContent" id="tabContent" v-show="selected != ''">
			<div class="categoryBox" v-show="selected == 'category'">
				<div class="categoryArea" @click="addCount">
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
			<div class="categoryBox" v-show="selected == 'upload'">
				<div class="uploadArea">
					<div class="uploadcontent">
						<p class="text-center">选择上传文件类型</p>
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
								<p>音乐</p>
							</li>
							<li>
								<div>
									<img src="../assets/images/dog.jpg">
								</div>
								<p>全部</p>
							</li>
						</ul>
					</div>
				</div>
				<div class="mask" @click="closeModal"></div>
			</div>
		</div>
		<!-- 底部 -->
		<v-footer></v-footer>
    </div>
</template>
<script>
import Vue from 'vue'
import { Tabbar, TabItem } from 'mint-ui';
import { Popup } from 'mint-ui';
import { Indicator } from 'mint-ui';
import FileList from '../components/fileList.vue';
import Footer from '../components/footer.vue';
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Popup.name, Popup);
export default {
    name: 'main',
    data(){
        return {
          fixed:true,
          selected:'',
          popupVisible: false,
          wh:0,
          fileBox:[]
        }
    },
    beforeRouteUpdate (to, from, next) {
	    const toDepth = to.path.split('/').length
	    const fromDepth = from.path.split('/').length
	    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
	    console.log(to,from);
	    next()
	},
    created:function(){
    	//得到窗口高度
    	this.wh = document.body.clientHeight || document.documentElement.clientHeight;
    	//获取文件列表
    	// 初次进入获取整个文件夹列表

    	this.getFileList();
    },
    mounted:function(){
    	document.getElementById('tabContent').style.height = (this.wh-90)+'px';
    },
    watch:{
    	selected(curVal,oldVal){
    		if(curVal=='sendList'){
    			this.$router.push({path:'/transmission/list'});
    			return;
    		}
    		//弹出层时，禁止滚动
    		if(curVal != ''){
    			document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    		}else{
    			document.getElementsByTagName('body')[0].style.overflow = 'auto';
    		}
    	}
    },
    methods:{
    	closeModal:function(){
    		this.selected = '';
    	},
    	getFileList:function(){
    		Indicator.open();
    		this.$http.post('/api/getfile/uploads').then(function(response){
	    		var data = response.body;
	    		var fileArray = data.list.fileArray;
	    		var folderArray = data.list.folderArray;
	    		if(folderArray.length != 0){
	    			for (var i = 0; i < folderArray.length; i++) {
	    				this.fileBox.push(folderArray[i])
	    			}
	    		}
	    		if(fileArray.length != 0){
	    			for (var i = 0; i < fileArray.length; i++) {
	    				this.fileBox.push(fileArray[i])
	    			}
	    		}
	    		// 关闭loading
	    		Indicator.close();
	    	},function(){
	    		// 关闭loading
	    		Indicator.close();
	    	})
    	},
    	addCount:function(){
    		this.$store.commit('increment');
    	}
    },
    components:{
    	"v-file":FileList,
    	"v-footer":Footer
    }
}
</script>

<style scoped lang="less">
	@keyframes myMove{
		0%{
			transform:translateY(-200px);
		}
		100%{
			transform:translateY(0px);
		}
	}
	@keyframes imgscale{
		0%{
			transform:scale(0.3);
		}
		80%{
			transform:scale(1.1);
		}
		100%{
			transform:scale(1);
		}
	}
	.main{
		height: 100%;
		padding-top: 90px;
		padding-bottom: 40px;
		box-sizing: border-box;
		background: #fff;
		position: relative;
	}
	.fixedTop{
		position: fixed;
		width: 100%;
		height: 90px;
		left: 0;
		top:0;
		z-index: 3;
	}
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
	.tabContent{
		position: absolute;
		left: 0;
		top:90px;
		width: 100%;
	}
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
				top:50%;
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
	.tabBox{
		position: relative;
		z-index: 33;
		height: 30px;
	}
	.mint-tab-item{
		background: #3879d9;
		color: #fff;
		box-sizing: border-box;
		position: relative;
		&:after{
			position: absolute;
			right: 0;
			height: 100%;
			width: 1px;
			content: '';
			top:0;
			background:#3866e9;
			tranform:scaleX(0.5);
		}
		&:last-child:after{
			background:transparent;
		}
	}
	.mint-tab-item-label{
		height: 100%;
		background: blue;
	}
	.mint-tabbar > .mint-tab-item.is-selected{
		background-color: #3866e9;
    	color: #fefefe;
	}
	.icon{
		margin-right: 4px;
	}
</style>
