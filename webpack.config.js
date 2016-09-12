const path = require('path');

module.exports = {
  entry: './index.jsx',
  devServer: {
    hot: true,
    inline: true,
    port: 7700,
    historyApiFallback: true
  },
  resolve: { extensions: ['', '.js', '.jsx'] },
  context: path.join(__dirname, './client'),
  output: {
    path: path.join(__dirname, './client/public'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:7700/dist/test/helpers'
  },
  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: ['react', 'es2015', 'stage-0'] }
      }
    ]
  }
};
