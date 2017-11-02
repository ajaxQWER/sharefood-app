
import Login from '@/components/Login.vue'
import Regist from '@/components/Regist.vue'
import Help from '@/components/Help.vue'
import HelpDetail from '@/components/HelpDetail.vue'
import Home from '@/components/Home.vue'
import Goods from '@/components/Goods.vue'
import GoodsDetail from '@/components/GoodsDetail.vue'
import Order from '@/components/Order.vue'
import OrderDetail from '@/components/OrderDetail.vue'
import Comment from '@/components/Comment.vue'
import ShopDetail from '@/components/ShopDetail.vue'
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
},{
    path: '/goods',
    component: Goods,
    name: 'goods'
},{
    path: '/goodsDetail',
    component: GoodsDetail,
    name: 'goodsDetail'
},{
    path: '/order',
    component: Order,
    name: 'order'
},{
    path: '/orderDetail',
    component: OrderDetail,
    name: 'orderDetail'
},{
    path: '/comment',
    component: Comment,
    name: 'comment'
},{
    path: '/shopDetail',
    component: ShopDetail,
    name: 'shopDetail'
}];

export default routes;