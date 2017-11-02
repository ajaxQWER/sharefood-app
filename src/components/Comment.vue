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
					<button class="comment-filter-btn active-filter">全部(450)</button>
					<button class="comment-filter-btn">一星(0)</button>
					<button class="comment-filter-btn">二星(3360)</button>
					<button class="comment-filter-btn">三星(0)</button>
					<button class="comment-filter-btn">四星(99999999)</button>
					<button class="comment-filter-btn">五星(99990)</button>
				</div>
				<div class="comment-lists-wrap">
					<div class="check-box">
						<div :class="[contentOnly?'check-true':'check-false','check']" v-model="contentOnly" @click="checkbox">只看有内容的评价</div>
					</div>
					<ul class="comment-lists">
						<li>
							<div class="comment-wrap">
								<div class="commit-header">
									<div class="commit-scores"><img v-for="n in scores" src="../assets/images/scores.png" alt="" class="scores-img"></div>
									<div class="commit-time">2017-09-24</div>
								</div>
								<div class="commit-content">还不错还不错还不错</div>
								<div class="order-goods">老干妈卤肉饭老干妈卤肉饭老干妈卤肉饭老干妈卤肉饭</div>
								<div class="yours-replys"><span class="yours-reply">您的回复：</span>亲，谢谢您的支持！期待再次为你服务</div>
							</div>
							<div class="commit-reply-lists">
								<div class="commit-reply-list">
									<div class="commit-header">
										<div class="commit-scores goods-name">老干妈卤肉饭</div>
										<div class="commit-time"><img v-for="n in scores" src="../assets/images/scores.png" alt="" class="scores-img"></div>
									</div>
									<div class="custom-commit">还不错还不错还不错</div>
								</div>
								<div class="commit-reply-list">
									<div class="commit-header">
										<div class="commit-scores goods-name">老干妈卤肉饭</div>
										<div class="commit-time"><img v-for="n in scores" src="../assets/images/scores.png" alt="" class="scores-img"></div>
									</div>
									<div class="custom-commit">还不错还不错还不错</div>
								</div>
							</div>
							<div class="reply-btn">
								<button class="comment-filter-btn active-filter">回复</button>
							</div>
						</li>
						<li>
							<div class="comment-wrap">
								<div class="commit-header">
									<div class="commit-scores"><img v-for="n in scores" src="../assets/images/scores.png" alt="" class="scores-img"></div>
									<div class="commit-time">2017-09-24</div>
								</div>
								<div class="commit-content">还不错还不错还不错</div>
								<div class="order-goods">老干妈卤肉饭老干妈卤肉饭老干妈卤肉饭老干妈卤肉饭</div>
								<div class="yours-replys"><span class="yours-reply">您的回复：</span>亲，谢谢您的支持！期待再次为你服务</div>
							</div>
							<div class="commit-reply-lists">
								<div class="commit-reply-list">
									<div class="commit-header">
										<div class="commit-scores goods-name">老干妈卤肉饭</div>
										<div class="commit-time"><img v-for="n in scores" src="../assets/images/scores.png" alt="" class="scores-img"></div>
									</div>
									<div class="custom-commit">还不错还不错还不错</div>
								</div>
								<div class="commit-reply-list">
									<div class="commit-header">
										<div class="commit-scores goods-name">老干妈卤肉饭</div>
										<div class="commit-time"><img v-for="n in scores" src="../assets/images/scores.png" alt="" class="scores-img"></div>
									</div>
									<div class="custom-commit">还不错还不错还不错</div>
								</div>
							</div>
							<div class="reply-btn">
								<button class="comment-filter-btn active-filter">回复</button>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="add-goods">添加商品</div>
	</div>
</template>
<script>
	export default {
		name: 'comment',
		data: function(){
			return {
				contentOnly: false,
				scores: 5
			}
		},
		methods: {
			checkbox: function(e){
				this.contentOnly = !this.contentOnly;
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
	}
	.check-box{
		padding: 2.66vw;
		background-color: #fff;
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
	}
	.scores-img{
		width: 3.73vw;
		height: 3.33vw;
		margin: 0 0.66vw;
	}
	.commit-time{
		float: right;
		vertical-align: middle;
	}
	.custom-commit{}
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
		padding: 4vw 2.66vw 2.66vw;
	}
	.reply-btn button{
		width: 20.8vw;
		height: 6.66vw;
		line-height: 6.66vw;
	}
</style>