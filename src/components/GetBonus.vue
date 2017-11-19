<template>
    <div class="getBonus">
        <div class="background"></div>
        <div class="form">

        </div>
        <div class="rules">
            <div class="title">
                <hr class="divider">
                <span class="name">活动规则</span>
                <hr class="divider">
            </div>

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
                rules: [
                    '使用红包时的下单手机号码需要为领取红包时所使用的手机号码',
                    '发放至手机号的红包需在App用手机号注册，或注册的手机号码绑定至共享点餐',
                    '发放至共享点餐账户的红包登录后即可使用',
                    '红包仅限在线支付时使用，每张订单仅限使用一张红包，红包不找零。',
                    '共享点餐保留法律范围内允许的对活动的解释权'
                ]
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
    .rules{
        padding: 0 2.66vw;
    }
    .title{
        font-size: 3.73vw;
        font-weight: bold;
        color: #517914;
        overflow: hidden;
    }
    .title .name,.title .divider{
        display: inline-block;
        float: left;
    }
    .title .name{
        margin: 0 0.5vw;
    }
    .title .divider{
        width: 38.55vw;
        border: 0.166vw solid #517914;
        margin-top: 2.66vw;
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
