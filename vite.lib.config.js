import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath } from "url";

// ESM-compatible __dirname replacement
const __dirname = fileURLToPath(new URL(".", import.meta.url));

// Library build — bundles all components into a single distributable
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib.js"),
      name: "WoodenUI",
      fileName: "wooden-ui",
    },
    rollupOptions: {
      // React stays external — consumers provide their own
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
    cssCodeSplit: false,
  },
});
