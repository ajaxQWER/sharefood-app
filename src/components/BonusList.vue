<template>
	<div id="bonus">
		<div class="bonus-header">
			<div class="nav-bar help-navbar">
		  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
		  		<div class="nav-title">红包管理</div>
		  		<router-link to="/addBonus" class="bonus-add-btn"><img src="../assets/images/add.png" alt=""></router-link>
			</div>
		</div>
		<div class="bonus-content">
			<div v-if="isEmpty" class="empty">
				<img src="../assets/images/empty-img.png" alt="">
			</div>
			<ul class="bonus-lists" v-else>
				<li v-for="(item,index) in bonusList" :key="index">
					<router-link :to="'/addBonus?id='+item.couponId" class="link">
						<div class="bonus-info">
							<div class="bonus-value">
								<div class="bonus-face">￥<span>{{item.money}}</span></div>
								<div class="bonus-condition">{{item.minimum?'满'+item.minimum+'元可用':'任意金额可用'}}</div>
							</div>
							<div class="bonus-detail">
								<div class="bonus-name">{{item.couponName}}</div>
								<div class="bonus-deadline">{{item.endTime?(moment(item.endTime).format('YYYY-MM-DD HH:mm')+'到期'):'无限期'}}</div>
							</div>
						</div>
					</router-link>
					<div class="bonus-del-btn" @click="deleteBonus(item.couponId)">删除</div>
				</li>
			</ul>

		</div>
	</div>
</template>
<script>
	import {getBonusLists,deleteBonusById} from '@/api/api'
	export default {
		name: 'bonusList',
		data: function(){
			return {
				isEmpty: false,
				bonusList: []
			}
		},
		created: function(){
			this.getBonusList()
		},
		methods: {
			getBonusList: function(){
        		this.$indicator.open();
				getBonusLists({params: {pageSize: 9999}}).then(res => {
					console.log(res)
        			this.$indicator.close();
					if(res.count > 0){
						this.bonusList = res.list;
						this.isEmpty = false;
					}else{
						this.isEmpty = true;
					}
				})
			},
			deleteBonus: function(id){
				this.$messagebox.confirm('确定删除该红包?').then(() => {
        			this.$indicator.open();
				    deleteBonusById(id).then(() => {
        				this.$indicator.close();
				        this.$toast({ message: '操作成功', duration: 1000 })
				        setTimeout(() => {
				            this.getBonusList()
				        }, 1500)
				    })
				}).catch(() => {});
			}
		}
	}
</script>
<style scoped>
	#bonus{
		min-height: 100%;
		background-color: #f2f2f2;
	}
	.bonus-header{
		width: 100%;
		position: fixed;
	}
	.bonus-add-btn{
		display: inline-block;
		float: left;
		width: 4vw;
		height: 4vw;
		padding: 3.865vw 2.345vw;
	}
	.bonus-add-btn img{
		width: 4vw;
		height: 4vw;
	}
	.bonus-content{
	    box-sizing: border-box;
		height: 100vh;
		overflow: hidden;
		zoom: 1;
		padding-top: 13.06vw;
	}
	.bonus-lists{
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.bonus-lists li{
		overflow: hidden;
		zoom: 1;
		background-color: #fff;
		margin: 2.66vw;
		box-sizing: border-box;
	}
	.bonus-info{
		width: 72.66vw;
		float: left;
		overflow: hidden;
		zoom: 1;
	}
	.bonus-value{
		width: 28vw;
		height: 10.66vw;
		padding: 6vw 0;
		text-align: center;
		float: left;
		position: relative;
	}
	.bonus-value:before{
		content: '';
		display: inline-block;
		position: absolute;
		left: 0;
		top: 0;
		width: 8.26vw;
		height: 8.66vw;
		background: url(../assets/images/bonus-before.png) no-repeat center center;
		background-size: contain;

	}
	.bonus-face{
		font-size: 3.73vw;
		color: #f41827;
	}
	.bonus-face span{
		font-size: 5.33vw;
		font-weight: bold;
	}
	.bonus-detail{
		width: 44.66vw;
		height: 10.66vw;
		float: left;
		padding: 6vw 0;
	}
	.bonus-name{
		font-size: 4.26vw;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.bonus-condition{
		color: #aaa;
	}
	.bonus-condition,
	.bonus-deadline{
		font-size: 3.2vw;
	}
	.bonus-del-btn{
		width: 21.6vw;
		height: 10.66vw;
		padding: 6vw 0;
		line-height: 10.66vw;
		text-align: center;
		float: right;
		background-color: #ff3a2f;
		color: #fff;
	}
	.link{
		display: inline-block;
		color: #333;
	}
</style>