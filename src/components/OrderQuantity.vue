<template>
  <div id="order">
    <div class="order-header">
      <div class="nav-bar help-navbar">
        <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
        <div class="nav-title">订单量趋势图</div>
      </div>
    </div>
    <div class="order-content">
      <div class="chart">
        <IEcharts :option="line"></IEcharts>
      </div>
      <div class="chart-info">
        <div class="table-title">
          <div class="column flex">
            <div class="column-item flex-1">日期</div>
            <div class="column-item flex-1">订单量</div>
          </div>
        </div>
        <table class="date-num">
          <tbody>
          <tr>
            <td>2017/11/06</td>
            <td>5</td>
          </tr>
          <tr>
            <td>2017/11/06</td>
            <td>5</td>
          </tr>
          <tr>
            <td>2017/11/06</td>
            <td>5</td>
          </tr>
          <tr>
            <td>2017/11/06</td>
            <td>5</td>
          </tr>
          <tr>
            <td>2017/11/06</td>
            <td>5</td>
          </tr>
          <tr>
            <td>2017/11/06</td>
            <td>5</td>
          </tr>
          <tr>
            <td>2017/11/06</td>
            <td>5</td>
          </tr>
          </tbody>

        </table>
        <div class="tip">
          Tips:
          <br>
          订单量：只统计已完成的订单数量
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import IEcharts from 'vue-echarts-v3/src/full.vue';
  export default {
    name: 'orderQuantity',
    components: {
      IEcharts
    },
    props: {

    },
    data: () => ({
      loading: true,
      line: {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          splitLine:{
            show: true
          },
          axisLabel: {
            color: '#999'
          },

          data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          splitLine:{
            show:false
          },
          axisLabel: {
            formatter: '{value}',
            color: '#999'

          }
        },
        series: [{
          name: '新客户量',
          type: 'line',
          data: [7,9,8,16,10,12,9],
          itemStyle: {
            normal: {
              borderColor: '#8bc876'
            }
          },
          lineStyle: {
            normal: {
              color: '#4ddb80'
            }
          },
          label: {
            normal: {
              color: '#999',

            }
          }
        }],
        grid: {
          show: true,
          left: '10%',
          right: '10%',
          top: '10%',
          bottom: '10%',
          containLabel: true

        }

      }
    }),
    methods: {

    }
  }
</script>
<style scoped>
  #order{
    min-height: 100%;
    background-color: #f2f2f2;
    overflow: hidden;
  }
  .order-header{
    width: 100%;
    position: fixed;
  }
  .order-content{
    padding: 12vw 0 0;
    overflow: hidden;
  }
  .chart{
    width: 100%;
    height: 54vw;
    background-color: #fff;
  }
  .chart-info{
    width: 100vw;
    height: 104vw;
    position: absolute;
    bottom: 0;
    overflow: hidden;
    background-color: #fff;
  }
  .column{
    width: 100%;
    border-bottom: 1px solid #f2f2f2;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    margin-bottom: 4vw;
  }
  .column-item{
    line-height: 12vw;
    font-size: 4.26vw;
    color: #777;
  }
  .date-num{
    width: 100%;
  }
  tbody tr{
    line-height: 7.33vw;
    text-align: center;
    font-size: 4.26vw;
    color: #777;
  }
  tr td{
    width: 50%;
  }
  tr td:last-child{
    font-size: 3.73vw;
  }
  .tip{
    font-size: 4.26vw;
    color: #777;
    padding: 2.67vw 0 0 4.67vw;
  }
</style>
