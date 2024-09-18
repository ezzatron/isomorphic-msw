/* eslint-disable @typescript-eslint/unbound-method */
import { setupServerOrWorker } from "#isomorphic-msw";
import { http, HttpResponse } from "msw";
import { setupServer, type SetupServer } from "msw/node";
import { expect, it, vi, type Mocked } from "vitest";

vi.mock("msw/node", () => {
  return {
    setupServer: vi.fn(() => {
      return {
        listen: vi.fn(),
        close: vi.fn(),
        use: vi.fn(),
        resetHandlers: vi.fn(),
        restoreHandlers: vi.fn(),
        listHandlers: vi.fn(),
      };
    }),
  };
});

it("forwards calls to the server", async () => {
  const handlerA = http.get("/a", () => HttpResponse.text("a"));
  const handlerB = http.get("/b", () => HttpResponse.text("b"));

  const isomorphicServer = setupServerOrWorker(handlerA, handlerB);
  expect(setupServer).toBeCalledWith(handlerA, handlerB);

  const realServer = vi.mocked(setupServer).mock.results[0]
    .value as Mocked<SetupServer>;

  await isomorphicServer.start();
  expect(realServer.listen).toBeCalledWith(undefined);

  await isomorphicServer.start({
    server: { onUnhandledRequest: "bypass" },
    worker: { quiet: true },
  });
  expect(realServer.listen).toBeCalledWith({ onUnhandledRequest: "bypass" });

  isomorphicServer.stop();
  expect(realServer.close).toBeCalled();

  isomorphicServer.use(handlerA, handlerB);
  expect(realServer.use).toBeCalledWith(handlerA, handlerB);

  isomorphicServer.resetHandlers(handlerA, handlerB);
  expect(realServer.resetHandlers).toBeCalledWith(handlerA, handlerB);

  isomorphicServer.restoreHandlers();
  expect(realServer.restoreHandlers).toBeCalled();

  realServer.listHandlers.mockReturnValue([handlerA, handlerB]);
  expect(isomorphicServer.listHandlers()).toEqual([handlerA, handlerB]);
});
