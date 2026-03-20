import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", { target: "19" }]],
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:7000",
      },
      "/images": {
        target: "http://localhost:7000",
      },
    },
  },
  build: {
    outDir: "../ecomm-backend-MongoDB/dist",
  },
});
