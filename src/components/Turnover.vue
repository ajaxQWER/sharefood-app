<template>
  <div id="business">
    <div class="business-header">
      <div class="nav-bar help-navbar">
        <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
        <div class="nav-title">营业额趋势图</div>
      </div>
    </div>
    <div class="business-content">
      <div class="chart">
        <IEcharts :option="line"></IEcharts>
      </div>
      <div class="chart-info">
        <div class="table-title">
          <div class="column flex">
            <div class="column-item flex-1">日期</div>
            <div class="column-item flex-1">营业额</div>
          </div>
        </div>
        <table class="date-num">
          <tbody>
            <tr v-for="(item,index) in turnover">
              <td>{{item.date}}</td>
              <td>{{item.count}}</td>
            </tr>
          </tbody>

        </table>
        <div class="tip">
          Tips:
          <br>
          营业额：只统计已完成的订单的订单金额
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {getTurnover} from '@/api/api';
  import IEcharts from 'vue-echarts-v3/src/full.vue';
  export default {
    name: 'turnover',
    components: {
      IEcharts
    },
    props: {

    },
    data: () => ({
      turnover: null,
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

          data: null
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
          data: null,
          itemStyle: {
            normal: {
              borderColor: '#f8b755'
            }
          },
          lineStyle: {
            normal: {
              color: '#f39800'
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
    created: function () {
      var that = this;
      getTurnover({params:{days:7}}).then(res => {
        console.log(res);
        var weeks = [];
        var turnoverCounts = [];
        var turnover = [];

        for(let i=res.length-1; i>=0; i--){
          let t = res[i].finishDayTime;
          let count = res[i].turnoverCount;
          let obj = {};
          let week = that.formatDate(t).week;
          obj['date'] = that.formatDate(t).date;
          obj['count'] = count;
          console.log(week);
          console.log(obj);

          weeks.push(week);
          turnoverCounts.push(count);
          turnover.push(obj);
        }
        that.line.xAxis.data = weeks;
        that.line.series[0].data = turnoverCounts;
        that.turnover = turnover;
      })
    },
    methods: {
      formatDate: function (t) {
        var date=new Date(t);
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        var day=date.getDate();
        var week = "";
        month = month < 10? '0'+month : month;
        day = day < 10? '0'+day : day;
        switch (date.getDay()) {
          case 0:
            week="周日";
            break;
          case 1:
            week="周一";
            break;
          case 2:
            week="周二";
            break;
          case 3:
            week="周三";
            break;
          case 4:
            week="周四";
            break;
          case 5:
            week="周五";
            break;
          case 6:
            week="周六";
            break;
        }

        return {
          date: year + '/' + month + '/' + day,
          week: week
        }
      }
    }

  }
</script>
<style scoped>
  #business{
    min-height: 100%;
    background-color: #f2f2f2;
  }
  .business-header{
    width: 100%;
    position: fixed;
    z-index: 999;
  }
  .business-content{
    padding: 12vw 0 0;
  }
  .chart{
    width: 100%;
    height: 54vw;
    background-color: #fff;
    margin: 0 0 2.66vw;
  }
  .chart-info{
    width: 100vw;
    height: 104vw;
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
