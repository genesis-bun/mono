import * as t from "drizzle-orm/sqlite-core";
import { generateUniqueSlug, timestamps } from "@/api/lib/utils/sql";

export const users = t.sqliteTable("users", {
	id: t.integer().primaryKey({ autoIncrement: true }),
	name: t.text("name"),
	slug: t.text().$default(() => generateUniqueSlug(16)),
	...timestamps,
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
