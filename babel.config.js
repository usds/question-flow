/**
 * This reduces the number of warnings in the Storybook build
 */
module.exports = {
  plugins: [
    // ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    // ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
    // ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
