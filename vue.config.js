module.exports = {
    devServer: {
        proxy: {  //配置跨域
            "/api": {
                target: 'http://43.138.86.76', //后端跑在本地8000端口
                changOrigin: true,  //允许跨域
                pathRewrite: {
                    '^/api': '',
                },
            },
            "/bucket": {
                target: "https://video-share-cos-1311641405.cos.ap-beijing.myqcloud.com/",
                changOrigin: true,
                pathRewrite: {
                    "^/bucket": "",
                }
            }
        }
    },
}
