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
			<ul class="activity-lists">
				<li>
					<div class="activity-content">
						<div class="activity-info">
							<div class="activity-title"><span class="activity-icon type-1">返</span>满100送10元优惠券</div>
							<div class="activity-type">购满就送</div>
						</div>
						<div class="activity-deadline">有效期：2017-01-01至2017-12-31</div>
					</div>
					<div class="activity-delete-btn" @click="deleteActivity(item.goodsCategoryId)">删除</div>
				</li>
				<li>
					<div class="activity-content">
						<div class="activity-info">
							<div class="activity-title"><span class="activity-icon type-1">返</span>满100送10元优惠券</div>
							<div class="activity-type">购满就送</div>
						</div>
						<div class="activity-deadline">有效期：2017-01-01至2017-12-31</div>
					</div>
					<div class="activity-delete-btn">删除</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'activityList',
		data: function(){
			return {

			}
		},
		methods: {
			deleteActivity: function(id){
				this.$messagebox.confirm('确定删除该分类?').then(action => {
					deleteGoodsCategoryById(id).then(() => {
  						this.$toast({message:'删除成功',duration: 1000})
						this.getGoodsCategoryList()
					})
				}).catch(() => {
					this.$toast({message:'已取消',duration: 1000})
				});
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
		width: 100%;
		height: 100%;
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
</style>