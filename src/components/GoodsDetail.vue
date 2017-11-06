<template>
	<div id="goodsDetail">
		<div class="goodsDetail-header">
			<div class="nav-bar help-navbar">
		  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
		  		<div class="nav-title">编辑商品</div>
			</div>
		</div>
		<div class="goodsDetail-content" v-if="goodsInfo">
			<div class="goods-item">
				<div class="row-title">商品图片</div>
				<div class="row-value upload-img">
					<img class="goods-imgage" :src="headerImage?headerImage:UPLOADURL + goodsInfo.goods.goodsImgUrl" alt="商品图片">
				</div>
				<div class="row-value upload-img upload">
						<img class="goods-imgage" src="" alt="点击上传" @click="popupVisible=true">
				</div>
			</div>
			<div class="goods-item">
				<div class="row-title">商品名称</div>
				<div class="row-value">
					<input type="text" placeholder="请输入商品名称" v-model="goodsInfo.goods.goodsName" maxlength="12">
				</div>
			</div>
			<div class="goods-item">
				<div class="row-title">商品分类</div>
				<div class="row-value value-after"></div>
			</div>
			<div class="goods-item">
				<div class="row-title">商品价格</div>
				<div class="row-value">
					<input type="text" placeholder="请输入商品价格" v-model="goodsInfo.goods.goodsPrice">
				</div>
			</div>
			<div class="goods-item">
				<div class="row-title">餐盒费</div>
				<div class="row-value">
					<input type="text" placeholder="请输入餐盒费" v-model="goodsInfo.goods.feeMeals">
				</div>
			</div>
			<div class="goods-item">
				<div class="row-title">商品简介</div>
				<div class="row-value">
					<textarea class="goods-intro" placeholder="最多255字" name="" id="" maxlength="255" v-model="goodsInfo.goods.goodsContent"></textarea>
				</div>
			</div>
			<div class="save-goods" @click="updateGoods">保存</div>
		</div>
		<div class="goodsDetail-content" v-else>
			<div class="goods-item">
				<div class="row-title">商品图片</div>
				<div class="row-value upload-img">
					<img class="goods-imgage" :src="headerImage?headerImage:''" alt="商品图片">
				</div>
				<div class="row-value upload-img upload">
					<img class="goods-imgage" src="../assets/images/upload-btn.jpg" alt="点击上传" @click="popupVisible=true">
				</div>
			</div>
			<div class="goods-item">
				<div class="row-title">商品名称</div>
				<div class="row-value">
					<input type="text" placeholder="请输入商品名称" v-model="newGoods.goods.goodsName" maxlength="12">
				</div>
			</div>
			<div class="goods-item">
				<div class="row-title">商品分类</div>
				<div class="row-value value-after">火锅、火锅、火锅、火锅、火锅</div>
			</div>
			<div class="goods-item">
				<div class="row-title">商品价格</div>
				<div class="row-value">
					<input type="text" placeholder="请输入商品价格" v-model.number="newGoods.goods.goodsPrice">
				</div>
			</div>
			<div class="goods-item">
				<div class="row-title">餐盒费</div>
				<div class="row-value">
					<input type="text" placeholder="请输入餐盒费" v-model.number="newGoods.goods.feeMeals">
				</div>
			</div>
			<div class="goods-item">
				<div class="row-title">商品简介</div>
				<div class="row-value">
					<textarea class="goods-intro" placeholder="最多255字" name="" id="" maxlength="255" v-model="newGoods.goods.goodsContent"></textarea>
				</div>
			</div>
			<div class="save-goods" @click="updateGoods">保存</div>
		</div>

		<mt-popup
		  v-model="popupVisible"
		  position="bottom">
		  	<!-- 遮罩层 -->
		  	<div class="container" v-show="panel">
				<div>
					<img id="image" :src="url" alt="Picture">
				</div>
				<button type="button" id="buttonCancel" @click="cancel">取消</button>
				<button type="button" id="button" @click="crop">确定</button>
		  	</div>
		  	<div class="upload-wrap">
			  	<div class="close-popup" @click="closePopup">x</div>
		  	  	<div class="upload-bg"></div>
		  	    <input class="upload-btn" type="file" id="change" @change="change" ref="uploads" accept="image/*">
		  	    <label for="change"></label>
		  	</div>
		</mt-popup>

	</div>
