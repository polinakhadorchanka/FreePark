let path = require('path');

module.exports = {
    entry: "./app/app.jsx",
    output: {
        path: path.resolve(__dirname, './public'),
        publicPath: '/public/',
        filename: "bundle.js"
    },
    module: {
        rules: [   //загрузчик для jsx
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            },
            {
                test: /\.css$/,
                use: 'css-loader',
            }
        ]
    }
};