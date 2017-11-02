<template>
  <div id="login">
	<div class="top-bg">
		<div class="nav-bar">
			<div class="back" @click="back"><img src="../assets/images/black-back.png" alt=""></div>
		</div>
		<div class="login-logo"><img src="../assets/images/login-logo.png" alt=""></div>
	</div>
	<div class="login-tabs">
		<div class="tab" @click="toggleLoginType">
			<div :class="[isMessageCodeLogin?'active-type':'', 'login-type']">手机验证码登录</div>
		</div>
		<div class="tab" @click="toggleLoginType">
			<div :class="[isMessageCodeLogin?'':'active-type', 'login-type ']">账号密码登录</div>
		</div>
	</div>
	<div class="login-input-contain" v-if="isMessageCodeLogin">
		<div class="login-input">
			<input type="text" class="input-item" placeholder="请输入手机号" maxlength="11" v-model="sellerName"><input type="button" value="获取验证码" class="get-code">
		</div>
		<div class="login-input">
			<input type="text" class="input-item" placeholder="请输入验证码" v-model="code" maxlength="4">
		</div>
	</div>
	<div class="login-input-contain" v-if="!isMessageCodeLogin">
		<div class="login-input">
			<input type="text" class="input-item" placeholder="请输入账号" maxlength="11" v-model="sellerName">
		</div>
		<div class="login-input">
			<input type="password" class="input-item" placeholder="请输入密码" v-model="secretkey">
		</div>
	</div>
	<div class="login-btn-contain">
		<input type="button" value="立即登录" class="login-btn" @click="userLogin">
	</div>
	<div class="jump-row">
		<router-link to="/regist" class="jump-item regist">新用户注册</router-link>
		<router-link to="/forgetPwd" class="jump-item forget-pwd">忘记密码?</router-link>
	</div>
	<p class="help-row">
		<router-link to="/help?id=5" class="help-item">登录遇到问题?</router-link>
	</p>
  </div>
</template>
<script>
import {loginByCode,loginBySecretKey} from '@/api/api'
export default {
  name: 'login',
  data: function() {
	return {
		code: '',
		secretkey: '',
		sellerName: '',
		isMessageCodeLogin: true
	}
  },
  methods: {
	toggleLoginType: function(){
		this.isMessageCodeLogin = !this.isMessageCodeLogin;
		this.code = '';
		this.secretkey = '';
		this.sellerName = '';
	},
	userLogin: function(){
		var params = {
			code: this.code,
			secretkey: this.secretkey,
			sellerName: this.sellerName
		}
		if(this.isMessageCodeLogin){
			this.$indicator.open();
			loginByCode(params).then(res=>{
				this.$indicator.close();
				console.log(res)
				sessionStorage.setItem('jwt',res.jwt)
				sessionStorage.setItem('seller',JSON.stringify(res.seller))
				this.$router.push('/home')
			}).catch(err=>{
				this.$indicator.close();
			})
		}else{
			this.$indicator.open();
			loginBySecretKey(params).then(res=>{
				this.$indicator.close();
				console.log(res)
			})
		}
	}
  }
}

</script>
<style scoped>
.login-logo{
	text-align: center;
	margin-top: 7.2vw;
}
.login-logo img{
	width: 26.4vw;
}
.login-tabs,
.mint-tab-item-label{
	display: -webkit-box;
	display: -moz-box;
	display: -ms-box;
	display: box;
	display: -webkit-flex;
	display: flex;
	border-bottom: 1px solid #ccc;
	font-size: 4vw;
	margin-top: 4vw;
}
.tab{
	text-align: center;
	-webkit-box-flex: 1;
	-moz-box-flex: 1;
	-ms-box-flex: 1;
	box-flex: 1;
	-webkit-flex: 1;
	flex: 1;
}
.login-type{
	display: inline-block;
	color: #808080;
	line-height: 2;
}
.active-type{
	color: #08983c;
	border-bottom: 2px solid #08983c;
}
.login-input-contain{
	padding-top: 2.66vw;
	padding-bottom: 5.33vw;
}
.login-input{
	width: 86.66vw;
	height: 10.66vw;
	border: 1px solid #808080;
	border-radius:30px;
	margin: 2.66vw auto;
	position: relative;
}
.input-item{
	width: 100%;
	height: 100%;
	border-radius:30px;
	border: none;
	outline: none;
	padding: 2%;
	box-sizing: border-box;
	font-size: 3.73vw;
}
.get-code{
	width: 21.33vw;
	height: 6.66vw;
	position: absolute;
	right: 0;
	margin: 2vw;
	font-size: 3.2vw;
	background-color: #08983c;
	color: #fff;
	border-radius: 30px;
	border: none;
	outline: none;
}
.login-btn-contain{
	text-align: center;
}
.login-btn{
	width: 86.66vw;
	height: 10.66vw;
	background: url(../assets/images/login-btn.png) no-repeat center center;
	color: #fff;
	font-size: 4.26vw;
	border: none;
	border-radius: 30px;
	-moz-box-shadow: 2px 3px 10px 2px #beeccc;
	-webkit-box-shadow: 2px 3px 10px 2px #beeccc;
	box-shadow: 2px 3px 10px 2px #beeccc;
}
.jump-row{
	overflow: hidden;
	zoom: 1;
}
.jump-item{
	text-decoration: none;
	font-size: 3.73vw;
	color: #08983c;
	margin-top: 8.66vw;
}
.regist{
	float: left;
	padding-left: 12.66vw;
}
.forget-pwd{
	float: right;
	padding-right: 12.66vw;
}
.help-row{
	text-align: center;
	margin-top: 10.66vw;
}
.help-item{
	text-decoration: none;	
	font-size: 3.73vw;
	color: #999;
}
</style>
