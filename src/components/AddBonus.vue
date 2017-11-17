<template>
    <div id="setBonus">
        <div class="setBonus-header">
            <div class="nav-bar help-navbar">
                <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
                <div class="nav-title">红包设置</div>
            </div>
        </div>
        <div class="setBonus-content">
            <div class="shopDetail-row">
                <div class="shopDetail-col">
                    <div class="row-title">红包名称</div>
                    <div class="setBonus-name">
                        <input type="text" placeholder="红包名称,最多10个字符" v-model="activityName" maxlength="10">
                    </div>
                </div>
                <div class="shopDetail-col">
                    <div class="row-title">自助领取</div>
                    <div class="setBonus-name">
                        <label for="allow"><input type="radio" name="automatic" id="allow" :value="true" v-model="isAllow">允许</label>
                        <label for="notAllow"><input type="radio" name="automatic" id="notAllow" :value="false" v-model="isAllow">不允许</label>
                    </div>
                </div>
                <div class="shopDetail-col">
                    <div class="row-title">红包金额</div>
                    <div class="setBonus-name">
                        <input type="number" placeholder="红包金额" v-model="activityName">
                    </div>
                </div>
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
                    <div class="row-title">最大领取量</div>
                    <div class="setBonus-name">
                        <input type="number" placeholder="留空为不限制" v-model="activityName">
                    </div>
                </div>
                <div class="shopDetail-col">
                    <div class="row-title">最低消费额度</div>
                    <div class="setBonus-name">
                        <input type="number" placeholder="留空为不限制" v-model="activityName">
                    </div>
                </div>
            </div>
            <button class="save" @click="save()">保存</button>
        </div>
        <mt-datetime-picker ref="start" type="date" @confirm="setBeginTime" :startDate="startDate" :endDate="endDate"></mt-datetime-picker>
        <mt-datetime-picker ref="end" type="date" @confirm="setEndTime" :startDate="startDate" :endDate="endDate"></mt-datetime-picker>
    </div>
</template>
<script>
    import { getActivityLists,addActivity,updateActivity } from '@/api/api'
    export default {
        name: 'setBonus',
        data: function() {
            return {
                beginTime: Date.now(),
                endTime: '',
                startDate: '',
                endDate: '',
                activityName: '',
                isAllow: true
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
                    this.activityName = data.activityName;
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
            save: function() {
                console.log(this.isAllow)
                return
                if (this.endTime && this.beginTime > this.endTime) {
                    this.$toast({
                        message: '结束时间不能小于开始时间',
                        duration: 1500
                    })
                    return;
                }
                if (!this.activityName) {
                    this.$toast({
                        message: '请输入活动名称',
                        duration: 1500
                    })
                    return;
                }
                var activityParams = {
                    activityContent: {
                        content: this.activityName
                    },
                    activityType: "SPECIFIC",
                    beginTime: this.beginTime,
                    endTime: this.endTime,
                    isValid: true,
                }
                var id = this.$route.query.id;
                if(id){
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
    #setBonus {
        min-height: 100%;
        background-color: #f2f2f2;
    }

    .setBonus-header {
        width: 100%;
        position: fixed;
    }

    .setBonus-content {
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

    .setBonus-name {
        display: inline-block;
        height: 6.66vw;
        line-height: 6.66vw;
        float: right;
    }
    .setBonus-name input[type='text'], .setBonus-name input[type='number']{
        width: 64.66vw;
        height: 6vw;
        font-size: 3.72vw;
        text-align: right;
        padding-right: 2.66vw;
        border: none;
        outline: none;
    }
    .setBonus-name label{
        margin-left: 2.66vw;
        vertical-align: middle;
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

</style>
