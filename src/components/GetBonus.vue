<template>
    <div class="getBonus">
        <div class="background"></div>
        <div class="form">
            <div class="bonus" v-if="hasCoupon">
                <div class="bonus-info">
                    <div class="bonus-value">
                        <div class="bonus-face">￥<span>2</span></div>
                    </div>
                    <div class="bonus-detail">
                        <div class="bonus-condition">满30元可使用</div>
                        <div class="bonus-deadline">有效时间2017.08.10-2017.10.7</div>
                    </div>
                    <div class="use"></div>
                </div>
            </div>
            <div class="todo" v-if="!hasCoupon">
                <input type="text" placeholder="请输入您的手机号码" v-model.number="telephone">
                <button class="getBtn" @click="getCoupon">立即领取</button>
            </div>
        </div>
        <div class="rules">
            <div class="title">活动规则</div>
            <ul class="graph">
                <li v-for="(item,index) in rules" :key="index">{{index+1}} {{item}}</li>
            </ul>

        </div>
    </div>
</template>
<script>
    export default {
        data: function () {
            return{
                hasCoupon: false,
                telephone: '',
                rules: [
                    '使用红包时的下单手机号码需要为领取红包时所使用的手机号码',
                    '发放至手机号的红包需在App用手机号注册，或注册的手机号码绑定至共享点餐',
                    '发放至共享点餐账户的红包登录后即可使用',
                    '红包仅限在线支付时使用，每张订单仅限使用一张红包，红包不找零。',
                    '共享点餐保留法律范围内允许的对活动的解释权'
                ]
            }
        },
        methods: {
            getCoupon: function () {
                var pattern = /^(1)[0-9]{1,}$/;
                var id = this.$route.query.id;
                if(!pattern.test(this.telephone)){
                    this.$toast({message:'请输入正确的手机号',duration: 1000});
                    return
                }

                console.log(this.telephone);

            }
        }
    }
</script>
<style scoped>
    .getBonus{
        background-color: #87cc3e;
    }
    .background{
        width: 100vw;
        height: 66.66vw;
    }

    .form{
        width: 92.26vw;
        height: 38.4vw;
        background-color: #7ec239;
        border-radius: 5px;
        margin: 2.66vw auto;
        text-align: center;
    }
    input[type='text']{
        width: 84vw;
        height: 12vw;
        background-color: #fff;
        outline: none;
        border: none;
        border-radius: 5px;
        text-align: center;
        margin: 4.8vw auto;
    }
    .getBtn{
        width: 60vw;
        height: 12vw;
        font-size: 4.8vw;
        font-weight: 500;
        color: #333;
        background: url("../assets/images/btn-background.png") no-repeat center;
        background-size: cover;
        outline: none;
        border: none;
        margin: 0 auto 4.8vw;
    }
    input::placeholder,
    input:-ms-input-placeholder,
    input:-moz-placeholder,
    input::-webkit-input-placeholder {
        color: #ccc;
    }

    .bonus{
        overflow: hidden;
    }
    .bonus-info{
        width: 85.06vw;
        height: 27.2vw;
        overflow: hidden;
        zoom: 1;
        text-align: left;
        background: url("../assets/images/bonus-background.png") no-repeat;
        background-size: contain;
        margin: 6vw 3.33vw;
    }
    .bonus-value{
        width: 21vw;
        height: 10.66vw;
        padding: 8vw 0;
        text-align: center;
        float: left;
        position: relative;
    }
    .bonus-value:before{
        content: '';
        display: inline-block;
        position: absolute;
        left: 1.13vw;
        top: 0;
        width: 12vw;
        height: 12vw;
        background: url(../assets/images/coupon-icon.png) no-repeat top;
        background-size: contain;
    }
    .bonus-face{
        font-size: 6.91vw;
        color: #eb4f38;
    }
    .bonus-face span{
        font-size: 12.36vw;
        /*font-weight: bold;*/
    }
    .bonus-detail{
        width: 44.66vw;
        height: 10.66vw;
        float: left;
        padding: 10vw 0;
    }
    .bonus-condition{
        font-size: 4.052vw;
        color: #353535;
    }
    .bonus-deadline{
        font-size: 2.93vw;
        color: #999;
        margin-top: 1.33vw;
    }
    .use{
        width: 16vw;
        height: 7.2vw;
        float: left;
        padding: 10vw 0;
        background: url("../assets/images/use-bonus.png") no-repeat center;
        background-size: contain;
    }

    .rules{
        padding: 0 2.66vw;
        overflow: hidden;
    }
    .title{
        display: inline-block;
        font-size: 3.73vw;
        font-weight: bold;
        color: #517914;
        overflow: hidden;
    }
    .title:before, .title:after{
        content: '';
        display: inline-block;
        width: 39.32vw;
        height: 0.133vw;
        background-color: #5fab27;
        vertical-align: middle;
    }
    .graph{
        clear: both;
        list-style: none;
        margin: 2.66vw 0;
        padding: 0;
    }
    .graph li{
        margin: 4vw 0;
        font-size: 3.2vw;
        color: #2f5618;
    }
</style>
