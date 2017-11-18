<template>
	<div id="order">
		<div class="order-header">
			<div class="nav-bar help-navbar">
		  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
		  		<div class="nav-title">订单列表</div>
		  		<!-- <div class="order-nav-right">
		  			<div class="search-bar"><img src="../assets/images/search.png" alt=""></div>
		  		</div> -->
			</div>
			<div class="order-nav flex">
				<div v-for="(item,index) in navObj" :key="index" :class="['order-nav-item', 'flex-1',(current==item.index)?'current-order-item':'']" @click="toggle(item.index,item.orderStatus)">{{item.name}}</div>
			</div>
		</div>
		<div class="order-content">
			<div v-if="!isEmpty">
				<mt-loadmore :top-method="loadTop" ref="loadmore">
				<div class="order-lists" v-if="orderList.length">
		    		<ul>
		    			<li v-for="(item,index) in orderList" :key="index">
		    				<router-link :to="'/orderDetail?orderId='+item.orderId" class="link">
		    				<div class="order-row">
		    					<div class="order-number">{{item.orderNum}}</div>
		    					<div :class="['order-type',item.orderStatus=='CANCELLATION'?'cancel':'']">{{formatOrderStatus(item.orderStatus)}}</div>
		    				</div>
		    				<div class="order-row order-owner">
		    					<div class="order-item">{{item.orderContact.contactName}}{{formatGender(item.orderContact.gender)}}<span>{{item.orderContact.contactPhone}}</span></div>
		    					<div class="order-address">{{item.orderContact.address}}</div>
		    					<a @click.stop="stopEvent" :href="'tel:'+item.orderContact.contactPhone" class="phone"><img src="../assets/images/phone.png" alt=""></a>
		    				</div>
		    				<div class="order-row">
		    					<div class="order-detail">
		    						<div class="order-item order-time">下单时间<span>{{moment(item.addTime).format('YYYY-MM-DD HH:mm:ss')}}</span></div>
		    						<div class="order-item order-money">订单金额<span>￥{{item.orderPrice}}</span></div>
		    						<div class="order-item">订单类型<span>{{formatOrderType(item.orderType)}}</span></div>
		    					</div>
		    					<div v-if="item.orderType=='TAKEOUT'" class="operate-btn">
		    						<div v-if="item.orderStatus=='PAYED'">
			    						<button @click.prevent="cancelOrder(item.orderId)" class="btn">取消订单</button>
			    						<button @click.prevent="acceptOrder(item.orderId,item.orderType)" class="btn deal-btn">接单</button>
		    						</div>
		    						<div v-if="item.orderStatus=='MERCHANT_CONFIRM_RECEIPT'">
		    							<button @click.prevent="cancelOrder(item.orderId)" class="btn">取消订单</button>
		    						</div>
		    						<div v-if="item.orderStatus=='WAIT_PICKUP'">
		    							<button @click.prevent="cancelOrder(item.orderId)" class="btn">取消订单</button>
		    						</div>
		    						<div v-if="item.orderStatus=='PICKUPING'">
		    							<button @click.prevent="cancelOrder(item.orderId)" class="btn">取消订单</button>
		    						</div>
		    					</div>
		    					<div v-else class="operate-btn">
		    						<div v-if="item.orderStatus=='PAYED'">
			    						<button @click.prevent="cancelOrder(item.orderId)" class="btn">取消订单</button>
			    						<button @click.prevent="acceptOrder(item.orderId,item.orderType)" class="btn deal-btn">接单</button>
		    						</div>
		    						<div v-if="item.orderStatus=='MERCHANT_CONFIRM_RECEIPT'">
			    						<button @click.prevent="finishOrder(item.orderId)" class="btn deal-btn">完成</button>
		    						</div>
		    					</div>
		    				</div>
		    				</router-link>
		    			</li>
		    		</ul>
		    		<div v-show="canLoad" class="loadmore" @click="loadBottom">点击加载</div>
	    		</div>
	    		</mt-loadmore>
			</div>
			<div v-else class="empty">
				<img src="../assets/images/empty-img.png" alt="">
			</div>
		</div>
		<!-- <div class="add-goods" @click="addGoods">添加商品</div> -->
	</div>
