module.exports = {
    entry: './index.js',
    output: {
        path: './dist',
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        inline: true,
        contentBase: './dist',
        port: 3333
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
