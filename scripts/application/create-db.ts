#!/usr/bin/env bun
import { Client } from "pg";

const url = new URL(process.env.DATABASE_URL);
const dbName = url.pathname.slice(1);
const client = new Client({
	connectionString: url.toString().replace(`/${dbName}`, "/postgres"),
});

try {
	await client.connect();
	const exists = await client.query(
		"SELECT 1 FROM pg_database WHERE datname = $1",
		[dbName],
	);
	if (exists.rows.length === 0) {
		await client.query(`CREATE DATABASE "${dbName}"`);
		console.log(`Database '${dbName}' created.`);
	} else {
		console.log(`Database '${dbName}' already exists.`);
	}
} catch (error) {
	console.error("❌ Database error:", (error as Error).message);
	process.exit(1);
} finally {
	await client.end();
}
