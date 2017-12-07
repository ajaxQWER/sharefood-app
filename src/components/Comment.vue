<template>
	<div id="comment">
		<div class="comment-header">
			<div class="nav-bar help-navbar">
		  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
		  		<div class="nav-title">评价管理</div>
			</div>
		</div>
		<div class="comment-content" v-if="appraiseTotal">
			<div class="comment-scroll-wrap">
				<div class="comment-header-detail">
					<div class="comment-grade">
						<div class="grades-title">综合评价</div>
						<div class="grades">
							{{appraiseTotal.comprehensiveApprise}}
						</div>
						<div>高于商圈{{appraiseTotal.businessCircleRatio*100}}%的商家</div>
					</div>
					<div class="comment-status">
						<div>近7天评价回复率：{{appraiseTotal.reversionRate*100}}%</div>
						<mt-progress :value="appraiseTotal.reversionRate*100" :bar-height="5"></mt-progress>
						<div>近7天差评回复率：{{appraiseTotal.reviewRate*100}}%</div>
						<mt-progress :value="appraiseTotal.reviewRate*100" :bar-height="5"></mt-progress>
					</div>
				</div>
				<div class="comment-filter flex">
					<button v-for="(val,key) in replyObj" :class="['comment-filter-btn', 'flex-1', (replyIndex==val.index)?'active-filter':'']" @click="showReply('reply',val.index, val.reply)">{{val.name}}</button>
					<!-- <button v-for="(item,index) in filterObj" :class="['comment-filter-btn', (starIndex == item.index)?'active-filter': '']" @click="showReply('star',item.index,item.shopAppraise)">{{item.name}}</button> -->
				</div>
				<div class="comment-lists-wrap">
					<!-- <div class="check-box">
						<div :class="[commentsAppraise?'check-true':'check-false','check']" v-model="commentsAppraise" @click="checkbox">只看有内容的评价</div>
					</div> -->
					<div v-if="!isEmpty">
						<ul class="comment-lists">
							<li v-for="(item,index) in commentList" :key="index">
								<div class="comment-wrap">
									<div class="commit-header">
										<div class="commit-scores">
											<div class="commiter-logo">
												<img v-lazy="UPLOADURL + item.avatorUrl + '/avator.png'" alt="" class="default-avatar">
											</div>
											<div class="commiter-name">
												<h4 class="commiter-username">{{item.userName}}</h4>
												<div>
													<img v-for="n in item.shopAppraise" src="../assets/images/scores.png" alt="" class="scores-img">
												</div>
											</div>
										</div>
										<div class="commit-time">
											<div>{{moment(item.appraiseTime).format('YYYY-MM-DD')}}</div>
											<div class="reply-btn">
												<button class="comment-filter-btn active-filter" @click="replyAppraise(item.shopAppraiseId)">回复</button>
											</div>
										</div>
									</div>
									<div>{{item.contentShopAppraise}}</div>
									<div class="order-goods">{{item.orderName}}</div>
									<div class="order-goods-img">
										<div class="appraise-image" v-for="(orderImg,imgIndex) in item.shopAppraiseImageUrlList" :index="imgIndex" :style="'background-image:url(' + UPLOADURL + orderImg + '/avator.png)'" @click="showBigImage(orderImg)"></div>
									</div>
									<div class="yours-replys" v-for="(val,key) in item.commentList" :key="key"><span class="yours-reply">您的回复：</span>{{val.commentContent}}</div>
								</div>
								<!-- <div class="spread" v-if="item.goodsAppraiseList">
									<img src="../assets/images/spread.png" alt="" @click="showGoodsList(item.shopAppraiseId,index)">
								</div> -->
								<div class="commit-reply-lists" v-if="item.goodsAppraiseList.length>0" v-for="(goods,goodsKey) in item.goodsAppraiseList" :key="goodsKey">
									<div class="commit-reply-list">
										<div class="commit-header">
											<div class="commit-scores goods-name">{{goods.goodsName}}</div>
											<div class="goods-comment"><img v-for="n in goods.appraiseLevel" src="../assets/images/scores.png" alt="" class="scores-img"></div>
										</div>
										<div class="custom-commit">{{goods.appraiseContent}}</div>
									</div>
								</div>
							</li>
						</ul>
						<div v-show="canLoad" class="loadmore" @click="loadBottom">点击加载</div>
					</div>
					<div v-else class="empty">
						<img src="../assets/images/empty-img.png" alt="">
					</div>
				</div>
				<mt-popup v-model="popupVisible3" position="right" class="mint-popup-3" :modal="false">
				    <div class="setting-header">
				        <div class="nav-bar help-navbar">
				            <div class="back" @click="closePopup"><img src="../assets/images/white-back.png" alt=""></div>
				            <div class="nav-title">回复</div>
				        </div>
				    </div>
				    <div class="reply-content">
				        <div class="shopDetail-row">
				        	<textarea class="reply-textarea" name="" id=""  v-model="commentContent" placeholder="请输入回复内容" maxlength="140"></textarea>
				        </div>
				        <div class="popup-reply">
				            <button class="popup-reply-btn" @click="replyAction">回复</button>
				        </div>
				    </div>
				</mt-popup>
				<mt-popup v-model="imgPopup" popup-transition="popup-fade" class="img-popup">
					<div class="poput-content" v-if="imgPopup">
						<div class="close-btn" @click="closeImgPopup">
							<img src="../assets/images/close.png" alt="">						
						</div>
					  	<img v-lazy="bigImgUrl" alt="" class="evaluation">
					</div>
				</mt-popup>
			</div>
		</div>
		<!-- <div class="add-goods" @click="addGoods">添加商品</div> -->
	</div>
