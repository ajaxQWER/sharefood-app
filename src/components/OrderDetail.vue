<template>
	<div id="order">
		<div class="order-header">
			<div class="nav-bar help-navbar">
		  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
		  		<div class="nav-title">订单详情</div>
			</div>
		</div>
		<div class="order-content">
            <mt-loadmore :top-method="loadTop" ref="loadmore">
                <div class="order-lists">
                    <ul class="order-lists" v-if="orderDetail">
                        <li>
                            <div class="order-row">
                                <div class="order-number-row">
                                    <div class="order-number order-number-sub">#{{orderDetail.orderNum.toString().substr(-4)}}</div>
                                    <div class="order-cancelType" v-if="orderDetail.orderCancel.cancelType">{{formatCancelType(orderDetail.orderCancel.cancelType)}}</div>
                                </div>
                                <div class="order-number-row">
                                    <div class="order-number">{{orderDetail.orderNum}}</div>
                                    <div :class="['order-type',orderDetail.orderStatus=='CANCELLATION'?'cancel':'']">{{formatOrderStatus(orderDetail.orderStatus)}}</div>
                                </div>
                            </div>
                            <div class="order-row">
                                <div class="order-detail">
                                    <div class="order-item order-time">下单时间<span>{{moment(orderDetail.addTime).format('YYYY-MM-DD HH:mm:ss')}}</span></div>
                                    <div class="order-item order-money">订单金额<span>￥{{orderDetail.orderPrice}}</span></div>
                                    <div class="order-item">订单备注<span>{{orderDetail.orderContent?orderDetail.orderContent:'无'}}</span></div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <!-- <div class="order-row">
                                <div class="order-item">配送信息</div>
                            </div> -->
                            <div class="order-row">
                                <div class="order-item goods-name">收货地址</div>
                                <div class="goods-number">
                                    <div class="goods-address">{{orderDetail.orderContact.address}}</div>
                                    <div class="phone">{{orderDetail.orderContact.contactName}}({{formatGender(orderDetail.orderContact.gender)}})&emsp;{{orderDetail.orderContact.contactPhone}}</div>
                                </div>
                            </div>
                            <div class="order-row">
                                <div class="order-item goods-name">送达时间</div>
                                <div class="goods-number"><span>尽快送达[{{moment(orderDetail.orderTakeout.deliveryTime).format('HH:mm:ss')}}]</span></div>
                            </div>
                            <div class="order-row" v-if="orderDetail.orderTakeout.carrierDriverName">
                                <div class="order-item goods-name">骑手信息</div>
                                <div class="goods-number">
                                    <span class="carrier-info"><span>{{orderDetail.orderTakeout.carrierDriverName}}{{orderDetail.orderTakeout.carrierDriverphone}}</span><a @click.stop="stopEvent" :href="'tel:'+orderDetail.orderTakeout.carrierDriverphone" class="phone"><img src="../assets/images/phone.png" alt=""></a></span>
                                </div>
                            </div>
                            <div class="order-row" v-if="hasCarrier">
                                <div class="order-item goods-name">骑手位置</div>
                                <el-amap ref="map" vid="amapDemo" class="amap" :zoom="zoom" :center="mapCenter">
                                    <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker.position" :icon="marker.icon"></el-amap-marker>
                                    <div class="my-pos" @click="backMyPosition"><img src="../assets/images/get-position.png" alt=""></div>
                                </el-amap>
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
            </mt-loadmore>
		</div>
		<!-- <div class="add-goods" @click="addGoods">添加商品</div> -->
	</div>
