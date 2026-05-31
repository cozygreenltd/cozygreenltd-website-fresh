// Vite is configured with React, Tailwind, and TypeScript path aliases.
import { Readable } from "node:stream";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { routeSendEmail } from "./api/send-email";

function toHeadersInit(headers: Record<string, string | string[] | undefined>) {
  const entries: Array<[string, string]> = [];
  for (const [key, value] of Object.entries(headers)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        entries.push([key, item]);
      }
      continue;
    }
    if (value != null) {
      entries.push([key, value]);
    }
  }
  return entries;
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  return {
    plugins: [
      react(),
      tailwindcss(),
      tsconfigPaths(),
      {
        name: "local-api-send-email",
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);

            if (url.pathname !== "/api/send-email") {
              next();
              return;
            }

            try {
              const init: RequestInit & { duplex?: "half" } = {
                method: req.method,
                headers: toHeadersInit(req.headers),
              };

              if (req.method !== "GET" && req.method !== "HEAD") {
                init.body = Readable.toWeb(req) as ReadableStream;
                init.duplex = "half";
              }

              const request = new Request(url, init);

              const response = await routeSendEmail(request);
              res.statusCode = response.status;
              response.headers.forEach((value, key) => {
                res.setHeader(key, value);
              });
              res.end(Buffer.from(await response.arrayBuffer()));
            } catch (error) {
              console.error("Local /api/send-email request failed:", error);
              res.statusCode = 500;
              res.setHeader("content-type", "application/json");
              res.end(JSON.stringify({ ok: false, error: "Local email route failed." }));
            }
          });
        },
      },
    ],
  };
});
