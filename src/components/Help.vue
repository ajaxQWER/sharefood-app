<template>
  <div id="help">
	<div class="nav-bar help-navbar">
	  <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
	  <div class="nav-title">登录遇到问题</div>
	</div>
	<div class="help-lists">
		<mt-cell title="标题文字1" is-link to="/helpDetail?helpId=1"></mt-cell>
		<mt-cell title="标题文字2" is-link to="/helpDetail?helpId=2"></mt-cell>
		<mt-cell title="标题文字3" is-link to="/helpDetail?helpId=3"></mt-cell>
		<mt-cell title="标题文字4" is-link to="/helpDetail?helpId=4"></mt-cell>
	</div>
  </div>
</template>
<script>
export default {
  name: 'help',
  data: function() {
	return {

	}
  },
  methods: {
  	back: function(){
  		this.$router.back()
  	}
  }
}

</script>
<style soped>
#help{
	min-height: 100%;
	background-color: #f2f2f2;
}
.help-lists{
	margin: 2.66vw 0;
}
</style>
