<template>
    <div id="activity">
        <div class="activity-header">
            <div class="nav-bar help-navbar">
                <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
                <div class="nav-title">购满就送</div>
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
                <div class="shopDetail-col">
                    <div class="row-title">最低金额</div>
                    <div class="activity-name">
                        <input type="number" placeholder="请输入最低消费金额" v-model.number="full">
                    </div>
                </div>
                <div class="shopDetail-col">
                    <div class="row-title">选择红包</div>
                    <div class="activity-name">
                        <select name="redPacket" v-model="couponId" v-if="bonusList.length>0">
                            <option v-for="(item,index) in bonusList" :key="index" :value="item.couponId">{{item.couponName}}&nbsp;{{item.endTime?moment(item.endTime).format('YYYY-MM-DD HH:mm')+'到期':'无限期'}}</option>
                        </select>
                        <div v-else class="selectTips" @click="selectBonus"></div>
                    </div>
                </div>
                <div class="shopDetail-col">
                    <div class="row-title">红包数量</div>
                    <div class="activity-name">
                        <input type="number" placeholder="请输入赠送红包数量" v-model.number="couponCount">
                    </div>
                </div>
            </div>
            <button class="save" @click="saveActivity">保存</button>
        </div>
        <mt-datetime-picker ref="start" type="date" @confirm="handleChange" :startDate="startDate" :endDate="endDate"></mt-datetime-picker>
        <mt-datetime-picker ref="end" type="date" @confirm="handleChange1" :startDate="startDate" :endDate="endDate"></mt-datetime-picker>
    </div>
</template>
<script>
import {getActivityLists,addActivity,updateActivity,getBonusLists} from '@/api/api'
export default {
    name: 'firstReduceActivity',
    data: function() {
        return {
            beginTime: Date.now(),
            endTime: '',
            startDate: '',
            endDate: '',
            couponCount: '',
            couponId: '',
            full: '',
            bonusList: []
        }
    },
    created: function() {
        //最大日期和最小日期限制在当年
        var thisYear = new Date().getFullYear();
        var thisStartDate = thisYear + '-01-01';
        var thisEndDate = thisYear + '-12-31';
        this.startDate = new Date(thisStartDate);
        this.endDate = new Date(thisEndDate);

        getBonusLists({params: {pageSize: 9999}}).then(res => {
            console.log(res)
            this.bonusList = res.list;
        })

        var id = this.$route.query.id;
        if(id){
            this.$indicator.open();
            getActivityLists({params: {activityId: id}}).then(res => {
                console.log(res)
                var data = res.list[0];
                this.beginTime = data.beginTime;
                this.endTime = data.endTime;
                this.full = data.activityContent.full;
                this.couponId = data.activityContent.couponId;
                this.couponCount = data.activityContent.couponCount;
                this.$indicator.close();
            })
        }
    },
    methods: {
        handleChange: function(value) {
            this.beginTime = new Date(value).getTime();
        },
        handleChange1: function(value) {
            this.endTime = new Date(value).getTime();
        },
        selectBeginTime: function() {
            this.$refs.start.open()
        },
        selectEndTime: function() {
            this.$refs.end.open()
        },
        selectBonus: function(){
            if(!this.bonusList.length){
                alert('暂无可用红包，请添加红包后再添加活动');
                this.$router.push('/addBonus');
            }
        },
        saveActivity: function(){
            var activityParams = {
                activityContent: {
                    couponCount: this.couponCount,
                    couponId: this.couponId,
                    full: this.full,
                },
                activityType: 'COMPLIMENTARY',
                beginTime: this.beginTime,
                endTime: this.endTime,
                isValid: true
            }
            
            console.log(activityParams)
            var id = this.$route.query.id;
            if(id){
                this.$indicator.open();
                updateActivity(id, activityParams).then(() => {
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
#activity {
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
.activity-name {
    display: inline-block;
    width: 70vw;
    height: 100%;
    line-height: 6.66vw;
    float: right;
    text-align: right;
}

.activity-name input {
    display: inline-block;
    width: 96%;
    height: 100%;
    font-size: 3.72vw;
    text-align: right;
    outline: none;
    border: none;
    color: #808080;
}

.activity-name select {
    width: 100%;
    height: 6.66vw;
    font-size: 3.72vw;
    color: #808080;
    border: none;
    outline: none;
    direction: rtl;
}

input::placeholder,
input:-ms-input-placeholder,
input:-moz-placeholder,
input::-webkit-input-placeholder {
    color: #808080;
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
.selectTips{
    width: 100%;
    height: 6.66vw;
}
</style>
