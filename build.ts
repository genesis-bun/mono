#!/usr/bin/env bun
import { existsSync } from "node:fs";
import { cp, rm } from "node:fs/promises";
import path from "node:path";
import plugin from "bun-plugin-tailwind";
import { envSchema } from "./env";

const outdir = path.join(process.cwd(), "dist");

const formatFileSize = (bytes: number): string => {
	const units = ["B", "KB", "MB", "GB"];
	let size = bytes;
	let unitIndex = 0;

	while (size >= 1024 && unitIndex < units.length - 1) {
		size /= 1024;
		unitIndex++;
	}

	return `${size.toFixed(2)} ${units[unitIndex]}`;
};

await (async () => {
	// Clean existing dist
	if (existsSync(outdir)) {
		console.log(`🗑️  Cleaning previous build at ${outdir}`);
		await rm(outdir, { recursive: true, force: true });
	}

	// Discover HTML entrypoints under src/
	const entrypoints = Array.from(new Bun.Glob("**.html").scanSync("src"))
		.map((p) => path.resolve("src", p))
		.filter((p) => !p.includes("node_modules"));

	console.log(
		`📄 Found ${entrypoints.length} HTML ${
			entrypoints.length === 1 ? "file" : "files"
		} to bundle\n`,
	);

	const start = performance.now();

	// Use envSchema only to know which keys exist; actual injection is via env: "PUBLIC_*"
	const envKeys = Object.keys(envSchema.shape);
	const clientEnvKeys = envKeys.filter((key) => key.startsWith("PUBLIC_"));
	console.log(
		`🌱 PUBLIC_* env keys considered for browser: ${clientEnvKeys.join(", ") || "(none)"}`,
	);

	const result = await Bun.build({
		entrypoints,
		outdir,
		target: "bun",
		minify: true,
		sourcemap: "linked",
		env: "PUBLIC_*", // Bun-native env inlining for PUBLIC_* vars
		define: {
			"process.env.NODE_ENV": JSON.stringify("production"),
		},
		plugins: [plugin],
	});

	const end = performance.now();

	// Print output table
	const outputTable = result.outputs.map((output) => ({
		File: path.relative(process.cwd(), output.path),
		Type: output.kind,
		Size: formatFileSize(output.size),
	}));

	console.table(outputTable);
	console.log(`⏱️  Build completed in ${(end - start).toFixed(2)}ms\n`);

	// Copy ./public into ./dist/static (for assets not going through the bundler)
	const publicDir = path.join(process.cwd(), "public");
	if (existsSync(publicDir)) {
		console.log("📁 Copying public directory contents to dist/static...");
		try {
			await cp(publicDir, path.join(outdir, "static"), { recursive: true });
			console.log("✅ Public files copied successfully\n");
		} catch (error) {
			console.error("❌ Error copying public files:", error);
		}
	}
})();
