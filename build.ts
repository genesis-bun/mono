#!/usr/bin/env bun
import { build, type BuildConfig } from "bun";
import plugin from "bun-plugin-tailwind";
import { existsSync } from "fs";
import { rm, cp } from "fs/promises";
import path from "path";

// Print help text if requested
if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log(`
🏗️  Bun Build Script

Usage: bun run build.ts [options]

Common Options:
  --outdir <path>          Output directory (default: "dist")
  --minify                 Enable minification (or --minify.whitespace, --minify.syntax, etc)
  --source-map <type>      Sourcemap type: none|linked|inline|external
  --target <target>        Build target: browser|bun|node
  --format <format>        Output format: esm|cjs|iife
  --splitting              Enable code splitting
  --packages <type>        Package handling: bundle|external
  --public-path <path>     Public path for assets
  --env <mode>             Environment handling: inline|disable|prefix*
  --conditions <list>      Package.json export conditions (comma separated)
  --external <list>        External packages (comma separated)
  --banner <text>          Add banner text to output
  --footer <text>          Add footer text to output
  --define <obj>           Define global constants (e.g. --define.VERSION=1.0.0)
  --help, -h               Show this help message

Example:
  bun run build.ts --outdir=dist --minify --source-map=linked --external=react,react-dom
`);
  process.exit(0);
}

// Helper function to convert kebab-case to camelCase
const toCamelCase = (str: string): string => {
  return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
};

// Helper function to parse a value into appropriate type
const parseValue = (value: string): any => {
  // Handle true/false strings
  if (value === "true") return true;
  if (value === "false") return false;

  // Handle numbers
  if (/^\d+$/.test(value)) return parseInt(value, 10);
  if (/^\d*\.\d+$/.test(value)) return parseFloat(value);

  // Handle arrays (comma-separated)
  if (value.includes(",")) return value.split(",").map(v => v.trim());

  // Default to string
  return value;
};

// Helper function to read envKeys from env.ts
async function getEnvKeys(): Promise<string[]> {
  const envFilePath = path.resolve(process.cwd(), "env.ts");
  try {
    const content = await Bun.file(envFilePath).text();
    const match = content.match(/const envKeys = \[([\s\S]*?)\] as const;/);
    if (match && match[1]) {
      const keys = match[1]
        .split('\n')
        .map(line => line.trim().replace(/[",]/g, ''))
        .filter(line => line.length > 0);
      return keys;
    }
  } catch (error) {
    console.error(`Error reading or parsing env.ts: ${error}`);
  }
  return [];
}

// Magical argument parser that converts CLI args to BuildConfig
function parseArgs(): Partial<BuildConfig> {
  const config: Record<string, any> = {};
  const args = process.argv.slice(2);

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg.startsWith("--")) continue;

    // Handle --no-* flags
    if (arg.startsWith("--no-")) {
      const key = toCamelCase(arg.slice(5));
      config[key] = false;
      continue;
    }

    // Handle --flag (boolean true)
    if (!arg.includes("=") && (i === args.length - 1 || args[i + 1].startsWith("--"))) {
      const key = toCamelCase(arg.slice(2));
      config[key] = true;
      continue;
    }

    // Handle --key=value or --key value
    let key: string;
    let value: string;

    if (arg.includes("=")) {
      [key, value] = arg.slice(2).split("=", 2);
    } else {
      key = arg.slice(2);
      value = args[++i];
    }

    // Convert kebab-case key to camelCase
    key = toCamelCase(key);

    // Handle nested properties (e.g. --minify.whitespace)
    if (key.includes(".")) {
      const [parentKey, childKey] = key.split(".");
      config[parentKey] = config[parentKey] || {};
      config[parentKey][childKey] = parseValue(value);
    } else {
      config[key] = parseValue(value);
    }
  }

  return config as Partial<BuildConfig>;
}

// Helper function to format file sizes
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

console.log("\n🚀 Starting build process...\n");

// Wrap async code in IIFE to avoid top-level await issues
(async () => {
  // Parse CLI arguments with our magical parser
  const cliConfig = parseArgs();
  const outdir = cliConfig.outdir || path.join(process.cwd(), "dist");

  if (existsSync(outdir)) {
    console.log(`🗑️ Cleaning previous build at ${outdir}`);
    await rm(outdir, { recursive: true, force: true });
  }

  const start = performance.now();

  // Scan for all HTML files in the project
  const entrypoints = Array.from(new Bun.Glob("**.html").scanSync("src"))
    .map(a => path.resolve("src", a))
    .filter(dir => !dir.includes("node_modules"));
  console.log(`📄 Found ${entrypoints.length} HTML ${entrypoints.length === 1 ? "file" : "files"} to process\n`);

  // ENV VARIABLES SUBSTITUTION FOR BROWSER
  const allEnvKeys = await getEnvKeys();
  const clientEnvVariables = allEnvKeys.filter(key => key.startsWith("BUN_PUBLIC_"));

  const defineEnv: Record<string, string> = {
    "process.env.NODE_ENV": JSON.stringify("production"),
  };

  for (const envKey of clientEnvVariables) {
    if (process.env[envKey] !== undefined) {
      defineEnv[`process.env.${envKey}`] = JSON.stringify(process.env[envKey]);
    } else {
      console.warn(`⚠️ Warning: Environment variable ${envKey} is not set. It will be defined as undefined in the client bundle.`);
      defineEnv[`process.env.${envKey}`] = JSON.stringify(undefined);
    }
  }

  // Build all the HTML files
  const result = await build({
    entrypoints,
    outdir,
    plugins: [plugin],
    minify: true,
    target: "browser",
    sourcemap: "linked",
    define: defineEnv,
    ...cliConfig, // Merge in any CLI-provided options
  });

  // Print the results
  const end = performance.now();

  const outputTable = result.outputs.map(output => ({
    "File": path.relative(process.cwd(), output.path),
    "Type": output.kind,
    "Size": formatFileSize(output.size),
  }));

  console.table(outputTable);
  const buildTime = (end - start).toFixed(2);

  // Copy public directory contents to dist/static
  const publicDir = path.join(process.cwd(), "public");
  if (existsSync(publicDir)) {
    console.log("📁 Copying public directory contents to dist...");
    try {
      await cp(publicDir, path.join(outdir, "static"), { recursive: true });
      console.log("✅ Public files copied successfully");
    } catch (error) {
      console.error("❌ Error copying public files:", error);
    }
  }

  console.log(`\n✅ Build completed in ${buildTime}ms\n`);
})();
