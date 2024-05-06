// 引入 axios 包
import axios from "axios";

const request = axios.create({
    timeout: 5000
})

// request 拦截器
//1. 可以对请求进行统一处理
//2. 比如统一加 token, Content-Type 等
request.interceptors.request.use(
    config => {
        config.headers["Content-Type"] = "application/json;charset=utf-8";
        return config
    }, error => {
        return Promise.reject(error);
    }
);

//导出
export default request;