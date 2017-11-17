<template>
	<div id="bonus">
		<div class="bonus-header">
			<div class="nav-bar help-navbar">
		  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
		  		<div class="nav-title">红包管理</div>
		  		<router-link to="/addBonus" class="bonus-add-btn"><img src="../assets/images/add.png" alt=""></router-link>
			</div>
		</div>
		<div class="bonus-content">
			<div v-if="isEmpty" class="empty">
				<img src="../assets/images/empty-img.png" alt="">
			</div>
			<ul class="bonus-lists" v-else>
				<li>
					<div class="bonus-info"></div>
					<div class="bonus-del-btn">删除</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'bonusList',
		data: function(){
			return {
				isEmpty: false
			}
		}
	}
</script>
<style scoped>
	#bonus{
		min-height: 100%;
		background-color: #f2f2f2;
	}
	.bonus-header{
		width: 100%;
		position: fixed;
	}
	.bonus-add-btn{
		display: inline-block;
		float: left;
		width: 4vw;
		height: 4vw;
		padding: 3.865vw 2.345vw;
	}
	.bonus-add-btn img{
		width: 4vw;
		height: 4vw;
	}
	.bonus-content{
	    box-sizing: border-box;
		height: 100vh;
		overflow: hidden;
		zoom: 1;
		padding-top: 13.06vw;
	}
	.bonus-lists{
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.bonus-lists li{
		overflow: hidden;
		zoom: 1;
		background-color: #fff;
		margin: 2.66vw;
		box-sizing: border-box;
	}
</style>