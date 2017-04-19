<template>
    <div class="main">
    	<!-- 顶部固定区域 -->
        <div class="fixedTop">
        	<v-mheader :title="title"></v-mheader>
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
		<div id="fileBox">
		<transition name="slide">
			<v-check-box :selectAll="selectAll" :cancelSelected="cancelSelected" :checkedNames="checkedNames"></v-check-box>
		</transition>
		<transition name="slidedown">
			<v-tool-bar :checkedNames="checkedNames"></v-tool-bar>
		</transition>
		<ul v-if="fileBox.length != 0">
			<li v-for="item in fileBox">
				<template v-if="item.type =='folder'">
					<img :src="imgType(item.extName)" @click="setFolderInfo(item.path,item.name)">
					<div class="left" @click="setFolderInfo(item.path,item.name)">
						<p class="ellipsis">{{item.name}}</p>	
						<span>{{item.birth}}</span>
					</div>
					<label class="inputBox">
						<input type="checkbox" :value="item.path" v-model="checkedNames">
					</label>
				</template>
				<template v-else>
					<img :src="imgType(item.extName)">
					<div class="left">
						<p class="ellipsis">{{item.name}}</p>	
						<span>{{item.birth}}</span>
					</div>
					<label class="inputBox">
						<input type="checkbox" :value="item.path" v-model="checkedNames">
					</label>
				</template>
			</li>
		</ul>
		<p v-if="fileBox.length == 0" class="text-center nofile">暂无文件哟...</p>
	</div>
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
import FileList from '../components/fileList.vue';
import Footer from '../components/footer.vue';
import Mheader from '../components/mainHeader.vue';
import TabCategory from '../components/tabCategory.vue'
import TabUpload from '../components/tabUpload.vue'
Vue.component(TabItem.name, TabItem);
Vue.component(Popup.name, Popup);
 	import imgTypeData from '../assets/js/imageType.js';
	import CheckBox from '../components/checkBox.vue'
	import ToolBar from '../components/toolBar.vue'
export default {
    name: 'main',
    data(){
        return {
          fixed:true,
          selected:'',
          popupVisible: false,
          wh:0,
          fileBox:[],
          checkedNames:[],
          title:this.$store.state.folderInfo.folderName,
        }
    },
    created:function(){
    	// 初次进入获取整个文件夹列表
    	this.getFileList();
    },
    watch:{
    	selected(curVal,oldVal){
    		if(curVal=='sendList'){
    			this.$router.push({path:'/transmission/list'});

    			return;
    		}
    	},
    	'$route': ['getFileList','setTitle']
    },
    methods:{
    	closeModal:function(){
    		this.selected = '';
    	},
    	getFileList:function(){
    		Indicator.open();
    		this.fileBox = [];
    		if(location.pathname != '/main'){
    			/*alert(this.$store.state.folderInfo.folderRouter);*/
    			var p = this.$store.state.folderInfo;
    			try{
					this.$http.post('/api/getfile/folderName',p).then(function(response){
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
			    		Indicator.close();
			    	},function(){
			    		// 关闭loading
			    		Indicator.close();
			    	})
				}catch(e){
					console.log(e);
				}
				return;
    		}else{
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
		    }
    	},
    	setTitle:function(){
    		this.title = this.$store.state.folderInfo.folderName;
    	},
    	imgType:(extname) => {
			if(extname){
				extname = extname.split('.')[1];
				// 改变为绝对路径
				return location.origin+imgTypeData[extname];
			}else{	
				// 改变为绝对路径
				return location.origin+imgTypeData.folder;
			}
		},
		setFolderInfo:function(path,folderName){
			console.log(path,folderName);
			if(path){
				var p = {
					"folderRouter":path,
					"folderName":folderName
				}
				this.$store.commit('changeFolderInfo',p);
	    		this.$router.push({path:location.pathname+'/'+folderName});	
			}
		},
		cancelSelected:function(){
			this.checkedNames = [];
		},
		selectAll:function(){
			this.checkedNames = [];
			for (var i = 0; i < this.fileBox.length; i++) {
				this.checkedNames.push(this.fileBox[i].path);
			}
		}
    },
    components:{
    	"v-file":FileList,
    	"v-footer":Footer,
    	"v-mheader":Mheader,
    	'v-tab-category':TabCategory,
    	'v-tab-upload':TabUpload,
			'v-check-box':CheckBox,
			'v-tool-bar':ToolBar
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
	.slide-enter-active, .slide-leave-active {
	  	transition: all .3s
	}
	.slide-enter, .slide-leave-active {
		transform:translateY(-60px);
	  	opacity: 0.2
	}
	
	.slidedown-enter-active, .slidedown-leave-active {
	  	transition: all .3s
	}
	.slidedown-enter, .slidedown-leave-active {
		transform:translateY(46px);
	  	opacity: 0.1
	}
	#fileBox{
		height: 100%;
		overflow-y: scroll;
		overflow-x: hidden;
	}
	.nofile{
		font-size: 14px;
		line-height: 3;
		color: #666;
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
