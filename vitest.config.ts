import { playwright } from "@vitest/browser-playwright";
import { join } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    watch: false,
    coverage: {
      provider: "istanbul",
    },
    projects: [
      {
        publicDir: "artifacts/vitest/browser/public",
        test: {
          name: "chromium-unit",
          include: ["test/browser.test.ts"],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
            screenshotDirectory: "artifacts/vitest/browser/screenshots",
          },
          alias: {
            "msw/browser": join(
              import.meta.dirname,
              "test/mock/msw-browser.ts",
            ),
          },
        },
      },
      {
        publicDir: "artifacts/vitest/browser/public",
        test: {
          name: "chromium-integration",
          include: ["test/integration.test.ts"],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
            screenshotDirectory: "artifacts/vitest/browser/screenshots",
          },
        },
      },
      {
        test: {
          name: "happy-dom",
          include: ["test/node.test.ts", "test/integration.test.ts"],
          environment: "happy-dom",
        },
      },
    ],
  },
});
