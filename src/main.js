import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router'

Vue.use(MintUI);
Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
    mode: "history",
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
})
new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app')