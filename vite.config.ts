// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // Import the plugin
import path from "path"; // Import path module

export default defineConfig({
  plugins: [react(), tailwindcss()], // Add the plugin
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Configure path alias
    },
  },
});
