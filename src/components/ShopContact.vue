<template>
	<div id="business">
		<div class="business-header">
			<div class="nav-bar help-navbar">
		  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
		  		<div class="nav-title">联系电话</div>
			</div>
		</div>
		<div class="business-content">
			<div class="business-row">
				<input type="text" v-model="takeOutPhone" class="phone" maxlength="11">
			</div>
		</div>
		<div class="saveBusiness" @click="saveBusiness">保存</div>
	</div>
</template>
<script>
	import {setBusinessPhoneNumber} from '@/api/api'
	export default {
		name: 'business',
		data: function(){
			return {
				takeOutPhone: ''
			}
		},
		created: function(){
			var takeOutPhone = this.$route.query.tel;
			this.takeOutPhone = takeOutPhone;
		},
		methods: {
			saveBusiness: function(){
				if(!this.takeOutPhone){
					this.$toast({
						message: '手机号不能为空',
						duration: 1000
					})
					return;
				}
				this.$indicator.open();
				setBusinessPhoneNumber(this.takeOutPhone).then(() => {
					this.$indicator.close();
					this.$toast({
						message: '修改成功',
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
		padding-top: 5.33vw;
	}
	.business-row{
		overflow: hidden;
		zoom: 1;
	    box-sizing: border-box;
	    padding: 2.66vw;
		background-color: #fff;
		color: #4d4d4d;
		font-size: 4.26vw;
	}
	.saveBusiness{
		width: 100%;
		height: 10.66vw;
		text-align: center;
		line-height: 10.66vw;
		background-color: #0eb745;
		color: #fff;
		position: fixed;
		bottom: 0;
	}
	.phone{
		width: 100%;
		height: 100%;
		border: none;
		outline: none;
		font-size: 4.26vw;
	}
</style>