import { z } from "zod";

// env schema
const envSchema = z.object({
	DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
	PUBLIC_SERVER_URL: z.url(),
	PUBLIC_GA_ID: z.string().optional(),
	PORT: z.coerce.number().int().positive("PORT must be a positive integer"),
	PRIVY_APP_ID: z.string().min(1, "PRIVY_APP_ID is required"),
	PRIVY_APP_SECRET: z.string().min(1, "PRIVY_APP_SECRET is required"),
});
type EnvSchema = z.infer<typeof envSchema>;

// declare env for process.env intellisense
declare module "bun" {
	interface Env extends EnvSchema {}
}

// validate env
export function validateEnv() {
	try {
		const parsedEnv = envSchema.parse(Bun.env);
		return parsedEnv;
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errorMessages = error.issues
				.map((err) => `${err.path.join(".")}: ${err.message}`)
				.join("\n");
			throw new Error(`Environment validation failed:\n${errorMessages}`);
		}
		throw error;
	}
}

export type { EnvSchema };
