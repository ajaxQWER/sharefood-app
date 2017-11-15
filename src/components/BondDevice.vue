<template>
  <div id="printSetting">
    <div class="setting-header">
      <div class="nav-bar help-navbar">
        <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
        <div class="nav-title">打印设置</div>
      </div>
    </div>
    <div class="setting-content">

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
            <input type="password" placeholder="请输入设备密码" v-model="secretKey">
          </div>
        </div>
      </div>
      <button class="bond" @click="bind">绑定设备</button>

    </div>
  </div>
</template>
<script>
  import {bindPrinter} from '@/api/api'
  export default {
    name: 'bondDevice',
    data: function () {
      return {
        deviceId: '',
        secretKey: '',
      }
    },
    methods: {
      bind: function () {
        if(!this.deviceId){
          this.$toast({
            message: '请输入设备ID',
            duration: 1000
          })
          return;
        }
        if(!this.secretKey){
          this.$toast({
            message: '请输入设备密码',
            duration: 1000
          });
          return;
        }
        var params = {
          deviceId: this.deviceId,
          secretKey: this.secretKey
        };
        console.log(params);
        bindPrinter(params).then(res => {
          console.log(res);
          this.$toast({message:'绑定成功',duration: 1000});
          setTimeout(() => {
            this.$router.push('/printSetting')
          }, 1300)
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
  .deviceId,.password{
    float: left;
    margin-left: 3.33vw;
  }
  .deviceId input,.password input{
    display: inline-block;
    line-height: 6.66vw;
    border: none;
    outline: none;
    font-size: 4vw;
  }
  input::placeholder,input:-ms-input-placeholder,
  input:-moz-placeholder,input::-webkit-input-placeholder{
    color: #959595;
    font-size: 4vw;
  }
  .bond{
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
