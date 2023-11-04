module.exports = {
  plugins: {
    'postcss-import': {},
    autoprefixer: {},
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: {},
    'postcss-preset-env': {
      features: { 'nesting-rules': false },
    },
  },
}
