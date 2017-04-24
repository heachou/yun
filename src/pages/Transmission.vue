<template>
    <div class="transmissionBox">
    	<v-header  title="传输列表" returnUrl="/main" :leftNeed="true" :rightNeed="true"></v-header>
        <mt-cell-swipe v-for="item in downloadArray" :title="item"
          :right="rightButtons" :icon="getIconByTitle(item)"></mt-cell-swipe>
    	<p v-if="downloadArray.length == 0">暂无下载数据...</p>
    </div>
</template>
<script>
import Vue from 'vue'
import header from '../components/header.vue'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { CellSwipe } from 'mint-ui';
import imgTypeData from '../assets/js/imageType.js';

Vue.component(CellSwipe.name, CellSwipe);

export default{
	name:'transmission',
	components:{
        'v-header':header
    },
    data(){
        return{
            downloadArray:[],
        }
    },
    created(){
        // 
        this.rightButtons = [
            {
              content: '删除',
              style: { background: 'red', color: '#fff' },
              handler: () => this.$messagebox({
                                  title: '提示',
                                  message: '删除该项?',
                                  showCancelButton: true
                                })
            }
        ];
        this.getDownloadArray();
    },
    methods:{
        getDownloadArray:function(){
            Indicator.open();
            var _temp = [];
            // 说明不是从下载入口进来的
            if(this.$route.query.downloadArray == undefined){
                this.getDownloadHistory();
                Indicator.close();
            }else{
                // 将要下载的文件名插入到数据库
                _temp = Array.isArray(this.$route.query.downloadArray)?this.$route.query.downloadArray : _temp.push(this.$route.query.downloadArray);
                this.$http.post('/addDownloadHistory',{files:_temp}).then(function(response){
                    var result = response.body;
                    if(result.success == 0){
                        Toast(result.msg);
                        Indicator.close();
                        this.$router.push({"path":"/login"})
                        return;
                    }else{
                        Indicator.close();
                        this.getDownloadHistory();
                    }
                })
            }
        },
        getDownloadHistory:function(){
            this.$http.get('/getDownloadHistory').then(function(response){
                var result = response.body;
                if(result.success == 0){
                    Indicator.close();
                    Toast(result.msg);
                    this.$router.push({"path":"/login"})
                    return;
                }else{
                    var _this = this;
                    Indicator.close();
                    result.downloadHistoryFiles.forEach(function(item,index){
                        var length = item.lastIndexOf('\\');
                        var name = item.substr(length+1,item.length)
                        _this.downloadArray.push(name);
                        return item;
                    })

                    
                }
            })
        },
        // 根据文件名获取相应图标
        getIconByTitle:function(title){

            if(title){
                var type = title.split('.')[1];
                if(type){
                    // 改变为绝对路径
                    return location.origin+imgTypeData[type];
                }else{  
                    // 改变为绝对路径
                    return location.origin+imgTypeData.folder;
                }
            }
            return type;
        }
    }
}
</script>
