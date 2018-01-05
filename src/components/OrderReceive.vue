<template>
	<div id="business">
		<div class="business-header">
			<div class="nav-bar help-navbar">
		  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
		  		<div class="nav-title">接单设置</div>
			</div>
		</div>
		<div class="business-content">
			<div class="business-row" v-if="automaticAcceptOrder=='true'">
				<button class="business-btn business-close" @click="hand">设置为手动接单</button>
			</div>
			<div class="business-row" v-else>
				<button class="business-btn business-open" @click="auto">设置为自动接单</button>
			</div>
		</div>
	</div>
</template>
<script>
	import {autoReceiveOrder,handReceiveOrder} from '@/api/api'
	export default {
		name: 'business',
		data: function(){
			return {
				automaticAcceptOrder: 'true'
			}
		},
		created: function(){
			var automaticAcceptOrder = this.$route.query.automaticAcceptOrder;
			this.automaticAcceptOrder = automaticAcceptOrder;
		},
		methods: {
			hand: function(){
				this.$indicator.open();
				handReceiveOrder().then(res => {
					this.$indicator.close();
					this.$toast({
						message:'操作成功',
						duration: 1000
					})
					this.$router.isBack = true;
					setTimeout(() => {
					   this.$router.back()
					}, 1500)
				})
			},
			auto: function(){
				this.$indicator.open();
				autoReceiveOrder().then(res => {
					this.$indicator.close();
					this.$toast({
						message:'操作成功',
						duration: 1000
					})
					this.$router.isBack = true;
					setTimeout(() => {
					   this.$router.back()
					}, 1500)
				})
			}
		}
	}
</script>
<style scoped>
	#business{
		min-height: 100%;
		background-color: #f2f2f2;
	}
	.business-header{
		width: 100%;
	}
	.business-content{
		padding: 2.66vw;
	}
	.business-row{
		padding-bottom: 2.66vw;
	}
	.business-btn{
		width: 100%;
		height: 10.66vw;
		border: none;
		outline: none;
		border-radius: 5px;
		padding: 0;
		box-sizing: border-box;
		font-size: 4.26vw;
	}
	.business-open{
		background: url(../assets/images/help-navbar.jpg) no-repeat center center;
		background-size: cover;
		color: #fff;
	}
	.business-close{
		color: #fff;
		border: 0.13vw solid #ef4f4f;
		background-color: #ef4f4f;
	}
</style>