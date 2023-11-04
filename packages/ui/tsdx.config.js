const postcss = require('rollup-plugin-postcss');
const path = require('path');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        config: {
          path: path.join(__dirname, './postcss.config.js'),
        },
        extensions: ['.css'],
        minimize: true,
        inject: {
          insertAt: 'bottom',
        },
      })
    );
    return config;
  },
};
