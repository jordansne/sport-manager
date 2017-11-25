const path = require('path');
const HTMLWebpack = require('html-webpack-plugin');

module.exports = {
    entry: './client/src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, loader: [ 'style-loader', 'css-loader?modules=true&camelCase=true'], exclude: /node_modules/ }
        ]
    },
    plugins: [
        new HTMLWebpack({
            template: './client/index.html',
            file: 'index.html',
            inject: 'body'
        })
    ]
}
