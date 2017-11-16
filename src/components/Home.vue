<template>
    <div id="home">
        <div class="top-bg">
            <div class="nav-bar bar-title">门店管理</div>
            <div class="admin-info">
                <img :src="UPLOADURL+'/shopLogo/'+loginShopId+'.png'" alt="" class="admin-icon">
                <div class="admin-shop">
                    <h3 class="shop-name">{{loginUser}}</h3>
                    <router-link to="/shopDetail" class="shop-detail">点击查看门店详情</router-link>
                </div>
                <div class="admin-shop-status" v-if="shopSalesData">
                    <div class="shop-status">
                        <img :src="shopStatusImg" alt="">
                    </div>
                    <div class="printer-status">
                        <img :src="printerStatusImg" alt="">
                    </div>
                </div>
            </div>
            <div class="sales-info flex" v-if="shopSalesData">
                <div class="flex-1 sales-item">
                    <div class="sales-title">今日营业额</div>
                    <div class="sales-money">{{formatMoney(shopSalesData.todayTurnover)}}</div>
                    <div class="sales-title-small">昨日{{formatMoney(shopSalesData.yesterdayTurnover)}}</div>
                </div>
                <div class="flex-1 sales-item">
                    <div class="sales-title">今日订单</div>
                    <div class="sales-money">{{shopSalesData.todayOrderQuantity}}</div>
                    <div class="sales-title-small">昨日{{shopSalesData.yesterdayOrderQuantity}}</div>
                </div>
                <div class="flex-1 sales-item">
                    <div class="sales-title">可用余额</div>
                    <div class="sales-money">{{formatMoney(shopSalesData.availableBalance)}}</div>
                    <div class="sales-title-small">可提现{{formatMoney(shopSalesData.amountWithdrawal)}}</div>
                </div>
            </div>
        </div>
        <div class="column-wrap">
            <div class="column flex">
                <router-link to="/goods" class="link">
                    <div class="column-item flex-1">
                        <img src="../assets/images/shop-item1.png" alt="">
                        <div class="column-name">商品</div>
                    </div>
                </router-link>
                <router-link to="/order" class="link">
                    <div class="column-item flex-1">
                        <img src="../assets/images/shop-item2.png" alt="">
                        <div class="column-name">订单</div>
                    </div>
                </router-link>
                <router-link to="/comment" class="link">
                    <div class="column-item flex-1">
                        <img src="../assets/images/shop-item3.png" alt="">
                        <div class="column-name">评价</div>
                    </div>
                </router-link>
            </div>
            <div class="column flex">
                <router-link to="/analyze" class="link">
                    <div class="column-item flex-1">
                        <img src="../assets/images/shop-item4.png" alt="">
                        <div class="column-name">营业分析</div>
                    </div>
                </router-link>
                <router-link to="/shopDetail" class="link">
                    <div class="column-item flex-1">
                        <img src="../assets/images/shop-item5.png" alt="">
                        <div class="column-name">门店信息</div>
                    </div>
                </router-link>
                <router-link to="/activityList" class="link">
                    <div class="column-item flex-1">
                        <img src="../assets/images/shop-item6.png" alt="">
                        <div class="column-name">活动</div>
                    </div>
                </router-link>
            </div>
            <div class="column flex">
                <router-link to="/goodsCategory" class="link">
                    <div class="column-item flex-1">
                        <img src="../assets/images/shop-item7.png" alt="">
                        <div class="column-name">商品分类</div>
                    </div>
                </router-link>
                <router-link to="/setting" class="link">
                    <div class="column-item flex-1">
                        <img src="../assets/images/shop-item11.png" alt="">
                        <div class="column-name">设置</div>
                    </div>
                </router-link>
                <router-link to="/notice" class="link">
                    <div class="column-item flex-1">
                        <img src="../assets/images/shop-item12.png" alt="">
                        <div class="column-name">通知中心</div>
                    </div>
                </router-link>
                <!-- <div class="column-item flex-1 column-null"></div> -->
                <!-- <router-link to="/employee" class="link">
			    	<div class="column-item flex-1">
			    		<img src="../assets/images/shop-item8.png" alt="">
			    		<div class="column-name">员工</div>
			    	</div>
			    </router-link>
		    	<router-link to="/sequence" class="link">
			    	<div class="column-item flex-1">
			    		<img src="../assets/images/shop-item9.png" alt="">
			    		<div class="column-name">桌号</div>
			    	</div>
			    </router-link> -->
            </div>
            <!-- <div class="column flex">
		    	<router-link to="/bills" class="link">
			    	<div class="column-item flex-1">
		    			<img src="../assets/images/shop-item10.png" alt="">
		    			<div class="column-name">对账单</div>
			    	</div>
			    </router-link>
		    	<div class="column-item flex-1 column-null"></div>
		    </div> -->
        </div>
    </div>
