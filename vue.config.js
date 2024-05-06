const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true
})

module.exports = {
    devServer: {
        port: 10000, //配置启动端口
        proxy: {
            "/api": {       //设置拦截器 拦截器格式: 斜杠+拦截器名字,名字可以自定
                target: 'http://localhost:9999',   //代理的目标地址，用 /api 代替
                changeOrigin: true,  //是否设置同源，输入使得
                pathRewrite: {      //路径重写
                    '/api': ''      //选择忽略拦截器内的单词
                }
            }
        }
    }
}