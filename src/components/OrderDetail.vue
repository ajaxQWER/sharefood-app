<template>
	<div id="order">
		<div class="order-header">
			<div class="nav-bar help-navbar">
		  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
		  		<div class="nav-title">订单详情</div>
			</div>
		</div>
		<div class="order-content">
			<div class="order-lists">
				<ul class="order-lists" v-if="orderDetail">
					<li>
						<div class="order-row">
							<div class="order-number-sub">#{{orderDetail.orderNum.toString().substr(-4)}}</div>
							<div class="order-number">{{orderDetail.orderNum}}</div>
							<div :class="['order-type',orderDetail.orderStatus=='CANCELLATION'?'cancel':'']">{{formatOrderStatus(orderDetail.orderStatus)}}</div>
						</div>
						<!-- <div class="order-row order-owner">
							<div class="order-item">薛将军先生<span>13679085354</span></div>
							<div class="order-address">锦江区东大街1号</div>
							<a href="tel:13679085354" class="phone"><img src="../assets/images/phone.png" alt=""></a>
						</div> -->
						<div class="order-row">
							<div class="order-detail">
								<div class="order-item order-time">下单时间<span>{{moment(orderDetail.addTime).format('YYYY-MM-DD HH:mm:ss')}}</span></div>
								<div class="order-item order-money">订单金额<span>￥{{orderDetail.orderPrice}}</span></div>
							</div>
						</div>
					</li>
					<li>
						<div class="order-row">
							<div class="order-item">配送信息</div>
						</div>
						<div class="order-row">
							<div class="order-item goods-name">收货地址</div>
							<div class="goods-number">
								<div class="goods-address">{{orderDetail.orderContact.address}}</div>
								<div class="phone">{{orderDetail.orderContact.contactName}}({{formatGender(orderDetail.orderContact.gender)}})&emsp;{{orderDetail.orderContact.contactPhone}}</div>
							</div>
						</div>
                        <div class="order-row" v-if="orderDetail.orderTakeout.carrierDriverName">
                            <div class="order-item goods-name">骑手信息</div>
                            <div class="goods-number">
                                <span class="carrier-info"><span>{{orderDetail.orderTakeout.carrierDriverName}}{{orderDetail.orderTakeout.carrierDriverphone}}</span><a @click.stop="stopEvent" :href="'tel:'+orderDetail.orderTakeout.carrierDriverphone" class="phone"><img src="../assets/images/phone.png" alt=""></a></span>
                            </div>
                        </div>
						<div class="order-row">
							<div class="order-item goods-name">送达时间</div>
							<div class="goods-number"><span>尽快送达[{{moment(orderDetail.orderTakeout.deliveryTime).format('HH:mm:ss')}}]</span></div>
						</div>
					</li>
					<li>
						<div class="order-row">
							<div class="order-item">商品列表</div>
						</div>
						<div class="order-row" v-for="(item,index) in orderDetail.orderGoods" :key="index">
							<div class="order-item goods-name">{{item.goodsName}}</div>
							<div class="goods-number"><span>x{{item.goodsCount}}</span><span>￥{{item.amount}}</span></div>
						</div>
						<div class="order-row">
							<div class="order-item goods-name">饭盒费</div>
							<div class="goods-number"><span>￥{{orderDetail.orderTakeout.mealFee}}</span></div>
						</div>
						<div class="order-row">
							<div class="order-item goods-name">配送费</div>
							<div class="goods-number"><span>￥{{orderDetail.orderTakeout.shippingFee}}</span></div>
						</div>
						<div class="order-row" v-for="(item,index) in orderDetail.orderActivitys" :key="index">
							<div class="order-item goods-name">{{item.activityContent}}</div>
							<div class="goods-number"><span class="discount">￥-{{item.activityReduced}}</span></div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!-- <div class="add-goods" @click="addGoods">添加商品</div> -->
	</div>
</template>
<script>
	import {getOrderById} from '@/api/api'
	export default {
		name: 'order',
		data: function(){
			return {
				orderId: '',
				orderDetail: null,
			}
		},
		created: function(){
			var orderId = this.$route.query.orderId;
			this.orderId = orderId;
			if(orderId){
				this.$indicator.open();
				getOrderById(orderId).then(res => {
					console.log(res)
					this.orderDetail = res;
					this.$indicator.close();
				});
			}
		},
		methods: {
			formatOrderStatus: function(status){
	            switch(status){
	                case 'PAYED':
	                    return '新订单';
	                case 'SHIPPING':
	                    return '配送中';
	                case 'CANCELLATION':
	                    return '已取消';
	                case 'TRANSACT_FINISHED':
	                    return '已完成';
	                default:
	                    break;
	            }
	        },
			formatOrderType: function(type){
	            switch(type){
	                case 'TAKEOUT':
	                    return '外卖订单';
	                case 'RESERVE':
	                    return '预定订单';
	                default:
	                    break;
	            }
	        },
			formatGender: function(gender){
				switch (gender) {
					case 'MALE':
						return '先生';
					case 'FEMALE':
						return '女士';
				}
			},
            stopEvent: function(){
                return;
            },
		}
	}
</script>
<style scoped>
	#order{
		min-height: 100%;
		background-color: #f2f2f2;
	}
	.order-header{
		width: 100%;
		position: fixed;
	}
	.order-content{
	    box-sizing: border-box;
		height: 100vh;
		overflow: hidden;
		zoom: 1;
		padding-top: 13.06vw;
	}
	.order-lists{
		box-sizing: border-box;
		height: 100%;
		overflow: scroll;
	}
	.order-lists ul{
		margin: 0;
		padding: 0;
		list-style: none;
		padding: 0 2.66vw;
	}
	.order-lists li{
		background-color: #fff;
		border-radius: 5px;
		-moz-box-shadow: .5px .5px 1px 0px #beeccc;
		-webkit-box-shadow: .5px .5px 1px 0px #beeccc;
		box-shadow: .5px .5px 1px 0px #beeccc;
		margin-bottom: 4vw;
	}
	.order-row{
		padding: 2.66vw;
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
	.order-money span{
		color: #0bb745;
	}
	.order-number{
		float: left;
		font-size: 3.73vw;
		color: #4c4c4c;
	}

	.order-type{
		float: right;
		font-size: 3.73vw;
		color: #0bb745;
	}
	.order-type.cancel{
		color: #808080;
	}
	.order-owner{
		position: relative;
	}
	.order-owner span{
		margin-left: 2.66vw;
	}
	.order-address{
		font-size: 3.46vw;
		color: #808080;
	}
	.order-detail{
		display: block;
		position: relative;
		text-decoration: none;
	}
	/* .order-detail:after{
		content: '';
		display: inline-block;
		position: absolute;
		width: 2vw;
		height: 3.73vw;
		background: url(../assets/images/list-more.png) no-repeat;
		background-size: contain;
		right: 2.66vw;
		top: 50%;
		margin-top: -1.86vw;
	} */
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
	.goods-address{
		width: 58vw;
		color: #808080;
	}
	.phone{
		font-size: 3.73vw;
		color: #808080;
		/* text-align: right; */
	}
    .carrier-info{
        display: inline-block;
        overflow: hidden;
        text-align: center;
    }
    .carrier-info span{
        display: inline-block;
        margin-left: 0;
        float: left;
    }
    a.phone{
        display: inline-block;
        width: 5.06vw;
        height: 5.06vw;
        margin-left: 1.33vw;
    }
    a.phone img{
        width: 100%;
        height: 100%;
    }
    
	.order-number-sub{
		font-size: 5vw;
		font-weight: bold;
		color: #333;
	}
</style>
