'use strict'
const path = require('path')
module.exports = {    
    entry: { 
		app: './src/main.js'
	},
    output: {    
       path: __dirname + '/dist',
       filename:'[name].js',
    },    
    module: {    
        loaders: [{    
            test: /\.js$/,    
            exclude: /node_modules/,    
            loader: 'babel-loader'    
        }]    
    }    
} 