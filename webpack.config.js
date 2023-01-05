const path = require("path");
const mode = process.env.NODE_ENV || 'development';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const SitePath = 'htdocs'
const TemplatePath = 'local/templates/visitkolyma/'

module.exports = {
    mode,
    target,
    devtool,
    devServer: {
        hot: true,
        historyApiFallback: true,
    },
    optimization: {
        minimize: false,
    },
    entry: ['@babel/polyfill', path.resolve(__dirname, 'src', 'index.js')],
    output: {
        path: path.resolve(__dirname, SitePath),
        filename: TemplatePath + 'scripts.js',
        publicPath: '/',
        assetModuleFilename: TemplatePath + "assets/[name][ext]"
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, SitePath, mode === 'production' ? 'index.php' : 'index.html'),
            template: path.resolve(__dirname, 'src/html', 'index.html'),
            minimize: {
                removeComments: false,
                collapseWhitespace: false,
            },
        }),
        // new HtmlWebpackPlugin({
        //     filename: "ui.html",
        //     template: path.resolve(__dirname, 'src/html', 'ui.html')
        // }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, SitePath, 'detail', mode === 'production' ? 'index.php' : 'index.html'),
            template: path.resolve(__dirname, 'src/html', 'detail.html'),
            minimize: {
                removeComments: false,
                collapseWhitespace: false,
            },
        }),
        new MiniCssExtractPlugin({
            filename: TemplatePath + "styles.css",
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(c|le)ss$/i,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [require('postcss-preset-env')]
                            }
                        }
                    },
                    'less-loader'],
            },
            {
                test: /\.m?(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }
}