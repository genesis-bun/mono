import { hc } from "hono/client";
import type { ExampleType } from "@/api/routes/example";
import { env } from "@/env";

// const baseUrl = env.BUN_PUBLIC_SERVER_URL;
const baseUrl = process.env.BUN_PUBLIC_SERVER_URL;
console.log(baseUrl);

const client = {
	example: hc<ExampleType>(`${baseUrl}/example`),
};

export default client;
