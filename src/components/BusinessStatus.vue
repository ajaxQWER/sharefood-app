<template>
	<div id="business">
		<div class="business-header">
			<div class="nav-bar help-navbar">
		  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
		  		<div class="nav-title">营业状态</div>
			</div>
		</div>
		<div class="business-content">
			<div class="business-row">
				<button class="business-btn business-open">营业中</button>
			</div>
			<div class="business-row">
				<button class="business-btn business-close">歇业中</button>
			</div>
		</div>
	</div>
</template>
<script>
	import {setBusinessOpen,setBusinessClose} from '@/api/api'
	export default {
		name: 'business',
		data: function(){
			return {

			}
		},
		methods: {

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
		color: #4d4d4d;
		border: 0.13vw solid #808080;
	}
</style>