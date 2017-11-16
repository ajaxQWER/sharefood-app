<template>
	<div id="business">
		<div class="business-header">
			<div class="nav-bar help-navbar">
				<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
				<div class="nav-title">销售量排行</div>
			</div>
		</div>
		<div class="business-content">
			<div class="search-content">日期<span @click="showDatePicker">{{dateNow}}</span></div>
			<div class="chart-info">
				<div class="table-title">
					<div class="column flex">
						<div class="column-item flex-1">商品名称</div>
						<div class="column-item flex-1">销售量</div>
					</div>
				</div>
				<div v-if="isEmpty" class="empty">
					<img src="../assets/images/empty-img.png" alt="">
				</div>
				<table class="date-num" v-else>
					<tbody>
						<tr v-for="(item,index) in rankData" :key="index">
							<td>{{item.goodsName}}</td>
							<td>{{item.salesCount}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<mt-datetime-picker ref="time" type="date" @confirm="handleChange" :startDate="startDate" :endDate="endDate"></mt-datetime-picker>
	</div>
</template>
<script>
	import {getSalesRank} from '@/api/api'
	export default {
		name: 'salesRank',
		data: function (){
			return {
				dateNow: '',
				startDate: '',
				endDate: '',
				rankData: [],
				isEmpty: false
			}
		},
		created: function(){
			//最大日期和最小日期限制在当年
			var thisYear = new Date().getFullYear();
			var thisStartDate = thisYear + '-01-01';
			var thisEndDate = thisYear + '-12-31';
			this.startDate = new Date(thisStartDate);
			this.endDate = new Date(thisEndDate);
			this.dateNow = this.moment(Date.now()).format('YYYY-MM-DD');
			this.fetchData()
		},
		methods: {
			fetchData: function(){
				this.$indicator.open();
				getSalesRank({params: {queryDate: this.dateNow}}).then(res => {
					console.log(res)
					if(res.length){
						this.rankData = res;
						this.isEmpty = false;
					}else{
						this.isEmpty = true;
					}
					this.$indicator.close();
				})
			},
			handleChange: function(value){
				this.dateNow = this.moment(value).format('YYYY-MM-DD')
				this.fetchData()
			},
			showDatePicker: function(){
				this.$refs.time.open()
			}
		}
	}
</script>
<style scoped>
#business{
	min-height: 100%;
	background-color: #f2f2f2;
	overflow: hidden;
}
.business-header{
	width: 100%;
}
.chart-info{
	width: 100vw;
	height: 104vw;
	overflow: hidden;
	background-color: #fff;
}
.column{
	width: 100%;
	border-bottom: 1px solid #f2f2f2;
	-webkit-align-items: center;
	-ms-flex-align: center;
	align-items: center;
	text-align: center;
	margin-bottom: 4vw;
}
.column-item{
	line-height: 12vw;
	font-size: 4.26vw;
	color: #4d4d4d;
}
.date-num{
	width: 100%;
}
tbody tr{
	height: 7.33vw;
	line-height: 7.33vw;
	text-align: center;
	font-size: 4.26vw;
	color: #4d4d4d;
}
tr td{
	width: 50%;
}
tr td:last-child{
	font-size: 3.73vw;
}
.search-content{
	padding: 2vw 4vw;
	color: #4d4d4d;
	background-color: #fff;
	font-size: 4.26vw;
}
.search-content span{
	display: inline-block;
	height: 6.66vw;
	line-height: 6.66vw;
	width: 66.66vw;
	border-radius: 5px;
	outline: none;
	border: 0.13vw solid #999;
	text-align: center;
	font-size: 3.46vw;
	color: #999;
	margin: 0 2vw;
    vertical-align: middle;
}
</style>
