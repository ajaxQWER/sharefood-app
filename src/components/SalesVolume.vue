<template>
	<div id="business">
		<div class="business-header">
			<div class="nav-bar help-navbar">
				<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
				<div class="nav-title">销售量趋势图</div>
			</div>
		</div>
		<div class="business-content">
			<div class="search-content">商品名称<span @click="focus">请输入相关商品</span></div>
			<div class="chart">
				<IEcharts :option="line" :loading="loading"></IEcharts>
			</div>
			<div class="chart-info">
				<div class="table-title">
					<div class="column flex">
						<div class="column-item flex-1">日期</div>
						<div class="column-item flex-1">销售量</div>
					</div>
				</div>
				<table class="date-num">
					<tbody>
						<tr v-for="(item,index) in salesData" :key="index">
							<td>{{moment(item.finishDayTime).format('YYYY/MM/DD')}}</td>
							<td>{{item.goodsSaleCount}}</td>
						</tr>
					</tbody>
				</table>
				<div class="tip">Tips:<br>销售额：只统计已完成的订单的商品数量</div>
			</div>
		</div>
		<mt-popup  v-model="popupVisible3" position="right" class="mint-popup-3" :modal="false">
			<div class="popup-search-content">
				<span>商品名称</span>
				<div class="search-input"><input type="text" placeholder="请输入相关商品" @keyup.enter="searchKeywords" ref="searchBar" v-model="keywords"></div>
				<span class="closePopup" @click="closePopup">x</span>
			</div>
			<div v-if="isEmpty" class="empty">
				<img src="../assets/images/empty-img.png" alt="">
			</div>
			<ul class="search-datalist">
				<li v-for="(item,index) in searchData" :key="index" @click="fetchData(item.goodsId)">{{item.goodsName}}</li>
			</ul>
	    </mt-popup>
	</div>
</template>
<script>
import {getGoodsLists,getSalesTendency} from '@/api/api'
import IEcharts from 'vue-echarts-v3/src/full.vue';
export default {
	name: 'salesVolume',
	components: {
    	IEcharts: IEcharts
  	},
	data: function(){
		return {
			loading: true,
			line: {
		  		tooltip: {
		    		trigger: 'axis'
		  		},
		  		xAxis: {
			    	type: 'category',
			    	boundaryGap: false,
			    	axisLine: {
		      			lineStyle: {
			        		color: '#999'
		      			}
			    	},
			    	splitLine:{
			      		show: true
			    	},
			    	axisLabel: {
			      		color: '#999'
			    	},
		    		data: []
			  	},
			  	yAxis: {
			    	type: 'value',
			    	axisLine: {
			      		lineStyle: {
			        		color: '#999'
			      		}
		    		},
			    	splitLine:{
			      		show:false
			    	},
			    	axisLabel: {
			      		formatter: '{value}',
			      		color: '#999'
			    	}
			  	},
			  	series: [{
			    	type: 'line',
			    	data: [],
			    	itemStyle: {
			      		normal: {
			        		borderColor: '#05a2e9'
			      		}
			    	},
			    	lineStyle: {
			      		normal: {
			        		color: '#05a2e9'
			      		}
			    	},
			    	label: {
			      		normal: {
			        		color: '#999'
			      		}
			    	}
			  	}],
			  	grid: {
				    show: true,
				    left: '10%',
				    right: '10%',
				    top: '10%',
				    bottom: '10%',
				    containLabel: true
			  	}
			},
			salesData: [],
			popupVisible3: false,
			keywords: '',
			searchData: [],
			isEmpty: false,
			goodsId: ''
		}
	},
	created: function(){
		this.getData();
	},
	methods: {
		getData: function(){
			var _this = this;
			_this.searchData = [];
			_this.line.xAxis.data = [];
			_this.line.series[0].data = [];
			_this.loading = true;
			_this.$indicator.open();
			getSalesTendency({params: {days: 7, goodsId: _this.goodsId}}).then(res => {
				console.log(res)
				res.forEach((item) => {
					_this.line.xAxis.data.push(_this.moment(item.finishDayTime).format('MM-DD'));
					_this.line.series[0].data.push(item.goodsSaleCount);
					_this.loading = false;
				})
				_this.salesData = res;
				_this.$indicator.close();
			})
		},
		focus: function(){
			this.$refs.searchBar.focus()
			this.popupVisible3 = true;
		},
		searchKeywords: function(){
			if(!this.keywords){
				this.$toast({message: '请输入相关商品',duration: 1000,className: 'goodscategory-toast'})
				return;
			}
			getGoodsLists({params:{goodsNameLike: this.keywords,pageId: 1, pageSize: 9999}}).then(res => {
				this.keywords = '';
				this.$refs.searchBar.blur()
				if(res.count > 0){
					this.searchData = res.list;
					this.isEmpty = false;
				}else{
					this.searchData = [];
					this.isEmpty = true;
				}
			})
		},
		fetchData: function(goodsId){
			//fetch data
			console.log(goodsId)
			this.popupVisible3 = false;
			this.goodsId = goodsId;
			this.getData();
		},
		closePopup: function(){
			this.popupVisible3 = false;
			this.searchData = [];
		}
	}
}
</script>
<style scoped>
#business{
	min-height: 100%;
	background-color: #f2f2f2;
}
.business-header{
	width: 100%;
	position: fixed;
	z-index: 999;
}
.business-content{
	padding: 12vw 0 0;
}
.chart{
	width: 100%;
	height: 54vw;
	background-color: #fff;
	margin: 2.66vw 0;
}
.chart-info{
	width: 100vw;
	height: 104vw;
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
.mint-popup-3 {
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.mint-popup-3 .mint-button {
	position: absolute;
	width: 60px;
	top: 0;
	left: 0;
}

.popup-search-content{
	padding: 2vw 4vw;
	color: #4d4d4d;
	background-color: #fff;
	font-size: 4.26vw;
}
.search-input{
	display: inline-block;
	width: 66.66vw;
	line-height: 6.66vw;
	border-radius: 5px;
	border: 0.13vw solid #999;
	font-size: 3.46vw;
	color: #4d4d4d;
	margin: 0 1vw;
	box-sizing: border-box;
	padding: 1.33vw 2.66vw;
    vertical-align: middle;
}
.search-input:before{
	content: '';
	display: inline-block;
	width: 4vw;
	height: 4vw;
	background: url(../assets/images/search-black.png) no-repeat;
	background-size: contain;
    vertical-align: middle;
}
.popup-search-content input{
	display: inline-block;
	outline: none;
	border: none;
    vertical-align: middle;
    padding: 0 1.33vw;
	font-size: 3.46vw;
}
.search-datalist{
	list-style: none;
	padding: 0;
	margin: 0;
	background-color: #fff;
}
.search-datalist li{
	height: 10.66vw;
	line-height: 10.66vw;
	padding: 0 4vw;
	color: #4c4c4c;
	font-size: 4vw;
    vertical-align: middle;
}
.search-datalist li:not(:last-child){
	border-bottom: 0.13vw solid #f2f2f2;
}
.search-datalist li:before{
	content: '';
	display: inline-block;
	width: 4vw;
	height: 4vw;
	background: url(../assets/images/search-black.png) no-repeat;
	background-size: contain;
    vertical-align: middle;
    margin-right: 2.66vw;
    margin-top: -0.8vw;
}
.closePopup{
	display: inline-block;
	margin-left: 0.5vw;
}
</style>
