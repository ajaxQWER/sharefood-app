<template>
	<div id="shopDetail">
		<div class="shopDetail-header">
			<div class="nav-bar help-navbar">
		  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
		  		<div class="nav-title">门店信息</div>
			</div>
		</div>
		<div class="shopDetail-content">
			<div class="shopDetail-row">
				<div class="shopDetail-col shop-after">
					<div class="row-key row-title">营业状态</div>
					<div class="row-value">营业中</div>
				</div>
			</div>
			<div class="shopDetail-row">
				<div class="shopDetail-col">
					<div class="row-key">门店基本信息</div>
				</div>
				<div class="shopDetail-col">
					<div class="row-key small-title">门店名称</div>
					<div class="row-key small-key">周大侠盖浇饭(蜀都中心店)</div>
				</div>
				<div class="shopDetail-col">
					<div class="row-key small-title">门店地址</div>
					<div class="row-key small-key">天府二街138号蜀都中心</div>
				</div>
			</div>
			<div class="shopDetail-row">
				<div class="shopDetail-col">
					<div class="row-key">营业设置</div>
				</div>
				<div class="shopDetail-col shop-after">
					<div class="row-key small-title">营业时间</div>
					<div class="row-key small-key">10:00-22:00</div>
				</div>
				<div class="shopDetail-col shop-after">
					<div class="row-key small-title">联系电话</div>
					<div class="row-key small-key">13600000000</div>
				</div>
			</div>
			<div class="shopDetail-row">
				<div class="shopDetail-col shop-after">
					<div class="row-key row-title">营业类型</div>
					<div class="row-value">预定+外卖</div>
				</div>
			</div>
			<div class="shopDetail-row">
				<div class="shopDetail-col shop-after">
					<div class="row-key">配送设置</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	
</script>
<style scoped>
	#shopDetail{
		min-height: 100%;
		background-color: #f2f2f2;
	}
	.shopDetail-header{
		width: 100%;
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
	.shopDetail-col:not(:last-child){
		border-bottom: 0.13vw solid #f2f2f2;
	}
	.row-key{
		font-size: 4.26vw;
	}
	.small-title{
		font-size: 4vw;
		color: #999;
	}
	.small-key{
		font-size: 3.46vw;
	}
	.row-title{
		display: inline-block;
		float: left;
	}
	.row-value{
		display: inline-block;
		float: right;
		margin-right: 2.66vw;
		margin-top: 0.4vw;
	}
	.shop-after{
		position: relative;
	}
	.row-value:after{
		content: '';
		display: inline-block;
		width: 2vw;
		height: 3.73vw;
		background: url(../assets/images/list-more.png) no-repeat;
		background-size: contain;
		vertical-align: middle;
		margin-top: -0.4vw;
		margin-left: 2.66vw;
	}
</style>