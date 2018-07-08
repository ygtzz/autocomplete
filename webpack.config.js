var webpack = require('webpack');
var path = require('path');
var libraryName = 'autocomplete';

var config = {
    entry: __dirname + '/src/index.js',
    // devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: libraryName + '.js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|test)/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader'},
                    { 
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.scss$/, 
                use: [
                    { loader: 'style-loader' },
                    { 
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        } 
                    },
                    { loader: 'sass-loader' }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    }
}

module.exports = config;