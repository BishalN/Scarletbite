import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { feedRouter } from "./routers/feed";
import { orderRouter } from "./routers/order";
import { adminOrderRouter } from "./routers/admin/order";
import { adminUserRouter } from "./routers/admin/users";
import { adminMenuRouter } from "./routers/admin/menu";
import { adminPreferencesRouter } from "./routers/admin/preferences";
import { meRouter } from "./routers/me";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  feed: feedRouter,
  order: orderRouter,
  me: meRouter,

  // Admin Routers
  adminOrder: adminOrderRouter,
  users: adminUserRouter,
  adminMenu: adminMenuRouter,
  preferences: adminPreferencesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
