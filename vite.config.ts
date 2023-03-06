
import { defineConfig } from "vite";
import { VitePluginFonts } from 'vite-plugin-fonts'
import vue from "@vitejs/plugin-vue";

export default  defineConfig({
  plugins: [vue(),
    VitePluginFonts({
      google: {
        families: [
           'Noto Sans JP' ,'Open Sans'// ここに導入したいフォント名を入れる
        ],
      }
    })
  
  ],
  
  build: {
    outDir: "../src/main/resources/static",
  },
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
});


