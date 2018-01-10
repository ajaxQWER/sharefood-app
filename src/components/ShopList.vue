<template>
	<div id="shopList">
		<div class="nav-bar help-navbar order-header">
	  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
	  		<div class="nav-title">门店选择</div>
		</div>
		<div class="wrap-content">
			<ul class="shop-lists" v-if="shopLists">
				<li :class="['shop-item',item.shopId == currentShopId?'active-shop':'']" v-for="(item,index) in shopLists" :key="index">
					<img :src="UPLOADURL + '/shopLogo/' + item.shopId + '.png/shopLogo.png'" alt="" class="shop-logo">
					<div class="shop-info">
						<div class="shop-name">{{item.shopName}}</div>
						<div class="shop-address">{{item.provinceName}}{{item.cityName}}{{item.areaName}}{{item.address}}</div>
					</div>
					<button class="change-btn" @click="changeShop(item)">{{btnWord}}</button>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import {getShopLists} from '@/api/api'
	export default {
		data: function(){
			return {
				shopLists: null,
				currentShopId: null,
				btnWord: '更换'
			}
		},
		created: function(){
			this.getShopList();
			var btnWord = this.$route.query.from;
			if(btnWord == 'login'){
				this.btnWord = '登录'
			}
		},
		methods: {
			getShopList: function(){
				this.$indicator.open();
				getShopLists().then(res=>{
					console.log(res)
					this.shopLists = res;
					this.currentShopId = +localStorage.getItem('shopId');
					this.$indicator.close();
				})
			},
			changeShop: function(item){
				var text = this.btnWord == '登录' ? '登录' : '切换'
				var sure = confirm('确定要' + text + '到该店铺？');
				console.log(sure)
				if(sure){
					var shopId = item.shopId;
					var shopName = item.shopName;
					this.currentShopId = shopId;
					localStorage.setItem('shopId', shopId)
		    		localStorage.setItem('shopName', shopName)
					this.$router.push('/home')
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
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
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
