module.exports = {
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
  },
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
  },
  devtool: "eval-source-map"
};
