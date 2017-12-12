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
                    <div class="row-title">活动名称</div>
                    <div class="otherActivity-name">
                        <input type="text" placeholder="活动名称,最多10个字符" v-model="activityName" maxlength="10">
                    </div>
                </div>
			    <div class="shopDetail-col" v-if="!isAdd">
			      	<div class="add-sales-goods">
			      		<button @click="addOnSalesGoods">商品管理</button>
			      	</div>
		      		<table class="on-sales-goods-table" v-if="goodsLists.length">
		      			<thead>
		      				<tr>
		      					<th>商品名称</th>
		      					<th>原价</th>
		      					<th>促销价</th>
		      				</tr>
		      			</thead>
		      			<tbody>
		      				<tr v-for="(item,index) in goodsLists" :key="index">
		      					<td>{{item.goodsName}}</td>
		      					<td>￥{{item.goodsPrice}}</td>
		      					<td>￥{{item.specialsPrice}}</td>
		      				</tr>
		      			</tbody>
		      		</table>
		      		<div v-else class="empty">
						<img src="../assets/images/empty-img.png" alt="">
					</div>
			    </div>
		  	</div>
            <button class="save" @click="saveActivity">保存</button>
		</div>
		<mt-datetime-picker ref="start" type="date" @confirm="setBeginTime" :startDate="startDate" :endDate="endDate"></mt-datetime-picker>
		<mt-datetime-picker ref="end" type="date" @confirm="setEndTime" :startDate="startDate" :endDate="endDate"></mt-datetime-picker>
	</div>
</template>
<script>
	import {
		getActivity,
		addActivity,
		updateActivity,
		getActivityGoods
	} from '@/api/api'
	export default {
		name: 'OnSales',
		data: function(){
			return {
				isAdd: true,
				beginTime: Date.now(),
				endTime: '',
				startDate: '',
				endDate: '',
            	activityName: '',
				goodsLists: []
			}
		},
		created: function(){
			//最大日期和最小日期限制在当年
			var thisYear = new Date().getFullYear();
			var thisStartDate = thisYear + '-01-01';
        	var thisEndDate = (thisYear + 4) + '-12-31';
			this.startDate = new Date(thisStartDate);
			this.endDate = new Date(thisEndDate);

			var id = this.$route.query.id || localStorage.getItem('activityId');
			if(id){
			    this.$indicator.open();
			    getActivity(id).then(res => {
			        console.log(res)
			        var data = res;
			        this.beginTime = data.beginTime;
			        this.endTime = data.endTime;
                	this.activityName = data.activityName;
			        this.isAdd = false;
			        this.$indicator.close();
			    })
			    getActivityGoods(id).then(res => {
			    	console.log(res)
			    	if(res.length){
			    		this.goodsLists = res;
			    	}
			        this.$indicator.close();
			    })
			}
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
				var id = this.$route.query.id || localStorage.getItem('activityId');
				if(id){
					this.$router.push('/goodsManager?type=sales&id='+ id);
				}
			},
	        saveActivity: function(){
				if(this.endTime && this.beginTime > this.endTime){
				    this.$toast({
				        message: '结束时间不能小于开始时间',
				        duration: 1500
				    })
				    return;
				}
	            if (!this.activityName) {
	                this.$toast({
	                    message: '请输入活动名称',
	                    duration: 1500
	                })
	                return;
	            }
				
	            var activityParams = {
	                activityContent: {
                		typeName: "sharefood.models.activity.activity.entity.SpecialpricesActivityData"
	                },
	                activityType: 'SPECIALPRICES',
	                beginTime: this.beginTime,
	                endTime: this.endTime,
	                activityName: this.activityName,
	                isValid: true
	            }
	            
	            console.log(activityParams)
	            var id = this.$route.query.id;
	            if(id){
	                this.$indicator.open();
	                updateActivity(id, activityParams).then(() => {
	                    this.$indicator.close();
	                    this.$toast({
	                        message: '修改成功',
	                        duration: 1000
	                    })
	                    setTimeout(() => {
	                        this.$router.isBack = true;
	                        this.$router.back()
	                    }, 1500)
	                })
	            }else{
	                this.$indicator.open();
	                addActivity(activityParams).then(() => {
	                    this.$indicator.close();
	                    this.$toast({
	                        message: '添加成功',
	                        duration: 1000
	                    })
	                    setTimeout(() => {
	                        this.$router.isBack = true;
	                        this.$router.back()
	                    }, 1500)
	                })
	            }
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
		padding-top: 13.06vw;
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
		display: inline-block;
		width: 64.66vw;
		height: 6vw;
		font-size: 3.72vw;
		text-align: right;
		padding-right: 2.66vw;
		border: 1px solid #f2f2f2;
		border-radius: 3px;
		outline: none;
	}
	.add-sales-goods{
		padding: 2.66vw 0;
	}
	.add-sales-goods button{
		display: inline-block;
		height: 6.4vw;
		line-height: 6.4vw;
		background-color: #fff;
		border: 1px solid #808080;
		outline: none;
		color: #808080;
		border-radius: 3px;
		font-size: 3.73vw;
	}
	.on-sales-goods-table{
		width: 100%;
		border-collapse: collapse;
		font-size: 3.73vw;
	}
	.on-sales-goods-table th,
	.on-sales-goods-table td{
		text-align: center;
		border: 1px solid #808080;
		line-height: 8vw;
	}
	.save {
	    width: 100%;
	    height: 10.66vw;
	    line-height: 10.66vw;
	    font-size: 4.26vw;
	    color: #fff;
	    background-color: #0eb745;
	    position: fixed;
	    bottom: 0;
	    border: none;
	    outline: none;
	}
		
	.otherActivity-name {
	    display: inline-block;
	    height: 6.66vw;
	    float: right;
	}
	
	.otherActivity-name input {
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