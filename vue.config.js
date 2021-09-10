var path = require('path');
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    lintOnSave: true,
    productionSourceMap: false,
    devServer: {
        host: '0.0.0.0',
        port:'8080',
        disableHostCheck: true,
        https:false,
        hotOnly: false,
        //代理
        proxy: {
            '/api': {
                target:'https://api.github.com/',
                changeOrigin: true,
                ws:true,
                //重写路径  需要设置重写的话，要在后面的调用接口前加上/api 来代替target
                pathRewrite:{
                    '^/api': ''
                }
            }
        }
    },
    //配置图片不转base64
    // chainWebpack: config => {
    //     const imagesRule = config.module.rule('images');
    //     imagesRule.uses.clear()        //清除原本的images loader配置
    //     imagesRule
    //         .test(/\.(jpg|gif|png|svg)$/)
    //         .exclude
    //         .add(path.join(__dirname,"../node_modules"))   //不对node_modules里的图片转base64
    //         .end()
    //         .use('url-loader')
    //         .loader('url-loader')
    //         .options({name:"img/[name].[hash:8].[ext]",limit: 1})
    // }
}