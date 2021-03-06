import MintUI from 'mint-ui'
import axios from 'axios';

var ajax = axios.create({
    baseURL: process.env.BASE_URL, //测试
    // baseURL: 'http://api.gongxiangdiancan.com', //正式服
    headers: {},
    timeout: 10000,
    withCredentials: true, //cookie
    crossDomain: true //跨域
});
//添加一个请求拦截器
ajax.interceptors.request.use(function(config) {
    //在请求发出之前进行一些操作
    if (localStorage.getItem('jwt')) {
        config.headers.TOKEN = localStorage.getItem('jwt');
    }
    return config;
}, function(err) {
    console.error(err);
    MintUI.Toast({message:'请求发生错误,请稍后再试!',duration: 1500,className:'goodscategory-toast'});
    MintUI.Indicator.close();
    //Do something with request error
    return Promise.reject(err);
});
//添加一个响应拦截器
ajax.interceptors.response.use(function(res) {
    //在这里对返回的数据进行处理
    if (!res.data.status) {
        MintUI.Toast({message:res.data.message,duration: 1500,className:'goodscategory-toast'});
        MintUI.Indicator.close();
        if(res.data.errorCode == 401){
            console.log('请登录')
            location.href = '/login'
        }
        throw new Error(res.data.message);
    }

    return (res.data.data?res.data.data:res.data.status);
}, function(err) {
    console.error(err);
    MintUI.Toast({message:'响应发生错误,请稍后再试!',duration: 1500,className:'goodscategory-toast'});
    MintUI.Indicator.close();
    //Do something with response error
    return Promise.reject(err);
})




//登录
export const loginByCode = params => {
    return ajax.post('seller/seller/loginByCode', params);
};
export const loginBySecretKey = params => {
    return ajax.post('seller/seller/loginBySecretKey', params);
};
export const logOut = () => {
    return ajax.post('seller/seller/logout');
};

//登录遇到问题文章
export const getArticleListByCategoryId = id => {
    return ajax.get('commons/article', id);
};
export const getArticleById = id => {
    return ajax.get('commons/article/' +  id);
};


//首页数据
export const getRealtimestatistics = params => {
    return ajax.get('seller/realtimestatistics', params);
};

//商品分类
export const getGoodsCategoryLists = params => {
    return ajax.get('seller/goodsCategory', params);
};
export const addGoodsCategory = params => {
    return ajax.put('seller/goodsCategory', params);
};
export const deleteGoodsCategoryById = id => {
    return ajax.delete('seller/goodsCategory/' + id);
};
export const updateGoodsCategory = (id, params) => {
    return ajax.post('seller/goods/updateCategory/' + id, params);
};

//获取商品列表
export const getGoodsLists = params => {
    return ajax.get('seller/goods', params);
};
//删除商品
export const deleteGoodsById = id => {
    return ajax.get('seller/goods/' + id);
};
//下架商品
export const soldOutGoods = paramas => {
    return ajax.post('seller/goods/soldOut', paramas);
};
//上架商品
export const putAwayGoods = paramas => {
    return ajax.post('seller/goods/putaway', paramas);
};
//查询商品详情
export const getGoodsById = id => {
    return ajax.get('seller/goods/' + id);
};
//修改商品
export const updateGoodsById = (goodsId,params) => {
    return ajax.post('seller/goods/' + goodsId, params);
};
//添加商品
export const addGoods = params => {
    return ajax.put('seller/goods', params);
};


//获取订单
export const getOrderList = params => {
    return ajax.get('seller/order/', params);
};
//取消订单
export const cancelOrderById = params => {
    return ajax.put('seller/order/orderCancel', params);
};
//完成订单
export const finishOrderById = orderId => {
    return ajax.put('seller/order/setFinished/' + orderId);
};
//确认接单
export const acceptOrderById = orderId => {
    return ajax.put('seller/order/confirmReceipt/' + orderId);
};
//设置订单为配送
export const setOrderShipping = orderId => {
    return ajax.put('seller/order/setShipping/' + orderId);
};
//获取订单详情
export const getOrderById = orderId => {
    return ajax.get('seller/order/' + orderId);
};
export const getPositionById = orderId => {
    return ajax.get('seller/order/geoInfo/' + orderId);
};
export const getCarrierById = orderId => {
    return ajax.get('seller/order/carrier/' + orderId);
};


