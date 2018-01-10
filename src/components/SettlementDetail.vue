<template>
	<div id="settlementDetail">
		<div class="order-header">
			<div class="nav-bar help-navbar">
		  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
		  		<div class="nav-title">明细详情</div>
			</div>
		</div>
		<div class="order-content" v-if="settlementDetail">
            <ul class="order-lists">
                <li>
                    <div class="top-wrap">
                        <div class="top-row">流水号：{{settlementDetail.serialNumber}}</div>
                        <div class="top-row">订单号：{{settlementDetail.orderNum}}</div>
                        <div class="top-row">结算时间：{{moment(settlementDetail.recordTime).format('YYYY-MM-DD HH:mm')}}</div>
                    </div>
                </li>
                <li>
                    <div class="order-row">
                        <div class="order-item">商品列表</div>
                    </div>
                    <div class="order-row" v-for="(item,index) in settlementDetail.order.orderGoods" :key="index">
                        <div class="order-item goods-name">{{item.goodsName}}</div>
                        <div class="goods-number"><span>x{{item.goodsCount}}</span><span>￥{{item.amount}}</span></div>
                    </div>
                    <div class="order-row">
                        <div class="order-item goods-name">餐盒费</div>
                        <div class="goods-number"><span>￥{{settlementDetail.order.orderTakeout.mealFee}}</span></div>
                    </div>
                    <div class="order-row">
                        <div class="order-item goods-name">配送费</div>
                        <div class="goods-number"><span>￥{{settlementDetail.distributionFee}}</span></div>
                    </div>
                    <div class="order-row" v-for="(item,index) in settlementDetail.order.orderActivitys" :key="index">
                        <div class="order-item goods-name">{{item.activityContent}}</div>
                        <div class="goods-number"><span class="discount">￥-{{item.activityReduced}}</span></div>
                    </div>
                </li>
                <li>
                    <div class="order-row">
                        <div class="order-item goods-name">订单总额</div>
                        <div class="goods-number"><span class="color-green">￥{{settlementDetail.orderAmount}}</span></div>
                    </div>
                    <div class="order-row">
                        <div class="order-item goods-name">扣除运费后的总价</div>
                        <div class="goods-number"><span>￥{{settlementDetail.orderAmount-settlementDetail.distributionFee}}</span></div>
                    </div>
                    <div class="order-row">
                        <div class="order-item goods-name">平台扣点</div>
                        <div class="goods-number"><span class="discount">-￥{{settlementDetail.platformAmount}}</span></div>
                    </div>
                </li>
                <li>
                    <div class="order-row">
                        <div class="order-item goods-name">商家实得</div>
                        <div class="goods-number"><span class="color-green">￥{{settlementDetail.sellerAmount}}</span></div>
                    </div>
                </li>
            </ul>
		</div>
	</div>
</template>
<script>
	import {getSettlementByOrderId} from '@/api/api'
	export default {
		data: function(){
			return {
				orderId: null,
				settlementDetail: null,
			}
		},
		created: function(){
			var orderId = this.$route.query.orderId;
			this.orderId = orderId;
			if(orderId){
				this.getSettlementDetail(orderId);
			}
		},
		methods: {
            getSettlementDetail: function(){
                this.$indicator.open();
                getSettlementByOrderId(this.orderId).then(res =>{
                    this.$indicator.close();
                    this.settlementDetail = res;
                })
            }
		}
	}
</script>
<style scoped>
	#settlementDetail{
		background-color: #f2f2f2;
	}
    .order-header{
        width: 100%;
        position: fixed;
        z-index: 99;
    }
	.order-content{
        position: relative;
        box-sizing: border-box;
        height: 100vh;
        padding-top: 11.73vw;
        overflow: hidden;
	}
	.order-lists{
		box-sizing: border-box;
		height: 100%;
		overflow: scroll;
        padding: 0;
        margin: 0;
        list-style: none;
	}
    .top-wrap{
        padding: 1.33vw 0;
    }
    .top-row{
        font-size: 4vw;
        color: #999;
        line-height: 1.5;
    }
	.order-lists li{
        padding: 0 2.66vw;
		background-color: #fff;
		margin-bottom: 4vw;
	}
	.order-row{
		padding: 2.66vw 0;
		overflow: hidden;
		zoom: 1;
	}
	.order-row:not(:first-child){
		border-top: 1px solid #dcdcdc;
	}
	.order-item{
		color: #4c4c4c;
		font-size: 4.26vw;
	}
	.order-item span{
		font-size: 3.46vw;
		color: #808080;
		margin-left: 6.66vw;
	}
	.goods-name{
		float: left;
		display: inline-block;
	}
	.goods-number{
		float: right;
		display: inline-block;
	}
	.goods-number span{
		margin-left: 12vw;
		font-size: 3.73vw;
		color: #808080;
		text-align: right;
	}
	.goods-number .discount{
		color: #ff0000;
	}
    .goods-number .color-green{
        color: #0bb745;
    }
</style>
