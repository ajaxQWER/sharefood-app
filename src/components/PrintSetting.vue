<template>
  <div id="printSetting">
    <div class="setting-header">
      <div class="nav-bar help-navbar">
        <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
        <div class="nav-title">打印设置</div>
      </div>
    </div>
    <div class="setting-content">
      <div class="shopDetail-row" v-if="unbind">
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
            <div class="row-value">未绑定</div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="shopDetail-row">
          <div class="shopDetail-col">
            <div class="row-title">设备ID</div>
            <div class="deviceId">
              <div class="row-value">4025843610</div>
            </div>
          </div>
          <div class="shopDetail-col">
            <div class="row-title">设备状态</div>
            <div class="deviceStatus">
              <div class="row-value">{{status}}</div>
            </div>
          </div>
        </div>
        <button class="unbond">解绑设备</button>
      </div>

    </div>
  </div>
</template>
<script>
  import { getRealtimestatistics } from '@/api/api'
  export default {
    name: 'printSetting',
    data: function() {
      return {
        shopSalesData: null,
        unbind: true,
        status: ''
      }
    },
    created: function(){
      this.$indicator.open();
      getRealtimestatistics().then(res => {
        console.log(res);
        var status = res.printerStatus;
        if(status == 'UNBIND'){
          this.unbind = true;
        }else{
          this.unbind = false;
          if(status == 'ONLINE') this.status = '在线';
          if(status == 'OFFLINE') this.status = '离线';
          if(status == 'ABNORMALITY') this.status = '异常';
          if(status == 'PAPER_DEFICIENCY') this.status = '缺纸';
        }

        this.shopSalesData = res;
        this.$indicator.close();
      })
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
