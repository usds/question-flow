const path = require('path')

const main = {
  "stories": [
    "../src/**"
  ],
  "addons": [
    "@storybook/addon-links",
    {
       name: '@storybook/addon-docs',
       options: { configureJSX: true }
    },
    "@storybook/addon-essentials",
    "@storybook/addon-actions",
    '@storybook/addon-controls',
    'storybook-readme',
  ],
  typescript: {
    check: false,
    checkOptions: {},
    // https://github.com/styleguidist/react-docgen-typescript/issues/356
    // reactDocgen: 'react-docgen-typescript',
    reactDocgen: 'none',
    reactDocgenTypescriptOptions: {
      tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
    },
  }
}

module.exports = main;
