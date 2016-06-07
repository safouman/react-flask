var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'app/static/public');
var APP_DIR = path.resolve(__dirname, 'app/static/js');

var config = {
    
    devtool:'inline-source-map',
    entry: APP_DIR + '/index.jsx',
    output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
   module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  },
};

module.exports = config;