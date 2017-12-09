<template>
    <div id="goodsManager">
        <div class="goodsManager-header">
            <div class="nav-bar help-navbar">
                <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
                <div class="nav-title">商品管理</div>
            </div>
        </div>
        <div class="goodsManager-content">
        	<div class="content">
	            <ul class="goodsManager-tips">
	                <li>参加活动的商品需要进行勾选</li>
	                <li>促销价需要大于0并且小于商品原价</li>
	                <li>限购为空或0表示不限购</li>
	            </ul>
	            <table class="goods-table" v-if="!isEmpty">
	                <thead>
	                    <tr>
	                        <th>商品名称</th>
	                        <th>原价</th>
	                        <th v-if="type=='sales'">促销价</th>
	                        <th v-else>折扣</th>
	                        <th>限购</th>
	                        <th>参加活动</th>
	                    </tr>
	                </thead>
	                <tbody>
	                    <tr v-for="(item,index) in goodsLists" :key="index">
	                        <td>{{item.goodsName}}</td>
	                        <td>￥{{item.goodsPrice}}</td>
	                        <td v-if="type=='sales'">
	                            <input type="number" v-model="item.promotionPrice" :disabled="item.hasActivity">
	                        </td>
	                        <td v-else>
	                            <input type="number" v-model="item.discount" :disabled="item.hasActivity">
	                        </td>
	                        <td>
	                            <input type="number" v-model="item.limitation" :disabled="item.hasActivity">
	                        </td>
	                        <td>
	                            <input type="checkbox" name="goods" v-model="item.isActivity" :disabled="item.hasActivity">
	                        </td>
	                    </tr>
	                </tbody>
	            </table>
	            <div v-else>
	                <img src="../assets/images/empty-img.png" alt="">
	            </div>
            </div>
        </div>
        <button class="save" @click="saveActivity">保存</button>
    </div>
</template>
<script>
import { getGoodsLists, setSalesActivityGoods,setDiscountActivityGoods } from '@/api/api'
export default {
    name: 'goodsManager',
    data: function() {
        return {
            isEmpty: false,
            goodsLists: [],
            type: 'sales',
            hasError: false
        }
    },
    created: function() {
        var id = this.$route.query.id;
        var type = this.$route.query.type;
        this.type = type;
        if(type == 'sales'){
        	this.$indicator.open();
        	getGoodsLists({ params: { pageSize: 9999 } }).then(res => {
        	    this.$indicator.close();
        	    if (res.count > 0) {
        	        this.isEmpty = false;
        	        res.list.forEach((item,index) => {
        	        	this.goodsLists.push({
        	        		goodsName: item.goodsName,
        	        		goodsId: item.goodsId,
        	        		goodsPrice: item.goodsPrice,
        	        		promotionPrice: item.activityGoods ? item.activityGoods.specialsPrice : null,
        	        		limitation: item.activityGoods ? item.activityGoods.limitedQuantity : null,
        	        		isActivity: item.activityGoods ? true : false,
        	        		hasActivity: item.activityGoods && (item.activityGoods.activityId != id) ? true : false
        	        	})
        	        })
        	    } else {
        	        this.isEmpty = true;
        	    }
        	})
        }else{
            this.$indicator.open();
            getGoodsLists({ params: { pageSize: 9999 } }).then(res => {
            	console.log(res.list)
                this.$indicator.close();
                if (res.count > 0) {
                    this.isEmpty = false;
                    res.list.forEach((item,index) => {
                    	this.goodsLists.push({
                    		goodsName: item.goodsName,
                    		goodsId: item.goodsId,
        	        		goodsPrice: item.goodsPrice,
                    		discount:  item.activityGoods ? item.activityGoods.discount : null,
                    		limitation: item.activityGoods ? item.activityGoods.limitedQuantity : null,
                    		isActivity: item.activityGoods ? true : false,
                    		hasActivity: item.activityGoods && (item.activityGoods.activityId != id) ? true : false
                    	})
                    })
                } else {
                    this.isEmpty = true;
                }
            })
        }
        console.log(this.goodsLists)
    },
    methods: {
        saveActivity: function() {
        	var id = +this.$route.query.id;
            this.hasError = false;
        	var params = {}
        	this.goodsLists.forEach((item) => {
        		if(item.isActivity && !item.hasActivity){
                    if(this.type == 'sales'){
                        if(item.promotionPrice < 0){
                            this.$toast({
                                message: item.goodsName + '促销价不能小于0元',
                                duration: 2000
                            })
                            this.hasError = true;
                        }
                        if(item.promotionPrice == 0){
                            this.$toast({
                                message: item.goodsName + '促销价不能等于0元',
                                duration: 2000
                            })
                            this.hasError = true;
                        }
                        if(item.promotionPrice > item.goodsPrice){
                            this.$toast({
                                message: item.goodsName + '促销价不能大于原价',
                                duration: 2000
                            })
                            this.hasError = true;
                        }
                        if(item.promotionPrice == item.goodsPrice){
                            this.$toast({
                                message: item.goodsName + '促销价不能等于原价',
                                duration: 2000
                            })
                            this.hasError = true;
                        }
                        params[item.goodsId] = {
                            goodsId: +item.goodsId,
                            activityId: +id,
                            specialsPrice: +item.promotionPrice,
                            limitedQuantity: +item.limitation
                        }
                    }else{
                        if(item.discount < 0){
                            this.$toast({
                                message: item.goodsName + '折扣不能小于0折',
                                duration: 2000
                            })
                            this.hasError = true;
                        }
                        if(item.discount == 0){
                            this.$toast({
                                message: item.goodsName + '折扣不能等于0折',
                                duration: 2000
                            })
                            this.hasError = true;
                        }
                        if(item.discount > 10){
                            this.$toast({
                                message: item.goodsName + '折扣不能大于10折',
                                duration: 2000
                            })
                            this.hasError = true;
                        }
                        if(item.discount == 10){
                            this.$toast({
                                message: item.goodsName + '折扣不能等于10折',
                                duration: 2000
                            })
                            this.hasError = true;
                        }
                        params[item.goodsId] = {
                            goodsId: +item.goodsId,
                            activityId: +id,
                            discount: +item.discount,
                            limitedQuantity: +item.limitation
                        }
                    }
                }
        	})
            if (this.hasError) {
                return;
            }
            console.log(params)
        	if(this.type == 'sales'){
            	this.$indicator.open();
        		setSalesActivityGoods(id,params).then(res => {
        			console.log(res)
            		this.$indicator.open();
            		this.$toast({
            		    message: '操作成功',
            		    duration: 1000
            		})
            		localStorage.setItem('activityId',id)
            		setTimeout(() => {
                        this.$router.isBack = true;
                        this.$router.back()
                    }, 1500)
        		})
        	}else{
		    	this.$indicator.open();
				setDiscountActivityGoods(id,params).then(res => {
					console.log(res)
		    		this.$indicator.open();
		    		this.$toast({
		    		    message: '操作成功',
		    		    duration: 1000
		    		})
		    		localStorage.setItem('activityId',id)
		    		setTimeout(() => {
		                this.$router.isBack = true;
		                this.$router.back()
		            }, 1500)
				})
        	}
        }
    }
}

