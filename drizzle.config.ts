import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "sqlite",
	schema: "./api/lib/db/schema",
	dbCredentials: {
		url: process.env.DATABASE_URL || "sqlite.db",
	},
});
