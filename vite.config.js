import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5176,
  },
  plugins: [react()],
  base: "/Shopping-Web-Appd:\KG Coding React\Todo App\.github\workflows/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./jest.setup.js",
  },
});
