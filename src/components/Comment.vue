<template>
	<div id="comment">
		<div class="comment-header">
			<div class="nav-bar help-navbar">
		  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
		  		<div class="nav-title">评价管理</div>
			</div>
		</div>
		<div class="comment-content">
			<div class="comment-scroll-wrap">
				<div class="comment-header-detail">
					<div class="comment-grade"><span class="grades">4.8</span><br>综合评价<br>高于商圈23%的商家</div>
					<div class="comment-status">近7天评价回复率：67%(良好)<br>近7天差评回复率：100%(良好)</div>
				</div>
				<div class="comment-filter">
					<button class="comment-filter-btn large-btn">未回复</button>
					<button class="comment-filter-btn large-btn active-filter">全部评价</button>
					<button class="comment-filter-btn active-filter">全部</button>
					<button class="comment-filter-btn">一星</button>
					<button class="comment-filter-btn">二星</button>
					<button class="comment-filter-btn">三星</button>
					<button class="comment-filter-btn">四星</button>
					<button class="comment-filter-btn">五星</button>
				</div>
				<div class="comment-lists-wrap">
					<div class="check-box">
						<div :class="[showContentOnly?'check-true':'check-false','check']" v-model="showContentOnly" @click="checkbox">只看有内容的评价</div>
					</div>
					<ul class="comment-lists">
						<li v-for="(item,index) in commentList" :key="index">
							<div class="comment-wrap">
								<div class="commit-header">
									<div class="commit-scores">
										<img v-for="n in item.shopAppraise" src="../assets/images/scores.png" alt="" class="scores-img">
									</div>
									<div class="commit-time">{{moment(item.appraiseTime).format('YYYY-MM-DD')}}</div>
								</div>
								<div>{{item.contentShopAppraise}}</div>
								<div class="order-goods">{{item.orderName}}</div>
								<div class="yours-replys" v-for="(val,key) in item.commentList" :key="key"><span class="yours-reply">您的回复：</span>{{val.commentContent}}</div>
							</div>
							<div class="spread" v-if="!item.goodsAppraiseList">
								<img src="../assets/images/spread.png" alt="" @click="showGoodsList(item.shopAppraiseId,index)">
							</div>
							<div class="commit-reply-lists" v-else="item.goodsAppraiseList" v-for="(goods,goodsKey) in item.goodsAppraiseList" :key="goodsKey">
								<div class="commit-reply-list">
									<div class="commit-header">
										<div class="commit-scores goods-name">{{goods.goodsName}}</div>
										<div class="goods-comment"><img v-for="n in goods.appraiseLevel" src="../assets/images/scores.png" alt="" class="scores-img"></div>
									</div>
									<div class="custom-commit">{{goods.appraiseContent}}</div>
								</div>
							</div>
							<div class="reply-btn">
								<button class="comment-filter-btn active-filter">回复</button>
							</div>
						</li>
					</ul>
					<div v-show="canLoad" class="loadmore" @click="loadBottom">点击加载</div>
				</div>
			</div>
		</div>
		<div class="add-goods" @click="addGoods">添加商品</div>
	</div>
</template>
<script>
	import {getShopAppraise,getShopAppraiseById} from '@/api/api'
	export default {
		name: 'comment',
		data: function(){
			return {
				showContentOnly: false,
				pageId: 1,
				counts: 0,
				shopAppraise: '',
				reply: false,
				commentList: [],
				init: true,
				allLoaded: false,
				canLoad: false
			}
		},
		created: function(){
			this.showShopAppraise()
		},
		methods: {
			showShopAppraise: function(){
				this.$indicator.open();
				getShopAppraise({params:{shopAppraise:this.shopAppraise, reply: this.reply, pageSize: 10, pageId: this.pageId}}).then(res => {
					console.log(res)
					this.counts = res.count;
					if(this.init){
						this.commentList = res.list
					}else{
						this.commentList = [].concat.apply(this.commentList, res.list)
					}
					console.log(this.commentList)
					this.$indicator.close();
					if(res.count == 0){
						this.allLoaded = true;
					}else{
						this.canLoad = true;						
					}
					if(Math.ceil(this.counts / 10) == this.pageId){
						this.allLoaded = true;
						this.canLoad = false;
						return;
					}
				})
			},
			checkbox: function(e){
				this.showContentOnly = !this.showContentOnly;
			},
			showGoodsList: function(shopAppraiseId,index){
				getShopAppraiseById(shopAppraiseId).then(res => {
					console.log(res)
					this.$set(this.commentList[index],'goodsAppraiseList',res.goodsAppraiseList)
				})
			},
			loadBottom: function(){
				this.allLoaded = false;
				this.pageId += 1;
				this.init = false;
				this.showShopAppraise()
			}
		}
	}
