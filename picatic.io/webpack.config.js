var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

var extractLess = new ExtractTextPlugin({
  filename: "main.css"
})

// copy over index.html and icons from /app to /dist
var copyWeback = new CopyWebpackPlugin([
  { from: 'index.html', to: 'index.html' },
  { from: 'img/icons', to: 'img/icons' }
])

var config = {
  context: __dirname + '/app',
  entry: './index.js',
  output: {
    path: __dirname + '/app',
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            attr: [':ng-src']
          }
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/,
        use: extractLess.extract({
          use: [{
            loader: "css-loader",
            options: {
              minimize: true
            }
          }, {
            loader: "less-loader"
          }],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: [
          __dirname, "/app/img"
        ],
        use: [
          'url-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        include: [
          __dirname, "/app/fonts"
        ],
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/'
          }
        }
        ]
      }
    ]
  },
  plugins: [
    copyWeback,
    extractLess
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.output.path = __dirname + '/dist';
  config.output.publicPath = '/';
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
