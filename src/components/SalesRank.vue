<template>
	<div id="business">
		<div class="business-header">
			<div class="nav-bar help-navbar">
				<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
				<div class="nav-title">销售量排行</div>
			</div>
		</div>
		<div class="business-content">
			<div class="search-content">
				<p>日期<span @click="focus">{{dateNow}}</span></p>
			</div>
			<div class="chart-info">
				<div class="table-title">
					<div class="column flex">
						<div class="column-item flex-1">商品名称</div>
						<div class="column-item flex-1">销售量</div>
					</div>
				</div>
				<table class="date-num">
					<tbody>
						<tr>
							<td>鲜锅兔</td>
							<td>93</td>
						</tr>
						<tr>
							<td>玉米嫩兔</td>
							<td>80</td>
						</tr>
						<tr>
							<td>嫩牛蛙</td>
							<td>70</td>
						</tr>
						<tr>
							<td>水煮肉片</td>
							<td>56</td>
						</tr>
						<tr>
							<td>拌白肉</td>
							<td>43</td>
						</tr>
						<tr>
							<td>芋儿鸡</td>
							<td>20</td>
						</tr>
						<tr>
							<td>青椒肉丝</td>
							<td>6</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<mt-datetime-picker ref="time" type="date" @confirm="handleChange" :startDate="startDate" :endDate="endDate"></mt-datetime-picker>
	</div>
</template>
<script>
	export default {
		name: 'salesRank',
		data: function (){
			return {
				dateNow: this.moment(Date.now()).format('YYYY-MM-DD'),
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
			handleChange: function(value){
				console.log(value)
				this.dateNow = this.moment(value).format('YYYY-MM-DD')
				//TODO
				//fetch data
			},
			focus: function(){
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
