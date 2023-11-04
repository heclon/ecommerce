module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV)

  const presets = [
    [
      'next/babel',
      {
        'preset-react': {
          runtime: 'automatic',
        },
      },
    ],
  ]

  const plugins = ['superjson-next']

  return { presets, plugins }
}
