import { existsSync, statSync } from "node:fs";
import path from "node:path";

// Helper function to get MIME type based on file extension
export const getMimeType = (filePath: string): string => {
	const ext = path.extname(filePath).toLowerCase();
	const mimeTypes: Record<string, string> = {
		".html": "text/html",
		".css": "text/css",
		".js": "application/javascript",
		".json": "application/json",
		".png": "image/png",
		".jpg": "image/jpeg",
		".jpeg": "image/jpeg",
		".gif": "image/gif",
		".svg": "image/svg+xml",
		".ico": "image/x-icon",
		".woff": "font/woff",
		".woff2": "font/woff2",
		".ttf": "font/ttf",
		".eot": "application/vnd.ms-fontobject",
		".pdf": "application/pdf",
		".txt": "text/plain",
		".xml": "application/xml",
		".webp": "image/webp",
		".mp4": "video/mp4",
		".webm": "video/webm",
		".mp3": "audio/mpeg",
		".wav": "audio/wav",
		".ogg": "audio/ogg",
	};
	return mimeTypes[ext] || "application/octet-stream";
};

// Production server utilities
const distDir = path.join(import.meta.dir, "dist");

export function serveIndexHtml(): Response {
	const indexPath = path.join(distDir, "index.html");
	if (!existsSync(indexPath)) {
		return new Response("Not Found", { status: 404 });
	}

	const file = Bun.file(indexPath);
	return new Response(file, {
		headers: {
			"Content-Type": "text/html",
			"Cache-Control": "no-cache",
		},
	});
}

export function serveFile(filePath: string): Response {
	if (!existsSync(filePath)) {
		return new Response("Not Found", { status: 404 });
	}

	const file = Bun.file(filePath);
	const mimeType = getMimeType(filePath);
	const isHtml = filePath.endsWith(".html");

	return new Response(file, {
		headers: {
			"Content-Type": mimeType,
			"Cache-Control": isHtml ? "no-cache" : "public, max-age=31536000", // 1 year cache for static assets
		},
	});
}

export function serveStatic(pathname: string): Response {
	// Root path → index.html
	if (pathname === "/") {
		return serveIndexHtml();
	}

	const requestedPath = path.join(distDir, pathname);

	if (existsSync(requestedPath)) {
		const stats = statSync(requestedPath);

		// Directory → SPA index.html
		if (stats.isDirectory()) {
			return serveIndexHtml();
		}

		// File → serve directly
		return serveFile(requestedPath);
	}

	const hasExt = /\.[a-zA-Z0-9]+$/.test(pathname);

	if (hasExt) {
		// Try file at dist root (for assets referenced by basename only)
		const fileName = path.basename(pathname);
		const rootFilePath = path.join(distDir, fileName);

		if (existsSync(rootFilePath)) {
			return serveFile(rootFilePath);
		}

		// No such asset
		return new Response("Not Found", { status: 404 });
	}

	// No extension → SPA fallback (client router handles it)
	return serveIndexHtml();
}
