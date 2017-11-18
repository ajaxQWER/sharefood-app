<template>
    <div id="printSetting">
        <div class="setting-header">
            <div class="nav-bar help-navbar">
                <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
                <div class="nav-title">打印设置</div>
            </div>
        </div>
        <div class="setting-content">
            <div v-if="printer">
                <div class="shopDetail-row" v-if="unbond">
                    <div class="shopDetail-col" @click="openPopup">
                        <div class="row-title">设备ID</div>
                        <div class="bonded">
                            <div class="row-value">绑定设备</div>
                        </div>
                    </div>
                    <div class="shopDetail-col">
                        <div class="row-title">设备状态</div>
                        <div class="deviceStatus">
                            <div class="row-value">{{formatPrinterStatus(printer.printerStatus)}}</div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="shopDetail-row">
                        <div class="shopDetail-col">
                            <div class="row-title">设备ID</div>
                            <div class="deviceId1">
                                <div class="row-value">{{printer.deviceId}}</div>
                            </div>
                        </div>
                        <div class="shopDetail-col">
                            <div class="row-title">设备状态</div>
                            <div class="deviceStatus">
                                <div class="row-value">{{formatPrinterStatus(printer.printerStatus)}}</div>
                            </div>
                        </div>
                        <div class="shopDetail-col">
                            <div class="row-title">打印份数</div>
                            <div class="deviceStatus">
                                <div class="row-value">
                                    <select name="" id="" v-model="printer.copies" class="copies" @change="changeCopies">
                                        <option v-for="n in 9" :value="n" :key="n">{{n}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="unbond" @click="unbind">解绑设备</button>
                </div>
            </div>
        </div>
        <mt-popup v-model="popupVisible3" position="right" class="mint-popup-3" :modal="false">
            <div class="setting-header">
                <div class="nav-bar help-navbar">
                    <div class="back"></div>
                    <div class="nav-title">绑定设备</div>
                </div>
            </div>
            <div class="bindPrinter">
                <div class="shopDetail-row">
                    <div class="shopDetail-col">
                        <div class="row-title">设备ID</div>
                        <div class="deviceId">
                            <input type="text" placeholder="请输入设备ID" v-model="deviceId">
                        </div>
                    </div>
                    <div class="shopDetail-col">
                        <div class="row-title">设备密码</div>
                        <div class="password">
                            <input type="text" placeholder="请输入设备密码" v-model="secretKey">
                        </div>
                    </div>
                </div>
                <div class="bindBtns">
                    <button class="bond" @click="bind">绑定设备</button>
                    <button class="bond red" @click="closePopup">关闭</button>
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import { getPrinterInfo, bindPrinter, unbindPrinter,setCopies } from '@/api/api'
export default {
    name: 'printSetting',
    data: function() {
        return {
            printer: null,
            unbond: true,
            popupVisible3: false,
            deviceId: '',
            secretKey: ''
        }
    },
    created: function() {
        this.getPrinter();
    },
    methods: {
        getPrinter: function() {
            this.$indicator.open();
            getPrinterInfo().then(res => {
                console.log(res);
                var printerStatus = res.printerStatus;

                if (printerStatus == 'UNBIND') {
                    this.unbond = true;
                } else {
                    this.unbond = false;
                }
                this.printer = res;
                this.$indicator.close();
            })
        },
        formatPrinterStatus: function(status) {
            switch (status) {
                case 'UNBIND':
                    return '未绑定';
                case 'ONLINE':
                    return '在线';
                case 'OFFLINE':
                    return '离线';
                case 'ABNORMALITY':
                    return '异常';
                case 'PAPER_DEFICIENCY':
                    return '缺纸';
            }
        },
        openPopup: function() {
            this.popupVisible3 = true;
        },
        bind: function() {
            if (!this.deviceId) {
                this.$toast({
                    message: '请输入设备ID',
                    duration: 1000,
                    className: 'goodscategory-toast'
                });
                return;
            }
            if (!this.secretKey) {
                this.$toast({
                    message: '请输入设备密码',
                    duration: 1000,
                    className: 'goodscategory-toast'
                });
                return;
            }
            var params = {
                deviceId: this.deviceId,
                secretKey: this.secretKey
            };
            console.log(params);
            this.$indicator.open();
            bindPrinter(params).then(res => {
                console.log(res);
                this.$indicator.close();
                this.$toast({ message: '绑定成功', duration: 1000 });
                this.popupVisible3 = false;
                this.deviceId = '';
                this.secretKey = '';
                this.getPrinter();
            })
        },
        unbind: function() {
            this.$messagebox.confirm('确定解绑打印机?').then(action => {
                this.$indicator.open();
                unbindPrinter().then(res => {
                    this.$indicator.close();
                    console.log(res);
                    this.$toast({ message: '解绑成功', duration: 1000 });
                    this.getPrinter();
                })
            }).catch(() => {
                this.$toast({ message: '已取消', duration: 1000 })
            });
        },
        closePopup: function() {
            this.popupVisible3 = false;
            this.deviceId = '';
            this.secretKey = '';
        },
        changeCopies: function(){
            console.log(this.printer.copies)
            this.$indicator.open();
            setCopies(this.printer.copies).then(res => {
                this.$indicator.close();
                this.$toast({ message: '修改成功', duration: 1000 });
            })
        }
    }
}

</script>
<style scoped>
#printSetting {
    min-height: 100%;
    background-color: #f2f2f2;
}

