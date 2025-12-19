import { serve } from "bun";
import hono from "@/api/hono";
import { initializeEnv } from "@/env";
import html from "@/src/index.html";

initializeEnv();
const isDev = process.env.NODE_ENV !== "production";

const server = serve({
	development: isDev
		? {
				hmr: true,
				console: true,
			}
		: false,
	port: process.env.PORT,

	routes: {
		"/api": new Response(
			JSON.stringify({
				message: "Bun Fullstack Server",
				version: "v1.0.0",
			}),
		),

		"/api/v1/*": (req) => hono.fetch(req),

		"/*": html,
	},

	fetch() {
		return new Response("Not Found", { status: 404 });
	},

	error(error) {
		console.error(error);
		return new Response(`Internal Error: ${error.message}`, { status: 500 });
	},
});

console.log(
	`${isDev ? "Development" : "Production"} server is running at ${server.url} 🚀`,
);
console.log(`Bun version: ${Bun.version}`);
