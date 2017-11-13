<template>
	<div id="business">
		<div class="business-header">
			<div class="nav-bar help-navbar">
				<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
				<div class="nav-title">销售量趋势图</div>
			</div>
		</div>
		<div class="business-content">
			<div class="search-content">
				<span>商品名称</span>
				<div class="search-input"><input type="text" placeholder="请输入相关商品" @keyup.enter="searchKeywords"></div>
			</div>
			<ul class="search-datalist">
				<li @click="fetchData(1)">鲜锅兔</li>
				<li>烤兔</li>
				<li>老妈兔头</li>
				<li>鸡兔同笼</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'salesVolume',
		data: function(){
			return {}
		},
		methods: {
			searchKeywords: function(){
				//fetch data
			},
			fetchData: function(id){
				//fetch data
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
.business-content{
}
.search-content{
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
	margin: 0 2vw;
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
.search-content input{
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
</style>
