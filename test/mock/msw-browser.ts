import { vi } from "vitest";

export const setupWorker = vi.fn(() => {
  return {
    start: vi.fn(async () => {}),
    stop: vi.fn<() => void>(),
    use: vi.fn<(...handlers: unknown[]) => void>(),
    resetHandlers: vi.fn<(...handlers: unknown[]) => void>(),
    restoreHandlers: vi.fn<() => void>(),
    listHandlers: vi.fn<() => unknown[]>(),
  };
});
