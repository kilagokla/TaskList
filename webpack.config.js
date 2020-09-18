const path = require('path');
module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.bundle.js'
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: "ts-loader" }
        ]
    },
};