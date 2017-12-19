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
                    <div class="row-title"><span>*</span>规格名称</div>
                    <div class="specification">
                        <input type="number" placeholder="请输入商品名称">
                    </div>
                </div>
                <div class="shopDetail-col">
                    <div class="row-title"><span>*</span>价格</div>
                    <div class="specification">
                        <input type="number" placeholder="请输入商品价格">
                    </div>
                </div>
                <div class="shopDetail-col">
                    <div class="row-title"><span>*</span>库存</div>
                    <div class="specification">
                        <mt-switch v-model="value">
                            <label v-text="formatVal(value)"></label>
                        </mt-switch>
                    </div>
                </div>
                <div class="shopDetail-col" v-if="!value">
                    <div class="row-title"><span>*</span>库存数量</div>
                    <div class="specification">
                        <input type="number" placeholder="请输入库存数量">
                    </div>
                </div>
                <div class="shopDetail-col">
                    <div class="row-title"><span>*</span>餐盒数量</div>
                    <div class="specification">
                        <input type="number" placeholder="请输入餐盒数量">
                    </div>
                </div>
                <div class="shopDetail-col">
                    <div class="row-title"><span>*</span>餐盒价格</div>
                    <div class="specification">
                        <input type="number" placeholder="请输入餐盒价格">
                    </div>
                </div>
            </div>
            <button class="save">确认</button>
        </div>
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
                value: true
            }
        },
        created: function() {

        },
        methods: {
            formatVal: function(val){
                return val ? '无限' : '有限'
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
        overflow: hidden;
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
        font-size: 4.26vw;
        display: inline-block;
        float: left;
        line-height: 6.66vw;
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

    .row-title{
        float: left;
        vertical-align: middle;
        line-height: 8vw;
    }

    .specification {
        display: inline-block;
        float: right;
        margin: 0 2.66vw;
    }

    .specification input {
        display: block;
        width: 64.66vw;
        height: 6vw;
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

    .row-title span {
        color: #ff0000;
        margin-right: 1.33vw;
    }

</style>
