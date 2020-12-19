module.exports = {
    publicPath: "./",
    productionSourceMap: false,
    devServer: {
        host: "localhost",
        proxy: {
            "/api": {
                target: "https://ce5.midea.com", // 目标地址
                ws: true, // 是否代理websockets
                changeOrigin: true, // 设置同源  默认false，是否需要改变原始主机头为目标URL
                pathRewrite: {
                    "^/api": "", // 把 /api 开头的路径替换为 ''
                },
            },
        },
    },
};