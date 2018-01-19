<template>
	<div id="goodsCategory">
		<div class="nav-bar help-navbar">
	  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
	  		<div class="nav-title">商品分类</div>
		</div>
		<div class="goodsCategory-content">
			<ul class="goodsCategory-lists" v-if="!isEmpty">
				<li class="category-item" v-for="(item,index) in goodsCategoryList" :key="index">
					<div class="category-name">{{item.goodsCategoryName}}</div>
					<div class="delete-btn" @click="deleteCategory(item.goodsCategoryId)">删除</div>
				</li>
			</ul>
			<div v-else class="empty">
				<img src="../assets/images/empty-img.png" alt="">
			</div>
		</div>
		<div class="goodsCategory-add-wrap">
			<input type="text" class="goodsCategory-input" placeholder="分类名称,最多8个汉字" maxlength="8" v-model.trim="goodsCategoryName">
			<button class="goodsCategory-save" @click="saveGoodsCategory">添加</button>
		</div>
	</div>
</template>
<script>
	import {getGoodsCategoryLists,deleteGoodsCategoryById,addGoodsCategory} from '@/api/api'
	export default {
		name: 'goodsCategory',
		data: function(){
			return {
				goodsCategoryName: '',
				goodsCategoryList: null,
				isEmpty: false
			}
		},
		created: function(){
			this.getGoodsCategoryList()
		},
		methods: {
			getGoodsCategoryList: function(){
				this.$indicator.open();
				getGoodsCategoryLists({params:{pageSize:99999999}}).then(res=>{
					console.log(res)
					if(res.length == 0){
						this.isEmpty = true
					}else{
						this.isEmpty = false
					}
					this.goodsCategoryList = res;
					this.$indicator.close();
				})
			},
			deleteCategory: function(id){
				var isTrue = confirm('确定删除该分类?');
				if(isTrue){
					this.$indicator.open();
					deleteGoodsCategoryById(id).then(() => {
						this.$indicator.close();
  						this.$toast({message:'删除成功',duration: 1000})
  						setTimeout(() => {
							this.getGoodsCategoryList()  						
  						}, 1500)
					})
				}
			},
			saveGoodsCategory: function(){
				if(!this.goodsCategoryName){
					return
				}
				var param = {
					goodsCategoryName: this.goodsCategoryName
				}
				addGoodsCategory(param).then(() => {
					this.$toast({message:'添加成功',duration: 1000})
					this.goodsCategoryName = ''
					this.getGoodsCategoryList()
				})
			}
		}
	}
</script>
<style scoped>
#goodsCategory{
	min-height: 100%;
	background-color: #f2f2f2;
	overflow: hidden;
}
.goodsCategory-content{
  	box-sizing: border-box;
	height: 100vh;
	overflow: scroll;
	padding-bottom: 22.39vw;
}
.goodsCategory-add-wrap{
	width: 100%;
	height: 10.66vw;
	position: fixed;
	bottom: 0;
	overflow: hidden;
	zoom: 1;
}
.goodsCategory-lists{
	padding: 0;
	list-style: none;
	background-color: #fff;
}
.category-item{
	overflow: hidden;
	zoom: 1;
	line-height: 10.66vw;
	font-size: 4.26vw;
}
.category-item:not(:last-child){
	border-bottom: 1px solid #eee;
}
.category-name{
	width: 80vw;
	padding: 0 2.66vw;
	box-sizing: border-box;
	background-color: #fff;
	color: #4c4c4c;
	float: left;
}
.delete-btn{
	width: 20vw;
	float: left;
	text-align: center;
	background-color: #ef4f4f;
	color: #fff;
}
.goodsCategory-input{
	width: 80vw;
	height: 10.66vw;
	padding: 0 2.66vw;
	box-sizing: border-box;
	background-color: #fff;
	font-size: 4.26vw;
	color: #4c4c4c;
	border: none;
	outline: none;
	float: left;
}
.goodsCategory-save{
	width: 20vw;
	height: 10.66vw;
	text-align: center;
	background-color: #08b645;
	font-size: 4.26vw;
	color: #fff;
	border: none;
	outline: none;
	float: left;
}
</style>
