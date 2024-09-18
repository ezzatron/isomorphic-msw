import type { RequestHandler } from "msw";
import type { SetupWorker } from "msw/browser";
import type { SetupServer } from "msw/node";

/**
 * An MSW server or worker.
 */
export type SetupServerOrWorker = {
  /**
   * A type indicating whether this is a server or a worker.
   */
  readonly type: "server" | "worker";

  /**
   * Start request interception.
   *
   * @see [MSW docs for `SetupServer.listen()`](https://mswjs.io/docs/api/setup-server/listen)
   * @see [MSW docs for `SetupWorker.start()`](https://mswjs.io/docs/api/setup-worker/start)
   *
   * @param options - Options for starting the server or worker.
   */
  start: (options?: SetupServerOrWorkerOptions) => Promise<void>;

  /**
   * Stop request interception.
   *
   * @see [MSW docs for `SetupServer.close()`](https://mswjs.io/docs/api/setup-server/close)
   * @see [MSW docs for `SetupWorker.stop()`](https://mswjs.io/docs/api/setup-worker/stop)
   */
  stop: () => void;

  /**
   * Prepend request handlers to the current worker instance.
   *
   * @see [MSW docs for `SetupServer.use()`](https://mswjs.io/docs/api/setup-server/use)
   * @see [MSW docs for `SetupWorker.use()`](https://mswjs.io/docs/api/setup-worker/use)
   */
  use: (...handlers: RequestHandler[]) => void;

  /**
   * Reset request handlers to the initial list.
   *
   * @see [MSW docs for `SetupServer.resetHandlers()`](https://mswjs.io/docs/api/setup-server/reset-handlers)
   * @see [MSW docs for `SetupWorker.resetHandlers()`](https://mswjs.io/docs/api/setup-worker/reset-handlers)
   */
  resetHandlers: (...handlers: RequestHandler[]) => void;

  /**
   * Mark used one-time request handlers as unused.
   *
   * @see [MSW docs for `SetupServer.restoreHandlers()`](https://mswjs.io/docs/api/setup-server/restore-handlers)
   * @see [MSW docs for `SetupWorker.restoreHandlers()`](https://mswjs.io/docs/api/setup-worker/restore-handlers)
   */
  restoreHandlers: () => void;

  /**
   * Return the list of current request handlers.
   *
   * @see [MSW docs for `SetupServer.listHandlers()`](https://mswjs.io/docs/api/setup-server/list-handlers)
   * @see [MSW docs for `SetupWorker.listHandlers()`](https://mswjs.io/docs/api/setup-worker/list-handlers)
   */
  listHandlers: () => RequestHandler[];
};

/**
 * Options for starting an MSW server or worker.
 */
export type SetupServerOrWorkerOptions = {
  /**
   * Options for starting a server.
   *
   * @see [MSW docs for `SetupServer.listen()`](https://mswjs.io/docs/api/setup-server/listen)
   */
  server?: Parameters<SetupServer["listen"]>[0];

  /**
   * Options for starting a worker.
   *
   * @see [MSW docs for `SetupWorker.start()`](https://mswjs.io/docs/api/setup-worker/start)
   */
  worker?: Parameters<SetupWorker["start"]>[0];
};

export type SetupServerOrWorkerFn = (
  ...handlers: RequestHandler[]
) => SetupServerOrWorker;
