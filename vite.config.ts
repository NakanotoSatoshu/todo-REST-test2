
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default  defineConfig({
  plugins: [vue()],
  build: {
    outDir: "../src/main/resources/static",
  },
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
});