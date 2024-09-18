import { defineConfig } from "vite";

export default defineConfig({
  test: {
    watch: false,
    coverage: {
      provider: "istanbul",
      include: ["nothing"],
    },
  },
});
