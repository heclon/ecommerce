import { applyMiddleware } from 'graphql-middleware'
import { declarativeWrappingPlugin, makeSchema } from 'nexus'
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'
import path from 'path'
import * as pluralize from 'pluralize'
import * as types from '../graphql'
import * as middlewares from '../middlewares'

// fix nexus plural model name issue
pluralize.addIrregularRule('media', 'medias')

const schema = applyMiddleware(
  makeSchema({
    types,
    plugins: [
      nexusSchemaPrisma({
        experimentalCRUD: true,
        paginationStrategy: 'prisma',
        outputs: {
          typegen: path.join(process.cwd(), 'server/generated/nexus-prisma.ts'),
        },
      }),
      declarativeWrappingPlugin({ disable: true }),
    ],
    contextType: {
      module: path.join(process.cwd(), 'server/context.ts'),
      export: 'GraphQLContext',
    },
    outputs: {
      typegen: path.join(process.cwd(), 'server/generated/nexus.ts'),
      schema: path.join(process.cwd(), 'server/generated/schema.graphql'),
    },
    sourceTypes: {
      modules: [
        {
          module: path.join(process.cwd(), '../../node_modules', '.prisma/client/index.d.ts'),
          alias: 'prisma',
        },
      ],
    },
  }),
  middlewares.permissions,
  middlewares.loggerMiddleware
)

export default schema
