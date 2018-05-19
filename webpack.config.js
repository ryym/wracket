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
const GLOBAL_STYLES_ROOT = path.join(FRONTEND_ROOT, 'global-styles');
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

// Since ExtractTextPlugin seems not to work well with hot reloading of CSS modules,
// disable it on development.
// https://github.com/css-modules/webpack-demo/issues/8
const cssExtractor = new ExtractTextPlugin({
  disable: byEnv({dev: true, prod: false}),
  filename: '[name]-[chunkhash].css',
});

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

      // material-component-web-react
      {
        test: /\.js$/,
        include: path.join(ROOT, 'node_modules', '@material'),
        use: [{loader: 'babel-loader'}],
      },

      // Global CSS (which does not use CSS modules)
      {
        test: /\.scss$/,
        include: GLOBAL_STYLES_ROOT,
        use: cssExtractor.extract({
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader'},
            {
              loader: 'sass-loader',
              options: {includePaths: ['./node_modules']},
            },
          ],
        }),
      },

      {
        test: /\.scss$/,
        include: FRONTEND_ROOT,
        exclude: GLOBAL_STYLES_ROOT,
        use: cssExtractor.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]_[local]_[hash:base64:5]',

                // Apply sass-loader to `@import`ed CSS files.
                // https://github.com/webpack-contrib/css-loader#importloaders
                importLoaders: 1,
              },
            },
            {
              loader: 'sass-loader',
              options: {includePaths: ['./node_modules']},
            },
          ],
        }),
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin([DEST_DIR]),

    cssExtractor,

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
