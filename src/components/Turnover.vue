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
                <IEcharts :option="line" :loading="loading"></IEcharts>
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
                            <td>{{moment(item.finishDayTime).format('YYYY/MM/DD')}}</td>
                            <td>{{formatMoney(item.turnoverCount)}}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="tip">Tips:<br> 营业额：只统计已完成的订单的订单金额</div>
            </div>
        </div>
    </div>
</template>
<script>
import { getTurnover } from '@/api/api';
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
                splitLine: {
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
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value}',
                    color: '#999'

                }
            },
            series: [{
                name: '营业额',
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
            },

        }
    }),
    created: function() {
        var _this = this;
        _this.$indicator.open();
        _this.line.xAxis.data = [];
        _this.line.series[0].data = [];
        _this.loading = true;
        getTurnover({ params: { days: 7 } }).then(res => {
            console.log(res);
            res.sort((a, b) => {
                return a.finishDayTime - b.finishDayTime;
            }).forEach((item) => {
                _this.line.xAxis.data.push(_this.moment(item.finishDayTime).format('MM-DD'));
                _this.line.series[0].data.push(_this.formatMoney(item.turnoverCount));
                _this.loading = false;
            })
            _this.turnover = res;
            _this.$indicator.close();
        })
    },
    methods: {
        formatMoney: function(money) {
            money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";
            var l = money.split(".")[0].split("").reverse();
            var r = money.split(".")[1];
            var t = "";
            for (var i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            return t.split("").reverse().join("") + "." + r;
        }
    }

}

</script>
<style scoped>
#business {
    min-height: 100%;
    background-color: #f2f2f2;
}

.business-header {
    width: 100%;
}

.business-content {
    padding: 0;
}

.chart {
    width: 100%;
    height: 54vw;
    background-color: #fff;
    margin: 0 0 2.66vw;
}

.chart-info {
    width: 100vw;
    overflow: hidden;
    background-color: #fff;
}

.column {
    width: 100%;
    border-bottom: 1px solid #f2f2f2;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    margin-bottom: 4vw;
}

.column-item {
    line-height: 12vw;
    font-size: 4.26vw;
    color: #777;
}

.date-num {
    width: 100%;
}

tbody tr {
    line-height: 7.33vw;
    text-align: center;
    font-size: 4.26vw;
    color: #777;
}

tr td {
    width: 50%;
}

tr td:last-child {
    font-size: 3.73vw;
}

.tip {
    font-size: 4.26vw;
    color: #777;
    padding: 2.67vw 4.67vw;
}

</style>
