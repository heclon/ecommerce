module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV)
  const isServer = api.caller((caller) => caller?.isServer)
  const isDevelopment = api.caller((caller) => caller?.isDev)

  const presets = [
    [
      'next/babel',
      {
        'preset-react': {
          runtime: 'automatic',
          importSource: !isServer && isDevelopment ? '@welldone-software/why-did-you-render' : 'react',
        },
      },
    ],
  ]

  const plugins = ['superjson-next', 'istanbul']

  return { presets, plugins }
}
