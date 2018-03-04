const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const ROOT = __dirname;
const FRONTEND_ROOT = path.join(ROOT, 'frontend');
const DEST_DIR = path.join(ROOT, 'public', 'assets');

const ENV = process.env.NODE_ENV || 'development';

const byEnv = ({dev, test, prod}, defaultValue = null) => {
  switch (ENV) {
    case 'development':
      return dev;
    case 'test':
      return dev || test;
    case 'production':
    case 'staging':
      return prod;
    default:
      return defaultValue;
  }
};

module.exports = {
  entry: {
    app: FRONTEND_ROOT,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  output: {
    path: DEST_DIR,
    filename: byEnv({
      dev: '[name].js',
      prod: '[name]-[hash].js',
    }),
    publicPath: '/',
  },

  devServer: {
    contentBase: DEST_DIR,
    port: 3001,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: FRONTEND_ROOT,
        use: [{loader: 'awesome-typescript-loader'}],
      },

      {
        test: /\.css$/,
        include: FRONTEND_ROOT,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin([DEST_DIR]),

    new ExtractTextPlugin({
      filename: byEnv({
        dev: '[name].css',
        prod: '[name]-[chunkhash].css',
      }),
    }),

    new ManifestPlugin({
      fileName: 'assets-manifest.json',
    }),
  ],
};
