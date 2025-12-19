import { z } from "zod";

const envSchema = z.object({
	DATABASE_URL: z.string().refine((val) => {
		try {
			new URL(val);
			return true;
		} catch {
			return false;
		}
	}, "DATABASE_URL must be a valid URL"),
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

declare module "bun" {
	interface Env {
		DATABASE_URL: string;
		PUBLIC_SERVER_URL: string;
		PUBLIC_GA_ID: string;
		PORT: number;
	}
}

let validatedEnv: EnvSchema | null = null;

export function getValidatedEnv(): EnvSchema {
	if (!validatedEnv) {
		throw new Error("Environment not validated. Call validateEnv() first.");
	}
	return validatedEnv;
}

export function validateEnv(): EnvSchema {
	try {
		validatedEnv = envSchema.parse(Bun.env);
		console.log("✅ Environment variables validated successfully");
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

export function initializeEnv() {
	return validateEnv();
}

export { envSchema };
export type { EnvSchema };
