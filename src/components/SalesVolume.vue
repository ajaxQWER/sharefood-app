<template>
	<div id="business">
		<div class="business-header">
			<div class="nav-bar help-navbar">
				<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
				<div class="nav-title">销售量趋势图</div>
			</div>
		</div>
		<div class="business-content">
			<div class="chart"></div>
			<div class="chart-info">
				<div class="table-title">
					<div class="column flex">
						<div class="column-item flex-1">日期</div>
						<div class="column-item flex-1">销售量</div>
					</div>
				</div>
				<table class="date-num">
					<tbody>
						<tr>
							<td>2017/11/06</td>
							<td>186.00</td>
						</tr>
						<tr>
							<td>2017/11/06</td>
							<td>389.00</td>
						</tr>
						<tr>
							<td>2017/11/06</td>
							<td></td>
						</tr>
						<tr>
							<td>2017/11/06</td>
							<td>568.00</td>
						</tr>
						<tr>
							<td>2017/11/06</td>
							<td>186.00</td>
						</tr>
						<tr>
							<td>2017/11/06</td>
							<td>389.00</td>
						</tr>
						<tr>
							<td>2017/11/06</td>
							<td>2263.90</td>
						</tr>
					</tbody>
				</table>
				<div class="tip">Tips:<br>营业额：只统计已完成的订单的订单金额</div>
			</div>
		</div>
	</div>
</template>
<script>
	
</script>
<style scoped>
#business{
	min-height: 100%;
	background-color: #f2f2f2;
	overflow: hidden;
}
.business-header{
	width: 100%;
	position: fixed;
}
.business-content{
	padding: 12vw 0 0;
	overflow: hidden;
}
.chart{
	width: 100%;
	height: 54vw;
	background-color: #fff;
}
.chart-info{
	width: 100vw;
	height: 104vw;
	position: absolute;
	bottom: 0;
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
	color: #777;
}
.date-num{
	width: 100%;
}
tbody tr{
	line-height: 7.33vw;
	text-align: center;
	font-size: 4.26vw;
	color: #777;
}
tr td{
	width: 50%;
}
tr td:last-child{
	font-size: 3.73vw;
}
.tip{
	font-size: 4.26vw;
	color: #777;
	padding: 2.67vw 0 0 4.67vw;
}
</style>
