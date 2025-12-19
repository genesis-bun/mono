import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { db, schema } from "@/api/lib/db";
import { respond } from "@/api/lib/utils/respond";

const welcome = new Hono().post(
	"/",
	zValidator(
		"json",
		z.object({
			name: z.string().min(1, "Name is required").max(256, "Name too long"),
		}),
	),
	async (ctx) => {
		const { name } = ctx.req.valid("json");

		try {
			const [newUser] = await db
				.insert(schema.users)
				.values({ name })
				.returning();

			return respond.ok(
				ctx,
				{
					...newUser,
				},
				`Welcome to the club, ${name}! 🎉`,
				201,
			);
		} catch (error) {
			console.error("Error saving user:", error);
			return respond.err(ctx, "Failed to save your name", 500);
		}
	},
);

export default welcome;
export type WelcomeType = typeof welcome;
