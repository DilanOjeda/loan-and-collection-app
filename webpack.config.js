const path = require('path');

module.exports = {
    entry: {
        app:[
            "@babel/polyfill",
            "./public/js/app.js"
        ]
    },
    output: {
        filename: "bundle.js",
        path: path.join( __dirname, "public/dist")
    },
    module: {
        rules: [
            {
                use: "babel-loader",
                test: /\.m?js$/,
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".js"]
    },
}
//@babel/plugin-transform-async-to-generator
//@babel/plugin-transform-runtime
