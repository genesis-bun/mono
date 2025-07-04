import { serve } from "bun";
import hono from "./api";
import html from "./src/index.html";
import { isProd } from "env";

const server = serve({
  development: !isProd ? {
    hmr: true,
    console: true,
  } : false,

  idleTimeout: 255,

  routes: {
    "/api": new Response(JSON.stringify({
      message: "Bun Server",
      version: "v1.0.0",
    })),
    // CATCHES ONLY GET REQUESTS
    "/api/v1/*": (req) => {
      return hono.fetch(req);
    },
    // Serve static files from public folder
    "/static/*": (req) => {
      const url = new URL(req.url);
      const filePath = url.pathname.replace("/static/", "");
      const file = Bun.file(`public/${filePath}`);
      return new Response(file);
    },
    "/*": html,
  },

  fetch(req) {
    // CATCHES ALL OTHER METHODS
    if (req.url.includes("/api/v1")) {
      return hono.fetch(req);
    }

    // Handle static files in fetch handler as well (for non-GET requests)
    if (req.url.includes("/static/")) {
      const url = new URL(req.url);
      const filePath = url.pathname.replace("/static/", "");
      const file = Bun.file(`public/${filePath}`);
      return new Response(file);
    }

    return new Response("Not Found", { status: 404 });
  },

  error(error) {
    console.error(error);
    return new Response(`Internal Error: ${error.message}`, { status: 500 });
  },
});

!isProd && console.log(`Dev server running at ${server.url} 🚀`);
isProd && console.log(`BUN VERSION: ${Bun.version}`);