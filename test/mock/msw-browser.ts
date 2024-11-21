import { vi } from "vitest";

export const setupWorker = vi.fn(() => {
  return {
    start: vi.fn(async () => {}),
    stop: vi.fn(),
    use: vi.fn(),
    resetHandlers: vi.fn(),
    restoreHandlers: vi.fn(),
    listHandlers: vi.fn(),
  };
});
