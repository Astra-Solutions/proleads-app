const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');


const dotenv = require("dotenv");
dotenv.config();

const env = process.env.NODE_ENV || "development";

module.exports = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/",
    },
    mode: env,
    // devtool: "inline-source-map",
    optimization: {
        minimizer: [new UglifyJsPlugin({
            test: /\.js(\?.*)?$/i,
        }),],
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        fallback: {
            fs: false,
            tls: false,
            net: false,
            path: false,
            zlib: false,
            http: false,
            https: false,
            stream: false,
            crypto: false,
            "crypto-browserify": require.resolve("crypto-browserify"), //if you want to use this module also don't forget npm i crypto-browserify
        },
        alias: {
            FroalaEditor: 'froala_editor.min.js/froala_editor.pkgd.min.js',
        },
        modules: ['../node_modules/froala-editor/js', 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                include: path.resolve(__dirname, "src"),
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    env === "development"
                        ? "style-loader"
                        : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: false,
                            importLoaders: 2
                        },
                    },
                    { loader: "postcss-loader", options: { sourceMap: false } },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                            sourceMap: false,
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg|webp|json)$/,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env),
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "/public/index.html"),
            favicon: "./public/favicon.ico",
            inject: false,
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].min.css",
        }),
        new CompressionPlugin({
            filename: "[path][base].gz",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new webpack.ProvidePlugin({
            FroalaEditor: 'froala_editor.min.js/froala_editor.pkgd.min.js',
        })
        // new BundleAnalyzerPlugin(),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        compress: true,
        port: 3000,
        historyApiFallback: true,
    },
};