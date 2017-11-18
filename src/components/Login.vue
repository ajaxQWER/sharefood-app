<template>
  <div id="login">
	<div class="top-bg">
		<div class="nav-bar">
			<!-- <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div> -->
		</div>
		<div class="login-logo"><img src="../assets/images/login-logo.png" alt=""></div>
	</div>
	<!-- <div class="login-tabs">
		<div class="tab" @click="toggleLoginType">
			<div :class="[isMessageCodeLogin?'active-type':'', 'login-type']">手机验证码登录</div>
		</div>
		<div class="tab" @click="toggleLoginType">
			<div :class="[isMessageCodeLogin?'':'active-type', 'login-type ']">账号密码登录</div>
		</div>
	</div> -->
	<div class="login-input-contain" v-if="isMessageCodeLogin">
		<div class="login-input">
			<input type="text" class="input-item" placeholder="请输入手机号" maxlength="11" v-model="sellerName">
			<input type="button" value="获取验证码" class="get-code" @click="getCode" :disabled="isClickGetCode">
		</div>
		<div class="login-input">
			<input type="text" class="input-item" placeholder="请输入验证码" v-model="code" maxlength="4">
		</div>
	</div>
	<!-- <div class="login-input-contain" v-if="!isMessageCodeLogin">
		<div class="login-input">
			<input type="text" class="input-item" placeholder="请输入账号" maxlength="11" v-model="sellerName">
		</div>
		<div class="login-input">
			<input type="password" class="input-item" placeholder="请输入密码" v-model="secretkey">
		</div>
	</div> -->
	<div class="login-btn-contain">
		<input type="button" value="立即登录" class="login-btn" @click="userLogin">
	</div>
	<div class="jump-row">
		<!-- <router-link to="/regist" class="jump-item regist">新用户注册</router-link> -->
		<!-- <router-link to="/forgetPwd" class="jump-item forget-pwd">忘记密码?</router-link> -->
	</div>
	<p class="help-row">
		<router-link to="/help?id=5" class="help-item">登录遇到问题?</router-link>
	</p>
  </div>
</template>
<script>
import {loginByCode,loginBySecretKey,getPhoneCode} from '@/api/api'
export default {
  name: 'login',
  data: function() {
	return {
		code: '',
		secretkey: '',
		sellerName: '',
		isClickGetCode: false,
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
	getCode: function(e){
		var _this = this;
  		if(this.sellerName.length == 11){
			_this.isClickGetCode = true;
  			getPhoneCode(this.sellerName).then(()=>{})
  		}else{
  			this.$toast({message:'请输入正确的手机号码',duration: 1000})
  			return;
  		}
  		var i = 60;
  		var codeInterval = setInterval(function() {
  		  	i--;
		  	if(i == 0){
		  		clearInterval(codeInterval)
		  		_this.isClickGetCode = false;
		  		e.target.value = '获取验证码';
		  		return;
		  	}
		  	e.target.value = i + 's后重发'
  		}, 1000)
	},
	userLogin: function(){

		if(!this.sellerName){
  			this.$toast({message:'请输入手机号',duration: 1000})
			return
		}
		if(!this.code){
  			this.$toast({message:'请输入验证码',duration: 1000})
			return
		}

	    var params = {
	    	code: this.code,
	    	cid: '',
	    	ios: false,
	    	sellerName: this.sellerName
	    }
	    var ua = navigator.userAgent.toLocaleLowerCase();

	    if(ua.indexOf('iphone') == -1){
	    	//安卓
		    try {

		    	params.ios = false;
		    	params.cid = android.getCid()

	            // alert(android.getCid())
	            // alert(params.ios)
		    	this.$indicator.open();
		    	loginByCode(params).then(res=>{
		    		this.$indicator.close();
		    		console.log(res)
		    		localStorage.setItem('jwt',res.jwt)
		    		localStorage.setItem('seller',JSON.stringify(res.seller))
		    		localStorage.setItem('shopName',res.shopName)
		    		this.$router.push('/home')
		    	}).catch(err=>{
		    		this.$indicator.close();
		    	})

			} catch (e) {
				console.log(e)
		    	alert(e.name + ": " + e.message);
		    }
	    }else{
	    	//ios
	    	var _this = this;
	    	try {
		    	_this.setupWebViewJavascriptBridge(function(bridge) {
		    		bridge.callHandler('getCid', null, function(response) {
		    			// alert(response)
		                params.cid = response;
		                params.ios = true;
		                _this.$indicator.open();
		                // alert(loginByCode)
	        	    	loginByCode(params).then(res=>{
	        	    		_this.$indicator.close();
	        	    		// alert(params.cid)
		              //   	alert(params.ios)
	        	    		console.log(res)
	        	    		localStorage.setItem('jwt',res.jwt)
	        	    		localStorage.setItem('seller',JSON.stringify(res.seller))
	        	    		localStorage.setItem('shopName',res.shopName)
	        	    		_this.$router.push('/home')
	        	    	}).catch(err=>{
	        	    		_this.$indicator.close();
	        	    	})
		            })
		    	})
	    	} catch (err) {
	    		alert(err)
	    	}
	    }
	    // loginByCode(params).then(res=>{
	    // 	this.$indicator.close();
	    // 	console.log(res)
	    // 	localStorage.setItem('jwt',res.jwt)
	    // 	localStorage.setItem('seller',JSON.stringify(res.seller))
	    // 	this.$router.push('/home')
	    // }).catch(err=>{
	    // 	this.$indicator.close();
	    // })


		// if(this.isMessageCodeLogin){
		// 	if(!this.sellerName){
		// 		this.$toast('请输入手机号');
		// 		return
		// 	}
		// 	if(!this.code){
		// 		this.$toast('请输入验证码');
		// 		return
		// 	}
		// 	this.$indicator.open();
		// 	loginByCode(params).then(res=>{
		// 		this.$indicator.close();
		// 		console.log(res)
		// 		sessionStorage.setItem('jwt',res.jwt)
		// 		sessionStorage.setItem('seller',JSON.stringify(res.seller))
		// 		this.$router.push('/home')
		// 	}).catch(err=>{
		// 		this.$indicator.close();
		// 	})
		// }else{
		// 	if(!this.sellerName){
		// 		this.$toast('请输入账号');
		// 		return
		// 	}
		// 	if(!this.secretkey){
		// 		this.$toast('请输入密码');
		// 		return
		// 	}
		// 	this.$indicator.open();
		// 	loginBySecretKey(params).then(res=>{
		// 		this.$indicator.close();
		// 		console.log(res)
		// 	})
		// }
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
	padding: 2% 4%;
	box-sizing: border-box;
	font-size: 3.73vw;
}
.get-code{
	width: 21.33vw;
	height: 6.66vw;
	position: absolute;
	right: 0;
	top: 0;
	margin: 2vw;
	font-size: 3.2vw;
	background: url(../assets/images/get-code.png) no-repeat center center;
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
	outline: none;
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
