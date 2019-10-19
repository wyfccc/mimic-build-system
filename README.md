- [初始化](#初始化)
- [安装](#安装)
  * [vscode插件](#vscode插件)
  * [npm包](#npm包)
- [搭建开发环境](#搭建开发环境)
  * [目录结构](#目录结构)
  * [代码](#代码)
- [开发](#开发)

# 初始化

使用vscode打开工程文件夹，打开cmd terminal输入：

    git init 

    npm init -y 

在工程文件夹的git bash内输入：

    touch .gitignore 

    touch .babelrc

编辑`.gitignore`

复制输入[node .gitignore template](https://github.com/github/gitignore/blob/master/Node.gitignore)里的模板

`.babelrc`备用

# 安装

## vscode插件

|插件名|描述|
---|---
|prettier|代码整理|
|eslint|eslint插件|
|React-Native/React/Redux snnipets|智能补全|
|HTML Snippets|智能补全|
|Debugger for Chrome|chrome调试插件|
|Document this|快速注释|
|Jest|单元测试（暂时不要装）|

## npm包

进入工程目录，执行以下命令：

    npm i -D webpack webpack-cli webpack-dev-server webpack-merge

    npm i -D react react-dom

    npm i -D clean-webpack-plugin html-webpack-plugin

    npm i -D css-loader style-loader eslint-loader 

    npm i -D babel-loader @babel/core @babel/preset-env @babel/preset-react

    npx install-peerdeps --dev eslint-config-airbnb

以下是安装的npm包简要信息列表：
    
|npm包名|描述|环境|
---|---|---
|webpack||dev|
|webpack-cli||dev|
|webpack-dev-server|本地开发服务器|dev|
|webpack-merge|组合webpack配置文件|dev|
|react||dev|
|react-dom||dev|
|eslint-config-airbnb|eslint的airbnb规范以及附带的乱七八糟的依赖包|dev|
|eslint-loader|webpack编译前检查代码|dev|
|clean-webpack-plugin|webpack插件：清理public目录|dev|
|html-webpack-plugin|webpack插件：自动生成html模板|dev|
|uglifyjs-webpack-plugin|webpack插件：去除冗余模块|dev|
|css-loader||dev|
|style-loader||dev|
|file-loader||dev|
|babel-loader|ES6转义器|dev|

# 搭建开发环境

## 目录结构

vscode打开工程目录, 选择cmd terminal不要使用powershell, 应该有更简单的方法，待更新

    mkdir public src

    mkdir src\asset src\component

    mkdir src\asset\image src\asset\css src\asset\font

## 代码

在根目录下新建`webpack.common.config.js`, `webpack.prod.config.js`, `webpack.dev.config.js`,输入以下代码

    //webpack.common.config.js 
    const path = require('path');
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const webpack = require('webpack');

    module.exports = {
        entry: {
            app: './src/index.js'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                      loader: "babel-loader"
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.(png|jpg|svg|gif|jpeg)$/,
                    use: [
                        'file-loader'
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        'file-loader'
                    ]
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: 'Production',
                template: './template.html'
            }),
            new webpack.ProvidePlugin({
                React: 'react',
                ReactDOM: 'react-dom',
                Component: ['react', 'Component'],
            }),
        ],
        output: {
            filename: '[name].bundle.js',
            path: path.join(__dirname, 'public')
        }
    };
    //webpack.dev.config.js 
    const merge = require("webpack-merge");
    const common = require("./webpack.common.config");

    module.exports = merge(common, {
    devtool: "inline-source-map",
    mode: "development",
    devServer: {
        contentBase: "./public",
        port: 3000,
    },
    });


    //webpack.prod.config.js 
    const webpack = require("webpack");
    const merge = require("webpack-merge");
    const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
    const common = require("./webpack.common.config");

    module.exports = merge(common, {
    mode: "production",
    plugins: [
        new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production"),
        }),
    ],
    optimization: {
        minimizer: [
        new UglifyJsPlugin({
            uglifyOptions: {
            compress: false,
            },
        }),
        ],
    },
    });


修改`package.json`文件, 添加`build`和`start`两个npm脚本

    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "webpack --config webpack.prod.config.js",
        "start": "webpack-dev-server --open --color --config webpack.dev.config.js"
    },

打开`.babelrc`, 输入以下代码：

    {
        "presets": ["@babel/preset-env", "@babel/preset-react"]
    }

在根目录新建`template.html`作为`html-webpack-plugin`的模板文件

    <html>
    <head>
        <meta charset="utf-8"/>
        <title>拟态构建系统</title>
    </head>
    <body>
        <div id="root">
        </div>
    </body>
    </html>


在`src`目录下新建`index.js`,输入以下代码

    import App from './App';

    ReactDOM.render(<App />, document.getElementById('root'));

在`src`目录下新建`App.js`,输入以下代码

    import './asset/css/index.css'

    class App extends Component {
    render() {
        return (
        <div className="App">
            <h1>I m app Component</h1>
        </div>
        );
    }
    }

    export default App;

# 开发

输入`npm start`开启本地测试服务器

输入`npm run build`构建产品输出

在`src`目录写代码, 写之前先`pull`一下远端更新一下代码, 写完了再`push`到远端