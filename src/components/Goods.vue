<template>
	<div id="goods">
		<div class="nav-bar help-navbar goods-header">
	  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
	  		<div class="nav-title">全部商品</div>
	  		<!-- <div class="goods-nav-right">
	  			<div class="search-bar"><img src="../assets/images/search.png" alt=""></div>
	  			<div class="menu-bar"><img src="../assets/images/menu.png" alt=""></div>
	  		</div> -->
		</div>
		<div class="goods-content">
			<div class="goods-type">
				<ul>
					<li :class="item.isActiveItem?'goods-type-item current-goods-type':'goods-type-item'" v-for="(item,index) in goodsCategoryLists" @click="getGoodsById(item.goodsCategoryId,index)" :key="index">{{item.goodsCategoryName}}</li>
				</ul>
			</div>
			<div class="goods-details-lists">
				<ul>
					<li class="goods-detail" v-for="(item,index) in goodsList" :key="index">
						<div class="goods-detail-wrap">
							<div class="goods-image">
								<img :src="UPLOADURL + item.goodsImgUrl" alt="">
							</div>
							<div class="goods-info">
								<h3 class="goods-name">{{item.goodsName}}</h3>
								<div class="goods-sales">月售{{item.goodsSales}}份</div>
								<div class="goods-price">￥{{item.goodsPrice}}</div>
							</div>
						</div>
						<div class="operate-row">
							<router-link :to="'/goodsDetail?goodsId='+item.goodsId"><button class="btn edit-btn">编辑</button></router-link>
							<button class="btn sold-out-btn" @click="soldOut(item.goodsId,index,item.goodsStatus)">{{formatStatus(item.goodsStatus)}}</button>
							<button class="btn delete-btn" @click="deleteGoods(item.goodsId,index)">删除</button>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="add-goods" @click="addGoods">添加商品</div>
	</div>
</template>
<script>
	import {getGoodsCategoryLists,getGoodsLists,deleteGoodsById,soldOutGoods,putAwayGoods} from '@/api/api'
	export default {
		name: 'goods',
		data: function(){
			return {
				goodsCategoryLists: null,
				goodsList: null
			}
		},
		created: function(){
			this.$indicator.open();
			getGoodsCategoryLists({params: {pageSize: 999999}}).then(res => {
				// console.log(res)
				this.getGoods(res.list[0].goodsCategoryId)
				this.goodsCategoryLists = res.list;
				this.goodsCategoryLists.forEach(function(item,index){
					item['isActiveItem'] = false;
					if(index == 0){
						item['isActiveItem'] = true
					}
				})
			})
		},
		methods: {
			getGoods: function(id){
				getGoodsLists({params: {pageSize: 999999, goodsClassId: id}}).then(res => {
					// console.log(res.list)
					this.goodsList = res.list;
					this.$indicator.close();
				})
			},
			formatStatus: function(status){
				switch (status) {
					case 'PUTAWAY':
						return '估清';
					case 'SOLD_OUT':
						return '恢复';
				}
			},
			getGoodsById: function(id,index){
				this.$indicator.open();
				this.goodsCategoryLists.forEach(function(item,current){
					item['isActiveItem'] = false;
					if(index == current){
						item['isActiveItem'] = true;
					}
				})
				this.getGoods(id)
			},
			deleteGoods: function(id,index){
				this.$messagebox.confirm('确定删除该商品?').then(action => {
					deleteGoodsById(id).then(() => {
							this.$toast({message:'操作成功',duration: 1000})
							this.goodsList.splice(index,1)
						})
				}).catch(() => {
					this.$toast({message:'已取消',duration: 1000})
				});
			},
			soldOut: function(id,index,status){
				var soldStatus = this.formatStatus(status);
				this.$messagebox.confirm('确定'+soldStatus+'该商品?').then(action => {
					if(status==='PUTAWAY'){
						soldOutGoods([id]).then(() => {
							this.$toast({message:'操作成功',duration: 1000})
							this.goodsList[index].goodsStatus = 'SOLD_OUT'
						})
					}else if(status==='SOLD_OUT'){
						putAwayGoods([id]).then(() => {
							this.$toast({message:'操作成功',duration: 1000})
							this.goodsList[index].goodsStatus = 'PUTAWAY'
						})
					}
				}).catch(() => {
					this.$toast({message:'已取消',duration: 1000})
				});
			}
		}
	}
</script>
<style scoped>
	#goods{
		min-height: 100%;
		background-color: #f2f2f2;
	}
	.goods-header{
		width: 100%;
		position: fixed;
	}
	.nav-title:after{
		content: '';
		display: inline-block;
		width: 3.6vw;
		height: 2.26vw;
		background: url(../assets/images/selecct-down.png) no-repeat center center;
		background-size: contain;
		margin-left: 2.66vw;
	}
	.goods-nav-right{
		position: absolute;
		overflow: hidden;
		zoom: 1;
		right: 0;
	}
	.goods-nav-right img{
		height: 100%;
	}
	.search-bar{
		float: left;
		height: 5.06vw;
		margin: 3.34vw 2.66vw;
	}
	.menu-bar{
		float: left;
		height: 3.2vw;
		margin: 4.27vw 2.66vw;
	}
	
	.goods-content{
	    box-sizing: border-box;
		height: 100vh;
		overflow: hidden;
		zoom: 1;
		padding: 13.06vw 0 14.39vw;

	}
	.goods-type{
		float: left;
		width: 26.66vw;
		height: 100%;
		overflow: auto;
		background-color: #e5e5e5;
	}
	.goods-type ul,
	.goods-details-lists ul{
		padding: 0;
		margin: 0;
		list-style: none;
	}
	.goods-type-item{
		width: 100%;
		height: 7.50vh;
		line-height: 7.50vh;
		background-color: #e5e5e5;
		font-size: 4.26vw;
		text-align: center;
	}
	.current-goods-type{
		background-color: #fff;
	}
	.goods-type-item:not(:first-child){
		border-top: 0.26vw solid #f2f2f2;
	}
	.goods-details-lists{
		float: right;
		width: 72vw;
		height: 100%;
		overflow: auto;
	}
	.goods-detail{
		padding: 4vw 2.66vw;
		background-color: #fff;
	}
	.goods-detail-wrap{
		overflow: hidden;
		zoom: 1;
	}
	.goods-detail:not(:first-child){
		margin-top: 1.33vw;
	}
	.goods-image{
		width: 24vw;
		height: 24vw;
		float: left;
	}
	.goods-image img{
		width: 100%;
		height: 100%;
	}
	.goods-info{
		float: left;
		padding-left: 2vw;
		width: 40vw;
	}
	.goods-name{
		font-size: 4vw;
		font-weight: 600;
		color: #0bb745;
		margin: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		line-height: 2;
	}
	.goods-sales{
		color: #666;
		font-size: 3.73vw;
	}
	.goods-price{
		color: #0bb745;
		font-size: 3.73vw;
	}
	.operate-row{
		margin-top: 1vw;
		text-align: right;
	}
	.btn{
		/* width: 12vw; */
		height: 5.06vw;
		line-height: 5.06vw;
		text-align: center;
		font-size: 3.46vw;
		border-radius: 5px;
		border: 1px solid #808080;
		outline: none;
		background-color: #fff;
		color: #808080;
		padding: 0 1.33vw;
	}
	.edit-btn{
		background-color: #0bb745;
		border: 1px solid #0bb745;
		color: #fff;
	}
	.delete-btn{
		background-color: #ef4f4f;
		border: 1px solid #ef4f4f;
		color: #fff;
	}
</style>