import { PrismaPromise } from '@prisma/client'
import { PrismaPromise as ProchoPrismaPromise } from '@prisma/prochoClient'
import { AsyncLocalStorage } from 'node:async_hooks'

export interface EntityManagerTransientParams {
  entityManager: EntityManager
}

/**
 * Used in test factories to delete database entities that have been created as part of factories
 *
 * Instantiate this at the begining of a test and pass into managed fishery factories.
 */
export interface EntityManager {
  addDeleteCallback: (callback: () => PrismaPromise<unknown> | ProchoPrismaPromise<unknown>) => void
  deleteAll: () => Promise<void>
}

export const createEntityManager = (): EntityManager => {
  let prismaDeleteCallbacks: (() => PrismaPromise<unknown> | ProchoPrismaPromise<unknown>)[] = []

  return {
    addDeleteCallback: (callback) => {
      prismaDeleteCallbacks.push(callback)
    },
    deleteAll: async () => {
      prismaDeleteCallbacks.reverse()
      for (const callback of prismaDeleteCallbacks) {
        await callback()
      }
      prismaDeleteCallbacks = []
    },
  }
}

const entityManagerLocalStorage = new AsyncLocalStorage<EntityManager>()
/**
 * Dynamically import this function if using in a fishery factory.
 * Factories are used in storybook stories where certain node dependencies
 * (node:async_hooks) are not available
 */
export const getEntityManager = () => entityManagerLocalStorage.getStore()

export const runWithEntityManager = (manager: EntityManager, cb: () => Promise<void>) =>
  entityManagerLocalStorage.run(manager, () => cb())