</script>
<style scoped>
	#comment{
		min-height: 100%;
		background-color: #f2f2f2;
	}
	.comment-header{
		width: 100%;
		position: fixed;
	}
	.comment-content{
	    box-sizing: border-box;
		height: 100vh;
		overflow: hidden;
		zoom: 1;
		padding: 13.06vw 0 14.39vw;
	}
	.comment-scroll-wrap{
		box-sizing: border-box;
		height: 100%;
		overflow: scroll;
	}
	.comment-header-detail{
		overflow: hidden;
		zoom: 1;
		background-color: #fff;
		color: #808080;
		line-height: 1.5;
	}
	.comment-grade{
		float: left;
		width: 42.14vw;
		padding: 1.33vw 0;
		text-align: center;
		margin: 4vw 0;
		border-right: 0.13vw solid #999;
		font-size: 3.73vw;
		vertical-align: middle;
	}
	.grades{
		color: #fe0000;
		font-size: 4.8vw;
	}
	.comment-status{
		float: left;
		width: 52vw;
		padding: 4vw 0;
		margin: 3vw 2.66vw;
		background-color: #fff;
		line-height: 2;
	}
	.comment-filter{
		margin-top: 2.66vw;
		background-color: #fff;
		padding: 2vw 0;
	}
	.comment-filter-btn{
		width: 28.8vw;
		height: 8vw;
		line-height: 8vw;
		text-align: center;
		color: #0bb745;
		background-color: #fff;
		border: 0.13vw solid #0bb745;
		border-radius: 0.66vw;
		font-size: 4vw;
		padding: 0;
		margin: 2vw 1.87vw;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.large-btn{
		width: 45.2vw;
	}
	.active-filter{
		color: #fff;
		background-color: #0bb745;
	}
	.comment-lists{
		margin: 0;
		padding: 0;
		list-style: none;
		color: #808080;
	}
	.comment-lists li{
		margin-bottom: 2.66vw;
		background-color: #fff;
	}
	.check-box{
		padding: 2.66vw;
		border-bottom: 0.13vw solid #999;
		margin-top: 2.66vw;
	}
	.check{
		height: 4vw;
		line-height: 4vw;
		padding-left: 6.66vw;
		vertical-align: middle;
		font-size: 4vw;
		color: #808080;
	}
	.check-false{
		background: url(../assets/images/check-false.png) no-repeat;
		background-size: contain;
	}
	.check-true{
		background: url(../assets/images/check-true.png) no-repeat;
		background-size: contain;
	}
	.comment-wrap{
		padding: 2.66vw;
		background-color: #fff;
	}
	.commit-header{
		overflow: hidden;
		zoom: 1;
	}
	.commit-content,
	.goods-name{
		font-size: 3.73vw;
	}
	.order-goods{
		font-size: 3.46vw;
		color: #0bb745;
	}
	.commit-time,
	.yours-replys,
	.custom-commit{
		font-size: 3.46vw;
	}
	.yours-reply{
		border-left: 0.8vw solid #0bb745;
		padding-left: 2.66vw;
		color: #4c4c4c;
		vertical-align: middle;
	}
	.commit-scores{
		float: left;
		vertical-align: middle;
		width: 76vw;
	}
	.goods-name{
		font-weight: bold;
		width: 69vw;
		float: left;
	}
	.goods-comment{
		float: right;
		width: 25.25vw;
	}
	.scores-img{
		width: 3.73vw;
		height: 3.33vw;
		margin: 0 0.66vw;
	}
	.commit-time{
		float: right;
		vertical-align: middle;
		width: 18vw;
	}
	.commit-reply-list{
		background-color: #eee;
		padding: 2.66vw;
	}
	.commit-reply-list:not(:first-child){
		border-top: 0.13vw solid #808080;
	}
	.reply-btn{
		background-color: #fff;
		text-align: right;
		padding: 2.66vw;
	}
	.reply-btn button{
		width: 20.8vw;
		height: 6.66vw;
		line-height: 6.66vw;
	}
	.spread{
		text-align: center;
	}
	.spread img{
		width: 7.6vw;
		height: 7.6vw;
	}
	.loadmore{
		text-align: center;
		padding: 2.66vw;
	}
</style>