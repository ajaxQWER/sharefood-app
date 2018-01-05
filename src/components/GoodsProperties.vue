<template>
	<div id="addProperties">
		<div class="nav-bar help-navbar">
	  		<div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
	  		<div class="nav-title">添加属性</div>
		</div>
		<div class="add-properties-content">
            <div class="property-wrap">
                <div class="add-properties-row">
                    <div class="add-properties-col">
                        <span class="row-title">属性名称</span>
                        <input class="property-name" type="text" placeholder="请输入属性名称" v-model="propObj.goodsPropertyName">
                    </div>
                </div>
                <div class="add-properties-row">
                    <div class="add-properties-col text-before">
                        <input class="i-text" maxlength="6" type="text" placeholder="输入属性值，最多4项，每项最多六个字" v-model="propObj.propValue">
                        <button class="add-btn" @click="addPropItem">添加</button>
                    </div>
                    <div class="add-properties-col" v-if="propObj.goodsPropertyValueList.length">
                        <div class="property-item" v-for="(item,index) in propObj.goodsPropertyValueList" :key="index">
                            <span class="property-item-name">{{item.value}}</span><button class="delete-btn" @click="deletePropItem(index)"></button>
                        </div>
                    </div>
                </div>
            </div>
		</div>
		<div class="add-properties-btn" @click="savaProps">保存</div>
	</div>
</template>
<script>
	export default {
		name: 'addProperties',
        data: function(){
            return {
                propObj: {
                    goodsPropertyName: '',
                    propValue: '',
                    goodsPropertyValueList: []
                },
                tempArr: []
            }
        },
        created: function(){
            var propObj = this.$route.query.item ? JSON.parse(this.$route.query.item) : null;
            if(propObj){
                this.propObj = propObj;
            }
        },
		methods:{
            addPropItem: function(){
                if(this.propObj.propValue === ''){
                    this.$toast({ message: '请输入属性值', duration: 1000 });
                    return;
                }
                if (this.propObj.goodsPropertyValueList.length == 4) {
                    this.$toast({ message: '属性值最多4项', duration: 1000 });
                    this.propObj.propValue = '';
                    return;
                }
                if(this.tempArr.indexOf(this.propObj.propValue) != -1){
                    this.$toast({ message: '属性值已存在', duration: 1000 });
                    this.propObj.propValue = '';
                    return;
                }
                this.tempArr.push(this.propObj.propValue);

                this.propObj.goodsPropertyValueList.push({value: this.propObj.propValue});
                this.propObj.propValue = '';
            },
            deletePropItem: function(index){
                this.propObj.goodsPropertyValueList.splice(index,1);
            },
            savaProps: function(){
                if(this.propObj.goodsPropertyName === ''){
                    this.$toast({ message: '请输入属性名称', duration: 1000 });
                    return;
                }
                if(this.propObj.goodsPropertyValueList.length === 0){
                    this.$toast({ message: '请添加属性值', duration: 1000 });
                    return;
                }
                var index = this.$route.query.index || null;
                var propObj = JSON.parse(localStorage.getItem('propObj')) || [];
                if(index != null){
                    propObj[index] = this.propObj;
                }else{
                    propObj.push(this.propObj);
                }
                
                localStorage.setItem('propObj',JSON.stringify(propObj));
                this.$toast({ message: '操作成功', duration: 1000});
                this.$router.isBack = true;
                setTimeout(() =>{
                    this.$router.back();
                },1500)
            }
		}
	}
</script>
<style scoped>
	#addProperties{
		min-height: 100%;
		background-color: #f2f2f2;
        overflow: hidden;
	}
	.add-properties-btn{
	    width: 100%;
	    height: 13.06vw;
	    line-height: 13.06vw;
	    position: fixed;
	    bottom: 0;
        background-color: #27bb43;
	    text-align: center;
	    color: #fff;
	    font-size: 4.8vw;
	}
    .property-wrap{
        margin: 2.66vw 0;
    }
	.add-properties-content{
		box-sizing: border-box;
        height: 100vh;
        overflow: scroll;
        zoom: 1;
	}
    .row-title {
        font-size: 4.26vw;
        display: inline-block;
        float: left;
    }
    .row-title:before {
        content: '*';
        display: inline-block;
        color: #ff0000;
        vertical-align: middle;
        margin-right: 1.33vw;
    }
    .add-properties-col {
        padding: 2vw 2.66vw;
        overflow: hidden;
        zoom: 1;
        color: #4d4d4d;
        background-color: #fff;
    }
    .add-properties-row:first-child {
        border-bottom: 1px solid #f2f2f2;
    }
    .property-name{
        width: 68vw;
        display: inline-block;
        text-align: right;
        font-size: 4.26vw;
        vertical-align: middle;
        border: none;
        outline: none;
        float: right;
    }
    .i-text{
    	width: 70vw;
        height: 3.6vw;
        font-size: 3.72vw;
    	outline: none;
        border: 1px solid #ececec;
        padding: 2.66vw 2vw;
        vertical-align: middle;
        -webkit-appearance: none;
    }
    .text-before:before{
        content: '*';
        display: inline-block;
        color: #ff0000;
        vertical-align: middle;
        margin-right: 1.33vw;
    }
    .add-btn{
        height: 8.92vw;
        line-height: 8.92vw;
    	background-color: #52d565;
		outline: none;
		border: none;
		color: #fff;
		padding: 0 2.66vw;
		margin-left: 2vw;
        font-size: 3.73vw;
        vertical-align: middle;
    }
    .property-item{
        display: inline-block;
		background-color: #f5f5f5;
		padding: 2.2vw 3.2vw;
		margin: 2vw;
        position: relative;
    }
    .delete-btn{
        height: 3.86vw;
        background: url(../assets/images/close-red.png) no-repeat;
        background-size: contain;
        border: none;
        outline: none;
        position: absolute;
        right: -1vw;
        top: -1.5vw;
    }
</style>


