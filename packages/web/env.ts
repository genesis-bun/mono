import { z } from "zod";

// declare env for process.env intellisense
declare module "bun" {
	interface Env {
		DATABASE_URL: string;
		PUBLIC_SERVER_URL: string;
		PUBLIC_GA_ID: string;
		PORT: number;
	}
}

// define env schema for runtime validation
const envSchema = z.object({
	DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
	PUBLIC_SERVER_URL: z.string().refine((val) => {
		try {
			new URL(val);
			return true;
		} catch {
			return false;
		}
	}, "PUBLIC_SERVER_URL must be a valid URL"),
	PUBLIC_GA_ID: z.string().optional(),
	PORT: z.coerce.number().int().positive("PORT must be a positive integer"),
});

type EnvSchema = z.infer<typeof envSchema>;
let validatedEnv: EnvSchema;

export function validateEnv(): EnvSchema {
	try {
		validatedEnv = envSchema.parse(Bun.env);
		return validatedEnv;
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

export function getEnv(): EnvSchema {
	if (!validatedEnv) {
		throw new Error("Environment not validated. Call validateEnv() first.");
	}
	return validatedEnv;
}

export { envSchema };
export type { EnvSchema };
