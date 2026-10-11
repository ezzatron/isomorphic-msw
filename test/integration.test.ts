import { setupServerOrWorker } from "#isomorphic-msw";
import { http, HttpResponse } from "msw/http";
import { afterAll, beforeAll, beforeEach, expect, it } from "vitest";

const server = setupServerOrWorker();

beforeAll(async () => {
  await server.start({
    worker: {
      quiet: true,
      onUnhandledFrame: "bypass",
    },
  });
});

beforeEach(() => {
  server.resetHandlers();
});

afterAll(async () => {
  await server.stop();
});

it("responds to requests", async () => {
  server.use(
    http.get("/greet", ({ request }) => {
      const url = new URL(request.url);
      const name = url.searchParams.get("name") ?? "";

      return HttpResponse.json({ greeting: `Hello ${name}` });
    }),
  );

  const response = await fetch("/greet?name=MSW");

  expect(response.ok).toBe(true);
  expect(await response.json()).toEqual({ greeting: "Hello MSW" });
});
