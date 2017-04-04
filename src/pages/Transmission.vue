<template>
    <div class="transmissionBox">
    	<v-header  title="传输列表" returnUrl="/main" :leftNeed="true" :rightNeed="false"></v-header>
    </div>
</template>
<script>
import Vue from 'vue'
import header from '../components/header.vue'
export default{
	name:'transmission',
	components:{
        'v-header':header
    }
}
</script>
