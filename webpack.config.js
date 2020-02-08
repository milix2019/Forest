var path = require('path');
var webpack = require('webpack');

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    contentBase: './public',
    host: 'localhost',
    port: 3000,
  },
  devtool: 'inline-source-map',
  mode: 'production',
  entry: './src/index.js',
  module: {
    rules:[
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          query: {
            presets: ["@babel/preset-env",
              "@babel/preset-react"],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          query: {
            presets: ["@babel/preset-env",
              "@babel/preset-react"],
            plugins: [
              "@babel/plugin-proposal-class-properties",
            ],
          },
        },
      },
      {
        test: /\.json?$/,
        use: {
          loader: "json",
        },
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
        ],
      },
      {
        test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
        use:{
          loader: 'url?limit=10000&mimetype=application/font-woff',
        },
      },
      {
        test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/,
        use: {
          loader: 'file',
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
        ],
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader?limit=100000',
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: "bundle.js",
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin({
      multiStep: true,
    }),
  ],
};
