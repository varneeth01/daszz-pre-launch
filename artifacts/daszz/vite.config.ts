import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

/**
 * Replit usually injects PORT while running the development server.
 * Netlify does not provide PORT during a static production build.
 * Use 5173 as a safe fallback instead of failing the build.
 */
const parsedPort = Number(process.env.PORT ?? "5173");

const port =
  Number.isFinite(parsedPort) && parsedPort > 0 ? parsedPort : 5173;

/**
 * BASE_PATH may be configured for deployments under a subdirectory.
 * Netlify deployments at the domain root should use "/".
 */
const rawBasePath = process.env.BASE_PATH?.trim() || "/";

const basePath =
  rawBasePath === "/" || rawBasePath.endsWith("/")
    ? rawBasePath
    : `${rawBasePath}/`;

export default defineConfig({
  base: basePath,

  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),

    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),

          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(
        import.meta.dirname,
        "..",
        "..",
        "attached_assets",
      ),
    },

    dedupe: ["react", "react-dom"],
  },

  root: path.resolve(import.meta.dirname),

  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },

  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,

    fs: {
      strict: true,
    },
  },

  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
