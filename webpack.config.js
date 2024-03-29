const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');

const sourcePath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

const rules = [
    {
        test: /\.html$/,
        loader: 'html-loader',
        options: { minimize: true }
    },
    {
        test: /\.scss$/,
        use: [
            'style-loader',
            'css-loader', // translates CSS into CommonJS
            'sass-loader' // compiles Sass to CSS
        ]
    },
    {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.json'
                }
            }
        ]
    }
];

const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
        template: 'index.html'
    }),
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
    }),
    new FriendlyErrorsWebpackPlugin()
];

module.exports = {
    mode: 'development',
    context: __dirname,
    devServer: {
        contentBase: distPath,
        historyApiFallback: true,
        hot: true,
        quiet: true,
        stats: {
            chunks: false,
            chunkModules: false,
            chunkOrigins: false,
            errors: true,
            errorDetails: false,
            hash: false,
            timings: false,
            modules: false,
            warnings: false
        },
        port: 8000
    },
    entry: {
        app: `${sourcePath}/app.ts`
    },
    output: {
        filename: '[name].bundle.[fullhash:4].js',
        chunkFilename: '[name].bundle.[fullhash:4].js',
        path: distPath
    },
    node: {
        global: true
    },
    module: {
        rules
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['node_modules']
    },
    plugins,
    devtool: 'source-map'
};
