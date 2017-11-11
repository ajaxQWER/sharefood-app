import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router'
import moment from 'moment'
// import Scrollactive from 'vue-scrollactive'

Vue.use(MintUI);
Vue.use(VueRouter)
// Vue.use(Scrollactive);

// Vue.config.productionTip = false


const router = new VueRouter({
    mode: "history",
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
})


//正式
// Object.defineProperty(Vue.prototype, 'UPLOADURL', {value: 'http://uploads.gongxiangdiancan.com'});
// Object.defineProperty(Vue.prototype, 'BASEURL', {value: 'http://api.gongxiangdiancan.com'});

//测试
Object.defineProperty(Vue.prototype, 'UPLOADURL', {value: process.env.UPLOAD_URL});
Object.defineProperty(Vue.prototype, 'BASEURL', {value: process.env.BASE_URL});

Object.defineProperty(Vue.prototype, 'moment', {value: moment});

Vue.prototype.back = function(){
	router.isBack = true;
	localStorage.removeItem('goodsCategoryList');
	router.back()
}

window.goBack = function(){
	router.isBack = true;
	router.back()
}

//这是必须要写的，用来初始化一些设置
Vue.prototype.setupWebViewJavascriptBridge = function (callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

Vue.prototype.addGoods = function(){
	router.push('/goodsDetail')
}
new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app')
