<template>
    <div id="setting">
        <div class="setting-header">
            <div class="nav-bar help-navbar">
                <div class="back" @click="back"><img src="../assets/images/white-back.png" alt=""></div>
                <div class="nav-title">设置</div>
            </div>
        </div>
        <div class="setting-content">
            <div class="shopDetail-row">
                <div class="shopDetail-col">
                    <div class="row-title">账号</div>
                    <div class="row-key">{{loginUser}}</div>
                </div>
            </div>
            <div class="shopDetail-row">
                <!-- <router-link class="jump" to="/updatePassword">
                    <div class="shopDetail-col">
                        <div class="row-title">登录密码修改</div>
                        <div class="row-value"></div>
                    </div>
                </router-link>
                <div class="shopDetail-col">
                    <div class="row-title">支付密码修改</div>
                    <div class="row-value"></div>
                </div>
                <div class="shopDetail-col">
                    <div class="row-title">结算设置</div>
                    <div class="row-value"></div>
                </div> -->
                <router-link class="jump" to="/printSetting">
                    <div class="shopDetail-col">
                        <div class="row-title">打印设置</div>
                        <div class="row-value"></div>
                    </div>
                </router-link>
            </div>
            <div class="shopDetail-row">
                <div class="shopDetail-col">
                    <div class="row-title">关于我们</div>
                    <div class="row-value"></div>
                </div>
                <div class="shopDetail-col">
                    <div class="row-title">当前版本</div>
                    <div class="row-key">1.0.0</div>
                </div>
                <div class="shopDetail-col" @click="cleanCache">
                    <div class="row-title">清理缓存</div>
                    <div class="row-key"></div>
                </div>
            </div>
            <div class="shopDetail-row">
                <div class="shopDetail-col contact">客服电话&emsp;<a class="contact" href="tel:028-67673333">028-67673333</a></div>
            </div>
            <button class="login-out-btn" @click="loginOut">退出登录</button>
        </div>
    </div>
</template>
<script>
import { logOut } from '@/api/api'
export default {
    name: 'setting',
    data: function() {
        return {
            loginUser: JSON.parse(localStorage.getItem('seller')).sellerName
        }
    },
    methods: {
        loginOut: function() {
            var isTrue = confirm('确定退出登录?');
            if(isTrue){
                logOut().then(() => {
                    localStorage.clear()
                    this.$toast({ message: '退出成功', duration: 1000 })
                    setTimeout(() => {
                        this.$router.push('/login')
                    }, 1300)
                })
            }
        },
        cleanCache() {
            var ua = navigator.userAgent.toLocaleLowerCase();
            if(ua.indexOf('iphone') == -1){
                //安卓
                try{
                    android.cleanCache()                    
                }catch(e){
                    console.log(e)
                }
            }else{
                //ios
                this.setupWebViewJavascriptBridge(function(bridge) {
                    bridge.callHandler('cleanCache', null, null)
                })
            }
        }
    }
}

</script>
<style scoped>
#setting {
    min-height: 100%;
    background-color: #f2f2f2;
}

.setting-header {
    width: 100%;
}

.setting-content {
    overflow: hidden;
    zoom: 1;
    padding-top: 2.66vw;
}

.shopDetail-row {
    margin-top: 2.66vw;
    background-color: #fff;
}

.shopDetail-col {
    padding: 2.66vw;
    overflow: hidden;
    zoom: 1;
    color: #4d4d4d;
}

.shopDetail-col:not(:last-child) {
    border-bottom: 0.13vw solid #f2f2f2;
}

.row-key {
    display: inline-block;
    float: right;
    font-size: 3.73vw;
    margin-top: 0.8vw;
}

.row-title {
    font-size: 4.26vw;
    display: inline-block;
    float: left;
}

.row-value {
    display: inline-block;
    float: right;
    margin-top: 0.4vw;
}

.row-value:after {
    content: '';
    display: inline-block;
    width: 2vw;
    height: 3.73vw;
    background: url(../assets/images/list-more.png) no-repeat;
    background-size: contain;
    vertical-align: middle;
    margin-top: 0.8vw;
}

.contact {
    color: #08b645;
    text-align: center;
    font-size: 4.26vw;
    text-decoration: none;
}

.login-out-btn {
    display: block;
    width: 93.33vw;
    height: 10.66vw;
    color: #fff;
    margin: 9.33vw auto;
    background-color: #ef4f4f;
    border: none;
    outline: none;
    border-radius: 6px;
    font-size: 4.26vw;
}

.jump {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: #4d4d4d;
}

</style>
