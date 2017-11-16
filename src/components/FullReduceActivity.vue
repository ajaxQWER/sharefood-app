<template>
    <div id="reduceActivity">
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
                    <div class="selectTime" @click="selectBeginTime">
                        <div class="row-value">{{this.moment(beginTime).format('YYYY-MM-DD')}}</div>
                    </div>
                </div>
                <div class="shopDetail-col">
                    <div class="row-title">结束时间</div>
                    <div class="selectTime" @click="selectEndTime">
                        <div class="row-value">{{endTime?this.moment(endTime).format('YYYY-MM-DD'):''}}</div>
                    </div>
                </div>
            </div>
            <div class="shopDetail-row full">
                <p class="tips"><span>*</span>活动金额必须由小到大依次设置</p>
                <div class="shopDetail-col" v-for="(item,index) in activityObj" :key="index">
                    <div class="left">
                        <div class="row-title">购满</div>
                        <div class="activity-name">
                            <input type="number" placeholder="0.00" v-model="item.money">
                        </div>
                        <div class="row-title">减</div>
                        <div class="activity-name">
                            <input type="number" placeholder="0.00" v-model="item.reduceMoney">
                        </div>
                    </div>
                    <div class="operate">
                        <button class="btn add-btn" @click="addActivityItem">增加</button>
                        <button class="btn del-btn" @click="removeActivityItem(index)">删除</button>
                    </div>
                </div>
            </div>
            <button class="save" @click="saveActivity">保存</button>
        </div>
        <mt-datetime-picker ref="start" type="date" @confirm="setBeginTime" :startDate="startDate" :endDate="endDate"></mt-datetime-picker>
        <mt-datetime-picker ref="end" type="date" @confirm="setEndTime" :startDate="startDate" :endDate="endDate"></mt-datetime-picker>
    </div>
</template>
<script>
import { getActivityLists,addActivity,updateActivity } from '@/api/api'
export default {
    name: 'fullReduceActivity',
    data: function() {
        return {
            beginTime: Date.now(),
            endTime: '',
            startDate: '',
            endDate: '',
            activityObj: [{
                money: null,
                reduceMoney: null
            }]
        }
    },
    created: function() {
        //最大日期和最小日期限制在当年
        var thisYear = new Date().getFullYear();
        var thisStartDate = thisYear + '-01-01';
        var thisEndDate = thisYear + '-12-31';
        this.startDate = new Date(thisStartDate);
        this.endDate = new Date(thisEndDate);

        var id = this.$route.query.id;
        if(id){
            this.$indicator.open();
            getActivityLists({params: {activityId: id}}).then(res => {
                console.log(res)
                var data = res.list[0];
                this.beginTime = data.beginTime;
                this.endTime = data.endTime;

                this.activityObj = [];

                for (var i = 1; i <= 5; i++){
                    if(data.activityContent["full" + i] && data.activityContent["subtract" + i]) {
                        var obj = {
                            money: data.activityContent["full" + i],
                            reduceMoney: data.activityContent["subtract" + i]
                        }
                        this.activityObj.push(obj);
                    }
                }

                this.$indicator.close();
            })
        }
    },
    methods: {
        setBeginTime: function(value) {
            this.beginTime = new Date(value).getTime();
        },
        setEndTime: function(value) {
            this.endTime = new Date(value).getTime();
        },
        selectBeginTime: function() {
            this.$refs.start.open()
        },
        selectEndTime: function() {
            this.$refs.end.open()
        },
        addActivityItem: function() {
            if (this.activityObj.length == 5) {
                this.$toast({
                    message: '最多添加5个活动',
                    duration: 1000
                })
                return;
            }
            this.activityObj.push({
                money: null,
                reduceMoney: null
            })
        },
        removeActivityItem: function(index) {
            this.activityObj.splice(index, 1)
        },
        saveActivity: function() {
            if (this.endTime && this.beginTime > this.endTime) {
                this.$toast({
                    message: '结束时间不能小于开始时间',
                    duration: 1500
                })
                return;
            }
            var activityContent = {};
            this.activityObj.forEach((item, index) => {
                if(this.activityObj[index]['money'] && this.activityObj[index]['reduceMoney']){
                    activityContent['full' + (index + 1)] = item.money
                    activityContent['subtract' + (index + 1)] = item.reduceMoney
                }
            })
            var activityParams = {
                activityContent: activityContent,
                activityType: "DELGOLD",
                beginTime: this.beginTime,
                endTime: this.endTime,
                isValid: true,
            }
            var id = this.$route.query.id;
            if(id){
                this.$indicator.open();
                updateActivity(id, activityParams).then(res => {
                    console.log(res)
                    this.$indicator.close();
                    this.$toast({
                        message: '修改成功',
                        duration: 1000
                    })
                    setTimeout(() => {
                        this.$router.isBack = true;
                        this.$router.back()
                    }, 1500)
                })
            }else{
                this.$indicator.open();
                addActivity(activityParams).then(() => {
                    this.$indicator.close();
                    this.$toast({
                        message: '添加成功',
                        duration: 1000
                    })
                    setTimeout(() => {
                        this.$router.isBack = true;
                        this.$router.back()
                    }, 1500)
                })
            }
        }
    }
}

</script>
<style scoped>
#reduceActivity {
    min-height: 100%;
    background-color: #f2f2f2;
}

.activity-header {
    width: 100%;
    position: fixed;
}

.activity-content {
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

.shopDetail-row.full {
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

.selectTime {
    display: inline-block;
    float: right;
}

.selectTime:after {
    content: '';
    display: inline-block;
    width: 2vw;
    height: 3.73vw;
    background: url(../assets/images/list-more.png) no-repeat;
    background-size: contain;
    vertical-align: middle;
    margin-top: 0.8vw;
}

.shopDetail-row.full .shopDetail-col {
    border: none;
}

.left {
    float: left;
    vertical-align: middle;
}
.left .row-title{
    line-height: 8vw;
}

.activity-name {
    display: inline-block;
    float: left;
    margin: 0 2.66vw;
}

.activity-name input {
    display: inline-block;
    width: 12vw;
    line-height: 6.5vw;
    font-size: 3.72vw;
    text-align: center;
    border-radius: 3px;
    outline: none;
    text-align: center;
    border: 1px solid #808080;
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

.tips {
    padding: 0 2.66vw;
}

.tips span {
    color: #ff0000;
    margin-right: 1.33vw;
}

.operate {
    float: right;
    margin-left: 1.33vw;
    vertical-align: middle;
}

.btn {
    display: inline-block;
    width: 16vw;
    height: 8.66vw;
    font-size: 3.72vw;
    text-align: center;
    margin: 0 0.33vw;
    border-radius: 3px;
    outline: none;
    border: none;
    color: #fff;
}

.add-btn {
    background-color: #0bb745;
}

.del-btn {
    background-color: #ef4f4f;
}

</style>
