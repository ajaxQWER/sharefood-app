
import Login from '@/components/Login.vue'
import Regist from '@/components/Regist.vue'
import Help from '@/components/Help.vue'
import HelpDetail from '@/components/HelpDetail.vue'
import Home from '@/components/Home.vue'
let routes = [{
    path: '/login',
    component: Login,
    name: 'login'
},{
    path: '/regist',
    component: Regist,
    name: 'regist'
},{
    path: '/help',
    component: Help,
    name: 'help'
},{
    path: '/helpDetail',
    component: HelpDetail,
    name: 'helpDetail'
},{
    path: '/home',
    component: Home,
    name: 'home'
}];

export default routes;