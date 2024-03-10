import { actionRouter } from '~/server/api/routers/action'
import { userRouter } from '~/server/api/routers/user'
import { createTRPCRouter } from '~/server/api/trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  action: actionRouter,
  user: userRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
