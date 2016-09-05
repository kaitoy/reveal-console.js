var webpack = require('webpack');
var pjson = require('./package.json');

var thisYear = new Date().getFullYear();
var copyright
  = thisYear === 2016 ?
      'Copyright (C) 2016 Kaito Yamada' :
      'Copyright (C) 2016 - ' + thisYear + ' Kaito Yamada';

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'reveal-console.js',
    path: './dist',
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.css', '.html'],
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint',
      }
    ],
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html?interpolate',
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        loader: 'css',
      },
    ],
  },
  eslint: {
    configFile: './.eslintrc',
  },
  plugins: [
    new webpack.BannerPlugin(
      'reveal-console.js ' + pjson.version + '\n' +
      'https://github.com/kaitoy/reveal-console.js\n' +
      'MIT licensed\n\n' +
      copyright,
      {
        raw: false,
        entryOnly: true,
      }
    ),
  ],
};
