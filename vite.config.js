import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5176,
  },
  plugins: [react()],
  base: "/Shopping-Web-App/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./jest.setup.js",
  },
});
