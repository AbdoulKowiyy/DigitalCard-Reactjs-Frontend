// webpack.config.js
const path = require('path');
module.exports = {
    context: __dirname,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: "/"
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader',
        }]
    }
};