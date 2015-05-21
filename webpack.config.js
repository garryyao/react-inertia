var webpack = require('webpack');
var path = require('path');
module.exports = {
  entry: {
    example: './example/js/main.js',
    main: ['./scrollable.js'],
    vendor: ['react']
  },
  output: {
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'react': 'react/dist/react-with-addons.min'
    },
    modulesDirectories: ['node_modules', 'bower_components'],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(
      {
        name: ['vendor']
      }
    )
  ],
  module: {
    loaders: [
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules|bower_components/,
        loader: 'babel-loader'
      }, {
        test: /\.less$/,
        loader: 'css?sourceMap!less?sourceMap'
      }
    ]
  }
};
