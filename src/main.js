import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router'
// import Scrollactive from 'vue-scrollactive'

Vue.use(MintUI);
Vue.use(VueRouter)
// Vue.use(Scrollactive);

Vue.config.productionTip = false


const router = new VueRouter({
    mode: "history",
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
})


//正式
// Object.defineProperty(Vue.prototype, 'UPLOADURL', {value: 'http://uploads.sf.chinagjgx.com'});
// Object.defineProperty(Vue.prototype, 'BASEURL', {value: 'http://api.sf.chinagjgx.com'});

//测试
Object.defineProperty(Vue.prototype, 'UPLOADURL', {value: 'http://uploadstest.gongxiangdiancan.com'});
Object.defineProperty(Vue.prototype, 'BASEURL', {value: 'http://apitest.sf.chinagjgx.com'});

Vue.prototype.back = function(){
	router.isBack = true;
	router.back()
}
Vue.prototype.addGoods = function(){
	router.push('/goodsDetail')
}
new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app')
