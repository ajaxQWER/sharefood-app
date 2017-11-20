<template>
    <div id="minPrice">
        <div class="minPrice-header">
            <div class="nav-bar help-navbar">
                <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
                <div class="nav-title">起送金额设置</div>
            </div>
        </div>
        <div class="minPrice-content">
            <div class="shopDetail-row">
                <div class="shopDetail-col">
                    <div class="row-title">起送金额</div>
                    <div class="minPrice-name">
                        <input type="number" placeholder="请输入金额" v-model.number="minDeliveryPrice">
                    </div>
                </div>
            </div>
            <button class="save" @click="save()">保存</button>
        </div>
    </div>
</template>
<script>
    import { setMinDeliveryPrice } from '@/api/api'
    export default {
        name: 'minPrice',
        data: function() {
            return {
                minDeliveryPrice: '',
            }
        },
        created: function() {
            this.minDeliveryPrice = this.$route.query.minDeliveryPrice;
        },
        methods: {
            save: function() {

                if (!this.minDeliveryPrice) {
                    this.$toast({
                        message: '请输入金额',
                        duration: 1500
                    });
                    return;
                }

                this.$indicator.open();
                setMinDeliveryPrice(this.minDeliveryPrice).then(() => {
                    this.$indicator.close();
                    this.$toast({
                        message: '设置成功',
                        duration: 1000
                    });
                    setTimeout(() => {
                        this.$router.isBack = true;
                        this.$router.back()
                    }, 1500)
                })
            }
        }
    }

</script>
<style scoped>
    #minPrice {
        min-height: 100%;
        background-color: #f2f2f2;
    }

    .minPrice-header {
        width: 100%;
        position: fixed;
    }

    .minPrice-content {
        box-sizing: border-box;
        height: 100vh;
        overflow: hidden;
        zoom: 1;
        padding: 13.06vw 0 14.39vw;
    }

    .shopDetail-row {
        margin-top: 2.66vw;
        background-color: #fff;
    }

    .shopDetail-col {
        padding: 2vw 2.66vw;
        overflow: hidden;
        zoom: 1;
        color: #4d4d4d;
    }

    .shopDetail-col:not(:last-child) {
        border-bottom: 0.13vw solid #f2f2f2;
    }

    .row-title {
        font-size: 4.26vw;
        display: inline-block;
        float: left;
    }

    .minPrice-name {
        display: inline-block;
        height: 6.66vw;
        float: right;
    }

    .minPrice-name input {
        display: block;
        width: 64.66vw;
        height: 6vw;
        font-size: 3.72vw;
        text-align: right;
        padding-right: 2.66vw;
        border: 1px solid #f2f2f2;
        border-radius: 3px;
        outline: none;
    }

    input::placeholder,
    input:-ms-input-placeholder,
    input:-moz-placeholder,
    input::-webkit-input-placeholder {
        color: #ccc;
    }

    .save {
        width: 100%;
        height: 10.66vw;
        line-height: 10.66vw;
        font-size: 4.26vw;
        color: #fff;
        background-color: #0eb745;
        position: fixed;
        bottom: 0;
        border: none;
        outline: none;
    }

</style>
