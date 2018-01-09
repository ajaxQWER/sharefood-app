<template>
	<div id="shopList">
		<div class="nav-bar help-navbar order-header">
	  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
	  		<div class="nav-title">门店选择</div>
		</div>
		<div class="wrap-content">
			<ul class="shop-lists">
				<li :class="['shop-item',n==currentShopIndex?'active-shop':'']" v-for="(n,i) in 10" :key="i">
					<img src="http://kaidian.test.gongxiangdiancan.com/static/images/shop-icon1.png" alt="" class="shop-logo">
					<div class="shop-info">
						<div class="shop-name">周大侠龙虾盖浇饭</div>
						<div class="shop-address">成都市高新区天府二街1122号1栋3单元</div>
					</div>
					<button v-if="n!=currentShopIndex" class="change-btn" @click="changeShop(n)">更换</button>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	// import {getGoodsCategoryLists,deleteGoodsCategoryById,addGoodsCategory} from '@/api/api'
	export default {
		data: function(){
			return {
				orderLists: null,
				currentShopIndex: 0
			}
		},
		created: function(){
			// this.getShopLists()
		},
		methods: {
			getShopLists: function(){
				this.$indicator.open();
				// getGoodsCategoryLists({params:{pageSize:99999999}}).then(res=>{
				// 	console.log(res)
				// 	if(res.count == 0){
				// 		this.isEmpty = true
				// 	}else{
				// 		this.isEmpty = false
				// 	}orderLists
				// 	this.orderLists = res.list;
				// 	this.$indicator.close();
				// })
			},
			changeShop: function(shopId){
				var sure = confirm('确定要切换到该店铺？');
				console.log(sure)
				if(sure){
					this.$toast({
						message: '操作成功',
						duration: 1500
					})
					this.currentShopIndex = shopId;
				}
			}
		}
	}
</script>
<style scoped>
#shopList{
	background-color: #fff;
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
.shop-lists{
  	box-sizing: border-box;
	height: 100%;
	padding: 0 2.66vw;
	margin: 0;
	list-style: none;
	overflow: scroll;
}
.shop-item{
	overflow: hidden;
	zoom: 1;
	margin: 2.66vw 0;
	padding: 2.66vw;
	border: 1px solid #ededed;
	border-radius: 5px;
	background-color: #fff;
}
.shop-logo{
	float: left;
	width: 11.73vw;
	height: 11.73vw;
	border-radius: 50%;
	-moz-box-shadow: 0px 0px 5px #dedede;
	-webkit-box-shadow: 0px 0px 5px #dedede;
	box-shadow: 0px 0px 5px #dedede;
	border: none;
}
.shop-info{
	float: left;
	width: 56vw;
	margin-left: 2vw;
}
.shop-name{
	color: #333;
	font-size: 4.26vw;
}
.shop-address{
	color: #adadad;
	font-size: 2.93vw;
}
.change-btn{
	float: left;
	width: 14.93vw;
	line-height: 6.93vw;
	background-color: #60bf37;
	border-radius: 20px;
	border: none;
	color: #fff;
	font-size: 3.73vw;
	margin-left: 2.66vw;
}
.active-shop.shop-item{
	border: 1px solid #60bf37;
	background-color: #78d252;
}
.active-shop .shop-name, 
.active-shop .shop-address{
	color: #fff;
}
.active-shop .shop-logo{
	-moz-box-shadow: 0px 0px 5px #64ae44;
	-webkit-box-shadow: 0px 0px 5px #64ae44;
	box-shadow: 0px 0px 5px #64ae44;
}
</style>