.setting-header {
    width: 100%;
}

.setting-content {
    box-sizing: border-box;
    height: 100vh;
    overflow: hidden;
    zoom: 1;
}

.mint-popup-3 {
    width: 100%;
    height: 100%;
    background-color: #fff;
}

.bindPrinter {
    width: 100%;
    height: 100%;
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

.shopDetail-col:not(:last-child),
.bindPrinter .shopDetail-col {
    border-bottom: 0.13vw solid #f2f2f2;
}

.row-title {
    width: 18vw;
    font-size: 4.26vw;
    display: inline-block;
    float: left;
    line-height: 6.66vw;
    text-align:justify;
    text-justify:distribute-all-lines;/*ie6-8*/
    text-align-last:justify;/* ie9*/
    -moz-text-align-last:justify;/*ff*/
    -webkit-text-align-last:justify;/*chrome 20+*/
}

.row-value {
    width: 21vw;
    text-align: right;
    display: inline-block;
    vertical-align: middle;
    margin-top: 0.8vw;
}

.bonded,
.deviceStatus,
.deviceId1 {
    display: inline-block;
    float: right;
}

.bonded:after {
    content: '';
    display: inline-block;
    width: 2vw;
    height: 3.73vw;
    background: url(../assets/images/list-more.png) no-repeat;
    background-size: contain;
    vertical-align: middle;
    margin-top: 0.8vw;
}

.bond.red {
    background-color: #ef4f4f;
}

.unbond {
    display: block;
    width: 93.33vw;
    height: 10.66vw;
    color: #fff;
    margin: 9.33vw auto;
    background-color: #ef4f4f;
    border: none;
    outline: none;
    border-radius: 6px;
    font-size: 4.26vw;
}

.deviceId,
.password {
    width: 70vw;
    float: left;
    margin-left: 3.33vw;
}

.deviceId input,
.password input {
    display: inline-block;
    width: 100%;
    line-height: 6.66vw;
    border: none;
    outline: none;
    font-size: 4vw;
}

input::placeholder,
input:-ms-input-placeholder,
input:-moz-placeholder,
input::-webkit-input-placeholder {
    color: #959595;
    font-size: 4vw;
}

.bindBtns {
    margin-top: 7.33vw;
}

.bond {
    display: block;
    width: 93.33vw;
    height: 10.66vw;
    color: #fff;
    margin: 2vw auto;
    background: url(../assets/images/help-navbar.jpg) no-repeat center center;
    background-size: cover;
    border: none;
    outline: none;
    border-radius: 6px;
    font-size: 4.26vw;
}
.copies{
    width: 100%;
    color: #4d4d4d;
    direction: rtl;
}
</style>