</template>
<script>
	import Cropper from 'cropperjs'
	import {getGoodsById,updateGoodsById,addGoods,uploadFiles} from '@/api/api'
	export default {
		name: 'goodsDetail',
		data: function(){
			return {
				goodsInfo: null,
				popupVisible: false,
				headerImage: '',
				picValue: '',
				cropper: '',
				croppable: false,
				panel: false,
				url: '',
				newGoods: {
					goods: {
					    feeMeals: '',
					    goodsClassNames: "",
					    goodsContent: "",
					    goodsImgUrl: "",
					    goodsName: "",
					    goodsPrice: '',
					    goodsStatus: "SOLD_OUT",
				  	},
				  	goodsCategoryIdList: [0]
				},
				goodsId: ''
			}
		},
		created: function(){
			var goodsId = this.$route.query.goodsId;
			this.goodsId = goodsId;
			if(goodsId){
				this.$indicator.open();
				getGoodsById(goodsId).then(res => {
					console.log(res)
					this.goodsInfo = res;
					this.$indicator.close();
				})
			}
		},
		mounted: function(){
			var self = this;
			var image = document.getElementById('image');
			this.cropper = new Cropper(image, {
				aspectRatio: 1,
				viewMode: 1,
				background: false,
				zoomable: false,
				dragMode: 'move',
				ready: function() {
					self.croppable = true;
				}
			});
		},
		methods: {
			getObjectURL(file) {
			  var url = null;
			  if (window.createObjectURL != undefined) { // basic  
			    url = window.createObjectURL(file);
			  } else if (window.URL != undefined) { // mozilla(firefox)  
			    url = window.URL.createObjectURL(file);
			  } else if (window.webkitURL != undefined) { // webkit or chrome  
			    url = window.webkitURL.createObjectURL(file);
			  }
			  return url;
			},
			change(e) {
			  let files = e.target.files || e.dataTransfer.files;
			  if (!files.length) return;
			  this.panel = true;
			  this.picValue = files[0];

			  this.url = this.getObjectURL(this.picValue);
			  //每次替换图片要重新得到新的url  
			  if (this.cropper) {
			    this.cropper.replace(this.url);
			  }
			  this.panel = true;

			},
			crop() {
			  this.panel = false;
			  var croppedCanvas;
			  var roundedCanvas;
			  if (!this.croppable) {
			    return;
			  }
			  // Crop  
			  croppedCanvas = this.cropper.getCroppedCanvas();
			  // console.log(this.cropper)
			  // Round  
			  roundedCanvas = this.getRoundedCanvas(croppedCanvas);

			  this.headerImage = roundedCanvas.toDataURL();
			  this.postImg()

			},
			getRoundedCanvas(sourceCanvas) {

			  var canvas = document.createElement('canvas');
			  var context = canvas.getContext('2d');
			  var width = sourceCanvas.width;
			  var height = sourceCanvas.height;

			  canvas.width = width;
			  canvas.height = height;

			  context.imageSmoothingEnabled = true;
			  context.drawImage(sourceCanvas, 0, 0, width, height);
			  context.globalCompositeOperation = 'destination-in';
			  context.beginPath();
			  // context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);  
			  context.fill();

			  return canvas;
			},
			postImg() {
			  //这边写图片的上传
			  // console.log(this.headerImage)
			  console.log(this.url)
			  console.log(this.picValue)
			  // console.log(this.headerImage)
			  var fd = new FormData();
              fd.append('file', this.picValue);
              fd.path = '/goods'
              uploadFiles(fd).then(data => {
              		this.cancel()
	              	console.log(data)
	              	this.$toast({
	                  	message: '上传成功',
	                  	duration: 1000
              		})
			  		if(this.goodsId){
			  			this.goodsInfo.goods.goodsImgUrl =  data.originalUrl;
			  		}else{
			  			this.newGoods.goods.goodsImgUrl = data.originalUrl;
			  		}
                  	
              	}).catch(err => {
                  	console.log(err)
                  	this.$toast({
	                  	message: err,
	                  	duration: 1000
              		})
              	})
			},
			closePopup: function(){
				this.cancel()
			},
			cancel: function(){
				this.cropper.destroy()
				this.popupVisible = false;
				this.croppable = false;
				this.panel = false;
				this.picValue = '';
				this.url = '';
				this.$refs.uploads.value = '';
			},
			updateGoods: function(){
				this.$indicator.open();
				//编辑
				if(this.goodsId){
					updateGoodsById(this.goodsInfo.goods.goodsId,this.goodsInfo).then(() => {
						this.$toast({message:'操作成功',duration: 1000})
						this.$indicator.close();
						setTimeout(() => {
							this.$router.back()
						}, 1500)
					})
				}else{
					//新增
					addGoods(this.newGoods).then(() => {
						this.$toast({message:'操作成功',duration: 1000})
						this.$indicator.close();
						setTimeout(() => {
							this.$router.back()
						}, 1500)
					})
				}
			}
		}
	}
