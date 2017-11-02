<template>
	<div id="order">
		<div class="order-header">
			<div class="nav-bar help-navbar">
		  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
		  		<div class="nav-title">订单列表</div>
		  		<div class="order-nav-right">
		  			<div class="search-bar"><img src="../assets/images/search.png" alt=""></div>
		  		</div>
			</div>
			<div class="order-nav flex">
				<div class="order-nav-item flex-1 current-order-item">全部</div>
				<div class="order-nav-item flex-1">新订单</div>
				<div class="order-nav-item flex-1">配送中</div>
				<div class="order-nav-item flex-1">已完成</div>
				<div class="order-nav-item flex-1">已取消</div>
			</div>
		</div>
		<div class="order-content">
			<div class="order-lists">
				<mt-loadmore :bottom-method="loadBottom" ref="loadmore":bottom-all-loaded="allLoaded" bottomPullText="加载更多" bottomDropText="加载更多">
				<ul class="order-lists">
					<li @click="jump">
						<div class="order-row">
							<div class="order-number">20170927112536195</div>
							<div class="order-type">新订单</div>
						</div>
						<div class="order-row order-owner">
							<div class="order-item">薛将军先生<span>13679085354</span></div>
							<div class="order-address">锦江区东大街1号</div>
							<a @click.stop="stopEvent" href="tel:13679085354" class="phone"><img src="../assets/images/phone.png" alt=""></a>
						</div>
						<div class="order-row">
							<div class="order-detail">
								<div class="order-item order-time">下单时间<span>2017-09-27 11:25:36</span></div>
								<div class="order-item order-money">订单金额<span>￥235.00</span></div>
							</div>
							<div class="operate-btn">
								<button class="btn">取消订单</button>
								<button class="btn deal-btn">接单</button>
							</div>
						</div>
					</li>
					<li>
						<div class="order-row">
							<div class="order-number">20170927112536195</div>
							<div class="order-type">配送中</div>
						</div>
						<div class="order-row order-owner">
							<div class="order-item">薛将军先生<span>13679085354</span></div>
							<div class="order-address">锦江区东大街1号</div>
							<a href="tel:13679085354" class="phone"><img src="../assets/images/phone.png" alt=""></a>
						</div>
						<div class="order-row">
							<div class="order-detail">
								<div class="order-item order-time">下单时间<span>2017-09-27 11:25:36</span></div>
								<div class="order-item order-money">订单金额<span>￥235.00</span></div>
							</div>
							<div class="operate-btn hide">
								<button class="btn">取消订单</button>
								<button class="btn deal-btn">接单</button>
							</div>
						</div>
					</li>
					<li>
						<div class="order-row">
							<div class="order-number">20170927112536195</div>
							<div class="order-type">已完成</div>
						</div>
						<div class="order-row order-owner">
							<div class="order-item">薛将军先生<span>13679085354</span></div>
							<div class="order-address">锦江区东大街1号</div>
							<a href="tel:13679085354" class="phone"><img src="../assets/images/phone.png" alt=""></a>
						</div>
						<div class="order-row">
							<div class="order-detail">
								<div class="order-item order-time">下单时间<span>2017-09-27 11:25:36</span></div>
								<div class="order-item order-money">订单金额<span>￥235.00</span></div>
							</div>
							<div class="operate-btn hide">
								<button class="btn">取消订单</button>
								<button class="btn deal-btn">接单</button>
							</div>
						</div>
					</li>
					<li>
						<div class="order-row">
							<div class="order-number">20170927112536195</div>
							<div class="order-type cancel">已取消</div>
						</div>
						<div class="order-row order-owner">
							<div class="order-item">薛将军先生<span>13679085354</span></div>
							<div class="order-address">锦江区东大街1号</div>
							<a href="tel:13679085354" class="phone"><img src="../assets/images/phone.png" alt=""></a>
						</div>
						<div class="order-row">
							<div class="order-detail">
								<div class="order-item order-time">下单时间<span>2017-09-27 11:25:36</span></div>
								<div class="order-item order-money">订单金额<span>￥235.00</span></div>
							</div>
							<div class="operate-btn hide">
								<button class="btn">取消订单</button>
								<button class="btn deal-btn">接单</button>
							</div>
						</div>
					</li>
				</ul>
				</mt-loadmore>
			</div>
		</div>
		<div class="add-goods">添加商品</div>
	</div>
</template>
<script>
	export default {
		name: 'order',
		data: function(){
			return {
				allLoaded: false
			}
		},
		methods: {
			loadBottom: function(){
				this.allLoaded = true;
				this.$toast('上拉加载更多')
				this.allLoaded = false;
			},
			jump: function(){
				alert(1)
			},
			stopEvent: function(){
				return;
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
	    box-sizing: border-box;
		height: 100vh;
		overflow: hidden;
		zoom: 1;
		padding: 25.06vw 0 15.72vw;
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
		width: 18.66vw;
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
</style>