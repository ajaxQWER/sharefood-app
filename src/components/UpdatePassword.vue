<template>
	<div id="setting">
		<div class="setting-header">
			<div class="nav-bar help-navbar">
		  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
		  		<div class="nav-title">登录密码修改</div>
			</div>
		</div>
		<div class="setting-content">
			<div class="shopDetail-row">
				<div class="shopDetail-col">
					<input class="update-input" type="password" placeholder="旧密码" v-model="oldSecretkey">
				</div>
			</div>
			<div class="shopDetail-row">
				<div class="shopDetail-col">
					<input class="update-input" type="password" placeholder="新密码" v-model="newSecretkey">
				</div>
			</div>
			<button class="login-out-btn" @click="update">确定修改</button>
		</div>
	</div>
</template>
<script>
	import {updatePwd} from '@/api/api'
	export default {
		name: 'setting',
		data: function(){
			return {
				oldSecretkey: '',
				newSecretkey: ''
			}
		},
		methods: {
			update: function(){
				var params = {
					newSecretkey: this.newSecretkey,
					oldSecretkey: this.oldSecretkey
				}
				console.log(params)
				updatePwd(params).then(res => {
					console.log(res)
					localStorage.clear()
					this.$toast({message:'修改成功',duration: 1000})
					setTimeout(() => {
				 		this.$router.push('/login')
					}, 1300)
				})
			}
		}
	}
</script>
<style scoped>
	#setting{
		min-height: 100%;
		background-color: #f2f2f2;
	}
	.setting-header{
		width: 100%;
		position: fixed;
	}
	.setting-content{
	    box-sizing: border-box;
		height: 100vh;
		overflow: hidden;
		zoom: 1;
		padding: 13.06vw 0 14.39vw;
	}
	.shopDetail-row{
		margin-top: 2.66vw;
		background-color: #fff;
	}
	.shopDetail-col{
		padding: 2.66vw;
		overflow: hidden;
		zoom: 1;
		color: #4d4d4d;
	}
	.update-input{
		display: block;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		border: none;
		outline: none;
	}
	.login-out-btn{
		display: block;
		width: 93.33vw;
		height: 10.66vw;
		color: #fff;
		margin: 9.33vw auto;
		background: url(../assets/images/help-navbar.jpg) no-repeat center center;
		background-size: cover;
		border: none;
		outline: none;
		border-radius: 6px;
		font-size: 4.26vw;
	}
</style>