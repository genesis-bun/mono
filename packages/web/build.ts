#!/usr/bin/env bun

import { existsSync } from "node:fs";
import { cp, rm } from "node:fs/promises";
import path from "node:path";
import tailwindPlugin from "bun-plugin-tailwind";

const outdir = path.join(process.cwd(), "dist");
const entrypoints = [path.resolve("src/index.html")];

if (existsSync(outdir)) {
	console.log(`Cleaning up previous build...`);
	await rm(outdir, { recursive: true, force: true });
}

// Build the application
const start = performance.now();
const result = await Bun.build({
	entrypoints,
	outdir,
	target: "browser",
	minify: true,
	sourcemap: "linked",
	env: "PUBLIC_*",
	define: {
		"process.env.NODE_ENV": JSON.stringify("production"),
	},
	plugins: [tailwindPlugin],
});
const end = performance.now();

const outputTable = result.outputs.map((output) => ({
	File: path.relative(process.cwd(), output.path),
	Type: output.kind,
	Size: `${(output.size / 1024).toFixed(2)} KB`,
}));

console.table(outputTable);
console.log(`🚀 Build Time: ${(end - start).toFixed(2)}ms`);

// Copy the public directory if exists
const publicDir = path.join(process.cwd(), "public");
if (existsSync(publicDir)) {
	await cp(publicDir, path.join(outdir, "assets"), { recursive: true });
}
