import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router'
import moment from 'moment'
import VueAMap from 'vue-amap'

Vue.use(MintUI);
Vue.use(VueRouter);
Vue.use(VueAMap);

Vue.config.productionTip = false;

// 初始化vue-amap
VueAMap.initAMapApiLoader({
    // 高德的key
    key: 'ff339b1e4c406691fb1af1fc4fa012e5', //正式aaef257a849413a2d9329e1b2a0fbb6e
    // 插件集合
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geolocation','AMap.Geocoder','AMap.DistrictSearch','AMap.Polygon']
});


const router = new VueRouter({
    mode: "history",
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
})
if (/Android/gi.test(navigator.userAgent)) {
    window.addEventListener('resize', function() {
        if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
            window.setTimeout(function() {
                document.activeElement.scrollIntoViewIfNeeded();
            }, 0);
        }
    })
}


Object.defineProperty(Vue.prototype, 'UPLOADURL', {value: process.env.UPLOAD_URL});
Object.defineProperty(Vue.prototype, 'BASEURL', {value: process.env.BASE_URL});

Object.defineProperty(Vue.prototype, 'moment', {value: moment});

Vue.prototype.back = function(){
	router.isBack = true;
	router.back()
}

window.goBack = function(){
    router.isBack = true;
    router.back()
}
window.goodsGoBack = function(){
    var action = confirm('返回将导致该商品数据清空,请谨慎操作');
    if(action == true){
        localStorage.removeItem('standardObj');
        localStorage.removeItem('propObj');
        localStorage.removeItem('goodsCategory');
        localStorage.removeItem('goodsCategoryList');
        localStorage.removeItem('goodsImgUrl');
        localStorage.removeItem('goodsName');
        localStorage.removeItem('goodsIntro');
        localStorage.removeItem('goodsStatus');
        localStorage.removeItem('goodsContent');
        localStorage.removeItem('updateStandardObj');
        localStorage.removeItem('newStandardObj');
        router.isBack = true;
        router.back()
    }
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
