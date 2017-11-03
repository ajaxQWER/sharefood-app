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
Object.defineProperty(Vue.prototype, 'UPLOADURL', {value: 'http://uploads.sf.chinagjgx.com'});
Object.defineProperty(Vue.prototype, 'BASEURL', {value: 'http://api.sf.chinagjgx.com'});

Vue.prototype.back = function(){
	router.back()
}

new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app')