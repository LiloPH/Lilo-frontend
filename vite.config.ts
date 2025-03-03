import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
  ],
  server: {
    port: 2003,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