</script>
<style scoped>
#goodsManager {
    min-height: 100%;
    background-color: #f2f2f2;
}

.goodsManager-header {
    width: 100%;
    position: fixed;
}

.goodsManager-content {
    box-sizing: border-box;
    height: 100vh;
    overflow: hidden;
    zoom: 1;
    padding: 13.06vw 0 12vw;
}
.content{
	overflow: scroll;
	height: 100%;
}
.goodsManager-tips {
    list-style: none;
    margin: 2.66vw 0;
    padding: 5.33vw 2.66vw;
    background-color: #fff;
}

.goodsManager-tips li {
    font-size: 3.73vw;
    color: #808080;
    margin-bottom: 2.66vw;
}

.goodsManager-tips li:before {
    content: '';
    display: inline-block;
    width: 1.6vw;
    height: 1.6vw;
    border-radius: 50%;
    background-color: #3ec845;
    vertical-align: middle;
    margin-right: 1.33vw;
}

.save {
    width: 100%;
    height: 10.66vw;
    line-height: 10.66vw;
    font-size: 4.26vw;
    color: #fff;
    background-color: #0eb745;
    position: absolute;
    bottom: 0;
    border: none;
    outline: none;
}

.goods-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 3.73vw;
    background-color: #fff;
    color: #808080;
}

.goods-table th,
.goods-table td {
    text-align: center;
    line-height: 8vw;
	height: 8vw;
	box-sizing: border-box;
}
.goods-table thead tr,
.goods-table tbody tr:not(:last-child){
	border-bottom: 1px solid #808080;
}
.goods-table th:not(:last-child),
.goods-table td:not(:last-child){
    border-right: 1px solid #808080;
}
.goods-table tbody td:nth-child(1){
	width: 32vw;
}
.goods-table tbody td:nth-child(2){
	width: 18vw;
}
.goods-table tbody td:nth-child(3){
	width: 16.4vw;
}
.goods-table tbody td:nth-child(4){
	width: 16.4vw;
}
.goods-table tbody td:nth-child(3) input,
.goods-table tbody td:nth-child(4) input{
	display: inline-block;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	outline: none;
	border: none;
	padding: 0;
	text-align: center;
    color: #808080;
}

</style>
