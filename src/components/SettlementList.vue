<template>
	<div id="orderList">
		<div class="nav-bar help-navbar order-header">
	  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
	  		<div class="nav-title">结算明细</div>
		</div>
		<div class="wrap-content">
			<div class="order-lists" v-if="!isEmpty">
				<ul>
					<li class="order-item" v-for="(item, index) in orderLists">
						<router-link :to="'/settlementDetail?orderId=' + item.orderId" class="link">
							<div class="order-num">订单号：{{item.order.orderNum}}</div>
							<div class="order-content">
								<div class="order-name-content">
									<div class="order-name">{{item.order.orderName}}</div>
									<div class="order-time">{{moment(item.recordTime).format('YYYY-MM-DD HH:mm')}}</div>
								</div>
								<div class="order-price">￥{{item.sellerAmount}}</div>
							</div>
						</router-link>
					</li>
				</ul>
				<div v-show="canLoad" class="loadmore" @click="loadBottom">点击加载</div>
			</div>
			<div v-else class="empty">
				<img src="../assets/images/empty-img.png" alt="">
			</div>
		</div>
	</div>
</template>
<script>
	import {getSettlementLists} from '@/api/api'
	export default {
		data: function(){
			return {
				orderLists: null,
				init: true,
	            allLoaded: false,
	            current: 1,
	            pageId: 1,
	            counts: 0,
	            canLoad: false,
	            isEmpty: false
			}
		},
		created: function(){
			this.getSettlementList()
		},
		methods: {
			getSettlementList: function(){
				this.$indicator.open();
				getSettlementLists({pageSize: 10, pageId: this.pageId}).then(res=>{
					console.log(res)
					this.$indicator.close();
					this.counts = res.count;

					if (this.init) {
					    this.orderLists = res.list;
					} else {
					    this.orderLists = [].concat.apply(this.orderLists, res.list);
					}

					if (res.count == 0) {
					    this.allLoaded = true;
					    this.isEmpty = true
					} else {
					    this.canLoad = true;
					    this.isEmpty = false
					}

					if (Math.ceil(this.counts / 10) == this.pageId) {
					    this.allLoaded = true;
					    this.canLoad = false;
					    return;
					}
				})
			},
			loadBottom: function() {
	            this.allLoaded = false;
	            this.pageId += 1;
	            this.init = false;
	            this.getSettlementList()
	        }
		}
	}
</script>
<style scoped>
#orderList{
	background-color: #f2f2f2;
}
.order-header{
    width: 100%;
    position: fixed;
    z-index: 99;
}
.wrap-content{
    position: relative;
  	box-sizing: border-box;
	height: 100vh;
    padding-top: 11.73vw;
	overflow: hidden;
}
.order-lists{
	box-sizing: border-box;
	height: 100%;
	list-style: none;
	overflow: scroll;
}
.order-lists ul{
	list-style: none;
	margin: 0;
	padding: 0;
	background-color: #fff;
}
.order-item{
	overflow: hidden;
	zoom: 1;
	padding: 1.33vw 2.66vw;
}
.order-item:not(:last-child){
	border-bottom: 2.66vw solid #f2f2f2;
}
.order-num{
	color: #999;
	line-height: 2.6;
	border-bottom: 1px solid #f7f7f7;
	font-size: 3.46vw;
}
.order-content{
	overflow: hidden;
	zoom: 1;
	background-color: #fff;
	padding: 1.33vw 0;
}
.order-name-content{
	width: 68vw;
	box-sizing: border-box;
	color: #4c4c4c;
	font-size: 4vw;
	float: left;
}
.order-price{
	width: 25vw;
	float: right;
	text-align: right;
}
.order-time{
	font-size: 2.93vw;
	color: #999;
}
.link{
	display: block;
	text-decoration: none;
	color: #000;
}
.loadmore {
    text-align: center;
    padding: 2.66vw;
}
</style>
