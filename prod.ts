import hono from "./api";
import path from "path";
import { serve } from "bun";
import { existsSync, statSync } from "fs";
import { getMimeType } from "./utils";
import { env } from "./env";

const server = serve({
  development: false,
  port: parseInt(env.PORT),

  routes: {
    "/api": new Response(
      JSON.stringify({
        message: "Bun Server",
        version: "v1.0.0",
      })
    ),
    // CATCHES ONLY GET REQUEST
    "/api/v1/*": (req) => {
      return hono.fetch(req);
    },

    "/*": (req) => {
      const url = new URL(req.url);
      const pathname = url.pathname;

      if (pathname.startsWith("/api")) {
        return new Response("Not Found", { status: 404 });
      }

      // Special case for root path - serve index.html directly
      if (pathname === "/") {
        const indexPath = path.join(import.meta.dir, "dist", "index.html");
        const file = Bun.file(indexPath);
        return new Response(file, {
          headers: {
            "Content-Type": "text/html",
            "Cache-Control": "no-cache",
          },
        });
      }

      const filePath = path.join(import.meta.dir, "dist", pathname);

      if (existsSync(filePath)) {
        // Check if it's a directory - if so, serve index.html
        const stats = statSync(filePath);
        if (stats.isDirectory()) {
          // It's a directory, serve index.html
          const indexPath = path.join(import.meta.dir, "dist", "index.html");
          const file = Bun.file(indexPath);
          return new Response(file, {
            headers: {
              "Content-Type": "text/html",
              "Cache-Control": "no-cache",
            },
          });
        }
        
        const file = Bun.file(filePath);
        const mimeType = getMimeType(filePath);

        return new Response(file, {
          headers: {
            "Content-Type": mimeType,
            "Cache-Control":
              pathname === "/" || pathname.endsWith(".html")
                ? "no-cache"
                : "public, max-age=31536000", // 1 year cache for static assets
          },
        });
      }

      const hasFileExtension = /\.[a-zA-Z0-9]+$/.test(pathname);
      if (hasFileExtension) {
        // For files with extensions that don't exist at the requested path,
        // try serving them from the root of dist (for SPA routing)
        const fileName = path.basename(pathname);
        const rootFilePath = path.join(import.meta.dir, "dist", fileName);
        
        if (existsSync(rootFilePath)) {
          const file = Bun.file(rootFilePath);
          const mimeType = getMimeType(rootFilePath);
          
          return new Response(file, {
            headers: {
              "Content-Type": mimeType,
              "Cache-Control": "public, max-age=31536000", // 1 year cache for static assets
            },
          });
        }
        
        // If the file doesn't exist even at the root, return 404
        return new Response("Not Found", { status: 404 });
      }

      const indexPath = path.join(import.meta.dir, "dist", "index.html");
      const file = Bun.file(indexPath);
      return new Response(file, {
        headers: {
          "Content-Type": "text/html",
          "Cache-Control": "no-cache",
        },
      });

      return new Response("Not Found", { status: 404 });
    },
  },

  fetch(req) {
    if (req.url.includes("/api/v1")) {
      return hono.fetch(req);
    }

    const url = new URL(req.url);
    const pathname = url.pathname;

    if (!pathname.startsWith("/api")) {
      const normalizedPath = pathname.endsWith("/") && pathname !== "/"
        ? pathname.slice(0, -1)
        : pathname;

      const filePath = path.join(import.meta.dir, "dist", normalizedPath);

      if (existsSync(filePath)) {
        const file = Bun.file(filePath);
        const mimeType = getMimeType(filePath);

        return new Response(file, {
          headers: {
            "Content-Type": mimeType,
            "Cache-Control": "public, max-age=31536000",
          },
        });
      }

      const hasFileExtension = /\.[a-zA-Z0-9]+$/.test(pathname);
      if (hasFileExtension) {
        // For files with extensions that don't exist at the requested path,
        // try serving them from the root of dist (for SPA routing)
        const fileName = path.basename(pathname);
        const rootFilePath = path.join(import.meta.dir, "dist", fileName);
        
        if (existsSync(rootFilePath)) {
          const file = Bun.file(rootFilePath);
          const mimeType = getMimeType(rootFilePath);
          
          return new Response(file, {
            headers: {
              "Content-Type": mimeType,
              "Cache-Control": "public, max-age=31536000", // 1 year cache for static assets
            },
          });
        }
        
        // If the file doesn't exist even at the root, return 404
        return new Response("Not Found", { status: 404 });
      }

      const indexPath = path.join(import.meta.dir, "dist", "index.html");
      if (existsSync(indexPath)) {
        const file = Bun.file(indexPath);
        return new Response(file, {
          headers: {
            "Content-Type": "text/html",
            "Cache-Control": "no-cache",
          },
        });
      }
    }

    return new Response("Not Found", { status: 404 });
  },

  error(error) {
    console.error(error);
    return new Response(`Internal Error: ${error.message}`, { status: 500 });
  },
});

console.log(`Prod server running at ${server.url} 🚀`);
console.log(`BUN VERSION: ${Bun.version}`);
