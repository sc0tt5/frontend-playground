const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
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
    use: [
      {
        loader: 'awesome-typescript-loader',
        options: {
          configFile: 'tsconfig.json'
        }
      }
    ]
  }
];

const plugins = [
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
  entry: [`${sourcePath}/app.ts`, './index.ts'],
  output: {
    filename: '[name].bundle.[hash:4].js',
    chunkFilename: '[name].bundle.[hash:4].js',
    path: distPath
  },
  node: {
    console: false,
    global: true,
    process: true,
    Buffer: false,
    setImmediate: false
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
