import type { RequestHandler } from "msw";
import { setupWorker } from "msw/browser";
import type { SetupServerOrWorkerFn } from "./common.js";

export type {
  SetupServerOrWorker,
  SetupServerOrWorkerOptions,
} from "./common.js";

/**
 * Create an MSW worker with the isomorphic API.
 */
export const setupServerOrWorker: SetupServerOrWorkerFn = (...handlers) => {
  const worker = setupWorker(...handlers);

  return {
    get type(): "worker" {
      return "worker";
    },

    start: async ({ worker: startOptions } = {}) => {
      await worker.start(startOptions);
    },

    stop: () => {
      worker.stop();
    },

    use: (...handlers) => {
      worker.use(...handlers);
    },

    resetHandlers: (...handlers) => {
      worker.resetHandlers(...handlers);
    },

    restoreHandlers: () => {
      worker.restoreHandlers();
    },

    listHandlers: () => worker.listHandlers() as RequestHandler[],
  };
};
