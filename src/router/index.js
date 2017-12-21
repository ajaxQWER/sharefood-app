import Login from '@/components/Login.vue' //登录
import Regist from '@/components/Regist.vue' //注册
import Agreement from '@/components/Agreement.vue' //商家入驻告知书
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
import UpdatePrinter from '@/components/UpdatePrinter.vue' //编辑打印机
import AddPrinter from '@/components/AddPrinter.vue' //添加打印机
import BusinessStatus from '@/components/BusinessStatus.vue' //营业时间
import SetMinDeliveryPrice from '@/components/SetMinDeliveryPrice.vue' //营业时间
import BusinessTime from '@/components/BusinessTime.vue' //营业时间
import ShopContact from '@/components/ShopContact.vue' //联系电话
import SetDelivery from '@/components/SetDelivery.vue' //配送设置
import GoodsCategoryList from '@/components/GoodsCategoryList.vue' //选择商品分类
import GoodsSpecifications from '@/components/GoodsSpecifications.vue' //添加商品规格
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
import GoodsProperties from '@/components/GoodsProperties.vue' //添加属性

// const Login = r => require.ensure([],() => r(require('@/components/Login.vue')), 'Login'); //登录
// const Regist = r => require.ensure([],() => r(require('@/components/Regist.vue')), 'Regist'); //登录
// const Agreement = r => require.ensure([],() => r(require('@/components/Agreement.vue')), 'Agreement'); //登录
// const Help = r => require.ensure([],() => r(require('@/components/Help.vue')), 'Help'); //登录
// const HelpDetail = r => require.ensure([],() => r(require('@/components/HelpDetail.vue')), 'HelpDetail'); //登录
// const Home = r => require.ensure([],() => r(require('@/components/Home.vue')), 'Home'); //登录
// const Goods = r => require.ensure([],() => r(require('@/components/Goods.vue')), 'Goods'); //登录
// const GoodsDetail = r => require.ensure([],() => r(require('@/components/GoodsDetail.vue')), 'GoodsDetail'); //登录
// const Order = r => require.ensure([],() => r(require('@/components/Order.vue')), 'Order'); //登录
// const OrderDetail = r => require.ensure([],() => r(require('@/components/OrderDetail.vue')), 'OrderDetail'); //登录
// const Comment = r => require.ensure([],() => r(require('@/components/Comment.vue')), 'Comment'); //登录
// const ShopDetail = r => require.ensure([],() => r(require('@/components/ShopDetail.vue')), 'ShopDetail'); //登录
// const GoodsCategory = r => require.ensure([],() => r(require('@/components/GoodsCategory.vue')), 'GoodsCategory'); //登录
// const Setting = r => require.ensure([],() => r(require('@/components/Setting.vue')), 'Setting'); //登录
// const UpdatePassword = r => require.ensure([],() => r(require('@/components/UpdatePassword.vue')), 'UpdatePassword'); //登录
// const PrintSetting = r => require.ensure([],() => r(require('@/components/PrintSetting.vue')), 'PrintSetting'); //登录
// const UpdatePrinter = r => require.ensure([],() => r(require('@/components/UpdatePrinter.vue')), 'UpdatePrinter'); //登录
// const AddPrinter = r => require.ensure([],() => r(require('@/components/AddPrinter.vue')), 'AddPrinter'); //登录
// const BusinessStatus = r => require.ensure([],() => r(require('@/components/BusinessStatus.vue')), 'BusinessStatus'); //登录
// const SetMinDeliveryPrice = r => require.ensure([],() => r(require('@/components/SetMinDeliveryPrice.vue')), 'SetMinDeliveryPrice'); //登录
// const BusinessTime = r => require.ensure([],() => r(require('@/components/BusinessTime.vue')), 'BusinessTime'); //登录
// const ShopContact = r => require.ensure([],() => r(require('@/components/ShopContact.vue')), 'ShopContact'); //登录
// const SetDelivery = r => require.ensure([],() => r(require('@/components/SetDelivery.vue')), 'SetDelivery'); //登录
// const GoodsCategoryList = r => require.ensure([],() => r(require('@/components/GoodsCategoryList.vue')), 'GoodsCategoryList'); //登录
// const BusinessAnalyze = r => require.ensure([],() => r(require('@/components/BusinessAnalysis.vue')), 'BusinessAnalyze'); //登录
// const CustomerTendency = r => require.ensure([],() => r(require('@/components/CustomerTendencyChart.vue')), 'CustomerTendency'); //登录
// const OrderQuantity = r => require.ensure([],() => r(require('@/components/OrderQuantity.vue')), 'OrderQuantity'); //登录
// const Turnover = r => require.ensure([],() => r(require('@/components/Turnover.vue')), 'Turnover'); //登录
// const SalesVolume = r => require.ensure([],() => r(require('@/components/SalesVolume.vue')), 'SalesVolume'); //登录
// const SalesRank = r => require.ensure([],() => r(require('@/components/SalesRank.vue')), 'SalesRank'); //登录
// const Notice = r => require.ensure([],() => r(require('@/components/Notice.vue')), 'Notice'); //登录
// const AddActivity = r => require.ensure([],() => r(require('@/components/AddActivity.vue')), 'AddActivity'); //登录
// const ElseActivity = r => require.ensure([],() => r(require('@/components/ElseActivity.vue')), 'ElseActivity'); //登录
// const FirstReduceActivity = r => require.ensure([],() => r(require('@/components/FirstReduceActivity.vue')), 'FirstReduceActivity'); //登录
// const FullReduceActivity = r => require.ensure([],() => r(require('@/components/FullReduceActivity.vue')), 'FullReduceActivity'); //登录
// const FullSendActivity = r => require.ensure([],() => r(require('@/components/FullSendActivity.vue')), 'FullSendActivity'); //登录
// const ActivityList = r => require.ensure([],() => r(require('@/components/ActivityList.vue')), 'ActivityList'); //登录
// const OnSales = r => require.ensure([],() => r(require('@/components/OnSales.vue')), 'OnSales'); //登录
// const OnDiscount = r => require.ensure([],() => r(require('@/components/OnDiscount.vue')), 'OnDiscount'); //登录
// const GoodsManager = r => require.ensure([],() => r(require('@/components/GoodsManager.vue')), 'GoodsManager'); //登录
// const BonusList = r => require.ensure([],() => r(require('@/components/BonusList.vue')), 'BonusList'); //登录
// const AddBonus = r => require.ensure([],() => r(require('@/components/AddBonus.vue')), 'AddBonus'); //登录
// const GetBonus = r => require.ensure([],() => r(require('@/components/GetBonus.vue')), 'GetBonus'); //登录
// const DrawInvoice = r => require.ensure([],() => r(require('@/components/DrawInvoice.vue')), 'DrawInvoice'); //登录

let routes = [{
    path: '/',
    redirect: '/home',
    name: 'index'
},{
    path: '/login',
    component: Login,
    name: 'login'
},{
    path: '/agreement',
    component: Agreement,
    name: 'agreement'
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
  path: '/updatePrinter',
  component: UpdatePrinter,
  name: 'updatePrinter'
},{
  path: '/addPrinter',
  component: AddPrinter,
  name: 'addPrinter'
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
    path: '/addGoodsSpecifications',
    component: GoodsSpecifications,
    name: 'addGoodsSpecifications'
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
},{
    path: '/goodsProperties',
    component: GoodsProperties,
    name: 'goodsProperties'
},{
    path: '*',
    redirect: '/home'
}];

export default routes;
