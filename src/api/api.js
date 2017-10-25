import MintUI from 'mint-ui'
import axios from 'axios';

var ajax = axios.create({
    baseURL: 'http://api.sf.chinagjgx.com',
    headers: {},
    withCredentials: true, //cookie
    crossDomain: true //跨域
});
//添加一个请求拦截器
ajax.interceptors.request.use(function(config) {
    //在请求发出之前进行一些操作
    if (sessionStorage.getItem('jwt')) {
        config.headers.TOKEN = sessionStorage.getItem('jwt');
    }
    return config;
}, function(err) {
    console.error(err);
    MintUI.Toast('请求发生错误,请稍后再试!');
    //Do something with request error
    return Promise.reject(err);
});
//添加一个响应拦截器
ajax.interceptors.response.use(function(res) {
    //在这里对返回的数据进行处理
    if (!res.data.status) {
        MintUI.Toast(res.data.message);
        if(res.data.errorCode == 401){
            location.href = '/login'
        }
        throw new Error(res.data.message);
    }

    return (res.data.data?res.data.data:res.data.status);
}, function(err) {
    console.error(err);
    MintUI.Toast('响应发生错误,请稍后再试!');
    //Do something with response error
    return Promise.reject(err);
})




//获取店铺分类
export const loginByCode = params => {
    return ajax.post('seller/seller/loginByCode', params);
};
export const loginBySecretKey = params => {
    return ajax.post('seller/seller/loginBySecretKey', params);
};


//文件上传 前台文件需要设置一个path属性
export const uploadFiles = params => {
    return ajax.post('commons/upload' + params.path, params);
};

