import { serve } from "bun";
import hono from "@/api/hono";
import { initializeEnv } from "@/env";
import { serveStatic } from "@/utils";

initializeEnv();

const server = serve({
	development: false,
	port: process.env.PORT,

	// Simple API surface; Hono handles /api/v1/*
	routes: {
		"/api": new Response(
			JSON.stringify({
				message: "Bun Server",
				version: "v1.0.0",
			}),
		),
		"/api/v1/*": (req) => hono.fetch(req),
	},

	fetch(req) {
		const url = new URL(req.url);
		const pathname = url.pathname;

		if (pathname.startsWith("/api/v1")) {
			return hono.fetch(req);
		}

		if (pathname.startsWith("/api")) {
			return new Response("Not Found", { status: 404 });
		}

		return serveStatic(pathname);
	},

	error(error) {
		console.error(error);
		return new Response(`Internal Error: ${error.message}`, { status: 500 });
	},
});

console.log(`Server running at ${server.url} 🚀`);
console.log(`BUN VERSION: ${Bun.version}`);
