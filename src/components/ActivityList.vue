<template>
	<div id="activityList">
		<div class="activityList-header">
			<div class="nav-bar help-navbar">
		  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
		  		<div class="nav-title">活动管理</div>
		  		<router-link to="/activity" class="activity-add-btn"><img src="../assets/images/add.png" alt=""></router-link>
			</div>
		</div>
		<div class="activityList-content">
			<div v-if="isEmpty" class="empty">
				<img src="../assets/images/empty-img.png" alt="">
			</div>
			<ul class="activity-lists" v-else>
				<li v-for="(item,index) in activityLists" :key="index" >
					<div class="activity-content">
						<router-link :to="formatRouter(item.activityType,item.activityId)" class="link">
							<div class="activity-info">
								<div class="activity-title"><span :class="['activity-icon', formatClassByType(item.activityType)]">{{formatActivityIconByType(item.activityType)}}</span>{{item.activityName}}</div>
								<div class="activity-type">{{formatActivityType(item.activityType)}}</div>
							</div>
							<div class="activity-deadline">有效期：{{moment(item.beginTime).format('YYYY-MM-DD')}} 至 {{item.endTime?moment(item.endTime).format('YYYY-MM-DD'):'长期'}}</div>
						</router-link>
					</div>
					<div class="activity-delete-btn" @click="deleteActivity(item.activityId)">删除</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import {getActivityLists,deleteActivityById} from '@/api/api'
	export default {
		name: 'activityList',
		data: function(){
			return {
				isEmpty: false,
				activityLists: []
			}
		},
		created: function(){
			this.getActivityList()
		},
		methods: {
			getActivityList: function(){
				this.$indicator.open();
				getActivityLists({params: {pageSize: 9999, pageId: 1}}).then(res => {
					console.log(res)
					if(res.count > 0){
						this.activityLists = res.list;
						this.isEmpty = false;						
					}else{
						this.isEmpty = true;
					}
					this.$indicator.close();
				})
			},
			deleteActivity: function(id){
				this.$messagebox.confirm('确定删除该活动?').then(action => {
					deleteActivityById(id).then(() => {
  						this.$toast({message:'删除成功',duration: 1000})
						this.getActivityList()
					})
				}).catch(() => {
					this.$toast({message:'已取消',duration: 1000})
				});
			},
			formatActivityType: function(type){
				switch (type) {
					case 'FIRST':
						return '首单立减';
					case 'DELGOLD':
						return '购满就减';
					case 'COMPLIMENTARY':
						return '购满就送';
					case 'SPECIALPRICES':
						return '特价商品';
					case 'SALE':
						return '折扣商品';
					case 'SPECIFIC':
						return '其他';
				}
			},
			formatActivityIconByType: function(type){
				switch (type) {
					case 'FIRST':
						return '首';
					case 'DELGOLD':
						return '减';
					case 'COMPLIMENTARY':
					case 'SPECIFIC':
						return '惠';
					case 'SPECIALPRICES':
						return '特';
					case 'SALE':
						return '折';
				}
			},
			formatClassByType: function(type){
				switch (type) {
					case 'FIRST':
						return 'type-3';
					case 'DELGOLD':
					case 'COMPLIMENTARY':
						return 'type-2';
					case 'SALE':
					case 'SPECIFIC':
					case 'SPECIALPRICES':
						return 'type-1';
				}
			},
			formatRouter: function(type, id){
				switch (type) {
					case 'FIRST':
						return '/firstReduceActivity?id=' + id;
					case 'DELGOLD':
						return '/fullReduceActivity?id=' + id;
					case 'COMPLIMENTARY':
						return '/fullSendActivity?id=' + id;
					case 'SPECIALPRICES':
						return '/onSales?id=' + id;
					case 'SALE':
						return '/onDiscount?id=' + id;
					case 'SPECIFIC':
						return '/elseActivity?id=' + id;
				}
			}
		}
	}
</script>
<style scoped>
	#activityList{
		min-height: 100%;
		background-color: #f2f2f2;
	}
	.activityList-header{
		width: 100%;
		position: fixed;
	}
	.activity-add-btn{
		display: inline-block;
		float: left;
		width: 4vw;
		height: 4vw;
		padding: 3.865vw 2.345vw;
	}
	.activity-add-btn img{
		width: 4vw;
		height: 4vw;
	}
	.activityList-content{
	    box-sizing: border-box;
		height: 100vh;
		overflow: hidden;
		zoom: 1;
		padding: 13.06vw 0 14.39vw;
	}
	.activity-lists{
		list-style: none;
		padding: 0;
		margin: 0;
		background-color: #fff;
	}
	.activity-lists li{
		/* height: 15vw; */
		overflow: hidden;
		zoom: 1;
	}
	.activity-lists li:not(:last-child){
		border-bottom: 0.13vw solid #f2f2f2;
	}
	.activity-content{
		float: left;
		width: 84vw;
		box-sizing: border-box;
		overflow: hidden;
		zoom: 1;
		padding: 1.33vw 2.66vw;
		color: #808080;
	}
	.activity-info{
		overflow: hidden;
		zoom: 1;
		font-size: 3.46vw;
	}
	.activity-deadline{
		margin-top: 1.33vw;
		font-size: 2.93vw;
	}
	.activity-title{
		float: left;
		width: 59.34vw;
		margin-right: 2.66vw;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		vertical-align: text-bottom;
	}
	.activity-icon{
		display: inline-block;
		width: 4vw;
		height: 4vw;
		border-radius: 2px;
		font-size: 3.2vw;
		text-align: center;
		line-height: 4.5vw;
		color: #fff;
		margin-right: 1.33vw;
		vertical-align: text-bottom;
	}
	.type-1{
		background-color: #f39800;
	}
	.type-2{
		background-color: #ff0000;
	}
	.type-3{
		background-color: #0bb745;
	}
	.activity-type{
		float: left;
		width: 16.68vw;
		text-align: center;
	}
	.activity-delete-btn{
		float: left;
		width: 16vw;
		height: 15vw;
		line-height: 15vw;
		text-align: center;
	    background-color: #ef4f4f;
	    color: #fff;
	    font-size: 3.73vw;
	}
	.link{
		display: inline-block;
		overflow: hidden;
		zoom: 1;
		text-decoration: none;
		color: #808080;
	}
</style>