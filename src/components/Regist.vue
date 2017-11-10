<template>
  <div id="regist">
	<div class="nav-bar help-navbar">
	  <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
	  <div class="nav-title">我要开店</div>
	</div>
	<div class="regist">
		<div><img src="../assets/images/open-store.png" alt=""></div>
		<p>请使用pc访问<span>kaidian.gongxiangdiancan.com</span>,谢谢</p>
	</div>
  </div>
</template>
<script>
export default {
  name: 'regist',
  data: function() {
	return {

	}
  },
  methods: {
  	
  }
}

</script>
<style scoped>
#regist{
	min-height: 100%;
	background-color: #f2f2f2;
}
.regist{
	margin: 26.66vw 0;
	text-align: center;
	font-size: 3.46vw;
}
.regist span{
	color: #08983c;
	text-decoration: none;
}
</style>
