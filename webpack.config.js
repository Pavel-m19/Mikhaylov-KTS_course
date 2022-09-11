const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const loader = require("sass-loader");
const TerserPlugin = require("terser-webpack-plugin");

const buildPath = path.resolve(__dirname, "build");
const srcPath = path.resolve(__dirname, "src");

const isProd = process.env.NODE_ENV === "production";

const getSettingsForStyles = (withModules = false) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : "style-loader",
    !withModules
      ? "css-loader"
      : {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: !isProd
                ? "[path][name]_[local]"
                : "[hash: base64]",
            },
          },
        },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["autoprefixer"],
        },
      },
    },
    "sass-loader",
  ];
};

module.exports = {
  entry: path.join(srcPath, "index.tsx"),
  target: !isProd ? "web" : "browserslist",
  devtool: isProd ? "hidden-source-map" : "eval-cheap-source-map",
  output: {
    path: buildPath,
    filename: "bundle[contenthash:6].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, "index.html"),
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    isProd &&
      new MiniCssExtractPlugin({
        filename: "[name]-[hash].css",
      }),
    new TsCheckerPlugin(),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.[tj]sx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [!isProd && "react-refresh/babel"].filter(Boolean),
            },
          },
        ],
        exclude: /node_modules/,
        generator: {
          filename: "images/[name].[contenthash:6].[ext]",
        },
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: "images/[name].[contenthash:6].[ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      components: path.join(srcPath, "components"),
      config: path.join(srcPath, "config"),
      styles: path.join(srcPath, "styles"),
      utils: path.join(srcPath, "utils"),
      assets: path.join(srcPath, "assets"),
      pages: path.join(srcPath, "pages"),
      store: path.join(srcPath, "store"),
    },
  },
  optimization: {
    minimize: isProd,
    minimizer: isProd
      ? new TerserPlugin({
          parallel: true,
          terserOptions: {
            sourceMap: true,
          },
        })
      : [],
  },
  devServer: {
    host: "127.0.0.1",
    port: 9000,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  mode: isProd ? "production" : "development",
};
