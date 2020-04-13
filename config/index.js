// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../manage/index.html'),  // 编译之后的路径
    assetsRoot: path.resolve(__dirname, '../manage'),  // 打包之后文件根路径
    assetsSubDirectory: 'static',
    assetsPublicPath: '/manage/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,  // 是否压缩
    productionGzipExtensions: ['js', 'css'],   // GZIP 模式下需要压缩的文件的扩展名，设置后会对相应的扩展名的文件进行压缩
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),  
    port: 8002,
    autoOpenBrowser: true,  
    assetsSubDirectory: 'static', // 静态文件夹
    assetsPublicPath: '/',  // 发布路径
    proxyTable: {   //常用来配置代理的API的地方
      '/api':{
        target:'http://admin.biaodaa.com',
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    },
    context: [ //代理路径
        '/shopping',
        '/ugc',
        '/v1',
        '/v2',
        '/v3',
        '/v4',
        '/bos',
        '/member',
        '/promotion',
        '/eus',
        '/payapi',
        '/admin',
        '/statis',
        '/img',
    ],
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
