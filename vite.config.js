import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so the build works at https://sanjeet-saini.github.io/portfolio_builder-/
export default defineConfig({
  plugins: [react()],
  base: "./",
});
