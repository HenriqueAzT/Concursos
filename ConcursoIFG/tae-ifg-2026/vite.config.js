import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const frontend = fileURLToPath(new URL("./frontend/", import.meta.url));
const backend = "http://127.0.0.1:" + (process.env.IFG_PORT || "8765");
const proxy = {
  "/api/": { target: backend },
  "/materiais/": {
    target: backend,
    rewrite: path => path.replace(/^\/materiais\//, "/"),
  },
};

export default defineConfig({
  root: frontend,
  plugins: [react()],
  server: { host: "127.0.0.1", fs: { allow: [frontend] }, proxy },
  preview: { host: "127.0.0.1", proxy },
});
