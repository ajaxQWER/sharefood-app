<template>
  <div id="activity">
    <div class="activity-header">
      <div class="nav-bar help-navbar">
        <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
        <div class="nav-title">购满就减</div>
      </div>
    </div>
    <div class="activity-content">
      <div class="shopDetail-row">
        <div class="shopDetail-col">
          <div class="row-title">开始时间</div>
          <div class="row-value"></div>
          <div class="selectTime" @click="focus">{{beginTime}}</div>
        </div>
        <div class="shopDetail-col">
          <div class="row-title">结束时间</div>
          <div class="row-value"></div>
          <div class="selectTime" @click="focus1">{{endTime}}</div>
        </div>
      </div>
      <div class="shopDetail-row full">
        <div class="shopDetail-col">
          <div class="left">
            <div class="row-title">购满</div>
            <div class="activity-name">
              <input type="number" placeholder="0.00">
            </div>
          </div>

          <div class="right">
            <div class="row-title">减</div>
            <div class="activity-name">
              <input type="number" placeholder="0.00">
            </div>
          </div>
        </div>
        <div class="shopDetail-col">
          <div class="left">
            <div class="row-title">购满</div>
            <div class="activity-name">
              <input type="number" placeholder="0.00">
            </div>
          </div>

          <div class="right">
            <div class="row-title">减</div>
            <div class="activity-name">
              <input type="number" placeholder="0.00">
            </div>
          </div>
        </div>
        <div class="shopDetail-col">
          <div class="left">
            <div class="row-title">购满</div>
            <div class="activity-name">
              <input type="number" placeholder="0.00">
            </div>
          </div>

          <div class="right">
            <div class="row-title">减</div>
            <div class="activity-name">
              <input type="number" placeholder="0.00">
            </div>
          </div>
        </div>
        <div class="shopDetail-col">
          <div class="left">
            <div class="row-title">购满</div>
            <div class="activity-name">
              <input type="number" placeholder="0.00">
            </div>
          </div>

          <div class="right">
            <div class="row-title">减</div>
            <div class="activity-name">
              <input type="number" placeholder="0.00">
            </div>
          </div>
        </div>
        <div class="shopDetail-col">
          <div class="left">
            <div class="row-title">购满</div>
            <div class="activity-name">
              <input type="number" placeholder="0.00">
            </div>
          </div>

          <div class="right">
            <div class="row-title">减</div>
            <div class="activity-name">
              <input type="number" placeholder="0.00">
            </div>
          </div>
        </div>
      </div>
      <button class="save">保存</button>
    </div>
    <mt-datetime-picker ref="start" type="date" @confirm="handleChange" :startDate="startDate" :endDate="endDate"></mt-datetime-picker>
    <mt-datetime-picker ref="end" type="date" @confirm="handleChange1" :startDate="startDate" :endDate="endDate"></mt-datetime-picker>
  </div>
</template>
<script>
  export default {
    name: 'fullReduceActivity',
    data: function (){
      return {
        beginTime: this.moment(Date.now()).format('YYYY-MM-DD'),
        endTime: '不限制',
        startDate: '',
        endDate: ''
      }
    },
    created: function(){
      //最大日期和最小日期限制在当年
      var thisYear = new Date().getFullYear();
      var thisStartDate = thisYear + '-01-01';
      var thisEndDate = thisYear + '-12-31';
      this.startDate = new Date(thisStartDate);
      this.endDate = new Date(thisEndDate);
    },
    methods: {
      handleChange: function(value){
        console.log(value);
        this.beginTime = this.moment(value).format('YYYY-MM-DD')
        //TODO
        //fetch data
      },
      handleChange1: function(value){
        console.log(value);
        this.endTime = this.moment(value).format('YYYY-MM-DD')
        //TODO
        //fetch data
      },
      focus: function(){
        this.$refs.start.open()
      },
      focus1: function(){
        this.$refs.end.open()
      }
    }
  }
</script>
<style scoped>
  #activity{
    min-height: 100%;
    background-color: #f2f2f2;
  }
  .activity-header{
    width: 100%;
    position: fixed;
  }
  .activity-content{
    box-sizing: border-box;
    height: 100vh;
    overflow: hidden;
    zoom: 1;
    padding: 13.06vw 0 14.39vw;
  }
  .shopDetail-row{
    background-color: #fff;
  }
  .shopDetail-row:first-child{
    margin-top: 2.66vw;
  }
  .shopDetail-row.full{
    border-top: 0.13vw solid #f2f2f2;
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
    display: inline-block;
    float: right;
    margin-top: 0.4vw;
  }
  .row-value:after{
    content: '';
    display: inline-block;
    width: 2vw;
    height: 3.73vw;
    background: url(../assets/images/list-more.png) no-repeat;
    background-size: contain;
    vertical-align: middle;
    margin-top: 0.8vw;
  }
  .selectTime{
    display: inline-block;
    float: right;
    margin: 0.8vw 0.4vw 0 0;
  }
  .shopDetail-row.full .shopDetail-col{
    border: none;
    margin-top: 2.66vw;
  }
  .full .shopDetail-col .row-title{
    line-height: 8.66vw;
    margin-top: 0.1vw;
  }
  .left{
    float: left;
  }
  .right{
    float: left;
    margin-left: 13.33vw;
  }
  .activity-name{
    display: inline-block;
    float: left;
    margin-left: 2.66vw;
  }
  .activity-name input{
    display: block;
    width: 16.66vw;
    height: 8.66vw;
    font-size: 3.72vw;
    text-align: right;
    padding-right: 2.66vw;
    border: 1px solid #f2f2f2;
    border-radius: 3px;
    outline: none;
  }
  input::placeholder,input:-ms-input-placeholder,
  input:-moz-placeholder,input::-webkit-input-placeholder{
    color: #ccc;
  }
  .save{
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
