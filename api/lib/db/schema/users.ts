import * as t from "drizzle-orm/pg-core";
import { pgTable as table } from "drizzle-orm/pg-core";
import { generateUniqueSlug, timestamps } from "@/api/lib/utils/schema";

export const users = table("users", {
	id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
	name: t.varchar("name", { length: 256 }),
	slug: t.varchar().$default(() => generateUniqueSlug(16)),
	...timestamps,
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
