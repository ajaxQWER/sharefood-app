<template>
	<div id="goodsCategory">
		<div class="category-header">
			<div class="nav-bar help-navbar">
		  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
		  		<div class="nav-title">商品分类</div>
			</div>
		</div>
		<div class="category-content">
			<mt-checklist
		      align="right"
		      class="page-part"
		      :max="5"
		      v-model="goodsCategoryList"
		      :options="options">
		    </mt-checklist>
		</div>
		<div class="saveBusiness" @click="saveBusiness">确认</div>

	</div>
</template>
<script>
	import {getGoodsCategoryLists, updateGoodsCategory} from '@/api/api'
	export default {
		name: 'category',
		data: function(){
			return {
				goodsCategoryList: [],
				options: [],
				goodsId: 0
			}
		},
		created: function(){
			var goodsId = parseInt(this.$route.query.goodsId);
			this.goodsId = goodsId;
			var categoryList = this.$route.query.goodsCategoryList || '[]';
			var categoryArray = JSON.parse(categoryList)
			this.$indicator.open();
			getGoodsCategoryLists().then(res => {
				localStorage.setItem('goodsCategoryList',JSON.stringify(res.list));
				res.list.forEach((item) => {
					if(categoryArray.indexOf(item.goodsCategoryId) != -1){
						this.goodsCategoryList.push(item.goodsCategoryId)
					}
					this.options.push({
						label: item.goodsCategoryName,
						value: item.goodsCategoryId
					})
				})
				this.$indicator.close();
			})
		},
		methods: {
			saveBusiness: function(){
				if(this.goodsCategoryList.length == 0){
					this.$toast({
						message: '请选择商品分类',
						duration: 1000
					})
					return;
				}
				if(this.goodsId === 0){
					//新增
					localStorage.setItem('goodsCategory', JSON.stringify(this.goodsCategoryList));
					this.$toast({ message: '操作成功', duration: 1000})
					this.$router.isBack = true;
					setTimeout(() =>{
					    this.$router.back();
					},1500)
				}else{
					//修改
					this.$indicator.open();
					updateGoodsCategory(this.goodsId,this.goodsCategoryList).then(() => {
						this.$indicator.close();
						this.$toast({ message: '操作成功', duration: 1000 })
						localStorage.setItem('goodsCategory', JSON.stringify(this.goodsCategoryList));
						this.$router.isBack = true;
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
	#goodsCategory{
		min-height: 100%;
		background-color: #f2f2f2;
	}
	.category-header{
		width: 100%;
	}
	.category-content{
		padding-top: 5.33vw;
	}
	.category-row{
		height: 10.66vw;
		line-height: 10.66vw;
		overflow: hidden;
		zoom: 1;
	    box-sizing: border-box;
	    padding: 0 2.66vw;
		background-color: #fff;
		color: #4d4d4d;
		font-size: 4.26vw;
	}
	.category-row:not(:last-child){
		border-bottom: 0.13vw solid #f2f2f2;
	}
	.saveBusiness{
		width: 100%;
		height: 10.66vw;
		text-align: center;
		line-height: 10.66vw;
		background-color: #0eb745;
		color: #fff;
		font-size: 4.26vw;
		position: fixed;
		bottom: 0;
	}
</style>