</template>
<script>
	import {getShopAppraiseHead,getShopAppraise,getShopAppraiseById,commentReply} from '@/api/api'
	export default {
		name: 'comment',
		data: function(){
			return {
				commentsAppraise: false,
				pageId: 1,
				pageSize: 5,
				counts: 0,
				shopAppraise: '',
				reply: '',
				commentList: [],
				init: true,
				allLoaded: false,
				canLoad: false,
				appraiseTotal: null,
				isEmpty: false,
				replyIndex: 1,
				replyObj: [{
					name: '全部评价',
					reply: '',
					index: 1
				},{
					name: '已回复',
					reply: true,
					index: 2
				},{
					name: '未回复',
					reply: false,
					index: 3
				}],
				starIndex: 1,
				filterObj: [{
					name: '全部',
					shopAppraise: '',
					index: 1
				},{
					name: '一星',
					shopAppraise: '1',
					index: 2
				},{
					name: '二星',
					shopAppraise: '2',
					index: 3
				},{
					name: '三星',
					shopAppraise: '3',
					index: 4
				},{
					name: '四星',
					shopAppraise: '4',
					index: 5
				},{
					name: '五星',
					shopAppraise: '5',
					index: 6
				}],
				popupVisible3: false,
				shopAppraiseId: 0,
				commentContent: '',
				imgPopup: false,
				bigImgUrl: ''
			}
		},
		created: function(){
			this.showShopAppraise()
			getShopAppraiseHead().then(res => {
				console.log(res)
				if(res.comprehensiveApprise){
					this.appraiseTotal = res;
				}else{
					this.appraiseTotal = {
						businessCircleRatio: 0,
						comprehensiveApprise: 0,
						reversionRate: 0,
						reviewRate: 0
					}
				}
			})
		},
		methods: {
			showShopAppraise: function(){
				this.$indicator.open();
				getShopAppraise({params:{shopAppraise:this.shopAppraise, reply: this.reply,commentsAppraise: this.commentsAppraise, pageSize: this.pageSize, pageId: this.pageId}}).then(res => {
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
						this.isEmpty = true;
						this.allLoaded = true;
					}else{
						this.isEmpty = false;
						this.canLoad = true;						
					}
					if(Math.ceil(this.counts / this.pageSize) == this.pageId){
						this.allLoaded = true;
						this.canLoad = false;
						return;
					}
				})
			},
			checkbox: function(e){
				this.commentsAppraise = !this.commentsAppraise;
				this.init = true;
				this.showShopAppraise()
			},
			showGoodsList: function(shopAppraiseId,index){
				this.$indicator.open();
				getShopAppraiseById(shopAppraiseId).then(res => {
					console.log(res)
					this.$indicator.close();
					this.$set(this.commentList[index],'goodsAppraiseList',res.goodsAppraiseList)
				})
			},
			loadBottom: function(){
				this.allLoaded = false;
				this.pageId += 1;
				this.init = false;
				this.showShopAppraise()
			},
			showReply: function(type, index, options){
				if(type == 'reply'){
					this.replyIndex = index;
					this.reply = options;
				}else if(type == 'star'){
					this.starIndex = index;
					this.shopAppraise = options;
				}
				this.init = true;
				this.pageId = 1;
				this.showShopAppraise()
			},
			replyAppraise: function(id){
				this.shopAppraiseId = id;
				this.popupVisible3 = true;
			},
			replyAction: function(){
				var params = {
					commentContent: this.commentContent,
					shopAppraiseId: this.shopAppraiseId
				}
				console.log(params)
				this.$indicator.open();
				commentReply(params).then(() => {
					this.$indicator.close();
					this.$toast({
            		    message: '操作成功',
            		    duration: 1000,
            		    className: 'goodscategory-toast'
            		})
    				setTimeout(() => {
    		            this.closePopup()
						this.showShopAppraise()
    		        }, 1500)
				})
			},
			closePopup: function(){
				this.popupVisible3 = false;
				this.commentContent = '';
			},
			showBigImage: function(url){
				this.bigImgUrl = this.UPLOADURL + url + '/evaluation_medium.png';
				this.imgPopup = true;
			},
			closeImgPopup: function(){
				this.imgPopup = false;
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
		padding-top: 13.06vw;
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
		border-right: 0.13vw solid #eee;
		font-size: 3.73vw;
		vertical-align: middle;
	}
	.grades{
		color: #ed4544;
		font-size: 6.4vw;
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
		border-bottom: 1px solid #e6e6e6;
	}
	.comment-filter-btn{
		width: 28.8vw;
		height: 8vw;
		line-height: 8vw;
		text-align: center;
		color: #000;
		background-color: #fff;
		border: 0.13vw solid #0bb745;
		border-radius: 0.66vw;
		outline: none;
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
		text-align: right;
		width: 25.25vw;
	}
	.scores-img{
		width: 2.66vw;
		height: 3.2vw;
		margin: 0 0.66vw;
	}
	.commit-time{
		float: right;
		vertical-align: middle;
		width: 18vw;
	}
	.commit-reply-list{
		background-color: #f7f7f7;
		padding: 2.66vw;
	}
	.commit-reply-list:not(:first-child){
		border-top: 0.13vw solid #808080;
	}
	/*.reply-btn{
		background-color: #fff;
		text-align: right;
		padding: 2.66vw;
	}*/
	.reply-btn button{
		width: 16vw;
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
	.mint-popup-3 {
	    width: 100%;
	    height: 100%;
	    background-color: #fff;
	}
	.mint-popup-3 .mint-button {
		position: absolute;
		width: 60px;
		top: 0;
		left: 0;
	}
	.reply-content{
		margin-top: 2.66vw;
	}
	.shopDetail-row{
		padding: 2.66vw;
	}
	.reply-textarea{
		width: 100%;
		min-height: 40vw;
		box-sizing: border-box;
		padding: 1.33vw;
		outline: none;
		resize: none;
	}
	.popup-reply{
		padding: 0 2.66vw;
	}
	.popup-reply-btn{
		width: 100%;
	    height: 10.66vw;
		background: url(../assets/images/help-navbar.jpg) no-repeat center center;
		background-size: cover;
		border: none;
		outline: none;
		border-radius: 5px;
		font-size: 4.26vw;
		color: #fff;
	}
	.commiter-logo{
		float: left;
		width: 10.4vw;
		height: 10.4vw;
		border-radius: 50%;
		font-size: 0;
	}
	.commiter-logo img{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.commiter-name{
		float: left;
		margin-left: 2.4vw;
	}
	.commiter-username{
		margin: 0;
	}
	.appraise-image{
		width: 24.4vw;
		height: 24.4vw;
		margin: 0.66vw;
		display: inline-block;
		background-color: #fff;
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;
	}
	.img-popup{
		width: 80vw;
		font-size: 0;
		background-color: transparent;
	}
	.popup-content{
		width: 100%;
		height: 100%;
		position: relative;
	}
	.evaluation{
		width: 100%;
		height: 100%;
		vertical-align: middle;
	}
	.close-btn{
		width: 6.4vw;
		height: 6.4vw;
		position: absolute;
		right: -4.8vw;
		top: -4.8vw;
		padding: 0.5vw;
		border-radius: 50%;
		vertical-align: middle;
		background-color: #fff;
		text-align: center;
		line-height: 6.4vw;
		font-size: 0;
		overflow: hidden;
	}
	.close-btn img{
		width: 100%;
		height: 100%;
	}
	.default-avatar[lazy=error]{
		background: url(../assets/images/default-avatar.png) no-repeat center center #eaeaea;
		background-size: cover;
	}
	.mt-progress{
		height: auto;
	}
	.grades-title{
		color: #333;
		text-align: left;
		padding-left: 2.66vw;
	}
	
</style>