</template>
<script>
	import {getOrderList,cancelOrderById,finishOrderById,acceptOrderById} from '@/api/api'
	export default {
		name: 'order',
		data: function(){
			return {
				navObj: [{
					name: '全部',
					orderStatus: '',
					index: 1
				},{
					name: '新订单',
					orderStatus: 'PAYED',
					index: 2
				},{
					name: '配送中',
					orderStatus: 'SHIPPING',
					index: 3
				},{
					name: '已完成',
					orderStatus: 'TRANSACT_FINISHED',
					index: 4
				},{
					name: '已取消',
					orderStatus: 'CANCELLATION',
					index: 5
				}],
				init: true,
				allLoaded: false,
				active: 'order_1',
				current: 1,
				pageId: 1,
				counts: 0,
				orderStatus: '',
				orderList: [],
				canLoad: false,
				isEmpty: false
			}	
		},
		created: function(){
			this.getOrders({pageId: this.pageId, orderStatus: this.orderStatus})
		},
		methods: {
			loadTop() {
				this.init = true;
				this.canLoad = true;
				this.isEmpty = false;
				this.pageId = 1;
				this.getOrders({pageId: this.pageId, orderStatus: this.orderStatus})
			},
			getOrders: function(order){
				this.$indicator.open();
				getOrderList({params: {pageSize: 10, pageId: order.pageId, orderStatus: order.orderStatus}}).then(res => {
					console.log(res.list)
					this.$refs.loadmore.onTopLoaded();
					if(this.init){
						this.orderList = res.list
					}else{
						this.orderList = [].concat.apply(this.orderList, res.list)
					}
					this.counts = res.count;
					this.$indicator.close();
					if(res.count == 0){
						this.allLoaded = true;
						this.isEmpty = true;
					}else{
						this.canLoad = true;
						this.isEmpty = false;						
					}
					if(Math.ceil(this.counts / 10) == this.pageId){
						this.allLoaded = true;
						this.canLoad = false;
						return;
					}
				})
			},
			loadBottom: function(){
				this.allLoaded = false;
				this.pageId += 1;
				this.init = false;
				this.getOrders({pageId: this.pageId, orderStatus: this.orderStatus})
			},
			stopEvent: function(){
				return;
			},
			toggle: function(index, orderStatus){
				this.current = index;
				this.active = 'order_' + index;
				this.orderList = [];
				this.pageId = 1;
				this.allLoaded = false;
				this.init = true;
				this.orderStatus = orderStatus;
				this.canLoad = false;
				this.isEmpty = false;
				this.getOrders({pageId: this.pageId,orderStatus: this.orderStatus})
			},
			formatGender: function(gender){
				switch (gender) {
					case 'MALE':
						return '先生';
					case 'FEMALE':
						return '女士';
				}
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
	                case 'WAIT_PICKUP ':
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
	        cancelOrder: function(orderId){
	        	this.$messagebox.confirm('确定取消接单?').then(action => {
	        		this.$indicator.open();
	        		cancelOrderById(orderId).then(() => {
	        			this.$toast({message:'操作成功',duration: 1000})
        				this.$indicator.close();
        				this.getOrders({pageId: this.pageId,orderStatus: this.orderStatus})
	        		})
	        	}).catch(()=>{});
	        },
	        acceptOrder: function(orderId, orderType){
	        	this.$messagebox.confirm('确定接单?').then(action => {
	        		this.$indicator.open();
        			acceptOrderById(orderId).then(() => {
        				this.$toast({message:'操作成功',duration: 1000})
        				this.$indicator.close();
        				this.getOrders({pageId: this.pageId,orderStatus: this.orderStatus})
        			})
	        	}).catch(()=>{});
	        },
	        finishOrder: function(orderId){
	        	this.$messagebox.confirm('确定完成预定订单?').then(action => {
	        		this.$indicator.open();
        			finishOrderById(orderId).then(() => {
        				this.$toast({message:'操作成功',duration: 1000})
        				this.$indicator.close();
        				this.getOrders({pageId: this.pageId,orderStatus: this.orderStatus})
        			})
	        	}).catch(()=>{});
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
		z-index: 99;
	}
	.order-nav-right{
		position: absolute;
		overflow: hidden;
		zoom: 1;
		right: 0;
	}
	.order-nav-right img{
		height: 100%;
	}
	.search-bar{
		float: left;
		height: 5.06vw;
		margin: 3.34vw 2.66vw;
	}
	.order-nav{
		width: 100%;
		overflow: hidden;
		zoom: 1;
		background-color: #f2f2f2;
	}
	.order-nav-item{
		height: 10.66vw;
		line-height: 10.66vw;
		text-align: center;
		border-bottom: 2px solid #dcdcdc;
		font-size: 3.73vw;
	}
	.current-order-item{
		color: #0bb745;
		border-bottom: 2px solid #0bb745;
	}
	.order-content{
		position: relative;
		/* top: 22.39vw; */
	    box-sizing: border-box;
		/* height: 100vh; */
		/* overflow: hidden; */
		/* zoom: 1; */
		/* padding-bottom: 13.06vw; */
		padding-top: 22.39vw;
	}
	.order-lists{
		box-sizing: border-box;
		height: 100%;
		overflow: auto;
	}
	.order-lists ul{
		margin: 0;
		padding: 1.33vw 2.66vw;
		list-style: none;
	}
	.order-lists li{
		padding: 2vw 0;
		background-color: #fff;
		border-radius: 5px;
		-moz-box-shadow: .5px .5px 1px 0px #beeccc;
		-webkit-box-shadow: .5px .5px 1px 0px #beeccc;
		box-shadow: .5px .5px 1px 0px #beeccc;
	}
	.order-lists li:not(:first-child){
		margin-top: 4vw;
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
	.phone{
		display: inline-block;
		width: 5.06vw;
		height: 5.06vw;
		position: absolute;
		right: 2.66vw;
		top: 50%;
		margin-top: -2.53vw;
	}
	.phone img{
		width: 100%;
		height: 100%;
	}
	.order-owner span{
		margin-left: 2.66vw;
	}
	.order-address{
		width: 81vw;
		font-size: 3.46vw;
		color: #808080;
	}
	.order-detail{
		display: block;
		position: relative;
		text-decoration: none;
	}
	.order-detail:after{
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
	}
	.operate-btn{
		margin-top: 2.66vw;
		text-align: right;
	}
	.btn{
		width: 20vw;
		height: 5.33vw;
		line-height: 5.33vw;
		text-align: center;
		font-size: 3.46vw;
		border-radius: 5px;
		border: 1px solid #808080;
		outline: none;
		background-color: #fff;
		color: #808080;
		margin: 0 0.66vw;
	}
	.deal-btn{
		background-color: #0bb745;
		border: 1px solid #0bb745;
		color: #fff;
	}
	.loadmore{
		text-align: center;
		padding: 2.66vw;
	}
	.link{
		text-decoration: none;
	}
</style>