<template>
	<div id="OnSales">
		<div class="OnSales-header">
	  		<div class="nav-bar help-navbar">
		    	<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
		    	<div class="nav-title">特价商品</div>
	  		</div>
		</div>
		<div class="OnSales-content">
		  	<div class="shopDetail-row">
			    <div class="shopDetail-col">
		      		<div class="row-title">开始时间</div>
	      			<div class="selectTime" @click="selectBeginTime">
		        		<div class="row-value">{{this.moment(beginTime).format('YYYY-MM-DD')}}</div>
			      	</div>
			    </div>
			    <div class="shopDetail-col">
			      	<div class="row-title">结束时间</div>
			      	<div class="selectTime" @click="selectEndTime">
			        	<div class="row-value">{{endTime?this.moment(endTime).format('YYYY-MM-DD'):''}}</div>
			      	</div>
			    </div>
			    <div class="shopDetail-col">
			      	<div class="add-sales-goods">
			      		<button @click="addOnSalesGoods">商品管理</button>
			      	</div>
			      	<div class="on-sales-goods-table">
			      		<table>
			      			<thead>
			      				<tr>
			      					<th>商品名称</th>
			      					<th>原价</th>
			      					<th>促销价</th>
			      				</tr>
			      			</thead>
			      			<tbody>
			      				<tr>
			      					<td>湘西霸王鸭</td>
			      					<td>￥24</td>
			      					<td>￥18</td>
			      				</tr>
			      				<tr>
			      					<td>湘西霸王鸭</td>
			      					<td>￥24</td>
			      					<td>￥18</td>
			      				</tr>
			      			</tbody>
			      		</table>
			      	</div>
			    </div>
		  	</div>
		</div>
		<mt-datetime-picker ref="start" type="date" @confirm="setBeginTime" :startDate="startDate" :endDate="endDate"></mt-datetime-picker>
		<mt-datetime-picker ref="end" type="date" @confirm="setEndTime" :startDate="startDate" :endDate="endDate"></mt-datetime-picker>
	</div>
</template>
<script>
	import {addActivity} from '@/api/api'
	export default {
		name: 'OnSales',
		data: function(){
			return {
				beginTime: Date.now(),
				endTime: '',
				startDate: '',
				endDate: ''
			}
		},
		created: function(){
			//最大日期和最小日期限制在当年
			var thisYear = new Date().getFullYear();
			var thisStartDate = thisYear + '-01-01';
			var thisEndDate = thisYear + '-12-31';
			this.startDate = new Date(thisStartDate);
			this.endDate = new Date(thisEndDate);
		},
		methods: {
			setBeginTime: function(value){
		  		this.beginTime = new Date(value).getTime();
			},
			setEndTime: function(value){
			  	this.endTime = new Date(value).getTime();
			},
			selectBeginTime: function(){
			  	this.$refs.start.open()
			},
			selectEndTime: function(){
			  	this.$refs.end.open()
			},
			addOnSalesGoods: function(){
				if(this.endTime && this.beginTime > this.endTime){
				    this.$toast({
				        message: '结束时间不能小于开始时间',
				        duration: 1500
				    })
				    return;
				}
				var activityParams = {
				    activityContent: {},
            		activityName: '特价商品',
				    activityType: "SPECIALPRICES",
				    beginTime: this.beginTime,
				    endTime: this.endTime,
				    isValid: true,
				}
				addActivity(activityParams).then(res => {
					console.log(res)
				})
			}
		}
	}
</script>
<style scoped>
	#OnSales{
		min-height: 100%;
		background-color: #f2f2f2;
	}
	.OnSales-header{
		width: 100%;
		position: fixed;
	}
	.OnSales-content{
		box-sizing: border-box;
		height: 100vh;
		overflow: hidden;
		zoom: 1;
		padding: 13.06vw 0 14.39vw;
	}
	.shopDetail-row{
		margin-top: 2.66vw;
		background-color: #fff;
	}
	.shopDetail-col{
		padding: 2vw 2.66vw;
		overflow: hidden;
		zoom: 1;
		color: #4d4d4d;
	}
	.shopDetail-col:not(:last-child){
		border-bottom: 0.13vw solid #f2f2f2;
	}
	.row-title{
		font-size: 4.26vw;
		display: inline-block;
		float: left;
	}
	.row-value{
		width: 21vw;
		text-align: center;
		display: inline-block;
		vertical-align: middle;
		margin-top: 0.8vw;
	}
	.selectTime{
		display: inline-block;
		float: right;
	}
	.selectTime:after{
		content: '';
		display: inline-block;
		width: 2vw;
		height: 3.73vw;
		background: url(../assets/images/list-more.png) no-repeat;
		background-size: contain;
		vertical-align: middle;
		margin-top: 0.8vw;
	}
	.OnSales-name{
		display: inline-block;
		height: 6.66vw;
		float: right;
	}
	.OnSales-name input{
		display: block;
		width: 64.66vw;
		height: 6vw;
		font-size: 3.72vw;
		text-align: right;
		padding-right: 2.66vw;
		border: 1px solid #f2f2f2;
		border-radius: 3px;
		outline: none;
	}
</style>