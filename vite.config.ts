
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default  defineConfig({
  plugins: [vue()],
  build: {
    outDir: "../src/main/resources/static",
  },
  server: {
    proxy: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "/api": "http://localhost:8080",
    },
  },
});