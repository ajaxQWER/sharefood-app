import MintUI from 'mint-ui'
import axios from 'axios';

var ajax = axios.create({
    baseURL: 'http://apitest.sf.chinagjgx.com', //测试
    // baseURL: 'http://api.sf.chinagjgx.com', //正式服
    headers: {},
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
    MintUI.Toast({message:'请求发生错误,请稍后再试!',duration: 1500});
    MintUI.Indicator.close();
    //Do something with request error
    return Promise.reject(err);
});
//添加一个响应拦截器
ajax.interceptors.response.use(function(res) {
    //在这里对返回的数据进行处理
    if (!res.data.status) {
        MintUI.Toast({message:res.data.message,duration: 1500});
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
    MintUI.Toast({message:'响应发生错误,请稍后再试!',duration: 1500});
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

//登录遇到问题文章
export const getArticleListByCategoryId = id => {
    return ajax.get('commons/article', id);
};
export const getArticleById = id => {
    return ajax.get('commons/article/' +  id);
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
    return ajax.put('seller/goods/', params);
};


//获取订单
export const getOrderList = params => {
    return ajax.get('seller/order/', params);
};
//取消订单
export const cancelOrderById = orderId => {
    return ajax.put('seller/order/orderCancel/' + orderId);
};
//完成订单
export const finishOrderById = orderId => {
    return ajax.put('seller/order/setFinished/' + orderId);
};
//设置订单为配送
export const acceptOrderById = orderId => {
    return ajax.put('seller/order/setShipping/' + orderId);
};

//获取订单详情
export const getOrderById = orderId => {
    return ajax.get('seller/order/' + orderId);
};






//短信验证码
export const getPhoneCode = phoneNumber => {
    return ajax.post('commons/phoneCode/' + phoneNumber);
};

//文件上传 前台文件需要设置一个path属性
export const uploadFiles = params => {
    return ajax.post('commons/upload' + params.path, params);
};

