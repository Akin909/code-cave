const webpack = require('webpack');
const path = require('path');
const htmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  //babel-polyfill allows use of features such as generators and async and
  //await
  context: __dirname + '/src', //root of project
  entry: ['babel-polyfill', './index.js'],
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },

  devtool: 'cheap-module-source-map',

  devServer: {
    contentBase: __dirname + '/src',
    compress: true,
    historyApiFallback: true //Stops react router roots from crashing on refresh
  },

  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000 }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['es2015', 'stage-0'] }
          }
        ]
      }
    ]
  },
  plugins: [
    new htmlWebPackPlugin({
      template: './index.html',
      inject: true,
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};
