import { serve } from "bun";
import hono from "./api";
import html from "./src/index.html";
import { isProd } from "env";

const server = serve({
  development: !isProd ? {
    hmr: true,
    console: true,
  } : false,

  routes: {
    "/api": new Response(JSON.stringify({
      message: "Bun Server",
      version: "v1.0.0",
    })),
    // CATCHES ONLY GET REQUESTS
    "/api/v1/*": (req) => {
      return hono.fetch(req);
    },
    "/*": html,
  },

  fetch(req) {
    // CATCHES ALL OTHER METHODS
    if (req.url.includes("/api/v1")) {
      return hono.fetch(req);
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