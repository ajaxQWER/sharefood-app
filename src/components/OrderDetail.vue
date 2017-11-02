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
				<ul class="order-lists">
					<li>
						<div class="order-row">
							<div class="order-number">20170927112536195</div>
							<div class="order-type">新订单</div>
						</div>
						<!-- <div class="order-row order-owner">
							<div class="order-item">薛将军先生<span>13679085354</span></div>
							<div class="order-address">锦江区东大街1号</div>
							<a href="tel:13679085354" class="phone"><img src="../assets/images/phone.png" alt=""></a>
						</div> -->
						<div class="order-row">
							<div class="order-detail">
								<div class="order-item order-time">下单时间<span>2017-09-27 11:25:36</span></div>
								<div class="order-item order-money">订单金额<span>￥235.00</span></div>
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
								<div class="goods-address">通威国际中心天府大道中段588号</div>
								<div class="goods-contact">宁肖嘉(女士)<span class="phone">1398000000</span></div>
							</div>
						</div>
						<div class="order-row">
							<div class="order-item goods-name">送达时间</div>
							<div class="goods-number"><span>尽快送达[17:30]</span></div>
						</div>
					</li>
					<li>
						<div class="order-row">
							<div class="order-item">商品列表</div>
						</div>
						<div class="order-row">
							<div class="order-item goods-name">湘西霸王蛙</div>
							<div class="goods-number"><span>x1</span><span>￥42</span></div>
						</div>
						<div class="order-row">
							<div class="order-item goods-name">泡椒酸汤肥牛</div>
							<div class="goods-number"><span>x2</span><span>￥42</span></div>
						</div>
						<div class="order-row">
							<div class="order-item goods-name">浓香番茄鱼片</div>
							<div class="goods-number"><span>x2</span><span>￥42</span></div>
						</div>
						<div class="order-row">
							<div class="order-item goods-name">干锅花菜</div>
							<div class="goods-number"><span>x3</span><span>￥42</span></div>
						</div>
						<div class="order-row">
							<div class="order-item goods-name">饭盒费</div>
							<div class="goods-number"><span>￥5</span></div>
						</div>
						<div class="order-row">
							<div class="order-item goods-name">配送费</div>
							<div class="goods-number"><span>￥5</span></div>
						</div>
						<div class="order-row">
							<div class="order-item goods-name">【8.8元清凉一夏】</div>
							<div class="goods-number"><span class="discount">￥-13.00</span></div>
						</div>
					</li>
				</ul>
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
		padding: 13.06vw 0 14.39vw;
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
</style>