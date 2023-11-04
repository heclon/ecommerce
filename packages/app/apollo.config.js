const path = require('path')

module.exports = {
  client: {
    includes: [path.join(__dirname, './components/**/*.graphql')],
    service: {
      name: 'app',
      localSchemaFile: path.join(__dirname, './server/generated/schema.graphql'),
    },
  },
}
