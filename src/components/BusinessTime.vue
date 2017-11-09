<template>
	<div id="business">
		<div class="business-header">
			<div class="nav-bar help-navbar">
		  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
		  		<div class="nav-title">营业时间设置</div>
			</div>
		</div>
		<div class="business-content">
			<div class="business-row" @click="openStartPicker">
				<div class="row-title">营业开始时间</div>
				<div class="row-value">{{start}}</div>
			</div>
			<div class="business-row" @click="openEndPicker">
				<div class="row-title">营业结束时间</div>
				<div class="row-value">{{end}}</div>
			</div>
		</div>
		<div class="saveBusiness" @click="saveBusiness">保存</div>
		<mt-datetime-picker
			ref="start"
	  		type="time"
	  		v-model="start"
	  		@confirm="setStartTime">
	    </mt-datetime-picker>
		<mt-datetime-picker
			ref="end"
	  		type="time"
	  		v-model="end"
			@confirm="setEndTime">
	    </mt-datetime-picker>
	</div>
</template>
<script>
	import {setBusinessTime} from '@/api/api'
	export default {
		name: 'business',
		data: function(){
			return {
				start: '',
				end: ''
			}
		},
		created: function(){
			var start = this.$route.query.start;
			var end = this.$route.query.end;
			this.start = start;
			this.end = end;
		},
		methods: {
			setStartTime: function(value){
				this.start = value;
			},
			setEndTime: function(value){
				this.end = value;
			},
			openStartPicker: function(){
				this.$refs.start.open()
			},
			openEndPicker: function(){
				this.$refs.end.open()
			},
			saveBusiness: function(){
				var params = {
					busBeginTime: this.start,
					busEndTime: this.end
				}
				this.$indicator.open();
				setBusinessTime(params).then(() => {
					this.$indicator.close();
					this.$toast({
						message: '修改成功',
						duration: 1000
					})
					this.$router.isBack = true;
					setTimeout(() => {
					   this.$router.back()
					}, 1500)
				})
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
	}
	.business-content{
		padding-top: 5.33vw;
	}
	.business-row{
		height: 10.66vw;
		line-height: 10.66vw;
		overflow: hidden;
		zoom: 1;
	    box-sizing: border-box;
	    padding: 0 2.66vw;
		background-color: #fff;
		color: #4d4d4d;
		font-size: 4.26vw;
	}
	.business-row:not(:last-child){
		border-bottom: 0.13vw solid #f2f2f2;
	}
	.row-title{
		display: inline-block;
		float: left;
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
		margin-top: -0.4vw;
		margin-left: 2.66vw;
	}
	.saveBusiness{
		width: 100%;
		height: 10.66vw;
		text-align: center;
		line-height: 10.66vw;
		background-color: #0eb745;
		color: #fff;
		font-size: 4.26vw;
		position: fixed;
		bottom: 0;
	}
</style>