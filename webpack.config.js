const path = require('path');

module.exports = {
  context: path.join(__dirname, './client'),
  entry: './index.jsx',
  output: {
    path: path.join(__dirname, './client/public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: ['react', 'es2015'] }
      }
    ]
  }
};
