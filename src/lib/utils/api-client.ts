import { hc } from "hono/client";
import type { ExampleType } from "@/api/routes/example";

const baseUrl = process.env.PUBLIC_SERVER_URL;
const client = {
	example: hc<ExampleType>(`${baseUrl}/example`),
};

export default client;
