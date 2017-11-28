
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
import PrintSetting from '@/components/PrintSetting.vue' //打印设置
import BusinessStatus from '@/components/BusinessStatus.vue' //营业时间
import SetMinDeliveryPrice from '@/components/SetMinDeliveryPrice.vue' //营业时间
import BusinessTime from '@/components/BusinessTime.vue' //营业时间
import ShopContact from '@/components/ShopContact.vue' //联系电话
import SetDelivery from '@/components/SetDelivery.vue' //配送设置
import GoodsCategoryList from '@/components/GoodsCategoryList.vue' //选择商品分类
import BusinessAnalyze from '@/components/BusinessAnalysis.vue'  //营业分析
import CustomerTendency from '@/components/CustomerTendencyChart.vue'  //新客户趋势图
import OrderQuantity from '@/components/OrderQuantity.vue'  //订单量趋势图
import Turnover from '@/components/Turnover.vue'  //营业额趋势图
import SalesVolume from '@/components/SalesVolume.vue'  //销售量
import SalesRank from '@/components/SalesRank.vue'  //销售量排行
import Notice from '@/components/Notice.vue'  //通知中心
import AddActivity from '@/components/AddActivity.vue'  //活动
import ElseActivity from '@/components/ElseActivity.vue'  //其他 活动
import FirstReduceActivity from '@/components/FirstReduceActivity.vue'  //首单立减 活动
import FullReduceActivity from '@/components/FullReduceActivity.vue'  //购满就减 活动
import FullSendActivity from '@/components/FullSendActivity.vue'  //购满就送 活动
import ActivityList from '@/components/ActivityList.vue'  //活动管理-列表
import OnSales from '@/components/OnSales.vue'  //特价商品
import OnDiscount from '@/components/OnDiscount.vue'  //特价商品
import GoodsManager from '@/components/GoodsManager.vue'  //特价商品-商品管理
import BonusList from '@/components/BonusList.vue'  //红包管理
import AddBonus from '@/components/AddBonus.vue'  //添加红包
import GetBonus from '@/components/GetBonus.vue'  //领取红包
import DrawInvoice from '@/components/DrawInvoice.vue'  //开票设置
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
  path: '/printSetting',
  component: PrintSetting,
  name: 'printSetting'
},{
    path: '/businessStatus',
    component: BusinessStatus,
    name: 'businessStatus'
},{
    path: '/setMinDeliveryPrice',
    component: SetMinDeliveryPrice,
    name: 'setMinDeliveryPrice'
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
    path: '/turnover',
    component: Turnover,
    name: 'turnover'
},{
    path: '/salesVolume',
    component: SalesVolume,
    name: 'salesVolume'
},{
    path: '/salesRank',
    component: SalesRank,
    name: 'salesRank'
},{
    path: '/activityList',
    component: ActivityList,
    name: 'activityList'
},{
    path: '/activity',
    component: AddActivity,
    name: 'activity'
},{
    path: '/notice',
    component: Notice,
    name: 'notice'
},{
    path: '/elseActivity',
    component: ElseActivity,
    name: 'elseActivity'
},{
    path: '/firstReduceActivity',
    component: FirstReduceActivity,
    name: 'firstReduceActivity'
},{
    path: '/fullReduceActivity',
    component: FullReduceActivity,
    name: 'fullReduceActivity'
},{
    path: '/fullSendActivity',
    component: FullSendActivity,
    name: 'fullSendActivity'
},{
    path: '/onSales',
    component: OnSales,
    name: 'onSales'
},{
    path: '/onDiscount',
    component: OnDiscount,
    name: 'onDiscount'
},{
    path: '/goodsManager',
    component: GoodsManager,
    name: 'goodsManager'
},{
    path: '/bonusList',
    component: BonusList,
    name: 'bonusList'
},{
    path: '/addBonus',
    component: AddBonus,
    name: 'addBonus'
},{
    path: '/getBonus',
    component: GetBonus,
    name: 'getBonus'
},{
    path: '/drawInvoice',
    component: DrawInvoice,
    name: 'drawInvoice'
}];

export default routes;
