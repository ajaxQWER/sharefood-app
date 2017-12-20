<template>
	<div id="addProperties">
		<div class="nav-bar help-navbar addProperties-header">
	  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
	  		<div class="nav-title">添加属性</div>
		</div>
		<div class="addProperties-content">
			<div class="addProperties-row">
                <div class="addProperties-col">
                    <div class="row-title"><span>*</span>属性名称</div>
                    <div class="Properties">
                        <input type="text" placeholder="请输入属性名称">
                    </div>
                </div>
                <div class="addProperties-col">
                	<div class="row-title"><span>*</span></div>
                    <div>
                        <input class="iText" type="text" placeholder="输入属性值">
                        <button class="add" @click="">添加</button>
                    </div>
                    <div>
                    	<button class="btn">七分甜</button>
                    	<button class="btn">五分甜</button>
                    	<button class="btn">三分甜</button>
                    	<button class="btn">正常甜</button>
                    	<button class="btn">无糖</button>
                    </div>
                </div>
            </div>
		</div>
		<div class="add-properties" @click="">确认</div>
	</div>
</template>
<script>
	export default {
		name: 'addProperties',
		methods:{

		}
	}
</script>
<style scoped>
	#addProperties{
		min-height: 100%;
		background-color: #f2f2f2;
	}
	.addProperties-header{
		width: 100%;
		position: fixed;
	}
	.add-properties{
	    width: 100%;
	    height: 13.06vw;
	    line-height: 13.06vw;
	    position: fixed;
	    bottom: 0;
	    background: url(./../assets/images/help-navbar.jpg) repeat-y center center;
	    background-size: contain;
	    text-align: center;
	    color: #fff;
	    font-size: 4.8vw;
	}
	.addProperties-content{
		box-sizing: border-box;
        height: 100vh;
        overflow: hidden;
        zoom: 1;
        padding: 13.06vw 0 14.39vw;
	}
	.addProperties-row {
        background-color: #fff;
        border-top: 0.13vw solid #f2f2f2;
    }
	.addProperties-row:first-child {
        margin-top: 2.66vw;
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
    .row-title span {
        color: #ff0000;
        margin-right: 1.33vw;
    }
    .addProperties-col:not(:last-child) {
        border-bottom: 0.13vw solid #f2f2f2;
    }
    .addProperties-col {
        padding: 2vw 2.66vw;
        overflow: hidden;
        zoom: 1;
        color: #4d4d4d;
    }
    .addProperties-row .addProperties-col {
        border: none;
    }

    .row-title{
        float: left;
        vertical-align: middle;
        line-height: 8vw;
    }

    .Properties {
        display: inline-block;
        float: right;
        margin: 0 2.66vw;
    }

    .Properties input {
        display: block;
        width: 64.66vw;
        height: 7vw;
        font-size: 3.72vw;
        text-align: right;
        padding-right: 2.66vw;
        border-radius: 3px;
        outline: none;
        border: none;
    }
    .iText{
    	width: 70vw;
        height: 7vw;
        font-size: 3.72vw;
    	outline: none;
        border: 1px solid #ececec;
    }
    .add{
    	background-color: #52d565;
		outline: none;
		border: none;
		color: #fff;
		padding:2.2vw 3.2vw;
		margin-left: 2vw 
    }
    .btn{
		outline: none;
		border: none;
		background-color: #f5f5f5;
		padding:2.2vw 3.2vw;
		margin: 3vw 2vw 0;
    }
</style>


