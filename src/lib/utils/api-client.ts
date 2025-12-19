import { hc } from "hono/client";
import type { WelcomeType } from "@/api/routes/welcome.route";

const baseUrl = process.env.PUBLIC_SERVER_URL;

const client = {
	welcome: hc<WelcomeType>(`${baseUrl}/welcome`),
};

export default client;
