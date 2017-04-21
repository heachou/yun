<template>
    <div class="transmissionBox">
    	<v-header  title="传输列表" returnUrl="/main" :leftNeed="true" :rightNeed="true"></v-header>
    	<p>传输列表</p>
    	<p>传输列表</p>
    	<p>传输列表</p>
    	<p>传输列表</p>
    	<p>传输列表</p>
    	<p>传输列表</p>
    	<p>传输列表</p>
    	<p>传输列表</p>
    	<p>传输列表</p>
    	<p>传输列表</p>
    	<p>传输列表</p>
        <form id="download" action="/testDownload" method="get">
            <input id="submit" type="submit" value="Submit" />
        </form>
    </div>
</template>
<script>
import Vue from 'vue'
import header from '../components/header.vue'
export default{
	name:'transmission',
	components:{
        'v-header':header
    },
    ready(){
        this.testDownload();
    },
    methods:{
        testDownload:function(){
            alert(2);
        }
    }
}
</script>
