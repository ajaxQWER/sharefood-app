<template>
	<div id="analysis">
		<div class="analysis-header">
			<div class="nav-bar help-navbar">
				<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
				<div class="nav-title">营业分析</div>
			</div>
		</div>
		<div class="analysis-content">
			<div class="column-wrap">
				<div class="column flex">
					<router-link to="/customerTendency" class="column-item">
						<div class="flex-1">
							<img src="../assets/images/new-customer.jpg" alt="">
						</div>
					</router-link>
					<router-link to="/orderQuantity" class="column-item">
						<div class="flex-1">
							<img src="../assets/images/order.jpg" alt="">
						</div>
					</router-link>
					<router-link to="/turnover" class="column-item">
						<div class="flex-1">
							<img src="../assets/images/business-volume.jpg" alt="">
						</div>
					</router-link>
				</div>
				<div class="column flex">
					<router-link to="/salesVolume" class="column-item">
						<div class="flex-1">
							<img src="../assets/images/sales.jpg" alt="">
						</div>
					</router-link>
					<router-link to="/salesRank" class="column-item">
						<div class="flex-1">
							<img src="../assets/images/sales-rank.jpg" alt="">
						</div>
					</router-link>
					<div class="column-item flex-1 column-null"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
#analysis {
	min-height: 100%;
	background-color: #f2f2f2;
	overflow: hidden;
}

.analysis-header {
	width: 100%;
}

.analysis-content {
	padding: 2.67vw;
}

.column-wrap {
	background-color: #f2f2f2;
	padding-bottom: 4vw;
}

.column {
	-webkit-align-items: center;
	-ms-flex-align: center;
	align-items: center;
	margin-bottom: 2.67vw;
}

.column-item {
	width: 29.73vw;
	height: 30.13vw;
	background-color: #fff;
	border-radius: 2px;
	margin-right: 2.66vw;
}

.column-item img {
	width: 29.73vw;
	height: 30.13vw;
	border-radius: 5px;
}

.column-null {
	background-color: #f2f2f2;
}

</style>
