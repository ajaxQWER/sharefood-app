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
        <div class="shopDetail-row" v-if="!bind">
          <router-link to="/bondDevice">
            <div class="shopDetail-col">
              <div class="row-title">设备ID</div>
              <div class="bonded">
                <div class="row-value">绑定设备</div>
              </div>
            </div>
          </router-link>
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
              <div class="deviceId">
                <div class="row-value">{{printer.deviceId}}</div>
              </div>
            </div>
            <div class="shopDetail-col">
              <div class="row-title">设备状态</div>
              <div class="deviceStatus">
                <div class="row-value">{{formatPrinterStatus(printer.printerStatus)}}</div>
              </div>
            </div>
          </div>
          <button class="unbond" @click="unbind">解绑设备</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getRealtimestatistics } from '@/api/api'
  import { getPrinterInfo } from '@/api/api'
  import { unbindPrinter } from '@/api/api'
  export default {
    name: 'printSetting',
    data: function() {
      return {
        printer: null,
        bind: true
      }
    },
    created: function(){
      this.getPrinter();
    },
    methods: {
      getPrinter: function () {
        this.$indicator.open();
        getPrinterInfo().then(res => {
          console.log(res);
          var printerStatus = res.printerStatus;

          if(printerStatus == 'UNBIND'){
            this.bind = false;
          }else{
            this.bind = true;
          }
          this.printer = res;
          this.$indicator.close();
        })
      },
      formatPrinterStatus: function (status) {
        switch (status){
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
      unbind: function () {
        unbindPrinter().then(res => {
          console.log(res);
          this.$toast({message:'解绑成功',duration: 1000});
          this.getPrinter();
        })
      }
    }
  }

</script>
<style scoped>
  #printSetting{
    min-height: 100%;
    background-color: #f2f2f2;
  }
  .setting-header{
    width: 100%;
    position: fixed;
  }
  .setting-content{
    box-sizing: border-box;
    height: 100vh;
    overflow: hidden;
    zoom: 1;
    padding: 13.06vw 0 14.39vw;
  }
  .shopDetail-row{
    margin-top: 2.66vw;
    background-color: #fff;
  }
  .shopDetail-col{
    padding: 2vw 2.66vw;
    overflow: hidden;
    zoom: 1;
    color: #4d4d4d;
  }
  .shopDetail-col:not(:last-child){
    border-bottom: 0.13vw solid #f2f2f2;
  }
  .row-title{
    font-size: 4.26vw;
    display: inline-block;
    float: left;
    line-height: 6.66vw;
  }
  .row-value{
    width: 21vw;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    margin-top: 0.8vw;
  }
  .bonded,.deviceStatus,.deviceId{
    display: inline-block;
    float: right;
  }
  .bonded:after{
    content: '';
    display: inline-block;
    width: 2vw;
    height: 3.73vw;
    background: url(../assets/images/list-more.png) no-repeat;
    background-size: contain;
    vertical-align: middle;
    margin-top: 0.8vw;
  }
  .unbond{
    display: block;
    width: 93.33vw;
    height: 10.66vw;
    color: #fff;
    margin: 9.33vw auto;
    background: url(../assets/images/help-navbar.jpg) no-repeat center center;
    background-size: cover;
    border: none;
    outline: none;
    border-radius: 6px;
    font-size: 4.26vw;
  }
</style>
