
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
import BusinessStatus from '@/components/BusinessStatus.vue' //营业时间
import BusinessTime from '@/components/BusinessTime.vue' //营业时间
import ShopContact from '@/components/ShopContact.vue' //联系电话
import SetDelivery from '@/components/SetDelivery.vue' //配送设置
import GoodsCategoryList from '@/components/GoodsCategoryList.vue' //选择商品分类
import BusinessAnalyze from '@/components/BusinessAnalysis.vue'  //营业分析
import CustomerTendency from '@/components/CustomerTendencyChart.vue'  //新客户趋势图
import OrderQuantity from '@/components/OrderQuantity.vue'  //订单量趋势图
import BusinessVolume from '@/components/BusinessVolume.vue'  //营业额趋势图
import SalesVolume from '@/components/SalesVolume.vue'  //销售量
import SalesRank from '@/components/SalesRank.vue'  //销售量排行
import SalesTendency from '@/components/SalesTendency.vue'  //销售量趋势图搜索
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
},{
    path: '/businessStatus',
    component: BusinessStatus,
    name: 'businessStatus'
},{
    path: '/businessTime',
    component: BusinessTime,
    name: 'businessTime'
},{
    path: '/shopContact',
    component: ShopContact,
    name: 'shopContact'
},{
    path: '/setDelivery',
    component: SetDelivery,
    name: 'setDelivery'
},{
    path: '/setGoodsCategory',
    component: GoodsCategoryList,
    name: 'setGoodsCategory'
},{
    path: '/analyze',
    component: BusinessAnalyze,
    name: 'analyze'
},{
    path: '/customerTendency',
    component: CustomerTendency,
    name: 'customerTendency'
},{
    path: '/orderQuantity',
    component: OrderQuantity,
    name: 'orderQuantity'
},{
    path: '/businessVolume',
    component: BusinessVolume,
    name: 'businessVolume'
},{
    path: '/salesVolume',
    component: SalesVolume,
    name: 'salesVolume'
},{
    path: '/salesRank',
    component: SalesRank,
    name: 'salesRank'
},{
    path: '/salesTendency',
    component: SalesTendency,
    name: 'salesTendency'
}];

export default routes;