</template>
<script>
import { getRealtimestatistics } from '@/api/api'
export default {
    name: 'home',
    data: function() {
        return {
            loginShopId: JSON.parse(localStorage.getItem('seller')).shopId,
            loginUser: JSON.parse(localStorage.getItem('seller')).shopName,
            shopSalesData: null,
            shopStatusImg: '',
            printerStatusImg: ''
        }
    },
    created: function() {
        this.$indicator.open();
        getRealtimestatistics().then(res => {
            console.log(res)
            this.shopSalesData = res;
            if (res.operatingState) {
                this.shopStatusImg = '/static/images/shop-open.png';
            } else {
                this.shopStatusImg = '/static/images/shop-close.png';
            }
            this.printerStatusImg = '/static/images/' + res.printerStatus.toLowerCase() + '.png';
            this.$indicator.close();
        })
    },
    methods: {
        formatMoney: function(money) {
            money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";
            var l = money.split(".")[0].split("").reverse();
            var r = money.split(".")[1];
            var t = "";
            for (var i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            return t.split("").reverse().join("") + "." + r;
        }
    }
}

</script>
<style scoped>
#home {
    min-height: 100%;
    background-color: #f2f2f2;
}

.bar-title {
    text-align: center;
    line-height: 11.73vw;
    font-size: 4.8vw;
    color: #fff;
}

.admin-info {
    overflow: hidden;
    zoom: 1;
    padding: 6.66vw 2.66vw;
}

.admin-shop-status {
    float: right;
    margin-top: 2.66vw;
    margin-left: 2.66vw;
}

.shop-status,
.printer-status {
    float: right;
    margin-left: 1.33vw;
}

.admin-shop-status img {
    display: block;
    float: right;
    width: 10vw;
    height: 10vw;
    border-radius: 2px;
}

.admin-icon {
    width: 16vw;
    height: 16vw;
    border-radius: 50%;
    float: left;
    background-color: #fff;
}

.admin-shop {
    float: left;
    margin-top: 2.66vw;
    margin-left: 2.66vw;
}

.shop-name {
    font-size: 4.26vw;
    margin: 0;
    color: #fff;
}

.shop-detail {
    font-size: 3.73vw;
    color: #fff;
    text-decoration: none;
}

.sales-info {
    width: 89.33vw;
    height: 21.33vw;
    margin: 0 auto;
    border-radius: 8px;
    background-color: #fff;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -moz-box-shadow: 1px 1px 10px 0px #beeccc;
    -webkit-box-shadow: 1px 1px 10px 0px #beeccc;
    box-shadow: 1px 1px 10px 0px #beeccc;
}

.sales-item {
    text-align: center;
    position: relative;
}

.sales-item:not(:first-child):before {
    content: '';
    display: inline-block;
    height: 10.66vw;
    width: 1px;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -5.33vw;
    background-color: #b5b5b5;
}

.sales-title {
    font-size: 3.46vw;
}

.sales-money {
    font-size: 4.26vw;
    color: #08983c;
}

.sales-title-small {
    font-size: 2.66vw;
}

.link {
    color: #000;
    text-decoration: none;
}

.column-wrap {
    background-color: #f2f2f2;
    margin-top: 9.33vw;
    padding-bottom: 4vw;
}

.column {
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}

.column-item {
    width: 33.06vw;
    padding: 4vw 0;
    margin: 0.2666vw 0.1366vw;
    text-align: center;
    background-color: #fff;
}

.column-item img {
    height: 8.8vw;
}

.column-name {
    font-size: 3.73vw;
}

.column-null {
    background-color: #f2f2f2;
}

.flex-item {
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-flex;
    display: flex;
}

</style>
