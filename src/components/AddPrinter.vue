<template>
    <div id="update">
        <div class="update-header">
            <div class="nav-bar help-navbar">
                <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
                <div class="nav-title">添加设备</div>
            </div>
        </div>
        <div class="update-content">
            <div class="shopDetail-row">
                <div class="shopDetail-col">
                    <div class="row-title">设备类型</div>
                    <div class="update-name">
                        <select v-model="printer.printerType">
                            <option v-for="(item,index) in printerTypes" :value="item.value" :disabled="item.disabled">{{item.name}}</option>
                        </select>
                    </div>
                </div>
                <div class="shopDetail-col">
                    <div class="row-title">设备编号</div>
                    <div class="update-name">
                        <input type="text" placeholder="请输入设备编号" v-model="printer.deviceId">
                    </div>
                </div>
                <div class="shopDetail-col">
                    <div class="row-title">设备密钥</div>
                    <div class="update-name">
                        <input type="text" placeholder="请输入设备密钥" v-model="printer.deviceSecretKey">
                    </div>
                </div>
                <div class="shopDetail-col">
                    <div class="row-title">纸张规则</div>
                    <div class="update-name">
                        <select v-model="printer.printerPageType">
                            <option v-for="(item,index) in printerPageTypes" :value="item.value" :disabled="item.disabled">{{item.name}}</option>
                        </select>
                    </div>
                </div>
                <div class="shopDetail-col">
                    <div class="row-title">打印数量</div>
                    <div class="update-name">
                        <select v-model="printer.copies">
                            <option disabled value="">请选择</option>
                            <option v-for="(item,index) in copies">{{item}}</option>
                        </select>
                    </div>
                </div>
                <div class="shopDetail-col">
                    <div class="row-title">设备备注</div>
                    <div class="update-name">
                        <input type="text" placeholder="单行输入" v-model="printer.deviceRemark" maxlength="20">
                    </div>
                </div>
            </div>
            <button class="save" @click="save()">保存</button>
        </div>
    </div>
</template>
<script>
    import { addPrinter } from '@/api/api'
    export default {
        name: 'addPrinter',
        data: function() {
            var that = this;
            return {
                printer: {
                    copies: 1,
                    deviceId: "",
                    deviceName: "",
                    deviceRemark: "",
                    deviceSecretKey: "",
                    printerId: 0,
                    printerPageType: "MM58",
                    printerStatus: "",
                    printerType: "CLOUD_YILIANYUN_K4",
                    shopId: 0
                },
                copies: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
                printerTypes: [{
                    name: '易联云K4',
                    value: 'CLOUD_YILIANYUN_K4',
                    disabled: false,
                },{
                    name: 'USB',
                    value: 'USB',
                    disabled: true,
                }],
                printerPageTypes: [{
                    name: '58mm',
                    value: 'MM58',
                    disabled: false,
                },{
                    name: '80mm',
                    value: 'MM80',
                    disabled: true,
                }]
            }
        },
        methods: {
            formatType: function (type) {
                switch (type){
                    case 'CLOUD_YILIANYUN_K4':
                        return '易联云K4';
                    case 'USB':
                        return 'USB';
                    default:
                        return '';
                }
            },
            save: function() {
                console.log(this.printer);
                console.log('========');
                addPrinter(this.printer).then(res => {
                    console.log(res);
                    this.$indicator.close();
                    this.$toast({
                        message: '添加成功',
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
    #update {
        min-height: 100%;
        background-color: #f2f2f2;
    }

    .update-header {
        width: 100%;
        position: fixed;
    }

    .update-content {
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
        font-size: 3.73vw;
        display: inline-block;
        float: left;
    }

    .row-value {
        width: 21vw;
        text-align: left;
        display: inline-block;
        line-height: 8vw;
    }

    .update-name {
        display: inline-block;
        height: 6.66vw;
        float: left;
        margin-left: 2.66vw;
    }

    .update-name input, .update-name select {
        display: inline-block;
        width: 64.66vw;
        height: 6vw;
        font-size: 3.72vw;
        text-align: left;
        padding: 0 2.66vw;
        border: 1px solid #f2f2f2;
        border-radius: 3px;
        outline: none;
    }
    .update-name select{
        width: 30vw;
        -webkit-appearance: menulist;
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