</template>
<script>
	import {getOrderById, getCarrierById, getPositionById} from '@/api/api'
	import shop from '@/assets/images/shop.png'
	import carrier from '@/assets/images/carrier.png'
	import customer from '@/assets/images/customer.png'
	export default {
		name: 'order',
		data: function(){
            var that = this;
			return {
				orderId: '',
				orderDetail: null,
                carrier: null,
                hasCarrier: false,
                store: null,
                map: null,
                orderContactPosition: [],
                buyerPosition: [],
                shopPosition: [],
                carrierPosition: [],
                zoom: 14,
                mapCenter: [0,0],
                markers: [],
                orderStatus: '',
                interval: null
			}
		},
		created: function(){
			var orderId = this.$route.query.orderId;
			this.orderId = orderId;
			if(orderId){
				this.getOrderInfo(orderId);
			}
		},
        watch: {
            orderStatus: function(newVal, oldVal){
                if(newVal == 'WAIT_PICKUP' || newVal == 'PICKUPING' || newVal == 'SHIPPING'){
                    try{
                        this.interval = setInterval(() => {
                            this.hasCarrier = true;
                            this.getCarrierInfo(this.orderId, this.orderStatus)
                        },30000)
                    }catch(err){
                        this.hasCarrier = false;
                        clearInterval(this.interval);
                        this.interval = null
                    }
                }else{
                    this.hasCarrier = false;
                    clearInterval(this.interval);
                    this.interval = null
                }
            }
        },
        destroyed: function(){
            clearInterval(this.interval);
            this.interval = null
        },
		methods: {
            loadTop: function () {
                this.init = true;
                this.canLoad = true;
                this.getOrderInfo(this.orderId);
            },
		    judgeHasCarrier: function (orderStatus) {
                if(orderStatus == 'WAIT_PICKUP' || orderStatus == 'PICKUPING' || orderStatus == 'SHIPPING'){
                    return true;
                }
                return false;
            },
            getOrderInfo: function (orderId) {
                this.$indicator.open();
                getOrderById(orderId).then(res => {
                    this.$refs.loadmore.onTopLoaded();
                    console.log(res)
                    this.orderDetail = res;
                    var orderStatus = res.orderStatus;
                    this.orderStatus = orderStatus;
                    this.$indicator.close();
                    if(this.judgeHasCarrier(orderStatus)){
                        this.hasCarrier = true;
                        getPositionById(orderId).then(data => {
                            this.map = this.$refs.map.$$getInstance();
                            this.buyerPosition = [data.buyer.longitude, data.buyer.latitude];
                            this.shopPosition = [data.shop.longitude, data.shop.latitude];
                            this.carrierPosition = [data.carrier.longitude, data.carrier.latitude];
                            this.mapCenter = this.shopPosition;
                            var shopMarkerObj = {
                                position: [data.shop.longitude, data.shop.latitude],
                                icon: shop
                            };
                            var customerMarkerObj = {
                                position: [data.buyer.longitude, data.buyer.latitude],
                                icon: customer
                            };
                            var carrierMarkerObj = {
                                position: [data.carrier.longitude, data.carrier.latitude],
                                icon: carrier
                            }
                            this.markers = [].concat(shopMarkerObj,customerMarkerObj,carrierMarkerObj);
                            this.$indicator.close();
                        }).catch((err) => {
                            this.hasCarrier = false;
                            console.error(err)
                        })
                    }
                });
            },
		    getCarrierInfo: function (orderId, orderStatus) {
                getCarrierById(orderId).then(res => {
                    console.log(res);
                    var lng = res.longitude;
                    var lat = res.latitude;
                    var center = {};
                    if(orderStatus == 'WAIT_PICKUP' || orderStatus == 'PICKUPING'){
                        center = {
                            lng: (this.shopPosition[0] + lng)/2,
                            lat: (this.shopPosition[1] + lat)/2
                        };
                    }

                    if(orderStatus == 'SHIPPING'){
                        center = {
                            lng: (this.buyerPosition[0] + lng)/2,
                            lat: (this.buyerPosition[1] + lat)/2
                        };
                    }

                    this.mapCenter = [center.lng, center.lat];
                    this.markers[2] = {
                        position: [lng, lat],
                        icon: carrier,
                    };

                }).catch(() => {
                    this.hasCarrier = false;
                })
            },
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
                    case 'MERCHANT_CONFIRM_RECEIPT':
                        return '已接单';
                    case 'WAIT_PICKUP':
                        return '待取货';
                    case 'PICKUPING':
                        return '取货中';
                    case 'DELIVERED':
                        return '已送达';
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
            formatCancelType: function(type){
                switch(type){
                    case 'USER':
                        return '用户取消';
                    case 'SHOP':
                        return '商家取消';
                    case 'WAIT_PAY_TIMEOUT':
                        return '支付超时';
                    case 'RECEIVING_TIMEOUT':
                        return '接单超时';
                    case 'DELIVERY_REJECT':
                        return '配送拒绝';
                    default:
                        return '-'
                }
            },
            backMyPosition: function(){
                this.map.setZoomAndCenter(14, this.shopPosition);
            }
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
        z-index: 999;
	}
	.order-content{
	    box-sizing: border-box;
		height: 100vh;
		/*overflow: hidden;*/
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
		color: #ff0000;
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
    .amap{
        clear: both;
        width: 100%;
        height: 80vw;
        padding-top: 2.66vw;
        position: relative;
    }
    .my-pos{
        width: 10vw;
        height: 10vw;
        /*background-color: red;*/
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 999;
    }
    .my-pos img{
        width: 100%;
        height: 100%;
    }
    .order-number-row{
        overflow: hidden;
        zoom: 1;
    }

    .order-cancelType{
        float: right;
        font-size: 3.73vw;
        color: #ff0000;
    }
</style>
