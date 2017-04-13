<template>
	<div>
		<input type="checkbox" value="Jack" v-model="checkedNames"><br>
		<input type="checkbox" value="John" v-model="checkedNames"><br>
		<input type="checkbox" value="Mike" v-model="checkedNames"><br>
		<br>
<span>Checked names: {{ checkedNames | json }}</span>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'share',
		data(){
			return{
				checkedNames:[]
			}
		},
		created(){
		},
		methods:{
			
		},

	}
</script>
<style type="text/css"></style>