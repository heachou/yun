<template>
	<div id="fileBox">
		<ul v-if="listBox.length != 0">
			<li v-for="item in listBox">
				<template v-if="item.type =='folder'">
					<img :src="imgType(item.extName)" @click="getList(item.path,item.name)">
					<div class="left" @click="getList(item.path,item.name)">
						<p class="ellipsis">{{item.name}}</p>	
						<span>{{item.birth}}</span>
					</div>
					<label class="inputBox">
						<input type="checkbox" >
					</label>
				</template>
				<template v-else>
					<img :src="imgType(item.extName)">
					<div class="left">
						<p class="ellipsis">{{item.name}}</p>	
						<span>{{item.birth}}</span>
					</div>
					<label class="inputBox">
						<input type="checkbox" >
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

	export default{
		props:{
			fileBox:{
				type:Array
			}
		},
		data(){
			return {
				listBox: this.fileBox
			}
		},
		ready(){
			console.log(location);
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
			getList:function(path,folderName){
				console.log(path,folderName);
				if(path){
					Indicator.open();
					this.$router.push({path:location.pathname+'/'+folderName});	
					var p = {
						"folderRouter":path,
						"folderName":folderName
					}
					try{
						this.$http.post('/api/getfile/folderName',p).then(function(response){
				    		var data = response.body;
				    		var fileArray = data.list.fileArray;
				    		var folderArray = data.list.folderArray;
				    		this.listBox = [];
				    		if(folderArray.length != 0){
				    			for (var i = 0; i < folderArray.length; i++) {
				    				this.listBox.push(folderArray[i])
				    			}
				    		}
				    		if(fileArray.length != 0){
				    			for (var i = 0; i < fileArray.length; i++) {
				    				this.listBox.push(fileArray[i])
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