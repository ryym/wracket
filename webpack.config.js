/* eslint-env node */

const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

// Load environment variables from .env file.
dotenv.config();

const ROOT = __dirname;
const FRONTEND_ROOT = path.join(ROOT, 'frontend');
const ENTRY_ROOT = path.join(FRONTEND_ROOT, 'entries');
const DEST_DIR = path.join(ROOT, 'public', 'assets');

const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.ASSET_PORT || 3001;

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
    app: path.join(ENTRY_ROOT, 'app'),
    home: path.join(ENTRY_ROOT, 'home'),
    welcome: path.join(ENTRY_ROOT, 'welcome'),
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
    port: PORT,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  devtool: byEnv({
    dev: 'cheap-module-source-map',
    prod: false,
  }),

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: FRONTEND_ROOT,
        use: [{loader: 'awesome-typescript-loader'}],
      },

      {
        test: /\.scss$/,
        include: FRONTEND_ROOT,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]_[local]_[hash:base64:5]',
              },
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: ['./node_modules'],
              },
            },
          ],
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

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${ENV}'`,
      },
    }),
  ],
};
