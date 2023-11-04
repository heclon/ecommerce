import path from 'path'
import { IgnorePlugin } from 'webpack'

module.exports = {
  stories: ['../**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-addon-next',
    '@urql/storybook-addon',
    {
      name: '@storybook/addon-postcss',
      options: {
        cssLoaderOptions: {
          importLoaders: 1,
        },
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    'storybook-addon-react-docgen',
    'storybook-addon-manual-mocks',
  ],
  // https://stackoverflow.com/questions/65495912/storybook-tailwind-how-should-i-add-tailwind-to-storybook
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [require('tailwindcss'), require('autoprefixer')],
            },
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    })
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
      new IgnorePlugin({
        resourceRegExp: /async_hooks/,
      })
    )
    return config
  },
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  staticDirs: ['../public'],
  features: {
    babelModeV7: true,
  },
  typescript: {
    reactDocgen: 'react-docgen',
  },
}
