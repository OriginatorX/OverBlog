const htmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: './src/index.jsx',

    output: {
        filename: '[name].[fullhash].js',
    },

    devtool: 'source-map',

    resolve: {
        //For using .jsx
        extensions: ['', '.js', '.jsx'],
    },
   
    module:{
        rules:[ 
            {
                test: /\.jsx?$/, 
                exclude: /(node_modules)/, 
                loader: "babel-loader",  
            },

            {
                test: /\.css$/i,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                    }
                ]
            },

            {
                test: /\.(png|jpe?g|gif|webm)$/i,
                type: 'asset/inline',
            },
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'public/index.html',
            favicon: 'public/favicon.ico',
            manifest: "public/manifest.json",
        })
    ],
    
    devServer: {
        port: 8080,
        open: true,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8888'
            },
        }
    }
};