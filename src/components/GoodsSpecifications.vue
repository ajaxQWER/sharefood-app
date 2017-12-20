<template>
    <div id="specification">
        <div class="specification-header">
            <div class="nav-bar help-navbar">
                <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
                <div class="nav-title">添加规格</div>
            </div>
        </div>
        <div class="specification-content">
            <div class="shopDetail-row">
                <div class="shopDetail-col">
                    <div class="row-title standard-title">规格名称</div>
                    <div class="specification">
                        <input type="text" placeholder="请输入规格名称" v-model="standardObj.goodsSpecificationName">
                    </div>
                </div>
                <div class="shopDetail-col">
                    <div class="row-title standard-title">价格</div>
                    <div class="specification">
                        <input type="number" placeholder="请输入规格价格" v-model.number="standardObj.goodsSpecificationPrice">
                    </div>
                </div>
                <div class="shopDetail-col">
                    <div class="row-title standard-title">库存</div>
                    <div class="specification">
                        <mt-switch v-model="standardObj.infiniteInventory">
                            <label v-text="formatVal(standardObj.infiniteInventory)"></label>
                        </mt-switch>
                    </div>
                </div>
                <div class="shopDetail-col" v-if="!standardObj.infiniteInventory">
                    <div class="row-title standard-title">库存数量</div>
                    <div class="specification">
                        <input type="number" placeholder="请输入库存数量" v-model.number="standardObj.stock">
                    </div>
                </div>
                <div class="shopDetail-col">
                    <div class="row-title standard-title">餐盒数量</div>
                    <div class="specification">
                        <input type="number" placeholder="请输入餐盒数量" v-model.number="standardObj.boxesNumber">
                    </div>
                </div>
                <div class="shopDetail-col">
                    <div class="row-title standard-title">餐盒价格</div>
                    <div class="specification">
                        <input type="number" placeholder="请输入餐盒价格" v-model.number="standardObj.boxesMoney">
                    </div>
                </div>
            </div>
        </div>
        <button class="save" @click="saveStandard">确 定</button>
    </div>
</template>
<script>
    import {
        getActivity,
        addActivity,
        updateActivity
    } from '@/api/api'
    export default {
        name: 'specification',
        data: function() {
            return {
                standardObj: {
                    infiniteInventory: true,
                    boxesMoney: '',
                    boxesNumber: '',
                    goodsSpecificationName: '',
                    goodsSpecificationPrice: '',
                    stock: ''
                }
            }
        },
        created: function() {
            var index = this.$route.query.index;
            // var standardObj = JSON.parse(this.$route.query.standardObj);
        },
        methods: {
            formatVal: function(val){
                return val ? '无限' : '有限'
            },
            saveStandard: function(){
                if(this.standardObj.goodsSpecificationName == ''){
                    this.$toast({ message: '请输入规格名称', duration: 1000})
                    return;
                }
                if(this.standardObj.goodsSpecificationPrice == ''){
                    this.$toast({ message: '请输入规格价格', duration: 1000})
                    return;
                }
                if(!this.standardObj.infiniteInventory && this.standardObj.stock == ''){
                    this.$toast({ message: '请输入库存数量', duration: 1000})
                    return;
                }
                if(this.standardObj.boxesNumber == ''){
                    this.$toast({ message: '请输入餐盒数量', duration: 1000})
                    return;
                }
                if(this.standardObj.boxesMoney == ''){
                    this.$toast({ message: '请输入餐盒价格', duration: 1000})
                    return;
                }
                console.log(this.standardObj)
                // this.$indicator.open();
                localStorage.setItem('standardObj',JSON.stringify(this.standardObj))
                this.$toast({ message: '操作成功', duration: 1000})
                setTimeout(() =>{
                    // this.$indicator.close();
                    this.$router.back();
                },1500)

            }
        }
    }

</script>
<style scoped>
    #specification {
        min-height: 100%;
        background-color: #f2f2f2;
    }

    .specification-header {
        width: 100%;
        position: fixed;
    }

    .specification-content {
        box-sizing: border-box;
        height: 100vh;
        overflow: auto;
        zoom: 1;
        padding: 13.06vw 0 14.39vw;
    }

    .shopDetail-row {
        background-color: #fff;
    }

    .shopDetail-row:first-child {
        margin-top: 2.66vw;
    }

    .shopDetail-row{
        border-top: 0.13vw solid #f2f2f2;
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
        height: 8vw;
        font-size: 4.26vw;
        display: inline-block;
        float: left;
        vertical-align: middle;
        line-height: 8vw;
    }

    .row-value {
        width: 21vw;
        text-align: center;
        display: inline-block;
        vertical-align: middle;
        margin-top: 0.8vw;
    }

    .shopDetail-row .shopDetail-col {
        border: none;
    }

    .specification {
        display: inline-block;
        float: right;
        /*margin: 0 2.66vw;*/
    }

    .specification input {
        display: block;
        width: 64.66vw;
        height: 8vw;
        line-height: 8px;
        font-size: 3.72vw;
        text-align: right;
        padding-right: 2.66vw;
        border-radius: 3px;
        outline: none;
        border: none;
    }

    input::placeholder,
    input:-ms-input-placeholder,
    input:-moz-placeholder,
    input::-webkit-input-placeholder {
        color: #ccc;
    }

    .mint-switch .mint-switch-core {
        display: inline-block;
        position: relative;
        width: 12vw;
        height: 6vw;
        border: 1px solid #d9d9d9;
        border-radius: 3vw;
        box-sizing: border-box;
        background: #d9d9d9;
    }
    .mint-switch-input:checked + .mint-switch-core::before{
        -webkit-transform: scale(0);
        transform: scale(0);
    }
    .mint-switch-core::before{
        width: 12vw;
        height: 6vw;
        background-color: #fdfdfd;
    }
    .mint-switch .mint-switch-input:checked + .mint-switch-core{
        border-color: #4caf50;
        background-color: #4caf50;
    }
    .mint-switch-core::after{
        width: 6vw;
        height: 6vw;
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(0,0,0,0.4);
    }
    .mint-switch-input:checked + .mint-switch-core::after{
        transform: translateX(6vw);
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
    .standard-title:before{
        content: '*';
        display: inline-block;
        color: #ff0000;
        vertical-align: middle;
        margin-right: 1vw;
        margin-top: 1vw;
    }

</style>