//获取店铺信息
export const getShopDetail = () => {
    return ajax.get('seller/shopDetail');
};
//获取店铺信息
export const updatePwd = params => {
    return ajax.post('api/user/secretkey', params);
};

//店铺总评
export const getShopAppraiseHead = () => {
    return ajax.get('seller/shopAppraise/shopAppriseStatistics');
};
//店铺评价
export const getShopAppraise = params => {
    return ajax.get('seller/shopAppraise', params);
};
//店铺评价详情
export const getShopAppraiseById = id => {
    return ajax.get('seller/shopAppraise/' + id);
};
//店家回复
export const commentReply = params => {
    return ajax.put('seller/reply', params);
};

//营业状态-营业
export const setBusinessOpen = () => {
    return ajax.put('seller/shopDetail/operatingState');
};
//营业状态-歇业
export const setBusinessClose = () => {
    return ajax.delete('seller/shopDetail/operatingState');
};
//设置营业时间
export const setBusinessTime = params => {
    return ajax.put('seller/shopDetail/busTime', params);
};
//设置联系电话
export const setBusinessPhoneNumber = phoneNumber => {
    return ajax.put('seller/shopDetail/takeOutPhone/' + phoneNumber);
};
//设置起送金额
export const setMinDeliveryPrice = minDeliveryPrice => {
    return ajax.put('seller/shopDetail/updateMinDeliveryPrice/' + minDeliveryPrice);
};



//新客户趋势图
export const getNewCustomerTendency = params => {
    return ajax.get('seller/analysis/newCustomer', params);
};
//订单量趋势图
export const getOrderQuantity = params => {
    return ajax.get('seller/analysis/orderQuantity', params);
};
//订单量趋势图
export const getTurnover = params => {
    return ajax.get('seller/analysis/turnover', params);
};
//销售量趋势图
export const getSalesTendency = params => {
    return ajax.get('seller/analysis/goodsSales', params);
};
//销售量排行
export const getSalesRank = params => {
    return ajax.get('seller/analysis/salesRank', params);
};

//获取打印机信息
export const getPrinterInfo = () => {
  return ajax.get('seller/printer');
};
//绑定打印机
export const bindPrinter = params => {
  return ajax.post('seller/printer/bind', params);
};
//解绑打印机
export const unbindPrinter = () => {
  return ajax.post('seller/printer/unBind');
};
//设置打印份数
export const setCopies = copies => {
  return ajax.post('seller/printer/copies/' + copies);
};



//通知中心
export const getNoticeLists = params => {
    return ajax.get('seller/notice', params);
};
//删除某条通知
export const deleteNoticeById = id => {
    return ajax.delete('seller/notice/' + id);
};

//获取活动列表
export const getActivityLists = params => {
    return ajax.get('seller/activity', params);
};
//删除活动
export const deleteActivityById = activityId => {
    return ajax.delete('seller/activity/' + activityId);
};
//添加活动
export const addActivity = params => {
    return ajax.put('seller/activity', params);
};
//修改活动
export const updateActivity = (id, params) => {
    return ajax.post('seller/activity/' + id, params);
};
//修改活动
export const getActivityGoods = id => {
    return ajax.get('seller/activityGoods/' + id);
};
//特价商品
export const setSalesActivityGoods = (id,params) => {
    return ajax.put('seller/activity/specialsGoods/' + id, params);
};
//打折商品
export const setDiscountActivityGoods = (id,params) => {
    return ajax.put('seller/activity/discountGoods/' + id, params);
};


//获取红包列表
export const getBonusLists = params => {
    return ajax.get('seller/coupon', params);
};
//添加红包
export const addBonus = params => {
    return ajax.put('seller/coupon', params);
};
//删除红包
export const deleteBonusById = id => {
    return ajax.delete('seller/coupon/' + id);
};
//查询红包详情
export const getBonusById = id => {
    return ajax.get('seller/coupon/' + id);
};
//编辑红包
export const updateBonusById = (id,params) => {
    return ajax.post('seller/coupon/' + id, params);
};

//短信验证码
export const getPhoneCode = phoneNumber => {
    return ajax.post('commons/phoneCode/' + phoneNumber);
};

//文件上传 前台文件需要设置一个path属性
export const uploadFiles = params => {
    return ajax.post('commons/upload' + params.path, params);
};


