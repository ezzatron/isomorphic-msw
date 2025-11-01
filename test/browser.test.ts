import { setupServerOrWorker } from "#isomorphic-msw";
import { http, HttpResponse } from "msw";
import { setupWorker, type SetupWorker } from "msw/browser";
import { expect, it, vi, type Mocked } from "vitest";

it("forwards calls to the worker", async () => {
  const handlerA = http.get("/a", () => HttpResponse.text("a"));
  const handlerB = http.get("/b", () => HttpResponse.text("b"));

  const isomorphicWorker = setupServerOrWorker(handlerA, handlerB);
  expect(setupWorker).toBeCalledWith(handlerA, handlerB);

  expect(isomorphicWorker.type).toBe("worker");

  const realWorker = vi.mocked(setupWorker).mock.results[0]
    .value as Mocked<SetupWorker>;

  await isomorphicWorker.start();
  expect(realWorker.start).toBeCalledWith(undefined);

  await isomorphicWorker.start({
    server: { onUnhandledRequest: "bypass" },
    worker: { quiet: true },
  });
  expect(realWorker.start).toBeCalledWith({ quiet: true });

  isomorphicWorker.stop();
  expect(realWorker.stop).toBeCalled();

  isomorphicWorker.use(handlerA, handlerB);
  expect(realWorker.use).toBeCalledWith(handlerA, handlerB);

  isomorphicWorker.resetHandlers(handlerA, handlerB);
  expect(realWorker.resetHandlers).toBeCalledWith(handlerA, handlerB);

  isomorphicWorker.restoreHandlers();
  expect(realWorker.restoreHandlers).toBeCalled();

  realWorker.listHandlers.mockReturnValue([handlerA, handlerB]);
  expect(isomorphicWorker.listHandlers()).toEqual([handlerA, handlerB]);
});
