/* eslint-env node */

module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['>0.25%,  not op_mini all'],
        },
      },
    ],
  ],

  plugins: ['@babel/plugin-proposal-class-properties'],
};
