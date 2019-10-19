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