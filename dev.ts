// LEGACY (TO BE REMOVED)

import { serve } from "bun";
import hono from "@/api/hono";
import { initializeEnv } from "@/env";
import html from "@/src/index.html";

// ENV Check
initializeEnv();

const server = serve({
	development: {
		hmr: true,
		console: true,
	},
	port: process.env.PORT,
	idleTimeout: 60,

	routes: {
		// API routes
		"/api": new Response(
			JSON.stringify({
				message: "Bun Server",
				version: "v1.0.0",
			}),
		),
		"/api/v1/*": (req) => hono.fetch(req),

		"/static/*": (req) => {
			const url = new URL(req.url);
			const filePath = url.pathname.replace("/assets/", "");
			const file = Bun.file(`public/${filePath}`);
			return new Response(file);
		},

		"/*": html,
	},

	fetch(req) {
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

console.log(`Development server running at ${server.url} 🚀 (Legacy)`);
console.log(`BUN VERSION: ${Bun.version}`);
