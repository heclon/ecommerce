import webpack, { IgnorePlugin } from 'webpack'

module.exports = {
  stories: ['../**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    'storybook-addon-react-docgen',
    'storybook-addon-manual-mocks',
  ],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    // Workaround for @storybook/addon-jest on Webpack 5
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        path: require.resolve('path-browserify'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        fs: require.resolve('browserify-fs'),
        os: require.resolve('os-browserify/browser'),
        http: require.resolve('http-browserify'),
        https: require.resolve('https-browserify'),
      },
    }
    config.optimization = {
      minimize: false,
      minimizer: [],
    }
    config.plugins.push(
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      })
    )
    config.plugins.push(
      new IgnorePlugin({
        resourceRegExp: /async_hooks/,
      })
    )
    return config
  },
  framework: '@storybook/react',
  typescript: {
    reactDocgen: 'react-docgen',
  },
}
