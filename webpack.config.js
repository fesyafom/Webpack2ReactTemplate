const {resolve, join} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");   //create html templates
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Webpack = require("webpack");

const isProd = process.env.NODE_ENV === "production";

const config = {
    entry: "./src/app.js",
    output: {
        path: resolve(__dirname, "./public"),
        filename: "bundle.js"
    },
    module: {
      rules: [
          {
              enforce: "pre",
              test: /\.(js|jsx)/,
              exclude: /node_modules/,
              loader: "eslint-loader"
          },
          {
              test: /\.(js|jsx)/,
              exclude: /node_modules/,
              loader: "babel-loader"
          },
          {
              test: /\.(css|sass|scss)/,
              use: isProd ? ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: ["css-loader", "sass-loader"],
                  publicPath: "/public"
              }) : ["style-loader", "css-loader", "sass-loader"]
          },
          {
              test: /\.(jpe?g|png|gif|svg)$/,
              use: [
                  "file-loader?name=images/[hash:6].[ext]",
                  "image-webpack-loader"
              ]
          }
      ]
    },
    devServer: {
        contentBase: join(__dirname, "./public"),
        compress: true,
        port: 3000,
        hot: true,                                      //enable HMR
        stats: "errors-only",
        open: true                                      //open new tab in your browser when success compile
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack2 Template",
            minify: {
                collapseWhitespace: true
            },
            hash: true,                                         //add hash to <script>
            template: "./src/index.html"
        }),
        new ExtractTextPlugin({
            filename: "style.css",
            disable: !isProd,
            allChunks: true
        }),
        new Webpack.HotModuleReplacementPlugin(),               //enable HMR globally
        new Webpack.NamedModulesPlugin()                        //prints more readable module names in the browser console when HMR
    ]
};

module.exports = config;