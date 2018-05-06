/* eslint-env node */

module.exports = () => ({
  parser: 'postcss-scss',
  plugins: {
    'postcss-simple-vars': true,
    'postcss-nested': true,
  },
});
