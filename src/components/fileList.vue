<template>
	<div id="fileBox">
		<transition name="slide">
			<v-check-box :selectAll="selectAll" :cancelSelected="cancelSelected" :checkedNames="checkedNames"></v-check-box>
		</transition>
		<ul v-if="listBox.length != 0">
			<li v-for="item in listBox">
				<template v-if="item.type =='folder'">
					<img :src="imgType(item.extName)" @click="setFolderInfo(item.path,item.name)">
					<div class="left" @click="setFolderInfo(item.path,item.name)">
						<p class="ellipsis">{{item.name}}</p>	
						<span>{{item.birth}}</span>
					</div>
					<label class="inputBox">
						<input type="checkbox" :value="item.name" v-model="checkedNames">
					</label>
				</template>
				<template v-else>
					<img :src="imgType(item.extName)">
					<div class="left">
						<p class="ellipsis">{{item.name}}</p>	
						<span>{{item.birth}}</span>
					</div>
					<label class="inputBox">
						<input type="checkbox" :value="item.name" v-model="checkedNames">
					</label>
				</template>
			</li>
		</ul>
		<p v-if="listBox.length == 0" class="text-center nofile">暂无文件哟...</p>
	</div>
</template>
<script type="text/javascript">
 	import imgTypeData from '../assets/js/imageType.js';
	import { Indicator } from 'mint-ui';
	import CheckBox from './checkBox.vue'
	export default{
		props:{
			fileBox:{
				type:Array
			}
		},
		data(){
			return {
				listBox: this.fileBox,
				checkedNames:[]
			}
		},
		methods:{
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
				for (var i = 0; i < this.listBox.length; i++) {
					this.checkedNames.push(this.listBox[i].name);
				}
			}
		},
		components:{
			'v-check-box':CheckBox
		}
	}
</script>
<style type="text/css" scoped>
	.slide-enter-active, .slide-leave-active {
	  transition: all .3s
	}
	.slide-enter, .slide-leave-active {
		transform:translateY(-60px);
	  	opacity: 0.2
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