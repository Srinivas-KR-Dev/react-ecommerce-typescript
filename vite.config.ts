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
        target: "http://localhost:5000",
      },
      "/images": {
        target: "http://localhost:5000",
      },
    },
  },
  build: {
    outDir: "../ecommerce-backend/dist",
  },
});
