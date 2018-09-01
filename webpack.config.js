const path = require('path');
const webpack = require('webpack');

const HappyPack = require('happypack');
//使打包支持多线程
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});


// const htmlWebpackPlugin = require('html-webpack-plugin')
//导入在内存中自动生成index页面的插件
// const htmlPlugin = new htmlWebpackPlugin({
//     template: path.join(__dirname, './src/index.html'),
//     filename: 'index.html'
// })
//创建一个插件的实例对象


module.exports = {
    mode: 'development',
    // process.env.NODE_ENV
    //来判断是生产环境还是开发环境
    // 开发环境
    // mode:'production'
    //生产环境

    //在webpack 4.x种有一个很大的特性，就是约定大于配置，约定默认的打包入口路径是 src-> index.js

    plugins: [
        // new webpack.SourceMapDevToolPlugin(),
        //生成map工具
        // htmlPlugin,
        new webpack.HotModuleReplacementPlugin(),
        new HappyPack({
            id: 'css',
            loaders: [{
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader',
                }
            ]
        }),
        new HappyPack({
            id: 'js',
            loaders: [{
                loader: 'babel-loader',
                options: {
                    // "presets": ["react"],
                    "presets": ["env", "stage-0", "react"],
                    // "transform-decorators-legacy","transform-decorators"
                    //使用装饰器
                    "plugins": ["transform-decorators-legacy", "transform-decorators", 'transform-runtime'],
                    cacheDirectory: true
                }
            }]
        }),
        new HappyPack({
            id: 'styl',
            loaders: [{
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[path][name]__[local]--[hash:base64:5]'
                    }
                },
                {
                    loader: 'stylus-loader',
                }
            ]
        }),
    ],
    entry: {
        index: [
            "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
            "./src/index"
        ]
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].bundle.js",
        publicPath: "/"
    },
    // devServer: {
    //     host: '192.168.0.186',
    //     port: 3000,
    //     hot: true,
    //     inline: true,
    //     historyApiFallback: true,
    //     proxy: {
    //         '/api/games': 'http://localhost:8080'
    //     }
    // },
    module: {
        rules: [{
                test: /\.(jsx|js)$/,
                exclude: /(node_modules|bower_components|backend)/,
                // use: {
                //     loader: 'babel-loader',
                //     options: {
                //         // "presets": ["react"],
                //         "presets": ["env", "stage-0", "react"],
                //         // "transform-decorators-legacy","transform-decorators"
                //         //使用装饰器
                //         "plugins": ["transform-decorators-legacy", "transform-decorators", 'transform-runtime'],
                //         cacheDirectory: true
                //     }
                // }
                use: {
                    loader: 'happypack/loader?id=js'
                }
            },

            {
                //普通的css文件就不启用模块化  

                test: /\.css$/,
                // use: [{
                //         loader: 'style-loader'
                //     },
                //     {
                //         loader: 'css-loader',
                //     }
                // ]
                use: [{
                    loader: 'happypack/loader?id=css',
                }]
            }, {
                //可以在css-loader之后，通过？ 追加参数
                //其中，有个固定的参数，叫做，modules，表示为普通的css样式表启用模块化。

                test: /\.styl$/,
                // use: [{
                //         loader: 'style-loader'
                //     },
                //     {
                //         loader: 'css-loader',
                //         options: {
                //             modules: true,
                //             localIdentName: '[path][name]__[local]--[hash:base64:5]'
                //         }
                //     },
                //     {
                //         loader: 'stylus-loader',
                //     }
                // ]
                use: [{
                    loader: 'happypack/loader?id=stylus',
                }]
            }, {
                test: /\.(jpeg|png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[hash:8].[name].[ext]',
                    }
                }]
            }, {
                test: /\.(woff|woff2|eot|ttf|otf|ttc)(\?\S*)?$/,
                use: [{
                    loader: 'url-loader',
                }]
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: { //表示别名
            '@': path.join(__dirname, './src'),
            // 这样@就表示项目根目录种src这一层的路径
        }
    }
    // import Hello from "@/components/hello";
    //@表示项目根目录下的src目录
}


//这是es6 中向外导出模块的api与之对应的是 import ** form '标识符'
// export default{}
//那些特性node支持？ 如果chrome浏览器支持那些，则node就支持那些 。

//webpack-dev-server 打包好的main.js是托管到了内存中；所以在项目根目录看不到。
//我们可以认为在根目录中有一个看不见的main.js