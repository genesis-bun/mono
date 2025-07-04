import dist from "./dist/index.html";
import hono from "./api";
import path from "path";
import { serve } from "bun";
import { existsSync } from "fs";
import { getMimeType } from "./utils";

const server = serve({
  development: false,

  routes: {
    "/api": new Response(JSON.stringify({
      message: "Bun Server",
      version: "v1.0.0",
    })),
    // CATCHES ONLY GET REQUESTS
    "/api/v1/*": (req) => {
      return hono.fetch(req);
    },
    "/*": (req) => {
      const url = new URL(req.url);
      const pathname = url.pathname;
      
      // Skip API routes
      if (pathname.startsWith('/api')) {
        return new Response("Not Found", { status: 404 });
      }
      
      // Try to serve static files from dist directory
      const filePath = path.join(process.cwd(), "dist", pathname === "/" ? "index.html" : pathname);
      
      if (existsSync(filePath)) {
        const file = Bun.file(filePath);
        const mimeType = getMimeType(filePath);
        
        return new Response(file, {
          headers: {
            'Content-Type': mimeType,
            'Cache-Control': pathname === "/" || pathname.endsWith('.html') 
              ? 'no-cache' 
              : 'public, max-age=31536000', // 1 year cache for static assets
          },
        });
      }
      
      // Fallback to index.html for SPA routing
      return new Response(dist, {
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-cache',
        },
      });
    },
  },

  fetch(req) {
    // CATCHES ALL OTHER METHODS
    if (req.url.includes("/api/v1")) {
      return hono.fetch(req);
    }
    
    // Handle static files for non-GET requests
    const url = new URL(req.url);
    const pathname = url.pathname;
    
    if (!pathname.startsWith('/api')) {
      const filePath = path.join(process.cwd(), "dist", pathname);
      
      if (existsSync(filePath)) {
        const file = Bun.file(filePath);
        const mimeType = getMimeType(filePath);
        
        return new Response(file, {
          headers: {
            'Content-Type': mimeType,
            'Cache-Control': 'public, max-age=31536000',
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