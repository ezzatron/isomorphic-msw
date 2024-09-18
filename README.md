# Isomorphic MSW

_[MSW] with the same API for Node.js and browsers_

[msw]: https://mswjs.io

[![Current NPM version][badge-npm-version-image]][badge-npm-version-link]
[![Build status][badge-build-image]][badge-build-link]

[badge-build-image]:
  https://img.shields.io/github/actions/workflow/status/ezzatron/isomorphic-msw/ci-node-library.yml?branch=main&style=for-the-badge
[badge-build-link]:
  https://github.com/ezzatron/isomorphic-msw/actions/workflows/ci-node-library.yml
[badge-npm-version-image]:
  https://img.shields.io/npm/v/isomorphic-msw?label=isomorphic-msw&logo=npm&style=for-the-badge
[badge-npm-version-link]: https://npmjs.com/package/isomorphic-msw

## Installation

```sh
npm install msw isomorphic-msw
```

## Usage

This example shows a Vitest test that uses `isomorphic-msw` and can be run under
[Vitest browser mode] and/or Node.js-based [Vitest test environments] without
having to switch which [MSW] API is used:

[vitest browser mode]: https://vitest.dev/guide/browser
[vitest test environments]: https://vitest.dev/guide/environment
[msw]: https://mswjs.io

```ts
import { setupServerOrWorker } from "isomorphic-msw";
import { http, HttpResponse } from "msw";
import { afterAll, beforeAll, beforeEach, expect, it } from "vitest";

const server = setupServerOrWorker();

beforeAll(async () => {
  await server.start({
    worker: {
      quiet: true,
      onUnhandledRequest: "bypass",
    },
  });
});

beforeEach(() => {
  server.resetHandlers();
});

afterAll(async () => {
  server.stop();
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
```

## Reference documentation

See the [reference documentation] for a list of all functions and their
signatures.

[reference documentation]: https://ezzatron.com/isomorhpic-msw
