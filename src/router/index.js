
import Login from '@/components/Login.vue' //登录
import Regist from '@/components/Regist.vue' //注册
import Help from '@/components/Help.vue' //帮助列表
import HelpDetail from '@/components/HelpDetail.vue' //帮助详情
import Home from '@/components/Home.vue' //主页
import Goods from '@/components/Goods.vue' //商品列表
import GoodsDetail from '@/components/GoodsDetail.vue' //商品详情
import Order from '@/components/Order.vue' //订单列表
import OrderDetail from '@/components/OrderDetail.vue' //订单详情
import Comment from '@/components/Comment.vue' //评论
import ShopDetail from '@/components/ShopDetail.vue' //店铺信息
import GoodsCategory from '@/components/GoodsCategory.vue' //商品分类
import Setting from '@/components/Setting.vue' //设置
import UpdatePassword from '@/components/UpdatePassword.vue' //修改密码
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
},{
    path: '/goodsCategory',
    component: GoodsCategory,
    name: 'goodsCategory'
},{
    path: '/setting',
    component: Setting,
    name: 'setting'
},{
    path: '/updatePassword',
    component: UpdatePassword,
    name: 'updatePassword'
}];

export default routes;