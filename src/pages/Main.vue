<template>
    <div class="main">
    	<!-- 顶部固定区域 -->
        <div class="fixedTop">
        	<div class="myAvatar">
	        	<img src="http://img.hb.aicdn.com/ff669ebb96bd7338ac72a09f8510bdd554b8e30224d22-cuDTSL_fw658">
	        	<span>{{username}}</span>
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
			<v-tab-category :selected1="selected" :closeModal="closeModal"></v-tab-category>
			<v-tab-upload :selected1="selected" :closeModal="closeModal"></v-tab-upload>
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
import { Toast } from 'mint-ui';
import FileList from '../components/fileList.vue';
import Footer from '../components/footer.vue';
import TabCategory from '../components/tabCategory.vue'
import TabUpload from '../components/tabUpload.vue'
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
          fileBox:[],
          username:this.$store.state.username
        }
    },
    created:function(){
    	//获取文件列表
    	// 初次进入获取整个文件夹列表
    	this.getFileList();
    },
    watch:{
    	selected(curVal,oldVal){
    		if(curVal=='sendList'){
    			this.$router.push({path:'/transmission/list'});
    			return;
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
	    		if(data.success == 0){
	    			Indicator.close();
	    			Toast(data.msg);
	    			this.$router.push({"path":"/login"})
	    			return;
	    		}
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
    },
    components:{
    	"v-file":FileList,
    	"v-footer":Footer,
    	'v-tab-category':TabCategory,
    	'v-tab-upload':TabUpload
    }
}
</script>

<style scoped lang="less">
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
		height: 100%;
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
