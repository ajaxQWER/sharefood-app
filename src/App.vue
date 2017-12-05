<template>
    <div id="app">
        <transition :name="transitionName" :appear="true">
            <router-view class="child-view"></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'app',
    data: function() {
        return {
            transitionName: 'slide-left'
        }
    },
    watch: {
        '$route' (to, from) {
            let isBack = this.$router.isBack //  监听路由变化时的状态为前进还是后退
            if (isBack) {
                this.transitionName = 'slide-right'
            } else {
                this.transitionName = 'slide-left'
            }
            this.$router.isBack = false
        }
    }
}

</script>
<style>
body,
html {
    height: 100%;
    background-color: #fafafa;
    -webkit-overflow-scrolling: touch;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
}

input[type="input"],
select{
    background-color: transparent;
    border-color: transparent;
    -webkit-appearance: none;
    outline: none;
}
body {
    margin: 0;
    font-size: 14px;
    font-family: Helvetica Neue, Helvetica, STHeiTi, Arial, sans-serif;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    margin: 0;
    padding: 0;
}

.flex {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-box;
    display: box;
    display: -webkit-flex;
    display: flex;
}

.flex-1 {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -ms-box-flex: 1;
    box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
}

.hide {
    display: none;
}

.show {
    display: block;
}

.top-bg {
    width: 100vw;
    height: 59.73vw;
    background: url(assets/images/top-bg.jpg) no-repeat center center;
    background-size: 100% 100%;
}

.nav-bar {
    height: 11.73vw;
    overflow: hidden;
    zoom: 1;
}

.help-navbar {
    background: url(assets/images/help-navbar.jpg) no-repeat center center;
    background-size: 100% 100%;
}

.nav-title {
    float: left;
    width: 82.93vw;
    height: 100%;
    text-align: center;
    font-size: 4.66vw;
    color: #fff;
    line-height: 11.73vw;
}

.back {
    float: left;
    width: 3.06vw;
    height: 5.6vw;
    margin: 3.065vw 2.66vw;
}

.back img {
    height: 100%;
}

.add-goods {
    width: 100%;
    height: 13.06vw;
    line-height: 13.06vw;
    position: fixed;
    bottom: 0;
    background: url(assets/images/help-navbar.jpg) repeat-y center center;
    background-size: contain;
    text-align: center;
    color: #fff;
    font-size: 4.8vw;
}

.add-goods:before {
    content: '';
    display: inline-block;
    width: 3.73vw;
    height: 3.73vw;
    line-height: 13.06vw;
    background: url(assets/images/add-icon.png) no-repeat;
    background-size: contain;
    margin-right: 2.66vw;
}

.child-view {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: all .4s ease;
}

.slide-left-enter,
.slide-right-leave-active {
    opacity: 1;
    -webkit-transform: translate(100vw, 0);
    transform: translate(100vw, 0);
}

.slide-left-leave-active,
.slide-right-enter {
    opacity: 1;
    -webkit-transform: translate(-100vw, 0);
    transform: translate(-100vw, 0);
}

img[lazy=error] {
    background: url(assets/images/default.jpg) no-repeat center center;
    background-size: cover;
}

img[lazy=loading] {
    background: url(assets/images/loading.svg) no-repeat center center #eaeaea;
    background-size: cover;
}

.empty {
    text-align: center;
    padding: 8vw;
}

.empty img {
    width: 27.86vw;
    height: 28.66vw;
}

.goodscategory-toast {
    z-index: 9999!important;
}

.mint-msgbox input{
    box-sizing: border-box;
    height: 10vw;
    font-size: 3.73vw;
}
.mint-msgbox-btn{
    font-size: 3.73vw;
}
#comment .mt-progress-progress{
    background-color: #f19149;
}
</style>
