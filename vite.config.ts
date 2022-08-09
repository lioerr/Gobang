import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import vitePluginImp from "vite-plugin-imp";
import eslintPlugin from "vite-plugin-eslint";

const root = process.cwd();

console.log(root, "root");

// https://vitejs.dev/config/
export default defineConfig({
  define: {},
  server: {
    proxy: {
      "/ws": {
        target: "http://192.168.43.77:9001",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/ws/, ""),
      },
    },
  },
  plugins: [
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/lib/${name}/style/index.less`,
        },
      ],
    }),
    eslintPlugin({
      include: ["src/**/*.tsx", "src/**/*.ts", "src/*.tsx", "src/*.ts"],
    }),
    react(),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "#": resolve(__dirname, "./types"),
      "~": resolve(__dirname, "/"),
    },
  },
});
