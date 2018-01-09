<template>
	<div id="orderList">
		<div class="nav-bar help-navbar order-header">
	  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
	  		<div class="nav-title">结算明细</div>
		</div>
		<div class="wrap-content">
			<ul class="order-lists" v-if="!isEmpty">
				<li class="order-item" v-for="n in 10">
					<router-link to="settlementDetail" class="link">
						<div class="order-num">订单号：2018010810222890</div>
						<div class="order-content">
							<div class="order-name-content">
								<div class="order-name">鸭血粉丝汤 等2件商品</div>
								<div class="order-time">2018-01-08 10:20</div>
							</div>
							<div class="order-price">￥33.2</div>
						</div>
					</router-link>
				</li>
			</ul>
			<div v-else class="empty">
				<img src="../assets/images/empty-img.png" alt="">
			</div>
		</div>
	</div>
</template>
<script>
	// import {getGoodsCategoryLists,deleteGoodsCategoryById,addGoodsCategory} from '@/api/api'
	export default {
		data: function(){
			return {
				orderLists: null,
				isEmpty: false
			}
		},
		created: function(){
			// this.getGoodsCategoryList()
		},
		methods: {
			getGoodsCategoryList: function(){
				this.$indicator.open();
				getGoodsCategoryLists({params:{pageSize:99999999}}).then(res=>{
					console.log(res)
					if(res.count == 0){
						this.isEmpty = true
					}else{
						this.isEmpty = false
					}orderLists
					this.orderLists = res.list;
					this.$indicator.close();
				})
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
	padding: 0;
	margin: 0;
	list-style: none;
	background-color: #fff;
	overflow: scroll;
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
	line-height: 8.66vw;
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
	width: 80vw;
	box-sizing: border-box;
	color: #4c4c4c;
	font-size: 4vw;
	float: left;
}
.order-price{
	width: 14.68vw;
	float: right;
	text-align: center;
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
</style>
