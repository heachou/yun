<template>
  <div id="app">
  	<transition :name="transitionName">
    	<router-view class="child-view"></router-view>
  	</transition>
  </div>
</template>

<script>

export default {
  name: 'app',
   data () {
    return {
      transitionName: 'slide-left'
    }
  },
   watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
}
</script>

<style>
#app{
	height: 100%;
}
.child-view {
  width:100%;
  position: absolute;
  transition: all .5s  cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity:0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}
</style>
