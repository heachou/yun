<template>
    <div class="transmissionBox">
    	<v-header  :fixed="true" title="传输列表" returnUrl="/main" :leftNeed="true" :rightNeed="false"></v-header>
        <div class="box" v-if="downloadArray.length != 0">
            <mt-cell-swipe v-for="(item,index) in downloadArray" :key="item" :title="getNameBypath(item)"
          :right="[{
            content:'删除',
            style:{
                backgroundColor:'red'
                ,fontSize:'16px',
                color: '#fff'},
                handler:()=>deleteItem(index)}]" 
                >
                </mt-cell-swipe>
        </div>
    	<p class="nodata" v-if="downloadArray.length == 0">暂无下载数据...</p>
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
        this.getDownloadArray();
    },
    methods:{
        getDownloadArray:function(){
            Indicator.open();
            var _temp = [];
            // 说明不是从下载入口进来的
            if(this.$route.query.downloadArray == undefined){
                console.log(1);
                this.getDownloadHistory();
                Indicator.close();
            }else{
                console.log(2);
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
                    _this.downloadArray = result.downloadHistoryFiles;
                }
            })
        },
        // 删除文件
        deleteItem:function(index){
            var _this = this;
            MessageBox({
              title: '删除',
              message: '确定执行此操作?',
              showCancelButton: true
            }).then(action => {
                Indicator.open();
                _this.$http.post('/deleteFileByPath',{"filePath":_this.downloadArray[index]}).then(function(response){
                    var result = response.body;
                    // 登录超时
                    Indicator.close();
                    if(result.success === 0){
                        Toast(result.msg);
                        this.$router.push({"path":"/login"})
                        return;
                    }
                    if(result.success === 1){
                        Toast('删除成功');
                        _this.downloadArray.splice(index,1);
                    }
                })
            })
        },
        // 通过文件路劲得到文件名成
        getNameBypath:function(path){
            var from = path.lastIndexOf("\\");
            var name = path.substr(from+1,path.length);
            return name;
        }
    }
}
</script>
<style type="text/css">
    .transmissionBox{
        height: 100%;
        box-sizing: border-box;
        padding-top: 40px;
        overflow-y: scroll;
    }
    .nodata{
        height: 60px;
        line-height: 60px;
        text-align: center;
    }
</style>