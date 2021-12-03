const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.jsx',

    output: {
        filename: 'static/[name].[fullhash].js',

        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        assetModuleFilename: 'images/[hash][ext][query]'
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
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // Create source maps for CSS files
                            sourceMap: true
                        }
                    },
                ]
            },

            // ???????????
            {
                test: /\.(png|jpe?g|gif|webm)$/i,
                dependency: { not: ['url'] },
                use: [
                    {
                        loader: 'url-loader',
                    },
                ],
            },
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'public/index.html',
            favicon: 'public/favicon.ico',
            manifest: "public/manifest.json",
        }),

        new MiniCssExtractPlugin({
            filename: 'styles/styles.[hash].css'
        })
    ]
};