</script>
<style scoped>

@import "/static/css/cropper.css";
#goodsDetail{
	min-height: 100%;
	background-color: #f2f2f2;
	overflow: hidden;
}
.goodsDetail-header{
	width: 100%;
	position: fixed;
}
.goodsDetail-content{
    box-sizing: border-box;
	padding-top: 11.73vw;
	padding-bottom: 13.2vw;
}
.goods-imgage{
	display: block;
	width: 100%;
	height: 100%;
	vertical-align: middle;
}
.goods-item{
	padding: 2.66vw;
	overflow: hidden;
	zoom: 1;
	color: #4d4d4d;
	background-color: #fff;
	margin: 1.33vw 0;
}
.row-title{
	width: 24vw;
	font-size: 4.26vw;
	display: inline-block;
	vertical-align: middle;
}
.row-value{
	width: 68vw;
	display: inline-block;
	margin-top: 0.4vw;
	text-align: right;
	font-size: 3.73vw;
	vertical-align: middle;
}
.value-after:after{
	content: '';
	display: inline-block;
	width: 2vw;
	height: 3.73vw;
	background: url(../assets/images/list-more.png) no-repeat;
	background-size: contain;
	vertical-align: middle;
	margin-top: -0.4vw;
	margin-left: 2.66vw;
}
.row-value input{
	width: 100%;
	font-size: 3.73vw;
	padding: 0.66vw;
	box-sizing: border-box;
	border: none;
	outline: none;
}
.goods-intro{
	width: 100%;
	height: 35vw;
	font-size: 3.73vw;
	padding: 0.26vw;
	resize: none;
	vertical-align: middle;
	box-sizing: border-box;
	border: none;
	outline: none;
}
.upload-img{
	width: 32vw;
	height: 32vw;
	line-height: 32vw;
	text-align: center;
}
.upload{
	margin-left: 2vw;
}
.save-goods{
	width: 100%;
	height: 13.2vw;
	line-height: 13.2vw;
	text-align: center;
	background-color: #27bb43;
	font-size: 4.8vw;
	color: #fff;
	position: fixed;
	bottom: 0;
}

/*图片裁剪*/
#button {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #fff;
}
#buttonCancel {
  position: absolute;
  left: 10px;
  top: 10px;
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #ef4f4f;
  color: #fff;
}

.container {
  z-index: 99;
  position: fixed;
  padding-top: 60px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 1);
}

#image {
  max-width: 100%;
}
.upload-wrap{
	position: relative;
	width: 100vw;
	height: 100vh;
}
.upload-btn{
	width:50vw;
	height:50vw;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: -25vw;
	margin-top: -25vw;
	opacity: 0;
	z-index: 2;
}
.upload-bg{
	width:50vw;
	height:50vw;
	background: url(../assets/images/upload-btn.jpg) no-repeat center center;
	background-size: contain;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: -25vw;
	margin-top: -25vw;
	z-index: 1;
	color: #fff;
	text-align: center;
	line-height: 50vw;
}
.close-popup{
	width: 40px;
	height: 40px;
	position: absolute;
	right: 10px;
	top: 10px;
	text-align: center;
	font-size: 8vw;
	background-color: #ef4f4f;
	color: #fff;
	border-radius: 50%;
}
</style>