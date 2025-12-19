import { timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
	updatedAt: timestamp("updated_at"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	deletedAt: timestamp("deleted_at"),
};

export function generateUniqueSlug(length: number = 12): string {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let uniqueString = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		uniqueString += characters[randomIndex];
	}
	return uniqueString;
}
