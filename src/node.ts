import type { RequestHandler } from "msw";
import { setupServer } from "msw/node";
import type { SetupServerOrWorkerFn } from "./common.js";

export type {
  SetupServerOrWorker,
  SetupServerOrWorkerOptions,
} from "./common.js";

/**
 * Create an MSW server with the isomorphic API.
 */
export const setupServerOrWorker: SetupServerOrWorkerFn = (...handlers) => {
  const server = setupServer(...handlers);

  return {
    get type(): "server" {
      return "server";
    },

    start: async ({ server: listenOptions } = {}) => {
      server.listen(listenOptions);
    },

    stop: () => {
      server.close();
    },

    use: (...handlers) => {
      server.use(...handlers);
    },

    resetHandlers: (...handlers) => {
      server.resetHandlers(...handlers);
    },

    restoreHandlers: () => {
      server.restoreHandlers();
    },

    listHandlers: () => server.listHandlers() as RequestHandler[],
  };
};
