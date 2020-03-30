const path = require('path');

module.exports = {
    entry: {
        main: './src/javascript/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'bundle.js'
    },

    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
            }
        ]
    }
}