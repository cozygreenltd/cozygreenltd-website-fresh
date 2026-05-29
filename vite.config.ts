// Vite is configured with React, Tailwind, and TypeScript path aliases.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    target: "es2019",
  },
  plugins: [react(), tailwindcss(), tsconfigPaths()],
});
