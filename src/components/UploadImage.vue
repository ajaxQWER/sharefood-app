<template>
	<div id="uploadImage">
		<div class="uploadImage-header">
			<div class="nav-bar help-navbar">
		  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
		  		<div class="nav-title">商品图片</div>
		  		<div class="goods-nav-right">
		  			保存
		  		</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Cropper from 'cropperjs'
	export default {
		name: 'uploadImage',
		data: function(){
			return {

			}
		}
	}
</script>
<style scoped>
	#uploadImage{
		min-height: 100%;
		background-color: #f2f2f2;
		overflow: hidden;
	}
	.uploadImage-header{
		width: 100%;
		position: fixed;
	}
	.goods-nav-right{
		float: left;
		width: 8.69vw;
		line-height: 11.73vw;
		overflow: hidden;
		zoom: 1;
		color: #fff;
	}
</style>