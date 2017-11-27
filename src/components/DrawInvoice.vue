<template>
	<div id="business">
		<div class="business-header">
			<div class="nav-bar help-navbar">
		  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
		  		<div class="nav-title">开票设置</div>
			</div>
		</div>
		<div class="business-content">
			<div class="business-row" v-if="canDrawInvoice=='true'">
				<button class="business-btn business-close" @click="close">设置不允许开票</button>
			</div>
			<div class="business-row" v-else>
				<button class="business-btn business-open" @click="open">设置允许开票</button>
			</div>
		</div>
	</div>
</template>
<script>
	import {setCanDrawInvoice,setNoCanDrawInvoice} from '@/api/api'
	export default {
		name: 'business',
		data: function(){
			return {
				canDrawInvoice: 'true'
			}
		},
		created: function(){
			var canDrawInvoice = this.$route.query.canDrawInvoice;
			this.canDrawInvoice = canDrawInvoice;
		},
		methods: {
			open: function(){
				this.$indicator.open();
				setCanDrawInvoice().then(res => {
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
			close: function(){
				this.$indicator.open();
				setNoCanDrawInvoice().then(res => {
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