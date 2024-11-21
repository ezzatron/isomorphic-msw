import { join } from "path";
import { defineProject, defineWorkspace } from "vitest/config";

export default defineWorkspace([
  defineProject({
    publicDir: "artifacts/vitest/browser/public",
    test: {
      name: "chromium-unit",
      include: ["test/browser.test.ts"],
      browser: {
        enabled: true,
        headless: true,
        provider: "playwright",
        name: "chromium",
        screenshotDirectory: "artifacts/vitest/browser/screenshots",
      },
      alias: {
        "msw/browser": join(import.meta.dirname, "test/mock/msw-browser.ts"),
      },
    },
  }),
  defineProject({
    publicDir: "artifacts/vitest/browser/public",
    test: {
      name: "chromium-integration",
      include: ["test/integration.test.ts"],
      browser: {
        enabled: true,
        headless: true,
        provider: "playwright",
        name: "chromium",
        screenshotDirectory: "artifacts/vitest/browser/screenshots",
      },
    },
  }),
  defineProject({
    test: {
      name: "happy-dom",
      include: ["test/node.test.ts", "test/integration.test.ts"],
      environment: "happy-dom",
    },
  }),
]);
