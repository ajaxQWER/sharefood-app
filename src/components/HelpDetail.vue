<template>
  <div id="help">
	<div class="nav-bar help-navbar">
	  <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
	  <div class="nav-title">登录遇到问题</div>
	</div>
	<div class="help-lists">
		<div class="help-contain">
			<h3 class="article-title">忘记密码？</h3>
			<p class="article-content">答：方法一：点击登录页[忘记密码]，进行密码找回<br>方法二：若您为连锁店体系门店，可联系您的公司总部设
			置新的密码<br>方法三：若您的账号未绑定手机号码，无法自助找回，请联系您的市场经理</p>
		</div>
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
	background-color: #fff;
}
.help-contain{
	padding: 5.33vw 2.66vw;
}
.article-title{
	font-size: 4vw;
	line-height: 2;
	margin: 0;
}
.article-content{
	font-size: 3.73vw;
}
</style>
