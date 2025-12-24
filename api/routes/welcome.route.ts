import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import { db, schema } from "@/api/lib/db";
import { respond } from "@/api/lib/utils/respond";
import { zNumberString } from "../lib/utils/zod";

const welcome = new Hono()
	.post(
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
	)
	.delete(
		"/:id",
		zValidator(
			"param",
			z.object({
				id: zNumberString(),
			}),
		),
		async (ctx) => {
			const { id } = ctx.req.valid("param");
			try {
				await db.delete(schema.users).where(eq(schema.users.id, id));
				return respond.ok(ctx, {}, "User deleted successfully", 200);
			} catch (error) {
				console.error("Error deleting user:", error);
				return respond.err(ctx, "Failed to delete user", 500);
			}
		},
	);

export default welcome;
export type WelcomeType = typeof welcome;
