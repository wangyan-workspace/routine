//node下打包的path文件包，可以直接用显示设置路径
const path = require('path');
//下载插件 npm install html-webpack-plugin --save-dev（html文件打包） 后要引入
const HtmlPlugin = require("html-webpack-plugin");
//下载插件 npm install clean-webpack-plugin --save-dev(重新打包) 后要引入
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//下载插件 npm install --save-dev mini-css-extract-plugin(CSS分离) 后要引入
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//下载插件 npm install --save-dev purifycss-webpack purify-css(清除未使用的CSS) 后要引入
const glob = require('glob');
const PurifyCssPlugin = require('purifycss-webpack');

module.exports = {
    //开发环境配置：production:生产环境（线上使用，js文件压缩成一行）development：开发环境（开发使用，js文件展开易读）
    mode: 'development',
    //入口文件配置
    //entry：配置入口文件的地址，可以是单一入口，也可以是多入口
    entry: {
        //只能识别js文件
        index: './src/index.js',
        main: './src/main.js'
    }
    ,
    //出口文件
    //output：配置出口文件的地址，在webpack2.X版本后，支持多出口配置
    output: {
        //绝对路径:打包到dist文件下
        path: path.resolve(__dirname, 'dist'),
        //生成文件后，命名为获取到的name参数，即入口文件entry的属性是index和main，
        //那么在dist文件夹下就会生成同样的index.js 和 main.js文件
        filename: '[name].js',
        //配置图片路径
        //css文件会分离出来，但如果图片不是base64而是一个图片文件，这时候就会出现路径问题，需要配置publicPath来解决
        publicPath: 'http://localhost:8083/',
    },
    //devServer：配置webpack开发服务功能
    devServer: {
        //设置基本目录结构
        contentBase: path.resolve(__dirname, 'dist'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host: 'localhost',
        //配置服务端口号
        port: 8083,
        //自动打开浏览器
        // open:true,
    },
    //plugins：配置插件，根据你的需要配置不同功能的插件。
    plugins: [
        /* 处理html文件的打包 */
        new HtmlPlugin({
            //template：是要打包的html模版路径和文件名称
            template: './src/index.html',
            //minify：是对html文件进行压缩，去掉属性的双引号
            minify: {
                //removeAttributeQuotes:去掉属性的双引号
                removeAttributeQuotes: true,
                //collapseWhitespace:去掉文件的空格和换行
                // collapseWhitespace:true,
            },
            //hash：为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS
            hash: true,
        }),
        //每次构建先删除dist再重新打包dist文件夹
        //clean-webpack-plugin (希望重新打包的时候能把dist目录先删除，再打包可以使用) -打包之前运行 
        // new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            //在dist文件夹下生成CSS文件夹，CSS文件夹里的文件以.css结尾
            filename: 'css/[name].css'
        }),
        new PurifyCssPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html')),
        })
    ],
    //配置loader
    //module：配置模块，主要是解析CSS和图片转换压缩等功能
    module: {
        rules: [
            {
                /* 针对css处理规则 */
                //css文件打包
                //css内容被打包到dist下面的index.js文件中
                //匹配以.css结尾的文件
                test: /\.css$/,
                //style-loader：用来处理css文件中的url()等，url挂在到js中
                //css-loader：用来将css插入到页面的style标签
                //注意顺序不能变，从后往前去处理
                // use:['style-loader', 'css-loader'], //因为css前缀中也有'css-loader'，避免冲突，应注释掉
                //use:指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader
                use: [
                    //css前缀
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    'postcss-loader'
                ]
            },
            {
                /* 针对图片文件的处理问题 */
                //css中引用图片
                //test:/\.(png|jpg|gif)/是匹配图片文件后缀名称。
                test: /\.png|jpg|gif$/,
                //use：是指定使用的loader和loader的配置参数。
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            //limit：是把小于500B的文件打成Base64的格式，写入css。
                            limit: 500,
                            //打包到出口dist 文件下的images文件夹中
                            outputPath: 'images/',
                            esModule: false
                        }
                    }
                ]
            },
            {
                /* 针对html文件的处理 */
                //html中的图片打包
                //i是将匹配到的内容转为小写
                test: /\.htm|html$/i,
                loader: 'html-withimg-loader',
            },
            {
                /* 针对sass处理规则 */
                //Sass打包和分离
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                /* 针对js文件的处理 （es6 => es5） */
                test: /\.js$/,
                use:[{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }],
                //不把node_modules中的文件进行转换
                exclude: /node_modules/
            }
        ]
    }
}