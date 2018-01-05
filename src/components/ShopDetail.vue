<template>
	<div id="shopDetail">
		<div class="shopDetail-header">
			<div class="nav-bar help-navbar">
		  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
		  		<div class="nav-title">门店信息</div>
			</div>
		</div>
		<div class="shopDetail-content" v-if="shopDetail">
			<div class="shopDetail-row">
				<router-link :to="'/businessStatus?open='+shopDetail.operatingState" class="jump">
					<div class="shopDetail-col shop-after">
						<div class="row-key row-title">营业状态</div>
						<div class="row-value row-value-after">{{shopDetail.operatingState?'营业中':'歇业中'}}</div>
					</div>
				</router-link>
			</div>
			<div class="shopDetail-row">
				<div class="shopDetail-col">
					<div class="row-key">门店基本信息</div>
				</div>
				<div class="shopDetail-col">
					<div class="row-key small-title">门店名称</div>
					<div class="row-key small-key">{{shopDetail.shopName}}</div>
				</div>
				<div class="shopDetail-col">
					<div class="row-key small-title">门店地址</div>
					<div class="row-key small-key">{{shopDetail.address}}</div>
				</div>
			</div>
			<div class="shopDetail-row sales">
				<div class="shopDetail-col">
					<div class="row-key">营业设置</div>
				</div>
				<router-link :to="'/businessTime?start='+shopDetail.busBeginTime+'&end='+shopDetail.busEndTime" class="jump">
					<div class="shopDetail-col shop-after">
						<div class="row-title">
							<div class="row-key small-title">营业时间</div>
							<div class="row-key small-key">{{shopDetail.busBeginTime}}-{{shopDetail.busEndTime}}</div>
						</div>
						<div class="row-value row-value-after"></div>
					</div>
				</router-link>
				<router-link :to="'/shopContact?tel='+shopDetail.takeOutPhone" class="jump">
					<div class="shopDetail-col shop-after">
						<div class="row-title">
							<div class="row-key small-title">联系电话</div>
							<div class="row-key small-key">{{shopDetail.takeOutPhone}}</div>
						</div>
						<div class="row-value row-value-after"></div>
					</div>
				</router-link>
			</div>
            <div class="shopDetail-row">
                <router-link class="jump" :to="'/orderReceive?automaticAcceptOrder='+shopDetail.automaticAcceptOrder">
                    <div class="shopDetail-col">
                        <div class="row-key row-title">接单设置</div>
                        <div class="row-value row-value-after">{{shopDetail.automaticAcceptOrder?'自动':'手动'}}</div>
                    </div>
                </router-link>
            </div>
            <div class="shopDetail-row">
                <router-link :to="'/setMinDeliveryPrice?minDeliveryPrice='+shopDetail.minDeliveryPrice" class="jump">
                    <div class="shopDetail-col shop-after">
                        <div class="row-key row-title">最低配送金额</div>
                        <div class="row-value row-value-after">{{shopDetail.minDeliveryPrice?shopDetail.minDeliveryPrice:''}}</div>
                    </div>
                </router-link>
                <router-link :to="'/drawInvoice?canDrawInvoice='+shopDetail.canDrawInvoice" class="jump">
                    <div class="shopDetail-col shop-after">
                        <div class="row-key row-title">是否允许开票</div>
                        <div class="row-value row-value-after">{{shopDetail.canDrawInvoice?'是':'否'}}</div>
                    </div>
                </router-link>
            </div>
			<div class="shopDetail-row">
				<div class="shopDetail-col shop-after">
					<div class="row-key row-title">营业类型</div>
					<div class="row-value">{{formatShopType(shopDetail.shopType)}}</div>
				</div>
			</div>
			<!-- <div class="shopDetail-row">
				<router-link to="/setDelivery" class="jump">
					<div class="shopDetail-col shop-after">
						<div class="row-key row-title">配送设置</div>
						<div class="row-value row-value-after"></div>
					</div>
				</router-link>
			</div> -->
		</div>
	</div>
</template>
<script>
	import {getShopDetail} from '@/api/api'
	export default {
		name: 'shopDetail',
		data: function(){
			return {
				shopDetail: null
			}
		},
		created: function(){
			this.$indicator.open();
			getShopDetail().then(res => {
				this.shopDetail = res;
				this.$indicator.close();
			})
		},
		methods: {
			formatShopType: function(shopType){
				switch (shopType){
					case 'TAKEOUT':
						return '外卖'
					case 'RESERVE':
						return '预定'
					case 'RESERVE_TAKEOUT':
						return '外卖+预定'
				}
			}
		}
	}
</script>
<style scoped>
	#shopDetail{
		min-height: 100%;
		background-color: #f2f2f2;
	}
	.shopDetail-header{
		width: 100%;
		position: fixed;
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
	.jump:not(:last-child){
		border-bottom: 0.13vw solid #f2f2f2;
	}
	.shopDetail-content{
		padding-top: 11.73vw;
		padding-bottom: 2.66vw;
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
	.row-value-after:after{
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
	.sales .row-value-after:after{
		margin-top: 2.66vw;
	}
	.jump{
		display: block;
		width: 100%;
		height: 100%;
		overflow: hidden;
		color: #4d4d4d;
	}
</style>
