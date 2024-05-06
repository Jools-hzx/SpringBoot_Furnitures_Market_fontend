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

request.interceptors.response.use(
    response => {
        let res = response.data;    //取出并且返回 data 的内容
        //如果返回的是文件
        if (response.config.responseType === 'blob') {
            return res;
        }
        //如果返回得是 String,就转换成 json 对象
        if (typeof res === "string") {
            res = res ? JSON.parse(res) : res;
        }
        return res;
    }, error => {
        return Promise.reject();
    }
)

//导出
export default request;