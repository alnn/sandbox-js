var webpack = require('webpack');

module.exports = {
    entry: './main.js',
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: [
                        'react-html-attrs',
                        'transform-class-properties',
                        'transform-decorators-legacy'
                    ]
                }
            }
        ]
    },
    devServer: {
        inline: true,
        port: 3333
    },
    output: {
        path: './',
        filename: 'index.js'
    }
};
