const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true
})

module.exports = {
    devServer: {
        port: 10000 //配置启动端口
    }
}